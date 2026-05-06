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
  s1: string;
  s2: string;
  expected: boolean;
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
  typescript: `function checkInclusion(s1: string, s2: string): boolean {
  // write your answer here

  return false;
}`,
  javascript: `function checkInclusion(s1, s2) {
  // write your answer here

  return false;
}`,
  python: `def check_inclusion(s1, s2):
    # write your answer here
    return False`,
  java: `class Solution {
    public boolean checkInclusion(String s1, String s2) {
        // write your answer here
        return false;
    }
}`,
  cpp: `#include <string>
using namespace std;

bool checkInclusion(string s1, string s2) {
    // write your answer here
    return false;
}`,
  csharp: `public class Solution {
    public bool CheckInclusion(string s1, string s2) {
        // write your answer here
        return false;
    }
}`,
  go: `package main

func checkInclusion(s1 string, s2 string) bool {
    // write your answer here
    return false
}`,
  rust: `fn check_inclusion(s1: String, s2: String) -> bool {
    // write your answer here
    false
}`,
  kotlin: `fun checkInclusion(s1: String, s2: String): Boolean {
    // write your answer here
    return false
}`,
  swift: `func checkInclusion(_ s1: String, _ s2: String) -> Bool {
    // write your answer here
    return false
}`,
};

const SOLUTION_CODE: Record<LanguageKey, string> = {
  typescript: `function checkInclusion(s1: string, s2: string): boolean {
  if (s1.length > s2.length) return false;

  const need = new Array(26).fill(0);
  const window = new Array(26).fill(0);

  for (const ch of s1) {
    need[ch.charCodeAt(0) - 97]++;
  }

  const size = s1.length;

  for (let i = 0; i < s2.length; i++) {
    window[s2.charCodeAt(i) - 97]++;

    if (i >= size) {
      window[s2.charCodeAt(i - size) - 97]--;
    }

    if (i >= size - 1) {
      let same = true;
      for (let j = 0; j < 26; j++) {
        if (need[j] !== window[j]) {
          same = false;
          break;
        }
      }
      if (same) return true;
    }
  }

  return false;
}`,
  javascript: `function checkInclusion(s1, s2) {
  if (s1.length > s2.length) return false;

  const need = new Array(26).fill(0);
  const window = new Array(26).fill(0);

  for (const ch of s1) {
    need[ch.charCodeAt(0) - 97]++;
  }

  const size = s1.length;

  for (let i = 0; i < s2.length; i++) {
    window[s2.charCodeAt(i) - 97]++;

    if (i >= size) {
      window[s2.charCodeAt(i - size) - 97]--;
    }

    if (i >= size - 1) {
      let same = true;
      for (let j = 0; j < 26; j++) {
        if (need[j] !== window[j]) {
          same = false;
          break;
        }
      }
      if (same) return true;
    }
  }

  return false;
}`,
  python: `def check_inclusion(s1, s2):
    if len(s1) > len(s2):
        return False

    need = [0] * 26
    window = [0] * 26

    for ch in s1:
        need[ord(ch) - 97] += 1

    size = len(s1)

    for i, ch in enumerate(s2):
        window[ord(ch) - 97] += 1

        if i >= size:
            window[ord(s2[i - size]) - 97] -= 1

        if i >= size - 1 and need == window:
            return True

    return False`,
  java: `class Solution {
    public boolean checkInclusion(String s1, String s2) {
        if (s1.length() > s2.length()) return false;

        int[] need = new int[26];
        int[] window = new int[26];

        for (char ch : s1.toCharArray()) {
            need[ch - 'a']++;
        }

        int size = s1.length();

        for (int i = 0; i < s2.length(); i++) {
            window[s2.charAt(i) - 'a']++;

            if (i >= size) {
                window[s2.charAt(i - size) - 'a']--;
            }

            if (i >= size - 1) {
                boolean same = true;
                for (int j = 0; j < 26; j++) {
                    if (need[j] != window[j]) {
                        same = false;
                        break;
                    }
                }
                if (same) return true;
            }
        }

        return false;
    }
}`,
  cpp: `#include <string>
#include <vector>
using namespace std;

bool checkInclusion(string s1, string s2) {
    if (s1.size() > s2.size()) return false;

    vector<int> need(26, 0), window(26, 0);

    for (char ch : s1) {
        need[ch - 'a']++;
    }

    int size = s1.size();

    for (int i = 0; i < (int)s2.size(); i++) {
        window[s2[i] - 'a']++;

        if (i >= size) {
            window[s2[i - size] - 'a']--;
        }

        if (i >= size - 1 && need == window) {
            return true;
        }
    }

    return false;
}`,
  csharp: `public class Solution {
    public bool CheckInclusion(string s1, string s2) {
        if (s1.Length > s2.Length) return false;

        int[] need = new int[26];
        int[] window = new int[26];

        foreach (char ch in s1) {
            need[ch - 'a']++;
        }

        int size = s1.Length;

        for (int i = 0; i < s2.Length; i++) {
            window[s2[i] - 'a']++;

            if (i >= size) {
                window[s2[i - size] - 'a']--;
            }

            if (i >= size - 1) {
                bool same = true;
                for (int j = 0; j < 26; j++) {
                    if (need[j] != window[j]) {
                        same = false;
                        break;
                    }
                }
                if (same) return true;
            }
        }

        return false;
    }
}`,
  go: `package main

func checkInclusion(s1 string, s2 string) bool {
    if len(s1) > len(s2) {
        return false
    }

    need := make([]int, 26)
    window := make([]int, 26)

    for i := 0; i < len(s1); i++ {
        need[s1[i]-'a']++
    }

    size := len(s1)

    for i := 0; i < len(s2); i++ {
        window[s2[i]-'a']++

        if i >= size {
            window[s2[i-size]-'a']--
        }

        if i >= size-1 {
            same := true
            for j := 0; j < 26; j++ {
                if need[j] != window[j] {
                    same = false
                    break
                }
            }
            if same {
                return true
            }
        }
    }

    return false
}`,
  rust: `fn check_inclusion(s1: String, s2: String) -> bool {
    if s1.len() > s2.len() {
        return false;
    }

    let mut need = [0; 26];
    let mut window = [0; 26];

    for b in s1.bytes() {
        need[(b - b'a') as usize] += 1;
    }

    let bytes = s2.as_bytes();
    let size = s1.len();

    for i in 0..bytes.len() {
        window[(bytes[i] - b'a') as usize] += 1;

        if i >= size {
            window[(bytes[i - size] - b'a') as usize] -= 1;
        }

        if i + 1 >= size && need == window {
            return true;
        }
    }

    false
}`,
  kotlin: `fun checkInclusion(s1: String, s2: String): Boolean {
    if (s1.length > s2.length) return false

    val need = IntArray(26)
    val window = IntArray(26)

    for (ch in s1) {
        need[ch - 'a']++
    }

    val size = s1.length

    for (i in s2.indices) {
        window[s2[i] - 'a']++

        if (i >= size) {
            window[s2[i - size] - 'a']--
        }

        if (i >= size - 1 && need.contentEquals(window)) {
            return true
        }
    }

    return false
}`,
  swift: `func checkInclusion(_ s1: String, _ s2: String) -> Bool {
    if s1.count > s2.count { return false }

    let a1 = Array(s1.utf8)
    let a2 = Array(s2.utf8)
    var need = Array(repeating: 0, count: 26)
    var window = Array(repeating: 0, count: 26)

    for ch in a1 {
        need[Int(ch - 97)] += 1
    }

    let size = a1.count

    for i in 0..<a2.count {
        window[Int(a2[i] - 97)] += 1

        if i >= size {
            window[Int(a2[i - size] - 97)] -= 1
        }

        if i >= size - 1 && need == window {
            return true
        }
    }

    return false
}`,
};

