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
  points: number[][];
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
  javascript: `function findMinArrowShots(points) {
  // write your answer here using greedy sorting
  throw new Error("Implement findMinArrowShots first");
}`,
  python: `class Solution:
    def findMinArrowShots(self, points: List[List[int]]) -> int:
        # write your answer here using greedy sorting
        return 0`,
  java: `class Solution {
    public int findMinArrowShots(int[][] points) {
        // write your answer here using greedy sorting
        return 0;
    }
}`,
  cpp: `class Solution {
public:
    int findMinArrowShots(vector<vector<int>>& points) {
        // write your answer here using greedy sorting
        return 0;
    }
};`,
  typescript: `function findMinArrowShots(points: number[][]): number {
  // write your answer here using greedy sorting
  throw new Error("Implement findMinArrowShots first");
}`,
  go: `func findMinArrowShots(points [][]int) int {
    // write your answer here using greedy sorting
    return 0
}`,
  csharp: `public class Solution {
    public int FindMinArrowShots(int[][] points) {
        // write your answer here using greedy sorting
        return 0;
    }
}`,
  rust: `impl Solution {
    pub fn find_min_arrow_shots(points: Vec<Vec<i32>>) -> i32 {
        // write your answer here using greedy sorting
        0
    }
}`,
};

const SOLUTION_CODE: Record<LanguageKey, string> = {
  javascript: `function findMinArrowShots(points) {
  if (points.length === 0) {
    return 0;
  }

  points.sort((a, b) => a[1] - b[1]);

  let arrows = 1;
  let arrowPosition = points[0][1];

  for (let i = 1; i < points.length; i++) {
    const start = points[i][0];
    const end = points[i][1];

    if (start > arrowPosition) {
      arrows++;
      arrowPosition = end;
    }
  }

  return arrows;
}`,
  python: `class Solution:
    def findMinArrowShots(self, points: List[List[int]]) -> int:
        if not points:
            return 0

        points.sort(key=lambda point: point[1])

        arrows = 1
        arrow_position = points[0][1]

        for start, end in points[1:]:
            if start > arrow_position:
                arrows += 1
                arrow_position = end

        return arrows`,
  java: `class Solution {
    public int findMinArrowShots(int[][] points) {
        if (points.length == 0) {
            return 0;
        }

        Arrays.sort(points, (a, b) -> Integer.compare(a[1], b[1]));

        int arrows = 1;
        int arrowPosition = points[0][1];

        for (int i = 1; i < points.length; i++) {
            int start = points[i][0];
            int end = points[i][1];

            if (start > arrowPosition) {
                arrows++;
                arrowPosition = end;
            }
        }

        return arrows;
    }
}`,
  cpp: `class Solution {
public:
    int findMinArrowShots(vector<vector<int>>& points) {
        if (points.empty()) {
            return 0;
        }

        sort(points.begin(), points.end(), [](const vector<int>& a, const vector<int>& b) {
            return a[1] < b[1];
        });

        int arrows = 1;
        int arrowPosition = points[0][1];

        for (int i = 1; i < points.size(); i++) {
            int start = points[i][0];
            int end = points[i][1];

            if (start > arrowPosition) {
                arrows++;
                arrowPosition = end;
            }
        }

        return arrows;
    }
};`,
  typescript: `function findMinArrowShots(points: number[][]): number {
  if (points.length === 0) {
    return 0;
  }

  points.sort((a, b) => a[1] - b[1]);

  let arrows = 1;
  let arrowPosition = points[0][1];

  for (let i = 1; i < points.length; i++) {
    const start = points[i][0];
    const end = points[i][1];

    if (start > arrowPosition) {
      arrows++;
      arrowPosition = end;
    }
  }

  return arrows;
}`,
  go: `func findMinArrowShots(points [][]int) int {
    if len(points) == 0 {
        return 0
    }

    sort.Slice(points, func(i int, j int) bool {
        return points[i][1] < points[j][1]
    })

    arrows := 1
    arrowPosition := points[0][1]

    for i := 1; i < len(points); i++ {
        start := points[i][0]
        end := points[i][1]

        if start > arrowPosition {
            arrows++
            arrowPosition = end
        }
    }

    return arrows
}`,
  csharp: `public class Solution {
    public int FindMinArrowShots(int[][] points) {
        if (points.Length == 0) {
            return 0;
        }

        Array.Sort(points, (a, b) => a[1].CompareTo(b[1]));

        int arrows = 1;
        int arrowPosition = points[0][1];

        for (int i = 1; i < points.Length; i++) {
            int start = points[i][0];
            int end = points[i][1];

            if (start > arrowPosition) {
                arrows++;
                arrowPosition = end;
            }
        }

        return arrows;
    }
}`,
  rust: `impl Solution {
    pub fn find_min_arrow_shots(mut points: Vec<Vec<i32>>) -> i32 {
        if points.is_empty() {
            return 0;
        }

        points.sort_by_key(|point| point[1]);

        let mut arrows = 1;
        let mut arrow_position = points[0][1];

        for i in 1..points.len() {
            let start = points[i][0];
            let end = points[i][1];

            if start > arrow_position {
                arrows += 1;
                arrow_position = end;
            }
        }

        arrows
    }
}`,
};

