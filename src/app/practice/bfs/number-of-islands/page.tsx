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
  grid: string[][];
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
  javascript: `function numIslands(grid) {
  // write your answer here using BFS
  throw new Error("Implement numIslands first");
}`,
  python: `class Solution:
    def numIslands(self, grid: List[List[str]]) -> int:
        # write your answer here using BFS
        return 0`,
  java: `class Solution {
    public int numIslands(char[][] grid) {
        // write your answer here using BFS
        return 0;
    }
}`,
  cpp: `class Solution {
public:
    int numIslands(vector<vector<char>>& grid) {
        // write your answer here using BFS
        return 0;
    }
};`,
  typescript: `function numIslands(grid: string[][]): number {
  // write your answer here using BFS
  throw new Error("Implement numIslands first");
}`,
  go: `func numIslands(grid [][]byte) int {
    // write your answer here using BFS
    return 0
}`,
  csharp: `public class Solution {
    public int NumIslands(char[][] grid) {
        // write your answer here using BFS
        return 0;
    }
}`,
  rust: `impl Solution {
    pub fn num_islands(grid: Vec<Vec<char>>) -> i32 {
        // write your answer here using BFS
        0
    }
}`,
};

const SOLUTION_CODE: Record<LanguageKey, string> = {
  javascript: `function numIslands(grid) {
  if (grid.length === 0) {
    return 0;
  }

  const rows = grid.length;
  const cols = grid[0].length;
  let islands = 0;

  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] === "1") {
        islands++;
        grid[row][col] = "0";

        const queue = [[row, col]];
        let head = 0;

        while (head < queue.length) {
          const [currentRow, currentCol] = queue[head];
          head++;

          for (const [rowChange, colChange] of directions) {
            const nextRow = currentRow + rowChange;
            const nextCol = currentCol + colChange;

            const inBounds =
              nextRow >= 0 &&
              nextCol >= 0 &&
              nextRow < rows &&
              nextCol < cols;

            if (inBounds && grid[nextRow][nextCol] === "1") {
              grid[nextRow][nextCol] = "0";
              queue.push([nextRow, nextCol]);
            }
          }
        }
      }
    }
  }

  return islands;
}`,
  python: `from collections import deque

class Solution:
    def numIslands(self, grid: List[List[str]]) -> int:
        if not grid:
            return 0

        rows = len(grid)
        cols = len(grid[0])
        islands = 0
        directions = [(1, 0), (-1, 0), (0, 1), (0, -1)]

        for row in range(rows):
            for col in range(cols):
                if grid[row][col] == "1":
                    islands += 1
                    grid[row][col] = "0"
                    queue = deque([(row, col)])

                    while queue:
                        current_row, current_col = queue.popleft()

                        for row_change, col_change in directions:
                            next_row = current_row + row_change
                            next_col = current_col + col_change

                            in_bounds = (
                                0 <= next_row < rows and
                                0 <= next_col < cols
                            )

                            if in_bounds and grid[next_row][next_col] == "1":
                                grid[next_row][next_col] = "0"
                                queue.append((next_row, next_col))

        return islands`,
  java: `class Solution {
    public int numIslands(char[][] grid) {
        if (grid.length == 0) {
            return 0;
        }

        int rows = grid.length;
        int cols = grid[0].length;
        int islands = 0;

        int[][] directions = {
            {1, 0},
            {-1, 0},
            {0, 1},
            {0, -1}
        };

        for (int row = 0; row < rows; row++) {
            for (int col = 0; col < cols; col++) {
                if (grid[row][col] == '1') {
                    islands++;
                    grid[row][col] = '0';

                    Queue<int[]> queue = new LinkedList<>();
                    queue.offer(new int[] {row, col});

                    while (!queue.isEmpty()) {
                        int[] current = queue.poll();
                        int currentRow = current[0];
                        int currentCol = current[1];

                        for (int[] direction : directions) {
                            int nextRow = currentRow + direction[0];
                            int nextCol = currentCol + direction[1];

                            boolean inBounds =
                                nextRow >= 0 &&
                                nextCol >= 0 &&
                                nextRow < rows &&
                                nextCol < cols;

                            if (inBounds && grid[nextRow][nextCol] == '1') {
                                grid[nextRow][nextCol] = '0';
                                queue.offer(new int[] {nextRow, nextCol});
                            }
                        }
                    }
                }
            }
        }

        return islands;
    }
}`,
  cpp: `class Solution {
public:
    int numIslands(vector<vector<char>>& grid) {
        if (grid.empty()) {
            return 0;
        }

        int rows = grid.size();
        int cols = grid[0].size();
        int islands = 0;

        vector<pair<int, int>> directions = {
            {1, 0},
            {-1, 0},
            {0, 1},
            {0, -1}
        };

        for (int row = 0; row < rows; row++) {
            for (int col = 0; col < cols; col++) {
                if (grid[row][col] == '1') {
                    islands++;
                    grid[row][col] = '0';

                    queue<pair<int, int>> q;
                    q.push({row, col});

                    while (!q.empty()) {
                        auto [currentRow, currentCol] = q.front();
                        q.pop();

                        for (auto [rowChange, colChange] : directions) {
                            int nextRow = currentRow + rowChange;
                            int nextCol = currentCol + colChange;

                            bool inBounds =
                                nextRow >= 0 &&
                                nextCol >= 0 &&
                                nextRow < rows &&
                                nextCol < cols;

                            if (inBounds && grid[nextRow][nextCol] == '1') {
                                grid[nextRow][nextCol] = '0';
                                q.push({nextRow, nextCol});
                            }
                        }
                    }
                }
            }
        }

        return islands;
    }
};`,
  typescript: `function numIslands(grid: string[][]): number {
  if (grid.length === 0) {
    return 0;
  }

  const rows = grid.length;
  const cols = grid[0].length;
  let islands = 0;

  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] === "1") {
        islands++;
        grid[row][col] = "0";

        const queue: number[][] = [[row, col]];
        let head = 0;

        while (head < queue.length) {
          const [currentRow, currentCol] = queue[head];
          head++;

          for (const [rowChange, colChange] of directions) {
            const nextRow = currentRow + rowChange;
            const nextCol = currentCol + colChange;

            const inBounds =
              nextRow >= 0 &&
              nextCol >= 0 &&
              nextRow < rows &&
              nextCol < cols;

            if (inBounds && grid[nextRow][nextCol] === "1") {
              grid[nextRow][nextCol] = "0";
              queue.push([nextRow, nextCol]);
            }
          }
        }
      }
    }
  }

  return islands;
}`,
  go: `func numIslands(grid [][]byte) int {
    if len(grid) == 0 {
        return 0
    }

    rows := len(grid)
    cols := len(grid[0])
    islands := 0

    directions := [][]int{
        {1, 0},
        {-1, 0},
        {0, 1},
        {0, -1},
    }

    for row := 0; row < rows; row++ {
        for col := 0; col < cols; col++ {
            if grid[row][col] == '1' {
                islands++
                grid[row][col] = '0'

                queue := [][]int{{row, col}}
                head := 0

                for head < len(queue) {
                    current := queue[head]
                    head++

                    for _, direction := range directions {
                        nextRow := current[0] + direction[0]
                        nextCol := current[1] + direction[1]

                        inBounds :=
                            nextRow >= 0 &&
                            nextCol >= 0 &&
                            nextRow < rows &&
                            nextCol < cols

                        if inBounds && grid[nextRow][nextCol] == '1' {
                            grid[nextRow][nextCol] = '0'
                            queue = append(queue, []int{nextRow, nextCol})
                        }
                    }
                }
            }
        }
    }

    return islands
}`,
  csharp: `public class Solution {
    public int NumIslands(char[][] grid) {
        if (grid.Length == 0) {
            return 0;
        }

        int rows = grid.Length;
        int cols = grid[0].Length;
        int islands = 0;

        int[][] directions = new int[][] {
            new int[] {1, 0},
            new int[] {-1, 0},
            new int[] {0, 1},
            new int[] {0, -1}
        };

        for (int row = 0; row < rows; row++) {
            for (int col = 0; col < cols; col++) {
                if (grid[row][col] == '1') {
                    islands++;
                    grid[row][col] = '0';

                    Queue<int[]> queue = new Queue<int[]>();
                    queue.Enqueue(new int[] {row, col});

                    while (queue.Count > 0) {
                        int[] current = queue.Dequeue();
                        int currentRow = current[0];
                        int currentCol = current[1];

                        foreach (int[] direction in directions) {
                            int nextRow = currentRow + direction[0];
                            int nextCol = currentCol + direction[1];

                            bool inBounds =
                                nextRow >= 0 &&
                                nextCol >= 0 &&
                                nextRow < rows &&
                                nextCol < cols;

                            if (inBounds && grid[nextRow][nextCol] == '1') {
                                grid[nextRow][nextCol] = '0';
                                queue.Enqueue(new int[] {nextRow, nextCol});
                            }
                        }
                    }
                }
            }
        }

        return islands;
    }
}`,
  rust: `use std::collections::VecDeque;

impl Solution {
    pub fn num_islands(mut grid: Vec<Vec<char>>) -> i32 {
        if grid.is_empty() {
            return 0;
        }

        let rows = grid.len();
        let cols = grid[0].len();
        let mut islands = 0;

        let directions = vec![(1, 0), (-1, 0), (0, 1), (0, -1)];

        for row in 0..rows {
            for col in 0..cols {
                if grid[row][col] == '1' {
                    islands += 1;
                    grid[row][col] = '0';

                    let mut queue = VecDeque::new();
                    queue.push_back((row as i32, col as i32));

                    while let Some((current_row, current_col)) = queue.pop_front() {
                        for (row_change, col_change) in &directions {
                            let next_row = current_row + row_change;
                            let next_col = current_col + col_change;

                            if next_row >= 0 &&
                               next_col >= 0 &&
                               next_row < rows as i32 &&
                               next_col < cols as i32 {
                                let r = next_row as usize;
                                let c = next_col as usize;

                                if grid[r][c] == '1' {
                                    grid[r][c] = '0';
                                    queue.push_back((next_row, next_col));
                                }
                            }
                        }
                    }
                }
            }
        }

        islands
    }
}`,
};

