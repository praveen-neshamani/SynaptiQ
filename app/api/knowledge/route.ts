// ─────────────────────────────────────────────────────────────
// app/api/knowledge/route.ts
//
// TWO responsibilities:
// 1. Generate quiz questions dynamically for a given video/concept
// 2. Detect weak concept from a wrong answer → return fundamentals key
// ─────────────────────────────────────────────────────────────

import { NextResponse } from 'next/server'

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions'
const MODEL = 'openai/gpt-3.5-turbo'

// ── Helper: call OpenRouter ───────────────────────────────────
async function callAI(prompt: string): Promise<string> {
  const response = await fetch(OPENROUTER_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [{ role: 'user', content: prompt }],
    }),
  })
  const data = await response.json()
  return data.choices?.[0]?.message?.content || ''
}

// ─────────────────────────────────────────────────────────────
// POST /api/knowledge
//
// Request body can be one of two modes:
//
// MODE 1 — Generate quiz:
// { mode: 'generate_quiz', concept: string, videoTitle: string, difficulty: 'easy'|'medium'|'hard', count: number }
//
// MODE 2 — Detect weak concept:
// { mode: 'detect_weakness', concept: string, question: string, userAnswer: string, correctAnswer: string }
// ─────────────────────────────────────────────────────────────
export async function POST(req: Request) {
  const body = await req.json()
  const { mode } = body

  // ── MODE 1: Generate quiz questions ──────────────────────
  if (mode === 'generate_quiz') {
    const { concept, videoTitle, difficulty = 'medium', count = 3 } = body

    const prompt = `
You are a programming quiz generator for an adaptive learning platform.

Generate exactly ${count} multiple choice questions about: "${concept}"
Video topic: "${videoTitle}"
Difficulty level: ${difficulty}

Rules:
- Each question must have exactly 4 options
- Only ONE option is correct
- Questions should test understanding, not just memory
- Make options plausible (not obviously wrong)

Respond ONLY with a valid JSON array, no explanation, no markdown, no backticks:
[
  {
    "question": "question text here",
    "options": ["option A", "option B", "option C", "option D"],
    "correctIndex": 0,
    "difficulty": "${difficulty}"
  }
]
`

    try {
      const raw = await callAI(prompt)
      // Strip any accidental markdown fences
      const clean = raw.replace(/```json|```/g, '').trim()
      const questions = JSON.parse(clean)
      return NextResponse.json({ questions })
    } catch (err) {
      console.error('[knowledge/generate_quiz] Parse error:', err)
      // Return empty so frontend falls back to static questions
      return NextResponse.json({ questions: [] })
    }
  }

  // ── MODE 2: Detect weak concept ───────────────────────────
  if (mode === 'detect_weakness') {
    const { concept, question, userAnswer, correctAnswer } = body

    // These are the available fundamentals keys in courseData.ts
    // If you add a new fundamentals video, add its key here too
    const availableKeys = [
      'arrays_and_indexing',
      'recursion_basics',
      'tree_basics',
      'sorting_basics',
      'time_complexity',
    ]

    const prompt = `
A student is learning "${concept}" and answered a quiz question incorrectly.

Question: ${question}
Student's answer: ${userAnswer}
Correct answer: ${correctAnswer}

Based on this mistake, identify which ONE fundamental concept the student is weakest in.
Choose the single best match from this list:
${availableKeys.join(', ')}

Rules:
- Return ONLY the key name, nothing else
- No explanation, no punctuation, no markdown
- If none match well, return: tree_basics
`

    try {
      const raw = await callAI(prompt)
      const weakConcept = raw.trim().toLowerCase().replace(/[^a-z_]/g, '')

      // Validate it's a known key — fallback to tree_basics if not
      const validKey = availableKeys.includes(weakConcept)
        ? weakConcept
        : 'tree_basics'

      return NextResponse.json({ weakConcept: validKey })
    } catch (err) {
      console.error('[knowledge/detect_weakness] Error:', err)
      return NextResponse.json({ weakConcept: 'tree_basics' })
    }
  }

  return NextResponse.json({ error: 'Invalid mode' }, { status: 400 })
}