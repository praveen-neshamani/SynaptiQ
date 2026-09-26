'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface FacultyHeaderProps {
  facultyName: string
  courseName: string
  courseCode: string
  lastUpdated: string
  onCourseChange?: (course: string) => void
}

export default function FacultyHeader({
  facultyName,
  courseName,
  courseCode,
  lastUpdated,
  onCourseChange,
}: FacultyHeaderProps) {
  const [selectedCourse, setSelectedCourse] = useState(courseName)
  const [liveTime, setLiveTime] = useState<string>('')

  // Synchronize selectedCourse with courseName prop
  useEffect(() => {
    setSelectedCourse(courseName)
  }, [courseName])

  // Live ticking clock in HH:MM:SS format
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hours = String(now.getHours()).padStart(2, '0')
      const minutes = String(now.getMinutes()).padStart(2, '0')
      const seconds = String(now.getSeconds()).padStart(2, '0')
      setLiveTime(`${hours}:${minutes}:${seconds}`)
    }

    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const courses = [
    { name: 'Data Structures', code: 'CS204' },
    { name: 'Algorithms Analysis', code: 'CS301' },
    { name: 'Object-Oriented Programming', code: 'CS202' },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCourse(e.target.value)
    if (onCourseChange) onCourseChange(e.target.value)
  }

  return (
    <header className="sticky top-0 z-30 shadow-md">
      {/* Top subtle disclaimer bar - Dark Burgundy */}
      <div style={{ backgroundColor: '#5A1E3B' }} className="text-white/80 text-xs px-4 sm:px-8 py-1.5 flex flex-wrap items-center justify-between gap-2 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="font-bold text-white tracking-wide">AURA</span>
          <span className="text-white/40">|</span>
          <span className="text-white/90">Adaptive Unified Resource & Assessment</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 bg-emerald-400/20 text-emerald-200 border border-emerald-400/30 px-2.5 py-0.5 rounded text-[11px] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse"></span>
            Institutional Analytics Module — Continuous Outcome Tracking
          </span>
          <Link
            href="/dashboard"
            className="text-white/90 hover:text-white transition-colors underline underline-offset-2 text-[11px] font-semibold"
          >
            ← Student Dashboard
          </Link>
        </div>
      </div>

      {/* Main header row - SynaptiQ Burgundy Pink (#8B3A62) */}
      <div style={{ backgroundColor: '#8B3A62' }} className="px-4 sm:px-8 py-4 text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-white/20 border border-white/30 text-white font-bold flex items-center justify-center text-lg shadow-xs backdrop-blur-xs tracking-wider">
                A
              </div>
              <div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Faculty Analytics Dashboard
                  </h1>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/20 text-white border border-white/30 backdrop-blur-xs">
                    Academic Year 2026-27
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-white/80 mt-0.5">
                  Competency diagnosis, pedagogical interventions, and longitudinal learning analytics
                </p>
              </div>
            </div>
          </div>

          {/* Right meta controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Faculty Profile */}
            <div className="bg-white/15 border border-white/25 rounded-lg px-3.5 py-2 text-right backdrop-blur-xs">
              <div className="text-[10px] uppercase tracking-wider text-white/70 font-semibold">Faculty In-Charge</div>
              <div className="text-sm font-bold text-white">{facultyName}</div>
            </div>

            {/* Course Selector */}
            <div className="bg-white/15 border border-white/25 rounded-lg px-3.5 py-1.5 flex flex-col justify-center backdrop-blur-xs">
              <label htmlFor="course-select" className="text-[10px] uppercase tracking-wider text-white/70 font-semibold">
                Course Selected
              </label>
              <select
                id="course-select"
                value={selectedCourse}
                onChange={handleChange}
                className="bg-transparent text-sm font-bold text-white border-none focus:outline-none cursor-pointer pr-3 [&>option]:text-slate-800"
              >
                {courses.map((c) => (
                  <option key={c.code} value={c.name}>
                    {c.name} ({c.code})
                  </option>
                ))}
              </select>
            </div>

            {/* Live Real-Time Analytics Timestamp */}
            <div className="flex items-center gap-2.5 bg-white/15 border border-white/25 rounded-lg px-3.5 py-2 backdrop-blur-xs shadow-xs">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
              </span>
              <div className="flex flex-col text-right">
                <div className="text-[10px] uppercase tracking-wider text-emerald-200 font-bold flex items-center justify-end">
                  <span>LIVE ANALYTICS</span>
                </div>
                <div className="text-sm font-bold font-mono tracking-widest text-white tabular-nums">
                  {liveTime || '--:--:--'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
