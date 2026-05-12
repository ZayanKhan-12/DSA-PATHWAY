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
  intervals: number[][];
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
  javascript: `function maxNonOverlappingIntervals(intervals) {
  // write your answer here using greedy sorting
  throw new Error("Implement maxNonOverlappingIntervals first");
}`,
  python: `def maxNonOverlappingIntervals(intervals):
    # write your answer here using greedy sorting
    return 0`,
  java: `class Solution {
    public int maxNonOverlappingIntervals(int[][] intervals) {
        // write your answer here using greedy sorting
        return 0;
    }
}`,
  cpp: `int maxNonOverlappingIntervals(vector<vector<int>>& intervals) {
    // write your answer here using greedy sorting
    return 0;
}`,
  typescript: `function maxNonOverlappingIntervals(intervals: number[][]): number {
  // write your answer here using greedy sorting
  throw new Error("Implement maxNonOverlappingIntervals first");
}`,
  go: `func maxNonOverlappingIntervals(intervals [][]int) int {
    // write your answer here using greedy sorting
    return 0
}`,
  csharp: `public int MaxNonOverlappingIntervals(int[][] intervals) {
    // write your answer here using greedy sorting
    return 0;
}`,
  rust: `fn max_non_overlapping_intervals(intervals: Vec<Vec<i32>>) -> i32 {
    // write your answer here using greedy sorting
    0
}`,
};

const SOLUTION_CODE: Record<LanguageKey, string> = {
  javascript: `function maxNonOverlappingIntervals(intervals) {
  if (intervals.length === 0) {
    return 0;
  }

  intervals.sort((a, b) => a[1] - b[1]);

  let count = 0;
  let lastEnd = -Infinity;

  for (const [start, end] of intervals) {
    if (start >= lastEnd) {
      count++;
      lastEnd = end;
    }
  }

  return count;
}`,
  python: `def maxNonOverlappingIntervals(intervals):
    if not intervals:
        return 0

    intervals.sort(key=lambda interval: interval[1])

    count = 0
    last_end = float("-inf")

    for start, end in intervals:
        if start >= last_end:
            count += 1
            last_end = end

    return count`,
  java: `class Solution {
    public int maxNonOverlappingIntervals(int[][] intervals) {
        if (intervals.length == 0) {
            return 0;
        }

        Arrays.sort(intervals, (a, b) -> Integer.compare(a[1], b[1]));

        int count = 0;
        int lastEnd = Integer.MIN_VALUE;

        for (int[] interval : intervals) {
            int start = interval[0];
            int end = interval[1];

            if (start >= lastEnd) {
                count++;
                lastEnd = end;
            }
        }

        return count;
    }
}`,
  cpp: `int maxNonOverlappingIntervals(vector<vector<int>>& intervals) {
    if (intervals.empty()) {
        return 0;
    }

    sort(intervals.begin(), intervals.end(), [](const vector<int>& a, const vector<int>& b) {
        return a[1] < b[1];
    });

    int count = 0;
    int lastEnd = INT_MIN;

    for (const auto& interval : intervals) {
        int start = interval[0];
        int end = interval[1];

        if (start >= lastEnd) {
            count++;
            lastEnd = end;
        }
    }

    return count;
}`,
  typescript: `function maxNonOverlappingIntervals(intervals: number[][]): number {
  if (intervals.length === 0) {
    return 0;
  }

  intervals.sort((a, b) => a[1] - b[1]);

  let count = 0;
  let lastEnd = -Infinity;

  for (const [start, end] of intervals) {
    if (start >= lastEnd) {
      count++;
      lastEnd = end;
    }
  }

  return count;
}`,
  go: `func maxNonOverlappingIntervals(intervals [][]int) int {
    if len(intervals) == 0 {
        return 0
    }

    sort.Slice(intervals, func(i int, j int) bool {
        return intervals[i][1] < intervals[j][1]
    })

    count := 0
    lastEnd := -1 << 31

    for _, interval := range intervals {
        start := interval[0]
        end := interval[1]

        if start >= lastEnd {
            count++
            lastEnd = end
        }
    }

    return count
}`,
  csharp: `public int MaxNonOverlappingIntervals(int[][] intervals) {
    if (intervals.Length == 0) {
        return 0;
    }

    Array.Sort(intervals, (a, b) => a[1].CompareTo(b[1]));

    int count = 0;
    int lastEnd = int.MinValue;

    foreach (int[] interval in intervals) {
        int start = interval[0];
        int end = interval[1];

        if (start >= lastEnd) {
            count++;
            lastEnd = end;
        }
    }

    return count;
}`,
  rust: `fn max_non_overlapping_intervals(mut intervals: Vec<Vec<i32>>) -> i32 {
    if intervals.is_empty() {
        return 0;
    }

    intervals.sort_by_key(|interval| interval[1]);

    let mut count = 0;
    let mut last_end = i32::MIN;

    for interval in intervals {
        let start = interval[0];
        let end = interval[1];

        if start >= last_end {
            count += 1;
            last_end = end;
        }
    }

    count
}`,
};

