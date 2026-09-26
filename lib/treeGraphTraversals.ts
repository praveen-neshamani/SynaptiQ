// ─────────────────────────────────────────────────────────────
// lib/treeGraphTraversals.ts
// Course: Tree and Graph Traversals
// ─────────────────────────────────────────────────────────────

import { CourseVideo, VideoQuizMap } from './courseData'

// 🎥 MAIN COURSE VIDEOS (3 videos)
export const treeGraphMainVideos: CourseVideo[] = [
  {
    id: 'bfs',
    title: 'Breadth-First Search (BFS)',
    url: '/videos/tree-graph-traversals/bfs.mp4',
    concept: 'breadth-first search and level-order traversal',
    simulatorUrl: '/simulators/tree-graph-traversals/bfs-simulator.html',
    flashcardsUrl: '/flashcards/tree-graph-traversals/bfs-flashcards.html',
  },
  {
    id: 'dfs',
    title: 'Depth-First Search (DFS)',
    url: '/videos/tree-graph-traversals/dfs.mp4',
    concept: 'depth-first search and recursive traversal',
    simulatorUrl: '/simulators/tree-graph-traversals/dfs-simulator.html',
    flashcardsUrl: '/flashcards/tree-graph-traversals/dfs-flashcards.html',
  },
  {
    id: 'bst',
    title: 'Binary Search Tree (BST)',
    url: '/videos/tree-graph-traversals/bst.mp4',
    concept: 'binary search tree operations and properties',
    simulatorUrl: '/simulators/tree-graph-traversals/bst-simulator.html',
    flashcardsUrl: '/flashcards/tree-graph-traversals/bst-flashcards.html',
  },
]

// 📚 FUNDAMENTALS VIDEOS (3 videos)
// Mapping: BFS→queue, DFS→stack, BST→tree
export const treeGraphFundamentals: Record<string, CourseVideo> = {
  queue: {
    id: 'fund_queue',
    title: '📌 Fundamentals: Queue Data Structure',
    url: '/videos/tree-graph-traversals/fund_queue.mp4',
    concept: 'queue, FIFO principle, enqueue and dequeue operations',
    isFundamental: true,
  },
  stack: {
    id: 'fund_stack',
    title: '📌 Fundamentals: Stack Data Structure',
    url: '/videos/tree-graph-traversals/fund_stack.mp4',
    concept: 'stack, LIFO principle, push and pop operations',
    isFundamental: true,
  },
  tree: {
    id: 'fund_tree',
    title: '📌 Fundamentals: Tree Data Structure',
    url: '/videos/tree-graph-traversals/fund_tree.mp4',
    concept: 'tree structure, nodes, parent-child relationships, and tree terminology',
    isFundamental: true,
  },
}

