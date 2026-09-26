'use client'

import { useState, useEffect } from 'react'
import { StudentJourneyProfile } from '@/lib/facultyData'

interface InterventionJourneyCardProps {
  studentJourneys: Record<string, StudentJourneyProfile>
}

export default function InterventionJourneyCard({
  studentJourneys,
}: InterventionJourneyCardProps) {
  const studentKeys = Object.keys(studentJourneys)
  const [selectedStudentKey, setSelectedStudentKey] = useState(studentKeys[0] || 'Student 024')

  // Automatically adapt selected key when course changes
  const activeStudentKey = studentJourneys[selectedStudentKey] ? selectedStudentKey : studentKeys[0]
  const student = studentJourneys[activeStudentKey] || (studentKeys.length > 0 ? studentJourneys[studentKeys[0]] : null)

  useEffect(() => {
    if (!studentJourneys[selectedStudentKey] && studentKeys.length > 0) {
      setSelectedStudentKey(studentKeys[0])
    }
  }, [studentJourneys, selectedStudentKey, studentKeys])

  if (!student) {
    return null
  }

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
        {/* Card Header & Student Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-4 border-b border-rose-100 gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h3 style={{ color: '#8B3A62' }} className="text-base font-bold tracking-tight">
                Student Intervention Journey
              </h3>
              <span
                style={{
                  backgroundColor: '#FFF5F8',
                  color: '#8B3A62',
                  borderColor: 'rgba(139, 58, 98, 0.3)',
                }}
                className="text-xs font-semibold px-2 py-0.5 rounded border"
              >
                Individual Trace
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Longitudinal tracking of scaffolded interventions and reassessment yields
            </p>
          </div>

          {/* Student Switcher */}
          <div className="flex items-center gap-1.5 self-start sm:self-auto bg-slate-50 border border-rose-200/60 rounded-lg p-1">
            <span className="text-xs text-slate-500 font-medium px-1">Case:</span>
            {studentKeys.map((key) => (
              <button
                key={key}
                onClick={() => setSelectedStudentKey(key)}
                style={{
                  backgroundColor: activeStudentKey === key ? '#8B3A62' : 'transparent',
                  color: activeStudentKey === key ? '#FFFFFF' : '#4B5563',
                }}
                className="text-xs px-2.5 py-1 rounded font-semibold transition-all shadow-xs"
              >
                {key}
              </button>
            ))}
          </div>
        </div>

        {/* Student Concept Header Strip */}
        <div
          style={{
            backgroundColor: '#FFF5F8',
            borderColor: 'rgba(139, 58, 98, 0.25)',
          }}
          className="border rounded-lg p-3 mb-4 flex flex-wrap items-center justify-between gap-3 text-xs"
        >
          <div>
            <span className="text-slate-500 text-xs font-medium">Student:</span>{' '}
            <span className="font-bold text-[#2D2D2D]">{student.studentLabel}</span>
          </div>
          <div>
            <span className="text-slate-500 text-xs font-medium">Diagnostic Concept:</span>{' '}
            <span
              style={{
                backgroundColor: '#FFFFFF',
                color: '#8B3A62',
                borderColor: '#8B3A62',
              }}
              className="font-semibold px-2.5 py-0.5 rounded border"
            >
              {student.concept}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 text-xs font-medium">Status:</span>
            <span className="font-semibold text-emerald-800 bg-emerald-50 border border-emerald-300 px-2 py-0.5 rounded flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block"></span>
              {student.status}
            </span>
          </div>
        </div>

        {/* Vertical Stepper Timeline */}
        <div className="relative pl-6 space-y-4 my-3 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-rose-200">
          {student.timeline.map((step, idx) => {
            const isScore = typeof step.score === 'number'
            const isMastery = step.stageType === 'mastery'
            const isIntervention = step.stageType === 'intervention' || step.stageType === 'transition'

            return (
              <div key={idx} className="relative flex items-start gap-3 text-xs">
                {/* Stepper node circle */}
                <span
                  style={{
                    backgroundColor: isMastery ? '#059669' : isIntervention ? '#8B3A62' : '#FFFFFF',
                    color: isMastery || isIntervention ? '#FFFFFF' : '#8B3A62',
                    borderColor: isMastery ? '#059669' : '#8B3A62',
                  }}
                  className="absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold border shadow-xs"
                >
                  {isMastery ? (
                    <svg className="w-2.5 h-2.5 stroke-white stroke-2 fill-none" viewBox="0 0 24 24">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    step.stepNumber
                  )}
                </span>

                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderColor: isIntervention ? 'rgba(139, 58, 98, 0.4)' : '#E5E7EB',
                  }}
                  className="flex-1 border rounded-lg p-2.5 shadow-xs hover:border-[#8B3A62] transition-all"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-[#2D2D2D] text-xs flex items-center gap-1.5">
                      {step.title}
                      {step.badgeText && (
                        <span
                          style={{
                            backgroundColor: isMastery ? '#ECFDF5' : isIntervention ? '#FFF5F8' : '#F9FAFB',
                            color: isMastery ? '#065F46' : isIntervention ? '#8B3A62' : '#4B5563',
                            borderColor: isMastery ? '#A7F3D0' : isIntervention ? 'rgba(139, 58, 98, 0.3)' : '#E5E7EB',
                          }}
                          className="text-xs font-medium px-2 py-0.5 rounded border"
                        >
                          {step.badgeText}
                        </span>
                      )}
                    </span>

                    {/* Score badge if applicable */}
                    {isScore && (
                      <span
                        style={{
                          backgroundColor: '#FFF5F8',
                          color: '#8B3A62',
                          borderColor: 'rgba(139, 58, 98, 0.3)',
                        }}
                        className="font-bold px-2 py-0.5 rounded text-xs border tabular-nums"
                      >
                        {step.score}%
                      </span>
                    )}

                    {step.gain && (
                      <span className="font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded text-xs tabular-nums">
                        {step.gain}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-normal">{step.detail}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Aggregate KPI Summary Strip */}
        <div
          style={{
            backgroundColor: '#FFF5F8',
            borderColor: 'rgba(139, 58, 98, 0.3)',
          }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-2 border rounded-lg p-3 mt-4 text-center"
        >
          <div>
            <div className="text-xs font-medium text-slate-500">Initial Competency</div>
            <div className="text-base font-bold text-slate-700 mt-0.5 tabular-nums">{student.initialScore}%</div>
          </div>
          <div>
            <div className="text-xs font-medium text-slate-500">Final Competency</div>
            <div className="text-base font-bold text-emerald-700 mt-0.5 tabular-nums">{student.finalScore}%</div>
          </div>
          <div>
            <div className="text-xs font-medium text-slate-500">Net Improvement</div>
            <div style={{ color: '#8B3A62' }} className="text-base font-bold mt-0.5 tabular-nums">+{student.totalImprovement} pp</div>
          </div>
          <div>
            <div className="text-xs font-medium text-slate-500">Interventions</div>
            <div className="text-base font-bold text-slate-700 mt-0.5">{student.interventionsCount} Stages</div>
          </div>
        </div>
      </div>

      {/* Footnote Trace Label */}
      <div className="mt-3 text-xs text-slate-500 italic text-center">
        * Longitudinal student remediation pathway and competency progression record.
      </div>
    </div>
  )
}
