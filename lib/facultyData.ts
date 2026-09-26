// ─────────────────────────────────────────────────────────────
// lib/facultyData.ts
// AURA — Adaptive Unified Resource & Assessment
// Course-specific datasets & analytics engine
// ─────────────────────────────────────────────────────────────

export interface ConceptCompetency {
  id: string
  concept: string
  score: number // percentage
  status: 'proficient' | 'developing' | 'critical'
  isLowest?: boolean
  studentsNeedingHelp: number
  benchmark: number
}

export interface DistributionCategory {
  label: string
  percentage: number
  studentCount: number
  color: string
  description: string
}

export interface InterventionStep {
  stepNumber: number
  stageType: 'assessment' | 'intervention' | 'transition' | 'reassessment' | 'mastery'
  title: string
  detail: string
  score?: number
  badgeText?: string
  gain?: string
}

export interface StudentJourneyProfile {
  studentId: string
  studentLabel: string
  concept: string
  initialScore: number
  finalScore: number
  totalImprovement: number // percentage points
  interventionsCount: number
  status: 'Competency Achieved' | 'In Progress' | 'Escalated'
  timeline: InterventionStep[]
}

export interface InterventionEffectivenessItem {
  id: string
  name: string
  improvementPP: number // percentage points
  category: 'Passive' | 'Self-Paced' | 'AI Guided' | 'Experiential' | 'Active Coding' | 'Synthesized'
  sampleSize: number
}

export interface ActionableInsight {
  id: string
  type: 'gap' | 'attention' | 'effective' | 'followup'
  icon?: string
  severity: 'high' | 'medium' | 'positive' | 'warning'
  title: string
  finding: string
  recommendation: string
}

export interface FacultyDashboardData {
  institution: string
  facultyName: string
  facultyRole: string
  courseName: string
  courseCode: string
  term: string
  lastUpdated: string
  totalStudents: number
  averageCompetency: number
  competencyBenchmark: number
  concepts: ConceptCompetency[]
  distribution: DistributionCategory[]
  studentJourneys: Record<string, StudentJourneyProfile>
  effectiveness: InterventionEffectivenessItem[]
  insights: ActionableInsight[]
}

// ─────────────────────────────────────────────────────────────
// 1. DATA STRUCTURES (CS204)
// ─────────────────────────────────────────────────────────────

