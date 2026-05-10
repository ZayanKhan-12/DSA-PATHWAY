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
  deadends: string[];
  target: string;
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
  javascript: `function openLock(deadends, target) {
  // write your answer here using BFS
  throw new Error("Implement openLock first");
}`,
  python: `class Solution:
    def openLock(self, deadends: List[str], target: str) -> int:
        # write your answer here using BFS
        return -1`,
  java: `class Solution {
    public int openLock(String[] deadends, String target) {
        // write your answer here using BFS
        return -1;
    }
}`,
  cpp: `class Solution {
public:
    int openLock(vector<string>& deadends, string target) {
        // write your answer here using BFS
        return -1;
    }
};`,
  typescript: `function openLock(deadends: string[], target: string): number {
  // write your answer here using BFS
  throw new Error("Implement openLock first");
}`,
  go: `func openLock(deadends []string, target string) int {
    // write your answer here using BFS
    return -1
}`,
  csharp: `public class Solution {
    public int OpenLock(string[] deadends, string target) {
        // write your answer here using BFS
        return -1;
    }
}`,
  rust: `impl Solution {
    pub fn open_lock(deadends: Vec<String>, target: String) -> i32 {
        // write your answer here using BFS
        -1
    }
}`,
};

const SOLUTION_CODE: Record<LanguageKey, string> = {
  javascript: `function openLock(deadends, target) {
  const dead = new Set(deadends);

  if (dead.has("0000")) {
    return -1;
  }

  if (target === "0000") {
    return 0;
  }

  function getNeighbors(state) {
    const result = [];

    for (let i = 0; i < 4; i++) {
      const digit = Number(state[i]);

      for (const move of [-1, 1]) {
        const nextDigit = (digit + move + 10) % 10;
        const nextState =
          state.slice(0, i) +
          String(nextDigit) +
          state.slice(i + 1);

        result.push(nextState);
      }
    }

    return result;
  }

  const queue = [["0000", 0]];
  const visited = new Set(["0000"]);
  let head = 0;

  while (head < queue.length) {
    const [state, turns] = queue[head];
    head++;

    if (state === target) {
      return turns;
    }

    for (const nextState of getNeighbors(state)) {
      if (!dead.has(nextState) && !visited.has(nextState)) {
        visited.add(nextState);
        queue.push([nextState, turns + 1]);
      }
    }
  }

  return -1;
}`,
  python: `from collections import deque

class Solution:
    def openLock(self, deadends: List[str], target: str) -> int:
        dead = set(deadends)

        if "0000" in dead:
            return -1

        if target == "0000":
            return 0

        def get_neighbors(state):
            result = []

            for i in range(4):
                digit = int(state[i])

                for move in (-1, 1):
                    next_digit = (digit + move + 10) % 10
                    next_state = state[:i] + str(next_digit) + state[i + 1:]
                    result.append(next_state)

            return result

        queue = deque([("0000", 0)])
        visited = {"0000"}

        while queue:
            state, turns = queue.popleft()

            if state == target:
                return turns

            for next_state in get_neighbors(state):
                if next_state not in dead and next_state not in visited:
                    visited.add(next_state)
                    queue.append((next_state, turns + 1))

        return -1`,
  java: `class Solution {
    public int openLock(String[] deadends, String target) {
        Set<String> dead = new HashSet<>(Arrays.asList(deadends));

        if (dead.contains("0000")) {
            return -1;
        }

        if (target.equals("0000")) {
            return 0;
        }

        Queue<String> states = new LinkedList<>();
        Queue<Integer> turns = new LinkedList<>();

        states.offer("0000");
        turns.offer(0);

        Set<String> visited = new HashSet<>();
        visited.add("0000");

        while (!states.isEmpty()) {
            String state = states.poll();
            int currentTurns = turns.poll();

            if (state.equals(target)) {
                return currentTurns;
            }

            for (String nextState : getNeighbors(state)) {
                if (!dead.contains(nextState) && !visited.contains(nextState)) {
                    visited.add(nextState);
                    states.offer(nextState);
                    turns.offer(currentTurns + 1);
                }
            }
        }

        return -1;
    }

    private List<String> getNeighbors(String state) {
        List<String> result = new ArrayList<>();

        for (int i = 0; i < 4; i++) {
            int digit = state.charAt(i) - '0';

            for (int move : new int[] {-1, 1}) {
                int nextDigit = (digit + move + 10) % 10;

                String nextState =
                    state.substring(0, i) +
                    nextDigit +
                    state.substring(i + 1);

                result.add(nextState);
            }
        }

        return result;
    }
}`,
  cpp: `class Solution {
public:
    int openLock(vector<string>& deadends, string target) {
        unordered_set<string> dead(deadends.begin(), deadends.end());

        if (dead.count("0000")) {
            return -1;
        }

        if (target == "0000") {
            return 0;
        }

        queue<pair<string, int>> q;
        q.push({"0000", 0});

        unordered_set<string> visited;
        visited.insert("0000");

        while (!q.empty()) {
            auto [state, turns] = q.front();
            q.pop();

            if (state == target) {
                return turns;
            }

            for (string nextState : getNeighbors(state)) {
                if (!dead.count(nextState) && !visited.count(nextState)) {
                    visited.insert(nextState);
                    q.push({nextState, turns + 1});
                }
            }
        }

        return -1;
    }

private:
    vector<string> getNeighbors(string state) {
        vector<string> result;

        for (int i = 0; i < 4; i++) {
            int digit = state[i] - '0';

            for (int move : {-1, 1}) {
                int nextDigit = (digit + move + 10) % 10;
                string nextState = state;
                nextState[i] = char(nextDigit + '0');
                result.push_back(nextState);
            }
        }

        return result;
    }
};`,
  typescript: `function openLock(deadends: string[], target: string): number {
  const dead = new Set(deadends);

  if (dead.has("0000")) {
    return -1;
  }

  if (target === "0000") {
    return 0;
  }

  function getNeighbors(state: string): string[] {
    const result: string[] = [];

    for (let i = 0; i < 4; i++) {
      const digit = Number(state[i]);

      for (const move of [-1, 1]) {
        const nextDigit = (digit + move + 10) % 10;
        const nextState =
          state.slice(0, i) +
          String(nextDigit) +
          state.slice(i + 1);

        result.push(nextState);
      }
    }

    return result;
  }

  const queue: [string, number][] = [["0000", 0]];
  const visited = new Set<string>(["0000"]);
  let head = 0;

  while (head < queue.length) {
    const [state, turns] = queue[head];
    head++;

    if (state === target) {
      return turns;
    }

    for (const nextState of getNeighbors(state)) {
      if (!dead.has(nextState) && !visited.has(nextState)) {
        visited.add(nextState);
        queue.push([nextState, turns + 1]);
      }
    }
  }

  return -1;
}`,
  go: `func openLock(deadends []string, target string) int {
    dead := map[string]bool{}

    for _, state := range deadends {
        dead[state] = true
    }

    if dead["0000"] {
        return -1
    }

    if target == "0000" {
        return 0
    }

    type Item struct {
        state string
        turns int
    }

    getNeighbors := func(state string) []string {
        result := []string{}

        for i := 0; i < 4; i++ {
            digit := int(state[i] - '0')

            for _, move := range []int{-1, 1} {
                nextDigit := (digit + move + 10) % 10
                chars := []byte(state)
                chars[i] = byte(nextDigit + '0')
                result = append(result, string(chars))
            }
        }

        return result
    }

    queue := []Item{{"0000", 0}}
    visited := map[string]bool{"0000": true}
    head := 0

    for head < len(queue) {
        current := queue[head]
        head++

        if current.state == target {
            return current.turns
        }

        for _, nextState := range getNeighbors(current.state) {
            if !dead[nextState] && !visited[nextState] {
                visited[nextState] = true
                queue = append(queue, Item{nextState, current.turns + 1})
            }
        }
    }

    return -1
}`,
  csharp: `public class Solution {
    public int OpenLock(string[] deadends, string target) {
        HashSet<string> dead = new HashSet<string>(deadends);

        if (dead.Contains("0000")) {
            return -1;
        }

        if (target == "0000") {
            return 0;
        }

        Queue<(string state, int turns)> queue = new Queue<(string, int)>();
        queue.Enqueue(("0000", 0));

        HashSet<string> visited = new HashSet<string>();
        visited.Add("0000");

        while (queue.Count > 0) {
            var current = queue.Dequeue();

            if (current.state == target) {
                return current.turns;
            }

            foreach (string nextState in GetNeighbors(current.state)) {
                if (!dead.Contains(nextState) && !visited.Contains(nextState)) {
                    visited.Add(nextState);
                    queue.Enqueue((nextState, current.turns + 1));
                }
            }
        }

        return -1;
    }

    private List<string> GetNeighbors(string state) {
        List<string> result = new List<string>();

        for (int i = 0; i < 4; i++) {
            int digit = state[i] - '0';

            foreach (int move in new int[] {-1, 1}) {
                int nextDigit = (digit + move + 10) % 10;
                char[] chars = state.ToCharArray();
                chars[i] = (char)(nextDigit + '0');
                result.Add(new string(chars));
            }
        }

        return result;
    }
}`,
  rust: `use std::collections::{HashSet, VecDeque};

impl Solution {
    pub fn open_lock(deadends: Vec<String>, target: String) -> i32 {
        let dead: HashSet<String> = deadends.into_iter().collect();

        if dead.contains("0000") {
            return -1;
        }

        if target == "0000" {
            return 0;
        }

        fn get_neighbors(state: &String) -> Vec<String> {
            let mut result = Vec::new();

            for i in 0..4 {
                let digit = state.as_bytes()[i] - b'0';

                for movement in [-1, 1] {
                    let next_digit = ((digit as i32 + movement + 10) % 10) as u8;
                    let mut chars = state.as_bytes().to_vec();
                    chars[i] = next_digit + b'0';
                    result.push(String::from_utf8(chars).unwrap());
                }
            }

            result
        }

        let mut queue = VecDeque::new();
        queue.push_back(("0000".to_string(), 0));

        let mut visited = HashSet::new();
        visited.insert("0000".to_string());

        while let Some((state, turns)) = queue.pop_front() {
            if state == target {
                return turns;
            }

            for next_state in get_neighbors(&state) {
                if !dead.contains(&next_state) && !visited.contains(&next_state) {
                    visited.insert(next_state.clone());
                    queue.push_back((next_state, turns + 1));
                }
            }
        }

        -1
    }
}`,
};

