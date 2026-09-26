'use client'

import { useState } from 'react'
import FacultyHeader from '@/components/faculty/FacultyHeader'
import AuraWorkflowBanner from '@/components/faculty/AuraWorkflowBanner'
import FacultyKpiCards from '@/components/faculty/FacultyKpiCards'
import ConceptCompetencyChart from '@/components/faculty/ConceptCompetencyChart'
import CompetencyDonutChart from '@/components/faculty/CompetencyDonutChart'
import InterventionJourneyCard from '@/components/faculty/InterventionJourneyCard'
import InterventionEffectivenessChart from '@/components/faculty/InterventionEffectivenessChart'
import ActionableInsightsPanel from '@/components/faculty/ActionableInsightsPanel'
import { facultyDemoData, getFacultyCourseData } from '@/lib/facultyData'

export default function FacultyAnalyticsPage() {
  const [data, setData] = useState(facultyDemoData)

  const handleCourseChange = (course: string) => {
    const courseData = getFacultyCourseData(course)
    setData(courseData)
  }

  return (
    <div
      style={{
        backgroundColor: '#F5F5F0', // Porcelain White matching student dashboard
        color: '#2D2D2D',
      }}
      className="faculty-dashboard min-h-screen flex flex-col selection:bg-[#FFF5F8] selection:text-[#8B3A62]"
    >
      {/* ── Institutional Header ──────────────────────────── */}
      <FacultyHeader
        facultyName={data.facultyName}
        courseName={data.courseName}
        courseCode={data.courseCode}
        lastUpdated={data.lastUpdated}
        onCourseChange={handleCourseChange}
      />

      {/* ── Main Container ────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-8 space-y-6 flex-1 w-full">
        {/* Closed-Loop Pedagogical Pipeline Banner */}
        <AuraWorkflowBanner />

        {/* Top KPI Cards (STRICTLY TWO CARDS) */}
        <FacultyKpiCards
          totalStudents={data.totalStudents}
          averageCompetency={data.averageCompetency}
          benchmark={data.competencyBenchmark}
          courseCode={data.courseCode}
        />

        {/* ── Row 1: Concept Mastery & Cohort Distribution ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Section 1: Concept-wise Competency (7 Cols) */}
          <div className="lg:col-span-7">
            <ConceptCompetencyChart
              concepts={data.concepts}
              benchmark={data.competencyBenchmark}
            />
          </div>

          {/* Section 2: Competency Distribution Donut (5 Cols) */}
          <div className="lg:col-span-5">
            <CompetencyDonutChart
              distribution={data.distribution}
              totalStudents={data.totalStudents}
            />
          </div>
        </div>

        {/* ── Row 2: Student Trace & Intervention Yield ─────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Section 3: Intervention Journey (6 Cols) */}
          <div className="lg:col-span-6">
            <InterventionJourneyCard
              studentJourneys={data.studentJourneys}
            />
          </div>

          {/* Section 4: Intervention Effectiveness (6 Cols) */}
          <div className="lg:col-span-6">
            <InterventionEffectivenessChart
              effectiveness={data.effectiveness}
            />
          </div>
        </div>

        {/* ── Section 5: Actionable Insights & Recommendations ── */}
        <ActionableInsightsPanel insights={data.insights} />

        {/* ── Academic Footer & Integrity Note ─────────────── */}
        <footer
          style={{ borderColor: 'rgba(139, 58, 98, 0.2)' }}
          className="pt-6 pb-8 border-t text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-3"
        >
          <div>
            <span style={{ color: '#8B3A62' }} className="font-bold">AURA Platform</span> — Adaptive Unified Resource & Assessment
            <span className="mx-2">•</span>
            {data.institution}
          </div>
          <div className="flex items-center gap-3 text-slate-400">
            <span>Course: {data.courseName} ({data.courseCode})</span>
            <span>•</span>
            <span className="italic">Active Academic Session</span>
          </div>
        </footer>
      </main>
    </div>
  )
}
