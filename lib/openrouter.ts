// ─────────────────────────────────────────────────────────────
// lib/openrouter.ts
// OpenRouter API helper for AxonBuddy chatbot (using Gemini)
// ─────────────────────────────────────────────────────────────

export async function chatWithAxonBuddy(prompt: string): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY

  console.log('=== OpenRouter API Debug ===')
  console.log('API Key exists:', !!apiKey)
  console.log('API Key length:', apiKey?.length || 0)

  if (!apiKey) {
    throw new Error('OPENROUTER_API_KEY not found in environment variables. Please add it to .env.local')
  }

  const systemPrompt = `You are AxonBuddy 🧠, a friendly AI tutor for SynaptiQ learning platform.

Your role:
- Explain concepts in simple, clear language
- Use analogies and real-world examples
- Be encouraging and positive
- Keep explanations concise (2-3 sentences)
- Focus on WHY the correct answer is right
- Help students learn from mistakes`

  try {
    console.log('Calling OpenRouter API with Gemini...')
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://synaptiq.app',
        'X-Title': 'SynaptiQ Learning Platform',
      },
      body: JSON.stringify({
        model: 'google/gemini-flash-1.5',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    })

    console.log('OpenRouter API response status:', response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('OpenRouter API error response:', errorText)
      throw new Error(`OpenRouter API error: ${response.status} - ${errorText}`)
    }

    const data = await response.json()
    console.log('OpenRouter API response received')
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('Unexpected OpenRouter response format:', data)
      throw new Error('Invalid response format from OpenRouter API')
    }
    
    return data.choices[0].message.content || 'Sorry, I could not generate a response.'
  } catch (error) {
    console.error('AxonBuddy error:', error)
    throw error
  }
}

// Helper to generate prompt for wrong quiz answers
export function generateQuizHelpPrompt(
  videoTitle: string,
  videoConcept: string,
  wrongQuestions: Array<{
    question: string
    userAnswer: string
    correctAnswer: string
  }>
): string {
  const questionsText = wrongQuestions.map((q, i) => `
Question ${i + 1}: ${q.question}
❌ Student answered: ${q.userAnswer}
✅ Correct answer: ${q.correctAnswer}
`).join('\n')

  return `The student just watched a video about: "${videoTitle}"
Topic: ${videoConcept}

They got these questions wrong:
${questionsText}

Please:
1. Start with brief encouragement
2. For each wrong question, explain WHY the correct answer is right
3. Use a simple analogy or real-world example
4. Give a quick memory tip
5. End with motivation to keep learning

Keep it friendly, concise, and helpful!`
}

// Helper to generate explanation for a single wrong answer
export function generateSingleExplanationPrompt(
  question: string,
  userAnswer: string,
  correctAnswer: string
): string {
  return `Question: ${question}

❌ Student's Answer: ${userAnswer}
✅ Correct Answer: ${correctAnswer}

Please explain in 2-3 clear sentences:
1. Why the correct answer is right
2. Why the student's answer is wrong (if applicable)
3. A simple tip to remember this concept

Be encouraging and educational!`
}
