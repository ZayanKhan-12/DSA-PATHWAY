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
  numCourses: number;
  prerequisites: number[][];
  expected: boolean;
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
  javascript: `function canFinish(numCourses, prerequisites) {
  // write your answer here
  throw new Error("Implement canFinish first");
}`,
  python: `class Solution:
    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        # write your answer here
        return True`,
  java: `class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        // write your answer here
        return true;
    }
}`,
  cpp: `class Solution {
public:
    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
        // write your answer here
        return true;
    }
};`,
  typescript: `function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  // write your answer here
  return true;
}`,
  go: `func canFinish(numCourses int, prerequisites [][]int) bool {
    // write your answer here
    return true
}`,
  csharp: `public class Solution {
    public bool CanFinish(int numCourses, int[][] prerequisites) {
        // write your answer here
        return true;
    }
}`,
  rust: `impl Solution {
    pub fn can_finish(num_courses: i32, prerequisites: Vec<Vec<i32>>) -> bool {
        // write your answer here
        true
    }
}`,
};

const SOLUTION_CODE: Record<LanguageKey, string> = {
  javascript: `function canFinish(numCourses, prerequisites) {
  const graph = Array.from({ length: numCourses }, () => []);

  for (const [course, prereq] of prerequisites) {
    graph[prereq].push(course);
  }

  const state = new Array(numCourses).fill(0);
  // 0 = unvisited
  // 1 = visiting
  // 2 = done

  function hasCycle(course) {
    if (state[course] === 1) {
      return true;
    }

    if (state[course] === 2) {
      return false;
    }

    state[course] = 1;

    for (const nextCourse of graph[course]) {
      if (hasCycle(nextCourse)) {
        return true;
      }
    }

    state[course] = 2;
    return false;
  }

  for (let course = 0; course < numCourses; course++) {
    if (hasCycle(course)) {
      return false;
    }
  }

  return true;
}`,
  python: `class Solution:
    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        graph = [[] for _ in range(numCourses)]

        for course, prereq in prerequisites:
            graph[prereq].append(course)

        state = [0] * numCourses
        # 0 = unvisited
        # 1 = visiting
        # 2 = done

        def has_cycle(course):
            if state[course] == 1:
                return True

            if state[course] == 2:
                return False

            state[course] = 1

            for next_course in graph[course]:
                if has_cycle(next_course):
                    return True

            state[course] = 2
            return False

        for course in range(numCourses):
            if has_cycle(course):
                return False

        return True`,
  java: `class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        List<Integer>[] graph = new ArrayList[numCourses];

        for (int i = 0; i < numCourses; i++) {
            graph[i] = new ArrayList<>();
        }

        for (int[] edge : prerequisites) {
            int course = edge[0];
            int prereq = edge[1];
            graph[prereq].add(course);
        }

        int[] state = new int[numCourses];

        for (int course = 0; course < numCourses; course++) {
            if (hasCycle(course, graph, state)) {
                return false;
            }
        }

        return true;
    }

    private boolean hasCycle(int course, List<Integer>[] graph, int[] state) {
        if (state[course] == 1) {
            return true;
        }

        if (state[course] == 2) {
            return false;
        }

        state[course] = 1;

        for (int nextCourse : graph[course]) {
            if (hasCycle(nextCourse, graph, state)) {
                return true;
            }
        }

        state[course] = 2;
        return false;
    }
}`,
  cpp: `class Solution {
public:
    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
        vector<vector<int>> graph(numCourses);

        for (auto& edge : prerequisites) {
            int course = edge[0];
            int prereq = edge[1];
            graph[prereq].push_back(course);
        }

        vector<int> state(numCourses, 0);

        for (int course = 0; course < numCourses; course++) {
            if (hasCycle(course, graph, state)) {
                return false;
            }
        }

        return true;
    }

private:
    bool hasCycle(int course, vector<vector<int>>& graph, vector<int>& state) {
        if (state[course] == 1) {
            return true;
        }

        if (state[course] == 2) {
            return false;
        }

        state[course] = 1;

        for (int nextCourse : graph[course]) {
            if (hasCycle(nextCourse, graph, state)) {
                return true;
            }
        }

        state[course] = 2;
        return false;
    }
};`,
  typescript: `function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  const graph: number[][] = Array.from({ length: numCourses }, () => []);

  for (const [course, prereq] of prerequisites) {
    graph[prereq].push(course);
  }

  const state = new Array(numCourses).fill(0);

  function hasCycle(course: number): boolean {
    if (state[course] === 1) {
      return true;
    }

    if (state[course] === 2) {
      return false;
    }

    state[course] = 1;

    for (const nextCourse of graph[course]) {
      if (hasCycle(nextCourse)) {
        return true;
      }
    }

    state[course] = 2;
    return false;
  }

  for (let course = 0; course < numCourses; course++) {
    if (hasCycle(course)) {
      return false;
    }
  }

  return true;
}`,
  go: `func canFinish(numCourses int, prerequisites [][]int) bool {
    graph := make([][]int, numCourses)

    for _, edge := range prerequisites {
        course := edge[0]
        prereq := edge[1]
        graph[prereq] = append(graph[prereq], course)
    }

    state := make([]int, numCourses)

    var hasCycle func(int) bool
    hasCycle = func(course int) bool {
        if state[course] == 1 {
            return true
        }

        if state[course] == 2 {
            return false
        }

        state[course] = 1

        for _, nextCourse := range graph[course] {
            if hasCycle(nextCourse) {
                return true
            }
        }

        state[course] = 2
        return false
    }

    for course := 0; course < numCourses; course++ {
        if hasCycle(course) {
            return false
        }
    }

    return true
}`,
  csharp: `public class Solution {
    public bool CanFinish(int numCourses, int[][] prerequisites) {
        List<int>[] graph = new List<int>[numCourses];

        for (int i = 0; i < numCourses; i++) {
            graph[i] = new List<int>();
        }

        foreach (int[] edge in prerequisites) {
            int course = edge[0];
            int prereq = edge[1];
            graph[prereq].Add(course);
        }

        int[] state = new int[numCourses];

        bool HasCycle(int course) {
            if (state[course] == 1) {
                return true;
            }

            if (state[course] == 2) {
                return false;
            }

            state[course] = 1;

            foreach (int nextCourse in graph[course]) {
                if (HasCycle(nextCourse)) {
                    return true;
                }
            }

            state[course] = 2;
            return false;
        }

        for (int course = 0; course < numCourses; course++) {
            if (HasCycle(course)) {
                return false;
            }
        }

        return true;
    }
}`,
  rust: `impl Solution {
    pub fn can_finish(num_courses: i32, prerequisites: Vec<Vec<i32>>) -> bool {
        let n = num_courses as usize;
        let mut graph = vec![Vec::new(); n];

        for edge in prerequisites {
            let course = edge[0] as usize;
            let prereq = edge[1] as usize;
            graph[prereq].push(course);
        }

        let mut state = vec![0; n];

        fn has_cycle(course: usize, graph: &Vec<Vec<usize>>, state: &mut Vec<i32>) -> bool {
            if state[course] == 1 {
                return true;
            }

            if state[course] == 2 {
                return false;
            }

            state[course] = 1;

            for &next_course in &graph[course] {
                if has_cycle(next_course, graph, state) {
                    return true;
                }
            }

            state[course] = 2;
            false
        }

        for course in 0..n {
            if has_cycle(course, &graph, &mut state) {
                return false;
            }
        }

        true
    }
}`,
};

