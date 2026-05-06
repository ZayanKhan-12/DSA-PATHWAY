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
  typescript: `function isValid(s: string): boolean {
  // write your answer here

  return false;
}`,
  javascript: `function isValid(s) {
  // write your answer here

  return false;
}`,
  python: `def is_valid(s):
    # write your answer here
    return False`,
  java: `class Solution {
    public boolean isValid(String s) {
        // write your answer here
        return false;
    }
}`,
  cpp: `#include <string>
using namespace std;

bool isValid(string s) {
    // write your answer here
    return false;
}`,
  csharp: `public class Solution {
    public bool IsValid(string s) {
        // write your answer here
        return false;
    }
}`,
  go: `package main

func isValid(s string) bool {
    // write your answer here
    return false
}`,
  rust: `fn is_valid(s: String) -> bool {
    // write your answer here
    false
}`,
  kotlin: `fun isValid(s: String): Boolean {
    // write your answer here
    return false
}`,
  swift: `func isValid(_ s: String) -> Bool {
    // write your answer here
    return false
}`,
};

const SOLUTION_CODE: Record<LanguageKey, string> = {
  typescript: `function isValid(s: string): boolean {
  const stack: string[] = [];
  const pairs: Record<string, string> = {
    ")": "(",
    "]": "[",
    "}": "{",
  };

  for (const ch of s) {
    if (ch === "(" || ch === "[" || ch === "{") {
      stack.push(ch);
    } else {
      if (stack.length === 0 || stack.pop() !== pairs[ch]) {
        return false;
      }
    }
  }

  return stack.length === 0;
}`,
  javascript: `function isValid(s) {
  const stack = [];
  const pairs = {
    ")": "(",
    "]": "[",
    "}": "{",
  };

  for (const ch of s) {
    if (ch === "(" || ch === "[" || ch === "{") {
      stack.push(ch);
    } else {
      if (stack.length === 0 || stack.pop() !== pairs[ch]) {
        return false;
      }
    }
  }

  return stack.length === 0;
}`,
  python: `def is_valid(s):
    stack = []
    pairs = {
        ")": "(",
        "]": "[",
        "}": "{",
    }

    for ch in s:
        if ch in "([{":
            stack.append(ch)
        else:
            if not stack or stack.pop() != pairs[ch]:
                return False

    return len(stack) == 0`,
  java: `import java.util.*;

class Solution {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        Map<Character, Character> pairs = new HashMap<>();
        pairs.put(')', '(');
        pairs.put(']', '[');
        pairs.put('}', '{');

        for (char ch : s.toCharArray()) {
            if (ch == '(' || ch == '[' || ch == '{') {
                stack.push(ch);
            } else {
                if (stack.isEmpty() || stack.pop() != pairs.get(ch)) {
                    return false;
                }
            }
        }

        return stack.isEmpty();
    }
}`,
  cpp: `#include <string>
#include <stack>
#include <unordered_map>
using namespace std;

bool isValid(string s) {
    stack<char> st;
    unordered_map<char, char> pairs = {
        {')', '('},
        {']', '['},
        {'}', '{'}
    };

    for (char ch : s) {
        if (ch == '(' || ch == '[' || ch == '{') {
            st.push(ch);
        } else {
            if (st.empty() || st.top() != pairs[ch]) {
                return false;
            }
            st.pop();
        }
    }

    return st.empty();
}`,
  csharp: `using System.Collections.Generic;

public class Solution {
    public bool IsValid(string s) {
        Stack<char> stack = new Stack<char>();
        Dictionary<char, char> pairs = new Dictionary<char, char> {
            { ')', '(' },
            { ']', '[' },
            { '}', '{' }
        };

        foreach (char ch in s) {
            if (ch == '(' || ch == '[' || ch == '{') {
                stack.Push(ch);
            } else {
                if (stack.Count == 0 || stack.Pop() != pairs[ch]) {
                    return false;
                }
            }
        }

        return stack.Count == 0;
    }
}`,
  go: `package main

func isValid(s string) bool {
    stack := []rune{}
    pairs := map[rune]rune{
        ')': '(',
        ']': '[',
        '}': '{',
    }

    for _, ch := range s {
        if ch == '(' || ch == '[' || ch == '{' {
            stack = append(stack, ch)
        } else {
            if len(stack) == 0 || stack[len(stack)-1] != pairs[ch] {
                return false
            }
            stack = stack[:len(stack)-1]
        }
    }

    return len(stack) == 0
}`,
  rust: `use std::collections::HashMap;

fn is_valid(s: String) -> bool {
    let mut stack: Vec<char> = Vec::new();
    let pairs: HashMap<char, char> = HashMap::from([
        (')', '('),
        (']', '['),
        ('}', '{'),
    ]);

    for ch in s.chars() {
        if ch == '(' || ch == '[' || ch == '{' {
            stack.push(ch);
        } else {
            if stack.pop() != Some(*pairs.get(&ch).unwrap()) {
                return false;
            }
        }
    }

    stack.is_empty()
}`,
  kotlin: `fun isValid(s: String): Boolean {
    val stack = mutableListOf<Char>()
    val pairs = mapOf(
        ')' to '(',
        ']' to '[',
        '}' to '{'
    )

    for (ch in s) {
        if (ch == '(' || ch == '[' || ch == '{') {
            stack.add(ch)
        } else {
            if (stack.isEmpty() || stack.removeAt(stack.lastIndex) != pairs[ch]) {
                return false
            }
        }
    }

    return stack.isEmpty()
}`,
  swift: `func isValid(_ s: String) -> Bool {
    var stack: [Character] = []
    let pairs: [Character: Character] = [
        ")": "(",
        "]": "[",
        "}": "{"
    ]

    for ch in s {
        if ch == "(" || ch == "[" || ch == "{" {
            stack.append(ch)
        } else {
            if stack.isEmpty || stack.removeLast() != pairs[ch] {
                return false
            }
        }
    }

    return stack.isEmpty
}`,
};

