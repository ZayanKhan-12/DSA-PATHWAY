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
  nums: number[];
  k: number;
  expected: number[];
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
  typescript: `function topKFrequent(nums: number[], k: number): number[] {
  // write your answer here

  return [];
}`,
  javascript: `function topKFrequent(nums, k) {
  // write your answer here

  return [];
}`,
  python: `def top_k_frequent(nums, k):
    # write your answer here
    return []`,
  java: `class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        // write your answer here
        return new int[] {};
    }
}`,
  cpp: `#include <vector>
using namespace std;

vector<int> topKFrequent(vector<int>& nums, int k) {
    // write your answer here
    return {};
}`,
  csharp: `public class Solution {
    public int[] TopKFrequent(int[] nums, int k) {
        // write your answer here
        return new int[] {};
    }
}`,
  go: `package main

func topKFrequent(nums []int, k int) []int {
    // write your answer here
    return []int{}
}`,
  rust: `fn top_k_frequent(nums: Vec<i32>, k: i32) -> Vec<i32> {
    // write your answer here
    vec![]
}`,
  kotlin: `fun topKFrequent(nums: IntArray, k: Int): IntArray {
    // write your answer here
    return intArrayOf()
}`,
  swift: `func topKFrequent(_ nums: [Int], _ k: Int) -> [Int] {
    // write your answer here
    return []
}`,
};

const SOLUTION_CODE: Record<LanguageKey, string> = {
  typescript: `function topKFrequent(nums: number[], k: number): number[] {
  const count = new Map<number, number>();

  for (const num of nums) {
    count.set(num, (count.get(num) ?? 0) + 1);
  }

  const entries = Array.from(count.entries());
  entries.sort((a, b) => b[1] - a[1]);

  return entries.slice(0, k).map(([num]) => num);
}`,
  javascript: `function topKFrequent(nums, k) {
  const count = new Map();

  for (const num of nums) {
    count.set(num, (count.get(num) ?? 0) + 1);
  }

  const entries = Array.from(count.entries());
  entries.sort((a, b) => b[1] - a[1]);

  return entries.slice(0, k).map(([num]) => num);
}`,
  python: `def top_k_frequent(nums, k):
    count = {}

    for num in nums:
        count[num] = count.get(num, 0) + 1

    entries = sorted(count.items(), key=lambda x: -x[1])
    return [num for num, _ in entries[:k]]`,
  java: `import java.util.*;

class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        Map<Integer, Integer> count = new HashMap<>();

        for (int num : nums) {
            count.put(num, count.getOrDefault(num, 0) + 1);
        }

        List<Map.Entry<Integer, Integer>> entries = new ArrayList<>(count.entrySet());
        entries.sort((a, b) -> b.getValue() - a.getValue());

        int[] result = new int[k];
        for (int i = 0; i < k; i++) {
            result[i] = entries.get(i).getKey();
        }

        return result;
    }
}`,
  cpp: `#include <vector>
#include <unordered_map>
#include <algorithm>
using namespace std;

vector<int> topKFrequent(vector<int>& nums, int k) {
    unordered_map<int, int> count;

    for (int num : nums) {
        count[num]++;
    }

    vector<pair<int, int>> entries;
    for (auto& entry : count) {
        entries.push_back(entry);
    }

    sort(entries.begin(), entries.end(), [](auto& a, auto& b) {
        return a.second > b.second;
    });

    vector<int> result;
    for (int i = 0; i < k; i++) {
        result.push_back(entries[i].first);
    }

    return result;
}`,
  csharp: `using System.Collections.Generic;
using System.Linq;

public class Solution {
    public int[] TopKFrequent(int[] nums, int k) {
        var count = new Dictionary<int, int>();

        foreach (int num in nums) {
            if (!count.ContainsKey(num)) count[num] = 0;
            count[num]++;
        }

        return count
            .OrderByDescending(entry => entry.Value)
            .Take(k)
            .Select(entry => entry.Key)
            .ToArray();
    }
}`,
  go: `package main

import "sort"

func topKFrequent(nums []int, k int) []int {
    count := map[int]int{}

    for _, num := range nums {
        count[num]++
    }

    type pair struct {
        num  int
        freq int
    }

    entries := []pair{}
    for num, freq := range count {
        entries = append(entries, pair{num, freq})
    }

    sort.Slice(entries, func(i, j int) bool {
        return entries[i].freq > entries[j].freq
    })

    result := []int{}
    for i := 0; i < k; i++ {
        result = append(result, entries[i].num)
    }

    return result
}`,
  rust: `use std::collections::HashMap;

fn top_k_frequent(nums: Vec<i32>, k: i32) -> Vec<i32> {
    let mut count: HashMap<i32, i32> = HashMap::new();

    for num in nums {
        *count.entry(num).or_insert(0) += 1;
    }

    let mut entries: Vec<(i32, i32)> = count.into_iter().collect();
    entries.sort_by(|a, b| b.1.cmp(&a.1));

    entries
        .into_iter()
        .take(k as usize)
        .map(|(num, _)| num)
        .collect()
}`,
  kotlin: `fun topKFrequent(nums: IntArray, k: Int): IntArray {
    val count = HashMap<Int, Int>()

    for (num in nums) {
        count[num] = (count[num] ?: 0) + 1
    }

    return count.entries
        .sortedByDescending { it.value }
        .take(k)
        .map { it.key }
        .toIntArray()
}`,
  swift: `func topKFrequent(_ nums: [Int], _ k: Int) -> [Int] {
    var count: [Int: Int] = [:]

    for num in nums {
        count[num, default: 0] += 1
    }

    let sortedEntries = count.sorted { $0.value > $1.value }
    return Array(sortedEntries.prefix(k).map { $0.key })
}`,
};

