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
  t: string;
  expected: string;
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
  typescript: `function minWindow(s: string, t: string): string {
  // write your answer here

  return "";
}`,
  javascript: `function minWindow(s, t) {
  // write your answer here

  return "";
}`,
  python: `def min_window(s, t):
    # write your answer here
    return ""`,
  java: `class Solution {
    public String minWindow(String s, String t) {
        // write your answer here
        return "";
    }
}`,
  cpp: `#include <string>
using namespace std;

string minWindow(string s, string t) {
    // write your answer here
    return "";
}`,
  csharp: `public class Solution {
    public string MinWindow(string s, string t) {
        // write your answer here
        return "";
    }
}`,
  go: `package main

func minWindow(s string, t string) string {
    // write your answer here
    return ""
}`,
  rust: `fn min_window(s: String, t: String) -> String {
    // write your answer here
    String::new()
}`,
  kotlin: `fun minWindow(s: String, t: String): String {
    // write your answer here
    return ""
}`,
  swift: `func minWindow(_ s: String, _ t: String) -> String {
    // write your answer here
    return ""
}`,
};

const SOLUTION_CODE: Record<LanguageKey, string> = {
  typescript: `function minWindow(s: string, t: string): string {
  if (t.length > s.length) return "";

  const need = new Map<string, number>();
  const window = new Map<string, number>();

  for (const ch of t) {
    need.set(ch, (need.get(ch) ?? 0) + 1);
  }

  let have = 0;
  const required = need.size;
  let left = 0;
  let bestLen = Infinity;
  let bestStart = 0;

  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    window.set(ch, (window.get(ch) ?? 0) + 1);

    if (need.has(ch) && window.get(ch) === need.get(ch)) {
      have++;
    }

    while (have === required) {
      if (right - left + 1 < bestLen) {
        bestLen = right - left + 1;
        bestStart = left;
      }

      const leftChar = s[left];
      window.set(leftChar, (window.get(leftChar) ?? 0) - 1);

      if (need.has(leftChar) && window.get(leftChar)! < need.get(leftChar)!) {
        have--;
      }

      left++;
    }
  }

  return bestLen === Infinity ? "" : s.slice(bestStart, bestStart + bestLen);
}`,
  javascript: `function minWindow(s, t) {
  if (t.length > s.length) return "";

  const need = new Map();
  const window = new Map();

  for (const ch of t) {
    need.set(ch, (need.get(ch) ?? 0) + 1);
  }

  let have = 0;
  const required = need.size;
  let left = 0;
  let bestLen = Infinity;
  let bestStart = 0;

  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    window.set(ch, (window.get(ch) ?? 0) + 1);

    if (need.has(ch) && window.get(ch) === need.get(ch)) {
      have++;
    }

    while (have === required) {
      if (right - left + 1 < bestLen) {
        bestLen = right - left + 1;
        bestStart = left;
      }

      const leftChar = s[left];
      window.set(leftChar, (window.get(leftChar) ?? 0) - 1);

      if (need.has(leftChar) && window.get(leftChar) < need.get(leftChar)) {
        have--;
      }

      left++;
    }
  }

  return bestLen === Infinity ? "" : s.slice(bestStart, bestStart + bestLen);
}`,
  python: `def min_window(s, t):
    if len(t) > len(s):
        return ""

    need = {}
    window = {}

    for ch in t:
        need[ch] = need.get(ch, 0) + 1

    have = 0
    required = len(need)
    left = 0
    best_len = float("inf")
    best_start = 0

    for right, ch in enumerate(s):
        window[ch] = window.get(ch, 0) + 1

        if ch in need and window[ch] == need[ch]:
            have += 1

        while have == required:
            if right - left + 1 < best_len:
                best_len = right - left + 1
                best_start = left

            left_char = s[left]
            window[left_char] -= 1

            if left_char in need and window[left_char] < need[left_char]:
                have -= 1

            left += 1

    return "" if best_len == float("inf") else s[best_start:best_start + best_len]`,
  java: `import java.util.*;

class Solution {
    public String minWindow(String s, String t) {
        if (t.length() > s.length()) return "";

        Map<Character, Integer> need = new HashMap<>();
        Map<Character, Integer> window = new HashMap<>();

        for (char ch : t.toCharArray()) {
            need.put(ch, need.getOrDefault(ch, 0) + 1);
        }

        int have = 0;
        int required = need.size();
        int left = 0;
        int bestLen = Integer.MAX_VALUE;
        int bestStart = 0;

        for (int right = 0; right < s.length(); right++) {
            char ch = s.charAt(right);
            window.put(ch, window.getOrDefault(ch, 0) + 1);

            if (need.containsKey(ch) && window.get(ch).intValue() == need.get(ch).intValue()) {
                have++;
            }

            while (have == required) {
                if (right - left + 1 < bestLen) {
                    bestLen = right - left + 1;
                    bestStart = left;
                }

                char leftChar = s.charAt(left);
                window.put(leftChar, window.get(leftChar) - 1);

                if (need.containsKey(leftChar) && window.get(leftChar) < need.get(leftChar)) {
                    have--;
                }

                left++;
            }
        }

        return bestLen == Integer.MAX_VALUE ? "" : s.substring(bestStart, bestStart + bestLen);
    }
}`,
  cpp: `#include <string>
#include <unordered_map>
#include <climits>
using namespace std;

string minWindow(string s, string t) {
    if (t.size() > s.size()) return "";

    unordered_map<char, int> need, window;
    for (char ch : t) need[ch]++;

    int have = 0;
    int required = need.size();
    int left = 0;
    int bestLen = INT_MAX;
    int bestStart = 0;

    for (int right = 0; right < (int)s.size(); right++) {
        char ch = s[right];
        window[ch]++;

        if (need.count(ch) && window[ch] == need[ch]) {
            have++;
        }

        while (have == required) {
            if (right - left + 1 < bestLen) {
                bestLen = right - left + 1;
                bestStart = left;
            }

            char leftChar = s[left];
            window[leftChar]--;

            if (need.count(leftChar) && window[leftChar] < need[leftChar]) {
                have--;
            }

            left++;
        }
    }

    return bestLen == INT_MAX ? "" : s.substr(bestStart, bestLen);
}`,
  csharp: `using System.Collections.Generic;

public class Solution {
    public string MinWindow(string s, string t) {
        if (t.Length > s.Length) return "";

        var need = new Dictionary<char, int>();
        var window = new Dictionary<char, int>();

        foreach (char ch in t) {
            if (!need.ContainsKey(ch)) need[ch] = 0;
            need[ch]++;
        }

        int have = 0;
        int required = need.Count;
        int left = 0;
        int bestLen = int.MaxValue;
        int bestStart = 0;

        for (int right = 0; right < s.Length; right++) {
            char ch = s[right];
            if (!window.ContainsKey(ch)) window[ch] = 0;
            window[ch]++;

            if (need.ContainsKey(ch) && window[ch] == need[ch]) {
                have++;
            }

            while (have == required) {
                if (right - left + 1 < bestLen) {
                    bestLen = right - left + 1;
                    bestStart = left;
                }

                char leftChar = s[left];
                window[leftChar]--;

                if (need.ContainsKey(leftChar) && window[leftChar] < need[leftChar]) {
                    have--;
                }

                left++;
            }
        }

        return bestLen == int.MaxValue ? "" : s.Substring(bestStart, bestLen);
    }
}`,
  go: `package main

func minWindow(s string, t string) string {
    if len(t) > len(s) {
        return ""
    }

    need := map[byte]int{}
    window := map[byte]int{}

    for i := 0; i < len(t); i++ {
        need[t[i]]++
    }

    have := 0
    required := len(need)
    left := 0
    bestLen := len(s) + 1
    bestStart := 0

    for right := 0; right < len(s); right++ {
        ch := s[right]
        window[ch]++

        if _, ok := need[ch]; ok && window[ch] == need[ch] {
            have++
        }

        for have == required {
            if right-left+1 < bestLen {
                bestLen = right - left + 1
                bestStart = left
            }

            leftChar := s[left]
            window[leftChar]--

            if _, ok := need[leftChar]; ok && window[leftChar] < need[leftChar] {
                have--
            }

            left++
        }
    }

    if bestLen == len(s)+1 {
        return ""
    }

    return s[bestStart : bestStart+bestLen]
}`,
  rust: `use std::collections::HashMap;

fn min_window(s: String, t: String) -> String {
    if t.len() > s.len() {
        return String::new();
    }

    let chars: Vec<char> = s.chars().collect();
    let target: Vec<char> = t.chars().collect();

    let mut need: HashMap<char, i32> = HashMap::new();
    let mut window: HashMap<char, i32> = HashMap::new();

    for ch in target {
        *need.entry(ch).or_insert(0) += 1;
    }

    let required = need.len() as i32;
    let mut have = 0;
    let mut left = 0usize;
    let mut best_len = usize::MAX;
    let mut best_start = 0usize;

    for right in 0..chars.len() {
        let ch = chars[right];
        *window.entry(ch).or_insert(0) += 1;

        if let Some(&need_count) = need.get(&ch) {
            if window.get(&ch) == Some(&need_count) {
                have += 1;
            }
        }

        while have == required {
            if right - left + 1 < best_len {
                best_len = right - left + 1;
                best_start = left;
            }

            let left_char = chars[left];
            if let Some(count) = window.get_mut(&left_char) {
                *count -= 1;
            }

            if let Some(&need_count) = need.get(&left_char) {
                if window.get(&left_char).unwrap_or(&0) < &need_count {
                    have -= 1;
                }
            }

            left += 1;
        }
    }

    if best_len == usize::MAX {
        String::new()
    } else {
        chars[best_start..best_start + best_len].iter().collect()
    }
}`,
  kotlin: `fun minWindow(s: String, t: String): String {
    if (t.length > s.length) return ""

    val need = HashMap<Char, Int>()
    val window = HashMap<Char, Int>()

    for (ch in t) {
        need[ch] = (need[ch] ?: 0) + 1
    }

    var have = 0
    val required = need.size
    var left = 0
    var bestLen = Int.MAX_VALUE
    var bestStart = 0

    for (right in s.indices) {
        val ch = s[right]
        window[ch] = (window[ch] ?: 0) + 1

        if (need.containsKey(ch) && window[ch] == need[ch]) {
            have++
        }

        while (have == required) {
            if (right - left + 1 < bestLen) {
                bestLen = right - left + 1
                bestStart = left
            }

            val leftChar = s[left]
            window[leftChar] = window[leftChar]!! - 1

            if (need.containsKey(leftChar) && window[leftChar]!! < need[leftChar]!!) {
                have--
            }

            left++
        }
    }

    return if (bestLen == Int.MAX_VALUE) "" else s.substring(bestStart, bestStart + bestLen)
}`,
  swift: `func minWindow(_ s: String, _ t: String) -> String {
    let sChars = Array(s)
    let tChars = Array(t)

    if tChars.count > sChars.count { return "" }

    var need: [Character: Int] = [:]
    var window: [Character: Int] = [:]

    for ch in tChars {
        need[ch, default: 0] += 1
    }

    let required = need.count
    var have = 0
    var left = 0
    var bestLen = Int.max
    var bestStart = 0

    for right in 0..<sChars.count {
        let ch = sChars[right]
        window[ch, default: 0] += 1

        if let needCount = need[ch], window[ch] == needCount {
            have += 1
        }

        while have == required {
            if right - left + 1 < bestLen {
                bestLen = right - left + 1
                bestStart = left
            }

            let leftChar = sChars[left]
            window[leftChar, default: 0] -= 1

            if let needCount = need[leftChar], let current = window[leftChar], current < needCount {
                have -= 1
            }

            left += 1
        }
    }

    if bestLen == Int.max { return "" }
    return String(sChars[bestStart..<(bestStart + bestLen)])
}`,
};

