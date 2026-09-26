'use client'

import { useEffect, useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { getAllCourses } from '@/lib/coursesRegistry'
import { getRandomQuote } from '@/lib/quotes'

export default function Dashboard() {
  const { data: session, status } = useSession()
  const [quote, setQuote] = useState({ text: '', author: '' })
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const courses = getAllCourses()

  useEffect(() => {
    setMounted(true)
    setQuote(getRandomQuote())
  }, [])

  useEffect(() => {
    // Temporarily disabled: skip login until instructed
    // if (status === 'unauthenticated') {
    //   router.push('/login')
    // }
  }, [status, router])

  const logout = async () => {
    await signOut({ callbackUrl: '/login' })
  }

  if (status === 'loading') {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#F5F5F0',
      }}>
        <div style={{ fontSize: 18, color: '#8B3A62' }}>Loading...</div>
      </div>
    )
  }

  const email = session?.user?.email || ''

  const startCourse = (courseId: string) => {
    router.push(`/learn?course=${courseId}`)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#F5F5F0', // Porcelain white
      color: '#2d2d2d',
      fontFamily: "'Segoe UI', sans-serif",
    }}>
      {/* Top Bar - Burgundy Pink */}
      <div style={{
        padding: '16px 32px',
        background: '#8B3A62', // Burgundy pink
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 24, fontWeight: 700, color: '#fff' }}>
            🧠 SynaptiQ
          </span>
          <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.8)' }}>Adaptive Learning Platform</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button
            onClick={() => router.push('/faculty/analytics')}
            style={{
              padding: '8px 16px',
              background: 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: 6,
              color: '#fff',
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <span>📊</span>
            <span>Faculty Analytics</span>
          </button>
          <button
            onClick={logout}
            style={{
              padding: '8px 16px',
              background: 'rgba(255,255,255,0.2)',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: 6,
              color: '#fff',
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: '40px 32px', maxWidth: 1200, margin: '0 auto' }}>
        {/* Greeting */}
        <h1 style={{
          fontSize: 32,
          fontWeight: 700,
          color: '#8B3A62', // Burgundy pink
          margin: '0 0 32px',
        }}>
          Hi, {email ? email.split('@')[0] : 'there'}! 👋
        </h1>

        {/* Quote Pane */}
        {mounted && (
          <div style={{
            background: '#fff',
            border: '2px solid #8B3A62',
            borderRadius: 12,
            padding: 24,
            marginBottom: 48,
            boxShadow: '0 2px 8px rgba(139,58,98,0.1)',
          }}>
            <div style={{ fontSize: 18, color: '#2d2d2d', fontStyle: 'italic', marginBottom: 12 }}>
              "{quote.text}"
            </div>
            <div style={{ fontSize: 14, color: '#666', textAlign: 'right' }}>
              — {quote.author}
            </div>
          </div>
        )}

        {/* Courses Section */}
        <h2 style={{
          fontSize: 24,
          fontWeight: 600,
          color: '#8B3A62',
          marginBottom: 24,
        }}>
          Choose Your Learning Path
        </h2>

        {/* Course Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: 24,
        }}>
          {courses.map((course) => (
            <div
              key={course.id}
              onClick={() => startCourse(course.id)}
              style={{
                background: '#fff',
                border: '2px solid #8B3A62',
                borderRadius: 12,
                padding: 24,
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 2px 8px rgba(139,58,98,0.1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#FFF5F8'
                e.currentTarget.style.borderColor = '#A0466E'
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(139,58,98,0.2)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#fff'
                e.currentTarget.style.borderColor = '#8B3A62'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(139,58,98,0.1)'
              }}
            >
              <div style={{ fontSize: 48, marginBottom: 16 }}>{course.thumbnail}</div>
              <h3 style={{
                fontSize: 20,
                fontWeight: 600,
                color: '#8B3A62',
                margin: '0 0 12px',
              }}>
                {course.title}
              </h3>
              <p style={{
                fontSize: 14,
                color: '#666',
                lineHeight: 1.6,
                margin: '0 0 16px',
              }}>
                {course.description}
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 13,
                color: '#999',
              }}>
                <span>📹 {course.mainVideos.length} videos</span>
                <span>•</span>
                <span>📚 {Object.keys(course.fundamentals).length} fundamentals</span>
              </div>
              <button
                style={{
                  marginTop: 16,
                  padding: '10px 20px',
                  background: '#8B3A62',
                  border: 'none',
                  borderRadius: 8,
                  color: '#fff',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: 14,
                  width: '100%',
                }}
              >
                Start Learning →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

