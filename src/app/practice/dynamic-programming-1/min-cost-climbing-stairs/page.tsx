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
  cost: number[];
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
  javascript: `function minCostClimbingStairs(cost) {
  // write your answer here using DP
  throw new Error("Implement minCostClimbingStairs first");
}`,
  python: `class Solution:
    def minCostClimbingStairs(self, cost: List[int]) -> int:
        # write your answer here using DP
        return 0`,
  java: `class Solution {
    public int minCostClimbingStairs(int[] cost) {
        // write your answer here using DP
        return 0;
    }
}`,
  cpp: `class Solution {
public:
    int minCostClimbingStairs(vector<int>& cost) {
        // write your answer here using DP
        return 0;
    }
};`,
  typescript: `function minCostClimbingStairs(cost: number[]): number {
  // write your answer here using DP
  throw new Error("Implement minCostClimbingStairs first");
}`,
  go: `func minCostClimbingStairs(cost []int) int {
    // write your answer here using DP
    return 0
}`,
  csharp: `public class Solution {
    public int MinCostClimbingStairs(int[] cost) {
        // write your answer here using DP
        return 0;
    }
}`,
  rust: `impl Solution {
    pub fn min_cost_climbing_stairs(cost: Vec<i32>) -> i32 {
        // write your answer here using DP
        0
    }
}`,
};

const SOLUTION_CODE: Record<LanguageKey, string> = {
  javascript: `function minCostClimbingStairs(cost) {
  let twoStepsBack = 0;
  let oneStepBack = 0;

  for (let step = 2; step <= cost.length; step++) {
    const takeOneStep = oneStepBack + cost[step - 1];
    const takeTwoSteps = twoStepsBack + cost[step - 2];
    const current = Math.min(takeOneStep, takeTwoSteps);

    twoStepsBack = oneStepBack;
    oneStepBack = current;
  }

  return oneStepBack;
}`,
  python: `class Solution:
    def minCostClimbingStairs(self, cost: List[int]) -> int:
        two_steps_back = 0
        one_step_back = 0

        for step in range(2, len(cost) + 1):
            take_one_step = one_step_back + cost[step - 1]
            take_two_steps = two_steps_back + cost[step - 2]
            current = min(take_one_step, take_two_steps)

            two_steps_back = one_step_back
            one_step_back = current

        return one_step_back`,
  java: `class Solution {
    public int minCostClimbingStairs(int[] cost) {
        int twoStepsBack = 0;
        int oneStepBack = 0;

        for (int step = 2; step <= cost.length; step++) {
            int takeOneStep = oneStepBack + cost[step - 1];
            int takeTwoSteps = twoStepsBack + cost[step - 2];
            int current = Math.min(takeOneStep, takeTwoSteps);

            twoStepsBack = oneStepBack;
            oneStepBack = current;
        }

        return oneStepBack;
    }
}`,
  cpp: `class Solution {
public:
    int minCostClimbingStairs(vector<int>& cost) {
        int twoStepsBack = 0;
        int oneStepBack = 0;

        for (int step = 2; step <= cost.size(); step++) {
            int takeOneStep = oneStepBack + cost[step - 1];
            int takeTwoSteps = twoStepsBack + cost[step - 2];
            int current = min(takeOneStep, takeTwoSteps);

            twoStepsBack = oneStepBack;
            oneStepBack = current;
        }

        return oneStepBack;
    }
};`,
  typescript: `function minCostClimbingStairs(cost: number[]): number {
  let twoStepsBack = 0;
  let oneStepBack = 0;

  for (let step = 2; step <= cost.length; step++) {
    const takeOneStep = oneStepBack + cost[step - 1];
    const takeTwoSteps = twoStepsBack + cost[step - 2];
    const current = Math.min(takeOneStep, takeTwoSteps);

    twoStepsBack = oneStepBack;
    oneStepBack = current;
  }

  return oneStepBack;
}`,
  go: `func minCostClimbingStairs(cost []int) int {
    twoStepsBack := 0
    oneStepBack := 0

    for step := 2; step <= len(cost); step++ {
        takeOneStep := oneStepBack + cost[step - 1]
        takeTwoSteps := twoStepsBack + cost[step - 2]

        current := takeOneStep
        if takeTwoSteps < current {
            current = takeTwoSteps
        }

        twoStepsBack = oneStepBack
        oneStepBack = current
    }

    return oneStepBack
}`,
  csharp: `public class Solution {
    public int MinCostClimbingStairs(int[] cost) {
        int twoStepsBack = 0;
        int oneStepBack = 0;

        for (int step = 2; step <= cost.Length; step++) {
            int takeOneStep = oneStepBack + cost[step - 1];
            int takeTwoSteps = twoStepsBack + cost[step - 2];
            int current = Math.Min(takeOneStep, takeTwoSteps);

            twoStepsBack = oneStepBack;
            oneStepBack = current;
        }

        return oneStepBack;
    }
}`,
  rust: `impl Solution {
    pub fn min_cost_climbing_stairs(cost: Vec<i32>) -> i32 {
        let mut two_steps_back = 0;
        let mut one_step_back = 0;

        for step in 2..=cost.len() {
            let take_one_step = one_step_back + cost[step - 1];
            let take_two_steps = two_steps_back + cost[step - 2];
            let current = take_one_step.min(take_two_steps);

            two_steps_back = one_step_back;
            one_step_back = current;
        }

        one_step_back
    }
}`,
};