const TEST_CASES: TestCase[] = [
  { id: 1, s: "ADOBECODEBANC", t: "ABC", expected: "BANC" },
  { id: 2, s: "a", t: "a", expected: "a" },
  { id: 3, s: "a", t: "aa", expected: "" },
];

function normalizeResult(value: unknown): string | null {
  return typeof value === "string" ? value : null;
}

function runJsLike(code: string, testCase: TestCase) {
  const wrapped = `
${code}
return typeof minWindow === "function"
  ? minWindow(${JSON.stringify(testCase.s)}, ${JSON.stringify(testCase.t)})
  : null;
`;
  const fn = new Function(wrapped);
  return fn();
}

export default function MinimumWindowSubstringPracticePage() {
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
        `input: s=${JSON.stringify(selectedCase.s)}, t=${JSON.stringify(selectedCase.t)}`,
        `expected: ${JSON.stringify(selectedCase.expected)}`,
        `got: ${normalized === null ? String(raw) : JSON.stringify(normalized)}`,
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
          : `case ${r.id}: ${r.passed ? "PASS" : `FAIL (got ${JSON.stringify(r.got)}, expected ${JSON.stringify(r.expected)})`}`
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
                <span className="rounded border border-red-500/60 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-red-400">
                  Hard
                </span>
                <span className="rounded border border-cyan-500/40 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-cyan-400">
                  Sliding Window
                </span>
              </div>

              <h1 className="mt-4 text-5xl font-bold tracking-tight md:text-6xl">
                <span className="mr-3 text-primary">$</span>Minimum Window Substring
              </h1>

              <p className="mt-5 max-w-4xl text-lg leading-8 text-muted-foreground">
                Given two strings <span className="text-foreground">s</span> and{" "}
                <span className="text-foreground">t</span>, return the minimum window substring
                of <span className="text-foreground">s</span> such that every character in{" "}
                <span className="text-foreground">t</span> is included in the window.
              </p>
            </div>

            <div className="max-h-[calc(100vh-180px)] overflow-y-auto px-5 py-5">
              <div className="space-y-8">
                <div>
                  <h2 className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                    Description
                  </h2>
                  <div className="mt-4 space-y-5 text-base leading-8 text-muted-foreground">
                    <p>If there is no such substring, return the empty string.</p>
                    <p>This is a classic shrink-when-valid sliding window problem.</p>
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
                            <span className="text-foreground">Input:</span> s = {JSON.stringify(example.s)}, t = {JSON.stringify(example.t)}
                          </div>
                          <div>
                            <span className="text-foreground">Output:</span> {JSON.stringify(example.expected)}
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
                    <div>• m == s.length</div>
                    <div>• n == t.length</div>
                    <div>• 1 &lt;= m, n &lt;= 10^5</div>
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
                      <p>1. Count required characters from t.</p>
                      <p>2. Expand right until the window is valid.</p>
                      <p>3. Shrink left while keeping the window valid.</p>
                      <p>4. Track the smallest valid window seen so far.</p>
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
                        <span className="text-muted-foreground">Input:</span> s = {JSON.stringify(test.s)}, t = {JSON.stringify(test.t)}
                      </div>
                      <div className="mt-1 text-sm text-foreground">
                        <span className="text-muted-foreground">Output:</span> {JSON.stringify(test.expected)}
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
                  <div>Expected approach: shrink-when-valid sliding window.</div>
                  <div>Time: O(m + n)</div>
                  <div>Space: O(m + n)</div>
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
