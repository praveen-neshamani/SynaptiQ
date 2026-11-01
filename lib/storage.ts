/**
 * Supabase Storage CDN URL Resolver
 * Resolves public URLs for videos, simulators, and flashcards stored in Supabase Storage buckets.
 */

const SUPABASE_BASE_URL = (
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://byarghndcbqsrixgrrzn.supabase.co'
).replace(/\/+$/, '')

export type StorageBucket = 'videos' | 'simulators' | 'flashcards'

/**
 * Returns the direct public CDN URL from Supabase Storage
 */
export function getSupabaseStorageUrl(bucket: StorageBucket, path: string): string {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `${SUPABASE_BASE_URL}/storage/v1/object/public/${bucket}/${cleanPath}`
}

/**
 * Returns the interactive viewer URL for HTML tools (simulators / flashcards)
 * which streams the Supabase storage file with full HTML rendering headers.
 */
export function getInteractiveToolUrl(bucket: 'simulators' | 'flashcards', path: string): string {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `/viewer/${bucket}/${cleanPath}`
}

