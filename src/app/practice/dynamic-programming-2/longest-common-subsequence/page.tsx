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
  text1: string;
  text2: string;
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
  javascript: `function longestCommonSubsequence(text1, text2) {
  // write your answer here using 2D DP
  throw new Error("Implement longestCommonSubsequence first");
}`,
  python: `class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        # write your answer here using 2D DP
        return 0`,
  java: `class Solution {
    public int longestCommonSubsequence(String text1, String text2) {
        // write your answer here using 2D DP
        return 0;
    }
}`,
  cpp: `class Solution {
public:
    int longestCommonSubsequence(string text1, string text2) {
        // write your answer here using 2D DP
        return 0;
    }
};`,
  typescript: `function longestCommonSubsequence(text1: string, text2: string): number {
  // write your answer here using 2D DP
  throw new Error("Implement longestCommonSubsequence first");
}`,
  go: `func longestCommonSubsequence(text1 string, text2 string) int {
    // write your answer here using 2D DP
    return 0
}`,
  csharp: `public class Solution {
    public int LongestCommonSubsequence(string text1, string text2) {
        // write your answer here using 2D DP
        return 0;
    }
}`,
  rust: `impl Solution {
    pub fn longest_common_subsequence(text1: String, text2: String) -> i32 {
        // write your answer here using 2D DP
        0
    }
}`,
};

const SOLUTION_CODE: Record<LanguageKey, string> = {
  javascript: `function longestCommonSubsequence(text1, text2) {
  const rows = text1.length;
  const cols = text2.length;

  const dp = Array.from({ length: rows + 1 }, () =>
    new Array(cols + 1).fill(0)
  );

  for (let row = 1; row <= rows; row++) {
    for (let col = 1; col <= cols; col++) {
      if (text1[row - 1] === text2[col - 1]) {
        dp[row][col] = 1 + dp[row - 1][col - 1];
      } else {
        dp[row][col] = Math.max(dp[row - 1][col], dp[row][col - 1]);
      }
    }
  }

  return dp[rows][cols];
}`,
  python: `class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        rows = len(text1)
        cols = len(text2)

        dp = [[0] * (cols + 1) for _ in range(rows + 1)]

        for row in range(1, rows + 1):
            for col in range(1, cols + 1):
                if text1[row - 1] == text2[col - 1]:
                    dp[row][col] = 1 + dp[row - 1][col - 1]
                else:
                    dp[row][col] = max(dp[row - 1][col], dp[row][col - 1])

        return dp[rows][cols]`,
  java: `class Solution {
    public int longestCommonSubsequence(String text1, String text2) {
        int rows = text1.length();
        int cols = text2.length();

        int[][] dp = new int[rows + 1][cols + 1];

        for (int row = 1; row <= rows; row++) {
            for (int col = 1; col <= cols; col++) {
                if (text1.charAt(row - 1) == text2.charAt(col - 1)) {
                    dp[row][col] = 1 + dp[row - 1][col - 1];
                } else {
                    dp[row][col] = Math.max(dp[row - 1][col], dp[row][col - 1]);
                }
            }
        }

        return dp[rows][cols];
    }
}`,
  cpp: `class Solution {
public:
    int longestCommonSubsequence(string text1, string text2) {
        int rows = text1.size();
        int cols = text2.size();

        vector<vector<int>> dp(rows + 1, vector<int>(cols + 1, 0));

        for (int row = 1; row <= rows; row++) {
            for (int col = 1; col <= cols; col++) {
                if (text1[row - 1] == text2[col - 1]) {
                    dp[row][col] = 1 + dp[row - 1][col - 1];
                } else {
                    dp[row][col] = max(dp[row - 1][col], dp[row][col - 1]);
                }
            }
        }

        return dp[rows][cols];
    }
};`,
  typescript: `function longestCommonSubsequence(text1: string, text2: string): number {
  const rows = text1.length;
  const cols = text2.length;

  const dp: number[][] = Array.from({ length: rows + 1 }, () =>
    new Array(cols + 1).fill(0)
  );

  for (let row = 1; row <= rows; row++) {
    for (let col = 1; col <= cols; col++) {
      if (text1[row - 1] === text2[col - 1]) {
        dp[row][col] = 1 + dp[row - 1][col - 1];
      } else {
        dp[row][col] = Math.max(dp[row - 1][col], dp[row][col - 1]);
      }
    }
  }

  return dp[rows][cols];
}`,
  go: `func longestCommonSubsequence(text1 string, text2 string) int {
    rows := len(text1)
    cols := len(text2)

    dp := make([][]int, rows + 1)

    for row := range dp {
        dp[row] = make([]int, cols + 1)
    }

    for row := 1; row <= rows; row++ {
        for col := 1; col <= cols; col++ {
            if text1[row - 1] == text2[col - 1] {
                dp[row][col] = 1 + dp[row - 1][col - 1]
            } else {
                if dp[row - 1][col] > dp[row][col - 1] {
                    dp[row][col] = dp[row - 1][col]
                } else {
                    dp[row][col] = dp[row][col - 1]
                }
            }
        }
    }

    return dp[rows][cols]
}`,
  csharp: `public class Solution {
    public int LongestCommonSubsequence(string text1, string text2) {
        int rows = text1.Length;
        int cols = text2.Length;

        int[,] dp = new int[rows + 1, cols + 1];

        for (int row = 1; row <= rows; row++) {
            for (int col = 1; col <= cols; col++) {
                if (text1[row - 1] == text2[col - 1]) {
                    dp[row, col] = 1 + dp[row - 1, col - 1];
                } else {
                    dp[row, col] = Math.Max(dp[row - 1, col], dp[row, col - 1]);
                }
            }
        }

        return dp[rows, cols];
    }
}`,
  rust: `impl Solution {
    pub fn longest_common_subsequence(text1: String, text2: String) -> i32 {
        let a = text1.as_bytes();
        let b = text2.as_bytes();

        let rows = a.len();
        let cols = b.len();

        let mut dp = vec![vec![0; cols + 1]; rows + 1];

        for row in 1..=rows {
            for col in 1..=cols {
                if a[row - 1] == b[col - 1] {
                    dp[row][col] = 1 + dp[row - 1][col - 1];
                } else {
                    dp[row][col] = dp[row - 1][col].max(dp[row][col - 1]);
                }
            }
        }

        dp[rows][cols]
    }
}`,
};

