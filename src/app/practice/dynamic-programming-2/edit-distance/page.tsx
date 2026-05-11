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
  word1: string;
  word2: string;
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
  javascript: `function minDistance(word1, word2) {
  // write your answer here using 2D DP
  throw new Error("Implement minDistance first");
}`,
  python: `class Solution:
    def minDistance(self, word1: str, word2: str) -> int:
        # write your answer here using 2D DP
        return 0`,
  java: `class Solution {
    public int minDistance(String word1, String word2) {
        // write your answer here using 2D DP
        return 0;
    }
}`,
  cpp: `class Solution {
public:
    int minDistance(string word1, string word2) {
        // write your answer here using 2D DP
        return 0;
    }
};`,
  typescript: `function minDistance(word1: string, word2: string): number {
  // write your answer here using 2D DP
  throw new Error("Implement minDistance first");
}`,
  go: `func minDistance(word1 string, word2 string) int {
    // write your answer here using 2D DP
    return 0
}`,
  csharp: `public class Solution {
    public int MinDistance(string word1, string word2) {
        // write your answer here using 2D DP
        return 0;
    }
}`,
  rust: `impl Solution {
    pub fn min_distance(word1: String, word2: String) -> i32 {
        // write your answer here using 2D DP
        0
    }
}`,
};

