import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://byarghndcbqsrixgrrzn.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_placeholder_anon_key'

export function createClient() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}

// Singleton for direct usage in client components
export const supabase = createClient()
