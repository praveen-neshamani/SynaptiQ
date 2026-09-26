'use client'

import { useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function Login() {
  const [email, setEmail] = useState('')
  const { data: session } = useSession()
  const router = useRouter()

  // Auto-redirect if already logged in
  if (session) {
    router.push('/dashboard')
    return null
  }

  const handleGoogleLogin = async () => {
    await signIn('google', { callbackUrl: '/dashboard' })
  }

  const handleGitHubLogin = async () => {
    await signIn('github', { callbackUrl: '/dashboard' })
  }

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    await signIn('credentials', { 
      email,
      callbackUrl: '/dashboard' 
    })
  }

  return (
    <div style={{ padding: 20, maxWidth: 400, margin: '0 auto' }}>
      <h1>Login</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button 
          onClick={handleGoogleLogin}
          style={{ padding: 12, backgroundColor: '#4285F4', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}
        >
          Continue with Google
        </button>
        
        <button 
          onClick={handleGitHubLogin}
          style={{ padding: 12, backgroundColor: '#24292e', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}
        >
          Continue with GitHub
        </button>
      </div>

      <div style={{ margin: '20px 0', textAlign: 'center' }}>
        <span style={{ color: '#666' }}>or</span>
      </div>

      <form onSubmit={handleEmailLogin} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: 12, border: '1px solid #ccc', borderRadius: 4 }}
        />
        <button type="submit" style={{ padding: 12, backgroundColor: '#0070f3', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
          Send Magic Link
        </button>
      </form>
    </div>
  )
}