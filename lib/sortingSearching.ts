// ─────────────────────────────────────────────────────────────
// lib/sortingSearching.ts
// Course: Sorting and Searching Algorithms
// ─────────────────────────────────────────────────────────────

import { CourseVideo, VideoQuizMap } from './courseData'

// 🎥 MAIN COURSE VIDEOS (2 videos)
export const sortingSearchingMainVideos: CourseVideo[] = [
  {
    id: 'insertion_sort',
    title: 'Insertion Sort Algorithm',
    url: '/videos/sorting-searching/insertion_sort.mp4',
    concept: 'insertion sort and incremental sorting',
    simulatorUrl: '/simulators/sorting-searching/insertion-sort-simulator.html',
    flashcardsUrl: '/flashcards/sorting-searching/insertion-sort-flashcards.html',
  },
  {
    id: 'max_min_heap',
    title: 'Min Heap and Max Heap',
    url: '/videos/sorting-searching/max_min_heap.mp4',
    concept: 'min heap, max heap, heap properties, and heapify operations',
    simulatorUrl: '/simulators/sorting-searching/heap-simulator.html',
    flashcardsUrl: '/flashcards/sorting-searching/heap-flashcards.html',
  },
]

// 📚 FUNDAMENTALS VIDEOS (2 videos)
// Mapping: Insertion Sort→array, Max/Min Heap→heap
export const sortingSearchingFundamentals: Record<string, CourseVideo> = {
  array: {
    id: 'fund_array',
    title: '📌 Fundamentals: Array Data Structure',
    url: '/videos/sorting-searching/fund_array.mp4',
    concept: 'arrays, indexing, memory layout, and array operations',
    isFundamental: true,
  },
  heap: {
    id: 'fund_heap',
    title: '📌 Fundamentals: Heap Data Structure',
    url: '/videos/sorting-searching/fund_heap.mp4',
    concept: 'heap structure, complete binary tree, heap property, and heapify',
    isFundamental: true,
  },
}

// 🧠 FALLBACK QUIZ QUESTIONS
export const sortingSearchingQuizzes: VideoQuizMap = {
  insertion_sort: [
    {
      question: 'What is the best case time complexity of Insertion Sort?',
      options: ['O(1)', 'O(n)', 'O(n log n)', 'O(n²)'],
      correctIndex: 1,
      difficulty: 'easy',
      explanation: 'The best case for Insertion Sort is O(n) when the array is already sorted. In this case, we only need to compare each element once with its predecessor, making n-1 comparisons total with no swaps needed.',
    },
    {
      question: 'Insertion Sort is efficient for?',
      options: ['Large datasets', 'Nearly sorted data', 'Reverse sorted data', 'Random data'],
      correctIndex: 1,
      difficulty: 'medium',
      explanation: 'Insertion Sort performs exceptionally well on nearly sorted data because it only needs to make a few comparisons and swaps to place each element in its correct position. This makes it approach O(n) time complexity for almost-sorted arrays.',
    },
    {
      question: 'Insertion Sort is a ___ algorithm?',
      options: ['Unstable', 'Stable', 'Non-comparison', 'Divide-and-conquer'],
      correctIndex: 1,
      difficulty: 'medium',
      explanation: 'Insertion Sort is a stable sorting algorithm, meaning it preserves the relative order of equal elements. When inserting an element, we only move it past elements that are strictly greater, maintaining the original order of duplicates.',
    },
  ],
  max_min_heap: [
    {
      question: 'In a Max Heap, the root contains?',
      options: ['Minimum value', 'Maximum value', 'Median value', 'Random value'],
      correctIndex: 1,
      difficulty: 'easy',
      explanation: 'In a Max Heap, the root node always contains the maximum value in the entire heap. This is the fundamental property of a max heap - every parent must be greater than or equal to its children.',
    },
    {
      question: 'In a Min Heap, every parent node is ___ its children?',
      options: ['Greater than', 'Less than or equal to', 'Equal to', 'Greater than or equal to'],
      correctIndex: 1,
      difficulty: 'easy',
      explanation: 'In a Min Heap, every parent node must be less than or equal to its children. This ensures the smallest element is always at the root, and the heap property is maintained throughout the tree structure.',
    },
    {
      question: 'What is the time complexity of inserting into a heap?',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
      correctIndex: 1,
      difficulty: 'medium',
      explanation: 'Inserting into a heap takes O(log n) time. We add the new element at the end (O(1)), then bubble it up by comparing with parents until the heap property is restored. In the worst case, we traverse the height of the tree, which is log n.',
    },
  ],
}
