'use client'

interface FacultyKpiCardsProps {
  totalStudents: number
  averageCompetency: number
  benchmark?: number
  courseCode?: string
}

export default function FacultyKpiCards({
  totalStudents,
  averageCompetency,
  benchmark = 70,
  courseCode = 'CS204',
}: FacultyKpiCardsProps) {
  const isAboveBenchmark = averageCompetency >= benchmark

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* KPI Card 1: Total Students */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '2px solid #8B3A62',
          boxShadow: '0 2px 8px rgba(139, 58, 98, 0.08)',
        }}
        className="rounded-xl p-5 sm:p-6 flex flex-col justify-between hover:shadow-md transition-all"
      >
        <div className="flex items-center justify-between mb-2">
          <span style={{ color: '#8B3A62' }} className="text-xs font-bold uppercase tracking-wider">
            Total Enrolled Cohort
          </span>
          <span
            style={{ backgroundColor: '#FFF5F8', color: '#8B3A62', borderColor: 'rgba(139, 58, 98, 0.3)' }}
            className="w-8 h-8 rounded-lg font-bold flex items-center justify-center border"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
          </span>
        </div>
        <div className="flex items-baseline gap-3 my-1">
          <div className="text-3xl sm:text-4xl font-extrabold text-[#2D2D2D] tracking-tight">
            {totalStudents}
          </div>
          <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
            Active in Analytics
          </span>
        </div>
        <div className="text-xs text-slate-500 mt-2 flex items-center justify-between border-t border-rose-100 pt-2.5">
          <span>Section {courseCode}-A & B</span>
          <span className="font-semibold text-slate-700">100% Diagnostic Coverage</span>
        </div>
      </div>

      {/* KPI Card 2: Average Competency */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '2px solid #8B3A62',
          boxShadow: '0 2px 8px rgba(139, 58, 98, 0.08)',
        }}
        className="rounded-xl p-5 sm:p-6 flex flex-col justify-between hover:shadow-md transition-all"
      >
        <div className="flex items-center justify-between mb-2">
          <span style={{ color: '#8B3A62' }} className="text-xs font-bold uppercase tracking-wider">
            Cohort Average Competency
          </span>
          <span
            style={{ backgroundColor: '#FFF5F8', color: '#8B3A62', borderColor: 'rgba(139, 58, 98, 0.3)' }}
            className="w-8 h-8 rounded-lg font-bold flex items-center justify-center border"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
            </svg>
          </span>
        </div>
        <div className="flex items-baseline gap-3 my-1">
          <div className="text-3xl sm:text-4xl font-extrabold text-[#2D2D2D] tracking-tight">
            {averageCompetency}%
          </div>
          <span
            className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
              isAboveBenchmark
                ? 'text-emerald-800 bg-emerald-50 border-emerald-200'
                : 'text-amber-800 bg-amber-50 border-amber-200'
            }`}
          >
            {isAboveBenchmark
              ? `+${averageCompetency - benchmark}% Above Target (${benchmark}%)`
              : `Below Target (${benchmark}%)`}
          </span>
        </div>
        <div className="text-xs text-slate-500 mt-2 flex items-center justify-between border-t border-rose-100 pt-2.5">
          <span>Aggregated across 6 core concepts</span>
          <span className="font-semibold text-slate-700">Institutional Benchmark: ≥ 70%</span>
        </div>
      </div>
    </div>
  )
}
