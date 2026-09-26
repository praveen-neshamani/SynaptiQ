'use client'

import { useEffect, useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getAllCourses } from '@/lib/coursesRegistry'
import CodeLabWorkspace from '@/components/CodeLabWorkspace'

export default function StudentDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const courses = getAllCourses()
  const [activeTab, setActiveTab] = useState<'cockpit' | 'codelab' | 'curriculum' | 'analytics' | 'tuition'>('cockpit')
  const [selectedLabId, setSelectedLabId] = useState<string>('avl-rotation')
  const [timeframe, setTimeframe] = useState<'today' | 'monthly' | 'yearly'>('monthly')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const email = session?.user?.email || ''
  const studentDisplayName = email ? email.split('@')[0] : 'Eleanor Vance'

  const logout = async () => {
    await signOut({ callbackUrl: '/login' })
  }

  const startCourse = (courseId: string) => {
    router.push(`/learn?course=${courseId}`)
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F5F0]">
        <div className="flex items-center gap-3 text-[#8B3A62] font-semibold text-base">
          <svg className="animate-spin h-5 w-5 text-[#8B3A62]" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
          </svg>
          <span>Loading SynaptiQ Learner Cockpit...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F5F5F0] text-[#171717] flex flex-col md:flex-row font-sans">
      {/* ── Left Sidebar Navigation (Stitch Enterprise LMS Specification) ── */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-[#FFFFFF] border-r border-slate-200/80 flex flex-col justify-between
        transform transition-transform duration-200 ease-in-out
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-5 flex-1 overflow-y-auto">
          {/* Brand Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-[#8B3A62] flex items-center justify-center text-white shadow-xs">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" />
              </svg>
            </div>
            <div>
              <div className="font-bold text-base tracking-tight text-[#171717]">SynaptiQ</div>
              <div className="text-xs uppercase tracking-wider text-slate-400 font-semibold font-mono">ENTERPRISE LMS</div>
            </div>
          </div>

          {/* User Scholar Tier Pill */}
          <div className="mb-6 p-3 rounded-lg bg-[#FFF5F8] border border-rose-200/60 flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-[#8B3A62] text-white flex items-center justify-center shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-[#8B3A62] tracking-tight uppercase truncate">Neural Scholar Tier IV</div>
              <div className="text-xs font-mono text-slate-500">ID: SQ-94821</div>
            </div>
          </div>

          {/* Core Architecture Menu */}
          <div className="mb-6">
            <div className="text-xs uppercase font-semibold text-slate-400 tracking-wider px-3 mb-2 font-mono">
              CORE ARCHITECTURE
            </div>
            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('cockpit')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === 'cockpit'
                    ? 'bg-[#8B3A62] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <line x1="3" y1="9" x2="21" y2="9" />
                  <line x1="9" y1="21" x2="9" y2="9" />
                </svg>
                <span>Learner Cockpit</span>
              </button>

              <button
                onClick={() => setActiveTab('codelab')}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === 'codelab'
                    ? 'bg-[#8B3A62] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
                <span>Code Lab</span>
                <span className={`ml-auto text-[10px] font-mono px-1.5 py-0.5 rounded ${
                  activeTab === 'codelab'
                    ? 'bg-white/20 text-white font-semibold'
                    : 'bg-[#FFF5F8] text-[#8B3A62] font-bold border border-rose-200/60'
                }`}>
                  Live IDE
                </span>
              </button>

              <button
                onClick={() => startCourse('tree-graph-traversals')}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>
                <span>Curriculum & Tracks</span>
              </button>

              <button
                onClick={() => {
                  setSelectedLabId('avl-rotation')
                  setActiveTab('codelab')
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  activeTab === 'codelab'
                    ? 'text-slate-900 bg-slate-100 font-semibold'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 2v7.31M14 9.3V1.99M8.5 2h7M14 9.3a6.5 6.5 0 1 1-4 0" />
                </svg>
                <span>Labs & Sandbox</span>
              </button>

              <button
                onClick={() => startCourse('tree-graph-traversals')}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                <span>Assessments</span>
              </button>

              <Link
                href="/faculty/analytics"
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="20" x2="18" y2="10" />
                  <line x1="12" y1="20" x2="12" y2="4" />
                  <line x1="6" y1="20" x2="6" y2="14" />
                </svg>
                <span>Progress Analytics</span>
              </Link>

              <button
                onClick={() => {
                  const el = document.getElementById('tuition-history-section')
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
                <span>Tuition & Orders</span>
              </button>
            </nav>
          </div>

          {/* System Configuration Menu */}
          <div>
            <div className="text-xs uppercase font-semibold text-slate-400 tracking-wider px-3 mb-2 font-mono">
              SYSTEM CONFIGURATION
            </div>
            <nav className="space-y-1">
              <Link
                href="/faculty/analytics"
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
                <span>Settings</span>
              </Link>

              <button
                onClick={logout}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-rose-700 hover:bg-rose-50 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                <span>Sign Out</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Bottom Status Pill */}
        <div className="p-4 border-t border-slate-200/80">
          <div className="flex items-center justify-between text-xs px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200/70 text-slate-600 font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Core v4.8 Sync</span>
            </div>
            <span className="text-slate-400">99.8ms</span>
          </div>
        </div>
      </aside>

      {/* ── Main Content Area with Header Bar ── */}
      <div className="flex-1 md:ml-64 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 h-16 bg-[#FFFFFF] border-b border-slate-200/80 px-4 sm:px-8 flex items-center justify-between gap-4">
          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            aria-label="Toggle Navigation Menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          {/* Search bar */}
          <div className="flex-1 max-w-md relative hidden sm:block">
            <svg className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Universal index search (track, thesis, node)"
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200/80 rounded-lg text-xs placeholder:text-slate-400 focus:outline-none focus:border-[#8B3A62] focus:bg-white transition-colors"
            />
          </div>

          {/* Right Header Status & Profile Controls */}
          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            {/* Cohort Selector Pill */}
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200/80 text-xs text-slate-700 font-mono font-medium">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <span>COHORT: <strong className="text-[#171717]">ALPHA-2025/CS</strong></span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
            </div>

            {/* Notification Bell */}
            <button className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors" aria-label="Notifications">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500" />
            </button>

            {/* User Profile */}
            <div className="flex items-center gap-3 pl-2 sm:border-l sm:border-slate-200">
              <div className="w-8 h-8 rounded-full bg-[#8B3A62] text-white font-bold flex items-center justify-center text-xs shadow-xs">
                {studentDisplayName.charAt(0).toUpperCase()}
              </div>
              <div className="hidden sm:block text-left">
                <div className="text-xs font-bold text-[#171717] leading-none">{studentDisplayName}</div>
                <div className="text-xs text-slate-400 font-medium mt-0.5">Student Fellow</div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Body */}
        <main className="p-4 sm:p-8 space-y-6 max-w-7xl w-full mx-auto">
          {activeTab === 'codelab' ? (
            <CodeLabWorkspace
              initialChallengeId={selectedLabId}
              onBackToCockpit={() => setActiveTab('cockpit')}
            />
          ) : (
            <>
              {/* ── Welcome Greeting Bar ── */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-mono font-semibold text-[#8B3A62] tracking-wider mb-1">
                    ID: SQ-94821 • Cohort Alpha-2025
                  </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#171717]">
                Welcome back, Scholar {studentDisplayName.split(' ')[0]}
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Department of Computer Science • Empirical Algorithms Track • Term IV
              </p>
            </div>

            {/* Timeframe & Date Range Controls */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="bg-[#FFFFFF] border border-slate-200/80 rounded-lg p-1 flex items-center gap-1 shadow-xs">
                {(['today', 'monthly', 'yearly'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTimeframe(t)}
                    className={`px-3 py-1 rounded text-xs capitalize transition-colors font-medium ${
                      timeframe === t
                        ? 'bg-[#FFF5F8] text-[#8B3A62] font-semibold border border-rose-200/60'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div className="bg-[#FFFFFF] border border-slate-200/80 rounded-lg px-3 py-1.5 flex items-center gap-2 text-xs font-mono text-slate-600 shadow-xs">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span>Oct 01, 2024 – Oct 31, 2024</span>
              </div>
            </div>
          </div>

          {/* ── Metric & KPI Cards (Row 1 - Stitch 4-Card Spec) ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: Enrolled Modules */}
            <div className="bg-[#FFFFFF] border border-slate-200/80 rounded-xl p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 font-mono">
                  <span>ENROLLED MODULES</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8B3A62" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <line x1="3" y1="9" x2="21" y2="9" />
                  </svg>
                </div>
                <div className="text-3xl font-bold tracking-tight text-[#171717] tabular-nums">
                  8 <span className="text-base font-normal text-slate-500">Active</span>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs">
                <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold font-mono">
                  +2 registered
                </span>
                <span className="text-slate-400">this academic term</span>
              </div>
            </div>

            {/* Card 2: Mastery Rate */}
            <div className="bg-[#FFFFFF] border border-slate-200/80 rounded-xl p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 font-mono">
                  <span>MASTERY RATE</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold font-mono">
                    +6.2%
                  </span>
                </div>
                <div className="text-3xl font-bold tracking-tight text-[#171717] tabular-nums">
                  84.6% <span className="text-xs font-semibold text-slate-400 font-mono">AGG</span>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400">Cohort Rank</span>
                <span className="font-semibold text-[#8B3A62]">91st Percentile</span>
              </div>
            </div>

            {/* Card 3: Retention Stability */}
            <div className="bg-[#FFFFFF] border border-slate-200/80 rounded-xl p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 font-mono">
                  <span>RETENTION STABILITY</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold font-mono">
                    STABLE
                  </span>
                </div>
                <div className="text-3xl font-bold tracking-tight text-[#171717] tabular-nums">
                  92.4% <span className="text-xs font-semibold text-slate-400 font-mono">SCORE</span>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400">Verification Latency</span>
                <span className="font-mono font-medium text-slate-700">142ms</span>
              </div>
            </div>

            {/* Card 4: Lab Practice */}
            <div className="bg-[#FFFFFF] border border-slate-200/80 rounded-xl p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 font-mono">
                  <span>LAB PRACTICE</span>
                  <span className="px-2 py-0.5 rounded bg-[#FFF5F8] text-[#8B3A62] border border-rose-200/60 font-semibold font-mono">
                    Optimal Pace
                  </span>
                </div>
                <div className="text-3xl font-bold tracking-tight text-[#171717] tabular-nums">
                  142.5 <span className="text-base font-normal text-slate-500">hrs</span>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400">Weekly Throughput</span>
                <span className="font-mono font-medium text-slate-700">+18.4 hrs</span>
              </div>
            </div>
          </div>

          {/* ── Unit 4 Core Milestone Banner (High-Contrast Burgundy Ribbon) ── */}
          <div className="rounded-xl p-6 sm:p-7 text-white shadow-md relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6"
            style={{
              background: 'linear-gradient(135deg, #7A2E53 0%, #8B3A62 50%, #9C456E 100%)',
            }}
          >
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded bg-white/20 text-white tracking-wider uppercase">
                  UNIT 4 CORE MILESTONE
                </span>
                <span className="text-xs text-white/80 font-mono">
                  Due in 2 academic cycles
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                Self-Balancing Binary Trees: Double Rotations & Invariants
              </h2>
              <p className="text-xs text-white/90 leading-relaxed">
                Interactive formal proof verification for AVL left-right rotations under logarithmic height guarantees. 2 proof obligations remaining in Unit Lab Sandbox.
              </p>
            </div>

            <button
              onClick={() => {
                setSelectedLabId('avl-rotation')
                setActiveTab('codelab')
              }}
              className="px-5 py-2.5 rounded-lg bg-white text-[#7A2E53] hover:bg-slate-50 font-bold text-xs shadow-md transition-all self-start md:self-auto shrink-0 flex items-center gap-2"
            >
              <span>Resume Unit 4 Lab</span>
              <span>→</span>
            </button>
          </div>

          {/* ── Active Learning Modules (Row 2 - Two Column Grid) ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Module 1: Self-Balancing Binary Search Trees */}
            <div className="bg-[#FFFFFF] border border-slate-200/80 rounded-xl p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-[#8B3A62] tracking-wider">
                    CS-304 • MODULE 84
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-[#FFF5F8] border border-rose-200/60 flex items-center justify-center text-[#8B3A62]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="5" r="2.5" />
                      <circle cx="6" cy="18" r="2.5" />
                      <circle cx="18" cy="18" r="2.5" />
                      <path d="M12 7.5v4M12 11.5L6 15.5M12 11.5L18 15.5" />
                    </svg>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#171717] tracking-tight">
                    Self-Balancing Binary Search Trees
                  </h3>
                  <div className="mt-2 space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                      <span>Module Verification</span>
                      <span className="font-bold text-[#8B3A62] tabular-nums">76% Completed</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full rounded-full bg-[#8B3A62]" style={{ width: '76%' }} />
                    </div>
                  </div>
                </div>

                {/* Technical Code Pills */}
                <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-xs text-slate-700">
                  <span className="px-2.5 py-1 rounded bg-slate-50 border border-slate-200/80">
                    AVLTree.rotateRight()
                  </span>
                  <span className="px-2.5 py-1 rounded bg-slate-50 border border-slate-200/80">
                    balanceFactor &lt;= 1
                  </span>
                  <span className="px-2.5 py-1 rounded bg-slate-50 border border-slate-200/80">
                    O(log n)
                  </span>
                </div>

                {/* Objective Box */}
                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/70 space-y-1">
                  <div className="text-xs uppercase font-semibold font-mono text-slate-400 tracking-wider">
                    CURRENT OBJECTIVE
                  </div>
                  <p className="text-xs font-medium text-slate-800 leading-normal">
                    Complete Interactive Balancing Proof: Left-Right Double Rotation
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
                <button
                  onClick={() => startCourse('tree-graph-traversals')}
                  className="flex-1 py-2 px-3 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                  </svg>
                  <span>Review Codex</span>
                </button>
                <button
                  onClick={() => {
                    setSelectedLabId('avl-rotation')
                    setActiveTab('codelab')
                  }}
                  className="flex-1 py-2 px-3 rounded-lg bg-[#8B3A62] text-white hover:bg-[#6E2D4E] text-xs font-semibold shadow-xs transition-colors flex items-center justify-center gap-2"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                  <span>Launch Lab</span>
                </button>
              </div>
            </div>

            {/* Module 2: Graph Theory & Shortest Paths */}
            <div className="bg-[#FFFFFF] border border-slate-200/80 rounded-xl p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-[#8B3A62] tracking-wider">
                    CS-301 • MODULE 87
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-[#FFF5F8] border border-rose-200/60 flex items-center justify-center text-[#8B3A62]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="14" width="3" height="7" rx="1" fill="#8B3A62" />
                      <rect x="8" y="10" width="3" height="11" rx="1" fill="#8B3A62" />
                      <rect x="13" y="5" width="3" height="16" rx="1" fill="#8B3A62" />
                      <circle cx="18" cy="8" r="3" strokeWidth="2" />
                    </svg>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#171717] tracking-tight">
                    Graph Theory & Shortest Paths
                  </h3>
                  <div className="mt-2 space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                      <span>Module Verification</span>
                      <span className="font-bold text-[#8B3A62] tabular-nums">62% Completed</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full rounded-full bg-[#8B3A62]" style={{ width: '62%' }} />
                    </div>
                  </div>
                </div>

                {/* Technical Code Pills */}
                <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-xs text-slate-700">
                  <span className="px-2.5 py-1 rounded bg-slate-50 border border-slate-200/80">
                    Dijkstra.minPriorityQueue()
                  </span>
                  <span className="px-2.5 py-1 rounded bg-slate-50 border border-slate-200/80">
                    O((V+E)logV)
                  </span>
                  <span className="px-2.5 py-1 rounded bg-slate-50 border border-slate-200/80">
                    Relaxation
                  </span>
                </div>

                {/* Objective Box */}
                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/70 space-y-1">
                  <div className="text-xs uppercase font-semibold font-mono text-slate-400 tracking-wider">
                    CURRENT OBJECTIVE
                  </div>
                  <p className="text-xs font-medium text-slate-800 leading-normal">
                    Implement Bellman-Ford Negative Cycle Detection with formal termination proof
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
                <button
                  onClick={() => startCourse('sorting-searching')}
                  className="flex-1 py-2 px-3 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12.01" y2="8" />
                  </svg>
                  <span>View Proofs</span>
                </button>
                <button
                  onClick={() => {
                    setSelectedLabId('dijkstra-shortest-path')
                    setActiveTab('codelab')
                  }}
                  className="flex-1 py-2 px-3 rounded-lg bg-[#8B3A62] text-white hover:bg-[#6E2D4E] text-xs font-semibold shadow-xs transition-colors flex items-center justify-center gap-2"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                  <span>Launch Lab</span>
                </button>
              </div>
            </div>
          </div>

          {/* ── Lower Dashboard Grid (Row 3 - Two Columns) ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left 7 Columns: Core Concept Mastery & Diagnostic Executions */}
            <div className="lg:col-span-7 space-y-6">
              {/* Core Concept Mastery Widget */}
              <div className="bg-[#FFFFFF] border border-slate-200/80 rounded-xl p-6 shadow-xs">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                  <div>
                    <h3 className="text-base font-bold text-[#171717] tracking-tight">
                      Core Concept Mastery
                    </h3>
                    <p className="text-xs text-slate-500">
                      Algorithmic stability monitored via empirical runtimes
                    </p>
                  </div>
                  <span className="text-xs font-mono font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded">
                    4 Subsystems
                  </span>
                </div>

                <div className="space-y-4">
                  {/* Item 1 */}
                  <div>
                    <div className="flex items-center justify-between text-xs font-medium text-slate-700 mb-1.5">
                      <span>Tree Rotations & Height Invariants</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-slate-900 tabular-nums">91%</span>
                        <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 text-xs font-semibold font-mono border border-emerald-200">
                          OPTIMAL
                        </span>
                      </div>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full rounded-full bg-emerald-600" style={{ width: '91%' }} />
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div>
                    <div className="flex items-center justify-between text-xs font-medium text-slate-700 mb-1.5">
                      <span>Dynamic Programming State Transitions</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-slate-900 tabular-nums">68%</span>
                        <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 text-xs font-semibold font-mono border border-amber-200">
                          DECAY RISK
                        </span>
                      </div>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full rounded-full bg-amber-500" style={{ width: '68%' }} />
                    </div>
                  </div>

                  {/* Item 3 */}
                  <div>
                    <div className="flex items-center justify-between text-xs font-medium text-slate-700 mb-1.5">
                      <span>Amortized Complexity Analysis</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-slate-900 tabular-nums">85%</span>
                        <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 text-xs font-semibold font-mono border border-emerald-200">
                          OPTIMAL
                        </span>
                      </div>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full rounded-full bg-emerald-600" style={{ width: '85%' }} />
                    </div>
                  </div>

                  {/* Item 4 */}
                  <div>
                    <div className="flex items-center justify-between text-xs font-medium text-slate-700 mb-1.5">
                      <span>B-Trees & Multiway Storage Hierarchy</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-slate-900 tabular-nums">54%</span>
                        <span className="px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 text-xs font-semibold font-mono border border-rose-200">
                          REMEDIATION
                        </span>
                      </div>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div className="h-full rounded-full bg-rose-500" style={{ width: '54%' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Diagnostic Executions Widget */}
              <div className="bg-[#FFFFFF] border border-slate-200/80 rounded-xl p-6 shadow-xs">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                  <h3 className="text-base font-bold text-[#171717] tracking-tight">
                    Recent Diagnostic Executions
                  </h3>
                  <span className="text-xs font-mono text-slate-400">
                    Telemetry v4.8
                  </span>
                </div>

                <div className="space-y-3">
                  {/* Execution 1 */}
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/70 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center shrink-0">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-xs font-mono font-semibold text-slate-900">
                          #SESSION-9021: Red-Black Invariant Verification
                        </div>
                        <div className="text-xs text-slate-500">
                          Tested 128 randomized node permutations
                        </div>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-xs font-bold font-mono text-emerald-700">100% Coverage</div>
                      <div className="text-xs text-slate-400">Today 11:42</div>
                    </div>
                  </div>

                  {/* Execution 2 */}
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/70 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center shrink-0">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-xs font-mono font-semibold text-slate-900">
                          #SESSION-9884: Kruskal Minimum Spanning Forest
                        </div>
                        <div className="text-xs text-slate-500">
                          Union-Find disjoint-set optimization
                        </div>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-xs font-bold font-mono text-emerald-700">Proof Solved</div>
                      <div className="text-xs text-slate-400">Yesterday 16:15</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Recommended Exercise & Tuition History */}
            <div className="lg:col-span-5 space-y-6">
              {/* Recommended Exercise Card */}
              <div className="bg-[#FFFFFF] border border-slate-200/80 rounded-xl p-6 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase font-bold text-[#8B3A62] tracking-wider font-mono">
                    RECOMMENDED EXERCISE
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    ~20 min
                  </span>
                </div>

                <h4 className="text-base font-bold text-[#171717] tracking-tight">
                  Multiway Node Splitting in 2-3-4 Trees
                </h4>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Recommended to reinforce lower B-Tree mastery before tomorrow&apos;s cohort synchronous lab.
                </p>

                <button
                  onClick={() => {
                    setSelectedLabId('avl-rotation')
                    setActiveTab('codelab')
                  }}
                  className="w-full py-2.5 px-4 rounded-lg bg-[#8B3A62] text-white hover:bg-[#6E2D4E] text-xs font-semibold shadow-xs transition-colors flex items-center justify-center gap-2"
                >
                  <span>Start Practice Lab</span>
                  <span>→</span>
                </button>
              </div>

              {/* Tuition & Order History Card */}
              <div id="tuition-history-section" className="bg-[#FFFFFF] border border-slate-200/80 rounded-xl p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="text-base font-bold text-[#171717] tracking-tight">
                      Tuition & Order History
                    </h3>
                    <p className="text-xs text-slate-500">
                      Receipts, subscriptions & course fees
                    </p>
                  </div>
                  <button className="text-xs font-semibold text-[#8B3A62] hover:underline">
                    View All
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-mono font-semibold uppercase border-b border-slate-100 pb-1">
                    <span>ORDER ID</span>
                    <span className="flex-1 px-3">COURSE / ITEM</span>
                    <span>PRICE</span>
                    <span className="w-14 text-right">STATUS</span>
                  </div>

                  {/* Row 1 */}
                  <div className="flex items-center justify-between text-xs py-1 border-b border-slate-50">
                    <span className="font-mono text-slate-500">#3957</span>
                    <div className="flex-1 px-3">
                      <div className="font-semibold text-slate-800">Advanced Algorithms...</div>
                      <div className="text-slate-400 text-xs">Oct 20, 2024</div>
                    </div>
                    <span className="font-mono font-bold text-slate-800">$368.00</span>
                    <span className="w-14 text-right">
                      <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 text-xs font-semibold font-mono border border-emerald-200">
                        Paid
                      </span>
                    </span>
                  </div>

                  {/* Row 2 */}
                  <div className="flex items-center justify-between text-xs py-1 border-b border-slate-50">
                    <span className="font-mono text-slate-500">#3906</span>
                    <div className="flex-1 px-3">
                      <div className="font-semibold text-slate-800">Neural Telemetry...</div>
                      <div className="text-slate-400 text-xs">Oct 21, 2024</div>
                    </div>
                    <span className="font-mono font-bold text-slate-800">$299.00</span>
                    <span className="w-14 text-right">
                      <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 text-xs font-semibold font-mono border border-emerald-200">
                        Paid
                      </span>
                    </span>
                  </div>

                  {/* Row 3 */}
                  <div className="flex items-center justify-between text-xs py-1">
                    <span className="font-mono text-slate-500">#3901</span>
                    <div className="flex-1 px-3">
                      <div className="font-semibold text-slate-800">Core Discrete Math...</div>
                      <div className="text-slate-400 text-xs">Sep 15, 2024</div>
                    </div>
                    <span className="font-mono font-bold text-slate-800">$149.00</span>
                    <span className="w-14 text-right">
                      <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 text-xs font-semibold font-mono border border-emerald-200">
                        Paid
                      </span>
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Need institutional tuition tax forms?</span>
                  <button className="text-[#8B3A62] font-semibold hover:underline flex items-center gap-1">
                    <span>↓ Download 1098-T</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
            </>
          )}
        </main>
      </div>
    </div>
  )
}
