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
  board: string[][];
  expected: string[][];
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
  javascript: `function solve(board) {
  // write your answer here
  throw new Error("Implement solve first");
}`,
  python: `class Solution:
    def solve(self, board: List[List[str]]) -> None:
        # write your answer here
        return`,
  java: `class Solution {
    public void solve(char[][] board) {
        // write your answer here
    }
}`,
  cpp: `class Solution {
public:
    void solve(vector<vector<char>>& board) {
        // write your answer here
    }
};`,
  typescript: `function solve(board: string[][]): void {
  // write your answer here
}`,
  go: `func solve(board [][]byte) {
    // write your answer here
}`,
  csharp: `public class Solution {
    public void Solve(char[][] board) {
        // write your answer here
    }
}`,
  rust: `impl Solution {
    pub fn solve(board: &mut Vec<Vec<char>>) {
        // write your answer here
    }
}`,
};

const SOLUTION_CODE: Record<LanguageKey, string> = {
  javascript: `function solve(board) {
  if (board.length === 0 || board[0].length === 0) {
    return;
  }

  const rows = board.length;
  const cols = board[0].length;

  function dfs(row, col) {
    const outOfBounds =
      row < 0 ||
      col < 0 ||
      row >= rows ||
      col >= cols;

    if (outOfBounds || board[row][col] !== "O") {
      return;
    }

    board[row][col] = "E";

    dfs(row + 1, col);
    dfs(row - 1, col);
    dfs(row, col + 1);
    dfs(row, col - 1);
  }

  for (let row = 0; row < rows; row++) {
    dfs(row, 0);
    dfs(row, cols - 1);
  }

  for (let col = 0; col < cols; col++) {
    dfs(0, col);
    dfs(rows - 1, col);
  }

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (board[row][col] === "O") {
        board[row][col] = "X";
      } else if (board[row][col] === "E") {
        board[row][col] = "O";
      }
    }
  }
}`,
  python: `class Solution:
    def solve(self, board: List[List[str]]) -> None:
        if not board or not board[0]:
            return

        rows = len(board)
        cols = len(board[0])

        def dfs(row, col):
            if (
                row < 0 or
                col < 0 or
                row >= rows or
                col >= cols or
                board[row][col] != "O"
            ):
                return

            board[row][col] = "E"

            dfs(row + 1, col)
            dfs(row - 1, col)
            dfs(row, col + 1)
            dfs(row, col - 1)

        for row in range(rows):
            dfs(row, 0)
            dfs(row, cols - 1)

        for col in range(cols):
            dfs(0, col)
            dfs(rows - 1, col)

        for row in range(rows):
            for col in range(cols):
                if board[row][col] == "O":
                    board[row][col] = "X"
                elif board[row][col] == "E":
                    board[row][col] = "O"`,
  java: `class Solution {
    public void solve(char[][] board) {
        if (board.length == 0 || board[0].length == 0) {
            return;
        }

        int rows = board.length;
        int cols = board[0].length;

        for (int row = 0; row < rows; row++) {
            dfs(board, row, 0);
            dfs(board, row, cols - 1);
        }

        for (int col = 0; col < cols; col++) {
            dfs(board, 0, col);
            dfs(board, rows - 1, col);
        }

        for (int row = 0; row < rows; row++) {
            for (int col = 0; col < cols; col++) {
                if (board[row][col] == 'O') {
                    board[row][col] = 'X';
                } else if (board[row][col] == 'E') {
                    board[row][col] = 'O';
                }
            }
        }
    }

    private void dfs(char[][] board, int row, int col) {
        boolean outOfBounds =
            row < 0 ||
            col < 0 ||
            row >= board.length ||
            col >= board[0].length;

        if (outOfBounds || board[row][col] != 'O') {
            return;
        }

        board[row][col] = 'E';

        dfs(board, row + 1, col);
        dfs(board, row - 1, col);
        dfs(board, row, col + 1);
        dfs(board, row, col - 1);
    }
}`,
  cpp: `class Solution {
public:
    void solve(vector<vector<char>>& board) {
        if (board.empty() || board[0].empty()) {
            return;
        }

        int rows = board.size();
        int cols = board[0].size();

        for (int row = 0; row < rows; row++) {
            dfs(board, row, 0);
            dfs(board, row, cols - 1);
        }

        for (int col = 0; col < cols; col++) {
            dfs(board, 0, col);
            dfs(board, rows - 1, col);
        }

        for (int row = 0; row < rows; row++) {
            for (int col = 0; col < cols; col++) {
                if (board[row][col] == 'O') {
                    board[row][col] = 'X';
                } else if (board[row][col] == 'E') {
                    board[row][col] = 'O';
                }
            }
        }
    }

private:
    void dfs(vector<vector<char>>& board, int row, int col) {
        bool outOfBounds =
            row < 0 ||
            col < 0 ||
            row >= board.size() ||
            col >= board[0].size();

        if (outOfBounds || board[row][col] != 'O') {
            return;
        }

        board[row][col] = 'E';

        dfs(board, row + 1, col);
        dfs(board, row - 1, col);
        dfs(board, row, col + 1);
        dfs(board, row, col - 1);
    }
};`,
  typescript: `function solve(board: string[][]): void {
  if (board.length === 0 || board[0].length === 0) {
    return;
  }

  const rows = board.length;
  const cols = board[0].length;

  function dfs(row: number, col: number): void {
    const outOfBounds =
      row < 0 ||
      col < 0 ||
      row >= rows ||
      col >= cols;

    if (outOfBounds || board[row][col] !== "O") {
      return;
    }

    board[row][col] = "E";

    dfs(row + 1, col);
    dfs(row - 1, col);
    dfs(row, col + 1);
    dfs(row, col - 1);
  }

  for (let row = 0; row < rows; row++) {
    dfs(row, 0);
    dfs(row, cols - 1);
  }

  for (let col = 0; col < cols; col++) {
    dfs(0, col);
    dfs(rows - 1, col);
  }

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (board[row][col] === "O") {
        board[row][col] = "X";
      } else if (board[row][col] === "E") {
        board[row][col] = "O";
      }
    }
  }
}`,
  go: `func solve(board [][]byte) {
    if len(board) == 0 || len(board[0]) == 0 {
        return
    }

    rows := len(board)
    cols := len(board[0])

    var dfs func(int, int)
    dfs = func(row int, col int) {
        if row < 0 || col < 0 || row >= rows || col >= cols || board[row][col] != 'O' {
            return
        }

        board[row][col] = 'E'

        dfs(row + 1, col)
        dfs(row - 1, col)
        dfs(row, col + 1)
        dfs(row, col - 1)
    }

    for row := 0; row < rows; row++ {
        dfs(row, 0)
        dfs(row, cols - 1)
    }

    for col := 0; col < cols; col++ {
        dfs(0, col)
        dfs(rows - 1, col)
    }

    for row := 0; row < rows; row++ {
        for col := 0; col < cols; col++ {
            if board[row][col] == 'O' {
                board[row][col] = 'X'
            } else if board[row][col] == 'E' {
                board[row][col] = 'O'
            }
        }
    }
}`,
  csharp: `public class Solution {
    public void Solve(char[][] board) {
        if (board.Length == 0 || board[0].Length == 0) {
            return;
        }

        int rows = board.Length;
        int cols = board[0].Length;

        void Dfs(int row, int col) {
            bool outOfBounds =
                row < 0 ||
                col < 0 ||
                row >= rows ||
                col >= cols;

            if (outOfBounds || board[row][col] != 'O') {
                return;
            }

            board[row][col] = 'E';

            Dfs(row + 1, col);
            Dfs(row - 1, col);
            Dfs(row, col + 1);
            Dfs(row, col - 1);
        }

        for (int row = 0; row < rows; row++) {
            Dfs(row, 0);
            Dfs(row, cols - 1);
        }

        for (int col = 0; col < cols; col++) {
            Dfs(0, col);
            Dfs(rows - 1, col);
        }

        for (int row = 0; row < rows; row++) {
            for (int col = 0; col < cols; col++) {
                if (board[row][col] == 'O') {
                    board[row][col] = 'X';
                } else if (board[row][col] == 'E') {
                    board[row][col] = 'O';
                }
            }
        }
    }
}`,
  rust: `impl Solution {
    pub fn solve(board: &mut Vec<Vec<char>>) {
        if board.is_empty() || board[0].is_empty() {
            return;
        }

        let rows = board.len();
        let cols = board[0].len();

        fn dfs(board: &mut Vec<Vec<char>>, row: i32, col: i32, rows: i32, cols: i32) {
            if row < 0 || col < 0 || row >= rows || col >= cols {
                return;
            }

            let r = row as usize;
            let c = col as usize;

            if board[r][c] != 'O' {
                return;
            }

            board[r][c] = 'E';

            dfs(board, row + 1, col, rows, cols);
            dfs(board, row - 1, col, rows, cols);
            dfs(board, row, col + 1, rows, cols);
            dfs(board, row, col - 1, rows, cols);
        }

        for row in 0..rows {
            dfs(board, row as i32, 0, rows as i32, cols as i32);
            dfs(board, row as i32, cols as i32 - 1, rows as i32, cols as i32);
        }

        for col in 0..cols {
            dfs(board, 0, col as i32, rows as i32, cols as i32);
            dfs(board, rows as i32 - 1, col as i32, rows as i32, cols as i32);
        }

        for row in 0..rows {
            for col in 0..cols {
                if board[row][col] == 'O' {
                    board[row][col] = 'X';
                } else if board[row][col] == 'E' {
                    board[row][col] = 'O';
                }
            }
        }
    }
}`,
};

