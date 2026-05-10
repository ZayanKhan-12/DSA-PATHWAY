"use client";

import Link from "next/link";
import { useState } from "react";

type LanguageKey =
  | "javascript"
  | "python"
  | "java"
  | "cpp"
  | "typescript"
  | "go"
  | "csharp"
  | "rust";

type TestCase = {
  id: number;
  grid: number[][];
  expected: number;
};

const LANGUAGES: { key: LanguageKey; label: string }[] = [
  { key: "javascript", label: "JAVASCRIPT" },
  { key: "python", label: "PYTHON" },
  { key: "java", label: "JAVA" },
  { key: "cpp", label: "C++" },
  { key: "typescript", label: "TYPESCRIPT" },
  { key: "go", label: "GO" },
  { key: "csharp", label: "C#" },
  { key: "rust", label: "RUST" },
];

const STARTER_CODE: Record<LanguageKey, string> = {
  javascript: `function shortestPathBinaryMatrix(grid) {
  // write your answer here using 8-direction BFS
  throw new Error("Implement shortestPathBinaryMatrix first");
}`,
  python: `class Solution:
    def shortestPathBinaryMatrix(self, grid: List[List[int]]) -> int:
        # write your answer here using 8-direction BFS
        return -1`,
  java: `class Solution {
    public int shortestPathBinaryMatrix(int[][] grid) {
        // write your answer here using 8-direction BFS
        return -1;
    }
}`,
  cpp: `class Solution {
public:
    int shortestPathBinaryMatrix(vector<vector<int>>& grid) {
        // write your answer here using 8-direction BFS
        return -1;
    }
};`,
  typescript: `function shortestPathBinaryMatrix(grid: number[][]): number {
  // write your answer here using 8-direction BFS
  throw new Error("Implement shortestPathBinaryMatrix first");
}`,
  go: `func shortestPathBinaryMatrix(grid [][]int) int {
    // write your answer here using 8-direction BFS
    return -1
}`,
  csharp: `public class Solution {
    public int ShortestPathBinaryMatrix(int[][] grid) {
        // write your answer here using 8-direction BFS
        return -1;
    }
}`,
  rust: `impl Solution {
    pub fn shortest_path_binary_matrix(grid: Vec<Vec<i32>>) -> i32 {
        // write your answer here using 8-direction BFS
        -1
    }
}`,
};

