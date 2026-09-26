'use client'

export default function AuraWorkflowBanner() {
  const steps = [
    { label: 'Assess', desc: 'Formative & Diagnostic Quizzes', phase: 'Step 01' },
    { label: 'Diagnose', desc: 'Competency Gap Detection', phase: 'Step 02' },
    { label: 'Intervene', desc: 'Prescribed Pedagogic Scaffolding', phase: 'Step 03' },
    { label: 'Reassess', desc: 'Outcome Validation Checks', phase: 'Step 04' },
    { label: 'Measure Effectiveness', desc: 'Intervention Yields & Deltas', phase: 'Step 05' },
    { label: 'Faculty Insight', desc: 'Curricular Actions & Triage', phase: 'Step 06' },
  ]

  return (
    <section
      style={{
        backgroundColor: '#FFFFFF',
        border: '2px solid rgba(139, 58, 98, 0.25)',
        boxShadow: '0 2px 8px rgba(139, 58, 98, 0.06)',
      }}
      className="rounded-xl p-4 sm:p-5"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 mb-3 border-b border-rose-100 gap-2">
        <div>
          <span style={{ color: '#8B3A62' }} className="text-xs uppercase font-extrabold tracking-wider">
            AURA Core Pedagogical Pipeline
          </span>
          <h2 className="text-sm font-bold text-slate-800">
            Competency-Driven Adaptive Learning & Closed-Loop Intervention Architecture
          </h2>
        </div>
        <span
          style={{
            backgroundColor: '#FFF5F8',
            color: '#8B3A62',
            borderColor: 'rgba(139, 58, 98, 0.3)',
          }}
          className="text-xs font-semibold px-2.5 py-1 rounded-md self-start sm:self-auto font-mono border"
        >
          Closed-Loop Cycle
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
        {steps.map((step, idx) => (
          <div
            key={step.label}
            style={{
              backgroundColor: '#FFF5F8',
              borderColor: 'rgba(139, 58, 98, 0.2)',
            }}
            className="relative flex flex-col p-3 rounded-lg border hover:border-[#8B3A62] hover:shadow-xs transition-all group"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span
                style={{
                  backgroundColor: '#8B3A62',
                  color: '#FFFFFF',
                }}
                className="w-5 h-5 rounded-full text-[11px] font-bold flex items-center justify-center shadow-xs"
              >
                {idx + 1}
              </span>
              <span className="text-[10px] uppercase font-bold text-slate-400">
                {step.phase}
              </span>
            </div>
            <div
              style={{ color: '#8B3A62' }}
              className="text-xs font-bold tracking-tight"
            >
              {step.label}
            </div>
            <div className="text-[11px] text-slate-600 leading-tight mt-0.5 font-medium">
              {step.desc}
            </div>
            {idx < steps.length - 1 && (
              <span className="hidden lg:block absolute -right-2.5 top-1/2 -translate-y-1/2 text-rose-300 font-bold z-10">
                ›
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