const TEST_CASES: TestCase[] = [
  { id: 1, s1: "ab", s2: "eidbaooo", expected: true },
  { id: 2, s1: "ab", s2: "eidboaoo", expected: false },
  { id: 3, s1: "adc", s2: "dcda", expected: true },
];

function normalizeResult(value: unknown): boolean | null {
  return typeof value === "boolean" ? value : null;
}

function runJsLike(code: string, testCase: TestCase) {
  const wrapped = `
${code}
return typeof checkInclusion === "function"
  ? checkInclusion(${JSON.stringify(testCase.s1)}, ${JSON.stringify(testCase.s2)})
  : null;
`;
  const fn = new Function(wrapped);
  return fn();
}

export default function PermutationInStringPracticePage() {
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
    () => TEST_CASES.find((tcase) => tcase.id === selectedCaseId) ?? TEST_CASES[0],
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
        `input: s1=${JSON.stringify(selectedCase.s1)}, s2=${JSON.stringify(selectedCase.s2)}`,
        `expected: ${String(selectedCase.expected)}`,
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
                <span className="mr-3 text-primary">$</span>Permutation in String
              </h1>

              <p className="mt-5 max-w-4xl text-lg leading-8 text-muted-foreground">
                Given two strings <span className="text-foreground">s1</span> and{" "}
                <span className="text-foreground">s2</span>, return true if{" "}
                <span className="text-foreground">s2</span> contains a permutation of{" "}
                <span className="text-foreground">s1</span>.
              </p>
            </div>

            <div className="max-h-[calc(100vh-180px)] overflow-y-auto px-5 py-5">
              <div className="space-y-8">
                <div>
                  <h2 className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                    Description
                  </h2>
                  <div className="mt-4 space-y-5 text-base leading-8 text-muted-foreground">
                    <p>This is a fixed-size validity window problem.</p>
                    <p>Keep a window of length s1.length and check whether its character counts match.</p>
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
                            <span className="text-foreground">Input:</span> s1 = {JSON.stringify(example.s1)}, s2 = {JSON.stringify(example.s2)}
                          </div>
                          <div>
                            <span className="text-foreground">Output:</span> {String(example.expected)}
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
                    <div>• 1 &lt;= s1.length, s2.length &lt;= 10^4</div>
                    <div>• s1 and s2 consist of lowercase English letters.</div>
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
                      <p>1. Count characters in s1.</p>
                      <p>2. Slide a window of fixed length s1.length across s2.</p>
                      <p>3. Add the new right character and remove the old left character.</p>
                      <p>4. If the counts match, a permutation exists.</p>
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
                        <span className="text-muted-foreground">Input:</span> s1 = {JSON.stringify(test.s1)}, s2 = {JSON.stringify(test.s2)}
                      </div>
                      <div className="mt-1 text-sm text-foreground">
                        <span className="text-muted-foreground">Output:</span> {String(test.expected)}
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
                  <div>Expected approach: fixed-size window + frequency matching.</div>
                  <div>Time: O(n)</div>
                  <div>Space: O(1)</div>
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