const TEST_CASES: TestCase[] = [
  {
    id: 1,
    deadends: ["0201", "0101", "0102", "1212", "2002"],
    target: "0202",
    expected: 6,
  },
  {
    id: 2,
    deadends: ["8888"],
    target: "0009",
    expected: 1,
  },
  {
    id: 3,
    deadends: ["8887", "8889", "8878", "8898", "8788", "8988", "7888", "9888"],
    target: "8888",
    expected: -1,
  },
  {
    id: 4,
    deadends: ["0000"],
    target: "8888",
    expected: -1,
  },
  {
    id: 5,
    deadends: [],
    target: "0000",
    expected: 0,
  },
  {
    id: 6,
    deadends: [],
    target: "9999",
    expected: 4,
  },
];

function getLanguageLabel(language: LanguageKey) {
  return LANGUAGES.find((item) => item.key === language)?.label ?? language;
}

function executeJavaScript(code: string, test: TestCase) {
  try {
    const openLock = new Function(`
      "use strict";
      ${code}
      return openLock;
    `)() as (deadends: string[], target: string) => number;

    if (typeof openLock !== "function") {
      return {
        pass: false,
        actual: 0,
        error: "openLock function was not found. Keep the function named openLock.",
      };
    }

    const actual = openLock([...test.deadends], test.target);

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

export default function OpenTheLockPracticePage() {
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
        `deadends: ${JSON.stringify(selectedCase.deadends)}`,
        `target: ${selectedCase.target}`,
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
        lines.push(`  deadends: ${JSON.stringify(test.deadends)}`);
        lines.push(`  target: ${test.target}`);
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
          ? "Not accepted yet. Implement openLock, then run again."
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
            <Link className="hover:text-primary" href="/learn/bfs">
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
                  BFS
                </span>
                <span className="border border-border px-3 py-1 text-[10px] font-bold tracking-[0.25em] text-muted-foreground">
                  STATES
                </span>
              </div>

              <div className="mb-3 flex items-center gap-3">
                <span className="text-5xl font-bold leading-none text-primary">$</span>
                <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                  Open the Lock
                </h1>
              </div>

              <p className="max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
                BFS over lock states while treating deadends as blocked visited states.
              </p>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              <div className="mb-4 text-[10px] font-bold tracking-[0.35em] text-muted-foreground">
                DESCRIPTION
              </div>

              <div className="space-y-5 text-sm leading-7 text-muted-foreground">
                <div className="terminal-frame p-4">
                  <p>
                    You start at <span className="text-foreground">"0000"</span>. Each move turns one wheel forward or backward by one digit.
                  </p>
                  <p className="mt-2">
                    Some lock states are deadends. You cannot enter those states.
                  </p>
                  <p className="mt-2">
                    Return the minimum number of turns needed to reach the target, or{" "}
                    <span className="text-foreground">-1</span> if it is impossible.
                  </p>
                </div>

                <div className="terminal-frame p-4">
                  <h2 className="mb-3 text-xl font-bold text-foreground">Example</h2>
                  <pre className="overflow-x-auto whitespace-pre-wrap text-xs leading-6 md:text-sm">
{`Input:
deadends = ["0201","0101","0102","1212","2002"]
target = "0202"

Output: 6`}
                  </pre>
                </div>

                <div className="terminal-frame p-4">
                  <h2 className="mb-3 text-xl font-bold text-foreground">BFS Pattern</h2>
                  <ul className="list-disc space-y-2 pl-5">
                    <li>Start from "0000"</li>
                    <li>Generate 8 neighbors for every state</li>
                    <li>Skip deadends and already visited states</li>
                    <li>The first time BFS reaches target is the minimum number of turns</li>
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
                        <p className="text-foreground">deadends:</p>
                        <p className="break-all">{JSON.stringify(test.deadends)}</p>
                        <p className="mt-2 text-foreground">target: {test.target}</p>
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
                  <p className="mt-3">Expected approach: BFS over states</p>
                  <p>Time: O(10⁴)</p>
                  <p>Space: O(10⁴)</p>
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
