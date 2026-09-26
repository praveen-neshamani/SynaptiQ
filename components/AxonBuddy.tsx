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
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 28 }}>🤖</span>
          <div>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#fff' }}>
              AxonBuddy
            </h3>
            <p style={{ margin: 0, fontSize: 11, color: 'rgba(255,255,255,0.8)' }}>
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
            <span style={{ fontSize: 18 }}>✅</span>
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
            <span style={{ fontSize: 18 }}>💡</span>
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
          Got it! 👍
        </button>
      </div>
    </div>
  )
}