const SOLUTION_CODE: Record<LanguageKey, string> = {
  javascript: `function shortestPathBinaryMatrix(grid) {
  const n = grid.length;

  if (grid[0][0] !== 0 || grid[n - 1][n - 1] !== 0) {
    return -1;
  }

  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ];

  const queue = [[0, 0, 1]];
  grid[0][0] = 1;
  let head = 0;

  while (head < queue.length) {
    const [row, col, distance] = queue[head];
    head++;

    if (row === n - 1 && col === n - 1) {
      return distance;
    }

    for (const [rowChange, colChange] of directions) {
      const nextRow = row + rowChange;
      const nextCol = col + colChange;

      const inBounds =
        nextRow >= 0 &&
        nextCol >= 0 &&
        nextRow < n &&
        nextCol < n;

      if (inBounds && grid[nextRow][nextCol] === 0) {
        grid[nextRow][nextCol] = 1;
        queue.push([nextRow, nextCol, distance + 1]);
      }
    }
  }

  return -1;
}`,
  python: `from collections import deque

class Solution:
    def shortestPathBinaryMatrix(self, grid: List[List[int]]) -> int:
        n = len(grid)

        if grid[0][0] != 0 or grid[n - 1][n - 1] != 0:
            return -1

        directions = [
            (1, 0),
            (-1, 0),
            (0, 1),
            (0, -1),
            (1, 1),
            (1, -1),
            (-1, 1),
            (-1, -1),
        ]

        queue = deque([(0, 0, 1)])
        grid[0][0] = 1

        while queue:
            row, col, distance = queue.popleft()

            if row == n - 1 and col == n - 1:
                return distance

            for row_change, col_change in directions:
                next_row = row + row_change
                next_col = col + col_change

                in_bounds = 0 <= next_row < n and 0 <= next_col < n

                if in_bounds and grid[next_row][next_col] == 0:
                    grid[next_row][next_col] = 1
                    queue.append((next_row, next_col, distance + 1))

        return -1`,
  java: `class Solution {
    public int shortestPathBinaryMatrix(int[][] grid) {
        int n = grid.length;

        if (grid[0][0] != 0 || grid[n - 1][n - 1] != 0) {
            return -1;
        }

        int[][] directions = {
            {1, 0},
            {-1, 0},
            {0, 1},
            {0, -1},
            {1, 1},
            {1, -1},
            {-1, 1},
            {-1, -1}
        };

        Queue<int[]> queue = new LinkedList<>();
        queue.offer(new int[] {0, 0, 1});
        grid[0][0] = 1;

        while (!queue.isEmpty()) {
            int[] current = queue.poll();
            int row = current[0];
            int col = current[1];
            int distance = current[2];

            if (row == n - 1 && col == n - 1) {
                return distance;
            }

            for (int[] direction : directions) {
                int nextRow = row + direction[0];
                int nextCol = col + direction[1];

                boolean inBounds =
                    nextRow >= 0 &&
                    nextCol >= 0 &&
                    nextRow < n &&
                    nextCol < n;

                if (inBounds && grid[nextRow][nextCol] == 0) {
                    grid[nextRow][nextCol] = 1;
                    queue.offer(new int[] {nextRow, nextCol, distance + 1});
                }
            }
        }

        return -1;
    }
}`,
  cpp: `class Solution {
public:
    int shortestPathBinaryMatrix(vector<vector<int>>& grid) {
        int n = grid.size();

        if (grid[0][0] != 0 || grid[n - 1][n - 1] != 0) {
            return -1;
        }

        vector<pair<int, int>> directions = {
            {1, 0},
            {-1, 0},
            {0, 1},
            {0, -1},
            {1, 1},
            {1, -1},
            {-1, 1},
            {-1, -1}
        };

        queue<vector<int>> q;
        q.push({0, 0, 1});
        grid[0][0] = 1;

        while (!q.empty()) {
            vector<int> current = q.front();
            q.pop();

            int row = current[0];
            int col = current[1];
            int distance = current[2];

            if (row == n - 1 && col == n - 1) {
                return distance;
            }

            for (auto [rowChange, colChange] : directions) {
                int nextRow = row + rowChange;
                int nextCol = col + colChange;

                bool inBounds =
                    nextRow >= 0 &&
                    nextCol >= 0 &&
                    nextRow < n &&
                    nextCol < n;

                if (inBounds && grid[nextRow][nextCol] == 0) {
                    grid[nextRow][nextCol] = 1;
                    q.push({nextRow, nextCol, distance + 1});
                }
            }
        }

        return -1;
    }
};`,
  typescript: `function shortestPathBinaryMatrix(grid: number[][]): number {
  const n = grid.length;

  if (grid[0][0] !== 0 || grid[n - 1][n - 1] !== 0) {
    return -1;
  }

  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ];

  const queue: number[][] = [[0, 0, 1]];
  grid[0][0] = 1;
  let head = 0;

  while (head < queue.length) {
    const [row, col, distance] = queue[head];
    head++;

    if (row === n - 1 && col === n - 1) {
      return distance;
    }

    for (const [rowChange, colChange] of directions) {
      const nextRow = row + rowChange;
      const nextCol = col + colChange;

      const inBounds =
        nextRow >= 0 &&
        nextCol >= 0 &&
        nextRow < n &&
        nextCol < n;

      if (inBounds && grid[nextRow][nextCol] === 0) {
        grid[nextRow][nextCol] = 1;
        queue.push([nextRow, nextCol, distance + 1]);
      }
    }
  }

  return -1;
}`,
  go: `func shortestPathBinaryMatrix(grid [][]int) int {
    n := len(grid)

    if grid[0][0] != 0 || grid[n - 1][n - 1] != 0 {
        return -1
    }

    directions := [][]int{
        {1, 0},
        {-1, 0},
        {0, 1},
        {0, -1},
        {1, 1},
        {1, -1},
        {-1, 1},
        {-1, -1},
    }

    queue := [][]int{{0, 0, 1}}
    grid[0][0] = 1
    head := 0

    for head < len(queue) {
        current := queue[head]
        head++

        row := current[0]
        col := current[1]
        distance := current[2]

        if row == n - 1 && col == n - 1 {
            return distance
        }

        for _, direction := range directions {
            nextRow := row + direction[0]
            nextCol := col + direction[1]

            inBounds :=
                nextRow >= 0 &&
                nextCol >= 0 &&
                nextRow < n &&
                nextCol < n

            if inBounds && grid[nextRow][nextCol] == 0 {
                grid[nextRow][nextCol] = 1
                queue = append(queue, []int{nextRow, nextCol, distance + 1})
            }
        }
    }

    return -1
}`,
  csharp: `public class Solution {
    public int ShortestPathBinaryMatrix(int[][] grid) {
        int n = grid.Length;

        if (grid[0][0] != 0 || grid[n - 1][n - 1] != 0) {
            return -1;
        }

        int[][] directions = new int[][] {
            new int[] {1, 0},
            new int[] {-1, 0},
            new int[] {0, 1},
            new int[] {0, -1},
            new int[] {1, 1},
            new int[] {1, -1},
            new int[] {-1, 1},
            new int[] {-1, -1}
        };

        Queue<int[]> queue = new Queue<int[]>();
        queue.Enqueue(new int[] {0, 0, 1});
        grid[0][0] = 1;

        while (queue.Count > 0) {
            int[] current = queue.Dequeue();
            int row = current[0];
            int col = current[1];
            int distance = current[2];

            if (row == n - 1 && col == n - 1) {
                return distance;
            }

            foreach (int[] direction in directions) {
                int nextRow = row + direction[0];
                int nextCol = col + direction[1];

                bool inBounds =
                    nextRow >= 0 &&
                    nextCol >= 0 &&
                    nextRow < n &&
                    nextCol < n;

                if (inBounds && grid[nextRow][nextCol] == 0) {
                    grid[nextRow][nextCol] = 1;
                    queue.Enqueue(new int[] {nextRow, nextCol, distance + 1});
                }
            }
        }

        return -1;
    }
}`,
  rust: `use std::collections::VecDeque;

impl Solution {
    pub fn shortest_path_binary_matrix(mut grid: Vec<Vec<i32>>) -> i32 {
        let n = grid.len();

        if grid[0][0] != 0 || grid[n - 1][n - 1] != 0 {
            return -1;
        }

        let directions = vec![
            (1, 0),
            (-1, 0),
            (0, 1),
            (0, -1),
            (1, 1),
            (1, -1),
            (-1, 1),
            (-1, -1),
        ];

        let mut queue = VecDeque::new();
        queue.push_back((0_i32, 0_i32, 1));
        grid[0][0] = 1;

        while let Some((row, col, distance)) = queue.pop_front() {
            if row == n as i32 - 1 && col == n as i32 - 1 {
                return distance;
            }

            for (row_change, col_change) in &directions {
                let next_row = row + row_change;
                let next_col = col + col_change;

                if next_row >= 0 &&
                   next_col >= 0 &&
                   next_row < n as i32 &&
                   next_col < n as i32 {
                    let r = next_row as usize;
                    let c = next_col as usize;

                    if grid[r][c] == 0 {
                        grid[r][c] = 1;
                        queue.push_back((next_row, next_col, distance + 1));
                    }
                }
            }
        }

        -1
    }
}`,
};

