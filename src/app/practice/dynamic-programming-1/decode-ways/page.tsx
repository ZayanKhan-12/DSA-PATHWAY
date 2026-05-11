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
  s: string;
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
  javascript: `function numDecodings(s) {
  // write your answer here using prefix DP
  throw new Error("Implement numDecodings first");
}`,
  python: `class Solution:
    def numDecodings(self, s: str) -> int:
        # write your answer here using prefix DP
        return 0`,
  java: `class Solution {
    public int numDecodings(String s) {
        // write your answer here using prefix DP
        return 0;
    }
}`,
  cpp: `class Solution {
public:
    int numDecodings(string s) {
        // write your answer here using prefix DP
        return 0;
    }
};`,
  typescript: `function numDecodings(s: string): number {
  // write your answer here using prefix DP
  throw new Error("Implement numDecodings first");
}`,
  go: `func numDecodings(s string) int {
    // write your answer here using prefix DP
    return 0
}`,
  csharp: `public class Solution {
    public int NumDecodings(string s) {
        // write your answer here using prefix DP
        return 0;
    }
}`,
  rust: `impl Solution {
    pub fn num_decodings(s: String) -> i32 {
        // write your answer here using prefix DP
        0
    }
}`,
};

const SOLUTION_CODE: Record<LanguageKey, string> = {
  javascript: `function numDecodings(s) {
  if (s.length === 0 || s[0] === "0") {
    return 0;
  }

  let twoBack = 1;
  let oneBack = 1;

  for (let i = 1; i < s.length; i++) {
    let current = 0;

    const oneDigit = Number(s[i]);
    const twoDigits = Number(s.slice(i - 1, i + 1));

    if (oneDigit >= 1 && oneDigit <= 9) {
      current += oneBack;
    }

    if (twoDigits >= 10 && twoDigits <= 26) {
      current += twoBack;
    }

    twoBack = oneBack;
    oneBack = current;
  }

  return oneBack;
}`,
  python: `class Solution:
    def numDecodings(self, s: str) -> int:
        if not s or s[0] == "0":
            return 0

        two_back = 1
        one_back = 1

        for i in range(1, len(s)):
            current = 0

            one_digit = int(s[i])
            two_digits = int(s[i - 1:i + 1])

            if 1 <= one_digit <= 9:
                current += one_back

            if 10 <= two_digits <= 26:
                current += two_back

            two_back = one_back
            one_back = current

        return one_back`,
  java: `class Solution {
    public int numDecodings(String s) {
        if (s.length() == 0 || s.charAt(0) == '0') {
            return 0;
        }

        int twoBack = 1;
        int oneBack = 1;

        for (int i = 1; i < s.length(); i++) {
            int current = 0;

            int oneDigit = s.charAt(i) - '0';
            int twoDigits = Integer.parseInt(s.substring(i - 1, i + 1));

            if (oneDigit >= 1 && oneDigit <= 9) {
                current += oneBack;
            }

            if (twoDigits >= 10 && twoDigits <= 26) {
                current += twoBack;
            }

            twoBack = oneBack;
            oneBack = current;
        }

        return oneBack;
    }
}`,
  cpp: `class Solution {
public:
    int numDecodings(string s) {
        if (s.empty() || s[0] == '0') {
            return 0;
        }

        int twoBack = 1;
        int oneBack = 1;

        for (int i = 1; i < s.size(); i++) {
            int current = 0;

            int oneDigit = s[i] - '0';
            int twoDigits = (s[i - 1] - '0') * 10 + (s[i] - '0');

            if (oneDigit >= 1 && oneDigit <= 9) {
                current += oneBack;
            }

            if (twoDigits >= 10 && twoDigits <= 26) {
                current += twoBack;
            }

            twoBack = oneBack;
            oneBack = current;
        }

        return oneBack;
    }
};`,
  typescript: `function numDecodings(s: string): number {
  if (s.length === 0 || s[0] === "0") {
    return 0;
  }

  let twoBack = 1;
  let oneBack = 1;

  for (let i = 1; i < s.length; i++) {
    let current = 0;

    const oneDigit = Number(s[i]);
    const twoDigits = Number(s.slice(i - 1, i + 1));

    if (oneDigit >= 1 && oneDigit <= 9) {
      current += oneBack;
    }

    if (twoDigits >= 10 && twoDigits <= 26) {
      current += twoBack;
    }

    twoBack = oneBack;
    oneBack = current;
  }

  return oneBack;
}`,
  go: `func numDecodings(s string) int {
    if len(s) == 0 || s[0] == '0' {
        return 0
    }

    twoBack := 1
    oneBack := 1

    for i := 1; i < len(s); i++ {
        current := 0

        oneDigit := int(s[i] - '0')
        twoDigits := int(s[i - 1] - '0') * 10 + int(s[i] - '0')

        if oneDigit >= 1 && oneDigit <= 9 {
            current += oneBack
        }

        if twoDigits >= 10 && twoDigits <= 26 {
            current += twoBack
        }

        twoBack = oneBack
        oneBack = current
    }

    return oneBack
}`,
  csharp: `public class Solution {
    public int NumDecodings(string s) {
        if (s.Length == 0 || s[0] == '0') {
            return 0;
        }

        int twoBack = 1;
        int oneBack = 1;

        for (int i = 1; i < s.Length; i++) {
            int current = 0;

            int oneDigit = s[i] - '0';
            int twoDigits = (s[i - 1] - '0') * 10 + (s[i] - '0');

            if (oneDigit >= 1 && oneDigit <= 9) {
                current += oneBack;
            }

            if (twoDigits >= 10 && twoDigits <= 26) {
                current += twoBack;
            }

            twoBack = oneBack;
            oneBack = current;
        }

        return oneBack;
    }
}`,
  rust: `impl Solution {
    pub fn num_decodings(s: String) -> i32 {
        let bytes = s.as_bytes();

        if bytes.is_empty() || bytes[0] == b'0' {
            return 0;
        }

        let mut two_back = 1;
        let mut one_back = 1;

        for i in 1..bytes.len() {
            let mut current = 0;

            let one_digit = (bytes[i] - b'0') as i32;
            let two_digits =
                ((bytes[i - 1] - b'0') as i32) * 10 +
                ((bytes[i] - b'0') as i32);

            if one_digit >= 1 && one_digit <= 9 {
                current += one_back;
            }

            if two_digits >= 10 && two_digits <= 26 {
                current += two_back;
            }

            two_back = one_back;
            one_back = current;
        }

        one_back
    }
}`,
};

