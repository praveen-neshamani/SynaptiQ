'use client'

import { useEffect, useState, useCallback } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export interface UserProfile {
  id: string
  email: string
  displayName?: string
  avatarUrl?: string
  role: 'student' | 'faculty' | 'admin'
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const router = useRouter()

  const refreshUser = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    } catch {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    // Initial fetch
    refreshUser()

    // Listen to Supabase auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [refreshUser])

  const userRole = (user?.user_metadata?.role as 'student' | 'faculty' | 'admin') || 'student'
  const displayName = user?.user_metadata?.full_name || user?.user_metadata?.name || (user?.email ? user.email.split('@')[0] : '')

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    router.push('/login')
  }

  const signInWithEmail = async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({
      email,
      password,
    })
  }

  const signUpWithEmail = async (email: string, password: string, role: 'student' | 'faculty' = 'student', fullName?: string) => {
    return await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role,
          full_name: fullName || email.split('@')[0],
        },
      },
    })
  }

  const signInWithOAuth = async (provider: 'google' | 'github', role: 'student' | 'faculty' = 'student') => {
    const origin = typeof window !== 'undefined' ? window.location.origin : ''
    const nextDestination = role === 'faculty' ? '/faculty/analytics' : '/dashboard'
    
    return await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${origin}/auth/callback?next=${encodeURIComponent(nextDestination)}`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    })
  }

  return {
    user,
    role: userRole,
    displayName,
    loading,
    signOut,
    signInWithEmail,
    signUpWithEmail,
    signInWithOAuth,
    refreshUser,
  }
}
