'use client'

import { useState, useRef, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import AttentionTracker from '@/components/AttentionTracker'
import KnowledgeGraph from '@/components/KnowledgeGraph'
import CodePlayground from '@/components/CodePlayground'
import AxonBuddy from '@/components/AxonBuddy'
import { getCourse } from '@/lib/coursesRegistry'
import { CourseVideo, QuizQuestion } from '@/lib/courseData'

// ─────────────────────────────────────────────────────────────
// app/learn/page.tsx
//
// Layout:
//   Left  60% → webcam strip + video player + quiz screens
//   Right 40% → KnowledgeGraph (always visible)
//
// All existing logic preserved:
//   - AI quiz generation with fallback
//   - Weakness detection → fundamentals insertion
//   - Attention tracking (distraction + sleep)
//   - Difficulty adaptation
// ─────────────────────────────────────────────────────────────

type Screen = 'video' | 'quiz_intro' | 'quiz' | 'kudos' | 'needs_basics'

function LearnContent() {
  const searchParams = useSearchParams()
  const courseId = searchParams.get('course') || 'tree-graph-traversals'
  const course = getCourse(courseId)

  if (!course) {
    return (
      <div style={{ padding: 40, textAlign: 'center', color: '#ef4444' }}>
        <h1>Course not found</h1>
        <p>The course "{courseId}" does not exist.</p>
      </div>
    )
  }

  const [playlist, setPlaylist] = useState<CourseVideo[]>([...course.mainVideos])
  const [currentIndex, setCurrentIndex] = useState(0)

  // ── AxonBuddy State ───────────────────────────────────────
  const [showAxonBuddy, setShowAxonBuddy] = useState(false)
  const [axonBuddyData, setAxonBuddyData] = useState<{
    correctAnswer: string
    explanation: string
  } | null>(null)

  // ── Screen ────────────────────────────────────────────────
  const [screen, setScreen] = useState<Screen>('video')

  // ── Quiz ──────────────────────────────────────────────────
  const [quizQuestions, setQuizQuestions]   = useState<QuizQuestion[]>([])
  const [quizLoading, setQuizLoading]       = useState(false)
  const [currentQIndex, setCurrentQIndex]   = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [answered, setAnswered]             = useState(false)
  const [correctCount, setCorrectCount]     = useState(0)
  const [difficulty, setDifficulty]         = useState<'easy' | 'medium' | 'hard'>('medium')
  const [explanation, setExplanation]       = useState<string>('')
  const [loadingExplanation, setLoadingExplanation] = useState(false)
  const [streak, setStreak]                 = useState(0)

  // ── Graph state ───────────────────────────────────────────
  // newlyInsertedId triggers the flash animation in KnowledgeGraph
  const [newlyInsertedId, setNewlyInsertedId] = useState<string | null>(null)

  // ── Right panel tab state ─────────────────────────────────
  const [rightTab, setRightTab] = useState<'graph' | 'code'>('graph')

  // ── Feedback ──────────────────────────────────────────────
  const [warning, setWarning]                   = useState('')
  const [insertedVideoTitle, setInsertedVideoTitle] = useState('')

  // ── Video ref ─────────────────────────────────────────────
  const videoRef = useRef<HTMLVideoElement>(null)

  const currentVideo = playlist[currentIndex]
  const isLastVideo  = currentIndex >= playlist.length - 1

  // ── Reset when video changes ──────────────────────────────
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load()
      videoRef.current.play().catch(() => {})
    }
    setScreen('video')
    setWarning('')
  }, [currentIndex])

  // ── Clear flash signal after 3s ───────────────────────────
  useEffect(() => {
    if (!newlyInsertedId) return
    const t = setTimeout(() => setNewlyInsertedId(null), 3000)
    return () => clearTimeout(t)
  }, [newlyInsertedId])

  // ── Attention callbacks ───────────────────────────────────
  const handleDistraction = () => {
    setWarning('⚠️ You are distracted! Please look at the screen.')
    videoRef.current?.pause()
  }

  const handleSleep = () => {
    setWarning('😴 You seem sleepy! Take a short break before continuing.')
    videoRef.current?.pause()
  }

  const dismissWarning = () => {
    setWarning('')
    if (screen === 'video') videoRef.current?.play()
  }

  // ── Video ends → show quiz intro ────────────────────────────────
  const handleVideoEnd = () => {
    setScreen('quiz_intro')
  }

  // ── User clicks OK → load and show quiz ──────────────────────────
  const handleStartQuiz = async () => {
    setScreen('quiz')
    setCurrentQIndex(0)
    setCorrectCount(0)
    setSelectedOption(null)
    setAnswered(false)
    await loadQuiz()
  }

  // ── Load AI quiz (fallback to static) ─────────────────────
  const loadQuiz = async () => {
    setQuizLoading(true)
    // Always use fallback quizzes with explanations (no AI generation)
    setQuizQuestions(course.quizzes[currentVideo.id] || [])
    setQuizLoading(false)
  }

  // ── Answer selected ───────────────────────────────────────
  const handleOptionSelect = async (index: number) => {
    if (answered) return
    setSelectedOption(index)
    setAnswered(true)
    
    const isCorrect = index === quizQuestions[currentQIndex].correctIndex
    
    if (isCorrect) {
      setCorrectCount((c) => c + 1)
      setExplanation('')
    } else {
      // Wrong answer - show AxonBuddy with explanation
      const currentQ = quizQuestions[currentQIndex]
      const correctAns = currentQ.options[currentQ.correctIndex]
      const exp = currentQ.explanation || 'Review the video content to understand this concept better.'
      
      console.log('AxonBuddy Data:', { correctAns, exp, hasExplanation: !!currentQ.explanation })
      
      setAxonBuddyData({
        correctAnswer: correctAns,
        explanation: exp,
      })
      setShowAxonBuddy(true)
    }
  }

  // ── Next question / end of quiz ───────────────────────────
  const handleNext = async () => {
    const isLastQ = currentQIndex >= quizQuestions.length - 1

    if (!isLastQ) {
      setCurrentQIndex((i) => i + 1)
      setSelectedOption(null)
      setAnswered(false)
      setExplanation('')
      return
    }

    // Check if ANY question was answered wrong
    const currentCorrect = selectedOption === quizQuestions[currentQIndex].correctIndex
    const anyMistake = correctCount < quizQuestions.length - 1 || !currentCorrect

    if (!anyMistake) {
      // Perfect score - increase difficulty and streak
      if (difficulty !== 'hard') {
        setDifficulty(difficulty === 'easy' ? 'medium' : 'hard')
      }
      setStreak(prev => prev + 1)
      setScreen('kudos')
    } else {
      // ANY mistake → lower difficulty and reset streak
      setStreak(0)
      
      // Direct mapping: BFS→queue, DFS→stack, BST→tree
      const fundamentalMap: Record<string, string> = {
        'bfs': 'queue',
        'dfs': 'stack',
        'bst': 'tree',
      }
      
      const weakKey = fundamentalMap[currentVideo.id]
      const fundVideo = weakKey ? course.fundamentals[weakKey] : null

      if (fundVideo) {
        const alreadyInserted = playlist.some((v) => v.id === fundVideo.id)
        
        if (!alreadyInserted) {
          const newPlaylist = [...playlist]
          newPlaylist.splice(currentIndex + 1, 0, {
            ...fundVideo,
            insertedAfter: currentVideo.id,
          })
          setPlaylist(newPlaylist)
          setNewlyInsertedId(fundVideo.id)
        }
        setInsertedVideoTitle(fundVideo.title)
        setScreen('needs_basics')
      } else {
        // No fundamental found, just continue
        setScreen('kudos')
      }
    }
  }



  // ── Navigation ────────────────────────────────────────────
  const goToNextVideo = () => {
    if (!isLastVideo) setCurrentIndex((i) => i + 1)
    else setScreen('video')
  }

  // ─────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────
  return (
    <>
      {/* ── Page shell ───────────────────────────────────────── */}
      <div style={{
        minHeight: '100vh',
        background: '#F5F5F0',
        color: '#2d2d2d',
        display: 'flex',
        flexDirection: 'column',
      }}>

        {/* ── Top bar ─────────────────────────────────────────── */}
        <div style={{
          padding: '12px 24px',
          background: '#8B3A62',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}>
          <span style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>
            🧠 SynaptiQ
          </span>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>Adaptive Learning</span>
          <span style={{
            marginLeft: 'auto',
            fontSize: 12,
            color: '#fff',
            background: 'rgba(255,255,255,0.2)',
            padding: '3px 10px',
            borderRadius: 20,
            border: '1px solid rgba(255,255,255,0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}>
            <span>
              🔥 Streak: <b style={{ color: '#fff' }}>{streak}</b>
            </span>
            <span style={{ color: 'rgba(255,255,255,0.5)' }}>•</span>
            <span>
              Difficulty: <b style={{ color: '#fff' }}>{difficulty}</b>
            </span>
            <span style={{ color: 'rgba(255,255,255,0.5)' }}>•</span>
            <span>
              Video {currentIndex + 1} / {playlist.length}
            </span>
          </span>
        </div>

        {/* ── Main content: left panel + right graph ───────────── */}
        <div style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: '3fr 2fr',
          gap: 0,
          minHeight: 0,
        }}>

          {/* ════════════════════════════════════════════════════
              LEFT PANEL
          ════════════════════════════════════════════════════ */}
          <div style={{
            borderRight: '1px solid rgba(99,102,241,0.15)',
            display: 'flex',
            flexDirection: 'column',
            padding: '16px 20px',
            gap: 12,
            overflowY: 'auto',
          }}>

            {/* ── Webcam + attention tracker strip ──────────────── */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '8px 12px',
              background: '#fff',
              borderRadius: 10,
              border: '2px solid #8B3A62',
            }}>
              <AttentionTracker
                onDistraction={handleDistraction}
                onSleep={handleSleep}
              />
            </div>

            {/* ── Warning banner ─────────────────────────────────── */}
            {warning && (
              <div style={{
                padding: '10px 14px',
                background: 'rgba(245,158,11,0.1)',
                border: '1px solid rgba(245,158,11,0.4)',
                borderRadius: 8,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <span style={{ color: '#fbbf24', fontWeight: 600, fontSize: 14 }}>
                  {warning}
                </span>
                <button
                  onClick={dismissWarning}
                  style={{
                    padding: '4px 12px',
                    borderRadius: 6,
                    border: '1px solid rgba(245,158,11,0.5)',
                    background: 'transparent',
                    color: '#fbbf24',
                    cursor: 'pointer',
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  I&apos;m back ✋
                </button>
              </div>
            )}

            {/* ════════════════════════════════════════════════════
                SCREEN 1 — VIDEO
            ════════════════════════════════════════════════════ */}
            {screen === 'video' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <h2 style={{ margin: 0, fontSize: 18, color: '#8B3A62' }}>
                  {currentVideo.title}
                </h2>
                {currentVideo.url.includes('youtube.com') || currentVideo.url.includes('youtu.be') || currentVideo.url.includes('drive.google.com') ? (
                  <>
                    {/* YouTube or Google Drive embed */}
                    <iframe
                      src={currentVideo.url.replace('/view', '/preview')}
                      style={{
                        width: '100%',
                        height: 480,
                        borderRadius: 10,
                        border: '1px solid #8B3A62',
                      }}
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                    />
                    {/* Manual button for iframe videos */}
                    <button
                      onClick={handleVideoEnd}
                      style={{
                        marginTop: 12,
                        padding: '12px 24px',
                        background: '#4f46e5',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 8,
                        cursor: 'pointer',
                        fontWeight: 600,
                        fontSize: 14,
                      }}
                    >
                      I've Finished Watching → Take Quiz
                    </button>
                  </>
                ) : (
                  // Regular video (local files)
                  <video
                    ref={videoRef}
                    width="100%"
                    controls
                    onEnded={handleVideoEnd}
                    style={{ borderRadius: 10, border: '1px solid rgba(99,102,241,0.2)' }}
                  >
                    <source src={currentVideo.url} type="video/mp4" />
                  </video>
                )}
                <p style={{ margin: 0, fontSize: 12, color: '#2d2d2d' }}>
                  📖 Watch the full video — {currentVideo.url.includes('youtube.com') || currentVideo.url.includes('drive.google.com') ? 'click button when done' : 'quiz appears when it ends'}.
                </p>

                {/* ── Interactive Learning Tools ──────────────────── */}
                {(currentVideo.simulatorUrl || currentVideo.flashcardsUrl) && (
                  <div style={{
                    marginTop: 12,
                    padding: 16,
                    background: '#fff',
                    border: '2px solid #8B3A62',
                    borderRadius: 10,
                  }}>
                    <h3 style={{
                      margin: '0 0 12px',
                      fontSize: 14,
                      fontWeight: 600,
                      color: '#8B3A62',
                      letterSpacing: '0.03em',
                    }}>
                      🎯 Interactive Learning Tools
                    </h3>
                    <div style={{ display: 'flex', gap: 10 }}>
                      {currentVideo.simulatorUrl && (
                        <a
                          href={currentVideo.simulatorUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            flex: 1,
                            padding: '12px 16px',
                            background: '#8B3A62',
                            border: '1px solid #8B3A62',
                            borderRadius: 8,
                            color: '#fff',
                            textDecoration: 'none',
                            textAlign: 'center',
                            fontWeight: 600,
                            fontSize: 13,
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 6,
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)'
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(139,58,98,0.4)'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)'
                            e.currentTarget.style.boxShadow = 'none'
                          }}
                        >
                          <span style={{ fontSize: 16 }}>🧪</span>
                          <span>Try Simulator</span>
                        </a>
                      )}
                      {currentVideo.flashcardsUrl && (
                        <a
                          href={currentVideo.flashcardsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            flex: 1,
                            padding: '12px 16px',
                            background: '#8B3A62',
                            border: '1px solid #8B3A62',
                            borderRadius: 8,
                            color: '#fff',
                            textDecoration: 'none',
                            textAlign: 'center',
                            fontWeight: 600,
                            fontSize: 13,
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 6,
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)'
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(139,58,98,0.4)'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)'
                            e.currentTarget.style.boxShadow = 'none'
                          }}
                        >
                          <span style={{ fontSize: 16 }}>🎴</span>
                          <span>Study Flashcards</span>
                        </a>
                      )}
                    </div>
                    <p style={{
                      margin: '10px 0 0',
                      fontSize: 12,
                      color: '#2d2d2d',
                      textAlign: 'center',
                    }}>
                      Practice concepts interactively while watching
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* ════════════════════════════════════════════════════
                SCREEN 2 — QUIZ INTRO (Transition)
            ════════════════════════════════════════════════════ */}
            {screen === 'quiz_intro' && (
              <div style={{
                background: '#fff',
                border: '2px solid #8B3A62',
                borderRadius: 12,
                padding: 40,
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 16,
              }}>
                <div style={{ fontSize: 64 }}>🎓</div>
                <h2 style={{ color: '#8B3A62', fontSize: 24, margin: 0 }}>
                  Let's test your knowledge!
                </h2>
                <p style={{ color: '#2d2d2d', fontSize: 14, lineHeight: 1.6, maxWidth: 400 }}>
                  You've completed <b>{currentVideo.title}</b>. Ready to see how much you've learned?
                </p>
                <button
                  onClick={handleStartQuiz}
                  style={{
                    marginTop: 8,
                    padding: '12px 32px',
                    background: '#8B3A62',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: 16,
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#A0466E'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#8B3A62'}
                >
                  OK, I'm Ready! 🚀
                </button>
              </div>
            )}

            {/* ════════════════════════════════════════════════════
                SCREEN 3 — QUIZ
            ════════════════════════════════════════════════════ */}
            {screen === 'quiz' && (
              <div style={{
                background: '#fff',
                border: '2px solid #8B3A62',
                borderRadius: 12,
                padding: 20,
              }}>
                <h2 style={{ margin: '0 0 4px', fontSize: 17, color: '#8B3A62' }}>
                  Quiz — {currentVideo.title}
                </h2>
                <p style={{ margin: '0 0 16px', fontSize: 12, color: '#2d2d2d' }}>
                  Question {currentQIndex + 1} of {quizQuestions.length}
                  &nbsp;·&nbsp;Difficulty: {difficulty}
                </p>

                {quizLoading ? (
                  <p style={{ color: '#8B3A62' }}>⏳ Generating questions...</p>
                ) : quizQuestions.length === 0 ? (
                  <div>
                    <p style={{ color: '#8B3A62' }}>⚠️ Could not load questions.</p>
                    <button
                      onClick={loadQuiz}
                      style={{
                        padding: '6px 14px', borderRadius: 6,
                        background: '#8B3A62',
                        border: '1px solid #8B3A62',
                        color: '#fff', cursor: 'pointer',
                      }}
                    >
                      Retry
                    </button>
                  </div>
                ) : (
                  <>
                    <p style={{ fontWeight: 600, fontSize: 15, marginBottom: 14, color: '#2d2d2d' }}>
                      {quizQuestions[currentQIndex].question}
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {quizQuestions[currentQIndex].options.map((opt, idx) => {
                        const isCorrect = idx === quizQuestions[currentQIndex].correctIndex
                        const isSelected = idx === selectedOption

                        let bg     = '#F5F5F0'
                        let border = '2px solid #8B3A62'
                        let color  = '#2d2d2d'

                        if (answered) {
                          if (isCorrect)              { bg = '#8B3A62';  border = '2px solid #8B3A62'; color = '#fff' }
                          else if (isSelected)        { bg = '#F5F5F0'; border = '2px solid #8B3A62'; color = '#8B3A62' }
                        } else if (isSelected) {
                          bg = '#8B3A62'; border = '2px solid #8B3A62'; color = '#fff'
                        }

                        return (
                          <button
                            key={idx}
                            onClick={() => handleOptionSelect(idx)}
                            style={{
                              padding: '11px 14px',
                              borderRadius: 8,
                              border,
                              background: bg,
                              color,
                              textAlign: 'left',
                              cursor: answered ? 'default' : 'pointer',
                              fontWeight: answered && isCorrect ? 600 : 400,
                              fontSize: 14,
                              transition: 'all 0.15s',
                            }}
                          >
                            {String.fromCharCode(65 + idx)}. {opt}
                            {answered && isCorrect  && ' ✅'}
                            {answered && isSelected && !isCorrect && ' ❌'}
                          </button>
                        )
                      })}
                    </div>

                    {/* Explanation box for wrong answers */}
                    {answered && selectedOption !== null && selectedOption !== quizQuestions[currentQIndex].correctIndex && (
                      <div style={{
                        marginTop: 16,
                        padding: 14,
                        background: '#fff',
                        border: '2px solid #8B3A62',
                        borderRadius: 8,
                      }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                          marginBottom: 8,
                        }}>
                          <span style={{ fontSize: 18 }}>💡</span>
                          <h4 style={{
                            margin: 0,
                            fontSize: 14,
                            fontWeight: 600,
                            color: '#8B3A62',
                          }}>
                            Explanation
                          </h4>
                        </div>
                        {loadingExplanation ? (
                          <p style={{ color: '#8B3A62', fontSize: 13, margin: 0 }}>
                            ⏳ Getting explanation...
                          </p>
                        ) : (
                          <p style={{
                            color: '#2d2d2d',
                            fontSize: 13,
                            lineHeight: 1.6,
                            margin: 0,
                            whiteSpace: 'pre-wrap',
                          }}>
                            {explanation}
                          </p>
                        )}
                      </div>
                    )}

                    {answered && (
                      <button
                        onClick={handleNext}
                        style={{
                          marginTop: 16,
                          padding: '10px 22px',
                          background: '#8B3A62',
                          color: '#fff',
                          border: 'none',
                          borderRadius: 8,
                          cursor: 'pointer',
                          fontWeight: 600,
                          fontSize: 14,
                        }}
                      >
                        {currentQIndex < quizQuestions.length - 1
                          ? 'Next Question →'
                          : 'See Result →'}
                      </button>
                    )}
                  </>
                )}
              </div>
            )}

            {/* ════════════════════════════════════════════════════
                SCREEN 4 — KUDOS
            ════════════════════════════════════════════════════ */}
            {screen === 'kudos' && (
              <div style={{
                background: '#fff',
                border: '2px solid #8B3A62',
                borderRadius: 12,
                padding: 28,
                textAlign: 'center',
              }}>
                <div style={{ fontSize: 52 }}>🎉</div>
                <h2 style={{ color: '#8B3A62', fontSize: 22, margin: '10px 0 6px' }}>
                  Kudos! Keep it up!
                </h2>
                <p style={{ color: '#2d2d2d', fontSize: 14, lineHeight: 1.6 }}>
                  Strong grasp of <b>{currentVideo.title}</b>.<br />
                  {!isLastVideo
                    ? "You're ready for the next advanced concept!"
                    : '🏆 You completed the entire course!'}
                </p>
                {!isLastVideo && (
                  <button
                    onClick={goToNextVideo}
                    style={{
                      marginTop: 16,
                      padding: '10px 24px',
                      background: '#8B3A62',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 8,
                      cursor: 'pointer',
                      fontWeight: 600,
                      fontSize: 14,
                    }}
                  >
                    Next Concept →
                  </button>
                )}
              </div>
            )}

            {/* ════════════════════════════════════════════════════
                SCREEN 5 — NEEDS BASICS (fundamentals inserted)
            ════════════════════════════════════════════════════ */}
            {screen === 'needs_basics' && (
              <div style={{
                background: 'rgba(69,26,3,0.4)',
                border: '1px solid rgba(245,158,11,0.4)',
                borderRadius: 12,
                padding: 28,
                textAlign: 'center',
              }}>
                <div style={{ fontSize: 52 }}>📌</div>
                <h2 style={{ color: '#fbbf24', fontSize: 20, margin: '10px 0 6px' }}>
                  Let&apos;s strengthen your foundation first
                </h2>
                <p style={{ color: '#fde68a', fontSize: 14, lineHeight: 1.6 }}>
                  You need stronger fundamentals in <b>{currentVideo.concept}</b>.<br />
                  A basics video has been added to your graph:
                </p>
                <p style={{
                  margin: '8px 0 0',
                  fontSize: 15,
                  fontWeight: 700,
                  color: '#f59e0b',
                  background: 'rgba(245,158,11,0.1)',
                  borderRadius: 8,
                  padding: '8px 12px',
                  display: 'inline-block',
                }}>
                  {insertedVideoTitle}
                </p>
                <p style={{ color: '#fbbf24', fontSize: 12, marginTop: 8 }}>
                  Watch the basics video, then re-attempt this concept. 💪
                </p>
                <p style={{ color: '#6b7280', fontSize: 12, marginBottom: 12 }}>
                  Check the knowledge graph on the right — you&apos;ll see the new node!
                </p>
                <button
                  onClick={goToNextVideo}
                  style={{
                    padding: '10px 22px',
                    background: '#d97706',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 8,
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: 14,
                  }}
                >
                  Watch Basics Video →
                </button>
              </div>
            )}
          </div>

          {/* ════════════════════════════════════════════════════
              RIGHT PANEL — Tabbed: Knowledge Graph OR Code Lab
          ════════════════════════════════════════════════════ */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            padding: 16,
            minHeight: 0,
          }}>
            {/* Tab buttons */}
            <div style={{
              display: 'flex',
              gap: 8,
              marginBottom: 12,
            }}>
              <button
                onClick={() => setRightTab('graph')}
                style={{
                  flex: 1,
                  padding: '10px 16px',
                  background: rightTab === 'graph' ? '#8B3A62' : '#fff',
                  color: rightTab === 'graph' ? '#fff' : '#8B3A62',
                  border: '2px solid #8B3A62',
                  borderRadius: 8,
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: 14,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  transition: 'all 0.2s',
                }}
              >
                <span>📊</span>
                <span>Knowledge Graph</span>
              </button>
              <button
                onClick={() => setRightTab('code')}
                style={{
                  flex: 1,
                  padding: '10px 16px',
                  background: rightTab === 'code' ? '#8B3A62' : '#fff',
                  color: rightTab === 'code' ? '#fff' : '#8B3A62',
                  border: '2px solid #8B3A62',
                  borderRadius: 8,
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: 14,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  transition: 'all 0.2s',
                }}
              >
                <span>💻</span>
                <span>Code Lab</span>
              </button>
            </div>

            {/* Tab content */}
            <div style={{
              flex: 1,
              minHeight: 0,
              background: '#fff',
              border: '2px solid #8B3A62',
              borderRadius: 12,
              overflow: 'hidden',
            }}>
              {rightTab === 'graph' ? (
                <KnowledgeGraph
                  playlist={playlist}
                  currentIndex={currentIndex}
                  newlyInsertedId={newlyInsertedId}
                />
              ) : (
                <CodePlayground />
              )}
            </div>
          </div>

        </div>
      </div>

      {/* AxonBuddy */}
      {showAxonBuddy && axonBuddyData && (
        <AxonBuddy
          correctAnswer={axonBuddyData.correctAnswer}
          explanation={axonBuddyData.explanation}
          onClose={() => setShowAxonBuddy(false)}
        />
      )}
    </>
  )
}

export default function LearnPage() {
  return (
    <Suspense fallback={<div style={{ padding: 40, textAlign: 'center' }}>Loading...</div>}>
      <LearnContent />
    </Suspense>
  )
}