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
  temperatures: number[];
  expected: number[];
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
  javascript: `function dailyTemperatures(temperatures) {
  // write your answer here
  return [];
}`,
  python: `class Solution:
    def dailyTemperatures(self, temperatures: List[int]) -> List[int]:
        # write your answer here
        return []`,
  java: `class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
        // write your answer here
        return new int[temperatures.length];
    }
}`,
  cpp: `class Solution {
public:
    vector<int> dailyTemperatures(vector<int>& temperatures) {
        // write your answer here
        return {};
    }
};`,
  typescript: `function dailyTemperatures(temperatures: number[]): number[] {
  // write your answer here
  return [];
}`,
  go: `func dailyTemperatures(temperatures []int) []int {
    // write your answer here
    return []int{}
}`,
  csharp: `public class Solution {
    public int[] DailyTemperatures(int[] temperatures) {
        // write your answer here
        return new int[temperatures.Length];
    }
}`,
  rust: `impl Solution {
    pub fn daily_temperatures(temperatures: Vec<i32>) -> Vec<i32> {
        // write your answer here
        vec![]
    }
}`,
};

const SOLUTION_CODE: Record<LanguageKey, string> = {
  javascript: `function dailyTemperatures(temperatures) {
  const answer = new Array(temperatures.length).fill(0);
  const stack = [];

  for (let i = 0; i < temperatures.length; i++) {
    while (
      stack.length > 0 &&
      temperatures[i] > temperatures[stack[stack.length - 1]]
    ) {
      const previousIndex = stack.pop();
      answer[previousIndex] = i - previousIndex;
    }

    stack.push(i);
  }

  return answer;
}`,
  python: `class Solution:
    def dailyTemperatures(self, temperatures: List[int]) -> List[int]:
        answer = [0] * len(temperatures)
        stack = []

        for i, temp in enumerate(temperatures):
            while stack and temp > temperatures[stack[-1]]:
                previous_index = stack.pop()
                answer[previous_index] = i - previous_index

            stack.append(i)

        return answer`,
  java: `class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
        int[] answer = new int[temperatures.length];
        Stack<Integer> stack = new Stack<>();

        for (int i = 0; i < temperatures.length; i++) {
            while (!stack.isEmpty() && temperatures[i] > temperatures[stack.peek()]) {
                int previousIndex = stack.pop();
                answer[previousIndex] = i - previousIndex;
            }

            stack.push(i);
        }

        return answer;
    }
}`,
  cpp: `class Solution {
public:
    vector<int> dailyTemperatures(vector<int>& temperatures) {
        vector<int> answer(temperatures.size(), 0);
        stack<int> st;

        for (int i = 0; i < temperatures.size(); i++) {
            while (!st.empty() && temperatures[i] > temperatures[st.top()]) {
                int previousIndex = st.top();
                st.pop();
                answer[previousIndex] = i - previousIndex;
            }

            st.push(i);
        }

        return answer;
    }
};`,
  typescript: `function dailyTemperatures(temperatures: number[]): number[] {
  const answer = new Array(temperatures.length).fill(0);
  const stack: number[] = [];

  for (let i = 0; i < temperatures.length; i++) {
    while (
      stack.length > 0 &&
      temperatures[i] > temperatures[stack[stack.length - 1]]
    ) {
      const previousIndex = stack.pop()!;
      answer[previousIndex] = i - previousIndex;
    }

    stack.push(i);
  }

  return answer;
}`,
  go: `func dailyTemperatures(temperatures []int) []int {
    answer := make([]int, len(temperatures))
    stack := []int{}

    for i, temp := range temperatures {
        for len(stack) > 0 && temp > temperatures[stack[len(stack)-1]] {
            previousIndex := stack[len(stack)-1]
            stack = stack[:len(stack)-1]
            answer[previousIndex] = i - previousIndex
        }

        stack = append(stack, i)
    }

    return answer
}`,
  csharp: `public class Solution {
    public int[] DailyTemperatures(int[] temperatures) {
        int[] answer = new int[temperatures.Length];
        Stack<int> stack = new Stack<int>();

        for (int i = 0; i < temperatures.Length; i++) {
            while (stack.Count > 0 && temperatures[i] > temperatures[stack.Peek()]) {
                int previousIndex = stack.Pop();
                answer[previousIndex] = i - previousIndex;
            }

            stack.Push(i);
        }

        return answer;
    }
}`,
  rust: `impl Solution {
    pub fn daily_temperatures(temperatures: Vec<i32>) -> Vec<i32> {
        let mut answer = vec![0; temperatures.len()];
        let mut stack: Vec<usize> = Vec::new();

        for i in 0..temperatures.len() {
            while let Some(&previous_index) = stack.last() {
                if temperatures[i] <= temperatures[previous_index] {
                    break;
                }

                stack.pop();
                answer[previous_index] = (i - previous_index) as i32;
            }

            stack.push(i);
        }

        answer
    }
}`,
};

