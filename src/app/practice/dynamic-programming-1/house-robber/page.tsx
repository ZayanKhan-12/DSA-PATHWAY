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
  nums: number[];
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
  javascript: `function rob(nums) {
  // write your answer here using DP
  throw new Error("Implement rob first");
}`,
  python: `class Solution:
    def rob(self, nums: List[int]) -> int:
        # write your answer here using DP
        return 0`,
  java: `class Solution {
    public int rob(int[] nums) {
        // write your answer here using DP
        return 0;
    }
}`,
  cpp: `class Solution {
public:
    int rob(vector<int>& nums) {
        // write your answer here using DP
        return 0;
    }
};`,
  typescript: `function rob(nums: number[]): number {
  // write your answer here using DP
  throw new Error("Implement rob first");
}`,
  go: `func rob(nums []int) int {
    // write your answer here using DP
    return 0
}`,
  csharp: `public class Solution {
    public int Rob(int[] nums) {
        // write your answer here using DP
        return 0;
    }
}`,
  rust: `impl Solution {
    pub fn rob(nums: Vec<i32>) -> i32 {
        // write your answer here using DP
        0
    }
}`,
};

const SOLUTION_CODE: Record<LanguageKey, string> = {
  javascript: `function rob(nums) {
  let robPrevious = 0;
  let skipPrevious = 0;

  for (const money of nums) {
    const bestIfRobCurrent = skipPrevious + money;
    const bestIfSkipCurrent = Math.max(robPrevious, skipPrevious);

    robPrevious = bestIfRobCurrent;
    skipPrevious = bestIfSkipCurrent;
  }

  return Math.max(robPrevious, skipPrevious);
}`,
  python: `class Solution:
    def rob(self, nums: List[int]) -> int:
        rob_previous = 0
        skip_previous = 0

        for money in nums:
            best_if_rob_current = skip_previous + money
            best_if_skip_current = max(rob_previous, skip_previous)

            rob_previous = best_if_rob_current
            skip_previous = best_if_skip_current

        return max(rob_previous, skip_previous)`,
  java: `class Solution {
    public int rob(int[] nums) {
        int robPrevious = 0;
        int skipPrevious = 0;

        for (int money : nums) {
            int bestIfRobCurrent = skipPrevious + money;
            int bestIfSkipCurrent = Math.max(robPrevious, skipPrevious);

            robPrevious = bestIfRobCurrent;
            skipPrevious = bestIfSkipCurrent;
        }

        return Math.max(robPrevious, skipPrevious);
    }
}`,
  cpp: `class Solution {
public:
    int rob(vector<int>& nums) {
        int robPrevious = 0;
        int skipPrevious = 0;

        for (int money : nums) {
            int bestIfRobCurrent = skipPrevious + money;
            int bestIfSkipCurrent = max(robPrevious, skipPrevious);

            robPrevious = bestIfRobCurrent;
            skipPrevious = bestIfSkipCurrent;
        }

        return max(robPrevious, skipPrevious);
    }
};`,
  typescript: `function rob(nums: number[]): number {
  let robPrevious = 0;
  let skipPrevious = 0;

  for (const money of nums) {
    const bestIfRobCurrent = skipPrevious + money;
    const bestIfSkipCurrent = Math.max(robPrevious, skipPrevious);

    robPrevious = bestIfRobCurrent;
    skipPrevious = bestIfSkipCurrent;
  }

  return Math.max(robPrevious, skipPrevious);
}`,
  go: `func rob(nums []int) int {
    robPrevious := 0
    skipPrevious := 0

    for _, money := range nums {
        bestIfRobCurrent := skipPrevious + money
        bestIfSkipCurrent := robPrevious

        if skipPrevious > bestIfSkipCurrent {
            bestIfSkipCurrent = skipPrevious
        }

        robPrevious = bestIfRobCurrent
        skipPrevious = bestIfSkipCurrent
    }

    if robPrevious > skipPrevious {
        return robPrevious
    }

    return skipPrevious
}`,
  csharp: `public class Solution {
    public int Rob(int[] nums) {
        int robPrevious = 0;
        int skipPrevious = 0;

        foreach (int money in nums) {
            int bestIfRobCurrent = skipPrevious + money;
            int bestIfSkipCurrent = Math.Max(robPrevious, skipPrevious);

            robPrevious = bestIfRobCurrent;
            skipPrevious = bestIfSkipCurrent;
        }

        return Math.Max(robPrevious, skipPrevious);
    }
}`,
  rust: `impl Solution {
    pub fn rob(nums: Vec<i32>) -> i32 {
        let mut rob_previous = 0;
        let mut skip_previous = 0;

        for money in nums {
            let best_if_rob_current = skip_previous + money;
            let best_if_skip_current = rob_previous.max(skip_previous);

            rob_previous = best_if_rob_current;
            skip_previous = best_if_skip_current;
        }

        rob_previous.max(skip_previous)
    }
}`,
};

