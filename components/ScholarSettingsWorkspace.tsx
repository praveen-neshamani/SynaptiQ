'use client'

import { useState } from 'react'

interface ScholarSettingsWorkspaceProps {
  studentName: string
  studentEmail: string
  onBackToCockpit?: () => void
}

export default function ScholarSettingsWorkspace({
  studentName,
  studentEmail,
  onBackToCockpit
}: ScholarSettingsWorkspaceProps) {
  const [activeSubTab, setActiveSubTab] = useState<'profile' | 'codelab' | 'telemetry' | 'security'>('profile')
  const [displayName, setDisplayName] = useState(studentName || 'Eleanor Vance')
  const [email] = useState(studentEmail || 'eleanor.vance@synaptiq.edu')
  const [cohort] = useState('ALPHA-2025/CS')
  const [scholarId] = useState('SQ-94821')

  // Code Lab Settings
  const [defaultLanguage, setDefaultLanguage] = useState<'javascript' | 'python' | 'cpp' | 'java'>('javascript')
  const [defaultEngine, setDefaultEngine] = useState<'instant' | 'cloud'>('instant')
  const [editorFontSize, setEditorFontSize] = useState<number>(13)
  const [tabSize, setTabSize] = useState<number>(2)
  const [autoRunTests, setAutoRunTests] = useState<boolean>(true)

  // Telemetry & Privacy Settings
  const [attentionTracking, setAttentionTracking] = useState<boolean>(true)
  const [diagnosticTelemetry, setDiagnosticTelemetry] = useState<boolean>(true)
  const [runtimeBenchmarking, setRuntimeBenchmarking] = useState<boolean>(true)

  // Notifications
  const [labReminders, setLabReminders] = useState<boolean>(true)
  const [milestoneAlerts, setMilestoneAlerts] = useState<boolean>(true)
  const [emailDigest, setEmailDigest] = useState<boolean>(false)

  // Save state
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaveSuccess(true)
    setTimeout(() => {
      setSaveSuccess(false)
    }, 3000)
  }

  return (
    <div className="space-y-6">
      {/* ── Top Header Bar ── */}
      <div className="bg-[#FFFFFF] border border-slate-200/80 rounded-xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            {onBackToCockpit && (
              <button
                onClick={onBackToCockpit}
                className="text-xs font-semibold text-[#8B3A62] hover:underline flex items-center gap-1 mr-2"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
                <span>Learner Cockpit</span>
              </button>
            )}
            <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-[#FFF5F8] text-[#8B3A62] border border-rose-200/60 uppercase">
              SYSTEM CONFIGURATION
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#171717]">
            Scholar Settings & Preferences
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage your academic identity, Code Lab environment, and neural telemetry configuration.
          </p>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-2">
          {saveSuccess && (
            <div className="px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-mono font-semibold text-emerald-800 flex items-center gap-1.5 animate-fadeIn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>Saved Successfully</span>
            </div>
          )}
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-lg bg-[#8B3A62] text-white hover:bg-[#6E2D4E] text-xs font-bold transition-colors shadow-xs flex items-center gap-2"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
              <polyline points="17 21 17 13 7 13 7 21" />
              <polyline points="7 3 7 8 15 8" />
            </svg>
            <span>Save Preferences</span>
          </button>
        </div>
      </div>

      {/* ── Sub Navigation Tabs ── */}
      <div className="flex border-b border-slate-200 bg-[#FFFFFF] rounded-xl px-4 py-2 shadow-xs overflow-x-auto gap-2">
        <button
          onClick={() => setActiveSubTab('profile')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-2 shrink-0 ${
            activeSubTab === 'profile'
              ? 'bg-[#8B3A62] text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <span>Scholar Profile</span>
        </button>

        <button
          onClick={() => setActiveSubTab('codelab')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-2 shrink-0 ${
            activeSubTab === 'codelab'
              ? 'bg-[#8B3A62] text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
          <span>Code Lab & IDE</span>
        </button>

        <button
          onClick={() => setActiveSubTab('telemetry')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-2 shrink-0 ${
            activeSubTab === 'telemetry'
              ? 'bg-[#8B3A62] text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
          <span>Telemetry & Neural Stream</span>
        </button>

        <button
          onClick={() => setActiveSubTab('security')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-2 shrink-0 ${
            activeSubTab === 'security'
              ? 'bg-[#8B3A62] text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span>Security & Alerts</span>
        </button>
      </div>

      {/* ── SubTab 1: Scholar Profile ── */}
      {activeSubTab === 'profile' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Identity Card */}
          <div className="bg-[#FFFFFF] border border-slate-200/80 rounded-xl p-6 shadow-xs space-y-4">
            <div className="flex flex-col items-center text-center pb-4 border-b border-slate-100">
              <div className="w-16 h-16 rounded-full bg-[#8B3A62] text-white font-bold text-xl flex items-center justify-center shadow-md mb-3">
                {displayName.charAt(0).toUpperCase()}
              </div>
              <h3 className="text-base font-bold text-slate-900">{displayName}</h3>
              <p className="text-xs text-slate-500 font-mono mt-0.5">{email}</p>
              <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF5F8] border border-rose-200/60 text-xs font-bold text-[#8B3A62] uppercase tracking-wider font-mono">
                <span>Neural Scholar Tier IV</span>
              </div>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Scholar ID:</span>
                <span className="font-mono font-bold text-slate-800">{scholarId}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Cohort:</span>
                <span className="font-mono font-bold text-slate-800">{cohort}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Department:</span>
                <span className="font-medium text-slate-800">Computer Science</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Academic Standing:</span>
                <span className="font-bold text-emerald-700">Good Standing (91st Percentile)</span>
              </div>
            </div>
          </div>

          {/* Editable Profile Information */}
          <div className="lg:col-span-2 bg-[#FFFFFF] border border-slate-200/80 rounded-xl p-6 shadow-xs space-y-5">
            <div>
              <h3 className="text-base font-bold text-slate-900">Personal Information</h3>
              <p className="text-xs text-slate-500">Update how your identity appears on lab submissions and certificates.</p>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:border-[#8B3A62] focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Institutional Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    disabled
                    className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg text-xs font-mono text-slate-500 cursor-not-allowed"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">Managed by university directory</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Enrolled Academic Program
                  </label>
                  <input
                    type="text"
                    disabled
                    value="Empirical Algorithms & Distributed Data Structures"
                    className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg text-xs font-medium text-slate-500 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Primary Faculty Advisor
                  </label>
                  <input
                    type="text"
                    disabled
                    value="Dr. Aris Thorne (Empirical Systems Lab)"
                    className="w-full px-3 py-2 bg-slate-100 border border-slate-200 rounded-lg text-xs font-medium text-slate-500 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#8B3A62] text-white hover:bg-[#6E2D4E] text-xs font-bold transition-colors shadow-xs"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── SubTab 2: Code Lab & IDE Preferences ── */}
      {activeSubTab === 'codelab' && (
        <div className="bg-[#FFFFFF] border border-slate-200/80 rounded-xl p-6 shadow-xs space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900">Code Lab & Sandbox Configuration</h3>
            <p className="text-xs text-slate-500">Fine-tune the integrated compiler, execution engine, and editor aesthetics.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            {/* Preferred Execution Engine */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">Default Execution Engine</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold">
                  Fastest
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Choose between instant sub-2ms client execution or remote multi-language compilation.
              </p>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setDefaultEngine('instant')}
                  className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-colors border ${
                    defaultEngine === 'instant'
                      ? 'bg-white border-[#8B3A62] text-[#8B3A62] shadow-xs'
                      : 'border-slate-200 text-slate-600 bg-white hover:bg-slate-100'
                  }`}
                >
                  ⚡ Instant Engine (&lt;2ms)
                </button>
                <button
                  onClick={() => setDefaultEngine('cloud')}
                  className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-colors border ${
                    defaultEngine === 'cloud'
                      ? 'bg-white border-[#8B3A62] text-[#8B3A62] shadow-xs'
                      : 'border-slate-200 text-slate-600 bg-white hover:bg-slate-100'
                  }`}
                >
                  Multi-Language Cloud
                </button>
              </div>
            </div>

            {/* Default Programming Language */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-2">
              <span className="text-xs font-bold text-slate-800">Default Practice Language</span>
              <p className="text-xs text-slate-500">Pre-selects language runtime when launching algorithms.</p>
              <div className="grid grid-cols-2 gap-2 pt-2">
                {(['javascript', 'python', 'cpp', 'java'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setDefaultLanguage(lang)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-mono font-bold uppercase transition-colors border ${
                      defaultLanguage === lang
                        ? 'bg-white border-[#8B3A62] text-[#8B3A62] shadow-xs'
                        : 'border-slate-200 text-slate-600 bg-white hover:bg-slate-100'
                    }`}
                  >
                    {lang === 'javascript' ? 'JS / TS' : lang}
                  </button>
                ))}
              </div>
            </div>

            {/* Editor Typography & Font Size */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-3">
              <span className="text-xs font-bold text-slate-800">Editor Font Size</span>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="12"
                  max="18"
                  value={editorFontSize}
                  onChange={(e) => setEditorFontSize(Number(e.target.value))}
                  className="flex-1 accent-[#8B3A62]"
                />
                <span className="font-mono text-xs font-bold text-slate-800 w-12 text-right">
                  {editorFontSize}px
                </span>
              </div>
              <p className="text-xs font-mono text-slate-500">Font: JetBrains Mono (Strict Code Base)</p>
            </div>

            {/* Tab Indentation */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 space-y-3">
              <span className="text-xs font-bold text-slate-800">Indentation Width</span>
              <div className="flex gap-2">
                {[2, 4].map((size) => (
                  <button
                    key={size}
                    onClick={() => setTabSize(size)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors border ${
                      tabSize === size
                        ? 'bg-white border-[#8B3A62] text-[#8B3A62] shadow-xs'
                        : 'border-slate-200 text-slate-600 bg-white hover:bg-slate-100'
                    }`}
                  >
                    {size} Spaces
                  </button>
                ))}
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs text-slate-700">Auto-evaluate test cases on execution</span>
                <input
                  type="checkbox"
                  checked={autoRunTests}
                  onChange={(e) => setAutoRunTests(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-[#8B3A62] focus:ring-[#8B3A62] accent-[#8B3A62]"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── SubTab 3: Telemetry & Neural Stream ── */}
      {activeSubTab === 'telemetry' && (
        <div className="bg-[#FFFFFF] border border-slate-200/80 rounded-xl p-6 shadow-xs space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900">Neural Telemetry & Attention Tracking</h3>
            <p className="text-xs text-slate-500">Configure real-time algorithmic telemetry synchronization with SynaptiQ Core v4.8.</p>
          </div>

          <div className="space-y-4">
            {/* Toggle 1: Attention Tracking */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-slate-900">Cognitive Focus & Attention Tracking</div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Monitors comprehension velocity during algorithm proofs to detect conceptual fatigue.
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={attentionTracking}
                  onChange={(e) => setAttentionTracking(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#8B3A62]" />
              </label>
            </div>

            {/* Toggle 2: Diagnostic Telemetry */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-slate-900">Empirical Diagnostic Submissions</div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Shares anonymized code execution latency and proof step verifications with faculty instructors.
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={diagnosticTelemetry}
                  onChange={(e) => setDiagnosticTelemetry(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#8B3A62]" />
              </label>
            </div>

            {/* Toggle 3: Runtime Benchmarking */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-slate-900">Local High-Precision Microsecond Benchmarking</div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Measures asymptotic efficiency (O(log n) vs O(n)) using high-resolution browser performance clocks.
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={runtimeBenchmarking}
                  onChange={(e) => setRuntimeBenchmarking(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#8B3A62]" />
              </label>
            </div>
          </div>
        </div>
      )}

      {/* ── SubTab 4: Security & Alerts ── */}
      {activeSubTab === 'security' && (
        <div className="bg-[#FFFFFF] border border-slate-200/80 rounded-xl p-6 shadow-xs space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900">Academic Alerts & Session Security</h3>
            <p className="text-xs text-slate-500">Manage calendar alerts, lab milestone reminders, and authenticated sessions.</p>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-slate-900">Unit Lab Deadline Notifications</div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Receive priority alerts 48 hours prior to academic cycle code deadlines.
                </div>
              </div>
              <input
                type="checkbox"
                checked={labReminders}
                onChange={(e) => setLabReminders(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-[#8B3A62] focus:ring-[#8B3A62] accent-[#8B3A62]"
              />
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-slate-900">Cohort Assessment Milestones</div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Notify when faculty releases new unit milestone verification proofs.
                </div>
              </div>
              <input
                type="checkbox"
                checked={milestoneAlerts}
                onChange={(e) => setMilestoneAlerts(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-[#8B3A62] focus:ring-[#8B3A62] accent-[#8B3A62]"
              />
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-slate-900">Weekly Mastery Progress Digest</div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Weekly email summary of empirical retention stability and percentile ranking.
                </div>
              </div>
              <input
                type="checkbox"
                checked={emailDigest}
                onChange={(e) => setEmailDigest(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-[#8B3A62] focus:ring-[#8B3A62] accent-[#8B3A62]"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