const SOLUTION_CODE: Record<LanguageKey, string> = {
  javascript: `function minDistance(word1, word2) {
  const rows = word1.length;
  const cols = word2.length;

  const dp = Array.from({ length: rows + 1 }, () =>
    new Array(cols + 1).fill(0)
  );

  for (let row = 0; row <= rows; row++) {
    dp[row][0] = row;
  }

  for (let col = 0; col <= cols; col++) {
    dp[0][col] = col;
  }

  for (let row = 1; row <= rows; row++) {
    for (let col = 1; col <= cols; col++) {
      if (word1[row - 1] === word2[col - 1]) {
        dp[row][col] = dp[row - 1][col - 1];
      } else {
        const insertCost = dp[row][col - 1];
        const deleteCost = dp[row - 1][col];
        const replaceCost = dp[row - 1][col - 1];

        dp[row][col] = 1 + Math.min(insertCost, deleteCost, replaceCost);
      }
    }
  }

  return dp[rows][cols];
}`,
  python: `class Solution:
    def minDistance(self, word1: str, word2: str) -> int:
        rows = len(word1)
        cols = len(word2)

        dp = [[0] * (cols + 1) for _ in range(rows + 1)]

        for row in range(rows + 1):
            dp[row][0] = row

        for col in range(cols + 1):
            dp[0][col] = col

        for row in range(1, rows + 1):
            for col in range(1, cols + 1):
                if word1[row - 1] == word2[col - 1]:
                    dp[row][col] = dp[row - 1][col - 1]
                else:
                    insert_cost = dp[row][col - 1]
                    delete_cost = dp[row - 1][col]
                    replace_cost = dp[row - 1][col - 1]

                    dp[row][col] = 1 + min(insert_cost, delete_cost, replace_cost)

        return dp[rows][cols]`,
  java: `class Solution {
    public int minDistance(String word1, String word2) {
        int rows = word1.length();
        int cols = word2.length();

        int[][] dp = new int[rows + 1][cols + 1];

        for (int row = 0; row <= rows; row++) {
            dp[row][0] = row;
        }

        for (int col = 0; col <= cols; col++) {
            dp[0][col] = col;
        }

        for (int row = 1; row <= rows; row++) {
            for (int col = 1; col <= cols; col++) {
                if (word1.charAt(row - 1) == word2.charAt(col - 1)) {
                    dp[row][col] = dp[row - 1][col - 1];
                } else {
                    int insertCost = dp[row][col - 1];
                    int deleteCost = dp[row - 1][col];
                    int replaceCost = dp[row - 1][col - 1];

                    dp[row][col] = 1 + Math.min(insertCost, Math.min(deleteCost, replaceCost));
                }
            }
        }

        return dp[rows][cols];
    }
}`,
  cpp: `class Solution {
public:
    int minDistance(string word1, string word2) {
        int rows = word1.size();
        int cols = word2.size();

        vector<vector<int>> dp(rows + 1, vector<int>(cols + 1, 0));

        for (int row = 0; row <= rows; row++) {
            dp[row][0] = row;
        }

        for (int col = 0; col <= cols; col++) {
            dp[0][col] = col;
        }

        for (int row = 1; row <= rows; row++) {
            for (int col = 1; col <= cols; col++) {
                if (word1[row - 1] == word2[col - 1]) {
                    dp[row][col] = dp[row - 1][col - 1];
                } else {
                    int insertCost = dp[row][col - 1];
                    int deleteCost = dp[row - 1][col];
                    int replaceCost = dp[row - 1][col - 1];

                    dp[row][col] = 1 + min({insertCost, deleteCost, replaceCost});
                }
            }
        }

        return dp[rows][cols];
    }
};`,
  typescript: `function minDistance(word1: string, word2: string): number {
  const rows = word1.length;
  const cols = word2.length;

  const dp: number[][] = Array.from({ length: rows + 1 }, () =>
    new Array(cols + 1).fill(0)
  );

  for (let row = 0; row <= rows; row++) {
    dp[row][0] = row;
  }

  for (let col = 0; col <= cols; col++) {
    dp[0][col] = col;
  }

  for (let row = 1; row <= rows; row++) {
    for (let col = 1; col <= cols; col++) {
      if (word1[row - 1] === word2[col - 1]) {
        dp[row][col] = dp[row - 1][col - 1];
      } else {
        const insertCost = dp[row][col - 1];
        const deleteCost = dp[row - 1][col];
        const replaceCost = dp[row - 1][col - 1];

        dp[row][col] = 1 + Math.min(insertCost, deleteCost, replaceCost);
      }
    }
  }

  return dp[rows][cols];
}`,
  go: `func minDistance(word1 string, word2 string) int {
    rows := len(word1)
    cols := len(word2)

    dp := make([][]int, rows + 1)

    for row := range dp {
        dp[row] = make([]int, cols + 1)
    }

    for row := 0; row <= rows; row++ {
        dp[row][0] = row
    }

    for col := 0; col <= cols; col++ {
        dp[0][col] = col
    }

    for row := 1; row <= rows; row++ {
        for col := 1; col <= cols; col++ {
            if word1[row - 1] == word2[col - 1] {
                dp[row][col] = dp[row - 1][col - 1]
            } else {
                insertCost := dp[row][col - 1]
                deleteCost := dp[row - 1][col]
                replaceCost := dp[row - 1][col - 1]

                best := insertCost
                if deleteCost < best {
                    best = deleteCost
                }
                if replaceCost < best {
                    best = replaceCost
                }

                dp[row][col] = 1 + best
            }
        }
    }

    return dp[rows][cols]
}`,
  csharp: `public class Solution {
    public int MinDistance(string word1, string word2) {
        int rows = word1.Length;
        int cols = word2.Length;

        int[,] dp = new int[rows + 1, cols + 1];

        for (int row = 0; row <= rows; row++) {
            dp[row, 0] = row;
        }

        for (int col = 0; col <= cols; col++) {
            dp[0, col] = col;
        }

        for (int row = 1; row <= rows; row++) {
            for (int col = 1; col <= cols; col++) {
                if (word1[row - 1] == word2[col - 1]) {
                    dp[row, col] = dp[row - 1, col - 1];
                } else {
                    int insertCost = dp[row, col - 1];
                    int deleteCost = dp[row - 1, col];
                    int replaceCost = dp[row - 1, col - 1];

                    dp[row, col] = 1 + Math.Min(insertCost, Math.Min(deleteCost, replaceCost));
                }
            }
        }

        return dp[rows, cols];
    }
}`,
  rust: `impl Solution {
    pub fn min_distance(word1: String, word2: String) -> i32 {
        let a = word1.as_bytes();
        let b = word2.as_bytes();

        let rows = a.len();
        let cols = b.len();

        let mut dp = vec![vec![0; cols + 1]; rows + 1];

        for row in 0..=rows {
            dp[row][0] = row as i32;
        }

        for col in 0..=cols {
            dp[0][col] = col as i32;
        }

        for row in 1..=rows {
            for col in 1..=cols {
                if a[row - 1] == b[col - 1] {
                    dp[row][col] = dp[row - 1][col - 1];
                } else {
                    let insert_cost = dp[row][col - 1];
                    let delete_cost = dp[row - 1][col];
                    let replace_cost = dp[row - 1][col - 1];

                    dp[row][col] = 1 + insert_cost.min(delete_cost).min(replace_cost);
                }
            }
        }

        dp[rows][cols]
    }
}`,
};

