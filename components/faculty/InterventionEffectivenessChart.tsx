'use client'

import { InterventionEffectivenessItem } from '@/lib/facultyData'

interface InterventionEffectivenessChartProps {
  effectiveness: InterventionEffectivenessItem[]
}

export default function InterventionEffectivenessChart({
  effectiveness,
}: InterventionEffectivenessChartProps) {
  const maxImprovement = Math.max(...effectiveness.map((e) => e.improvementPP), 30)
  const topYield = [...effectiveness].sort((a, b) => b.improvementPP - a.improvementPP)[0]

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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-4 border-b border-rose-100 gap-1">
          <div>
            <h3 style={{ color: '#8B3A62' }} className="text-base font-bold tracking-tight">
              Intervention Effectiveness
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Average competency improvement across cohorts
            </p>
          </div>
          <span
            style={{
              backgroundColor: '#FFF5F8',
              color: '#8B3A62',
              borderColor: 'rgba(139, 58, 98, 0.3)',
            }}
            className="text-[11px] px-2 py-0.5 rounded self-start sm:self-auto font-mono border"
          >
            Metric: Δ Percentage Points (pp)
          </span>
        </div>

        {/* Bar Chart list */}
        <div className="space-y-3.5 my-2">
          {effectiveness.map((item) => {
            const widthPercent = (item.improvementPP / maxImprovement) * 100
            const isHighYield = item.improvementPP >= 20

            return (
              <div key={item.id} className="group">
                <div className="flex items-center justify-between text-xs mb-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#2D2D2D]">{item.name}</span>
                    <span
                      style={{
                        backgroundColor: '#FFF5F8',
                        color: '#8B3A62',
                        borderColor: 'rgba(139, 58, 98, 0.2)',
                      }}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded border"
                    >
                      {item.category}
                    </span>
                  </div>
                  <span
                    style={{ color: '#8B3A62' }}
                    className="font-extrabold text-sm"
                  >
                    +{item.improvementPP} pp
                  </span>
                </div>

                {/* Bar track */}
                <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/70 flex items-center">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${widthPercent}%`,
                      background: isHighYield
                        ? 'linear-gradient(90deg, #8B3A62 0%, #A0466E 100%)'
                        : '#C47498',
                    }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* AURA Pedagogic Observation Insight */}
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
            <span>AURA Comparative Yield Diagnostic</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#8B3A62]"></span>
            <span className="text-[10px] font-normal text-rose-700">Empirical Cohort Observation</span>
          </div>
          <p style={{ color: '#2D2D2D' }} className="leading-relaxed font-semibold">
            "{topYield ? `${topYield.name} (+${topYield.improvementPP} pp)` : 'Active interventions'} demonstrated the highest competency improvement in the current cohort."
          </p>
        </div>
      </div>
    </div>
  )
}
