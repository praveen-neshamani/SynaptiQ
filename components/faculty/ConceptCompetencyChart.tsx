'use client'

import { ConceptCompetency } from '@/lib/facultyData'

interface ConceptCompetencyChartProps {
  concepts: ConceptCompetency[]
  benchmark?: number
}

export default function ConceptCompetencyChart({
  concepts,
  benchmark = 70,
}: ConceptCompetencyChartProps) {
  const lowestConcept = concepts.find((c) => c.isLowest) || [...concepts].sort((a, b) => a.score - b.score)[0]

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        border: '2px solid rgba(139, 58, 98, 0.25)',
        boxShadow: '0 2px 8px rgba(139, 58, 98, 0.06)',
      }}
      className="rounded-xl p-5 sm:p-6 flex flex-col justify-between h-full"
    >
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-4 border-b border-rose-100 gap-2">
          <div>
            <h3 style={{ color: '#8B3A62' }} className="text-base font-bold tracking-tight">
              Concept-wise Competency Overview
            </h3>
            <p className="text-xs text-slate-500">
              Aggregated mastery level per instructional unit against institutional benchmark ({benchmark}%)
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="flex items-center gap-1.5 text-slate-500 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
              Benchmark: {benchmark}%
            </span>
          </div>
        </div>

        {/* Horizontal Bars */}
        <div className="space-y-4">
          {concepts.map((c) => {
            const isCritical = c.isLowest || c.score < 50
            const isBelowBenchmark = c.score < benchmark

            return (
              <div key={c.id} className="group">
                <div className="flex items-center justify-between text-xs mb-1">
                  <div className="flex items-center gap-2 font-semibold">
                    <span
                      style={{ color: isCritical ? '#BE123C' : '#2D2D2D' }}
                      className={isCritical ? 'font-bold' : ''}
                    >
                      {c.concept}
                    </span>
                    {isCritical && (
                      <span className="bg-rose-100 text-rose-800 border border-rose-300 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider animate-pulse">
                        Lowest • Action Needed
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-400">
                      {c.studentsNeedingHelp} students below {benchmark}%
                    </span>
                    <span
                      style={{
                        color: isCritical ? '#BE123C' : isBelowBenchmark ? '#D97706' : '#8B3A62',
                      }}
                      className="font-bold text-sm"
                    >
                      {c.score}%
                    </span>
                  </div>
                </div>

                {/* Progress track */}
                <div className="relative w-full h-4 bg-slate-100 rounded-full overflow-hidden border border-slate-200/70">
                  {/* Benchmark reference line */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-slate-500/80 z-10"
                    style={{ left: `${benchmark}%` }}
                    title={`Benchmark: ${benchmark}%`}
                  />

                  {/* Filled bar */}
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isCritical
                        ? 'bg-rose-600 ring-2 ring-rose-300'
                        : isBelowBenchmark
                        ? 'bg-amber-500'
                        : 'bg-[#8B3A62]'
                    }`}
                    style={{ width: `${c.score}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* AURA System-Generated Diagnostic Insight */}
      <div
        style={{
          backgroundColor: '#FFF5F8',
          border: '1.5px solid rgba(139, 58, 98, 0.35)',
        }}
        className="mt-5 p-3.5 rounded-lg text-xs flex items-start gap-2.5"
      >
        <span
          style={{ backgroundColor: '#8B3A62', color: '#FFFFFF' }}
          className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5"
        >
          i
        </span>
        <div className="flex-1">
          <div
            style={{ color: '#8B3A62' }}
            className="font-bold text-[11px] uppercase tracking-wider flex items-center gap-1.5 mb-0.5"
          >
            <span>AURA Diagnostic Engine</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#8B3A62]"></span>
            <span className="text-[10px] font-normal text-rose-700">Automated Signal</span>
          </div>
          <p style={{ color: '#2D2D2D' }} className="leading-relaxed font-semibold">
            "{lowestConcept ? lowestConcept.concept : 'This unit'} has the lowest class-level competency ({lowestConcept?.score || 0}%) and requires additional instructional attention."
          </p>
        </div>
      </div>
    </div>
  )
}
