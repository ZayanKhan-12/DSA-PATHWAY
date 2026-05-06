"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type LanguageKey =
  | "typescript"
  | "javascript"
  | "python"
  | "java"
  | "cpp"
  | "csharp"
  | "go"
  | "rust"
  | "kotlin"
  | "swift";

type TestCase = {
  id: number;
  s: string;
  expected: number;
};

const LANGUAGES: { key: LanguageKey; label: string; runnable: boolean }[] = [
  { key: "typescript", label: "TypeScript", runnable: true },
  { key: "javascript", label: "JavaScript", runnable: true },
  { key: "python", label: "Python", runnable: false },
  { key: "java", label: "Java", runnable: false },
  { key: "cpp", label: "C++", runnable: false },
  { key: "csharp", label: "C#", runnable: false },
  { key: "go", label: "Go", runnable: false },
  { key: "rust", label: "Rust", runnable: false },
  { key: "kotlin", label: "Kotlin", runnable: false },
  { key: "swift", label: "Swift", runnable: false },
];

const STARTER_CODE: Record<LanguageKey, string> = {
  typescript: `function lengthOfLongestSubstring(s: string): number {
  // write your answer here

  return 0;
}`,
  javascript: `function lengthOfLongestSubstring(s) {
  // write your answer here

  return 0;
}`,
  python: `def length_of_longest_substring(s):
    # write your answer here
    return 0`,
  java: `class Solution {
    public int lengthOfLongestSubstring(String s) {
        // write your answer here
        return 0;
    }
}`,
  cpp: `#include <string>
using namespace std;

int lengthOfLongestSubstring(string s) {
    // write your answer here
    return 0;
}`,
  csharp: `public class Solution {
    public int LengthOfLongestSubstring(string s) {
        // write your answer here
        return 0;
    }
}`,
  go: `package main

func lengthOfLongestSubstring(s string) int {
    // write your answer here
    return 0
}`,
  rust: `fn length_of_longest_substring(s: String) -> i32 {
    // write your answer here
    0
}`,
  kotlin: `fun lengthOfLongestSubstring(s: String): Int {
    // write your answer here
    return 0
}`,
  swift: `func lengthOfLongestSubstring(_ s: String) -> Int {
    // write your answer here
    return 0
}`,
};

const SOLUTION_CODE: Record<LanguageKey, string> = {
  typescript: `function lengthOfLongestSubstring(s: string): number {
  const lastSeen = new Map<string, number>();
  let left = 0;
  let best = 0;

  for (let right = 0; right < s.length; right++) {
    const ch = s[right];

    if (lastSeen.has(ch) && lastSeen.get(ch)! >= left) {
      left = lastSeen.get(ch)! + 1;
    }

    lastSeen.set(ch, right);
    best = Math.max(best, right - left + 1);
  }

  return best;
}`,
  javascript: `function lengthOfLongestSubstring(s) {
  const lastSeen = new Map();
  let left = 0;
  let best = 0;

  for (let right = 0; right < s.length; right++) {
    const ch = s[right];

    if (lastSeen.has(ch) && lastSeen.get(ch) >= left) {
      left = lastSeen.get(ch) + 1;
    }

    lastSeen.set(ch, right);
    best = Math.max(best, right - left + 1);
  }

  return best;
}`,
  python: `def length_of_longest_substring(s):
    last_seen = {}
    left = 0
    best = 0

    for right, ch in enumerate(s):
        if ch in last_seen and last_seen[ch] >= left:
            left = last_seen[ch] + 1

        last_seen[ch] = right
        best = max(best, right - left + 1)

    return best`,
  java: `import java.util.*;

class Solution {
    public int lengthOfLongestSubstring(String s) {
        Map<Character, Integer> lastSeen = new HashMap<>();
        int left = 0;
        int best = 0;

        for (int right = 0; right < s.length(); right++) {
            char ch = s.charAt(right);

            if (lastSeen.containsKey(ch) && lastSeen.get(ch) >= left) {
                left = lastSeen.get(ch) + 1;
            }

            lastSeen.put(ch, right);
            best = Math.max(best, right - left + 1);
        }

        return best;
    }
}`,
  cpp: `#include <string>
#include <unordered_map>
#include <algorithm>
using namespace std;

int lengthOfLongestSubstring(string s) {
    unordered_map<char, int> lastSeen;
    int left = 0;
    int best = 0;

    for (int right = 0; right < (int)s.size(); right++) {
        char ch = s[right];

        if (lastSeen.count(ch) && lastSeen[ch] >= left) {
            left = lastSeen[ch] + 1;
        }

        lastSeen[ch] = right;
        best = max(best, right - left + 1);
    }

    return best;
}`,
  csharp: `using System.Collections.Generic;

public class Solution {
    public int LengthOfLongestSubstring(string s) {
        var lastSeen = new Dictionary<char, int>();
        int left = 0;
        int best = 0;

        for (int right = 0; right < s.Length; right++) {
            char ch = s[right];

            if (lastSeen.ContainsKey(ch) && lastSeen[ch] >= left) {
                left = lastSeen[ch] + 1;
            }

            lastSeen[ch] = right;
            best = System.Math.Max(best, right - left + 1);
        }

        return best;
    }
}`,
  go: `package main

func lengthOfLongestSubstring(s string) int {
    lastSeen := map[byte]int{}
    left := 0
    best := 0

    for right := 0; right < len(s); right++ {
        ch := s[right]

        if idx, ok := lastSeen[ch]; ok && idx >= left {
            left = idx + 1
        }

        lastSeen[ch] = right

        if right-left+1 > best {
            best = right - left + 1
        }
    }

    return best
}`,
  rust: `use std::collections::HashMap;

fn length_of_longest_substring(s: String) -> i32 {
    let chars: Vec<char> = s.chars().collect();
    let mut last_seen: HashMap<char, usize> = HashMap::new();
    let mut left: usize = 0;
    let mut best: usize = 0;

    for right in 0..chars.len() {
        let ch = chars[right];

        if let Some(&idx) = last_seen.get(&ch) {
            if idx >= left {
                left = idx + 1;
            }
        }

        last_seen.insert(ch, right);
        best = best.max(right - left + 1);
    }

    best as i32
}`,
  kotlin: `fun lengthOfLongestSubstring(s: String): Int {
    val lastSeen = HashMap<Char, Int>()
    var left = 0
    var best = 0

    for (right in s.indices) {
        val ch = s[right]

        if (lastSeen.containsKey(ch) && lastSeen[ch]!! >= left) {
            left = lastSeen[ch]!! + 1
        }

        lastSeen[ch] = right
        best = maxOf(best, right - left + 1)
    }

    return best
}`,
  swift: `func lengthOfLongestSubstring(_ s: String) -> Int {
    let chars = Array(s)
    var lastSeen: [Character: Int] = [:]
    var left = 0
    var best = 0

    for right in 0..<chars.count {
        let ch = chars[right]

        if let idx = lastSeen[ch], idx >= left {
            left = idx + 1
        }

        lastSeen[ch] = right
        best = max(best, right - left + 1)
    }

    return best
}`,
};