const TEST_CASES: TestCase[] = [
  { id: 1, text1: "abcde", text2: "ace", expected: 3 },
  { id: 2, text1: "abc", text2: "abc", expected: 3 },
  { id: 3, text1: "abc", text2: "def", expected: 0 },
  { id: 4, text1: "bsbininm", text2: "jmjkbkjkv", expected: 1 },
  { id: 5, text1: "ezupkr", text2: "ubmrapg", expected: 2 },
  { id: 6, text1: "", text2: "abc", expected: 0 },
  { id: 7, text1: "abcba", text2: "abcbcba", expected: 5 },
];

function getLanguageLabel(language: LanguageKey) {
  return LANGUAGES.find((item) => item.key === language)?.label ?? language;
}

function executeJavaScript(code: string, test: TestCase) {
  try {
    const longestCommonSubsequence = new Function(`
      "use strict";
      ${code}
      return longestCommonSubsequence;
    `)() as (text1: string, text2: string) => number;

    if (typeof longestCommonSubsequence !== "function") {
      return {
        pass: false,
        actual: 0,
        error:
          "longestCommonSubsequence function was not found. Keep the function named longestCommonSubsequence.",
      };
    }

    const actual = longestCommonSubsequence(test.text1, test.text2);

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

export default function LongestCommonSubsequencePracticePage() {
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
        `text1: ${selectedCase.text1}`,
        `text2: ${selectedCase.text2}`,
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
        lines.push(`  text1: ${test.text1}`);
        lines.push(`  text2: ${test.text2}`);
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
          ? "Not accepted yet. Implement longestCommonSubsequence, then run again."
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
                  MED
                </span>
                <span className="border border-border px-3 py-1 text-[10px] font-bold tracking-[0.25em] text-muted-foreground">
                  DP
                </span>
                <span className="border border-border px-3 py-1 text-[10px] font-bold tracking-[0.25em] text-muted-foreground">
                  2D TABLE
                </span>
              </div>

              <div className="mb-3 flex items-center gap-3">
                <span className="text-5xl font-bold leading-none text-primary">$</span>
                <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                  Longest Common Subsequence
                </h1>
              </div>

              <p className="max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
                Classic 2D DP over two strings.
              </p>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              <div className="mb-4 text-[10px] font-bold tracking-[0.35em] text-muted-foreground">
                DESCRIPTION
              </div>

              <div className="space-y-5 text-sm leading-7 text-muted-foreground">
                <div className="terminal-frame p-4">
                  <p>
                    Given two strings, return the length of their longest common subsequence.
                  </p>
                  <p className="mt-2">
                    A subsequence keeps relative order, but characters do not need to be adjacent.
                  </p>
                  <p className="mt-2">
                    Use a 2D table where each cell represents the best answer using prefixes of both strings.
                  </p>
                </div>

                <div className="terminal-frame p-4">
                  <h2 className="mb-3 text-xl font-bold text-foreground">Example</h2>
                  <pre className="overflow-x-auto whitespace-pre-wrap text-xs leading-6 md:text-sm">
{`Input:
text1 = "abcde"
text2 = "ace"

Output: 3

Reason:
"ace" appears in both strings in the same relative order.`}
                  </pre>
                </div>

                <div className="terminal-frame p-4">
                  <h2 className="mb-3 text-xl font-bold text-foreground">DP Pattern</h2>
                  <ul className="list-disc space-y-2 pl-5">
                    <li>If characters match, take diagonal + 1</li>
                    <li>If characters do not match, take max from top or left</li>
                    <li>Use an extra row and column for empty prefixes</li>
                    <li>The bottom-right cell contains the final answer</li>
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
                        <p className="text-foreground">text1: {test.text1 || "empty string"}</p>
                        <p className="mt-1 text-foreground">text2: {test.text2 || "empty string"}</p>
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
