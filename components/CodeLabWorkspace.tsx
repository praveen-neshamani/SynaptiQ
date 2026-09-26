'use client'

import { useState, useRef, useEffect } from 'react'

export interface CodeLabChallenge {
  id: string
  title: string
  track: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  timeEstimate: string
  complexityGoal: string
  description: string
  instructions: string[]
  initialCode: string
  testCases: Array<{
    name: string
    description: string
    fnCall: string
    expected: string
  }>
}

export const LAB_CHALLENGES: CodeLabChallenge[] = [
  {
    id: 'avl-rotation',
    title: 'AVL Tree Double Rotation & Balancing',
    track: 'CS-304 • Unit 4 Core Milestone',
    difficulty: 'Intermediate',
    timeEstimate: '15 mins',
    complexityGoal: 'O(1) Time • O(1) Space',
    description: 'Implement Left-Right (LR) Double Rotation on an unbalanced AVL binary search tree to restore logarithmic height invariants.',
    instructions: [
      'An LR imbalance occurs when a node has a balance factor > 1 and its left child has a balance factor < 0.',
      'Perform a single Left Rotation on the left child (node.left).',
      'Perform a single Right Rotation on the parent node.',
      'Verify that the resulting subtree maintains balance factors strictly within [-1, 1].'
    ],
    initialCode: `// SynaptiQ CS-304: Unit 4 Core Milestone
// AVL Tree Left-Right (LR) Double Rotation

class AVLNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}

function getHeight(node) {
  return node ? node.height : 0;
}

function getBalanceFactor(node) {
  return node ? getHeight(node.left) - getHeight(node.right) : 0;
}

function updateHeight(node) {
  if (!node) return;
  node.height = 1 + Math.max(getHeight(node.left), getHeight(node.right));
}

// Single Right Rotation
function rotateRight(y) {
  const x = y.left;
  const T2 = x.right;
  x.right = y;
  y.left = T2;
  updateHeight(y);
  updateHeight(x);
  return x;
}

// Single Left Rotation
function rotateLeft(x) {
  const y = x.right;
  const T2 = y.left;
  y.left = x;
  x.right = T2;
  updateHeight(x);
  updateHeight(y);
  return y;
}

// Left-Right (LR) Double Rotation
function rotateLeftRight(node) {
  console.log("Executing Left-Right rotation on pivot:", node.val);
  node.left = rotateLeft(node.left);
  return rotateRight(node);
}

// Test AVL Tree Setup: [30 -> left: 10 -> right: 20]
let root = new AVLNode(30);
root.left = new AVLNode(10);
root.left.right = new AVLNode(20);
updateHeight(root.left);
updateHeight(root);

console.log("Initial Root Val:", root.val);
console.log("Pre-Rotation Balance Factor:", getBalanceFactor(root));

// Perform Balancing
root = rotateLeftRight(root);

console.log("Post-Rotation Root Val:", root.val);
console.log("Left Child:", root.left ? root.left.val : null);
console.log("Right Child:", root.right ? root.right.val : null);
console.log("Post-Rotation Balance Factor:", getBalanceFactor(root));

return {
  status: "Balanced",
  rootVal: root.val,
  balanceFactor: getBalanceFactor(root),
  isInvariantSatisfied: Math.abs(getBalanceFactor(root)) <= 1
};`,
    testCases: [
      {
        name: 'Pivot Promotion',
        description: 'Verifies that inner child (20) is promoted to the new subtree root',
        fnCall: 'root.val === 20',
        expected: 'true'
      },
      {
        name: 'Balance Factor Invariant',
        description: 'Verifies post-rotation balance factor is within [-1, 1]',
        fnCall: 'Math.abs(getBalanceFactor(root)) <= 1',
        expected: 'true'
      },
      {
        name: 'BST Order Preservation',
        description: 'Verifies left child (10) < root (20) < right child (30)',
        fnCall: 'root.left.val === 10 && root.right.val === 30',
        expected: 'true'
      }
    ]
  },
  {
    id: 'dijkstra-shortest-path',
    title: 'Dijkstra Shortest Path & Priority Queue',
    track: 'CS-301 • Module 87 Graph Theory',
    difficulty: 'Advanced',
    timeEstimate: '20 mins',
    complexityGoal: 'O((V + E) log V) Time • O(V) Space',
    description: 'Calculate single-source shortest path distances from source node 0 across a weighted directed graph using relaxation.',
    instructions: [
      'Initialize all distances to Infinity, except distance[source] = 0.',
      'Greedily extract the unvisited node with minimal current tentative distance.',
      'Relax outgoing edges: if dist[u] + weight(u, v) < dist[v], update dist[v].',
      'Return the final shortest distance vector to all graph vertices.'
    ],
    initialCode: `// SynaptiQ CS-301: Graph Theory & Shortest Paths
// Dijkstra's Shortest Path Algorithm

function dijkstra(numNodes, edges, startNode) {
  // Construct adjacency list
  const adj = Array.from({ length: numNodes }, () => []);
  for (const [u, v, weight] of edges) {
    adj[u].push({ node: v, weight });
  }

  const distances = new Array(numNodes).fill(Infinity);
  const visited = new Array(numNodes).fill(false);
  distances[startNode] = 0;

  console.log("Starting Dijkstra from source node:", startNode);

  for (let i = 0; i < numNodes; i++) {
    // Find unvisited node with minimal tentative distance
    let u = -1;
    for (let j = 0; j < numNodes; j++) {
      if (!visited[j] && (u === -1 || distances[j] < distances[u])) {
        u = j;
      }
    }

    if (distances[u] === Infinity) break;
    visited[u] = true;
    console.log(\`Visiting Node \${u} (Current Distance: \${distances[u]})\`);

    // Relax neighbors
    for (const edge of adj[u]) {
      const v = edge.node;
      const alt = distances[u] + edge.weight;
      if (alt < distances[v]) {
        console.log(\`  Relaxing edge (\${u} -> \${v}): \${distances[v]} updated to \${alt}\`);
        distances[v] = alt;
      }
    }
  }

  return distances;
}

// Graph Definition: (u, v, weight)
const edges = [
  [0, 1, 4],
  [0, 2, 2],
  [2, 1, 1],
  [1, 3, 5],
  [2, 3, 8],
  [3, 4, 3]
];

const shortestDistances = dijkstra(5, edges, 0);
console.log("Computed Shortest Distances:", shortestDistances);

return {
  source: 0,
  distances: shortestDistances,
  targetReachable: shortestDistances[4] < Infinity
};`,
    testCases: [
      {
        name: 'Intermediate Relaxation Check',
        description: 'Verifies distance to node 1 via node 2 is 3 (not direct 4)',
        fnCall: 'shortestDistances[1] === 3',
        expected: 'true'
      },
      {
        name: 'Target Vertex Distance',
        description: 'Verifies minimal distance to terminal node 4 is 11',
        fnCall: 'shortestDistances[4] === 11',
        expected: 'true'
      },
      {
        name: 'Source Self-Distance',
        description: 'Verifies source node 0 distance remains 0',
        fnCall: 'shortestDistances[0] === 0',
        expected: 'true'
      }
    ]
  },
  {
    id: 'bst-validation',
    title: 'Binary Search Tree Invariant Validation',
    track: 'CS-304 • Trees & Invariants',
    difficulty: 'Intermediate',
    timeEstimate: '10 mins',
    complexityGoal: 'O(N) Time • O(H) Space',
    description: 'Verify whether a given binary tree satisfies the strict Binary Search Tree ordering invariant: every left descendant < node < every right descendant.',
    instructions: [
      'Maintain valid lower and upper value bounds (-Infinity to +Infinity) during traversal.',
      'Check if current node value strictly satisfies minBound < val < maxBound.',
      'Recursively validate left child with updated upper bound (node.val).',
      'Recursively validate right child with updated lower bound (node.val).'
    ],
    initialCode: `// SynaptiQ CS-304: BST Invariant Validation
// Strict range boundary checking

class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function isValidBST(root, minBound = -Infinity, maxBound = Infinity) {
  if (!root) return true;

  console.log(\`Evaluating Node: \${root.val} (Valid Range: (\${minBound}, \${maxBound}))\`);

  if (root.val <= minBound || root.val >= maxBound) {
    console.error(\`Invariant Violation at node \${root.val}! Must be within (\${minBound}, \${maxBound})\`);
    return false;
  }

  return (
    isValidBST(root.left, minBound, root.val) &&
    isValidBST(root.right, root.val, maxBound)
  );
}

// Tree 1 (Valid BST):
//      20
//     /  \\
//    10   30
const validTree = new TreeNode(20, new TreeNode(10), new TreeNode(30));
console.log("Checking Valid Tree 1:");
const res1 = isValidBST(validTree);
console.log("Result Tree 1:", res1);

// Tree 2 (Invalid BST):
//      20
//     /  \\
//    10   30
//        /
//       15  <- Violates root (15 is in right subtree of 20)
const invalidTree = new TreeNode(20, new TreeNode(10), new TreeNode(30, new TreeNode(15), null));
console.log("\\nChecking Invalid Tree 2:");
const res2 = isValidBST(invalidTree);
console.log("Result Tree 2:", res2);

return {
  validTreeResult: res1,
  invalidTreeResult: res2,
  allPassed: res1 === true && res2 === false
};`,
    testCases: [
      {
        name: 'Valid BST Detection',
        description: 'Correctly identifies valid binary search tree',
        fnCall: 'res1 === true',
        expected: 'true'
      },
      {
        name: 'Subtree Bound Violation',
        description: 'Correctly flags nested right-left child invariant breach',
        fnCall: 'res2 === false',
        expected: 'true'
      }
    ]
  },
  {
    id: 'scratchpad',
    title: 'Universal Algorithmic Scratchpad',
    track: 'Open Laboratory Sandbox',
    difficulty: 'Beginner',
    timeEstimate: 'Unlimited',
    complexityGoal: 'Custom Exploration',
    description: 'Freeform sandbox environment for rapid prototyping, data structure benchmarking, and experimental algorithm verification.',
    instructions: [
      'Write any valid JavaScript or TypeScript algorithms directly.',
      'Use console.log() to inspect variables, matrices, and state transitions.',
      'Return expressions or objects to view formatted telemetry in the inspector.',
      'Press "Run Code" or use Ctrl + Enter to execute instantly.'
    ],
    initialCode: `// SynaptiQ Universal Algorithmic Scratchpad
// Write custom algorithms and benchmark execution

function benchmarkSort(size = 1000) {
  console.log(\`Generating random array of \${size} integers...\`);
  const arr = Array.from({ length: size }, () => Math.floor(Math.random() * 10000));
  
  console.log("Sample head:", arr.slice(0, 5));
  
  const t0 = performance.now();
  arr.sort((a, b) => a - b);
  const t1 = performance.now();
  
  console.log("Sorted sample:", arr.slice(0, 5));
  console.log(\`Execution time: \${(t1 - t0).toFixed(3)} ms\`);
  
  return {
    elementsProcessed: size,
    min: arr[0],
    max: arr[arr.length - 1],
    sortedDurationMs: (t1 - t0).toFixed(3)
  };
}

return benchmarkSort(2500);`,
    testCases: [
      {
        name: 'Array Processing',
        description: 'Verifies scratchpad returns valid benchmark metadata',
        fnCall: 'typeof benchmarkSort === "function"',
        expected: 'true'
      }
    ]
  }
]