const TEST_CASES: TestCase[] = [
  {
    id: 1,
    grid: [
      ["1", "1", "1", "1", "0"],
      ["1", "1", "0", "1", "0"],
      ["1", "1", "0", "0", "0"],
      ["0", "0", "0", "0", "0"],
    ],
    expected: 1,
  },
  {
    id: 2,
    grid: [
      ["1", "1", "0", "0", "0"],
      ["1", "1", "0", "0", "0"],
      ["0", "0", "1", "0", "0"],
      ["0", "0", "0", "1", "1"],
    ],
    expected: 3,
  },
  {
    id: 3,
    grid: [["1"]],
    expected: 1,
  },
  {
    id: 4,
    grid: [["0"]],
    expected: 0,
  },
  {
    id: 5,
    grid: [
      ["1", "0", "1"],
      ["0", "1", "0"],
      ["1", "0", "1"],
    ],
    expected: 5,
  },
];

function getLanguageLabel(language: LanguageKey) {
  return LANGUAGES.find((item) => item.key === language)?.label ?? language;
}

function cloneGrid(grid: string[][]) {
  return grid.map((row) => [...row]);
}

function executeJavaScript(code: string, test: TestCase) {
  try {
    const numIslands = new Function(`
      "use strict";
      ${code}
      return numIslands;
    `)() as (grid: string[][]) => number;

    if (typeof numIslands !== "function") {
      return {
        pass: false,
        actual: 0,
        error: "numIslands function was not found. Keep the function named numIslands.",
      };
    }

    const actual = numIslands(cloneGrid(test.grid));

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

export default function BFSNumberOfIslandsPracticePage() {
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
          ? "Not accepted yet. Implement numIslands, then run again."
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
                <span className="border border-primary px-3 py-1 text-[10px] font-bold tracking-[0.25em] text-primary">
                  EASY
                </span>
                <span className="border border-border px-3 py-1 text-[10px] font-bold tracking-[0.25em] text-muted-foreground">
                  BFS
                </span>
                <span className="border border-border px-3 py-1 text-[10px] font-bold tracking-[0.25em] text-muted-foreground">
                  GRID
                </span>
              </div>

              <div className="mb-3 flex items-center gap-3">
                <span className="text-5xl font-bold leading-none text-primary">$</span>
                <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                  Number of Islands
                </h1>
              </div>

              <p className="max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
                Grid BFS flood fill from each unvisited land cell.
              </p>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              <div className="mb-4 text-[10px] font-bold tracking-[0.35em] text-muted-foreground">
                DESCRIPTION
              </div>

              <div className="space-y-5 text-sm leading-7 text-muted-foreground">
                <div className="terminal-frame p-4">
                  <p>
                    Given a grid of <span className="text-foreground">"1"</span>s and{" "}
                    <span className="text-foreground">"0"</span>s, count the number of islands.
                  </p>
                  <p className="mt-2">
                    Every time BFS starts from an unvisited <span className="text-foreground">"1"</span>, you found one island.
                  </p>
                  <p className="mt-2">
                    Mark cells as visited immediately when they enter the queue so they are not counted twice.
                  </p>
                </div>

                <div className="terminal-frame p-4">
                  <h2 className="mb-3 text-xl font-bold text-foreground">Example</h2>
                  <pre className="overflow-x-auto whitespace-pre-wrap text-xs leading-6 md:text-sm">
{`Input:
[
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]

Output: 3`}
                  </pre>
                </div>

                <div className="terminal-frame p-4">
                  <h2 className="mb-3 text-xl font-bold text-foreground">BFS Pattern</h2>
                  <ul className="list-disc space-y-2 pl-5">
                    <li>Scan the grid row by row</li>
                    <li>When you find land, increment island count</li>
                    <li>Push that cell into a queue</li>
                    <li>Expand level by level to consume the full island</li>
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
                  <p className="mt-3">Expected approach: BFS flood fill</p>
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
