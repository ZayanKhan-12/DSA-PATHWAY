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
  cost: number[][];
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
  javascript: `function minAssignmentCost(cost) {
  // write your answer here using bitmask DP
  throw new Error("Implement minAssignmentCost first");
}`,
  python: `def minAssignmentCost(cost):
    # write your answer here using bitmask DP
    return 0`,
  java: `class Solution {
    public int minAssignmentCost(int[][] cost) {
        // write your answer here using bitmask DP
        return 0;
    }
}`,
  cpp: `int minAssignmentCost(vector<vector<int>>& cost) {
    // write your answer here using bitmask DP
    return 0;
}`,
  typescript: `function minAssignmentCost(cost: number[][]): number {
  // write your answer here using bitmask DP
  throw new Error("Implement minAssignmentCost first");
}`,
  go: `func minAssignmentCost(cost [][]int) int {
    // write your answer here using bitmask DP
    return 0
}`,
  csharp: `public int MinAssignmentCost(int[][] cost) {
    // write your answer here using bitmask DP
    return 0;
}`,
  rust: `fn min_assignment_cost(cost: Vec<Vec<i32>>) -> i32 {
    // write your answer here using bitmask DP
    0
}`,
};

const SOLUTION_CODE: Record<LanguageKey, string> = {
  javascript: `function minAssignmentCost(cost) {
  const n = cost.length;
  const fullMask = 1 << n;
  const dp = new Array(fullMask).fill(Infinity);

  dp[0] = 0;

  for (let mask = 0; mask < fullMask; mask++) {
    const worker = countBits(mask);

    if (worker >= n) continue;

    for (let job = 0; job < n; job++) {
      const jobBit = 1 << job;

      if ((mask & jobBit) === 0) {
        const nextMask = mask | jobBit;
        dp[nextMask] = Math.min(
          dp[nextMask],
          dp[mask] + cost[worker][job]
        );
      }
    }
  }

  return dp[fullMask - 1];
}

function countBits(value) {
  let count = 0;

  while (value > 0) {
    count += value & 1;
    value >>= 1;
  }

  return count;
}`,
  python: `def minAssignmentCost(cost):
    n = len(cost)
    full_mask = 1 << n
    dp = [float("inf")] * full_mask

    dp[0] = 0

    for mask in range(full_mask):
        worker = mask.bit_count()

        if worker >= n:
            continue

        for job in range(n):
            job_bit = 1 << job

            if mask & job_bit == 0:
                next_mask = mask | job_bit
                dp[next_mask] = min(
                    dp[next_mask],
                    dp[mask] + cost[worker][job]
                )

    return dp[full_mask - 1]`,
  java: `class Solution {
    public int minAssignmentCost(int[][] cost) {
        int n = cost.length;
        int fullMask = 1 << n;
        int impossible = 1_000_000_000;

        int[] dp = new int[fullMask];
        Arrays.fill(dp, impossible);

        dp[0] = 0;

        for (int mask = 0; mask < fullMask; mask++) {
            int worker = Integer.bitCount(mask);

            if (worker >= n) {
                continue;
            }

            for (int job = 0; job < n; job++) {
                int jobBit = 1 << job;

                if ((mask & jobBit) == 0) {
                    int nextMask = mask | jobBit;

                    dp[nextMask] = Math.min(
                        dp[nextMask],
                        dp[mask] + cost[worker][job]
                    );
                }
            }
        }

        return dp[fullMask - 1];
    }
}`,
  cpp: `int minAssignmentCost(vector<vector<int>>& cost) {
    int n = cost.size();
    int fullMask = 1 << n;
    int impossible = 1e9;

    vector<int> dp(fullMask, impossible);
    dp[0] = 0;

    for (int mask = 0; mask < fullMask; mask++) {
        int worker = __builtin_popcount(mask);

        if (worker >= n) {
            continue;
        }

        for (int job = 0; job < n; job++) {
            int jobBit = 1 << job;

            if ((mask & jobBit) == 0) {
                int nextMask = mask | jobBit;

                dp[nextMask] = min(
                    dp[nextMask],
                    dp[mask] + cost[worker][job]
                );
            }
        }
    }

    return dp[fullMask - 1];
}`,
  typescript: `function minAssignmentCost(cost: number[][]): number {
  const n = cost.length;
  const fullMask = 1 << n;
  const dp = new Array(fullMask).fill(Infinity);

  dp[0] = 0;

  for (let mask = 0; mask < fullMask; mask++) {
    const worker = countBits(mask);

    if (worker >= n) continue;

    for (let job = 0; job < n; job++) {
      const jobBit = 1 << job;

      if ((mask & jobBit) === 0) {
        const nextMask = mask | jobBit;
        dp[nextMask] = Math.min(
          dp[nextMask],
          dp[mask] + cost[worker][job]
        );
      }
    }
  }

  return dp[fullMask - 1];
}

function countBits(value: number): number {
  let count = 0;

  while (value > 0) {
    count += value & 1;
    value >>= 1;
  }

  return count;
}`,
  go: `func minAssignmentCost(cost [][]int) int {
    n := len(cost)
    fullMask := 1 << n
    impossible := 1000000000

    dp := make([]int, fullMask)

    for i := range dp {
        dp[i] = impossible
    }

    dp[0] = 0

    for mask := 0; mask < fullMask; mask++ {
        worker := countBits(mask)

        if worker >= n {
            continue
        }

        for job := 0; job < n; job++ {
            jobBit := 1 << job

            if mask & jobBit == 0 {
                nextMask := mask | jobBit
                candidate := dp[mask] + cost[worker][job]

                if candidate < dp[nextMask] {
                    dp[nextMask] = candidate
                }
            }
        }
    }

    return dp[fullMask - 1]
}

func countBits(value int) int {
    count := 0

    for value > 0 {
        count += value & 1
        value >>= 1
    }

    return count
}`,
  csharp: `public int MinAssignmentCost(int[][] cost) {
    int n = cost.Length;
    int fullMask = 1 << n;
    int impossible = 1000000000;

    int[] dp = new int[fullMask];
    Array.Fill(dp, impossible);

    dp[0] = 0;

    for (int mask = 0; mask < fullMask; mask++) {
        int worker = CountBits(mask);

        if (worker >= n) {
            continue;
        }

        for (int job = 0; job < n; job++) {
            int jobBit = 1 << job;

            if ((mask & jobBit) == 0) {
                int nextMask = mask | jobBit;

                dp[nextMask] = Math.Min(
                    dp[nextMask],
                    dp[mask] + cost[worker][job]
                );
            }
        }
    }

    return dp[fullMask - 1];
}

private int CountBits(int value) {
    int count = 0;

    while (value > 0) {
        count += value & 1;
        value >>= 1;
    }

    return count;
}`,
  rust: `fn min_assignment_cost(cost: Vec<Vec<i32>>) -> i32 {
    let n = cost.len();
    let full_mask = 1usize << n;
    let impossible = 1_000_000_000;

    let mut dp = vec![impossible; full_mask];
    dp[0] = 0;

    for mask in 0..full_mask {
        let worker = mask.count_ones() as usize;

        if worker >= n {
            continue;
        }

        for job in 0..n {
            let job_bit = 1usize << job;

            if mask & job_bit == 0 {
                let next_mask = mask | job_bit;
                let candidate = dp[mask] + cost[worker][job];

                dp[next_mask] = dp[next_mask].min(candidate);
            }
        }
    }

    dp[full_mask - 1]
}`,
};

