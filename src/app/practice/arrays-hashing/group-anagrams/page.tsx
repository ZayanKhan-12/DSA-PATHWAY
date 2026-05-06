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
  strs: string[];
  expected: string[][];
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
  typescript: `function groupAnagrams(strs: string[]): string[][] {
  // write your answer here

  return [];
}`,
  javascript: `function groupAnagrams(strs) {
  // write your answer here

  return [];
}`,
  python: `def group_anagrams(strs):
    # write your answer here
    return []`,
  java: `import java.util.*;

class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        // write your answer here
        return new ArrayList<>();
    }
}`,
  cpp: `#include <vector>
#include <string>
using namespace std;

vector<vector<string>> groupAnagrams(vector<string>& strs) {
    // write your answer here
    return {};
}`,
  csharp: `using System.Collections.Generic;

public class Solution {
    public IList<IList<string>> GroupAnagrams(string[] strs) {
        // write your answer here
        return new List<IList<string>>();
    }
}`,
  go: `package main

func groupAnagrams(strs []string) [][]string {
    // write your answer here
    return [][]string{}
}`,
  rust: `fn group_anagrams(strs: Vec<String>) -> Vec<Vec<String>> {
    // write your answer here
    vec![]
}`,
  kotlin: `fun groupAnagrams(strs: Array<String>): List<List<String>> {
    // write your answer here
    return listOf()
}`,
  swift: `func groupAnagrams(_ strs: [String]) -> [[String]] {
    // write your answer here
    return []
}`,
};

const SOLUTION_CODE: Record<LanguageKey, string> = {
  typescript: `function groupAnagrams(strs: string[]): string[][] {
  const groups = new Map<string, string[]>();

  for (const word of strs) {
    const key = word.split("").sort().join("");

    if (!groups.has(key)) {
      groups.set(key, []);
    }

    groups.get(key)!.push(word);
  }

  return Array.from(groups.values());
}`,
  javascript: `function groupAnagrams(strs) {
  const groups = new Map();

  for (const word of strs) {
    const key = word.split("").sort().join("");

    if (!groups.has(key)) {
      groups.set(key, []);
    }

    groups.get(key).push(word);
  }

  return Array.from(groups.values());
}`,
  python: `def group_anagrams(strs):
    groups = {}

    for word in strs:
        key = "".join(sorted(word))

        if key not in groups:
            groups[key] = []

        groups[key].append(word)

    return list(groups.values())`,
  java: `import java.util.*;

class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        Map<String, List<String>> groups = new HashMap<>();

        for (String word : strs) {
            char[] chars = word.toCharArray();
            Arrays.sort(chars);
            String key = new String(chars);

            groups.putIfAbsent(key, new ArrayList<>());
            groups.get(key).add(word);
        }

        return new ArrayList<>(groups.values());
    }
}`,
  cpp: `#include <vector>
#include <string>
#include <unordered_map>
#include <algorithm>
using namespace std;

vector<vector<string>> groupAnagrams(vector<string>& strs) {
    unordered_map<string, vector<string>> groups;

    for (string word : strs) {
        string key = word;
        sort(key.begin(), key.end());
        groups[key].push_back(word);
    }

    vector<vector<string>> result;
    for (auto& entry : groups) {
        result.push_back(entry.second);
    }

    return result;
}`,
  csharp: `using System.Collections.Generic;
using System.Linq;

public class Solution {
    public IList<IList<string>> GroupAnagrams(string[] strs) {
        var groups = new Dictionary<string, List<string>>();

        foreach (string word in strs) {
            var key = new string(word.OrderBy(c => c).ToArray());

            if (!groups.ContainsKey(key)) {
                groups[key] = new List<string>();
            }

            groups[key].Add(word);
        }

        return groups.Values.Cast<IList<string>>().ToList();
    }
}`,
  go: `package main

import "sort"

func groupAnagrams(strs []string) [][]string {
    groups := map[string][]string{}

    for _, word := range strs {
        chars := []rune(word)
        sort.Slice(chars, func(i, j int) bool { return chars[i] < chars[j] })
        key := string(chars)
        groups[key] = append(groups[key], word)
    }

    result := [][]string{}
    for _, group := range groups {
        result = append(result, group)
    }

    return result
}`,
  rust: `use std::collections::HashMap;

fn group_anagrams(strs: Vec<String>) -> Vec<Vec<String>> {
    let mut groups: HashMap<String, Vec<String>> = HashMap::new();

    for word in strs {
        let mut chars: Vec<char> = word.chars().collect();
        chars.sort_unstable();
        let key: String = chars.into_iter().collect();

        groups.entry(key).or_insert_with(Vec::new).push(word);
    }

    groups.into_values().collect()
}`,
  kotlin: `fun groupAnagrams(strs: Array<String>): List<List<String>> {
    val groups = HashMap<String, MutableList<String>>()

    for (word in strs) {
        val key = word.toCharArray().sorted().joinToString("")

        if (!groups.containsKey(key)) {
            groups[key] = mutableListOf()
        }

        groups[key]!!.add(word)
    }

    return groups.values.toList()
}`,
  swift: `func groupAnagrams(_ strs: [String]) -> [[String]] {
    var groups: [String: [String]] = [:]

    for word in strs {
        let key = String(word.sorted())
        groups[key, default: []].append(word)
    }

    return Array(groups.values)
}`,
};