const TEST_CASES: TestCase[] = [
  { id: 1, nums: [1, 1, 1, 2, 2, 3], k: 2, expected: [1, 2] },
  { id: 2, nums: [1], k: 1, expected: [1] },
  { id: 3, nums: [1, 2, 1, 2, 1, 2, 3, 1, 3, 2], k: 2, expected: [1, 2] },
];

function normalizeNumberArray(value: unknown): number[] | null {
  if (!Array.isArray(value)) return null;
  if (!value.every((item) => typeof item === "number")) return null;
  return [...value].sort((a, b) => a - b);
}

function sameNumbers(a: number[] | null, b: number[]) {
  if (!a) return false;
  const bb = [...b].sort((x, y) => x - y);
  return JSON.stringify(a) === JSON.stringify(bb);
}

function runJsLike(code: string, testCase: TestCase) {
  const wrapped = `
${code}
return typeof topKFrequent === "function"
  ? topKFrequent(${JSON.stringify(testCase.nums)}, ${testCase.k})
  : null;
`;
  const fn = new Function(wrapped);
  return fn();
}

export default function TopKFrequentElementsPracticePage() {
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
      const normalized = normalizeNumberArray(raw);
      const passed = sameNumbers(normalized, selectedCase.expected);

      appendConsole([
        "$ run.sample",
        `case: ${selectedCase.id}`,
        `input: nums=${JSON.stringify(selectedCase.nums)}, k=${selectedCase.k}`,
        `expected: ${JSON.stringify([...selectedCase.expected].sort((a, b) => a - b))}`,
        `got: ${normalized ? JSON.stringify(normalized) : String(raw)}`,
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
        const normalized = normalizeNumberArray(raw);
        return {
          id: test.id,
          passed: sameNumbers(normalized, test.expected),
          got: normalized,
          expected: [...test.expected].sort((a, b) => a - b),
          error: null as string | null,
        };
      } catch (error) {
        return {
          id: test.id,
          passed: false,
          got: null,
          expected: [...test.expected].sort((a, b) => a - b),
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
            <Link href="/visualize/arrays-hashing">Visualizer</Link>
            <Link href="/learn/arrays-hashing#practice">Back to Lesson</Link>
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
                  Heap / Bucket
                </span>
              </div>

              <h1 className="mt-4 text-5xl font-bold tracking-tight md:text-6xl">
                <span className="mr-3 text-primary">$</span>Top K Frequent Elements
              </h1>

              <p className="mt-5 max-w-4xl text-lg leading-8 text-muted-foreground">
                Given an integer array <span className="text-foreground">nums</span> and an integer{" "}
                <span className="text-foreground">k</span>, return the{" "}
                <span className="text-foreground">k</span> most frequent elements.
              </p>
            </div>

            <div className="max-h-[calc(100vh-180px)] overflow-y-auto px-5 py-5">
              <div className="space-y-8">
                <div>
                  <h2 className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                    Description
                  </h2>
                  <div className="mt-4 space-y-5 text-base leading-8 text-muted-foreground">
                    <p>You may return the answer in any order.</p>
                    <p>The main pattern is frequency counting, then choosing the top k keys.</p>
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
                            <span className="text-foreground">Input:</span> nums = {JSON.stringify(example.nums)}, k = {example.k}
                          </div>
                          <div>
                            <span className="text-foreground">Output:</span> {JSON.stringify([...example.expected].sort((a, b) => a - b))}
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
                    <div>• 1 &lt;= nums.length &lt;= 10^5</div>
                    <div>• -10^4 &lt;= nums[i] &lt;= 10^4</div>
                    <div>• 1 &lt;= k &lt;= number of unique elements in the array</div>
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
                      <p>1. Count how many times each number appears.</p>
                      <p>2. Sort or bucket by frequency.</p>
                      <p>3. Take the first k numbers with the highest counts.</p>
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
                        <span className="text-muted-foreground">Input:</span> {JSON.stringify(test.nums)}, k = {test.k}
                      </div>
                      <div className="mt-1 text-sm text-foreground">
                        <span className="text-muted-foreground">Output:</span> {JSON.stringify([...test.expected].sort((a, b) => a - b))}
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
                  <div>Expected approach: frequency map + top-k selection.</div>
                  <div>Time: O(n log n) with sorting</div>
                  <div>Space: O(n)</div>
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
