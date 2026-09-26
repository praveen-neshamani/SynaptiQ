'use client'

import { useEffect, useRef, useState } from 'react'
import * as faceapi from 'face-api.js'

interface AttentionTrackerProps {
  onDistraction: () => void
  onSleep: () => void
}

export default function AttentionTracker({ onDistraction, onSleep }: AttentionTrackerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [status, setStatus] = useState<'loading' | 'active' | 'error'>('loading')
  const [debugEAR, setDebugEAR] = useState<string>('--')
  const [attentionScore, setAttentionScore] = useState<number>(85)

  useEffect(() => {
    let isRunning = true
    let noFaceCount = 0
    let closedEyeFrames = 0
    let detectionInterval: NodeJS.Timeout

    // ── Optimized thresholds for fast & accurate detection ────
    const EAR_THRESHOLD = 0.20      // Eyes closed threshold (lower = more sensitive)
    const CLOSED_FRAMES = 20        // ~0.67s at 30fps (longer to avoid blink detection)
    const NO_FACE_THRESHOLD = 60    // ~2s before distraction alert (increased for looking down)

    const init = async () => {
      try {
        // ── Load face-api.js models (tiny for speed) ────────────
        // Using CDN for automatic model loading
        const MODEL_URL = 'https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model'
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68TinyNet.loadFromUri(MODEL_URL),
        ])

        if (!isRunning) return

        // ── Start webcam ────────────────────────────────────────
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 320, height: 240, facingMode: 'user' }
        })

        if (!videoRef.current || !isRunning) {
          stream.getTracks().forEach(t => t.stop())
          return
        }

        videoRef.current.srcObject = stream
        streamRef.current = stream
        await videoRef.current.play()

        setStatus('active')

        // ── Detection loop (optimized 30fps) ────────────────────
        detectionInterval = setInterval(async () => {
          if (!videoRef.current || !isRunning) return

          const detections = await faceapi
            .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions({
              inputSize: 224,
              scoreThreshold: 0.5
            }))
            .withFaceLandmarks(true)

          // ── No face detected → distraction ─────────────────────
          if (!detections) {
            noFaceCount++
            setDebugEAR('no face')
            setAttentionScore(15) // Low attention when no face
            if (noFaceCount > NO_FACE_THRESHOLD) {
              onDistraction()
              noFaceCount = 0
            }
            return
          }

          noFaceCount = 0
          const landmarks = detections.landmarks

          // ── Calculate EAR (Eye Aspect Ratio) ───────────────────
          const leftEye = landmarks.getLeftEye()
          const rightEye = landmarks.getRightEye()

          const leftEAR = calculateEAR(leftEye)
          const rightEAR = calculateEAR(rightEye)
          const avgEAR = (leftEAR + rightEAR) / 2

          setDebugEAR(`${avgEAR.toFixed(3)} [${closedEyeFrames}]`)

          // Calculate attention score based on EAR (20-95 range)
          // EAR typically ranges from 0.15 (closed) to 0.30 (wide open)
          let score = 85 // Default good attention
          
          if (avgEAR < 0.18) {
            // Eyes nearly closed - very low attention
            score = 20 + (avgEAR / 0.18) * 15 // 20-35%
          } else if (avgEAR < 0.20) {
            // Eyes closing - low attention
            score = 35 + ((avgEAR - 0.18) / 0.02) * 20 // 35-55%
          } else if (avgEAR < 0.23) {
            // Normal attention
            score = 55 + ((avgEAR - 0.20) / 0.03) * 25 // 55-80%
          } else {
            // Good attention - eyes open
            score = 80 + Math.min(15, ((avgEAR - 0.23) / 0.07) * 15) // 80-95%
          }
          
          setAttentionScore(Math.max(20, Math.min(95, score)))

          // ── Sleep detection ────────────────────────────────────
          if (avgEAR < EAR_THRESHOLD) {
            closedEyeFrames++
            console.log(`Eyes closed: EAR=${avgEAR.toFixed(3)}, frames=${closedEyeFrames}/${CLOSED_FRAMES}`)
            if (closedEyeFrames >= CLOSED_FRAMES) {
              console.log('🚨 SLEEP DETECTED!')
              onSleep()
              closedEyeFrames = 0
            }
          } else {
            if (closedEyeFrames > 0) {
              console.log(`Eyes opened: EAR=${avgEAR.toFixed(3)}, resetting counter`)
            }
            closedEyeFrames = 0
          }
        }, 33) // ~30fps

      } catch (err) {
        console.error('[AttentionTracker]', err)
        setStatus('error')
      }
    }

    init()

    return () => {
      isRunning = false
      clearInterval(detectionInterval)
      streamRef.current?.getTracks().forEach(t => t.stop())
    }
  }, [onDistraction, onSleep])

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%' }}>
      {/* Webcam */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <video
          ref={videoRef}
          style={{
            width: 160,
            borderRadius: 8,
            border: `2px solid ${
              status === 'active' ? '#16a34a'
              : status === 'error' ? '#ef4444'
              : '#e2e8f0'
            }`,
            transform: 'scaleX(-1)',
          }}
          muted
          playsInline
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={{
            fontSize: 11,
            color: status === 'active' ? '#16a34a'
                 : status === 'error'  ? '#ef4444'
                 : '#94a3b8',
          }}>
            {status === 'loading' && '⏳ Starting camera...'}
            {status === 'active'  && '🟢 Attention tracking on'}
            {status === 'error'   && '🔴 Tracker unavailable'}
          </span>

          {status === 'active' && (
            <span style={{ fontSize: 10, color: '#94a3b8' }}>
              EAR: {debugEAR} {debugEAR.includes('no face') ? '' : Number(debugEAR.split(' ')[0]) < 0.20 ? '😴 closed' : '👁 open'}
            </span>
          )}
        </div>
      </div>

      {/* Attention Progress Bar */}
      <div style={{ flex: 1, maxWidth: '280px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: '#8B3A62' }}>
            📊 Attention Level
          </span>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#8B3A62' }}>
            {attentionScore.toFixed(0)}%
          </span>
        </div>
        <div style={{
          width: '100%',
          height: 24,
          background: '#E0E0D8',
          borderRadius: 12,
          overflow: 'hidden',
          border: '2px solid #8B3A62',
        }}>
          <div style={{
            width: `${attentionScore}%`,
            height: '100%',
            background: attentionScore > 70 ? '#16a34a' 
                      : attentionScore > 40 ? '#f59e0b' 
                      : '#ef4444',
            transition: 'width 0.3s ease, background 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            paddingRight: 8,
          }}>
            {attentionScore > 15 && (
              <span style={{ fontSize: 10, fontWeight: 700, color: '#fff' }}>
                {attentionScore.toFixed(0)}%
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Helper: Calculate Eye Aspect Ratio ────────────────────────
// Using standard EAR formula: (|p2-p6| + |p3-p5|) / (2 * |p1-p4|)
function calculateEAR(eye: faceapi.Point[]): number {
  if (eye.length !== 6) return 0

  // Vertical distances (height of eye)
  const v1 = distance(eye[1], eye[5])  // Top to bottom (outer)
  const v2 = distance(eye[2], eye[4])  // Top to bottom (inner)
  
  // Horizontal distance (width of eye)
  const h = distance(eye[0], eye[3])   // Left corner to right corner

  // EAR formula
  return h > 0 ? (v1 + v2) / (2.0 * h) : 0
}

function distance(p1: faceapi.Point, p2: faceapi.Point): number {
  return Math.hypot(p1.x - p2.x, p1.y - p2.y)
}
