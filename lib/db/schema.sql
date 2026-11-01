-- ====================================================================
-- SynaptiQ LMS -- Supabase PostgreSQL Schema & Security Rules
-- Run this script in the Supabase SQL Editor to initialize all tables
-- ====================================================================

-- 1. Profiles Table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email         TEXT NOT NULL,
  display_name  TEXT,
  avatar_url    TEXT,
  role          TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'faculty', 'admin')),
  preferences   JSONB DEFAULT '{
    "theme": "light",
    "codeLabFontSize": 14,
    "codeLabTabSize": 2
  }'::jsonb,
  created_at    TIMESTAMPTZ DEFAULT now(),
  last_login_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Course Progress Table
CREATE TABLE IF NOT EXISTS public.course_progress (
  id                BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id           UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  course_id         TEXT NOT NULL,
  status            TEXT NOT NULL DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed')),
  modules_completed INT DEFAULT 0,
  total_modules     INT DEFAULT 0,
  overall_score     NUMERIC(5,2) DEFAULT 0,
  started_at        TIMESTAMPTZ,
  completed_at      TIMESTAMPTZ,
  last_accessed_at  TIMESTAMPTZ DEFAULT now(),
  UNIQUE (user_id, course_id)
);

-- 3. Module Progress Table
CREATE TABLE IF NOT EXISTS public.module_progress (
  id              BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id         UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  course_id       TEXT NOT NULL,
  module_id       TEXT NOT NULL,
  status          TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('locked', 'available', 'in_progress', 'completed')),
  video_watched   BOOLEAN DEFAULT false,
  quiz_passed     BOOLEAN DEFAULT false,
  score           NUMERIC(5,2),
  completed_at    TIMESTAMPTZ,
  UNIQUE (user_id, course_id, module_id)
);

-- 4. Quiz Attempts Table
CREATE TABLE IF NOT EXISTS public.quiz_attempts (
  id              BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id         UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  course_id       TEXT NOT NULL,
  module_id       TEXT NOT NULL,
  questions       JSONB NOT NULL,
  score           NUMERIC(5,2) NOT NULL,
  total_questions INT NOT NULL,
  weak_concepts   TEXT[] DEFAULT '{}',
  attempted_at    TIMESTAMPTZ DEFAULT now()
);

-- 5. Lab Submissions Table (Code Lab interactive coding environment)
CREATE TABLE IF NOT EXISTS public.lab_submissions (
  id                BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id           UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  challenge_id      TEXT NOT NULL,
  code              TEXT NOT NULL,
  language          TEXT NOT NULL DEFAULT 'javascript',
  passed            BOOLEAN NOT NULL,
  test_results      JSONB,
  execution_time_ms INT,
  submitted_at      TIMESTAMPTZ DEFAULT now()
);

-- 6. Daily Analytics Table
CREATE TABLE IF NOT EXISTS public.analytics_daily (
  id                 BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id            UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  date               DATE NOT NULL DEFAULT CURRENT_DATE,
  study_time_minutes INT DEFAULT 0,
  concepts_mastered  INT DEFAULT 0,
  quizzes_completed  INT DEFAULT 0,
  average_score      NUMERIC(5,2) DEFAULT 0,
  streak_days        INT DEFAULT 0,
  UNIQUE (user_id, date)
);

-- ====================================================================
-- Automated User Profile Creation Trigger
-- ====================================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name, avatar_url, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'avatar_url',
    COALESCE(NEW.raw_user_meta_data->>'role', 'student')
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    display_name = COALESCE(EXCLUDED.display_name, public.profiles.display_name),
    last_login_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ====================================================================
-- Row Level Security (RLS) Policies
-- ====================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.module_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lab_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_daily ENABLE ROW LEVEL SECURITY;

-- Profiles: users read & update their own, faculty can read all
DROP POLICY IF EXISTS "Users read own profile" ON public.profiles;
CREATE POLICY "Users read own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users update own profile" ON public.profiles;
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Faculty read all profiles" ON public.profiles;
CREATE POLICY "Faculty read all profiles" ON public.profiles FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('faculty', 'admin'))
);

-- Course Progress
DROP POLICY IF EXISTS "Users read own course progress" ON public.course_progress;
CREATE POLICY "Users read own course progress" ON public.course_progress FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users write own course progress" ON public.course_progress;
CREATE POLICY "Users write own course progress" ON public.course_progress FOR ALL USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Faculty read all course progress" ON public.course_progress;
CREATE POLICY "Faculty read all course progress" ON public.course_progress FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('faculty', 'admin'))
);

-- Module Progress
DROP POLICY IF EXISTS "Users read own module progress" ON public.module_progress;
CREATE POLICY "Users read own module progress" ON public.module_progress FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users write own module progress" ON public.module_progress;
CREATE POLICY "Users write own module progress" ON public.module_progress FOR ALL USING (auth.uid() = user_id);

-- Quiz Attempts
DROP POLICY IF EXISTS "Users read own quiz attempts" ON public.quiz_attempts;
CREATE POLICY "Users read own quiz attempts" ON public.quiz_attempts FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users insert own quiz attempts" ON public.quiz_attempts;
CREATE POLICY "Users insert own quiz attempts" ON public.quiz_attempts FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Faculty read all quiz attempts" ON public.quiz_attempts;
CREATE POLICY "Faculty read all quiz attempts" ON public.quiz_attempts FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('faculty', 'admin'))
);

-- Lab Submissions
DROP POLICY IF EXISTS "Users read own lab submissions" ON public.lab_submissions;
CREATE POLICY "Users read own lab submissions" ON public.lab_submissions FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users insert own lab submissions" ON public.lab_submissions;
CREATE POLICY "Users insert own lab submissions" ON public.lab_submissions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Daily Analytics
DROP POLICY IF EXISTS "Users read own analytics" ON public.analytics_daily;
CREATE POLICY "Users read own analytics" ON public.analytics_daily FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users write own analytics" ON public.analytics_daily;
CREATE POLICY "Users write own analytics" ON public.analytics_daily FOR ALL USING (auth.uid() = user_id);

-- ====================================================================
-- Performance Indexes
-- ====================================================================
CREATE INDEX IF NOT EXISTS idx_course_progress_user ON public.course_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_module_progress_user ON public.module_progress(user_id, course_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user ON public.quiz_attempts(user_id, course_id);
CREATE INDEX IF NOT EXISTS idx_lab_submissions_user ON public.lab_submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_daily_user_date ON public.analytics_daily(user_id, date);

