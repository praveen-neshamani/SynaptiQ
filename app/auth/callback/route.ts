import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') ?? '/dashboard'

  // Ensure robust origin resolution behind Vercel load balancers
  const forwardedHost = request.headers.get('x-forwarded-host')
  const forwardedProto = request.headers.get('x-forwarded-proto') || 'https'
  const isLocalEnv = process.env.NODE_ENV === 'development'
  const origin = isLocalEnv
    ? requestUrl.origin
    : forwardedHost
      ? `${forwardedProto}://${forwardedHost}`
      : requestUrl.origin

  if (code) {
    const cookieStore = cookies()
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://byarghndcbqsrixgrrzn.supabase.co'
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_placeholder_anon_key'

    // Capture cookies set by exchangeCodeForSession to inject into the redirect response
    const cookiesToSetOnResponse: Array<{ name: string; value: string; options: any }> = []

    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            try {
              cookieStore.set(name, value, options)
            } catch {
              // ignore if server context
            }
            cookiesToSetOnResponse.push({ name, value, options })
          })
        },
      },
    })

    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error) {
      const { data: { user } } = await supabase.auth.getUser()
      const role = user?.user_metadata?.role || 'student'

      // Decide destination based on role and requested path
      let destination = next
      if (role === 'faculty' && next === '/dashboard') {
        destination = '/faculty/analytics'
      }

      const cleanDestination = destination.startsWith('/') ? destination : `/${destination}`
      const redirectUrl = new URL(cleanDestination, origin)

      // Create the 303/307 redirect response
      const response = NextResponse.redirect(redirectUrl)

      // CRITICAL: Explicitly set every auth cookie onto the redirect response!
      // In Next.js App Router, NextResponse.redirect does not inherit cookies().set() automatically.
      cookiesToSetOnResponse.forEach(({ name, value, options }) => {
        response.cookies.set(name, value, options)
      })

      return response
    }
  }

  // Return the user to login with error indicator if exchange failed
  return NextResponse.redirect(new URL('/login?error=auth_callback_failed', origin))
}