const TEST_CASES: TestCase[] = [
  {
    id: 1,
    intervals: [
      [1, 2],
      [2, 3],
      [3, 4],
      [1, 3],
    ],
    expected: 3,
  },
  {
    id: 2,
    intervals: [
      [1, 2],
      [1, 2],
      [1, 2],
    ],
    expected: 1,
  },
  {
    id: 3,
    intervals: [
      [1, 2],
      [2, 3],
    ],
    expected: 2,
  },
  {
    id: 4,
    intervals: [
      [0, 30],
      [5, 10],
      [15, 20],
    ],
    expected: 2,
  },
  {
    id: 5,
    intervals: [
      [1, 4],
      [2, 3],
      [3, 5],
      [7, 9],
      [8, 10],
    ],
    expected: 3,
  },
  {
    id: 6,
    intervals: [],
    expected: 0,
  },
  {
    id: 7,
    intervals: [
      [-10, -5],
      [-4, 0],
      [0, 3],
      [2, 5],
      [5, 7],
    ],
    expected: 4,
  },
];

function getLanguageLabel(language: LanguageKey) {
  return LANGUAGES.find((item) => item.key === language)?.label ?? language;
}

function executeJavaScript(code: string, test: TestCase) {
  try {
    const maxNonOverlappingIntervals = new Function(`
      "use strict";
      ${code}
      return maxNonOverlappingIntervals;
    `)() as (intervals: number[][]) => number;

    if (typeof maxNonOverlappingIntervals !== "function") {
      return {
        pass: false,
        actual: 0,
        error:
          "maxNonOverlappingIntervals function was not found. Keep the function named maxNonOverlappingIntervals.",
      };
    }

    const copiedIntervals = test.intervals.map((interval) => [...interval]);
    const actual = maxNonOverlappingIntervals(copiedIntervals);

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

export default function MaximumNumberOfNonOverlappingIntervalsPracticePage() {
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
        `intervals: ${JSON.stringify(selectedCase.intervals)}`,
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
        lines.push(`  intervals: ${JSON.stringify(test.intervals)}`);
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
          ? "Not accepted yet. Implement maxNonOverlappingIntervals, then run again."
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
            <Link className="hover:text-primary" href="/learn/greedy-intervals">
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
                  GREEDY
                </span>
                <span className="border border-border px-3 py-1 text-[10px] font-bold tracking-[0.25em] text-muted-foreground">
                  INTERVALS
                </span>
              </div>

              <div className="mb-3 flex items-center gap-3">
                <span className="text-5xl font-bold leading-none text-primary">$</span>
                <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                  Maximum Number of Non-Overlapping Intervals
                </h1>
              </div>

              <p className="max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
                Pick intervals by earliest ending time.
              </p>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              <div className="mb-4 text-[10px] font-bold tracking-[0.35em] text-muted-foreground">
                DESCRIPTION
              </div>

              <div className="space-y-5 text-sm leading-7 text-muted-foreground">
                <div className="terminal-frame p-4">
                  <p>
                    Given a list of intervals, return the maximum number of intervals you can choose so that none overlap.
                  </p>
                  <p className="mt-2">
                    Two intervals are compatible when the next interval starts at or after the previous interval ends.
                  </p>
                  <p className="mt-2">
                    The greedy rule is to always choose the interval that ends earliest.
                  </p>
                </div>

                <div className="terminal-frame p-4">
                  <h2 className="mb-3 text-xl font-bold text-foreground">Example</h2>
                  <pre className="overflow-x-auto whitespace-pre-wrap text-xs leading-6 md:text-sm">
{`Input:
intervals = [[1,2],[2,3],[3,4],[1,3]]

Output: 3

Choose:
[1,2], [2,3], [3,4]`}
                  </pre>
                </div>

                <div className="terminal-frame p-4">
                  <h2 className="mb-3 text-xl font-bold text-foreground">Greedy Pattern</h2>
                  <ul className="list-disc space-y-2 pl-5">
                    <li>Sort intervals by ending time</li>
                    <li>Track the end of the last selected interval</li>
                    <li>Select an interval only when start is greater than or equal to lastEnd</li>
                    <li>Earliest ending time leaves the most room for future intervals</li>
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
                        <p className="text-foreground">intervals:</p>
                        <p className="break-all">{JSON.stringify(test.intervals)}</p>
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
                  <p className="mt-3">Expected approach: greedy by earliest end</p>
                  <p>Time: O(n log n)</p>
                  <p>Space: O(1) excluding sort</p>
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
