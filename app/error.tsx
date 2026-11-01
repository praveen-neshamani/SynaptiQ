'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Unhandled platform error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-[#F5F5F0] flex flex-col justify-center items-center px-4 font-sans text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-rose-600 text-white shadow-sm mb-4">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#171717] mb-2">
        System Runtime Exception
      </h1>
      <p className="text-sm text-slate-600 max-w-md mb-6">
        An unexpected error occurred during execution. You may attempt to re-render the workspace or return to the cockpit.
      </p>
      <div className="flex items-center gap-3">
        <button
          onClick={() => reset()}
          className="py-2.5 px-5 rounded-lg bg-[#8B3A62] hover:bg-[#722F50] text-white text-sm font-semibold transition-colors shadow-xs cursor-pointer"
        >
          Try Again
        </button>
        <Link
          href="/dashboard"
          className="py-2.5 px-5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium transition-colors shadow-xs"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  )
}

