import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://byarghndcbqsrixgrrzn.supabase.co'
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_placeholder_anon_key'

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value
      },
      set(name: string, value: string, options: CookieOptions) {
        request.cookies.set({
          name,
          value,
          ...options,
        })
        supabaseResponse = NextResponse.next({
          request: {
            headers: request.headers,
          },
        })
        supabaseResponse.cookies.set({
          name,
          value,
          ...options,
        })
      },
      remove(name: string, options: CookieOptions) {
        request.cookies.set({
          name,
          value: '',
          ...options,
        })
        supabaseResponse = NextResponse.next({
          request: {
            headers: request.headers,
          },
        })
        supabaseResponse.cookies.set({
          name,
          value: '',
          ...options,
        })
      },
    },
  })

  // Do not run on static assets or Next internal files
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

  // If user is not logged in and requesting a protected page
  if (!user && !isPublicPath) {
    // If attempting to access faculty dashboard, redirect to faculty login
    if (pathname.startsWith('/faculty')) {
      const url = request.nextUrl.clone()
      url.pathname = '/faculty/login'
      return NextResponse.redirect(url)
    }

    // Default protected routes redirect to student login
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // If user is logged in and visits login pages, redirect to respective dashboard
  if (user) {
    const role = (user.user_metadata?.role as string) || 'student'

    if (pathname === '/login') {
      const url = request.nextUrl.clone()
      url.pathname = role === 'faculty' ? '/faculty/analytics' : '/dashboard'
      return NextResponse.redirect(url)
    }

    if (pathname === '/faculty/login') {
      const url = request.nextUrl.clone()
      url.pathname = '/faculty/analytics'
      return NextResponse.redirect(url)
    }

    // Role protection: if a student tries to access /faculty/analytics, redirect to /dashboard
    if (pathname.startsWith('/faculty') && role !== 'faculty') {
      // Allow access if faculty or admin
      const url = request.nextUrl.clone()
      url.pathname = '/dashboard'
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}
