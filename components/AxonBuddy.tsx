'use client'

interface AxonBuddyProps {
  correctAnswer: string
  explanation: string
  onClose: () => void
}

export default function AxonBuddy({ correctAnswer, explanation, onClose }: AxonBuddyProps) {
  return (
    <div style={{
      position: 'fixed',
      bottom: 20,
      right: 20,
      width: 380,
      maxHeight: '70vh',
      background: '#fff',
      border: '3px solid #8B3A62',
      borderRadius: 16,
      boxShadow: '0 8px 32px rgba(139, 58, 98, 0.3)',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 1000,
      animation: 'slideIn 0.3s ease-out',
    }}>
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateY(100px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>

      {/* Header */}
      <div style={{
        padding: '16px 20px',
        background: '#8B3A62',
        borderRadius: '13px 13px 0 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 34,
            height: 34,
            borderRadius: 8,
            background: 'rgba(255, 255, 255, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#fff' }}>
              AxonBuddy
            </h3>
            <p style={{ margin: 0, fontSize: 12, color: 'rgba(255,255,255,0.85)' }}>
              Your Learning Assistant
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'rgba(255,255,255,0.2)',
            border: 'none',
            borderRadius: 6,
            color: '#fff',
            cursor: 'pointer',
            fontSize: 18,
            width: 28,
            height: 28,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
        >
          ×
        </button>
      </div>

      {/* Content */}
      <div style={{
        padding: 20,
        overflowY: 'auto',
        flex: 1,
      }}>
        {/* Correct Answer */}
        <div style={{
          marginBottom: 16,
          padding: 12,
          background: '#F5F5F0',
          border: '2px solid #8B3A62',
          borderRadius: 8,
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 8,
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <h4 style={{
              margin: 0,
              fontSize: 13,
              fontWeight: 700,
              color: '#8B3A62',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}>
              Correct Answer
            </h4>
          </div>
          <p style={{
            margin: 0,
            fontSize: 14,
            fontWeight: 600,
            color: '#2d2d2d',
            lineHeight: 1.5,
          }}>
            {correctAnswer}
          </p>
        </div>

        {/* Explanation */}
        <div style={{
          padding: 12,
          background: '#fff',
          border: '2px solid #E0E0D8',
          borderRadius: 8,
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 8,
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8B3A62" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7z" />
              <line x1="9" y1="21" x2="15" y2="21" />
            </svg>
            <h4 style={{
              margin: 0,
              fontSize: 13,
              fontWeight: 700,
              color: '#8B3A62',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}>
              Explanation
            </h4>
          </div>
          <p style={{
            margin: 0,
            fontSize: 13,
            color: '#2d2d2d',
            lineHeight: 1.7,
          }}>
            {explanation}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        padding: '12px 20px',
        borderTop: '1px solid #E0E0D8',
        display: 'flex',
        justifyContent: 'center',
      }}>
        <button
          onClick={onClose}
          style={{
            padding: '8px 24px',
            background: '#8B3A62',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: 13,
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = '#A0466E'}
          onMouseLeave={(e) => e.currentTarget.style.background = '#8B3A62'}
        >
          Got it
        </button>
      </div>
    </div>
  )
}