const TEST_CASES: TestCase[] = [
  {
    id: 1,
    board: [
      ["X", "X", "X", "X"],
      ["X", "O", "O", "X"],
      ["X", "X", "O", "X"],
      ["X", "O", "X", "X"],
    ],
    expected: [
      ["X", "X", "X", "X"],
      ["X", "X", "X", "X"],
      ["X", "X", "X", "X"],
      ["X", "O", "X", "X"],
    ],
  },
  {
    id: 2,
    board: [["X"]],
    expected: [["X"]],
  },
  {
    id: 3,
    board: [["O"]],
    expected: [["O"]],
  },
  {
    id: 4,
    board: [
      ["O", "O"],
      ["O", "O"],
    ],
    expected: [
      ["O", "O"],
      ["O", "O"],
    ],
  },
  {
    id: 5,
    board: [
      ["X", "O", "X"],
      ["O", "X", "O"],
      ["X", "O", "X"],
    ],
    expected: [
      ["X", "O", "X"],
      ["O", "X", "O"],
      ["X", "O", "X"],
    ],
  },
  {
    id: 6,
    board: [
      ["X", "X", "X", "X", "X"],
      ["X", "O", "O", "O", "X"],
      ["X", "O", "X", "O", "X"],
      ["X", "O", "O", "O", "X"],
      ["X", "X", "X", "X", "X"],
    ],
    expected: [
      ["X", "X", "X", "X", "X"],
      ["X", "X", "X", "X", "X"],
      ["X", "X", "X", "X", "X"],
      ["X", "X", "X", "X", "X"],
      ["X", "X", "X", "X", "X"],
    ],
  },
];

