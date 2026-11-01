export interface Profile {
  id: string
  email: string
  display_name: string | null
  avatar_url: string | null
  role: 'student' | 'faculty' | 'admin'
  preferences: {
    theme?: 'light' | 'dark'
    codeLabFontSize?: number
    codeLabTabSize?: number
  } | null
  created_at: string
  last_login_at: string
}

export interface CourseProgress {
  id: number
  user_id: string
  course_id: string
  status: 'not_started' | 'in_progress' | 'completed'
  modules_completed: number
  total_modules: number
  overall_score: number
  started_at: string | null
  completed_at: string | null
  last_accessed_at: string
}

export interface ModuleProgress {
  id: number
  user_id: string
  course_id: string
  module_id: string
  status: 'locked' | 'available' | 'in_progress' | 'completed'
  video_watched: boolean
  quiz_passed: boolean
  score: number | null
  completed_at: string | null
}

export interface QuizAttempt {
  id?: number
  user_id: string
  course_id: string
  module_id: string
  questions: Array<{
    question: string
    options: string[]
    correctIndex: number
    selectedIndex: number
    isCorrect: boolean
  }>
  score: number
  total_questions: number
  weak_concepts: string[]
  attempted_at?: string
}

export interface LabSubmission {
  id?: number
  user_id: string
  challenge_id: string
  code: string
  language: string
  passed: boolean
  test_results: Array<{
    name: string
    passed: boolean
    expected?: string
    actual?: string
  }>
  execution_time_ms: number
  submitted_at?: string
}