interface LogItem {
  type: 'log' | 'info' | 'warn' | 'error'
  text: string
  timeMs: number
}

interface ExecutionOutput {
  status: 'idle' | 'running' | 'success' | 'error'
  logs: LogItem[]
  returnValue: string | null
  executionDurationMs: number
  exitCode: number
  errorMessage?: string
}

interface TestRunResult {
  name: string
  description: string
  passed: boolean
  got: string
  expected: string
  durationMs: number
}

interface CodeLabWorkspaceProps {
  initialChallengeId?: string
  onBackToCockpit?: () => void
}

export default function CodeLabWorkspace({
  initialChallengeId = 'avl-rotation',
  onBackToCockpit
}: CodeLabWorkspaceProps) {
  const [selectedChallengeId, setSelectedChallengeId] = useState<string>(initialChallengeId)
  const [code, setCode] = useState<string>('')
  const [activeEngine, setActiveEngine] = useState<'instant' | 'cloud'>('instant')
  const [cloudLanguage, setCloudLanguage] = useState<'python' | 'cpp' | 'java' | 'c'>('python')
  const [activeRightTab, setActiveRightTab] = useState<'console' | 'tests' | 'telemetry'>('console')
  const [fontSize, setFontSize] = useState<number>(13)
  const [copySuccess, setCopySuccess] = useState<boolean>(false)
  const [testResults, setTestResults] = useState<TestRunResult[]>([])

  const [output, setOutput] = useState<ExecutionOutput>({
    status: 'idle',
    logs: [],
    returnValue: null,
    executionDurationMs: 0,
    exitCode: 0
  })

  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const terminalScrollRef = useRef<HTMLDivElement>(null)

  const activeChallenge = LAB_CHALLENGES.find((c) => c.id === selectedChallengeId) || LAB_CHALLENGES[0]

  // Synchronize challenge code when active challenge changes
  useEffect(() => {
    setCode(activeChallenge.initialCode)
    setOutput({
      status: 'idle',
      logs: [
        {
          type: 'info',
          text: `Initialized environment for ${activeChallenge.title}. Press "Run Code" or (Ctrl + Enter) for instant execution.`,
          timeMs: 0
        }
      ],
      returnValue: null,
      executionDurationMs: 0,
      exitCode: 0
    })
    setTestResults([])
  }, [activeChallenge])

  // Scroll terminal to bottom when new logs arrive
  useEffect(() => {
    if (terminalScrollRef.current) {
      terminalScrollRef.current.scrollTop = terminalScrollRef.current.scrollHeight
    }
  }, [output.logs])

  // Formats any JS value into safe inspectable string
  const formatArg = (val: any): string => {
    if (val === null) return 'null'
    if (val === undefined) return 'undefined'
    if (typeof val === 'object') {
      try {
        return JSON.stringify(val, null, 2)
      } catch {
        return String(val)
      }
    }
    return String(val)
  }

  // Ultra-fast client-side execution engine (<2ms)
  const handleRunCode = () => {
    setOutput((prev) => ({ ...prev, status: 'running' }))
    const startOverall = performance.now()
    const capturedLogs: LogItem[] = []

    const mockConsole = {
      log: (...args: any[]) => {
        capturedLogs.push({
          type: 'log',
          text: args.map(formatArg).join(' '),
          timeMs: Number((performance.now() - startOverall).toFixed(2))
        })
      },
      info: (...args: any[]) => {
        capturedLogs.push({
          type: 'info',
          text: args.map(formatArg).join(' '),
          timeMs: Number((performance.now() - startOverall).toFixed(2))
        })
      },
      warn: (...args: any[]) => {
        capturedLogs.push({
          type: 'warn',
          text: args.map(formatArg).join(' '),
          timeMs: Number((performance.now() - startOverall).toFixed(2))
        })
      },
      error: (...args: any[]) => {
        capturedLogs.push({
          type: 'error',
          text: args.map(formatArg).join(' '),
          timeMs: Number((performance.now() - startOverall).toFixed(2))
        })
      }
    }

    try {
      // Evaluate within a scoped function
      const runner = new Function('console', code)
      const res = runner(mockConsole)
      const duration = Number((performance.now() - startOverall).toFixed(2))

      setOutput({
        status: 'success',
        logs: capturedLogs,
        returnValue: res !== undefined ? formatArg(res) : null,
        executionDurationMs: duration,
        exitCode: 0
      })
      setActiveRightTab('console')
    } catch (err: any) {
      const duration = Number((performance.now() - startOverall).toFixed(2))
      setOutput({
        status: 'error',
        logs: capturedLogs,
        returnValue: null,
        executionDurationMs: duration,
        exitCode: 1,
        errorMessage: err?.message || String(err)
      })
      setActiveRightTab('console')
    }
  }

  // Run automated test suite
  const handleRunTests = () => {
    setOutput((prev) => ({ ...prev, status: 'running' }))
    const startOverall = performance.now()
    const capturedLogs: LogItem[] = []

    const mockConsole = {
      log: (...args: any[]) => {
        capturedLogs.push({
          type: 'log',
          text: args.map(formatArg).join(' '),
          timeMs: Number((performance.now() - startOverall).toFixed(2))
        })
      },
      info: (...args: any[]) => {
        capturedLogs.push({
          type: 'info',
          text: args.map(formatArg).join(' '),
          timeMs: Number((performance.now() - startOverall).toFixed(2))
        })
      },
      warn: (...args: any[]) => {
        capturedLogs.push({
          type: 'warn',
          text: args.map(formatArg).join(' '),
          timeMs: Number((performance.now() - startOverall).toFixed(2))
        })
      },
      error: (...args: any[]) => {
        capturedLogs.push({
          type: 'error',
          text: args.map(formatArg).join(' '),
          timeMs: Number((performance.now() - startOverall).toFixed(2))
        })
      }
    }

    try {
      // Execute the user code in environment
      const runner = new Function('console', code)
      runner(mockConsole)

      // Strip trailing top-level return so test assertion expressions can execute in scope
      const testCode = code.replace(/return\s*(\{[^]*\}|[^;]+);?\s*$/, '// return statement omitted for test evaluation')

      // Evaluate tests against active challenge
      const results: TestRunResult[] = activeChallenge.testCases.map((tc) => {
        const testStart = performance.now()
        try {
          const testRunner = new Function('console', `${testCode}\n return (${tc.fnCall});`)
          const val = testRunner({ log: () => {}, info: () => {}, warn: () => {}, error: () => {} })
          const strVal = String(val)
          const passed = strVal === tc.expected
          return {
            name: tc.name,
            description: tc.description,
            passed,
            got: strVal,
            expected: tc.expected,
            durationMs: Number((performance.now() - testStart).toFixed(2))
          }
        } catch (err: any) {
          return {
            name: tc.name,
            description: tc.description,
            passed: false,
            got: `Error: ${err?.message || 'Execution failed'}`,
            expected: tc.expected,
            durationMs: Number((performance.now() - testStart).toFixed(2))
          }
        }
      })

      const totalDuration = Number((performance.now() - startOverall).toFixed(2))
      const allPassed = results.every((r) => r.passed)

      setTestResults(results)
      setOutput({
        status: allPassed ? 'success' : 'error',
        logs: capturedLogs,
        returnValue: allPassed
          ? `All ${results.length} automated tests passed successfully.`
          : `${results.filter((r) => !r.passed).length} of ${results.length} tests failed.`,
        executionDurationMs: totalDuration,
        exitCode: allPassed ? 0 : 1
      })
      setActiveRightTab('tests')
    } catch (err: any) {
      setOutput({
        status: 'error',
        logs: capturedLogs,
        returnValue: null,
        executionDurationMs: Number((performance.now() - startOverall).toFixed(2)),
        exitCode: 1,
        errorMessage: `Syntax or Runtime Error in test harness: ${err?.message || String(err)}`
      })
      setActiveRightTab('console')
    }
  }

  // Handle Tab key in editor
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Ctrl + Enter to run
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault()
      handleRunCode()
      return
    }

    // Tab key inserts 2 spaces
    if (e.key === 'Tab') {
      e.preventDefault()
      const start = e.currentTarget.selectionStart
      const end = e.currentTarget.selectionEnd
      const updatedCode = code.substring(0, start) + '  ' + code.substring(end)
      setCode(updatedCode)
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 2
        }
      }, 0)
    }
  }

  // Reset to initial challenge template
  const handleReset = () => {
    if (window.confirm('Reset code to initial challenge template?')) {
      setCode(activeChallenge.initialCode)
      setOutput({
        status: 'idle',
        logs: [
          {
            type: 'info',
            text: `Restored initial starter template for ${activeChallenge.title}.`,
            timeMs: 0
          }
        ],
        returnValue: null,
        executionDurationMs: 0,
        exitCode: 0
      })
      setTestResults([])
    }
  }

  // Copy code to clipboard
  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopySuccess(true)
    setTimeout(() => setCopySuccess(false), 2000)
  }

  // Cloud compiler URLs
  const cloudUrls = {
    python: 'https://onecompiler.com/embed/python?theme=dark&hideLanguageSelection=true&hideNew=true&hideNewFileOption=true&hideTitle=true&hideStdin=false',
    cpp: 'https://onecompiler.com/embed/cpp?theme=dark&hideLanguageSelection=true&hideNew=true&hideNewFileOption=true&hideTitle=true&hideStdin=false',
    java: 'https://onecompiler.com/embed/java?theme=dark&hideLanguageSelection=true&hideNew=true&hideNewFileOption=true&hideTitle=true&hideStdin=false',
    c: 'https://onecompiler.com/embed/c?theme=dark&hideLanguageSelection=true&hideNew=true&hideNewFileOption=true&hideTitle=true&hideStdin=false'
  }

  const lineCount = code.split('\n').length

  return (
    <div className="space-y-6">
      {/* ── Top Header Bar with Breadcrumb, Challenge Selector & Actions ── */}
      <div className="bg-[#FFFFFF] border border-slate-200/80 rounded-xl p-5 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
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
              {activeChallenge.track}
            </span>
            <span className="text-xs font-mono text-slate-500">
              Target: {activeChallenge.complexityGoal}
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#171717]">
            {activeChallenge.title}
          </h2>
        </div>

        {/* Challenge Selection Dropdown & Engine Switcher */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-500 font-semibold uppercase">Lab Challenge:</span>
            <select
              value={selectedChallengeId}
              onChange={(e) => setSelectedChallengeId(e.target.value)}
              className="bg-slate-50 border border-slate-200/80 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-800 focus:outline-none focus:border-[#8B3A62]"
            >
              {LAB_CHALLENGES.map((ch) => (
                <option key={ch.id} value={ch.id}>
                  {ch.title}
                </option>
              ))}
            </select>
          </div>

          {/* Engine Selector */}
          <div className="bg-slate-100 p-1 rounded-lg flex items-center gap-1 border border-slate-200/70">
            <button
              onClick={() => setActiveEngine('instant')}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1.5 ${
                activeEngine === 'instant'
                  ? 'bg-white text-[#8B3A62] font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
              <span>Instant Engine</span>
            </button>
            <button
              onClick={() => setActiveEngine('cloud')}
              className={`px-3 py-1 rounded text-xs font-medium transition-colors flex items-center gap-1.5 ${
                activeEngine === 'cloud'
                  ? 'bg-white text-[#8B3A62] font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                <line x1="6" y1="6" x2="6.01" y2="6" />
                <line x1="6" y1="18" x2="6.01" y2="18" />
              </svg>
              <span>Multi-Language Cloud</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── Problem Context Banner ── */}
      <div className="bg-[#FFFFFF] border border-slate-200/80 rounded-xl p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase font-mono font-bold text-slate-400 tracking-wider">
                PROBLEM STATEMENT
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-mono font-semibold border border-emerald-200">
                {activeChallenge.difficulty}
              </span>
              <span className="text-xs font-mono text-slate-400">
                Est. {activeChallenge.timeEstimate}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {activeChallenge.description}
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200/70 rounded-lg p-3 max-w-sm w-full space-y-1.5">
            <div className="text-xs font-mono font-semibold text-slate-600 uppercase">Verification Rules</div>
            <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
              {activeChallenge.instructions.map((inst, i) => (
                <li key={i} className="leading-tight">{inst}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Main Workspace Body: Editor + Output Console ── */}
      {activeEngine === 'instant' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column (7 cols): Interactive Code Editor */}
          <div className="lg:col-span-7 bg-[#FFFFFF] border border-slate-200/80 rounded-xl shadow-xs overflow-hidden flex flex-col">
            {/* Editor Action Header */}
            <div className="px-4 py-3 bg-slate-50 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white border border-slate-200 text-xs font-mono font-semibold text-slate-700">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8B3A62" strokeWidth="2.2">
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                  <span>algorithm.js</span>
                </div>
                <span className="text-xs font-mono text-slate-400">{lineCount} lines</span>
              </div>

              {/* Editor Controls: Font Size, Reset, Copy */}
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-white border border-slate-200 rounded text-xs font-mono">
                  <button
                    onClick={() => setFontSize((s) => Math.max(12, s - 1))}
                    className="px-2 py-0.5 text-slate-600 hover:bg-slate-100 border-r border-slate-200"
                    title="Decrease font size"
                  >
                    A-
                  </button>
                  <span className="px-2 py-0.5 text-slate-500">{fontSize}px</span>
                  <button
                    onClick={() => setFontSize((s) => Math.min(18, s + 1))}
                    className="px-2 py-0.5 text-slate-600 hover:bg-slate-100"
                    title="Increase font size"
                  >
                    A+
                  </button>
                </div>

                <button
                  onClick={handleReset}
                  className="px-2.5 py-1 rounded bg-white border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors flex items-center gap-1"
                  title="Reset to challenge starter code"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="1 4 1 10 7 10" />
                    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                  </svg>
                  <span>Reset</span>
                </button>

                <button
                  onClick={handleCopy}
                  className="px-2.5 py-1 rounded bg-white border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-100 transition-colors flex items-center gap-1"
                  title="Copy code to clipboard"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  <span>{copySuccess ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Code Textarea with Line Numbers */}
            <div className="relative flex bg-[#0D1117] text-[#E6EDF3] font-mono" style={{ minHeight: '440px' }}>
              {/* Line Numbers gutter */}
              <div
                className="select-none py-3 px-3 text-right text-slate-500 border-r border-[#30363D] bg-[#161B22]"
                style={{ fontSize: `${fontSize}px`, lineHeight: '1.5' }}
              >
                {Array.from({ length: Math.max(lineCount, 16) }).map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>

              {/* Editable Code Box */}
              <textarea
                ref={textareaRef}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={handleKeyDown}
                spellCheck={false}
                className="flex-1 p-3 bg-transparent text-[#E6EDF3] outline-none resize-none overflow-auto font-mono whitespace-pre"
                style={{
                  fontSize: `${fontSize}px`,
                  lineHeight: '1.5',
                  tabSize: 2
                }}
              />
            </div>

            {/* Editor Action Bottom Bar */}
            <div className="px-4 py-3 bg-slate-50 border-t border-slate-200/80 flex items-center justify-between gap-3">
              <span className="text-xs font-mono text-slate-500 hidden sm:inline">
                Shortcut: <strong className="text-slate-700">Ctrl + Enter</strong> to execute
              </span>

              <div className="flex items-center gap-2 ml-auto">
                <button
                  onClick={handleRunTests}
                  className="px-4 py-2 rounded-lg bg-white border border-slate-300 text-xs font-bold text-slate-800 hover:bg-slate-100 transition-colors shadow-xs flex items-center gap-2"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <polyline points="9 11 12 14 22 4" />
                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                  </svg>
                  <span>Run Tests ({activeChallenge.testCases.length})</span>
                </button>

                <button
                  onClick={handleRunCode}
                  disabled={output.status === 'running'}
                  className="px-5 py-2 rounded-lg bg-[#8B3A62] text-white hover:bg-[#6E2D4E] text-xs font-bold transition-colors shadow-xs flex items-center gap-2 disabled:opacity-50"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  <span>{output.status === 'running' ? 'Executing...' : 'Run Code'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): High-Clarity Terminal Output Console */}
          <div className="lg:col-span-5 bg-[#FFFFFF] border border-slate-200/80 rounded-xl shadow-xs overflow-hidden flex flex-col">
            {/* Terminal Header & Status Telemetry */}
            <div className="px-4 py-3 bg-slate-50 border-b border-slate-200/80 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveRightTab('console')}
                  className={`px-3 py-1 rounded text-xs font-bold transition-colors ${
                    activeRightTab === 'console'
                      ? 'bg-[#8B3A62] text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Output Console
                </button>
                <button
                  onClick={() => setActiveRightTab('tests')}
                  className={`px-3 py-1 rounded text-xs font-bold transition-colors flex items-center gap-1.5 ${
                    activeRightTab === 'tests'
                      ? 'bg-[#8B3A62] text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <span>Test Results</span>
                  {testResults.length > 0 && (
                    <span className="w-4 h-4 rounded-full bg-slate-200 text-slate-800 text-[10px] flex items-center justify-center font-mono">
                      {testResults.length}
                    </span>
                  )}
                </button>
              </div>

              {/* Status Indicator */}
              <div className="flex items-center gap-2 font-mono text-xs">
                {output.status === 'success' && (
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
                    Exit 0 • {output.executionDurationMs}ms
                  </span>
                )}
                {output.status === 'error' && (
                  <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-bold border border-rose-300">
                    Exit 1 • {output.executionDurationMs}ms
                  </span>
                )}
                {output.status === 'idle' && (
                  <span className="text-slate-400">Ready</span>
                )}
              </div>
            </div>

            {/* Terminal Window */}
            {activeRightTab === 'console' ? (
              <div className="flex flex-col bg-[#0D1117] text-white p-4 font-mono text-xs flex-1" style={{ minHeight: '440px' }}>
                {/* Console Log Area */}
                <div
                  ref={terminalScrollRef}
                  className="flex-1 overflow-y-auto space-y-2 pr-2"
                  style={{ maxHeight: '360px' }}
                >
                  {output.logs.length === 0 && !output.errorMessage && (
                    <div className="text-slate-500 py-6 text-center italic">
                      Terminal waiting for execution. Click &quot;Run Code&quot; to see real-time stdout.
                    </div>
                  )}

                  {output.logs.map((log, index) => (
                    <div
                      key={index}
                      className={`leading-relaxed break-words font-mono ${
                        log.type === 'error'
                          ? 'text-rose-400 bg-rose-950/30 p-1.5 rounded border border-rose-900/40'
                          : log.type === 'warn'
                          ? 'text-amber-300'
                          : log.type === 'info'
                          ? 'text-sky-300'
                          : 'text-[#E6EDF3]'
                      }`}
                    >
                      <span className="text-slate-500 select-none mr-2 font-mono">
                        [{log.timeMs.toFixed(1)}ms]
                      </span>
                      <span>{log.text}</span>
                    </div>
                  ))}

                  {/* Runtime Error Display */}
                  {output.errorMessage && (
                    <div className="p-3 rounded bg-rose-950/50 border border-rose-800/80 text-rose-300 mt-2 space-y-1">
                      <div className="font-bold flex items-center gap-1.5 text-rose-200">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="12" y1="8" x2="12" y2="12" />
                          <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        <span>RUNTIME ERROR</span>
                      </div>
                      <div className="font-mono text-xs leading-normal">{output.errorMessage}</div>
                    </div>
                  )}
                </div>

                {/* Return Value Inspector */}
                {output.returnValue !== null && (
                  <div className="mt-4 pt-3 border-t border-[#30363D] space-y-1">
                    <div className="flex items-center justify-between text-slate-400 text-xs">
                      <span className="font-bold text-slate-300">RETURN INSPECTOR:</span>
                      <span className="text-emerald-400">Status 200 OK</span>
                    </div>
                    <pre className="p-2.5 rounded bg-[#161B22] border border-[#30363D] text-emerald-400 overflow-x-auto text-xs max-h-36">
                      {output.returnValue}
                    </pre>
                  </div>
                )}

                {/* Console Clear Button */}
                <div className="mt-3 pt-2 border-t border-[#21262D] flex items-center justify-between text-slate-500 text-xs">
                  <span>Standard Output Stream (stdout)</span>
                  <button
                    onClick={() =>
                      setOutput((prev) => ({
                        ...prev,
                        logs: [],
                        returnValue: null,
                        errorMessage: undefined
                      }))
                    }
                    className="text-slate-400 hover:text-white transition-colors underline"
                  >
                    Clear Console
                  </button>
                </div>
              </div>
            ) : (
              /* Test Results Window */
              <div className="p-4 bg-slate-50 flex-1 space-y-3 font-sans text-xs" style={{ minHeight: '440px' }}>
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <div className="font-bold text-slate-800">
                    Automated Test Assertions ({testResults.filter((t) => t.passed).length}/{testResults.length} Passed)
                  </div>
                  <button
                    onClick={handleRunTests}
                    className="text-xs font-semibold text-[#8B3A62] hover:underline"
                  >
                    Rerun All Tests
                  </button>
                </div>

                {testResults.length === 0 ? (
                  <div className="text-center py-12 text-slate-500">
                    <svg className="w-8 h-8 mx-auto text-slate-400 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <polyline points="10 9 9 9 8 9" />
                    </svg>
                    <p className="font-medium">No tests executed yet.</p>
                    <p className="text-xs text-slate-400 mt-1">Click &quot;Run Tests&quot; to verify your implementation.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {testResults.map((tc, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-lg border flex flex-col gap-1.5 ${
                          tc.passed
                            ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                            : 'bg-rose-50/70 border-rose-200 text-rose-900'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="font-bold flex items-center gap-1.5">
                            {tc.passed ? (
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            ) : (
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E11D48" strokeWidth="2.5">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                              </svg>
                            )}
                            <span>{tc.name}</span>
                          </div>
                          <span className="font-mono text-xs font-semibold">
                            {tc.passed ? 'PASSED' : 'FAILED'} ({tc.durationMs}ms)
                          </span>
                        </div>

                        <p className="text-xs text-slate-600">{tc.description}</p>

                        <div className="font-mono text-xs bg-white/70 p-2 rounded border border-slate-200/80 space-y-0.5">
                          <div>
                            <span className="text-slate-400">Expected: </span>
                            <span className="font-semibold text-slate-800">{tc.expected}</span>
                          </div>
                          <div>
                            <span className="text-slate-400">Actual Result: </span>
                            <span className={`font-semibold ${tc.passed ? 'text-emerald-700' : 'text-rose-700'}`}>
                              {tc.got}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Cloud Compiler View */
        <div className="bg-[#FFFFFF] border border-slate-200/80 rounded-xl shadow-xs overflow-hidden flex flex-col">
          <div className="px-4 py-3 bg-slate-50 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-slate-600 uppercase">Cloud Compiler Runtime:</span>
              <div className="flex items-center gap-2">
                {(['python', 'cpp', 'java', 'c'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setCloudLanguage(lang)}
                    className={`px-3 py-1 rounded text-xs font-mono font-bold uppercase transition-colors ${
                      cloudLanguage === lang
                        ? 'bg-[#8B3A62] text-white'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            <span className="text-xs text-slate-500 font-mono">
              Remote sandbox with standard I/O streams
            </span>
          </div>

          <div style={{ height: '560px' }}>
            <iframe
              key={cloudLanguage}
              src={cloudUrls[cloudLanguage]}
              className="w-full h-full border-none"
              allow="clipboard-write"
              title="SynaptiQ Cloud Code Lab Sandbox"
            />
          </div>
        </div>
      )}
    </div>
  )
}