const TEST_CASES: TestCase[] = [
  { id: 1, s: "12", expected: 2 },
  { id: 2, s: "226", expected: 3 },
  { id: 3, s: "06", expected: 0 },
  { id: 4, s: "10", expected: 1 },
  { id: 5, s: "11106", expected: 2 },
  { id: 6, s: "2101", expected: 1 },
  { id: 7, s: "27", expected: 1 },
];

function getLanguageLabel(language: LanguageKey) {
  return LANGUAGES.find((item) => item.key === language)?.label ?? language;
}

function executeJavaScript(code: string, test: TestCase) {
  try {
    const numDecodings = new Function(`
      "use strict";
      ${code}
      return numDecodings;
    `)() as (s: string) => number;

    if (typeof numDecodings !== "function") {
      return {
        pass: false,
        actual: 0,
        error: "numDecodings function was not found. Keep the function named numDecodings.",
      };
    }

    const actual = numDecodings(test.s);

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

export default function DecodeWaysPracticePage() {
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
        `s: ${selectedCase.s}`,
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
        lines.push(`  s: ${test.s}`);
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
          ? "Not accepted yet. Implement numDecodings, then run again."
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
            <Link className="hover:text-primary" href="/learn/dynamic-programming-1">
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
                  DP
                </span>
                <span className="border border-border px-3 py-1 text-[10px] font-bold tracking-[0.25em] text-muted-foreground">
                  PREFIX RECURRENCE
                </span>
              </div>

              <div className="mb-3 flex items-center gap-3">
                <span className="text-5xl font-bold leading-none text-primary">$</span>
                <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                  Decode Ways
                </h1>
              </div>

              <p className="max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
                Count possibilities with prefix-based recurrence.
              </p>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              <div className="mb-4 text-[10px] font-bold tracking-[0.35em] text-muted-foreground">
                DESCRIPTION
              </div>

              <div className="space-y-5 text-sm leading-7 text-muted-foreground">
                <div className="terminal-frame p-4">
                  <p>
                    A message containing digits can be decoded using{" "}
                    <span className="text-foreground">1 → A</span>,{" "}
                    <span className="text-foreground">2 → B</span>, up to{" "}
                    <span className="text-foreground">26 → Z</span>.
                  </p>
                  <p className="mt-2">
                    Return the number of possible decodings.
                  </p>
                  <p className="mt-2">
                    A standalone <span className="text-foreground">0</span> is invalid, but{" "}
                    <span className="text-foreground">10</span> and{" "}
                    <span className="text-foreground">20</span> are valid.
                  </p>
                </div>

                <div className="terminal-frame p-4">
                  <h2 className="mb-3 text-xl font-bold text-foreground">Example</h2>
                  <pre className="overflow-x-auto whitespace-pre-wrap text-xs leading-6 md:text-sm">
{`Input: s = "226"
Output: 3

Ways:
"2 2 6" -> B B F
"22 6"  -> V F
"2 26"  -> B Z`}
                  </pre>
                </div>

                <div className="terminal-frame p-4">
                  <h2 className="mb-3 text-xl font-bold text-foreground">DP Pattern</h2>
                  <ul className="list-disc space-y-2 pl-5">
                    <li>If the current single digit is 1 to 9, add ways from one step back</li>
                    <li>If the current two-digit number is 10 to 26, add ways from two steps back</li>
                    <li>If both are invalid, the current prefix has zero decodings</li>
                    <li>Use two rolling variables instead of a full DP array</li>
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
                        <p className="text-foreground">s: {test.s}</p>
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
                  <p className="mt-3">Expected approach: prefix DP</p>
                  <p>Time: O(n)</p>
                  <p>Space: O(1)</p>
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