const TEST_CASES: TestCase[] = [
  {
    id: 1,
    numCourses: 2,
    prerequisites: [[1, 0]],
    expected: true,
  },
  {
    id: 2,
    numCourses: 2,
    prerequisites: [
      [1, 0],
      [0, 1],
    ],
    expected: false,
  },
  {
    id: 3,
    numCourses: 4,
    prerequisites: [
      [1, 0],
      [2, 1],
      [3, 2],
    ],
    expected: true,
  },
  {
    id: 4,
    numCourses: 4,
    prerequisites: [
      [1, 0],
      [2, 1],
      [0, 2],
    ],
    expected: false,
  },
  {
    id: 5,
    numCourses: 5,
    prerequisites: [
      [1, 4],
      [2, 4],
      [3, 1],
      [3, 2],
    ],
    expected: true,
  },
];

function getLanguageLabel(language: LanguageKey) {
  return LANGUAGES.find((item) => item.key === language)?.label ?? language;
}

function clonePrerequisites(prerequisites: number[][]) {
  return prerequisites.map((edge) => [...edge]);
}

function executeJavaScript(code: string, test: TestCase) {
  try {
    const canFinish = new Function(`
      "use strict";
      ${code}
      return canFinish;
    `)() as (numCourses: number, prerequisites: number[][]) => boolean;

    if (typeof canFinish !== "function") {
      return {
        pass: false,
        actual: false,
        error: "canFinish function was not found. Keep the function named canFinish.",
      };
    }

    const actual = canFinish(test.numCourses, clonePrerequisites(test.prerequisites));

    if (typeof actual !== "boolean") {
      return {
        pass: false,
        actual: false,
        error: "Your function must return a boolean.",
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
      actual: false,
      error: error instanceof Error ? error.message : "Unknown runtime error.",
    };
  }
}

export default function CourseSchedulePracticePage() {
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
        `numCourses: ${selectedCase.numCourses}`,
        `prerequisites: ${JSON.stringify(selectedCase.prerequisites)}`,
        `expected: ${String(selectedCase.expected)}`,
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
        lines.push(`  numCourses: ${test.numCourses}`);
        lines.push(`  prerequisites: ${JSON.stringify(test.prerequisites)}`);
        lines.push(`  expected: ${String(test.expected)}`);
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
          ? "Not accepted yet. Implement canFinish, then run again."
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
            <Link className="hover:text-primary" href="/learn/dfs">
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
                  DFS
                </span>
                <span className="border border-border px-3 py-1 text-[10px] font-bold tracking-[0.25em] text-muted-foreground">
                  DIRECTED GRAPH
                </span>
              </div>

              <div className="mb-3 flex items-center gap-3">
                <span className="text-5xl font-bold leading-none text-primary">$</span>
                <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                  Course Schedule
                </h1>
              </div>

              <p className="max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
                Detect whether a directed graph contains a cycle using DFS states.
              </p>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              <div className="mb-4 text-[10px] font-bold tracking-[0.35em] text-muted-foreground">
                DESCRIPTION
              </div>

              <div className="space-y-5 text-sm leading-7 text-muted-foreground">
                <div className="terminal-frame p-4">
                  <p>
                    There are <span className="text-foreground">numCourses</span> courses labeled from{" "}
                    <span className="text-foreground">0</span> to{" "}
                    <span className="text-foreground">numCourses - 1</span>.
                  </p>
                  <p className="mt-2">
                    Each prerequisite pair <span className="text-foreground">[a, b]</span> means you must take{" "}
                    <span className="text-foreground">b</span> before{" "}
                    <span className="text-foreground">a</span>.
                  </p>
                  <p className="mt-2">
                    Return <span className="text-foreground">false</span> if the graph has a cycle. Otherwise return{" "}
                    <span className="text-foreground">true</span>.
                  </p>
                </div>

                <div className="terminal-frame p-4">
                  <h2 className="mb-3 text-xl font-bold text-foreground">Example</h2>
                  <pre className="overflow-x-auto whitespace-pre-wrap text-xs leading-6 md:text-sm">
{`Input: numCourses = 2, prerequisites = [[1,0]]
Output: true

Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
Output: false`}
                  </pre>
                </div>

                <div className="terminal-frame p-4">
                  <h2 className="mb-3 text-xl font-bold text-foreground">DFS State Pattern</h2>
                  <ul className="list-disc space-y-2 pl-5">
                    <li>0 means unvisited</li>
                    <li>1 means currently visiting</li>
                    <li>2 means fully processed</li>
                    <li>If DFS reaches a visiting node, a cycle exists</li>
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
                        <p className="text-foreground">numCourses:</p>
                        <p>{test.numCourses}</p>
                        <p className="mt-2 text-foreground">prerequisites:</p>
                        <p className="break-all">{JSON.stringify(test.prerequisites)}</p>
                        <p className="mt-2 text-foreground">expected: {String(test.expected)}</p>
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
                  <p className="mt-3">Expected approach: DFS cycle detection</p>
                  <p>Time: O(V + E)</p>
                  <p>Space: O(V + E)</p>
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
