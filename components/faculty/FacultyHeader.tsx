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
      {/* Streamlined Institutional Header - SynaptiQ Burgundy (#8B3A62) */}
      <div style={{ backgroundColor: '#8B3A62' }} className="px-4 sm:px-8 py-3.5 text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/20 border border-white/30 text-white font-bold flex items-center justify-center text-base tracking-wider">
                A
              </div>
              <div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Faculty Analytics
                  </h1>
                  <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-white/20 text-white border border-white/30">
                    AY 2026-27
                  </span>
                </div>
                <p className="text-xs text-white/85 mt-0.5">
                  Cohort competency tracking, pedagogical interventions, and outcomes
                </p>
              </div>
            </div>
          </div>

          {/* Controls: Student Dashboard link, Course Selector, Faculty, and Live Status */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Student Dashboard Navigation */}
            <Link
              href="/dashboard"
              className="bg-white/15 hover:bg-white/25 border border-white/30 rounded-lg px-3 py-1.5 text-xs font-medium text-white transition-colors flex items-center gap-1.5"
            >
              <span>←</span>
              <span>Student Dashboard</span>
            </Link>

            {/* Course Selector */}
            <div className="bg-white/15 border border-white/25 rounded-lg px-3 py-1.5 flex flex-col justify-center">
              <label htmlFor="course-select" className="text-xs text-white/80 font-medium">
                Course
              </label>
              <select
                id="course-select"
                value={selectedCourse}
                onChange={handleChange}
                className="bg-transparent text-xs font-semibold text-white border-none focus:outline-none cursor-pointer pr-3 [&>option]:text-slate-800"
              >
                {courses.map((c) => (
                  <option key={c.code} value={c.name}>
                    {c.name} ({c.code})
                  </option>
                ))}
              </select>
            </div>

            {/* Faculty Profile */}
            <div className="bg-white/15 border border-white/25 rounded-lg px-3 py-1.5 text-right hidden sm:block">
              <div className="text-xs text-white/80 font-medium">Faculty</div>
              <div className="text-xs font-semibold text-white">{facultyName}</div>
            </div>

            {/* Consolidated Live Status Indicator */}
            <div className="flex items-center gap-2 bg-white/15 border border-white/25 rounded-lg px-3 py-1.5 shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-emerald-200 font-medium">Live</span>
                <span className="text-xs font-mono font-semibold tracking-wider text-white tabular-nums">
                  {liveTime || '--:--:--'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