const TEST_CASES: TestCase[] = [
  {
    id: 1,
    grid: [
      [0, 1],
      [1, 0],
    ],
    expected: 2,
  },
  {
    id: 2,
    grid: [
      [0, 0, 0],
      [1, 1, 0],
      [1, 1, 0],
    ],
    expected: 4,
  },
  {
    id: 3,
    grid: [
      [1, 0, 0],
      [1, 1, 0],
      [1, 1, 0],
    ],
    expected: -1,
  },
  {
    id: 4,
    grid: [[0]],
    expected: 1,
  },
  {
    id: 5,
    grid: [
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0],
    ],
    expected: 4,
  },
];

function getLanguageLabel(language: LanguageKey) {
  return LANGUAGES.find((item) => item.key === language)?.label ?? language;
}

function cloneGrid(grid: number[][]) {
  return grid.map((row) => [...row]);
}

function executeJavaScript(code: string, test: TestCase) {
  try {
    const shortestPathBinaryMatrix = new Function(`
      "use strict";
      ${code}
      return shortestPathBinaryMatrix;
    `)() as (grid: number[][]) => number;

    if (typeof shortestPathBinaryMatrix !== "function") {
      return {
        pass: false,
        actual: 0,
        error: "shortestPathBinaryMatrix function was not found. Keep the function named shortestPathBinaryMatrix.",
      };
    }

    const actual = shortestPathBinaryMatrix(cloneGrid(test.grid));

    if (typeof actual !== "number") {
      return {
        pass: false,
        actual: 0,
        error: "Your function must return a number.",
      };
    }

    return {
      pass: actual === test.expected,
      actual,
      error: "",
    };
  } catch (error) {
    return {
      pass: false,
      actual: 0,
      error: error instanceof Error ? error.message : "Unknown runtime error.",
    };
  }
}

