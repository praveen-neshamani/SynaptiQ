// ─────────────────────────────────────────────────────────────
// lib/courseData.ts
//
// ⚠️ DEPRECATED: This file is no longer used.
// Use coursesRegistry.ts, treeGraphTraversals.ts, and sortingSearching.ts instead.
//
// This file only contains TypeScript interfaces used across the app.
// ─────────────────────────────────────────────────────────────

export interface CourseVideo {
  id: string              // unique key e.g. "binary_search"
  title: string           // display title
  url: string             // video URL (mp4 or YouTube embed)
  concept: string         // concept name for AI to reference
  isFundamental?: boolean // true = inserted dynamically, not in original playlist
  insertedAfter?: string  // which video id triggered this insertion
  simulatorUrl?: string   // path to simulator HTML file
  flashcardsUrl?: string  // path to flashcards HTML file
}

export interface QuizQuestion {
  question: string
  options: string[]       // 4 MCQ options
  correctIndex: number    // 0-based index of correct option
  difficulty: 'easy' | 'medium' | 'hard'
  explanation?: string    // Explanation for the correct answer
}

export interface VideoQuizMap {
  [videoId: string]: QuizQuestion[]
}

// ⚠️ DEPRECATED: Data moved to individual course files
// See: treeGraphTraversals.ts and sortingSearching.ts