const dataStructuresData: FacultyDashboardData = {
  institution: 'Department of Computer Science & Engineering',
  facultyName: 'Dr. Mahalakshmi',
  facultyRole: 'Associate Professor & Course Coordinator',
  courseName: 'Data Structures',
  courseCode: 'CS204',
  term: 'Fall 2026',
  lastUpdated: 'Today, 10:42 AM',
  totalStudents: 120,
  averageCompetency: 74,
  competencyBenchmark: 70,

  concepts: [
    {
      id: 'arrays',
      concept: 'Arrays',
      score: 88,
      status: 'proficient',
      studentsNeedingHelp: 14,
      benchmark: 70,
    },
    {
      id: 'linked_lists',
      concept: 'Linked Lists',
      score: 76,
      status: 'proficient',
      studentsNeedingHelp: 29,
      benchmark: 70,
    },
    {
      id: 'stacks_queues',
      concept: 'Stacks & Queues',
      score: 81,
      status: 'proficient',
      studentsNeedingHelp: 23,
      benchmark: 70,
    },
    {
      id: 'recursion',
      concept: 'Recursion',
      score: 48,
      status: 'critical',
      isLowest: true,
      studentsNeedingHelp: 62,
      benchmark: 70,
    },
    {
      id: 'trees',
      concept: 'Trees',
      score: 69,
      status: 'developing',
      studentsNeedingHelp: 37,
      benchmark: 70,
    },
    {
      id: 'graphs',
      concept: 'Graphs',
      score: 62,
      status: 'developing',
      studentsNeedingHelp: 46,
      benchmark: 70,
    },
  ],

  distribution: [
    {
      label: 'Mastered',
      percentage: 62,
      studentCount: 74,
      color: '#10B981', // Emerald
      description: 'Scores ≥ 75% across core outcomes',
    },
    {
      label: 'Developing',
      percentage: 23,
      studentCount: 28,
      color: '#F59E0B', // Amber
      description: 'Scores between 60% and 74%',
    },
    {
      label: 'Needs Intervention',
      percentage: 15,
      studentCount: 18,
      color: '#EF4444', // Crimson / Rose
      description: 'Scores < 60% with critical diagnostic flags',
    },
  ],

  studentJourneys: {
    'Student 024': {
      studentId: 'STU-024',
      studentLabel: 'Student 024',
      concept: 'Recursion',
      initialScore: 42,
      finalScore: 86,
      totalImprovement: 44,
      interventionsCount: 2,
      status: 'Competency Achieved',
      timeline: [
        {
          stepNumber: 1,
          stageType: 'assessment',
          title: 'Initial Assessment',
          detail: 'Baseline diagnostic quiz on call stack unrolling & base cases',
          score: 42,
          badgeText: 'Competency Gap Identified',
        },
        {
          stepNumber: 2,
          stageType: 'intervention',
          title: 'AITE Intervention',
          detail: 'Interactive Simulation (Recursion Call Stack Visualizer)',
          badgeText: 'Prescribed Pedagogic Intervention',
        },
        {
          stepNumber: 3,
          stageType: 'reassessment',
          title: 'Reassessment',
          detail: 'Formative check on recursive state persistence',
          score: 63,
          gain: '+21 pp',
          badgeText: 'Developing Proficiency',
        },
        {
          stepNumber: 4,
          stageType: 'transition',
          title: 'AITE Transition',
          detail: 'Compiler Playground (Live execution with test cases)',
          badgeText: 'Application Scaffold',
        },
        {
          stepNumber: 5,
          stageType: 'reassessment',
          title: 'Reassessment',
          detail: 'Summative code verification & algorithmic complexity',
          score: 86,
          gain: '+23 pp',
          badgeText: 'Target Mastery Met',
        },
        {
          stepNumber: 6,
          stageType: 'mastery',
          title: 'Competency Achieved',
          detail: 'Outcome validated across procedural and application criteria',
          badgeText: 'Outcome Cleared',
        },
      ],
    },
    'Student 058': {
      studentId: 'STU-058',
      studentLabel: 'Student 058',
      concept: 'Graphs',
      initialScore: 38,
      finalScore: 78,
      totalImprovement: 40,
      interventionsCount: 2,
      status: 'Competency Achieved',
      timeline: [
        {
          stepNumber: 1,
          stageType: 'assessment',
          title: 'Initial Assessment',
          detail: 'Diagnostic quiz on adjacency matrices & BFS queue mechanics',
          score: 38,
          badgeText: 'Deficit Detected',
        },
        {
          stepNumber: 2,
          stageType: 'intervention',
          title: 'AITE Intervention',
          detail: 'Interactive Simulation (Breadth-First Search Graph Traversal)',
          badgeText: 'Visual Remediation',
        },
        {
          stepNumber: 3,
          stageType: 'reassessment',
          title: 'Reassessment',
          detail: 'Trace comprehension evaluation',
          score: 59,
          gain: '+21 pp',
          badgeText: 'Progress Recorded',
        },
        {
          stepNumber: 4,
          stageType: 'transition',
          title: 'AITE Transition',
          detail: 'Compiler Playground (Cycle detection implementation)',
          badgeText: 'Coding Synthesis',
        },
        {
          stepNumber: 5,
          stageType: 'reassessment',
          title: 'Reassessment',
          detail: 'Graph traversal implementation test',
          score: 78,
          gain: '+19 pp',
          badgeText: 'Target Achieved',
        },
        {
          stepNumber: 6,
          stageType: 'mastery',
          title: 'Competency Achieved',
          detail: 'Graph traversal concepts verified',
          badgeText: 'Proficiency Confirmed',
        },
      ],
    },
  },

  effectiveness: [
    {
      id: 'video_notes',
      name: 'Video + Notes',
      improvementPP: 7,
      category: 'Passive',
      sampleSize: 42,
    },
    {
      id: 'flashcards',
      name: 'Flashcards',
      improvementPP: 10,
      category: 'Self-Paced',
      sampleSize: 38,
    },
    {
      id: 'ai_tutor',
      name: 'AI Tutor',
      improvementPP: 14,
      category: 'AI Guided',
      sampleSize: 55,
    },
    {
      id: 'interactive_sim',
      name: 'Interactive Simulation',
      improvementPP: 18,
      category: 'Experiential',
      sampleSize: 64,
    },
    {
      id: 'compiler_playground',
      name: 'Compiler Playground',
      improvementPP: 23,
      category: 'Active Coding',
      sampleSize: 71,
    },
    {
      id: 'mini_app',
      name: 'Mini-Application',
      improvementPP: 27,
      category: 'Synthesized',
      sampleSize: 34,
    },
  ],

  insights: [
    {
      id: 'insight-1',
      type: 'gap',
      severity: 'high',
      title: 'Concept Gap',
      finding: 'Recursion has the lowest competency across the class (48%).',
      recommendation:
        'Provide additional application-based practice and reinforce call stack visualization before moving to recursive tree traversals.',
    },
    {
      id: 'insight-2',
      type: 'attention',
      severity: 'warning',
      title: 'Students Needing Attention',
      finding: '18 students (15%) are currently below the competency threshold (<60%).',
      recommendation:
        'Review their intervention history in the roster view and trigger targeted interactive simulations where required.',
    },
    {
      id: 'insight-3',
      type: 'effective',
      severity: 'positive',
      title: 'Intervention Insight',
      finding:
        'Compiler Playground produced strong competency improvement (+23 pp) across the cohort.',
      recommendation:
        'Consider increasing practical coding lab activities for upcoming linear data structure milestones.',
    },
    {
      id: 'insight-4',
      type: 'followup',
      severity: 'medium',
      title: 'Follow-up Required',
      finding:
        '5 students underwent multiple interventions but have not yet reached the 70% competency threshold.',
      recommendation:
        'Schedule brief 1-on-1 pedagogical review sessions or assign individualized foundational prerequisites.',
    },
  ],
}

