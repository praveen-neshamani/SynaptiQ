'use client'

import { useState } from 'react'
import { DistributionCategory } from '@/lib/facultyData'

interface CompetencyDonutChartProps {
  distribution: DistributionCategory[]
  totalStudents: number
}

export default function CompetencyDonutChart({
  distribution,
  totalStudents,
}: CompetencyDonutChartProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)

  const radius = 60
  const circumference = 2 * Math.PI * radius

  let cumulativePercent = 0
  const segments = distribution.map((item, idx) => {
    const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`
    const strokeDashoffset = -((cumulativePercent / 100) * circumference)
    cumulativePercent += item.percentage
    return {
      ...item,
      strokeDasharray,
      strokeDashoffset,
      idx,
    }
  })

  const activeCategory = hoveredIdx !== null ? distribution[hoveredIdx] : null
  const needsIntervention = distribution.find((d) => d.label === 'Needs Intervention') || distribution[distribution.length - 1]

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
        <div className="pb-3 mb-4 border-b border-rose-100">
          <h3 style={{ color: '#8B3A62' }} className="text-base font-bold tracking-tight">
            Competency Distribution
          </h3>
          <p className="text-xs text-slate-500">
            Student cohort segmented by diagnostic threshold performance
          </p>
        </div>

        {/* Donut & Legend Container */}
        <div className="flex flex-col sm:flex-row items-center justify-around gap-6 my-2">
          {/* SVG Donut */}
          <div className="relative w-44 h-44 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
              <circle
                cx="80"
                cy="80"
                r={radius}
                className="stroke-slate-100 fill-none"
                strokeWidth="20"
              />

              {segments.map((seg) => (
                <circle
                  key={seg.label}
                  cx="80"
                  cy="80"
                  r={radius}
                  className="fill-none transition-all duration-300 cursor-pointer"
                  stroke={seg.color}
                  strokeWidth={hoveredIdx === seg.idx ? '24' : '20'}
                  strokeDasharray={seg.strokeDasharray}
                  strokeDashoffset={seg.strokeDashoffset}
                  onMouseEnter={() => setHoveredIdx(seg.idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                />
              ))}
            </svg>

            {/* Center Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
              <span style={{ color: '#8B3A62' }} className="text-2xl font-black tracking-tight">
                {activeCategory ? `${activeCategory.percentage}%` : `${totalStudents}`}
              </span>
              <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                {activeCategory ? activeCategory.label : 'Total Students'}
              </span>
            </div>
          </div>

          {/* Legend Items */}
          <div className="space-y-3 w-full sm:w-auto">
            {distribution.map((cat, idx) => (
              <div
                key={cat.label}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  backgroundColor: hoveredIdx === idx ? '#FFF5F8' : 'transparent',
                  borderColor: hoveredIdx === idx ? '#8B3A62' : 'transparent',
                }}
                className="p-2.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-3.5 h-3.5 rounded-full flex-shrink-0 shadow-xs"
                    style={{ backgroundColor: cat.color }}
                  />
                  <div>
                    <div className="text-xs font-bold text-[#2D2D2D]">{cat.label}</div>
                    <div className="text-[10px] text-slate-500 font-medium">{cat.studentCount} students</div>
                  </div>
                </div>
                <div className="text-right">
                  <div style={{ color: '#8B3A62' }} className="text-sm font-extrabold">{cat.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AURA System Insight */}
      <div
        style={{
          backgroundColor: '#FFF5F8',
          border: '1.5px solid rgba(139, 58, 98, 0.35)',
        }}
        className="mt-5 p-3.5 rounded-lg text-xs flex items-start gap-2.5"
      >
        <span
          style={{ backgroundColor: '#BE123C', color: '#FFFFFF' }}
          className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5"
        >
          !
        </span>
        <div className="flex-1">
          <div
            style={{ color: '#8B3A62' }}
            className="font-bold text-[11px] uppercase tracking-wider flex items-center gap-1.5 mb-0.5"
          >
            <span>AURA Cohort Alert</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#8B3A62]"></span>
            <span className="text-[10px] font-normal text-rose-700">Distribution Diagnostic</span>
          </div>
          <p style={{ color: '#2D2D2D' }} className="leading-relaxed font-semibold">
            "{needsIntervention ? `${needsIntervention.percentage}% of students (${needsIntervention.studentCount} students)` : 'A subset of students'} currently require additional intervention."
          </p>
        </div>
      </div>
    </div>
  )
}
