import { supabase } from '@/lib/supabase/client'
import { QuizAttempt } from './types'

export async function saveQuizAttempt(attempt: QuizAttempt): Promise<boolean> {
  try {
    const { error } = await supabase.from('quiz_attempts').insert([
      {
        user_id: attempt.user_id,
        course_id: attempt.course_id,
        module_id: attempt.module_id,
        questions: attempt.questions,
        score: attempt.score,
        total_questions: attempt.total_questions,
        weak_concepts: attempt.weak_concepts || [],
      },
    ])

    if (error) {
      console.warn('[quizzes] Error saving quiz attempt:', error.message)
      return false
    }

    return true
  } catch (err) {
    console.warn('[quizzes] Network/DB exception:', err)
    return false
  }
}

export async function getUserQuizHistory(userId: string, courseId?: string): Promise<QuizAttempt[]> {
  try {
    let query = supabase
      .from('quiz_attempts')
      .select('*')
      .eq('user_id', userId)
      .order('attempted_at', { ascending: false })

    if (courseId) {
      query = query.eq('course_id', courseId)
    }

    const { data, error } = await query.limit(50)

    if (error) {
      console.warn('[quizzes] Error fetching quiz attempts:', error.message)
      return []
    }

    return data || []
  } catch (err) {
    console.warn('[quizzes] Network/DB exception:', err)
    return []
  }
}