const TEST_CASES: TestCase[] = [
  { id: 1, word1: "horse", word2: "ros", expected: 3 },
  { id: 2, word1: "intention", word2: "execution", expected: 5 },
  { id: 3, word1: "", word2: "", expected: 0 },
  { id: 4, word1: "", word2: "abc", expected: 3 },
  { id: 5, word1: "abc", word2: "", expected: 3 },
  { id: 6, word1: "a", word2: "b", expected: 1 },
  { id: 7, word1: "leetcode", word2: "etco", expected: 4 },
];

function getLanguageLabel(language: LanguageKey) {
  return LANGUAGES.find((item) => item.key === language)?.label ?? language;
}

function executeJavaScript(code: string, test: TestCase) {
  try {
    const minDistance = new Function(`
      "use strict";
      ${code}
      return minDistance;
    `)() as (word1: string, word2: string) => number;

    if (typeof minDistance !== "function") {
      return {
        pass: false,
        actual: 0,
        error: "minDistance function was not found. Keep the function named minDistance.",
      };
    }

    const actual = minDistance(test.word1, test.word2);

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

export default function EditDistancePracticePage() {
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
        `word1: ${selectedCase.word1 || "empty string"}`,
        `word2: ${selectedCase.word2 || "empty string"}`,
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
        lines.push(`  word1: ${test.word1 || "empty string"}`);
        lines.push(`  word2: ${test.word2 || "empty string"}`);
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
          ? "Not accepted yet. Implement minDistance, then run again."
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
            <Link className="hover:text-primary" href="/learn/dynamic-programming-2">
              BACK TO LESSON
            </Link>
          </div>
        </div>

        <div className="grid h-[calc(100vh-96px)] min-h-[760px] gap-4 xl:grid-cols-[0.78fr_1.22fr]">
          <section className="flex min-h-0 flex-col overflow-hidden border border-border bg-black/20">
            <div className="border-b border-border bg-black/20 px-5 py-4">
              <div className="mb-3 flex gap-2">
                <span className="border border-yellow-400 px-3 py-1 text-[10px] font-bold tracking-[0.25em] text-yellow-400">
                  HARD
                </span>
                <span className="border border-border px-3 py-1 text-[10px] font-bold tracking-[0.25em] text-muted-foreground">
                  DP
                </span>
                <span className="border border-border px-3 py-1 text-[10px] font-bold tracking-[0.25em] text-muted-foreground">
                  STRING TABLE
                </span>
              </div>

              <div className="mb-3 flex items-center gap-3">
                <span className="text-5xl font-bold leading-none text-primary">$</span>
                <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                  Edit Distance
                </h1>
              </div>

              <p className="max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
                Another canonical string-to-string DP table.
              </p>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              <div className="mb-4 text-[10px] font-bold tracking-[0.35em] text-muted-foreground">
                DESCRIPTION
              </div>

              <div className="space-y-5 text-sm leading-7 text-muted-foreground">
                <div className="terminal-frame p-4">
                  <p>
                    Given two words, return the minimum number of operations needed to convert word1 into word2.
                  </p>
                  <p className="mt-2">
                    The allowed operations are insert, delete, and replace.
                  </p>
                  <p className="mt-2">
                    Use a 2D table where each cell represents the minimum edit distance between prefixes of both strings.
                  </p>
                </div>

                <div className="terminal-frame p-4">
                  <h2 className="mb-3 text-xl font-bold text-foreground">Example</h2>
                  <pre className="overflow-x-auto whitespace-pre-wrap text-xs leading-6 md:text-sm">
{`Input:
word1 = "horse"
word2 = "ros"

Output: 3

One valid path:
horse -> rorse
rorse -> rose
rose  -> ros`}
                  </pre>
                </div>

                <div className="terminal-frame p-4">
                  <h2 className="mb-3 text-xl font-bold text-foreground">DP Pattern</h2>
                  <ul className="list-disc space-y-2 pl-5">
                    <li>If characters match, copy the diagonal value</li>
                    <li>If characters differ, choose insert, delete, or replace</li>
                    <li>Base row means inserting characters into an empty string</li>
                    <li>Base column means deleting characters into an empty string</li>
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
                        <p className="text-foreground">word1: {test.word1 || "empty string"}</p>
                        <p className="mt-1 text-foreground">word2: {test.word2 || "empty string"}</p>
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
                  <p className="mt-3">Expected approach: 2D dynamic programming</p>
                  <p>Time: O(m × n)</p>
                  <p>Space: O(m × n)</p>
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
