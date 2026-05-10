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
  javascript: `function orangesRotting(grid) {
  // write your answer here using multi-source BFS
  throw new Error("Implement orangesRotting first");
}`,
  python: `class Solution:
    def orangesRotting(self, grid: List[List[int]]) -> int:
        # write your answer here using multi-source BFS
        return -1`,
  java: `class Solution {
    public int orangesRotting(int[][] grid) {
        // write your answer here using multi-source BFS
        return -1;
    }
}`,
  cpp: `class Solution {
public:
    int orangesRotting(vector<vector<int>>& grid) {
        // write your answer here using multi-source BFS
        return -1;
    }
};`,
  typescript: `function orangesRotting(grid: number[][]): number {
  // write your answer here using multi-source BFS
  throw new Error("Implement orangesRotting first");
}`,
  go: `func orangesRotting(grid [][]int) int {
    // write your answer here using multi-source BFS
    return -1
}`,
  csharp: `public class Solution {
    public int OrangesRotting(int[][] grid) {
        // write your answer here using multi-source BFS
        return -1;
    }
}`,
  rust: `impl Solution {
    pub fn oranges_rotting(grid: Vec<Vec<i32>>) -> i32 {
        // write your answer here using multi-source BFS
        -1
    }
}`,
};

const SOLUTION_CODE: Record<LanguageKey, string> = {
  javascript: `function orangesRotting(grid) {
  const rows = grid.length;
  const cols = grid[0].length;
  const queue = [];
  let fresh = 0;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] === 2) {
        queue.push([row, col, 0]);
      } else if (grid[row][col] === 1) {
        fresh++;
      }
    }
  }

  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  let minutes = 0;
  let head = 0;

  while (head < queue.length) {
    const [row, col, time] = queue[head];
    head++;
    minutes = Math.max(minutes, time);

    for (const [rowChange, colChange] of directions) {
      const nextRow = row + rowChange;
      const nextCol = col + colChange;

      const inBounds =
        nextRow >= 0 &&
        nextCol >= 0 &&
        nextRow < rows &&
        nextCol < cols;

      if (inBounds && grid[nextRow][nextCol] === 1) {
        grid[nextRow][nextCol] = 2;
        fresh--;
        queue.push([nextRow, nextCol, time + 1]);
      }
    }
  }

  return fresh === 0 ? minutes : -1;
}`,
  python: `from collections import deque

class Solution:
    def orangesRotting(self, grid: List[List[int]]) -> int:
        rows = len(grid)
        cols = len(grid[0])
        queue = deque()
        fresh = 0

        for row in range(rows):
            for col in range(cols):
                if grid[row][col] == 2:
                    queue.append((row, col, 0))
                elif grid[row][col] == 1:
                    fresh += 1

        directions = [(1, 0), (-1, 0), (0, 1), (0, -1)]
        minutes = 0

        while queue:
            row, col, time = queue.popleft()
            minutes = max(minutes, time)

            for row_change, col_change in directions:
                next_row = row + row_change
                next_col = col + col_change

                in_bounds = 0 <= next_row < rows and 0 <= next_col < cols

                if in_bounds and grid[next_row][next_col] == 1:
                    grid[next_row][next_col] = 2
                    fresh -= 1
                    queue.append((next_row, next_col, time + 1))

        return minutes if fresh == 0 else -1`,
  java: `class Solution {
    public int orangesRotting(int[][] grid) {
        int rows = grid.length;
        int cols = grid[0].length;
        Queue<int[]> queue = new LinkedList<>();
        int fresh = 0;

        for (int row = 0; row < rows; row++) {
            for (int col = 0; col < cols; col++) {
                if (grid[row][col] == 2) {
                    queue.offer(new int[] {row, col, 0});
                } else if (grid[row][col] == 1) {
                    fresh++;
                }
            }
        }

        int[][] directions = {{1,0}, {-1,0}, {0,1}, {0,-1}};
        int minutes = 0;

        while (!queue.isEmpty()) {
            int[] current = queue.poll();
            int row = current[0];
            int col = current[1];
            int time = current[2];
            minutes = Math.max(minutes, time);

            for (int[] direction : directions) {
                int nextRow = row + direction[0];
                int nextCol = col + direction[1];

                boolean inBounds =
                    nextRow >= 0 &&
                    nextCol >= 0 &&
                    nextRow < rows &&
                    nextCol < cols;

                if (inBounds && grid[nextRow][nextCol] == 1) {
                    grid[nextRow][nextCol] = 2;
                    fresh--;
                    queue.offer(new int[] {nextRow, nextCol, time + 1});
                }
            }
        }

        return fresh == 0 ? minutes : -1;
    }
}`,
  cpp: `class Solution {
public:
    int orangesRotting(vector<vector<int>>& grid) {
        int rows = grid.size();
        int cols = grid[0].size();
        queue<vector<int>> q;
        int fresh = 0;

        for (int row = 0; row < rows; row++) {
            for (int col = 0; col < cols; col++) {
                if (grid[row][col] == 2) {
                    q.push({row, col, 0});
                } else if (grid[row][col] == 1) {
                    fresh++;
                }
            }
        }

        vector<pair<int, int>> directions = {{1,0}, {-1,0}, {0,1}, {0,-1}};
        int minutes = 0;

        while (!q.empty()) {
            vector<int> current = q.front();
            q.pop();

            int row = current[0];
            int col = current[1];
            int time = current[2];
            minutes = max(minutes, time);

            for (auto [rowChange, colChange] : directions) {
                int nextRow = row + rowChange;
                int nextCol = col + colChange;

                bool inBounds =
                    nextRow >= 0 &&
                    nextCol >= 0 &&
                    nextRow < rows &&
                    nextCol < cols;

                if (inBounds && grid[nextRow][nextCol] == 1) {
                    grid[nextRow][nextCol] = 2;
                    fresh--;
                    q.push({nextRow, nextCol, time + 1});
                }
            }
        }

        return fresh == 0 ? minutes : -1;
    }
};`,
  typescript: `function orangesRotting(grid: number[][]): number {
  const rows = grid.length;
  const cols = grid[0].length;
  const queue: number[][] = [];
  let fresh = 0;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] === 2) {
        queue.push([row, col, 0]);
      } else if (grid[row][col] === 1) {
        fresh++;
      }
    }
  }

  const directions = [[1,0], [-1,0], [0,1], [0,-1]];
  let minutes = 0;
  let head = 0;

  while (head < queue.length) {
    const [row, col, time] = queue[head];
    head++;
    minutes = Math.max(minutes, time);

    for (const [rowChange, colChange] of directions) {
      const nextRow = row + rowChange;
      const nextCol = col + colChange;

      const inBounds =
        nextRow >= 0 &&
        nextCol >= 0 &&
        nextRow < rows &&
        nextCol < cols;

      if (inBounds && grid[nextRow][nextCol] === 1) {
        grid[nextRow][nextCol] = 2;
        fresh--;
        queue.push([nextRow, nextCol, time + 1]);
      }
    }
  }

  return fresh === 0 ? minutes : -1;
}`,
  go: `func orangesRotting(grid [][]int) int {
    rows := len(grid)
    cols := len(grid[0])
    queue := [][]int{}
    fresh := 0

    for row := 0; row < rows; row++ {
        for col := 0; col < cols; col++ {
            if grid[row][col] == 2 {
                queue = append(queue, []int{row, col, 0})
            } else if grid[row][col] == 1 {
                fresh++
            }
        }
    }

    directions := [][]int{{1,0}, {-1,0}, {0,1}, {0,-1}}
    minutes := 0
    head := 0

    for head < len(queue) {
        current := queue[head]
        head++

        row := current[0]
        col := current[1]
        time := current[2]

        if time > minutes {
            minutes = time
        }

        for _, direction := range directions {
            nextRow := row + direction[0]
            nextCol := col + direction[1]

            inBounds :=
                nextRow >= 0 &&
                nextCol >= 0 &&
                nextRow < rows &&
                nextCol < cols

            if inBounds && grid[nextRow][nextCol] == 1 {
                grid[nextRow][nextCol] = 2
                fresh--
                queue = append(queue, []int{nextRow, nextCol, time + 1})
            }
        }
    }

    if fresh == 0 {
        return minutes
    }

    return -1
}`,
  csharp: `public class Solution {
    public int OrangesRotting(int[][] grid) {
        int rows = grid.Length;
        int cols = grid[0].Length;
        Queue<int[]> queue = new Queue<int[]>();
        int fresh = 0;

        for (int row = 0; row < rows; row++) {
            for (int col = 0; col < cols; col++) {
                if (grid[row][col] == 2) {
                    queue.Enqueue(new int[] {row, col, 0});
                } else if (grid[row][col] == 1) {
                    fresh++;
                }
            }
        }

        int[][] directions = new int[][] {
            new int[] {1, 0},
            new int[] {-1, 0},
            new int[] {0, 1},
            new int[] {0, -1}
        };

        int minutes = 0;

        while (queue.Count > 0) {
            int[] current = queue.Dequeue();
            int row = current[0];
            int col = current[1];
            int time = current[2];

            minutes = Math.Max(minutes, time);

            foreach (int[] direction in directions) {
                int nextRow = row + direction[0];
                int nextCol = col + direction[1];

                bool inBounds =
                    nextRow >= 0 &&
                    nextCol >= 0 &&
                    nextRow < rows &&
                    nextCol < cols;

                if (inBounds && grid[nextRow][nextCol] == 1) {
                    grid[nextRow][nextCol] = 2;
                    fresh--;
                    queue.Enqueue(new int[] {nextRow, nextCol, time + 1});
                }
            }
        }

        return fresh == 0 ? minutes : -1;
    }
}`,
  rust: `use std::collections::VecDeque;

impl Solution {
    pub fn oranges_rotting(mut grid: Vec<Vec<i32>>) -> i32 {
        let rows = grid.len();
        let cols = grid[0].len();
        let mut queue = VecDeque::new();
        let mut fresh = 0;

        for row in 0..rows {
            for col in 0..cols {
                if grid[row][col] == 2 {
                    queue.push_back((row as i32, col as i32, 0));
                } else if grid[row][col] == 1 {
                    fresh += 1;
                }
            }
        }

        let directions = vec![(1,0), (-1,0), (0,1), (0,-1)];
        let mut minutes = 0;

        while let Some((row, col, time)) = queue.pop_front() {
            minutes = minutes.max(time);

            for (row_change, col_change) in &directions {
                let next_row = row + row_change;
                let next_col = col + col_change;

                if next_row >= 0 &&
                   next_col >= 0 &&
                   next_row < rows as i32 &&
                   next_col < cols as i32 {
                    let r = next_row as usize;
                    let c = next_col as usize;

                    if grid[r][c] == 1 {
                        grid[r][c] = 2;
                        fresh -= 1;
                        queue.push_back((next_row, next_col, time + 1));
                    }
                }
            }
        }

        if fresh == 0 { minutes } else { -1 }
    }
}`,
};

