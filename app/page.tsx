'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

export default function Home() {
  const router = useRouter()
  const { user, role, loading } = useAuth()

  useEffect(() => {
    if (!loading) {
      if (user) {
        if (role === 'faculty') {
          router.replace('/faculty/analytics')
        } else {
          router.replace('/dashboard')
        }
      } else {
        router.replace('/login')
      }
    }
  }, [user, role, loading, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F0]">
      <div className="flex items-center gap-3 text-[#8B3A62] font-semibold text-base">
        <svg className="animate-spin h-5 w-5 text-[#8B3A62]" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
        <span>Initializing SynaptiQ...</span>
      </div>
    </div>
  )
}
