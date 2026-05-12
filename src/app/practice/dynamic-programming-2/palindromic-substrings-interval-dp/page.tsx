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
  s: string;
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
  javascript: `function countSubstrings(s) {
  // write your answer here using interval DP
  throw new Error("Implement countSubstrings first");
}`,
  python: `class Solution:
    def countSubstrings(self, s: str) -> int:
        # write your answer here using interval DP
        return 0`,
  java: `class Solution {
    public int countSubstrings(String s) {
        // write your answer here using interval DP
        return 0;
    }
}`,
  cpp: `class Solution {
public:
    int countSubstrings(string s) {
        // write your answer here using interval DP
        return 0;
    }
};`,
  typescript: `function countSubstrings(s: string): number {
  // write your answer here using interval DP
  throw new Error("Implement countSubstrings first");
}`,
  go: `func countSubstrings(s string) int {
    // write your answer here using interval DP
    return 0
}`,
  csharp: `public class Solution {
    public int CountSubstrings(string s) {
        // write your answer here using interval DP
        return 0;
    }
}`,
  rust: `impl Solution {
    pub fn count_substrings(s: String) -> i32 {
        // write your answer here using interval DP
        0
    }
}`,
};

const SOLUTION_CODE: Record<LanguageKey, string> = {
  javascript: `function countSubstrings(s) {
  const n = s.length;
  const dp = Array.from({ length: n }, () => new Array(n).fill(false));
  let count = 0;

  for (let length = 1; length <= n; length++) {
    for (let left = 0; left + length - 1 < n; left++) {
      const right = left + length - 1;

      if (
        s[left] === s[right] &&
        (length <= 2 || dp[left + 1][right - 1])
      ) {
        dp[left][right] = true;
        count++;
      }
    }
  }

  return count;
}`,
  python: `class Solution:
    def countSubstrings(self, s: str) -> int:
        n = len(s)
        dp = [[False] * n for _ in range(n)]
        count = 0

        for length in range(1, n + 1):
            for left in range(0, n - length + 1):
                right = left + length - 1

                if s[left] == s[right] and (length <= 2 or dp[left + 1][right - 1]):
                    dp[left][right] = True
                    count += 1

        return count`,
  java: `class Solution {
    public int countSubstrings(String s) {
        int n = s.length();
        boolean[][] dp = new boolean[n][n];
        int count = 0;

        for (int length = 1; length <= n; length++) {
            for (int left = 0; left + length - 1 < n; left++) {
                int right = left + length - 1;

                if (
                    s.charAt(left) == s.charAt(right) &&
                    (length <= 2 || dp[left + 1][right - 1])
                ) {
                    dp[left][right] = true;
                    count++;
                }
            }
        }

        return count;
    }
}`,
  cpp: `class Solution {
public:
    int countSubstrings(string s) {
        int n = s.size();
        vector<vector<bool>> dp(n, vector<bool>(n, false));
        int count = 0;

        for (int length = 1; length <= n; length++) {
            for (int left = 0; left + length - 1 < n; left++) {
                int right = left + length - 1;

                if (
                    s[left] == s[right] &&
                    (length <= 2 || dp[left + 1][right - 1])
                ) {
                    dp[left][right] = true;
                    count++;
                }
            }
        }

        return count;
    }
};`,
  typescript: `function countSubstrings(s: string): number {
  const n = s.length;
  const dp: boolean[][] = Array.from({ length: n }, () => new Array(n).fill(false));
  let count = 0;

  for (let length = 1; length <= n; length++) {
    for (let left = 0; left + length - 1 < n; left++) {
      const right = left + length - 1;

      if (
        s[left] === s[right] &&
        (length <= 2 || dp[left + 1][right - 1])
      ) {
        dp[left][right] = true;
        count++;
      }
    }
  }

  return count;
}`,
  go: `func countSubstrings(s string) int {
    n := len(s)
    dp := make([][]bool, n)

    for i := range dp {
        dp[i] = make([]bool, n)
    }

    count := 0

    for length := 1; length <= n; length++ {
        for left := 0; left + length - 1 < n; left++ {
            right := left + length - 1

            if s[left] == s[right] && (length <= 2 || dp[left + 1][right - 1]) {
                dp[left][right] = true
                count++
            }
        }
    }

    return count
}`,
  csharp: `public class Solution {
    public int CountSubstrings(string s) {
        int n = s.Length;
        bool[,] dp = new bool[n, n];
        int count = 0;

        for (int length = 1; length <= n; length++) {
            for (int left = 0; left + length - 1 < n; left++) {
                int right = left + length - 1;

                if (
                    s[left] == s[right] &&
                    (length <= 2 || dp[left + 1, right - 1])
                ) {
                    dp[left, right] = true;
                    count++;
                }
            }
        }

        return count;
    }
}`,
  rust: `impl Solution {
    pub fn count_substrings(s: String) -> i32 {
        let bytes = s.as_bytes();
        let n = bytes.len();

        if n == 0 {
            return 0;
        }

        let mut dp = vec![vec![false; n]; n];
        let mut count = 0;

        for length in 1..=n {
            for left in 0..=(n - length) {
                let right = left + length - 1;

                if bytes[left] == bytes[right] &&
                    (length <= 2 || dp[left + 1][right - 1])
                {
                    dp[left][right] = true;
                    count += 1;
                }
            }
        }

        count
    }
}`,
};

