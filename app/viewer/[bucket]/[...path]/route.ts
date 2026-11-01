import { NextResponse } from 'next/server'

interface RouteParams {
  params: {
    bucket: string
    path: string[]
  }
}

export async function GET(request: Request, { params }: RouteParams) {
  const { bucket, path } = params

  // Security whitelist: only allow simulators and flashcards
  if (bucket !== 'simulators' && bucket !== 'flashcards') {
    return new NextResponse('Invalid storage bucket requested', { status: 400 })
  }

  const filePath = (path || []).join('/')
  if (!filePath) {
    return new NextResponse('File path not provided', { status: 400 })
  }

  const supabaseUrl = (
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://byarghndcbqsrixgrrzn.supabase.co'
  ).replace(/\/+$/, '')

  const targetUrl = `${supabaseUrl}/storage/v1/object/public/${bucket}/${filePath}`

  try {
    const response = await fetch(targetUrl, {
      next: { revalidate: 3600 }, // Cache on edge for 1 hour
    })

    if (!response.ok) {
      return new NextResponse(`Tool asset not found at ${targetUrl}`, {
        status: response.status,
      })
    }

    const htmlContent = await response.text()

    return new NextResponse(htmlContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400',
      },
    })
  } catch (err: any) {
    return new NextResponse(`Failed to fetch tool asset: ${err?.message || 'Unknown error'}`, {
      status: 500,
    })
  }
}