const TEST_CASES: TestCase[] = [
  {
    id: 1,
    cost: [
      [9, 2, 7],
      [6, 4, 3],
      [5, 8, 1],
    ],
    expected: 9,
  },
  {
    id: 2,
    cost: [
      [1, 2],
      [2, 1],
    ],
    expected: 2,
  },
  {
    id: 3,
    cost: [[10]],
    expected: 10,
  },
  {
    id: 4,
    cost: [
      [7, 5, 9],
      [8, 7, 6],
      [6, 9, 5],
    ],
    expected: 16,
  },
  {
    id: 5,
    cost: [
      [14, 5, 8, 7],
      [2, 12, 6, 5],
      [7, 8, 3, 9],
      [2, 4, 6, 10],
    ],
    expected: 15,
  },
];

function getLanguageLabel(language: LanguageKey) {
  return LANGUAGES.find((item) => item.key === language)?.label ?? language;
}

function executeJavaScript(code: string, test: TestCase) {
  try {
    const minAssignmentCost = new Function(`
      "use strict";
      ${code}
      return minAssignmentCost;
    `)() as (cost: number[][]) => number;

    if (typeof minAssignmentCost !== "function") {
      return {
        pass: false,
        actual: 0,
        error: "minAssignmentCost function was not found. Keep the function named minAssignmentCost.",
      };
    }

    const actual = minAssignmentCost(test.cost.map((row) => [...row]));

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

export default function BitmaskDpProblemsPracticePage() {
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
        `cost: ${JSON.stringify(selectedCase.cost)}`,
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
        lines.push(`  cost: ${JSON.stringify(test.cost)}`);
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
          ? "Not accepted yet. Implement minAssignmentCost, then run again."
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
                <span className="border border-pink-500 px-3 py-1 text-[10px] font-bold tracking-[0.25em] text-pink-500">
                  HARD
                </span>
                <span className="border border-border px-3 py-1 text-[10px] font-bold tracking-[0.25em] text-muted-foreground">
                  DP
                </span>
                <span className="border border-border px-3 py-1 text-[10px] font-bold tracking-[0.25em] text-muted-foreground">
                  BITMASK
                </span>
              </div>

              <div className="mb-3 flex items-center gap-3">
                <span className="text-5xl font-bold leading-none text-primary">$</span>
                <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                  Bitmask DP Problems
                </h1>
              </div>

              <p className="max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
                Subset-state optimization at higher complexity.
              </p>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              <div className="mb-4 text-[10px] font-bold tracking-[0.35em] text-muted-foreground">
                DESCRIPTION
              </div>

              <div className="space-y-5 text-sm leading-7 text-muted-foreground">
                <div className="terminal-frame p-4">
                  <p>
                    You are given an n × n cost matrix. Assign each worker to exactly one job and each job to exactly one worker.
                  </p>
                  <p className="mt-2">
                    Return the minimum total assignment cost.
                  </p>
                  <p className="mt-2">
                    Use a bitmask to represent which jobs have already been assigned.
                  </p>
                </div>

                <div className="terminal-frame p-4">
                  <h2 className="mb-3 text-xl font-bold text-foreground">Example</h2>
                  <pre className="overflow-x-auto whitespace-pre-wrap text-xs leading-6 md:text-sm">
{`Input:
cost = [
  [9,2,7],
  [6,4,3],
  [5,8,1]
]

Output: 9

One optimal assignment:
worker 0 -> job 1 cost 2
worker 1 -> job 0 cost 6
worker 2 -> job 2 cost 1

Total = 9`}
                  </pre>
                </div>

                <div className="terminal-frame p-4">
                  <h2 className="mb-3 text-xl font-bold text-foreground">DP Pattern</h2>
                  <ul className="list-disc space-y-2 pl-5">
                    <li>mask stores which jobs are already used</li>
                    <li>number of set bits in mask tells which worker is next</li>
                    <li>try assigning the next worker to every unused job</li>
                    <li>transition: dp[nextMask] = min(dp[nextMask], dp[mask] + cost)</li>
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
                        <p className="text-foreground">cost:</p>
                        <p className="break-all">{JSON.stringify(test.cost)}</p>
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
                  <p className="mt-3">Expected approach: subset-state bitmask DP</p>
                  <p>Time: O(n² × 2ⁿ)</p>
                  <p>Space: O(2ⁿ)</p>
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
