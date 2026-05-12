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
  weights: number[];
  values: number[];
  capacity: number;
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
  javascript: `function knapsack(weights, values, capacity) {
  // write your answer here using 0/1 DP
  throw new Error("Implement knapsack first");
}`,
  python: `def knapsack(weights, values, capacity):
    # write your answer here using 0/1 DP
    return 0`,
  java: `class Solution {
    public int knapsack(int[] weights, int[] values, int capacity) {
        // write your answer here using 0/1 DP
        return 0;
    }
}`,
  cpp: `int knapsack(vector<int>& weights, vector<int>& values, int capacity) {
    // write your answer here using 0/1 DP
    return 0;
}`,
  typescript: `function knapsack(weights: number[], values: number[], capacity: number): number {
  // write your answer here using 0/1 DP
  throw new Error("Implement knapsack first");
}`,
  go: `func knapsack(weights []int, values []int, capacity int) int {
    // write your answer here using 0/1 DP
    return 0
}`,
  csharp: `public int Knapsack(int[] weights, int[] values, int capacity) {
    // write your answer here using 0/1 DP
    return 0;
}`,
  rust: `fn knapsack(weights: Vec<i32>, values: Vec<i32>, capacity: i32) -> i32 {
    // write your answer here using 0/1 DP
    0
}`,
};

const SOLUTION_CODE: Record<LanguageKey, string> = {
  javascript: `function knapsack(weights, values, capacity) {
  const itemCount = weights.length;

  const dp = Array.from({ length: itemCount + 1 }, () =>
    new Array(capacity + 1).fill(0)
  );

  for (let item = 1; item <= itemCount; item++) {
    const weight = weights[item - 1];
    const value = values[item - 1];

    for (let cap = 0; cap <= capacity; cap++) {
      const skipItem = dp[item - 1][cap];
      let takeItem = 0;

      if (cap >= weight) {
        takeItem = value + dp[item - 1][cap - weight];
      }

      dp[item][cap] = Math.max(skipItem, takeItem);
    }
  }

  return dp[itemCount][capacity];
}`,
  python: `def knapsack(weights, values, capacity):
    item_count = len(weights)

    dp = [[0] * (capacity + 1) for _ in range(item_count + 1)]

    for item in range(1, item_count + 1):
        weight = weights[item - 1]
        value = values[item - 1]

        for cap in range(capacity + 1):
            skip_item = dp[item - 1][cap]
            take_item = 0

            if cap >= weight:
                take_item = value + dp[item - 1][cap - weight]

            dp[item][cap] = max(skip_item, take_item)

    return dp[item_count][capacity]`,
  java: `class Solution {
    public int knapsack(int[] weights, int[] values, int capacity) {
        int itemCount = weights.length;

        int[][] dp = new int[itemCount + 1][capacity + 1];

        for (int item = 1; item <= itemCount; item++) {
            int weight = weights[item - 1];
            int value = values[item - 1];

            for (int cap = 0; cap <= capacity; cap++) {
                int skipItem = dp[item - 1][cap];
                int takeItem = 0;

                if (cap >= weight) {
                    takeItem = value + dp[item - 1][cap - weight];
                }

                dp[item][cap] = Math.max(skipItem, takeItem);
            }
        }

        return dp[itemCount][capacity];
    }
}`,
  cpp: `int knapsack(vector<int>& weights, vector<int>& values, int capacity) {
    int itemCount = weights.size();

    vector<vector<int>> dp(itemCount + 1, vector<int>(capacity + 1, 0));

    for (int item = 1; item <= itemCount; item++) {
        int weight = weights[item - 1];
        int value = values[item - 1];

        for (int cap = 0; cap <= capacity; cap++) {
            int skipItem = dp[item - 1][cap];
            int takeItem = 0;

            if (cap >= weight) {
                takeItem = value + dp[item - 1][cap - weight];
            }

            dp[item][cap] = max(skipItem, takeItem);
        }
    }

    return dp[itemCount][capacity];
}`,
  typescript: `function knapsack(weights: number[], values: number[], capacity: number): number {
  const itemCount = weights.length;

  const dp: number[][] = Array.from({ length: itemCount + 1 }, () =>
    new Array(capacity + 1).fill(0)
  );

  for (let item = 1; item <= itemCount; item++) {
    const weight = weights[item - 1];
    const value = values[item - 1];

    for (let cap = 0; cap <= capacity; cap++) {
      const skipItem = dp[item - 1][cap];
      let takeItem = 0;

      if (cap >= weight) {
        takeItem = value + dp[item - 1][cap - weight];
      }

      dp[item][cap] = Math.max(skipItem, takeItem);
    }
  }

  return dp[itemCount][capacity];
}`,
  go: `func knapsack(weights []int, values []int, capacity int) int {
    itemCount := len(weights)

    dp := make([][]int, itemCount + 1)
    for i := range dp {
        dp[i] = make([]int, capacity + 1)
    }

    for item := 1; item <= itemCount; item++ {
        weight := weights[item - 1]
        value := values[item - 1]

        for cap := 0; cap <= capacity; cap++ {
            skipItem := dp[item - 1][cap]
            takeItem := 0

            if cap >= weight {
                takeItem = value + dp[item - 1][cap - weight]
            }

            if takeItem > skipItem {
                dp[item][cap] = takeItem
            } else {
                dp[item][cap] = skipItem
            }
        }
    }

    return dp[itemCount][capacity]
}`,
  csharp: `public int Knapsack(int[] weights, int[] values, int capacity) {
    int itemCount = weights.Length;

    int[,] dp = new int[itemCount + 1, capacity + 1];

    for (int item = 1; item <= itemCount; item++) {
        int weight = weights[item - 1];
        int value = values[item - 1];

        for (int cap = 0; cap <= capacity; cap++) {
            int skipItem = dp[item - 1, cap];
            int takeItem = 0;

            if (cap >= weight) {
                takeItem = value + dp[item - 1, cap - weight];
            }

            dp[item, cap] = Math.Max(skipItem, takeItem);
        }
    }

    return dp[itemCount, capacity];
}`,
  rust: `fn knapsack(weights: Vec<i32>, values: Vec<i32>, capacity: i32) -> i32 {
    let item_count = weights.len();
    let capacity = capacity as usize;

    let mut dp = vec![vec![0; capacity + 1]; item_count + 1];

    for item in 1..=item_count {
        let weight = weights[item - 1] as usize;
        let value = values[item - 1];

        for cap in 0..=capacity {
            let skip_item = dp[item - 1][cap];
            let mut take_item = 0;

            if cap >= weight {
                take_item = value + dp[item - 1][cap - weight];
            }

            dp[item][cap] = skip_item.max(take_item);
        }
    }

    dp[item_count][capacity]
}`,
};