const TEST_CASES: TestCase[] = [
  { id: 1, s: "()", expected: true },
  { id: 2, s: "()[]{}", expected: true },
  { id: 3, s: "(]", expected: false },
  { id: 4, s: "([])", expected: true },
];

function normalizeResult(value: unknown): boolean | null {
  return typeof value === "boolean" ? value : null;
}

function runJsLike(code: string, testCase: TestCase) {
  const wrapped = `
${code}
return typeof isValid === "function"
  ? isValid(${JSON.stringify(testCase.s)})
  : null;
`;
  const fn = new Function(wrapped);
  return fn();
}

export default function ValidParenthesesPracticePage() {
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
        `input: s=${JSON.stringify(selectedCase.s)}`,
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
            <Link href="/visualize/stack-queue">Visualizer</Link>
            <Link href="/learn/stack-queue#practice">Back to Lesson</Link>
          </div>
        </div>

        <div className="grid gap-5 xl:grid-cols-[1.02fr_1fr]">
          <section className="border border-border bg-card/30">
            <div className="border-b border-border px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="rounded border border-green-500/60 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-green-400">
                  Easy
                </span>
                <span className="rounded border border-cyan-500/40 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-cyan-400">
                  Stack
                </span>
              </div>

              <h1 className="mt-4 text-5xl font-bold tracking-tight md:text-6xl">
                <span className="mr-3 text-primary">$</span>Valid Parentheses
              </h1>

              <p className="mt-5 max-w-4xl text-lg leading-8 text-muted-foreground">
                Given a string <span className="text-foreground">s</span> containing just
                the characters <span className="text-foreground">()[]&#123;&#125;</span>,
                determine if the input string is valid.
              </p>
            </div>

            <div className="max-h-[calc(100vh-180px)] overflow-y-auto px-5 py-5">
              <div className="space-y-8">
                <div>
                  <h2 className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                    Description
                  </h2>
                  <div className="mt-4 space-y-5 text-base leading-8 text-muted-foreground">
                    <p>Open brackets must be closed by the same type of brackets.</p>
                    <p>Open brackets must be closed in the correct order.</p>
                    <p>Every close bracket must have a corresponding open bracket.</p>
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
                    <div>• 1 &lt;= s.length &lt;= 10^4</div>
                    <div>• s consists of parentheses only: ()[]&#123;&#125;</div>
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
                      <p>1. Push opening brackets onto a stack.</p>
                      <p>2. On a closing bracket, the top of the stack must match.</p>
                      <p>3. If it does not match, return false immediately.</p>
                      <p>4. At the end, the stack must be empty.</p>
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
                        <span className="text-muted-foreground">Input:</span> s = {JSON.stringify(test.s)}
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
                  <div>Expected approach: stack push/pop matching.</div>
                  <div>Time: O(n)</div>
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
