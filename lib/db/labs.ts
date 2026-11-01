import { supabase } from '@/lib/supabase/client'
import { LabSubmission } from './types'

export async function saveLabSubmission(submission: LabSubmission): Promise<boolean> {
  try {
    const { error } = await supabase.from('lab_submissions').insert([
      {
        user_id: submission.user_id,
        challenge_id: submission.challenge_id,
        code: submission.code,
        language: submission.language || 'javascript',
        passed: submission.passed,
        test_results: submission.test_results,
        execution_time_ms: submission.execution_time_ms,
      },
    ])

    if (error) {
      console.warn('[labs] Error saving lab submission:', error.message)
      return false
    }

    return true
  } catch (err) {
    console.warn('[labs] Network/DB exception:', err)
    return false
  }
}

export async function getUserLabHistory(userId: string, challengeId?: string): Promise<LabSubmission[]> {
  try {
    let query = supabase
      .from('lab_submissions')
      .select('*')
      .eq('user_id', userId)
      .order('submitted_at', { ascending: false })

    if (challengeId) {
      query = query.eq('challenge_id', challengeId)
    }

    const { data, error } = await query.limit(20)

    if (error) {
      console.warn('[labs] Error fetching lab history:', error.message)
      return []
    }

    return data || []
  } catch (err) {
    console.warn('[labs] Network/DB exception:', err)
    return []
  }
}