const TEST_CASES: TestCase[] = [
  {
    id: 1,
    temperatures: [73, 74, 75, 71, 69, 72, 76, 73],
    expected: [1, 1, 4, 2, 1, 1, 0, 0],
  },
  {
    id: 2,
    temperatures: [30, 40, 50, 60],
    expected: [1, 1, 1, 0],
  },
  {
    id: 3,
    temperatures: [30, 60, 90],
    expected: [1, 1, 0],
  },
  {
    id: 4,
    temperatures: [90, 80, 70, 60],
    expected: [0, 0, 0, 0],
  },
];

function getLanguageLabel(language: LanguageKey) {
  return LANGUAGES.find((item) => item.key === language)?.label ?? language;
}

function arraysEqual(a: number[], b: number[]) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function executeJavaScriptDailyTemperatures(code: string, test: TestCase) {
  try {
    const userFunction = new Function(`
      "use strict";
      ${code}
      return dailyTemperatures;
    `)() as (temperatures: number[]) => number[];

    if (typeof userFunction !== "function") {
      return {
        pass: false,
        actual: [] as number[],
        error: "dailyTemperatures function was not found. Keep the function named dailyTemperatures.",
      };
    }

    const actual = userFunction([...test.temperatures]);

    if (!Array.isArray(actual)) {
      return {
        pass: false,
        actual: [] as number[],
        error: "Your function must return an array.",
      };
    }

    return {
      pass: arraysEqual(actual, test.expected),
      actual,
      error: "",
    };
  } catch (error) {
    return {
      pass: false,
      actual: [] as number[],
      error: error instanceof Error ? error.message : "Unknown runtime error.",
    };
  }
}