const TEST_CASES: TestCase[] = [
  {
    id: 1,
    points: [
      [10, 16],
      [2, 8],
      [1, 6],
      [7, 12],
    ],
    expected: 2,
  },
  {
    id: 2,
    points: [
      [1, 2],
      [3, 4],
      [5, 6],
      [7, 8],
    ],
    expected: 4,
  },
  {
    id: 3,
    points: [
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
    ],
    expected: 2,
  },
  {
    id: 4,
    points: [[1, 2]],
    expected: 1,
  },
  {
    id: 5,
    points: [
      [1, 10],
      [2, 3],
      [4, 5],
      [6, 7],
      [8, 9],
    ],
    expected: 4,
  },
  {
    id: 6,
    points: [],
    expected: 0,
  },
  {
    id: 7,
    points: [
      [-2147483648, 2147483647],
      [1, 2],
      [3, 4],
      [5, 6],
    ],
    expected: 3,
  },
];

function getLanguageLabel(language: LanguageKey) {
  return LANGUAGES.find((item) => item.key === language)?.label ?? language;
}

function executeJavaScript(code: string, test: TestCase) {
  try {
    const findMinArrowShots = new Function(`
      "use strict";
      ${code}
      return findMinArrowShots;
    `)() as (points: number[][]) => number;

    if (typeof findMinArrowShots !== "function") {
      return {
        pass: false,
        actual: 0,
        error: "findMinArrowShots function was not found. Keep the function named findMinArrowShots.",
      };
    }

    const copiedPoints = test.points.map((point) => [...point]);
    const actual = findMinArrowShots(copiedPoints);

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

export default function MinimumArrowsToBurstBalloonsPracticePage() {
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
        `points: ${JSON.stringify(selectedCase.points)}`,
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
        lines.push(`  points: ${JSON.stringify(test.points)}`);
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
          ? "Not accepted yet. Implement findMinArrowShots, then run again."
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
                  Minimum Arrows to Burst Balloons
                </h1>
              </div>

              <p className="max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
                Minimize arrows by shooting at the earliest possible balloon end.
              </p>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              <div className="mb-4 text-[10px] font-bold tracking-[0.35em] text-muted-foreground">
                DESCRIPTION
              </div>

              <div className="space-y-5 text-sm leading-7 text-muted-foreground">
                <div className="terminal-frame p-4">
                  <p>
                    Each balloon is represented as an interval <span className="text-foreground">[start, end]</span>.
                  </p>
                  <p className="mt-2">
                    One arrow shot at position x bursts every balloon where start ≤ x ≤ end.
                  </p>
                  <p className="mt-2">
                    Return the minimum number of arrows needed to burst all balloons.
                  </p>
                </div>

                <div className="terminal-frame p-4">
                  <h2 className="mb-3 text-xl font-bold text-foreground">Example</h2>
                  <pre className="overflow-x-auto whitespace-pre-wrap text-xs leading-6 md:text-sm">
{`Input:
points = [[10,16],[2,8],[1,6],[7,12]]

Output: 2

Reason:
Shoot one arrow at x = 6 to burst [1,6] and [2,8].
Shoot one arrow at x = 12 to burst [7,12] and [10,16].`}
                  </pre>
                </div>

                <div className="terminal-frame p-4">
                  <h2 className="mb-3 text-xl font-bold text-foreground">Greedy Pattern</h2>
                  <ul className="list-disc space-y-2 pl-5">
                    <li>Sort balloons by ending coordinate</li>
                    <li>Place the first arrow at the earliest end</li>
                    <li>If the next balloon starts after the current arrow, use a new arrow</li>
                    <li>If the next balloon starts before or at the arrow, it is already burst</li>
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
                        <p className="text-foreground">points:</p>
                        <p className="break-all">{JSON.stringify(test.points)}</p>
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