const TEST_CASES: TestCase[] = [
  {
    id: 1,
    nums: [1, 2, 3, 1],
    expected: 4,
  },
  {
    id: 2,
    nums: [2, 7, 9, 3, 1],
    expected: 12,
  },
  {
    id: 3,
    nums: [2, 1, 1, 2],
    expected: 4,
  },
  {
    id: 4,
    nums: [5],
    expected: 5,
  },
  {
    id: 5,
    nums: [0],
    expected: 0,
  },
  {
    id: 6,
    nums: [10, 1, 1, 10],
    expected: 20,
  },
];

function getLanguageLabel(language: LanguageKey) {
  return LANGUAGES.find((item) => item.key === language)?.label ?? language;
}

function executeJavaScript(code: string, test: TestCase) {
  try {
    const rob = new Function(`
      "use strict";
      ${code}
      return rob;
    `)() as (nums: number[]) => number;

    if (typeof rob !== "function") {
      return {
        pass: false,
        actual: 0,
        error: "rob function was not found. Keep the function named rob.",
      };
    }

    const actual = rob([...test.nums]);

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

export default function HouseRobberPracticePage() {
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
        `nums: ${JSON.stringify(selectedCase.nums)}`,
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
        lines.push(`  nums: ${JSON.stringify(test.nums)}`);
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
          ? "Not accepted yet. Implement rob, then run again."
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
            <Link className="hover:text-primary" href="/learn/dynamic-programming-1">
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
                  DP
                </span>
                <span className="border border-border px-3 py-1 text-[10px] font-bold tracking-[0.25em] text-muted-foreground">
                  1D RECURRENCE
                </span>
              </div>

              <div className="mb-3 flex items-center gap-3">
                <span className="text-5xl font-bold leading-none text-primary">$</span>
                <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                  House Robber
                </h1>
              </div>

              <p className="max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
                Classic 1D DP recurrence: choose between robbing the current house or skipping it.
              </p>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              <div className="mb-4 text-[10px] font-bold tracking-[0.35em] text-muted-foreground">
                DESCRIPTION
              </div>

              <div className="space-y-5 text-sm leading-7 text-muted-foreground">
                <div className="terminal-frame p-4">
                  <p>
                    You are given an array where each number represents money inside a house.
                  </p>
                  <p className="mt-2">
                    You cannot rob two adjacent houses. Return the maximum money you can rob.
                  </p>
                  <p className="mt-2">
                    At every house, decide: <span className="text-foreground">rob current</span> or{" "}
                    <span className="text-foreground">skip current</span>.
                  </p>
                </div>

                <div className="terminal-frame p-4">
                  <h2 className="mb-3 text-xl font-bold text-foreground">Example</h2>
                  <pre className="overflow-x-auto whitespace-pre-wrap text-xs leading-6 md:text-sm">
{`Input: nums = [2,7,9,3,1]
Output: 12

Best choice:
rob house 0 = 2
rob house 2 = 9
rob house 4 = 1

Total = 12`}
                  </pre>
                </div>

                <div className="terminal-frame p-4">
                  <h2 className="mb-3 text-xl font-bold text-foreground">DP Pattern</h2>
                  <ul className="list-disc space-y-2 pl-5">
                    <li>Rob current house: previous skipped value + current money</li>
                    <li>Skip current house: max of previous rob/skip values</li>
                    <li>Keep only two states instead of a full DP array</li>
                    <li>Return max of final rob and skip states</li>
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
                        <p className="text-foreground">nums:</p>
                        <p className="break-all">{JSON.stringify(test.nums)}</p>
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
                  <p className="mt-3">Expected approach: 1D dynamic programming</p>
                  <p>Time: O(n)</p>
                  <p>Space: O(1)</p>
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