export default function DailyTemperaturesPracticePage() {
  const [language, setLanguage] = useState<LanguageKey>("javascript");
  const [editorCode, setEditorCode] = useState<Record<LanguageKey, string>>(STARTER_CODE);
  const [showSolution, setShowSolution] = useState(false);
  const [selectedCaseId, setSelectedCaseId] = useState(1);
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
          "Only JavaScript runs inside this frontend page.",
          "Switch to JAVASCRIPT for executable tests.",
        ].join("\n")
      );

      setResultText(`${label} is editable preview only.`);
      return;
    }

    const result = executeJavaScriptDailyTemperatures(editorCode.javascript, selectedCase);

    setConsoleOutput(
      [
        "$ run.sample",
        `case: ${selectedCase.id}`,
        `temperatures: ${JSON.stringify(selectedCase.temperatures)}`,
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
          "Only JavaScript runs inside this frontend page.",
          "Switch to JAVASCRIPT for executable tests.",
        ].join("\n")
      );

      setResultText(`${label} is editable preview only.`);
      return;
    }

    const lines = ["$ submit"];
    let passed = 0;

    for (const test of TEST_CASES) {
      const result = executeJavaScriptDailyTemperatures(editorCode.javascript, test);

      if (result.pass) {
        passed++;
        lines.push(`case ${test.id}: PASS`);
      } else {
        lines.push(`case ${test.id}: FAIL`);
        lines.push(`  temperatures: ${JSON.stringify(test.temperatures)}`);
        lines.push(`  expected: ${JSON.stringify(test.expected)}`);
        lines.push(`  got: ${result.error ? "runtime error" : JSON.stringify(result.actual)}`);
        if (result.error) {
          lines.push(`  error: ${result.error}`);
        }
      }
    }

    lines.push("");
    lines.push(`passed: ${passed}/${TEST_CASES.length}`);

    setConsoleOutput(lines.join("\n"));

    setResultText(
      passed === TEST_CASES.length
        ? "Accepted. All test cases passed."
        : `Wrong Answer. ${passed}/${TEST_CASES.length} cases passed.`
    );
  }

  function loadSolution() {
    setEditorCode((previous) => ({
      ...previous,
      [language]: SOLUTION_CODE[language],
    }));

    setConsoleOutput(`$ loaded ${getLanguageLabel(language)} solution`);

    setResultText(
      language === "javascript"
        ? "Loaded runnable JavaScript solution."
        : "Loaded preview solution."
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-[1740px] px-4 py-4">
        <div className="mb-4 flex h-14 items-center justify-between border border-border bg-black/30 px-5">
          <Link href="/" className="text-[10px] font-bold tracking-[0.35em] text-primary">
            DSA.ENGINE
          </Link>

          <div className="flex items-center gap-5 text-[10px] font-bold tracking-[0.3em] text-muted-foreground">
            <Link className="hover:text-primary" href="/visualize/stack-queue">
              VISUALIZER
            </Link>
            <Link className="hover:text-primary" href="/learn/stack-queue#practice">
              BACK TO LESSON
            </Link>
          </div>
        </div>

        <div className="grid h-[calc(100vh-96px)] min-h-[760px] gap-4 xl:grid-cols-[0.78fr_1.22fr]">
          <section className="flex min-h-0 flex-col overflow-hidden border border-border bg-black/20">
            <div className="border-b border-border bg-black/20 px-5 py-4">
              <div className="mb-3 flex gap-2">
                <span className="border border-primary px-3 py-1 text-[10px] font-bold tracking-[0.25em] text-primary">
                  MEDIUM
                </span>
                <span className="border border-border px-3 py-1 text-[10px] font-bold tracking-[0.25em] text-muted-foreground">
                  STACK
                </span>
                <span className="border border-border px-3 py-1 text-[10px] font-bold tracking-[0.25em] text-muted-foreground">
                  MONOTONIC
                </span>
              </div>

              <div className="mb-3 flex items-center gap-3">
                <span className="text-5xl font-bold leading-none text-primary">$</span>
                <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                  Daily Temperatures
                </h1>
              </div>

              <p className="max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
                For each day, return how many days you must wait until a warmer temperature appears.
              </p>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              <div className="mb-4 text-[10px] font-bold tracking-[0.35em] text-muted-foreground">
                DESCRIPTION
              </div>

              <div className="space-y-5 text-sm leading-7 text-muted-foreground">
                <div className="terminal-frame p-4">
                  <p>
                    Given an array of daily temperatures, return an array where each index stores the number of days until a warmer temperature.
                  </p>
                  <p className="mt-2">
                    If there is no future day with a warmer temperature, store <span className="text-foreground">0</span>.
                  </p>
                  <p className="mt-2">
                    The key pattern is a monotonic decreasing stack of unresolved indices.
                  </p>
                </div>

                <div>
                  <div className="mb-3 text-[10px] font-bold tracking-[0.35em] text-muted-foreground">
                    EXAMPLES
                  </div>

                  <div className="terminal-frame p-4">
                    <h2 className="mb-3 text-xl font-bold text-foreground">Example 1</h2>
                    <pre className="overflow-x-auto whitespace-pre-wrap text-xs leading-6 md:text-sm">
{`Input: temperatures = [73,74,75,71,69,72,76,73]
Output: [1,1,4,2,1,1,0,0]`}
                    </pre>
                  </div>

                  <div className="terminal-frame mt-3 p-4">
                    <h2 className="mb-3 text-xl font-bold text-foreground">Example 2</h2>
                    <pre className="overflow-x-auto whitespace-pre-wrap text-xs leading-6 md:text-sm">
{`Input: temperatures = [30,40,50,60]
Output: [1,1,1,0]`}
                    </pre>
                  </div>
                </div>

                <div className="terminal-frame p-4">
                  <h2 className="mb-3 text-xl font-bold text-foreground">Constraints</h2>
                  <ul className="list-disc space-y-2 pl-5">
                    <li>1 ≤ temperatures.length ≤ 10^5</li>
                    <li>30 ≤ temperatures[i] ≤ 100</li>
                    <li>Use a stack of indices, not temperatures alone</li>
                    <li>Each index should be pushed and popped at most once</li>
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
                        <p className="mb-1 text-foreground">temperatures:</p>
                        <p className="break-all">{JSON.stringify(test.temperatures)}</p>
                        <p className="mt-2 text-foreground">expected: {JSON.stringify(test.expected)}</p>
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
                  JavaScript runs real local tests. Other languages are editable previews until a backend compiler is added.
                </div>
              </aside>
            </div>

            <div className="grid h-[210px] flex-none xl:grid-cols-2">
              <div className="border-r border-border px-4 py-4">
                <div className="mb-3 text-[10px] font-bold tracking-[0.35em] text-muted-foreground">
                  CONSOLE
                </div>

                <div className="terminal-frame h-[150px] overflow-auto p-3">
                  <pre className="whitespace-pre-wrap break-words text-xs leading-6">
                    {consoleOutput}
                  </pre>
                </div>
              </div>

              <div className="px-4 py-4">
                <div className="mb-3 text-[10px] font-bold tracking-[0.35em] text-muted-foreground">
                  RESULT
                </div>

                <div className="terminal-frame h-[150px] overflow-auto p-3 text-xs leading-6 text-muted-foreground">
                  <p>{resultText}</p>
                  <p className="mt-3">Expected approach: monotonic decreasing stack</p>
                  <p>Time: O(n)</p>
                  <p>Space: O(n)</p>
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
