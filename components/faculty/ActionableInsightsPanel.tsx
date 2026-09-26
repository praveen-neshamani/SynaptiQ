'use client'

import { ActionableInsight } from '@/lib/facultyData'

interface ActionableInsightsPanelProps {
  insights: ActionableInsight[]
}

export default function ActionableInsightsPanel({
  insights,
}: ActionableInsightsPanelProps) {
  const getBadgeStyle = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-rose-50 text-rose-800 border-rose-300'
      case 'warning':
        return 'bg-amber-50 text-amber-800 border-amber-300'
      case 'positive':
        return 'bg-emerald-50 text-emerald-800 border-emerald-300'
      default:
        return 'bg-purple-50 text-[#8B3A62] border-purple-200'
    }
  }

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        border: '2px solid rgba(139, 58, 98, 0.25)',
        boxShadow: '0 2px 8px rgba(139, 58, 98, 0.06)',
      }}
      className="rounded-xl p-5 sm:p-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-5 border-b border-rose-100 gap-2">
        <div className="flex items-center gap-2.5">
          <span
            style={{
              backgroundColor: '#FFF5F8',
              color: '#8B3A62',
              borderColor: 'rgba(139, 58, 98, 0.3)',
            }}
            className="w-8 h-8 rounded-lg font-bold flex items-center justify-center border"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path d="M10 2a6 6 0 00-6 6c0 2.22 1.21 4.16 3 5.2V15a1 1 0 001 1h4a1 1 0 001-1v-1.8c1.79-1.04 3-2.98 3-5.2a6 6 0 00-6-6zm-1 15v1a1 1 0 001 1h0a1 1 0 001-1v-1H9z" />
            </svg>
          </span>
          <div>
            <h3 style={{ color: '#8B3A62' }} className="text-base font-bold tracking-tight">
              AURA Insights & Recommendations
            </h3>
            <p className="text-xs text-slate-500">
              System-generated diagnostic triggers and actionable pedagogical interventions
            </p>
          </div>
        </div>
        <span
          style={{
            backgroundColor: '#FFF5F8',
            color: '#8B3A62',
            borderColor: 'rgba(139, 58, 98, 0.3)',
          }}
          className="text-xs font-bold px-3 py-1 rounded-full border self-start sm:self-auto"
        >
          {insights.length} Automated Action Items
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {insights.map((item) => (
          <div
            key={item.id}
            style={{
              backgroundColor: '#FFF5F8',
              borderColor: 'rgba(139, 58, 98, 0.2)',
            }}
            className="flex flex-col justify-between p-4 rounded-xl border hover:bg-white hover:border-[#8B3A62] hover:shadow-xs transition-all"
          >
            <div>
              {/* Card top badge */}
              <div className="flex items-center justify-between mb-2.5">
                <span
                  className={`text-[11px] font-bold px-2.5 py-0.5 rounded border uppercase tracking-wider ${getBadgeStyle(
                    item.severity
                  )}`}
                >
                  <span>{item.title}</span>
                </span>
              </div>

              {/* Finding */}
              <div className="text-xs font-bold text-[#2D2D2D] mb-2 leading-snug">
                {item.finding}
              </div>
            </div>

            {/* Recommendation Box */}
            <div className="mt-3 pt-3 border-t border-rose-200/60">
              <div style={{ color: '#8B3A62' }} className="text-[10px] font-bold uppercase tracking-wider mb-1">
                Instructional Recommendation:
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {item.recommendation}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
