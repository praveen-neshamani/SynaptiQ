'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/hooks/useAuth'
import { useMounted } from '@/hooks/useMounted'

export default function StudentLoginPage() {
  const mounted = useMounted()
  const router = useRouter()
  const { user, role, loading: authLoading, signInWithEmail, signUpWithEmail, signInWithOAuth } = useAuth()

  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [fullName, setFullName] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  // Auto-redirect if user is already authenticated
  useEffect(() => {
    if (!authLoading && user) {
      if (role === 'faculty') {
        router.replace('/faculty/analytics')
      } else {
        router.replace('/dashboard')
      }
    }
  }, [authLoading, user, role, router])

  const handleOAuth = async (provider: 'google' | 'github') => {
    try {
      setErrorMessage(null)
      setSubmitting(true)
      const { error } = await signInWithOAuth(provider, 'student')
      if (error) {
        setErrorMessage(error.message || `Failed to authenticate with ${provider}.`)
        setSubmitting(false)
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'An unexpected error occurred.')
      setSubmitting(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)

    if (!email || !password) {
      setErrorMessage('Please enter both email and password.')
      return
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.')
      return
    }

    setSubmitting(true)

    try {
      if (mode === 'signin') {
        const { error } = await signInWithEmail(email, password)
        if (error) {
          setErrorMessage(error.message || 'Invalid email or password.')
          setSubmitting(false)
          return
        }
        router.push('/dashboard')
      } else {
        const { error, data } = await signUpWithEmail(email, password, 'student', fullName)
        if (error) {
          setErrorMessage(error.message || 'Failed to create student account.')
          setSubmitting(false)
          return
        }

        if (data?.session) {
          router.push('/dashboard')
        } else {
          const loginRes = await signInWithEmail(email, password)
          if (!loginRes.error) {
            router.push('/dashboard')
          } else {
            setErrorMessage('Account created. Please sign in with your credentials.')
            setMode('signin')
            setSubmitting(false)
          }
        }
      }
    } catch (err: any) {
      setErrorMessage(err?.message || 'Authentication error. Please try again.')
      setSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#F5F5F0] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans selection:bg-[#8B3A62]/10 selection:text-[#8B3A62]">
      {/* Brand Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="sm:mx-auto sm:w-full sm:max-w-md text-center"
      >
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#8B3A62] text-white shadow-sm mb-4">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7" rx="1.5" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" />
            <rect x="14" y="14" width="7" height="7" rx="1.5" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" />
          </svg>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#171717]">
          SynaptiQ Student Portal
        </h1>
        <p className="mt-2 text-sm text-slate-600 font-normal">
          {mode === 'signin'
            ? 'Sign in to access your adaptive learner cockpit'
            : 'Create your scholar account to begin mastery pathways'}
        </p>
      </motion.div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0">
        <motion.div
          layout
          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
          className="bg-white py-8 px-6 sm:px-8 border border-slate-200/80 rounded-2xl shadow-xs overflow-hidden"
        >
          {/* Mode Switcher Morph Tabs */}
          <div className="flex rounded-lg bg-slate-100 p-1 mb-6 border border-slate-200/60">
            <button
              type="button"
              onClick={() => {
                setErrorMessage(null)
                setMode('signin')
              }}
              className="relative flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors text-center cursor-pointer"
            >
              {mode === 'signin' && (
                mounted ? (
                  <motion.div
                    layoutId="student-auth-tab"
                    className="absolute inset-0 bg-white rounded-md shadow-xs border border-slate-200/70"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                ) : (
                  <div className="absolute inset-0 bg-white rounded-md shadow-xs border border-slate-200/70" />
                )
              )}
              <span className={`relative z-10 ${mode === 'signin' ? 'text-[#8B3A62]' : 'text-slate-600'}`}>
                Sign In
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                setErrorMessage(null)
                setMode('signup')
              }}
              className="relative flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors text-center cursor-pointer"
            >
              {mode === 'signup' && (
                mounted ? (
                  <motion.div
                    layoutId="student-auth-tab"
                    className="absolute inset-0 bg-white rounded-md shadow-xs border border-slate-200/70"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                ) : (
                  <div className="absolute inset-0 bg-white rounded-md shadow-xs border border-slate-200/70" />
                )
              )}
              <span className={`relative z-10 ${mode === 'signup' ? 'text-[#8B3A62]' : 'text-slate-600'}`}>
                Create Account
              </span>
            </button>
          </div>

          {/* Error Banner */}
          <AnimatePresence>
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: 'auto', marginBottom: 24 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="p-3.5 rounded-lg bg-rose-50 border border-rose-200 flex items-start gap-3">
                  <svg className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <p className="text-sm text-rose-800 leading-snug">{errorMessage}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Social Auth Providers */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              onClick={() => handleOAuth('google')}
              disabled={submitting}
              className="w-full inline-flex justify-center items-center gap-2.5 py-2.5 px-4 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-sm font-medium text-slate-700 transition-colors shadow-xs disabled:opacity-50 cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Google</span>
            </button>

            <button
              type="button"
              onClick={() => handleOAuth('github')}
              disabled={submitting}
              className="w-full inline-flex justify-center items-center gap-2.5 py-2.5 px-4 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-sm font-medium text-slate-700 transition-colors shadow-xs disabled:opacity-50 cursor-pointer"
            >
              <svg className="w-4 h-4 text-[#171717]" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
              <span>GitHub</span>
            </button>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-3 text-slate-500 font-medium tracking-wider">
                Or continue with institutional email
              </span>
            </div>
          </div>

          {/* Morphing Form Inputs */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence initial={false} mode="wait">
              {mode === 'signup' && (
                <motion.div
                  key="signup-name-field"
                  initial={{ opacity: 0, height: 0, y: -8 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -8 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  className="overflow-hidden"
                >
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Eleanor Vance"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#8B3A62]/20 focus:border-[#8B3A62] transition-colors"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@srec.ac.in"
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#8B3A62]/20 focus:border-[#8B3A62] transition-colors"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Password
                </label>
                {mode === 'signin' && (
                  <span className="text-xs text-[#8B3A62] hover:underline cursor-pointer">
                    Forgot password?
                  </span>
                )}
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-3.5 pr-11 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#8B3A62]/20 focus:border-[#8B3A62] transition-colors font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-700 transition-colors cursor-pointer focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.985 }}
              type="submit"
              disabled={submitting}
              className="w-full mt-2 py-2.5 px-4 rounded-lg bg-[#8B3A62] hover:bg-[#722F50] text-white text-sm font-semibold transition-colors shadow-xs flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
            >
              {submitting ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  <span>Processing...</span>
                </>
              ) : mode === 'signin' ? (
                'Sign In to Student Cockpit'
              ) : (
                'Create Student Account'
              )}
            </motion.button>
          </form>

          {/* Toggle Sign In / Sign Up Footer */}
          <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <span>
              {mode === 'signin' ? "Don't have an account?" : 'Already registered?'}
            </span>
            <button
              type="button"
              onClick={() => {
                setErrorMessage(null)
                setMode(mode === 'signin' ? 'signup' : 'signin')
              }}
              className="font-semibold text-[#8B3A62] hover:text-[#722F50] transition-colors cursor-pointer"
            >
              {mode === 'signin' ? 'Create an account' : 'Sign in instead'}
            </button>
          </div>
        </motion.div>

        {/* Faculty Navigation Anchor */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="mt-6 text-center"
        >
          <p className="text-xs text-slate-500">
            Faculty educator or researcher?{' '}
            <Link
              href="/faculty/login"
              className="font-semibold text-[#8B3A62] hover:underline inline-flex items-center gap-1"
            >
              <span>Access Faculty Portal</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </p>
        </motion.div>
      </div>
    </main>
  )
}
