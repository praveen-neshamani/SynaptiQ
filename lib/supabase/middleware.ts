import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://byarghndcbqsrixgrrzn.supabase.co'
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_placeholder_anon_key'

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
        supabaseResponse = NextResponse.next({
          request,
        })
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        )
      },
    },
  })

  // Refresh auth session
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname

  // Public paths that do not require authentication
  const isPublicPath =
    pathname === '/login' ||
    pathname === '/faculty/login' ||
    pathname.startsWith('/auth/callback') ||
    pathname.startsWith('/api/auth') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/videos') ||
    pathname.startsWith('/viewer') ||
    pathname.startsWith('/models')

  // Helper to construct a redirect response while PRESERVING all cookies set/refreshed by Supabase
  const createRedirectResponse = (targetPath: string) => {
    const url = request.nextUrl.clone()
    url.pathname = targetPath
    const redirectResponse = NextResponse.redirect(url)
    
    // Copy all cookies from supabaseResponse to the redirect response
    // Without this, redirects wipe out refreshed authentication cookies!
    supabaseResponse.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie.name, cookie.value, cookie)
    })
    return redirectResponse
  }

  // If user is not logged in and requesting a protected page
  if (!user && !isPublicPath) {
    if (pathname.startsWith('/faculty')) {
      return createRedirectResponse('/faculty/login')
    }
    return createRedirectResponse('/login')
  }

  // If user is logged in and visits login pages, redirect to respective dashboard
  if (user) {
    const role = (user.user_metadata?.role as string) || 'student'

    if (pathname === '/login') {
      return createRedirectResponse(role === 'faculty' ? '/faculty/analytics' : '/dashboard')
    }

    if (pathname === '/faculty/login') {
      return createRedirectResponse('/faculty/analytics')
    }

    // Role protection: if a student tries to access /faculty/analytics, redirect to /dashboard
    if (pathname.startsWith('/faculty') && role !== 'faculty') {
      return createRedirectResponse('/dashboard')
    }
  }

  return supabaseResponse
}