// ─────────────────────────────────────────────────────────────
// 2. ALGORITHMS ANALYSIS (CS301)
// ─────────────────────────────────────────────────────────────

const algorithmsData: FacultyDashboardData = {
  institution: 'Department of Computer Science & Engineering',
  facultyName: 'Dr. Mahalakshmi',
  facultyRole: 'Associate Professor & Course Coordinator',
  courseName: 'Algorithms Analysis',
  courseCode: 'CS301',
  term: 'Fall 2026',
  lastUpdated: 'Today, 10:42 AM',
  totalStudents: 95,
  averageCompetency: 68,
  competencyBenchmark: 70,

  concepts: [
    {
      id: 'asymptotic_analysis',
      concept: 'Asymptotic Notation (Big-O)',
      score: 84,
      status: 'proficient',
      studentsNeedingHelp: 15,
      benchmark: 70,
    },
    {
      id: 'divide_and_conquer',
      concept: 'Divide & Conquer',
      score: 78,
      status: 'proficient',
      studentsNeedingHelp: 21,
      benchmark: 70,
    },
    {
      id: 'greedy_algorithms',
      concept: 'Greedy Algorithms',
      score: 72,
      status: 'proficient',
      studentsNeedingHelp: 27,
      benchmark: 70,
    },
    {
      id: 'dynamic_programming',
      concept: 'Dynamic Programming',
      score: 42,
      status: 'critical',
      isLowest: true,
      studentsNeedingHelp: 55,
      benchmark: 70,
    },
    {
      id: 'shortest_paths',
      concept: 'Dijkstra & Shortest Paths',
      score: 65,
      status: 'developing',
      studentsNeedingHelp: 33,
      benchmark: 70,
    },
    {
      id: 'np_completeness',
      concept: 'NP-Completeness & Reductions',
      score: 59,
      status: 'developing',
      studentsNeedingHelp: 39,
      benchmark: 70,
    },
  ],

  distribution: [
    {
      label: 'Mastered',
      percentage: 48,
      studentCount: 46,
      color: '#10B981',
      description: 'Scores ≥ 75% on algorithmic derivation',
    },
    {
      label: 'Developing',
      percentage: 34,
      studentCount: 32,
      color: '#F59E0B',
      description: 'Scores between 60% and 74%',
    },
    {
      label: 'Needs Intervention',
      percentage: 18,
      studentCount: 17,
      color: '#EF4444',
      description: 'Scores < 60% with recurrence gaps',
    },
  ],

  studentJourneys: {
    'Student 019': {
      studentId: 'STU-019',
      studentLabel: 'Student 019',
      concept: 'Dynamic Programming',
      initialScore: 34,
      finalScore: 81,
      totalImprovement: 47,
      interventionsCount: 2,
      status: 'Competency Achieved',
      timeline: [
        {
          stepNumber: 1,
          stageType: 'assessment',
          title: 'Initial Assessment',
          detail: 'Diagnostic test on overlapping subproblems & optimal substructure',
          score: 34,
          badgeText: 'DP Subproblem Gap Flagged',
        },
        {
          stepNumber: 2,
          stageType: 'intervention',
          title: 'AITE Intervention',
          detail: 'State-Transition Visualizer (Grid & Knapsack Table Unrolling)',
          badgeText: 'Visual Table Scaffold',
        },
        {
          stepNumber: 3,
          stageType: 'reassessment',
          title: 'Reassessment',
          detail: 'Formative test on 1D/2D memoization table initialization',
          score: 60,
          gain: '+26 pp',
          badgeText: 'Developing Conceptual Model',
        },
        {
          stepNumber: 4,
          stageType: 'transition',
          title: 'AITE Transition',
          detail: 'Recurrence Solver Sandbox (Live bottom-up tabulation coding)',
          badgeText: 'Tabulation Synthesis',
        },
        {
          stepNumber: 5,
          stageType: 'reassessment',
          title: 'Reassessment',
          detail: 'Summative code test on Longest Common Subsequence',
          score: 81,
          gain: '+21 pp',
          badgeText: 'Outcome Cleared',
        },
        {
          stepNumber: 6,
          stageType: 'mastery',
          title: 'Competency Achieved',
          detail: 'DP formulation and asymptotic bounds validated',
          badgeText: 'Mastery Validated',
        },
      ],
    },
    'Student 074': {
      studentId: 'STU-074',
      studentLabel: 'Student 074',
      concept: 'Greedy vs DP Choice',
      initialScore: 45,
      finalScore: 79,
      totalImprovement: 34,
      interventionsCount: 2,
      status: 'Competency Achieved',
      timeline: [
        {
          stepNumber: 1,
          stageType: 'assessment',
          title: 'Initial Assessment',
          detail: 'Fractional vs 0/1 Knapsack choice diagnostic test',
          score: 45,
          badgeText: 'Greedy Heuristic Confusion',
        },
        {
          stepNumber: 2,
          stageType: 'intervention',
          title: 'AITE Intervention',
          detail: 'Counterexample Interactive Visualizer (Interval Scheduling vs DP)',
          badgeText: 'Heuristic Disproof',
        },
        {
          stepNumber: 3,
          stageType: 'reassessment',
          title: 'Reassessment',
          detail: 'Greedy choice property check',
          score: 64,
          gain: '+19 pp',
          badgeText: 'Heuristic Principle Clear',
        },
        {
          stepNumber: 4,
          stageType: 'transition',
          title: 'AITE Transition',
          detail: 'Competitive Problem Synthesis (Coin change greedy failure trace)',
          badgeText: 'Edge Case Testing',
        },
        {
          stepNumber: 5,
          stageType: 'reassessment',
          title: 'Reassessment',
          detail: 'Greedy proof of correctness evaluation',
          score: 79,
          gain: '+15 pp',
          badgeText: 'Formal Reasoning Met',
        },
        {
          stepNumber: 6,
          stageType: 'mastery',
          title: 'Competency Achieved',
          detail: 'Greedy vs DP distinction verified',
          badgeText: 'Outcome Cleared',
        },
      ],
    },
  },

  effectiveness: [
    {
      id: 'theoretical_proofs',
      name: 'Theoretical Proofs',
      improvementPP: 5,
      category: 'Passive',
      sampleSize: 31,
    },
    {
      id: 'pseudocode_walkthrough',
      name: 'Pseudocode Walkthrough',
      improvementPP: 9,
      category: 'Self-Paced',
      sampleSize: 39,
    },
    {
      id: 'socratic_ai',
      name: 'Socratic AI Tutor',
      improvementPP: 16,
      category: 'AI Guided',
      sampleSize: 52,
    },
    {
      id: 'state_visualizer',
      name: 'State-Transition Visualizer',
      improvementPP: 22,
      category: 'Experiential',
      sampleSize: 48,
    },
    {
      id: 'recurrence_sandbox',
      name: 'Recurrence Solver Sandbox',
      improvementPP: 26,
      category: 'Active Coding',
      sampleSize: 62,
    },
    {
      id: 'problem_synthesis',
      name: 'Competitive Problem Synthesis',
      improvementPP: 31,
      category: 'Synthesized',
      sampleSize: 28,
    },
  ],

  insights: [
    {
      id: 'algo-1',
      type: 'gap',
      severity: 'high',
      title: 'Concept Gap',
      finding: 'Dynamic Programming has the lowest competency across the class (42%).',
      recommendation:
        'Reinforce subproblem dependency DAGs and memoization tables before introducing multi-dimensional DP equations.',
    },
    {
      id: 'algo-2',
      type: 'attention',
      severity: 'warning',
      title: 'Students Needing Attention',
      finding: '17 students (18%) are below benchmark in overlapping subproblem formulations.',
      recommendation:
        'Schedule targeted interactive table-filling sessions using the State-Transition visualizer.',
    },
    {
      id: 'algo-3',
      type: 'effective',
      severity: 'positive',
      title: 'Intervention Insight',
      finding:
        'Recurrence Solver Sandbox generated high gains (+26 pp) when students write explicit base cases.',
      recommendation:
        'Introduce mandatory live coding exercises for Bellman-Ford and Floyd-Warshall DP algorithms.',
    },
    {
      id: 'algo-4',
      type: 'followup',
      severity: 'medium',
      title: 'Follow-up Required',
      finding:
        '4 students struggled with reduction proofs between Vertex Cover and Independent Set.',
      recommendation:
        'Provide diagrammatic reduction step scaffolding during tutorial hours.',
    },
  ],
}