// 🧠 FALLBACK QUIZ QUESTIONS
export const treeGraphQuizzes: VideoQuizMap = {
  bfs: [
    {
      question: 'Which data structure is used in BFS?',
      options: ['Stack', 'Queue', 'Array', 'Linked List'],
      correctIndex: 1,
      difficulty: 'easy',
      explanation: 'BFS uses a Queue because it processes nodes level by level in FIFO (First In First Out) order. When we visit a node, we add all its neighbors to the queue, ensuring we explore all nodes at the current level before moving to the next level.',
    },
    {
      question: 'BFS traverses a graph in which order?',
      options: ['Depth-first', 'Level-by-level', 'Random', 'Reverse'],
      correctIndex: 1,
      difficulty: 'easy',
      explanation: 'BFS traverses level-by-level, visiting all nodes at distance k before visiting nodes at distance k+1 from the starting node. This makes it perfect for finding shortest paths in unweighted graphs.',
    },
    {
      question: 'What is the time complexity of BFS for a graph with V vertices and E edges?',
      options: ['O(V)', 'O(E)', 'O(V + E)', 'O(V * E)'],
      correctIndex: 2,
      difficulty: 'medium',
      explanation: 'BFS visits every vertex once O(V) and explores every edge once O(E), giving us O(V + E) total time complexity. We need to process all vertices and check all their edges.',
    },
  ],
  dfs: [
    {
      question: 'Which data structure is used in DFS?',
      options: ['Queue', 'Stack', 'Heap', 'Hash Table'],
      correctIndex: 1,
      difficulty: 'easy',
      explanation: 'DFS uses a Stack (or recursion which implicitly uses the call stack) because it explores as deep as possible along each branch before backtracking. LIFO (Last In First Out) order ensures we go deep first.',
    },
    {
      question: 'DFS can be implemented using?',
      options: ['Only iteration', 'Only recursion', 'Both recursion and iteration', 'Neither'],
      correctIndex: 2,
      difficulty: 'easy',
      explanation: 'DFS can be implemented both recursively (using the call stack) and iteratively (using an explicit stack). Both approaches achieve the same depth-first exploration pattern.',
    },
    {
      question: 'What is the space complexity of recursive DFS?',
      options: ['O(1)', 'O(V)', 'O(E)', 'O(V + E)'],
      correctIndex: 1,
      difficulty: 'medium',
      explanation: 'Recursive DFS uses O(V) space for the call stack in the worst case (when the graph is a straight line). The maximum depth of recursion equals the number of vertices in the longest path.',
    },
  ],
  bst: [
    {
      question: 'In a BST, left child is always ___ than parent?',
      options: ['Greater', 'Smaller', 'Equal', 'Random'],
      correctIndex: 1,
      difficulty: 'easy',
      explanation: 'In a Binary Search Tree, the left child is always smaller than the parent node. This property allows efficient searching: if the target is smaller than current node, go left; if larger, go right.',
    },
    {
      question: 'What is the average time complexity of search in BST?',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
      correctIndex: 1,
      difficulty: 'easy',
      explanation: 'In a balanced BST, search takes O(log n) time because we eliminate half of the remaining nodes at each step by choosing left or right subtree. This is similar to binary search on a sorted array.',
    },
    {
      question: 'What is the worst case time complexity of search in BST?',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
      correctIndex: 2,
      difficulty: 'hard',
      explanation: 'In the worst case (when BST becomes a skewed tree like a linked list), search takes O(n) time because we might need to traverse all nodes. This happens when elements are inserted in sorted order without balancing.',
    },
  ],
  fund_queue: [
    {
      question: 'What does FIFO stand for in Queue?',
      options: ['First In First Out', 'First In Final Out', 'Final In First Out', 'Fast In Fast Out'],
      correctIndex: 0,
      difficulty: 'easy',
      explanation: 'FIFO means First In First Out - the first element added to the queue will be the first one to be removed. Think of it like a line at a store: the first person in line is served first.',
    },
    {
      question: 'Which operation adds an element to a queue?',
      options: ['Push', 'Enqueue', 'Insert', 'Add'],
      correctIndex: 1,
      difficulty: 'easy',
      explanation: 'Enqueue is the standard operation to add an element to the rear/back of a queue. The element joins at the end and waits its turn to be processed.',
    },
    {
      question: 'Which operation removes an element from a queue?',
      options: ['Pop', 'Dequeue', 'Remove', 'Delete'],
      correctIndex: 1,
      difficulty: 'easy',
      explanation: 'Dequeue is the operation that removes and returns the element from the front of the queue. This maintains the FIFO principle - first in, first out.',
    },
  ],
  fund_stack: [
    {
      question: 'What does LIFO stand for in Stack?',
      options: ['Last In First Out', 'Last In Final Out', 'Latest In First Out', 'Long In Fast Out'],
      correctIndex: 0,
      difficulty: 'easy',
      explanation: 'LIFO means Last In First Out - the last element added to the stack will be the first one to be removed. Think of a stack of plates: you can only take the top plate (the last one placed).',
    },
    {
      question: 'Which operation adds an element to a stack?',
      options: ['Enqueue', 'Push', 'Insert', 'Add'],
      correctIndex: 1,
      difficulty: 'easy',
      explanation: 'Push is the operation that adds an element to the top of the stack. The new element becomes the top and will be the first to be removed.',
    },
    {
      question: 'Which operation removes an element from a stack?',
      options: ['Dequeue', 'Pop', 'Remove', 'Delete'],
      correctIndex: 1,
      difficulty: 'easy',
      explanation: 'Pop removes and returns the top element from the stack. This maintains the LIFO principle - the most recently added element is removed first.',
    },
  ],
  fund_tree: [
    {
      question: 'What is the topmost node in a tree called?',
      options: ['Leaf', 'Root', 'Parent', 'Branch'],
      correctIndex: 1,
      difficulty: 'easy',
      explanation: 'The Root is the topmost node in a tree structure. It has no parent and serves as the starting point for all tree traversals. Every tree has exactly one root node.',
    },
    {
      question: 'What are nodes with no children called?',
      options: ['Root nodes', 'Parent nodes', 'Leaf nodes', 'Branch nodes'],
      correctIndex: 2,
      difficulty: 'easy',
      explanation: 'Leaf nodes (or terminal nodes) are nodes that have no children. They are at the bottom of the tree structure and represent endpoints in the hierarchy.',
    },
    {
      question: 'What is the relationship between a node and its direct descendants?',
      options: ['Sibling', 'Parent-Child', 'Ancestor-Descendant', 'Root-Leaf'],
      correctIndex: 1,
      difficulty: 'easy',
      explanation: 'Parent-Child is the relationship between a node and its direct descendants. The parent node points to its children, and each child has exactly one parent (except the root which has no parent).',
    },
  ],
}
