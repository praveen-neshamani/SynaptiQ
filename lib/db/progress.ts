import { supabase } from '@/lib/supabase/client'
import { CourseProgress, ModuleProgress } from './types'

export async function getUserCourseProgress(userId: string, courseId: string): Promise<CourseProgress | null> {
  try {
    const { data, error } = await supabase
      .from('course_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('course_id', courseId)
      .maybeSingle()

    if (error) {
      console.warn('[progress] Error fetching course progress:', error.message)
      return null
    }

    return data
  } catch (err) {
    console.warn('[progress] Network/DB exception:', err)
    return null
  }
}

export async function upsertCourseProgress(
  progress: Omit<CourseProgress, 'id' | 'last_accessed_at'>
): Promise<CourseProgress | null> {
  try {
    const { data, error } = await supabase
      .from('course_progress')
      .upsert(
        {
          ...progress,
          last_accessed_at: new Date().toISOString(),
        },
        { onConflict: 'user_id,course_id' }
      )
      .select()
      .single()

    if (error) {
      console.warn('[progress] Error upserting course progress:', error.message)
      return null
    }

    return data
  } catch (err) {
    console.warn('[progress] Network/DB exception:', err)
    return null
  }
}

export async function getModuleProgressList(userId: string, courseId: string): Promise<ModuleProgress[]> {
  try {
    const { data, error } = await supabase
      .from('module_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('course_id', courseId)

    if (error) {
      console.warn('[progress] Error fetching module progress:', error.message)
      return []
    }

    return data || []
  } catch (err) {
    console.warn('[progress] Network/DB exception:', err)
    return []
  }
}

export async function updateModuleProgress(
  progress: Omit<ModuleProgress, 'id'>
): Promise<ModuleProgress | null> {
  try {
    const { data, error } = await supabase
      .from('module_progress')
      .upsert(progress, { onConflict: 'user_id,course_id,module_id' })
      .select()
      .single()

    if (error) {
      console.warn('[progress] Error saving module progress:', error.message)
      return null
    }

    return data
  } catch (err) {
    console.warn('[progress] Network/DB exception:', err)
    return null
  }
}

