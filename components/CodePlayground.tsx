'use client'

import { useState, useRef } from 'react'

export default function CodePlayground() {
  const [language, setLanguage] = useState<'python' | 'java' | 'c' | 'cpp'>('python')
  const [isRunning, setIsRunning] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const embedUrls = {
    python: 'https://onecompiler.com/embed/python?theme=dark&hideLanguageSelection=true&hideNew=true&hideNewFileOption=true&hideTitle=true&hideStdin=false&listenToEvents=true',
    java: 'https://onecompiler.com/embed/java?theme=dark&hideLanguageSelection=true&hideNew=true&hideNewFileOption=true&hideTitle=true&hideStdin=false&listenToEvents=true',
    c: 'https://onecompiler.com/embed/c?theme=dark&hideLanguageSelection=true&hideNew=true&hideNewFileOption=true&hideTitle=true&hideStdin=false&listenToEvents=true',
    cpp: 'https://onecompiler.com/embed/cpp?theme=dark&hideLanguageSelection=true&hideNew=true&hideNewFileOption=true&hideTitle=true&hideStdin=false&listenToEvents=true'
  }

  const handleRun = () => {
    setIsRunning(true)
    // OneCompiler embed API requires eventType: 'triggerRun'
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage({ eventType: 'triggerRun' }, '*')
      iframeRef.current.contentWindow.postMessage({ type: 'run-code' }, '*')
    }
    setTimeout(() => setIsRunning(false), 2500)
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: '#0d1117',
      borderRadius: 12,
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        padding: '12px 16px',
        borderBottom: '1px solid rgba(99,102,241,0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c7d2fe" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
          <h3 style={{
            margin: 0,
            fontSize: 15,
            fontWeight: 600,
            color: '#c7d2fe',
          }}>
            Code Playground
          </h3>
        </div>

        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          {/* Language Selector */}
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => setLanguage('python')}
              style={{
                padding: '6px 16px',
                borderRadius: 6,
                border: language === 'python' 
                  ? '1px solid #6366f1' 
                  : '1px solid rgba(99,102,241,0.3)',
                background: language === 'python' 
                  ? 'rgba(99,102,241,0.2)' 
                  : 'transparent',
                color: language === 'python' ? '#a5b4fc' : '#6b7280',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: 600,
                transition: 'all 0.2s',
              }}
            >
              🐍 Python
            </button>
            <button
              onClick={() => setLanguage('java')}
              style={{
                padding: '6px 16px',
                borderRadius: 6,
                border: language === 'java' 
                  ? '1px solid #6366f1' 
                  : '1px solid rgba(99,102,241,0.3)',
                background: language === 'java' 
                  ? 'rgba(99,102,241,0.2)' 
                  : 'transparent',
                color: language === 'java' ? '#a5b4fc' : '#6b7280',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: 600,
                transition: 'all 0.2s',
              }}
            >
              ☕ Java
            </button>
            <button
              onClick={() => setLanguage('c')}
              style={{
                padding: '6px 16px',
                borderRadius: 6,
                border: language === 'c' 
                  ? '1px solid #6366f1' 
                  : '1px solid rgba(99,102,241,0.3)',
                background: language === 'c' 
                  ? 'rgba(99,102,241,0.2)' 
                  : 'transparent',
                color: language === 'c' ? '#a5b4fc' : '#6b7280',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: 600,
                transition: 'all 0.2s',
              }}
            >
              🔧 C
            </button>
            <button
              onClick={() => setLanguage('cpp')}
              style={{
                padding: '6px 16px',
                borderRadius: 6,
                border: language === 'cpp' 
                  ? '1px solid #6366f1' 
                  : '1px solid rgba(99,102,241,0.3)',
                background: language === 'cpp' 
                  ? 'rgba(99,102,241,0.2)' 
                  : 'transparent',
                color: language === 'cpp' ? '#a5b4fc' : '#6b7280',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: 600,
                transition: 'all 0.2s',
              }}
            >
              ⚙️ C++
            </button>
          </div>

          {/* Run Button */}
          <button
            onClick={handleRun}
            disabled={isRunning}
            style={{
              padding: '8px 20px',
              borderRadius: 6,
              border: 'none',
              background: isRunning ? '#4f46e5' : '#10b981',
              color: 'white',
              cursor: isRunning ? 'not-allowed' : 'pointer',
              fontSize: 13,
              fontWeight: 600,
              transition: 'all 0.2s',
            }}
          >
            {isRunning ? '⏳ Running...' : '▶ Run'}
          </button>
        </div>
      </div>

      {/* OneCompiler Embed */}
      <div style={{ flex: 1, position: 'relative' }}>
        <iframe
          ref={iframeRef}
          key={language}
          src={embedUrls[language]}
          style={{
            width: '100%',
            height: '100%',
            border: 'none',
          }}
          allow="clipboard-write"
        />
      </div>

      {/* Footer Info */}
      <div style={{
        padding: '8px 16px',
        borderTop: '1px solid rgba(99,102,241,0.2)',
        fontSize: 12,
        color: '#94a3b8',
        textAlign: 'center',
      }}>
        Write code, click Run to execute • Supports input and output streams
      </div>
    </div>
  )
}
