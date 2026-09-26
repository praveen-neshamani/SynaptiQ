'use client'

import { useEffect, useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { getAllCourses } from '@/lib/coursesRegistry'
import { getRandomQuote } from '@/lib/quotes'

// Elegant SVG Icons matching SynaptiQ Burgundy & Porcelain Design
function BrainIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04" />
    </svg>
  )
}

function ChartBarIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  )
}

function QuoteMarkIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#8B3A62">
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
    </svg>
  )
}

function CourseVectorIcon({ courseId }: { courseId: string }) {
  if (courseId === 'tree-graph-traversals') {
    return (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8B3A62" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="5" r="2.8" fill="#8B3A62" />
        <circle cx="6" cy="18" r="2.8" fill="#8B3A62" />
        <circle cx="18" cy="18" r="2.8" fill="#8B3A62" />
        <path d="M12 7.8v3.4" />
        <path d="M12 11.2L6 15.2" />
        <path d="M12 11.2L18 15.2" />
      </svg>
    )
  }

  if (courseId === 'sorting-searching') {
    return (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8B3A62" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="14" width="3" height="7" rx="1" fill="#8B3A62" />
        <rect x="8" y="10" width="3" height="11" rx="1" fill="#8B3A62" />
        <rect x="13" y="5" width="3" height="16" rx="1" fill="#8B3A62" />
        <circle cx="18" cy="8" r="3" strokeWidth="2" />
        <line x1="20.2" y1="10.2" x2="22.5" y2="12.5" strokeWidth="2" />
      </svg>
    )
  }

  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8B3A62" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  )
}

function VideoCamIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8B3A62" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="14" height="14" rx="2.5" />
      <polygon points="22 8 16 12 22 16 22 8" fill="#8B3A62" />
    </svg>
  )
}

function BookOpenIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8B3A62" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  )
}

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

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
        fontFamily: "'Rockwell', 'Rockwell Nova', 'Clarendon', 'Clarendon MT', 'Besley', Georgia, serif",
      }}>
        <div style={{ fontSize: 18, color: '#8B3A62', fontWeight: 600 }}>Loading SynaptiQ...</div>
      </div>
    )
  }

  const email = session?.user?.email || ''
  const studentName = email ? email.split('@')[0] : 'Student'

  const startCourse = (courseId: string) => {
    router.push(`/learn?course=${courseId}`)
  }

  return (
    <div
      className="student-dashboard"
      style={{
        minHeight: '100vh',
        background: '#F5F5F0', // Porcelain white
        color: '#2d2d2d',
        fontFamily: "'Rockwell', 'Rockwell Nova', 'Clarendon', 'Clarendon MT', 'Besley', Georgia, serif",
      }}
    >
      {/* Top Bar - Burgundy Pink */}
      <div style={{
        padding: '16px 32px',
        background: '#8B3A62', // Burgundy pink
        boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            background: 'rgba(255,255,255,0.18)',
            border: '1px solid rgba(255,255,255,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <BrainIcon />
          </div>
          <div>
            <span style={{ fontSize: 24, fontWeight: 700, color: '#fff', letterSpacing: '-0.01em', display: 'block', lineHeight: 1.1 }}>
              SynaptiQ
            </span>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.85)', letterSpacing: '0.02em' }}>
              Adaptive Learning Platform
            </span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={() => router.push('/faculty/analytics')}
            style={{
              padding: '8px 16px',
              background: 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.35)',
              borderRadius: 6,
              color: '#fff',
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.25)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
          >
            <ChartBarIcon />
            <span>Faculty Analytics</span>
          </button>
          <button
            onClick={logout}
            style={{
              padding: '8px 16px',
              background: 'rgba(255,255,255,0.2)',
              border: '1px solid rgba(255,255,255,0.35)',
              borderRadius: 6,
              color: '#fff',
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 600,
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.3)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.2)')}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: '40px 32px', maxWidth: 1200, margin: '0 auto' }}>
        {/* Welcome Section */}
        <div style={{ marginBottom: 32 }}>
          <h1 style={{
            fontSize: 32,
            fontWeight: 700,
            color: '#8B3A62', // Burgundy pink
            margin: '0 0 8px',
            letterSpacing: '-0.02em',
          }}>
            Welcome back, {studentName}
          </h1>
          <p style={{
            margin: 0,
            fontSize: 15,
            color: '#666666',
            lineHeight: 1.5,
          }}>
            Continue your personalized learning journey with adaptive real-time analytics.
          </p>
        </div>

        {/* Quote Pane */}
        {mounted && quote.text && (
          <div style={{
            background: '#ffffff',
            border: '2px solid #8B3A62',
            borderRadius: 12,
            padding: '24px 28px',
            marginBottom: 44,
            boxShadow: '0 2px 10px rgba(139,58,98,0.08)',
            display: 'flex',
            gap: 18,
            alignItems: 'flex-start',
          }}>
            <div style={{
              width: 40,
              height: 40,
              borderRadius: 8,
              background: '#FFF5F8',
              border: '1.5px solid rgba(139, 58, 98, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              marginTop: 2,
            }}>
              <QuoteMarkIcon />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: 17,
                color: '#2d2d2d',
                fontStyle: 'italic',
                lineHeight: 1.6,
                marginBottom: 10,
              }}>
                "{quote.text}"
              </div>
              <div style={{
                fontSize: 14,
                color: '#8B3A62',
                fontWeight: 600,
                textAlign: 'right',
                letterSpacing: '0.01em',
              }}>
                — {quote.author}
              </div>
            </div>
          </div>
        )}

        {/* Courses Section */}
        <div style={{ marginBottom: 24 }}>
          <h2 style={{
            fontSize: 24,
            fontWeight: 700,
            color: '#8B3A62',
            margin: '0 0 6px',
            letterSpacing: '-0.01em',
          }}>
            Choose Your Learning Path
          </h2>
          <p style={{ margin: 0, fontSize: 14, color: '#666666' }}>
            Structured curriculums with concept checkpoints and AI-assisted attention tracking.
          </p>
        </div>

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
                background: '#ffffff',
                border: '2px solid #8B3A62',
                borderRadius: 12,
                padding: 26,
                cursor: 'pointer',
                transition: 'all 0.22s ease-in-out',
                boxShadow: '0 2px 8px rgba(139,58,98,0.1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#FFF5F8'
                e.currentTarget.style.borderColor = '#A0466E'
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(139,58,98,0.18)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#ffffff'
                e.currentTarget.style.borderColor = '#8B3A62'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(139,58,98,0.1)'
              }}
            >
              <div>
                {/* Course Icon Container blending with Burgundy & Porcelain */}
                <div style={{
                  width: 54,
                  height: 54,
                  borderRadius: 12,
                  background: '#FFF5F8',
                  border: '1.5px solid rgba(139, 58, 98, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 18,
                }}>
                  <CourseVectorIcon courseId={course.id} />
                </div>

                <h3 style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: '#8B3A62',
                  margin: '0 0 10px',
                  letterSpacing: '-0.01em',
                }}>
                  {course.title}
                </h3>
                <p style={{
                  fontSize: 14,
                  color: '#555555',
                  lineHeight: 1.6,
                  margin: '0 0 20px',
                }}>
                  {course.description}
                </p>
              </div>

              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  fontSize: 13,
                  color: '#666666',
                  paddingTop: 12,
                  borderTop: '1px solid rgba(139, 58, 98, 0.15)',
                  marginBottom: 16,
                }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <VideoCamIcon />
                    <span>{course.mainVideos.length} lecture modules</span>
                  </span>
                  <span style={{ color: '#ccc' }}>•</span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <BookOpenIcon />
                    <span>{Object.keys(course.fundamentals).length} core fundamentals</span>
                  </span>
                </div>

                <button
                  style={{
                    padding: '11px 20px',
                    background: '#8B3A62',
                    border: 'none',
                    borderRadius: 8,
                    color: '#ffffff',
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: 14,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#6E2D4E')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = '#8B3A62')}
                >
                  <span>Start Learning</span>
                  <ArrowRightIcon />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