const TEST_CASES: TestCase[] = [
  { id: 1, cost: [10, 15, 20], expected: 15 },
  { id: 2, cost: [1, 100, 1, 1, 1, 100, 1, 1, 100, 1], expected: 6 },
  { id: 3, cost: [10, 15], expected: 10 },
  { id: 4, cost: [0, 0, 0, 0], expected: 0 },
  { id: 5, cost: [5, 10, 5, 10, 5], expected: 15 },
  { id: 6, cost: [3, 7, 2, 6, 1, 8], expected: 6 },
];

function getLanguageLabel(language: LanguageKey) {
  return LANGUAGES.find((item) => item.key === language)?.label ?? language;
}

function executeJavaScript(code: string, test: TestCase) {
  try {
    const minCostClimbingStairs = new Function(`
      "use strict";
      ${code}
      return minCostClimbingStairs;
    `)() as (cost: number[]) => number;

    if (typeof minCostClimbingStairs !== "function") {
      return {
        pass: false,
        actual: 0,
        error: "minCostClimbingStairs function was not found. Keep the function named minCostClimbingStairs.",
      };
    }

    const actual = minCostClimbingStairs([...test.cost]);

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

export default function MinCostClimbingStairsPracticePage() {
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
          ? "Not accepted yet. Implement minCostClimbingStairs, then run again."
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
                  1D STATE
                </span>
              </div>

              <div className="mb-3 flex items-center gap-3">
                <span className="text-5xl font-bold leading-none text-primary">$</span>
                <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                  Min Cost Climbing Stairs
                </h1>
              </div>

              <p className="max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
                State transition over one-dimensional positions.
              </p>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              <div className="mb-4 text-[10px] font-bold tracking-[0.35em] text-muted-foreground">
                DESCRIPTION
              </div>

              <div className="space-y-5 text-sm leading-7 text-muted-foreground">
                <div className="terminal-frame p-4">
                  <p>
                    You are given an array where <span className="text-foreground">cost[i]</span> is the cost of stepping on stair i.
                  </p>
                  <p className="mt-2">
                    You can start at stair 0 or stair 1, and each move can climb one or two steps.
                  </p>
                  <p className="mt-2">
                    Return the minimum cost needed to reach the top after the last stair.
                  </p>
                </div>

                <div className="terminal-frame p-4">
                  <h2 className="mb-3 text-xl font-bold text-foreground">Example</h2>
                  <pre className="overflow-x-auto whitespace-pre-wrap text-xs leading-6 md:text-sm">
{`Input: cost = [10,15,20]
Output: 15

Best choice:
start at stair 1
pay 15
climb two steps to the top`}
                  </pre>
                </div>

                <div className="terminal-frame p-4">
                  <h2 className="mb-3 text-xl font-bold text-foreground">DP Pattern</h2>
                  <ul className="list-disc space-y-2 pl-5">
                    <li>To reach a step, you came from one step before or two steps before</li>
                    <li>Pay the cost of the stair you stepped from</li>
                    <li>Use two rolling variables instead of a full DP array</li>
                    <li>Return the minimum cost to reach the top position</li>
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