const TEST_CASES: TestCase[] = [
  {
    id: 1,
    grid: [
      [2, 1, 1],
      [1, 1, 0],
      [0, 1, 1],
    ],
    expected: 4,
  },
  {
    id: 2,
    grid: [
      [2, 1, 1],
      [0, 1, 1],
      [1, 0, 1],
    ],
    expected: -1,
  },
  {
    id: 3,
    grid: [[0, 2]],
    expected: 0,
  },
  {
    id: 4,
    grid: [[1]],
    expected: -1,
  },
  {
    id: 5,
    grid: [
      [2, 2],
      [1, 1],
      [0, 1],
    ],
    expected: 2,
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
    const orangesRotting = new Function(`
      "use strict";
      ${code}
      return orangesRotting;
    `)() as (grid: number[][]) => number;

    if (typeof orangesRotting !== "function") {
      return {
        pass: false,
        actual: 0,
        error: "orangesRotting function was not found. Keep the function named orangesRotting.",
      };
    }

    const actual = orangesRotting(cloneGrid(test.grid));

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

export default function RottingOrangesPracticePage() {
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
          ? "Not accepted yet. Implement orangesRotting, then run again."
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
                  MULTI-SOURCE
                </span>
              </div>

              <div className="mb-3 flex items-center gap-3">
                <span className="text-5xl font-bold leading-none text-primary">$</span>
                <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                  Rotting Oranges
                </h1>
              </div>

              <p className="max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
                Multi-source BFS starts with every rotten orange already in the queue.
              </p>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              <div className="mb-4 text-[10px] font-bold tracking-[0.35em] text-muted-foreground">
                DESCRIPTION
              </div>

              <div className="space-y-5 text-sm leading-7 text-muted-foreground">
                <div className="terminal-frame p-4">
                  <p>
                    Given a grid where <span className="text-foreground">0</span> is empty,{" "}
                    <span className="text-foreground">1</span> is fresh, and{" "}
                    <span className="text-foreground">2</span> is rotten, return the minimum minutes until every orange is rotten.
                  </p>
                  <p className="mt-2">
                    If some fresh orange can never be reached, return <span className="text-foreground">-1</span>.
                  </p>
                  <p className="mt-2">
                    This is multi-source BFS because every rotten orange spreads at the same time.
                  </p>
                </div>

                <div className="terminal-frame p-4">
                  <h2 className="mb-3 text-xl font-bold text-foreground">Example</h2>
                  <pre className="overflow-x-auto whitespace-pre-wrap text-xs leading-6 md:text-sm">
{`Input:
[
  [2,1,1],
  [1,1,0],
  [0,1,1]
]

Output: 4`}
                  </pre>
                </div>

                <div className="terminal-frame p-4">
                  <h2 className="mb-3 text-xl font-bold text-foreground">BFS Pattern</h2>
                  <ul className="list-disc space-y-2 pl-5">
                    <li>Add every rotten orange to the queue first</li>
                    <li>Count all fresh oranges</li>
                    <li>Spread rot level by level</li>
                    <li>Return minutes if no fresh oranges remain, otherwise -1</li>
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
                  <p className="mt-3">Expected approach: multi-source BFS</p>
                  <p>Time: O(rows × cols)</p>
                  <p>Space: O(rows × cols)</p>
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
