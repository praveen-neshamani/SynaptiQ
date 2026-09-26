// ─────────────────────────────────────────────────────────────
// lib/coursesRegistry.ts
// Central registry for all learning paths
// ─────────────────────────────────────────────────────────────

import { CourseVideo, VideoQuizMap } from './courseData'
import {
  treeGraphMainVideos,
  treeGraphFundamentals,
  treeGraphQuizzes,
} from './treeGraphTraversals'
import {
  sortingSearchingMainVideos,
  sortingSearchingFundamentals,
  sortingSearchingQuizzes,
} from './sortingSearching'

export interface Course {
  id: string
  title: string
  description: string
  thumbnail: string
  mainVideos: CourseVideo[]
  fundamentals: Record<string, CourseVideo>
  quizzes: VideoQuizMap
}

// ALL COURSES REGISTRY
export const courses: Record<string, Course> = {
  'tree-graph-traversals': {
    id: 'tree-graph-traversals',
    title: 'Tree and Graph Traversals',
    description: 'Master BFS, DFS, and Binary Search Trees with hands-on examples and real-world applications.',
    thumbnail: 'tree-graph',
    mainVideos: treeGraphMainVideos,
    fundamentals: treeGraphFundamentals,
    quizzes: treeGraphQuizzes,
  },
  'sorting-searching': {
    id: 'sorting-searching',
    title: 'Sorting and Searching Algorithms',
    description: 'Learn Binary Search, Insertion Sort, and Heap Sort with step-by-step visualizations.',
    thumbnail: 'sorting-searching',
    mainVideos: sortingSearchingMainVideos,
    fundamentals: sortingSearchingFundamentals,
    quizzes: sortingSearchingQuizzes,
  },
}

// Helper function to get course by ID
export function getCourse(courseId: string): Course | null {
  return courses[courseId] || null
}

// Helper function to get all courses as array
export function getAllCourses(): Course[] {
  return Object.values(courses)
}