const TEST_CASES: TestCase[] = [
  {
    id: 1,
    strs: ["eat", "tea", "tan", "ate", "nat", "bat"],
    expected: [["bat"], ["nat", "tan"], ["ate", "eat", "tea"]],
  },
  {
    id: 2,
    strs: [""],
    expected: [[""]],
  },
  {
    id: 3,
    strs: ["a"],
    expected: [["a"]],
  },
];

function canonicalizeGroups(value: unknown): string[][] | null {
  if (!Array.isArray(value)) return null;
  if (!value.every((group) => Array.isArray(group) && group.every((item) => typeof item === "string"))) {
    return null;
  }

  const groups = (value as string[][])
    .map((group) => [...group].sort())
    .sort((a, b) => a.join("|").localeCompare(b.join("|")));

  return groups;
}

function sameGroups(a: string[][] | null, b: string[][]) {
  if (!a) return false;
  const bb = b.map((group) => [...group].sort()).sort((x, y) => x.join("|").localeCompare(y.join("|")));
  return JSON.stringify(a) === JSON.stringify(bb);
}

function runJsLike(code: string, testCase: TestCase) {
  const wrapped = `
${code}
return typeof groupAnagrams === "function"
  ? groupAnagrams(${JSON.stringify(testCase.strs)})
  : null;
`;
  const fn = new Function(wrapped);
  return fn();
}

export default function GroupAnagramsPracticePage() {
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
      const normalized = canonicalizeGroups(raw);
      const passed = sameGroups(normalized, selectedCase.expected);

      appendConsole([
        "$ run.sample",
        `case: ${selectedCase.id}`,
        `input: strs=${JSON.stringify(selectedCase.strs)}`,
        `expected: ${JSON.stringify(canonicalizeGroups(selectedCase.expected))}`,
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
        const normalized = canonicalizeGroups(raw);
        return {
          id: test.id,
          passed: sameGroups(normalized, test.expected),
          got: normalized,
          expected: canonicalizeGroups(test.expected),
          error: null as string | null,
        };
      } catch (error) {
        return {
          id: test.id,
          passed: false,
          got: null,
          expected: canonicalizeGroups(test.expected),
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
                  Hashing
                </span>
              </div>

              <h1 className="mt-4 text-5xl font-bold tracking-tight md:text-6xl">
                <span className="mr-3 text-primary">$</span>Group Anagrams
              </h1>

              <p className="mt-5 max-w-4xl text-lg leading-8 text-muted-foreground">
                Given an array of strings <span className="text-foreground">strs</span>, group the
                anagrams together. You can return the answer in any order.
              </p>
            </div>

            <div className="max-h-[calc(100vh-180px)] overflow-y-auto px-5 py-5">
              <div className="space-y-8">
                <div>
                  <h2 className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                    Description
                  </h2>
                  <div className="mt-4 space-y-5 text-base leading-8 text-muted-foreground">
                    <p>Words belong in the same group if they have the same letters with the same counts.</p>
                    <p>A common trick is to build a signature for each word, then hash by that signature.</p>
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
                            <span className="text-foreground">Input:</span> strs = {JSON.stringify(example.strs)}
                          </div>
                          <div>
                            <span className="text-foreground">Output:</span> {JSON.stringify(canonicalizeGroups(example.expected))}
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
                    <div>• 1 &lt;= strs.length &lt;= 10^4</div>
                    <div>• 0 &lt;= strs[i].length &lt;= 100</div>
                    <div>• strs[i] consists of lowercase English letters.</div>
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
                      Grouping Strategy
                    </div>
                    <div className="mt-4 space-y-3 text-sm leading-7 text-muted-foreground">
                      <p>1. Convert each word into a stable signature.</p>
                      <p>2. A simple signature is the sorted version of the word.</p>
                      <p>3. Use that signature as the hash map key.</p>
                      <p>4. Append the original word into that group.</p>
                      <p>5. Return all grouped values at the end.</p>
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
                        <span className="text-muted-foreground">Input:</span> {JSON.stringify(test.strs)}
                      </div>
                      <div className="mt-1 text-sm text-foreground">
                        <span className="text-muted-foreground">Output:</span> {JSON.stringify(canonicalizeGroups(test.expected))}
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
                  <div>Expected approach: hash by sorted signature or frequency signature.</div>
                  <div>Time: O(n * k log k) with sorting</div>
                  <div>Space: O(n * k)</div>
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