// ─────────────────────────────────────────────────────────────
// 3. OBJECT-ORIENTED PROGRAMMING (CS202)
// ─────────────────────────────────────────────────────────────

const oopData: FacultyDashboardData = {
  institution: 'Department of Computer Science & Engineering',
  facultyName: 'Dr. Mahalakshmi',
  facultyRole: 'Associate Professor & Course Coordinator',
  courseName: 'Object-Oriented Programming',
  courseCode: 'CS202',
  term: 'Fall 2026',
  lastUpdated: 'Today, 10:42 AM',
  totalStudents: 140,
  averageCompetency: 79,
  competencyBenchmark: 70,

  concepts: [
    {
      id: 'classes_objects',
      concept: 'Classes & Objects',
      score: 92,
      status: 'proficient',
      studentsNeedingHelp: 11,
      benchmark: 70,
    },
    {
      id: 'encapsulation',
      concept: 'Encapsulation & Access',
      score: 86,
      status: 'proficient',
      studentsNeedingHelp: 19,
      benchmark: 70,
    },
    {
      id: 'inheritance',
      concept: 'Inheritance & Super',
      score: 80,
      status: 'proficient',
      studentsNeedingHelp: 28,
      benchmark: 70,
    },
    {
      id: 'polymorphism',
      concept: 'Polymorphism & Dispatch',
      score: 54,
      status: 'critical',
      isLowest: true,
      studentsNeedingHelp: 64,
      benchmark: 70,
    },
    {
      id: 'interfaces',
      concept: 'Interfaces & Abstract Classes',
      score: 71,
      status: 'developing',
      studentsNeedingHelp: 41,
      benchmark: 70,
    },
    {
      id: 'exception_handling',
      concept: 'Exceptions & File Streams',
      score: 77,
      status: 'proficient',
      studentsNeedingHelp: 32,
      benchmark: 70,
    },
  ],

  distribution: [
    {
      label: 'Mastered',
      percentage: 71,
      studentCount: 99,
      color: '#10B981',
      description: 'Scores ≥ 75% on OO system design',
    },
    {
      label: 'Developing',
      percentage: 19,
      studentCount: 27,
      color: '#F59E0B',
      description: 'Scores between 60% and 74%',
    },
    {
      label: 'Needs Intervention',
      percentage: 10,
      studentCount: 14,
      color: '#EF4444',
      description: 'Scores < 60% in virtual method binding',
    },
  ],

  studentJourneys: {
    'Student 033': {
      studentId: 'STU-033',
      studentLabel: 'Student 033',
      concept: 'Polymorphism',
      initialScore: 40,
      finalScore: 88,
      totalImprovement: 48,
      interventionsCount: 2,
      status: 'Competency Achieved',
      timeline: [
        {
          stepNumber: 1,
          stageType: 'assessment',
          title: 'Initial Assessment',
          detail: 'Diagnostic test on method overriding, overloading & vtable lookups',
          score: 40,
          badgeText: 'Dynamic Binding Deficit',
        },
        {
          stepNumber: 2,
          stageType: 'intervention',
          title: 'AITE Intervention',
          detail: 'Memory Object Layout Simulator (Virtual Method Table dispatching)',
          badgeText: 'Heap & VTable Visualizer',
        },
        {
          stepNumber: 3,
          stageType: 'reassessment',
          title: 'Reassessment',
          detail: 'Polymorphic reference casting check',
          score: 66,
          gain: '+26 pp',
          badgeText: 'Upcasting Cleared',
        },
        {
          stepNumber: 4,
          stageType: 'transition',
          title: 'AITE Transition',
          detail: 'Refactoring Code Lab (Refactoring switch statements into polymorphic hierarchies)',
          badgeText: 'Design Pattern Scaffold',
        },
        {
          stepNumber: 5,
          stageType: 'reassessment',
          title: 'Reassessment',
          detail: 'Runtime dispatch execution test with interface abstractions',
          score: 88,
          gain: '+22 pp',
          badgeText: 'Outcome Met',
        },
        {
          stepNumber: 6,
          stageType: 'mastery',
          title: 'Competency Achieved',
          detail: 'Polymorphic design principle validated',
          badgeText: 'Full Proficiency',
        },
      ],
    },
    'Student 082': {
      studentId: 'STU-082',
      studentLabel: 'Student 082',
      concept: 'Interfaces vs Abstract',
      initialScore: 48,
      finalScore: 82,
      totalImprovement: 34,
      interventionsCount: 2,
      status: 'Competency Achieved',
      timeline: [
        {
          stepNumber: 1,
          stageType: 'assessment',
          title: 'Initial Assessment',
          detail: 'Diagnostic on default interface methods vs abstract state variables',
          score: 48,
          badgeText: 'Contract Ambiguity',
        },
        {
          stepNumber: 2,
          stageType: 'intervention',
          title: 'AITE Intervention',
          detail: 'UML Hierarchy Interactive Simulator (Inheritance vs Composition)',
          badgeText: 'Contract Visualization',
        },
        {
          stepNumber: 3,
          stageType: 'reassessment',
          title: 'Reassessment',
          detail: 'Multiple interface implementation check',
          score: 65,
          gain: '+17 pp',
          badgeText: 'Decoupling Mastered',
        },
        {
          stepNumber: 4,
          stageType: 'transition',
          title: 'AITE Transition',
          detail: 'Design Pattern Mini-Project (Strategy & Factory pattern scaffolding)',
          badgeText: 'Architectural Implementation',
        },
        {
          stepNumber: 5,
          stageType: 'reassessment',
          title: 'Reassessment',
          detail: 'Loosely coupled system implementation evaluation',
          score: 82,
          gain: '+17 pp',
          badgeText: 'Target Cleared',
        },
        {
          stepNumber: 6,
          stageType: 'mastery',
          title: 'Competency Achieved',
          detail: 'Interface-based decoupled architecture verified',
          badgeText: 'Proficiency Confirmed',
        },
      ],
    },
  },

  effectiveness: [
    {
      id: 'uml_diagrams',
      name: 'UML Class Diagrams',
      improvementPP: 8,
      category: 'Passive',
      sampleSize: 45,
    },
    {
      id: 'code_walkthrough',
      name: 'Code Walkthrough',
      improvementPP: 11,
      category: 'Self-Paced',
      sampleSize: 50,
    },
    {
      id: 'ai_explainer',
      name: 'AI Code Explainer',
      improvementPP: 15,
      category: 'AI Guided',
      sampleSize: 68,
    },
    {
      id: 'memory_sim',
      name: 'Memory Object Layout Sim',
      improvementPP: 20,
      category: 'Experiential',
      sampleSize: 72,
    },
    {
      id: 'refactor_lab',
      name: 'Refactoring Code Lab',
      improvementPP: 25,
      category: 'Active Coding',
      sampleSize: 84,
    },
    {
      id: 'design_pattern_proj',
      name: 'Design Pattern Project',
      improvementPP: 29,
      category: 'Synthesized',
      sampleSize: 41,
    },
  ],

  insights: [
    {
      id: 'oop-1',
      type: 'gap',
      severity: 'high',
      title: 'Concept Gap',
      finding: 'Polymorphism & Dynamic Dispatch has the lowest competency across the class (54%).',
      recommendation:
        'Reinforce late binding and memory vtable models using the Memory Object Layout simulator before starting design pattern labs.',
    },
    {
      id: 'oop-2',
      type: 'attention',
      severity: 'warning',
      title: 'Students Needing Attention',
      finding: '14 students (10%) require targeted polymorphic refactoring exercises.',
      recommendation:
        'Assign the interactive dynamic dispatch simulation to the flagged cohort.',
    },
    {
      id: 'oop-3',
      type: 'effective',
      severity: 'positive',
      title: 'Intervention Insight',
      finding:
        'Refactoring Code Lab produced +25 pp improvement in interface contract implementation.',
      recommendation:
        'Integrate Refactoring Lab as a mandatory check for the upcoming Strategy Pattern assignment.',
    },
    {
      id: 'oop-4',
      type: 'followup',
      severity: 'medium',
      title: 'Follow-up Required',
      finding:
        '3 students have unsubmitted reassessments for multiple interface inheritance scenarios.',
      recommendation:
        'Send an automated follow-up reminder and unlock the diagnostic test.',
    },
  ],
}

// ─────────────────────────────────────────────────────────────
// REGISTRY & LOOKUP
// ─────────────────────────────────────────────────────────────

export const coursesFacultyData: Record<string, FacultyDashboardData> = {
  'Data Structures': dataStructuresData,
  'Algorithms Analysis': algorithmsData,
  'Object-Oriented Programming': oopData,
}

// Helper: retrieve faculty dataset by course name or fallback to Data Structures
export function getFacultyCourseData(courseName: string): FacultyDashboardData {
  return coursesFacultyData[courseName] || dataStructuresData
}

export const facultyDemoData = dataStructuresData