function getLanguageLabel(language: LanguageKey) {
  return LANGUAGES.find((item) => item.key === language)?.label ?? language;
}

function cloneBoard(board: string[][]) {
  return board.map((row) => [...row]);
}

function boardsEqual(a: string[][], b: string[][]) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function executeJavaScript(code: string, test: TestCase) {
  try {
    const solve = new Function(`
      "use strict";
      ${code}
      return solve;
    `)() as (board: string[][]) => string[][] | void;

    if (typeof solve !== "function") {
      return {
        pass: false,
        actual: [] as string[][],
        error: "solve function was not found. Keep the function named solve.",
      };
    }

    const board = cloneBoard(test.board);
    const returned = solve(board);
    const actual = Array.isArray(returned) ? returned : board;

    return {
      pass: boardsEqual(actual, test.expected),
      actual,
      error: "",
    };
  } catch (error) {
    return {
      pass: false,
      actual: [] as string[][],
      error: error instanceof Error ? error.message : "Unknown runtime error.",
    };
  }
}

export default function SurroundedRegionsPracticePage() {
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
        `board: ${JSON.stringify(selectedCase.board)}`,
        `expected: ${JSON.stringify(selectedCase.expected)}`,
        `got: ${result.error ? "runtime error" : JSON.stringify(result.actual)}`,
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
        lines.push(`  board: ${JSON.stringify(test.board)}`);
        lines.push(`  expected: ${JSON.stringify(test.expected)}`);
        lines.push(`  got: ${result.error ? "runtime error" : JSON.stringify(result.actual)}`);
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
          ? "Not accepted yet. Implement solve, then run again."
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
            <Link className="hover:text-primary" href="/learn/dfs">
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
                  DFS
                </span>
                <span className="border border-border px-3 py-1 text-[10px] font-bold tracking-[0.25em] text-muted-foreground">
                  BOUNDARY
                </span>
              </div>

              <div className="mb-3 flex items-center gap-3">
                <span className="text-5xl font-bold leading-none text-primary">$</span>
                <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                  Surrounded Regions
                </h1>
              </div>

              <p className="max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
                Preserve boundary-connected cells first, then flip the captured interior regions.
              </p>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              <div className="mb-4 text-[10px] font-bold tracking-[0.35em] text-muted-foreground">
                DESCRIPTION
              </div>

              <div className="space-y-5 text-sm leading-7 text-muted-foreground">
                <div className="terminal-frame p-4">
                  <p>
                    Given a board containing <span className="text-foreground">"X"</span> and{" "}
                    <span className="text-foreground">"O"</span>, capture all surrounded regions.
                  </p>
                  <p className="mt-2">
                    Any <span className="text-foreground">"O"</span> connected to the boundary cannot be captured.
                  </p>
                  <p className="mt-2">
                    Mark boundary-connected cells first, then flip only the remaining interior{" "}
                    <span className="text-foreground">"O"</span> cells.
                  </p>
                </div>

                <div className="terminal-frame p-4">
                  <h2 className="mb-3 text-xl font-bold text-foreground">Example</h2>
                  <pre className="overflow-x-auto whitespace-pre-wrap text-xs leading-6 md:text-sm">
{`Input:
[
  ["X","X","X","X"],
  ["X","O","O","X"],
  ["X","X","O","X"],
  ["X","O","X","X"]
]

Output:
[
  ["X","X","X","X"],
  ["X","X","X","X"],
  ["X","X","X","X"],
  ["X","O","X","X"]
]`}
                  </pre>
                </div>

                <div className="terminal-frame p-4">
                  <h2 className="mb-3 text-xl font-bold text-foreground">Boundary DFS Pattern</h2>
                  <ul className="list-disc space-y-2 pl-5">
                    <li>DFS from every boundary O</li>
                    <li>Temporarily mark safe cells as E</li>
                    <li>Flip remaining O cells to X</li>
                    <li>Restore E cells back to O</li>
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
                        <p className="text-foreground">board:</p>
                        <pre className="mt-1 max-h-28 overflow-auto whitespace-pre-wrap break-words">
                          {JSON.stringify(test.board)}
                        </pre>
                        <p className="mt-2 text-foreground">expected:</p>
                        <pre className="mt-1 max-h-28 overflow-auto whitespace-pre-wrap break-words">
                          {JSON.stringify(test.expected)}
                        </pre>
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
                  <p className="mt-3">Expected approach: boundary DFS</p>
                  <p>Time: O(rows × cols)</p>
                  <p>Space: O(rows × cols) worst case recursion</p>
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