const TEST_CASES: TestCase[] = [
  { id: 1, s: "abc", expected: 3 },
  { id: 2, s: "aaa", expected: 6 },
  { id: 3, s: "racecar", expected: 10 },
  { id: 4, s: "abba", expected: 6 },
  { id: 5, s: "a", expected: 1 },
  { id: 6, s: "", expected: 0 },
  { id: 7, s: "fdsklf", expected: 6 },
];

function getLanguageLabel(language: LanguageKey) {
  return LANGUAGES.find((item) => item.key === language)?.label ?? language;
}

function executeJavaScript(code: string, test: TestCase) {
  try {
    const countSubstrings = new Function(`
      "use strict";
      ${code}
      return countSubstrings;
    `)() as (s: string) => number;

    if (typeof countSubstrings !== "function") {
      return {
        pass: false,
        actual: 0,
        error: "countSubstrings function was not found. Keep the function named countSubstrings.",
      };
    }

    const actual = countSubstrings(test.s);

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

export default function PalindromicSubstringsIntervalDpPracticePage() {
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
        `s: ${selectedCase.s || "empty string"}`,
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
        lines.push(`  s: ${test.s || "empty string"}`);
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
          ? "Not accepted yet. Implement countSubstrings, then run again."
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
                  INTERVAL
                </span>
              </div>

              <div className="mb-3 flex items-center gap-3">
                <span className="text-5xl font-bold leading-none text-primary">$</span>
                <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                  Palindromic Substrings / Interval DP
                </h1>
              </div>

              <p className="max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
                States depend on substring boundaries.
              </p>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              <div className="mb-4 text-[10px] font-bold tracking-[0.35em] text-muted-foreground">
                DESCRIPTION
              </div>

              <div className="space-y-5 text-sm leading-7 text-muted-foreground">
                <div className="terminal-frame p-4">
                  <p>
                    Given a string, count how many substrings are palindromes.
                  </p>
                  <p className="mt-2">
                    A substring is palindrome if it reads the same forward and backward.
                  </p>
                  <p className="mt-2">
                    Use interval DP where <span className="text-foreground">dp[left][right]</span> tells whether the substring from left to right is palindromic.
                  </p>
                </div>

                <div className="terminal-frame p-4">
                  <h2 className="mb-3 text-xl font-bold text-foreground">Example</h2>
                  <pre className="overflow-x-auto whitespace-pre-wrap text-xs leading-6 md:text-sm">
{`Input:
s = "aaa"

Output: 6

Palindromic substrings:
"a", "a", "a", "aa", "aa", "aaa"`}
                  </pre>
                </div>

                <div className="terminal-frame p-4">
                  <h2 className="mb-3 text-xl font-bold text-foreground">DP Pattern</h2>
                  <ul className="list-disc space-y-2 pl-5">
                    <li>Single characters are always palindromes</li>
                    <li>Length 2 substrings are palindromes if both characters match</li>
                    <li>Longer substrings need matching ends and a palindromic inside substring</li>
                    <li>Build by increasing substring length so inner states are ready first</li>
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
                        <p className="text-foreground">s: {test.s || "empty string"}</p>
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
                  <p className="mt-3">Expected approach: interval dynamic programming</p>
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