export default function ShortestPathBinaryMatrixPracticePage() {
  const [language, setLanguage] = useState<LanguageKey>("javascript");
  const [editorCode, setEditorCode] = useState<Record<LanguageKey, string>>(STARTER_CODE);
  const [selectedCaseId, setSelectedCaseId] = useState(1);
  const [showSolution, setShowSolution] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState("$ ready");
  const [resultText, setResultText] = useState("Run your JavaScript code against the sample tests.");

  const selectedCase = TEST_CASES.find((test) => test.id === selectedCaseId) ?? TEST_CASES[0];

  function runSelectedCase() {
    if (language !== "javascript") {
      const label = getLanguageLabel(language);

      setConsoleOutput(
        [
          "$ run.sample",
          `language: ${label}`,
          "status: PREVIEW_ONLY",
          "",
          "Only JavaScript runs inside this frontend runner.",
          "Switch to JAVASCRIPT to run real tests.",
        ].join("\n")
      );

      setResultText(`${label} is editable preview only.`);
      return;
    }

    const result = executeJavaScript(editorCode.javascript, selectedCase);

    setConsoleOutput(
      [
        "$ run.sample",
        `case: ${selectedCase.id}`,
        `grid: ${JSON.stringify(selectedCase.grid)}`,
        `expected: ${selectedCase.expected}`,
        `got: ${result.error ? "runtime error" : String(result.actual)}`,
        `status: ${result.pass ? "PASS" : "FAIL"}`,
        result.error ? `error: ${result.error}` : "",
      ]
        .filter(Boolean)
        .join("\n")
    );

    setResultText(result.pass ? `Case ${selectedCase.id} passed.` : `Case ${selectedCase.id} failed.`);
  }

  function submitAllCases() {
    if (language !== "javascript") {
      const label = getLanguageLabel(language);

      setConsoleOutput(
        [
          "$ submit",
          `language: ${label}`,
          "status: PREVIEW_ONLY",
          "",
          "Only JavaScript runs inside this frontend runner.",
          "Switch to JAVASCRIPT to run real tests.",
        ].join("\n")
      );

      setResultText(`${label} is editable preview only.`);
      return;
    }

    const lines = ["$ submit"];
    let passed = 0;

    for (const test of TEST_CASES) {
      const result = executeJavaScript(editorCode.javascript, test);

      if (result.pass) {
        passed++;
        lines.push(`case ${test.id}: PASS`);
      } else {
        lines.push(`case ${test.id}: FAIL`);
        lines.push(`  grid: ${JSON.stringify(test.grid)}`);
        lines.push(`  expected: ${test.expected}`);
        lines.push(`  got: ${result.error ? "runtime error" : String(result.actual)}`);
        if (result.error) lines.push(`  error: ${result.error}`);
      }
    }

    lines.push("");
    lines.push(`passed: ${passed}/${TEST_CASES.length}`);

    setConsoleOutput(lines.join("\n"));

    setResultText(
      passed === TEST_CASES.length
        ? "Accepted. All test cases passed."
        : passed === 0
          ? "Not accepted yet. Implement shortestPathBinaryMatrix, then run again."
          : `Wrong Answer. ${passed}/${TEST_CASES.length} cases passed.`
    );
  }

  function loadSolution() {
    setEditorCode((previous) => ({
      ...previous,
      [language]: SOLUTION_CODE[language],
    }));

    setConsoleOutput(`$ loaded ${getLanguageLabel(language)} solution`);
    setResultText(language === "javascript" ? "Loaded runnable JavaScript solution." : "Loaded preview solution.");
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-[1740px] px-4 py-4">
        <div className="mb-4 flex h-14 items-center justify-between border border-border bg-black/30 px-5">
          <Link href="/" className="text-[10px] font-bold tracking-[0.35em] text-primary">
            DSA.ENGINE
          </Link>

          <div className="flex items-center gap-5 text-[10px] font-bold tracking-[0.3em] text-muted-foreground">
            <Link className="hover:text-primary" href="/learn/bfs">
              BACK TO LESSON
            </Link>
          </div>
        </div>

        <div className="grid h-[calc(100vh-96px)] min-h-[760px] gap-4 xl:grid-cols-[0.78fr_1.22fr]">
          <section className="flex min-h-0 flex-col overflow-hidden border border-border bg-black/20">
            <div className="border-b border-border bg-black/20 px-5 py-4">
              <div className="mb-3 flex gap-2">
                <span className="border border-yellow-400 px-3 py-1 text-[10px] font-bold tracking-[0.25em] text-yellow-400">
                  MED
                </span>
                <span className="border border-border px-3 py-1 text-[10px] font-bold tracking-[0.25em] text-muted-foreground">
                  BFS
                </span>
                <span className="border border-border px-3 py-1 text-[10px] font-bold tracking-[0.25em] text-muted-foreground">
                  8-DIRECTION
                </span>
              </div>

              <div className="mb-3 flex items-center gap-3">
                <span className="text-5xl font-bold leading-none text-primary">$</span>
                <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                  Shortest Path in Binary Matrix
                </h1>
              </div>

              <p className="max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
                Use 8-direction BFS to find the shortest clear path from top-left to bottom-right.
              </p>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              <div className="mb-4 text-[10px] font-bold tracking-[0.35em] text-muted-foreground">
                DESCRIPTION
              </div>

              <div className="space-y-5 text-sm leading-7 text-muted-foreground">
                <div className="terminal-frame p-4">
                  <p>
                    Given an <span className="text-foreground">n × n</span> binary matrix, return the length of the shortest clear path.
                  </p>
                  <p className="mt-2">
                    A clear path only moves through <span className="text-foreground">0</span> cells and may move in 8 directions.
                  </p>
                  <p className="mt-2">
                    If the start or end is blocked, or no path exists, return <span className="text-foreground">-1</span>.
                  </p>
                </div>

                <div className="terminal-frame p-4">
                  <h2 className="mb-3 text-xl font-bold text-foreground">Example</h2>
                  <pre className="overflow-x-auto whitespace-pre-wrap text-xs leading-6 md:text-sm">
{`Input:
[
  [0,1],
  [1,0]
]

Output: 2

Path:
(0,0) -> (1,1)`}
                  </pre>
                </div>

                <div className="terminal-frame p-4">
                  <h2 className="mb-3 text-xl font-bold text-foreground">BFS Pattern</h2>
                  <ul className="list-disc space-y-2 pl-5">
                    <li>Reject immediately if start or end is blocked</li>
                    <li>Push top-left cell with distance 1</li>
                    <li>Explore all 8 neighboring cells</li>
                    <li>First time BFS reaches bottom-right is the shortest path</li>
                  </ul>
                </div>

                <button
                  onClick={() => setShowSolution((value) => !value)}
                  className="border border-primary px-4 py-2 text-[10px] font-bold tracking-[0.25em] text-primary transition-colors hover:bg-primary hover:text-black"
                >
                  {showSolution ? "HIDE_CODE_SOLUTION" : "SHOW_CODE_SOLUTION"}
                </button>

                {showSolution ? (
                  <div className="terminal-frame p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-[10px] font-bold tracking-[0.35em] text-muted-foreground">
                        SOLUTION
                      </span>
                      <span className="text-[10px] font-bold tracking-[0.35em] text-primary">
                        {getLanguageLabel(language)}
                      </span>
                    </div>

                    <pre className="overflow-x-auto whitespace-pre text-xs leading-6 md:text-sm">
                      {SOLUTION_CODE[language]}
                    </pre>
                  </div>
                ) : null}
              </div>
            </div>
          </section>

          <section className="flex min-h-0 flex-col overflow-hidden border border-border bg-black/20">
            <div className="border-b border-border bg-black/30 px-4 py-3">
              <div className="flex flex-wrap gap-2">
                {LANGUAGES.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setLanguage(item.key)}
                    className={`border px-3 py-2 text-[10px] font-bold tracking-[0.22em] transition-colors ${
                      language === item.key
                        ? "border-primary bg-primary text-black"
                        : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid min-h-0 flex-1 border-b border-border xl:grid-cols-[minmax(0,1fr)_360px]">
              <div className="flex min-h-0 flex-col border-r border-border px-4 py-4">
                <div className="mb-3 flex items-center justify-between">
                  <div className="text-[10px] font-bold tracking-[0.35em] text-muted-foreground">
                    CODE EDITOR
                  </div>

                  <button
                    onClick={loadSolution}
                    className="border border-border px-3 py-1.5 text-[10px] font-bold tracking-[0.22em] text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    LOAD SOLUTION
                  </button>
                </div>

                <div className="terminal-frame min-h-0 flex-1 overflow-hidden p-4">
                  <textarea
                    value={editorCode[language]}
                    onChange={(event) =>
                      setEditorCode((previous) => ({
                        ...previous,
                        [language]: event.target.value,
                      }))
                    }
                    spellCheck={false}
                    className="h-full w-full resize-none overflow-auto bg-transparent font-mono text-[13px] leading-6 text-foreground outline-none selection:bg-primary selection:text-black"
                  />
                </div>
              </div>

              <aside className="flex min-h-0 flex-col px-4 py-4">
                <div className="mb-3 text-[10px] font-bold tracking-[0.35em] text-muted-foreground">
                  TESTCASES
                </div>

                <div className="min-h-0 flex-1 space-y-3 overflow-y-auto pr-1">
                  {TEST_CASES.map((test) => (
                    <button
                      key={test.id}
                      onClick={() => setSelectedCaseId(test.id)}
                      className={`block w-full border p-3 text-left transition-colors ${
                        selectedCaseId === test.id
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary"
                      }`}
                    >
                      <div className="mb-2 text-[10px] font-bold tracking-[0.3em] text-muted-foreground">
                        CASE {test.id}
                      </div>

                      <div className="text-xs leading-5 text-muted-foreground">
                        <p className="text-foreground">grid:</p>
                        <pre className="mt-1 max-h-28 overflow-auto whitespace-pre-wrap break-words">
                          {JSON.stringify(test.grid)}
                        </pre>
                        <p className="mt-2 text-foreground">expected: {test.expected}</p>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-3 grid grid-cols-2 gap-3">
                  <button
                    onClick={runSelectedCase}
                    className="border border-primary bg-primary px-4 py-3 text-[10px] font-bold tracking-[0.25em] text-black transition-opacity hover:opacity-90"
                  >
                    RUN
                  </button>

                  <button
                    onClick={submitAllCases}
                    className="border border-border px-4 py-3 text-[10px] font-bold tracking-[0.25em] text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    SUBMIT
                  </button>
                </div>

                <div className="terminal-frame mt-3 p-3 text-xs leading-6 text-muted-foreground">
                  JavaScript runs real local tests. Other languages are editable previews.
                </div>
              </aside>
            </div>

            <div className="grid h-[210px] flex-none xl:grid-cols-2">
              <div className="border-r border-border px-4 py-4">
                <div className="mb-3 text-[10px] font-bold tracking-[0.35em] text-muted-foreground">
                  CONSOLE
                </div>

                <div className="terminal-frame h-[150px] overflow-auto p-3">
                  <pre className="whitespace-pre-wrap break-words text-xs leading-6">{consoleOutput}</pre>
                </div>
              </div>

              <div className="px-4 py-4">
                <div className="mb-3 text-[10px] font-bold tracking-[0.35em] text-muted-foreground">
                  RESULT
                </div>

                <div className="terminal-frame h-[150px] overflow-auto p-3 text-xs leading-6 text-muted-foreground">
                  <p>{resultText}</p>
                  <p className="mt-3">Expected approach: 8-direction BFS</p>
                  <p>Time: O(n²)</p>
                  <p>Space: O(n²)</p>
                  <p className="mt-3">Current testcase: Case {selectedCaseId}</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