const TEST_CASES: TestCase[] = [
  { id: 1, s: "abcabcbb", expected: 3 },
  { id: 2, s: "bbbbb", expected: 1 },
  { id: 3, s: "pwwkew", expected: 3 },
];

function normalizeResult(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  return null;
}

function runJsLike(code: string, testCase: TestCase) {
  const wrapped = `
${code}
return typeof lengthOfLongestSubstring === "function"
  ? lengthOfLongestSubstring(${JSON.stringify(testCase.s)})
  : null;
`;
  const fn = new Function(wrapped);
  return fn();
}

export default function LongestSubstringWithoutRepeatingCharactersPracticePage() {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageKey>("javascript");
  const [selectedCaseId, setSelectedCaseId] = useState<number>(1);
  const [codeByLanguage, setCodeByLanguage] = useState<Record<LanguageKey, string>>(STARTER_CODE);
  const [consoleLines, setConsoleLines] = useState<string[]>([
    "$ judge.ready",
    "Pick a language, edit code, then run sample tests.",
  ]);
  const [submitSummary, setSubmitSummary] = useState<string>("");
  const [showStrategy, setShowStrategy] = useState(false);
  const [showCodeSolution, setShowCodeSolution] = useState(false);

  const selectedCase = useMemo(
    () => TEST_CASES.find((t) => t.id === selectedCaseId) ?? TEST_CASES[0],
    [selectedCaseId]
  );

  const currentCode = codeByLanguage[selectedLanguage];
  const currentSolutionCode = SOLUTION_CODE[selectedLanguage];
  const runnable = LANGUAGES.find((l) => l.key === selectedLanguage)?.runnable ?? false;

  const setCurrentCode = (value: string) => {
    setCodeByLanguage((prev) => ({ ...prev, [selectedLanguage]: value }));
  };

  const appendConsole = (lines: string[]) => setConsoleLines(lines);

  const handleRun = () => {
    if (!runnable) {
      appendConsole([
        "$ run.sample",
        `language: ${selectedLanguage}`,
        "In-browser execution is enabled for JavaScript and TypeScript on this page.",
        "You can still write and practice in every language tab.",
      ]);
      return;
    }

    try {
      const raw = runJsLike(currentCode, selectedCase);
      const normalized = normalizeResult(raw);
      const passed = normalized === selectedCase.expected;

      appendConsole([
        "$ run.sample",
        `case: ${selectedCase.id}`,
        `input: s=${JSON.stringify(selectedCase.s)}`,
        `expected: ${selectedCase.expected}`,
        `got: ${normalized === null ? String(raw) : String(normalized)}`,
        passed ? "status: PASS" : "status: FAIL",
      ]);
    } catch (error) {
      appendConsole([
        "$ run.sample",
        `case: ${selectedCase.id}`,
        "status: RUNTIME_ERROR",
        error instanceof Error ? error.message : String(error),
      ]);
    }
  };

  const handleSubmit = () => {
    if (!runnable) {
      appendConsole([
        "$ submit.solution",
        `language: ${selectedLanguage}`,
        "Submit simulation is only available for JavaScript and TypeScript on this page.",
      ]);
      setSubmitSummary("Execution preview only for this language.");
      return;
    }

    const results = TEST_CASES.map((test) => {
      try {
        const raw = runJsLike(currentCode, test);
        const normalized = normalizeResult(raw);
        return {
          id: test.id,
          passed: normalized === test.expected,
          got: normalized,
          expected: test.expected,
          error: null as string | null,
        };
      } catch (error) {
        return {
          id: test.id,
          passed: false,
          got: null,
          expected: test.expected,
          error: error instanceof Error ? error.message : String(error),
        };
      }
    });

    const passedCount = results.filter((r) => r.passed).length;

    appendConsole([
      "$ submit.solution",
      ...results.map((r) =>
        r.error
          ? `case ${r.id}: ERROR - ${r.error}`
          : `case ${r.id}: ${r.passed ? "PASS" : `FAIL (got ${String(r.got)}, expected ${String(r.expected)})`}`
      ),
      `summary: ${passedCount}/${results.length} passed`,
    ]);

    setSubmitSummary(`${passedCount}/${results.length} test cases passed`);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-[1700px] px-5 py-5">
        <div className="mb-4 flex items-center justify-between border border-border/80 bg-card/30 px-4 py-3">
          <div className="text-primary text-sm font-bold tracking-[0.3em] uppercase">DSA.ENGINE</div>

          <div className="flex items-center gap-6 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            <Link href="/visualize/strings-sliding-window">Visualizer</Link>
            <Link href="/learn/strings-sliding-window#practice">Back to Lesson</Link>
          </div>
        </div>

        <div className="grid gap-5 xl:grid-cols-[1.02fr_1fr]">
          <section className="border border-border bg-card/30">
            <div className="border-b border-border px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="rounded border border-yellow-500/60 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-yellow-400">
                  Medium
                </span>
                <span className="rounded border border-cyan-500/40 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-cyan-400">
                  Sliding Window
                </span>
              </div>

              <h1 className="mt-4 text-5xl font-bold tracking-tight md:text-6xl">
                <span className="mr-3 text-primary">$</span>Longest Substring Without Repeating Characters
              </h1>

              <p className="mt-5 max-w-4xl text-lg leading-8 text-muted-foreground">
                Given a string <span className="text-foreground">s</span>, find the length of the
                longest substring without duplicate characters.
              </p>
            </div>

            <div className="max-h-[calc(100vh-180px)] overflow-y-auto px-5 py-5">
              <div className="space-y-8">
                <div>
                  <h2 className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                    Description
                  </h2>
                  <div className="mt-4 space-y-5 text-base leading-8 text-muted-foreground">
                    <p>This is a classic variable-size sliding window problem.</p>
                    <p>Expand right, and when you hit a duplicate, move left forward until the window becomes valid again.</p>
                  </div>
                </div>

                <div>
                  <h2 className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                    Examples
                  </h2>

                  <div className="mt-4 space-y-4">
                    {TEST_CASES.map((example) => (
                      <div key={example.id} className="border border-border bg-background/40 p-4">
                        <div className="mb-3 text-lg font-semibold text-foreground">Example {example.id}</div>
                        <div className="space-y-2 text-sm leading-7 text-muted-foreground">
                          <div>
                            <span className="text-foreground">Input:</span> s = {JSON.stringify(example.s)}
                          </div>
                          <div>
                            <span className="text-foreground">Output:</span> {example.expected}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                    Constraints
                  </h2>
                  <div className="mt-4 border border-border bg-background/40 p-4 text-sm leading-8 text-muted-foreground">
                    <div>• 0 &lt;= s.length &lt;= 5 * 10^4</div>
                    <div>• s consists of English letters, digits, symbols and spaces.</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setShowStrategy((prev) => !prev)}
                    className="inline-flex items-center justify-center border border-primary px-4 py-3 text-xs font-bold tracking-[0.25em] text-primary transition-colors hover:bg-primary hover:text-black"
                  >
                    {showStrategy ? "HIDE_STRATEGY" : "SHOW_STRATEGY"}
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowCodeSolution((prev) => !prev)}
                    className="inline-flex items-center justify-center border border-cyan-500 px-4 py-3 text-xs font-bold tracking-[0.25em] text-cyan-400 transition-colors hover:bg-cyan-400 hover:text-black"
                  >
                    {showCodeSolution ? "HIDE_CODE_SOLUTION" : "VIEW_CODE_SOLUTION"}
                  </button>
                </div>

                {showStrategy && (
                  <div className="border border-border bg-background/40 p-4">
                    <div className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                      Strategy
                    </div>
                    <div className="mt-4 space-y-3 text-sm leading-7 text-muted-foreground">
                      <p>1. Track the current window with two pointers.</p>
                      <p>2. Store the last seen index of each character.</p>
                      <p>3. If a character repeats inside the current window, jump left forward.</p>
                      <p>4. Update the best window length on every step.</p>
                    </div>
                  </div>
                )}

                {showCodeSolution && (
                  <div className="border border-border bg-background/40 p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                        Solution Code
                      </div>
                      <div className="text-[10px] uppercase tracking-[0.25em] text-primary">
                        {LANGUAGES.find((l) => l.key === selectedLanguage)?.label}
                      </div>
                    </div>

                    <pre className="mt-4 overflow-x-auto whitespace-pre p-4 border border-border bg-background/60 text-[13px] leading-7 text-foreground">
{currentSolutionCode}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          </section>

          <section className="border border-border bg-card/30">
            <div className="border-b border-border px-4 py-3">
              <div className="flex flex-wrap items-center gap-2">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.key}
                    type="button"
                    onClick={() => setSelectedLanguage(lang.key)}
                    className={`px-3 py-2 text-xs font-bold uppercase tracking-[0.2em] border transition-colors ${
                      selectedLanguage === lang.key
                        ? "border-primary bg-primary text-black"
                        : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-0 border-b border-border md:grid-cols-[1fr_320px]">
              <div className="border-r border-border p-4">
                <div className="mb-3 flex items-center justify-between">
                  <div className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                    Code Editor
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {runnable ? "Browser runner enabled" : "Edit-only preview"}
                  </div>
                </div>

                <textarea
                  value={currentCode}
                  onChange={(e) => setCurrentCode(e.target.value)}
                  spellCheck={false}
                  className="min-h-[510px] w-full resize-none border border-border bg-background/50 p-4 font-mono text-[13px] leading-7 text-foreground outline-none"
                />
              </div>

              <div className="p-4">
                <div className="mb-3 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                  Testcases
                </div>

                <div className="space-y-3">
                  {TEST_CASES.map((test) => (
                    <button
                      key={test.id}
                      type="button"
                      onClick={() => setSelectedCaseId(test.id)}
                      className={`w-full border p-3 text-left transition-colors ${
                        selectedCaseId === test.id
                          ? "border-primary bg-primary/10"
                          : "border-border bg-background/40 hover:border-primary"
                      }`}
                    >
                      <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        Case {test.id}
                      </div>
                      <div className="mt-2 text-sm text-foreground">
                        <span className="text-muted-foreground">Input:</span> {JSON.stringify(test.s)}
                      </div>
                      <div className="mt-1 text-sm text-foreground">
                        <span className="text-muted-foreground">Output:</span> {test.expected}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={handleRun}
                    className="border border-primary bg-primary px-4 py-3 text-xs font-bold uppercase tracking-[0.25em] text-black"
                  >
                    Run
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="border border-border px-4 py-3 text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                  >
                    Submit
                  </button>
                </div>

                <div className="mt-4 border border-border bg-background/40 p-3 text-sm leading-7 text-muted-foreground">
                  {submitSummary || "Run a sample test or submit against all cases."}
                </div>
              </div>
            </div>

            <div className="grid gap-0 md:grid-cols-[1fr_340px]">
              <div className="border-r border-border p-4">
                <div className="mb-3 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                  Console
                </div>
                <div className="min-h-[180px] border border-border bg-background/40 p-4 font-mono text-[13px] leading-7 text-foreground">
                  {consoleLines.map((line, index) => (
                    <div key={index}>{line}</div>
                  ))}
                </div>
              </div>

              <div className="p-4">
                <div className="mb-3 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                  Result
                </div>
                <div className="border border-border bg-background/40 p-4 text-sm leading-7 text-muted-foreground">
                  <div>Expected approach: sliding window + last seen index map.</div>
                  <div>Time: O(n)</div>
                  <div>Space: O(min(n, charset))</div>
                  <div className="mt-3">Current testcase: Case {selectedCase.id}</div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
