import { supabase } from '@/lib/supabase/client'
import { Profile } from './types'

export async function getUserProfile(userId: string): Promise<Profile | null> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle()

    if (error) {
      console.warn('[profiles] Error fetching profile:', error.message)
      return null
    }

    return data
  } catch (err) {
    console.warn('[profiles] Network/DB exception:', err)
    return null
  }
}

export async function updateUserPreferences(
  userId: string,
  preferences: {
    theme?: 'light' | 'dark'
    codeLabFontSize?: number
    codeLabTabSize?: number
  }
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('profiles')
      .update({ preferences })
      .eq('id', userId)

    if (error) {
      console.warn('[profiles] Error updating preferences:', error.message)
      return false
    }

    return true
  } catch (err) {
    console.warn('[profiles] Network/DB exception:', err)
    return false
  }
}

