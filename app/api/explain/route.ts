import { NextResponse } from 'next/server'
import { chatWithAxonBuddy, generateQuizHelpPrompt, generateSingleExplanationPrompt } from '@/lib/openrouter'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: Request) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    // Enforce authentication in production
    if (!user && process.env.NODE_ENV === 'production') {
      return NextResponse.json({ error: 'Unauthorized. Please sign in to access AI tutoring.' }, { status: 401 })
    }

    const body = await req.json()
    console.log('Request body:', JSON.stringify(body, null, 2))
    
    const { mode, videoTitle, videoConcept, wrongQuestions, customPrompt, question, userAnswer, correctAnswer } = body

    let prompt: string

    if (mode === 'quiz_help') {
      // Multiple wrong answers summary (for AxonBuddy)
      console.log('Mode: quiz_help')
      prompt = generateQuizHelpPrompt(videoTitle, videoConcept, wrongQuestions)
    } else if (mode === 'custom') {
      console.log('Mode: custom')
      prompt = customPrompt
    } else {
      // Single question explanation (default - for instant feedback)
      console.log('Mode: single explanation (default)')
      prompt = generateSingleExplanationPrompt(question, userAnswer, correctAnswer)
    }

    console.log('Generated prompt:', prompt)
    console.log('Calling Gemini for explanation...')
    
    const response = await chatWithAxonBuddy(prompt)
    
    console.log('Gemini response received:', response.substring(0, 100))

    return NextResponse.json({ 
      response,
      explanation: response
    })
  } catch (error: any) {
    console.error('\n!!! EXPLAIN API ERROR !!!')
    console.error('Error:', error)
    console.error('Error message:', error.message)
    console.error('Error stack:', error.stack)
    return NextResponse.json(
      { 
        error: error.message || 'Failed to get response from AI',
        details: error.toString()
      },
      { status: 500 }
    )
  }
}