const TEST_CASES: TestCase[] = [
  {
    id: 1,
    weights: [1, 3, 4, 5],
    values: [1, 4, 5, 7],
    capacity: 7,
    expected: 9,
  },
  {
    id: 2,
    weights: [2, 3, 4],
    values: [4, 5, 6],
    capacity: 5,
    expected: 9,
  },
  {
    id: 3,
    weights: [5, 4, 6, 3],
    values: [10, 40, 30, 50],
    capacity: 10,
    expected: 90,
  },
  {
    id: 4,
    weights: [4, 5, 1],
    values: [1, 2, 3],
    capacity: 4,
    expected: 3,
  },
  {
    id: 5,
    weights: [2, 2, 4, 6, 3],
    values: [6, 3, 5, 4, 6],
    capacity: 10,
    expected: 17,
  },
  {
    id: 6,
    weights: [],
    values: [],
    capacity: 10,
    expected: 0,
  },
  {
    id: 7,
    weights: [3, 4, 5],
    values: [30, 50, 60],
    capacity: 0,
    expected: 0,
  },
];

function getLanguageLabel(language: LanguageKey) {
  return LANGUAGES.find((item) => item.key === language)?.label ?? language;
}

function executeJavaScript(code: string, test: TestCase) {
  try {
    const knapsack = new Function(`
      "use strict";
      ${code}
      return knapsack;
    `)() as (weights: number[], values: number[], capacity: number) => number;

    if (typeof knapsack !== "function") {
      return {
        pass: false,
        actual: 0,
        error: "knapsack function was not found. Keep the function named knapsack.",
      };
    }

    const actual = knapsack([...test.weights], [...test.values], test.capacity);

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

export default function ZeroOneKnapsackPracticePage() {
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
        `weights: ${JSON.stringify(selectedCase.weights)}`,
        `values: ${JSON.stringify(selectedCase.values)}`,
        `capacity: ${selectedCase.capacity}`,
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
        lines.push(`  weights: ${JSON.stringify(test.weights)}`);
        lines.push(`  values: ${JSON.stringify(test.values)}`);
        lines.push(`  capacity: ${test.capacity}`);
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
          ? "Not accepted yet. Implement knapsack, then run again."
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
                  ITEM × CAPACITY
                </span>
              </div>

              <div className="mb-3 flex items-center gap-3">
                <span className="text-5xl font-bold leading-none text-primary">$</span>
                <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                  0/1 Knapsack
                </h1>
              </div>

              <p className="max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
                Capacity and item-index state transitions.
              </p>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              <div className="mb-4 text-[10px] font-bold tracking-[0.35em] text-muted-foreground">
                DESCRIPTION
              </div>

              <div className="space-y-5 text-sm leading-7 text-muted-foreground">
                <div className="terminal-frame p-4">
                  <p>
                    Given item weights, item values, and a maximum capacity, return the maximum total value you can carry.
                  </p>
                  <p className="mt-2">
                    Each item can be used at most once. That is why this is called 0/1 knapsack.
                  </p>
                  <p className="mt-2">
                    At every item, choose either <span className="text-foreground">skip</span> or{" "}
                    <span className="text-foreground">take</span>, if capacity allows it.
                  </p>
                </div>

                <div className="terminal-frame p-4">
                  <h2 className="mb-3 text-xl font-bold text-foreground">Example</h2>
                  <pre className="overflow-x-auto whitespace-pre-wrap text-xs leading-6 md:text-sm">
{`Input:
weights = [1,3,4,5]
values  = [1,4,5,7]
capacity = 7

Output: 9

Best choice:
take item with weight 3/value 4
take item with weight 4/value 5

Total weight = 7
Total value = 9`}
                  </pre>
                </div>

                <div className="terminal-frame p-4">
                  <h2 className="mb-3 text-xl font-bold text-foreground">DP Pattern</h2>
                  <ul className="list-disc space-y-2 pl-5">
                    <li>dp[item][cap] stores best value using first item items and capacity cap</li>
                    <li>Skip current item: dp[item - 1][cap]</li>
                    <li>Take current item: value + dp[item - 1][cap - weight]</li>
                    <li>Final answer is dp[itemCount][capacity]</li>
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
                        <p className="text-foreground">weights:</p>
                        <p className="break-all">{JSON.stringify(test.weights)}</p>
                        <p className="mt-2 text-foreground">values:</p>
                        <p className="break-all">{JSON.stringify(test.values)}</p>
                        <p className="mt-2 text-foreground">capacity: {test.capacity}</p>
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
                  <p className="mt-3">Expected approach: item × capacity DP</p>
                  <p>Time: O(n × capacity)</p>
                  <p>Space: O(n × capacity)</p>
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
