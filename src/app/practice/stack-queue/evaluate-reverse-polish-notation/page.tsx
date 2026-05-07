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
  tokens: string[];
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
  javascript: `function evalRPN(tokens) {
  // write your answer here
  return 0;
}`,
  python: `class Solution:
    def evalRPN(self, tokens: List[str]) -> int:
        # write your answer here
        return 0`,
  java: `class Solution {
    public int evalRPN(String[] tokens) {
        // write your answer here
        return 0;
    }
}`,
  cpp: `class Solution {
public:
    int evalRPN(vector<string>& tokens) {
        // write your answer here
        return 0;
    }
};`,
  typescript: `function evalRPN(tokens: string[]): number {
  // write your answer here
  return 0;
}`,
  go: `func evalRPN(tokens []string) int {
    // write your answer here
    return 0
}`,
  csharp: `public class Solution {
    public int EvalRPN(string[] tokens) {
        // write your answer here
        return 0;
    }
}`,
  rust: `impl Solution {
    pub fn eval_rpn(tokens: Vec<String>) -> i32 {
        // write your answer here
        0
    }
}`,
};

const SOLUTION_CODE: Record<LanguageKey, string> = {
  javascript: `function evalRPN(tokens) {
  const stack = [];

  for (const token of tokens) {
    if (token === "+" || token === "-" || token === "*" || token === "/") {
      const b = stack.pop();
      const a = stack.pop();

      if (token === "+") stack.push(a + b);
      if (token === "-") stack.push(a - b);
      if (token === "*") stack.push(a * b);
      if (token === "/") stack.push(Math.trunc(a / b));
    } else {
      stack.push(Number(token));
    }
  }

  return stack.pop();
}`,
  python: `class Solution:
    def evalRPN(self, tokens: List[str]) -> int:
        stack = []

        for token in tokens:
            if token in "+-*/":
                b = stack.pop()
                a = stack.pop()

                if token == "+":
                    stack.append(a + b)
                elif token == "-":
                    stack.append(a - b)
                elif token == "*":
                    stack.append(a * b)
                else:
                    stack.append(int(a / b))
            else:
                stack.append(int(token))

        return stack[-1]`,
  java: `class Solution {
    public int evalRPN(String[] tokens) {
        Stack<Integer> stack = new Stack<>();

        for (String token : tokens) {
            if ("+-*/".contains(token) && token.length() == 1) {
                int b = stack.pop();
                int a = stack.pop();

                if (token.equals("+")) stack.push(a + b);
                else if (token.equals("-")) stack.push(a - b);
                else if (token.equals("*")) stack.push(a * b);
                else stack.push(a / b);
            } else {
                stack.push(Integer.parseInt(token));
            }
        }

        return stack.pop();
    }
}`,
  cpp: `class Solution {
public:
    int evalRPN(vector<string>& tokens) {
        stack<int> st;

        for (string token : tokens) {
            if (token == "+" || token == "-" || token == "*" || token == "/") {
                int b = st.top(); st.pop();
                int a = st.top(); st.pop();

                if (token == "+") st.push(a + b);
                else if (token == "-") st.push(a - b);
                else if (token == "*") st.push(a * b);
                else st.push(a / b);
            } else {
                st.push(stoi(token));
            }
        }

        return st.top();
    }
};`,
  typescript: `function evalRPN(tokens: string[]): number {
  const stack: number[] = [];

  for (const token of tokens) {
    if (token === "+" || token === "-" || token === "*" || token === "/") {
      const b = stack.pop()!;
      const a = stack.pop()!;

      if (token === "+") stack.push(a + b);
      if (token === "-") stack.push(a - b);
      if (token === "*") stack.push(a * b);
      if (token === "/") stack.push(Math.trunc(a / b));
    } else {
      stack.push(Number(token));
    }
  }

  return stack.pop()!;
}`,
  go: `func evalRPN(tokens []string) int {
    stack := []int{}

    for _, token := range tokens {
        if token == "+" || token == "-" || token == "*" || token == "/" {
            b := stack[len(stack)-1]
            stack = stack[:len(stack)-1]

            a := stack[len(stack)-1]
            stack = stack[:len(stack)-1]

            if token == "+" {
                stack = append(stack, a+b)
            } else if token == "-" {
                stack = append(stack, a-b)
            } else if token == "*" {
                stack = append(stack, a*b)
            } else {
                stack = append(stack, a/b)
            }
        } else {
            num, _ := strconv.Atoi(token)
            stack = append(stack, num)
        }
    }

    return stack[len(stack)-1]
}`,
  csharp: `public class Solution {
    public int EvalRPN(string[] tokens) {
        Stack<int> stack = new Stack<int>();

        foreach (string token in tokens) {
            if (token == "+" || token == "-" || token == "*" || token == "/") {
                int b = stack.Pop();
                int a = stack.Pop();

                if (token == "+") stack.Push(a + b);
                else if (token == "-") stack.Push(a - b);
                else if (token == "*") stack.Push(a * b);
                else stack.Push(a / b);
            } else {
                stack.Push(int.Parse(token));
            }
        }

        return stack.Pop();
    }
}`,
  rust: `impl Solution {
    pub fn eval_rpn(tokens: Vec<String>) -> i32 {
        let mut stack: Vec<i32> = Vec::new();

        for token in tokens {
            match token.as_str() {
                "+" | "-" | "*" | "/" => {
                    let b = stack.pop().unwrap();
                    let a = stack.pop().unwrap();

                    let value = match token.as_str() {
                        "+" => a + b,
                        "-" => a - b,
                        "*" => a * b,
                        "/" => a / b,
                        _ => 0,
                    };

                    stack.push(value);
                }
                _ => stack.push(token.parse::<i32>().unwrap()),
            }
        }

        stack.pop().unwrap()
    }
}`,
};

const TEST_CASES: TestCase[] = [
  {
    id: 1,
    tokens: ["2", "1", "+", "3", "*"],
    expected: 9,
  },
  {
    id: 2,
    tokens: ["4", "13", "5", "/", "+"],
    expected: 6,
  },
  {
    id: 3,
    tokens: ["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"],
    expected: 22,
  },
];

function getLanguageLabel(language: LanguageKey) {
  return LANGUAGES.find((item) => item.key === language)?.label ?? language;
}

function executeJavaScriptEvalRPN(code: string, test: TestCase) {
  try {
    const userFunction = new Function(`
      "use strict";
      ${code}
      return evalRPN;
    `)() as (tokens: string[]) => number;

    if (typeof userFunction !== "function") {
      return {
        pass: false,
        actual: null as number | null,
        error: "evalRPN function was not found. Keep the function named evalRPN.",
      };
    }

    const actual = userFunction([...test.tokens]);

    if (typeof actual !== "number" || Number.isNaN(actual)) {
      return {
        pass: false,
        actual: null as number | null,
        error: "Your function must return a valid number.",
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
      actual: null as number | null,
      error: error instanceof Error ? error.message : "Unknown runtime error.",
    };
  }
}

export default function EvaluateReversePolishNotationPracticePage() {
  const [language, setLanguage] = useState<LanguageKey>("javascript");
  const [editorCode, setEditorCode] = useState<Record<LanguageKey, string>>(STARTER_CODE);
  const [showSolution, setShowSolution] = useState(false);
  const [selectedCaseId, setSelectedCaseId] = useState(1);
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
          "Only JavaScript runs inside this frontend page.",
          "Switch to JAVASCRIPT for executable tests.",
        ].join("\n")
      );

      setResultText(`${label} is editable preview only.`);
      return;
    }

    const result = executeJavaScriptEvalRPN(editorCode.javascript, selectedCase);

    setConsoleOutput(
      [
        "$ run.sample",
        `case: ${selectedCase.id}`,
        `tokens: ${JSON.stringify(selectedCase.tokens)}`,
        `expected: ${selectedCase.expected}`,
        `got: ${result.error ? "runtime error" : result.actual}`,
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
          "Only JavaScript runs inside this frontend page.",
          "Switch to JAVASCRIPT for executable tests.",
        ].join("\n")
      );

      setResultText(`${label} is editable preview only.`);
      return;
    }

    const lines = ["$ submit"];
    let passed = 0;

    for (const test of TEST_CASES) {
      const result = executeJavaScriptEvalRPN(editorCode.javascript, test);

      if (result.pass) {
        passed++;
        lines.push(`case ${test.id}: PASS`);
      } else {
        lines.push(`case ${test.id}: FAIL`);
        lines.push(`  tokens: ${JSON.stringify(test.tokens)}`);
        lines.push(`  expected: ${test.expected}`);
        lines.push(`  got: ${result.error ? "runtime error" : result.actual}`);
        if (result.error) {
          lines.push(`  error: ${result.error}`);
        }
      }
    }

    lines.push("");
    lines.push(`passed: ${passed}/${TEST_CASES.length}`);

    setConsoleOutput(lines.join("\n"));

    setResultText(
      passed === TEST_CASES.length
        ? "Accepted. All test cases passed."
        : `Wrong Answer. ${passed}/${TEST_CASES.length} cases passed.`
    );
  }

  function loadSolution() {
    setEditorCode((previous) => ({
      ...previous,
      [language]: SOLUTION_CODE[language],
    }));

    setConsoleOutput(`$ loaded ${getLanguageLabel(language)} solution`);

    setResultText(
      language === "javascript"
        ? "Loaded runnable JavaScript solution."
        : "Loaded preview solution."
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-[1740px] px-4 py-4">
        <div className="mb-4 flex h-14 items-center justify-between border border-border bg-black/30 px-5">
          <Link href="/" className="text-[10px] font-bold tracking-[0.35em] text-primary">
            DSA.ENGINE
          </Link>

          <div className="flex items-center gap-5 text-[10px] font-bold tracking-[0.3em] text-muted-foreground">
            <Link className="hover:text-primary" href="/visualize/stack-queue">
              VISUALIZER
            </Link>
            <Link className="hover:text-primary" href="/learn/stack-queue#practice">
              BACK TO LESSON
            </Link>
          </div>
        </div>

        <div className="grid h-[calc(100vh-96px)] min-h-[760px] gap-4 xl:grid-cols-[0.78fr_1.22fr]">
          <section className="flex min-h-0 flex-col overflow-hidden border border-border bg-black/20">
            <div className="border-b border-border bg-black/20 px-5 py-4">
              <div className="mb-3 flex gap-2">
                <span className="border border-primary px-3 py-1 text-[10px] font-bold tracking-[0.25em] text-primary">
                  MEDIUM
                </span>
                <span className="border border-border px-3 py-1 text-[10px] font-bold tracking-[0.25em] text-muted-foreground">
                  STACK
                </span>
                <span className="border border-border px-3 py-1 text-[10px] font-bold tracking-[0.25em] text-muted-foreground">
                  ARRAY
                </span>
              </div>

              <div className="mb-3 flex items-center gap-3">
                <span className="text-5xl font-bold leading-none text-primary">$</span>
                <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                  Evaluate Reverse Polish Notation
                </h1>
              </div>

              <p className="max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
                Evaluate an arithmetic expression written in Reverse Polish Notation using a stack.
              </p>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              <div className="mb-4 text-[10px] font-bold tracking-[0.35em] text-muted-foreground">
                DESCRIPTION
              </div>

              <div className="space-y-5 text-sm leading-7 text-muted-foreground">
                <div className="terminal-frame p-4">
                  <p>
                    Given an array of tokens, evaluate the expression and return an integer result.
                  </p>
                  <p className="mt-2">
                    Valid operators are <span className="text-foreground">+</span>,{" "}
                    <span className="text-foreground">-</span>,{" "}
                    <span className="text-foreground">*</span>, and{" "}
                    <span className="text-foreground">/</span>.
                  </p>
                  <p className="mt-2">
                    Division between two integers truncates toward zero.
                  </p>
                </div>

                <div>
                  <div className="mb-3 text-[10px] font-bold tracking-[0.35em] text-muted-foreground">
                    EXAMPLES
                  </div>

                  <div className="terminal-frame p-4">
                    <h2 className="mb-3 text-xl font-bold text-foreground">Example 1</h2>
                    <pre className="overflow-x-auto whitespace-pre-wrap text-xs leading-6 md:text-sm">
{`Input: tokens = ["2","1","+","3","*"]
Output: 9
Explanation: ((2 + 1) * 3) = 9`}
                    </pre>
                  </div>

                  <div className="terminal-frame mt-3 p-4">
                    <h2 className="mb-3 text-xl font-bold text-foreground">Example 2</h2>
                    <pre className="overflow-x-auto whitespace-pre-wrap text-xs leading-6 md:text-sm">
{`Input: tokens = ["4","13","5","/","+"]
Output: 6
Explanation: 4 + (13 / 5) = 6`}
                    </pre>
                  </div>
                </div>

                <div className="terminal-frame p-4">
                  <h2 className="mb-3 text-xl font-bold text-foreground">Constraints</h2>
                  <ul className="list-disc space-y-2 pl-5">
                    <li>1 ≤ tokens.length ≤ 10^4</li>
                    <li>tokens[i] is an operator or an integer</li>
                    <li>The input always represents a valid expression</li>
                    <li>Use stack evaluation from left to right</li>
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
                        <p className="mb-1 text-foreground">tokens:</p>
                        <p className="break-all">{JSON.stringify(test.tokens)}</p>
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
                  JavaScript runs real local tests. Other languages are editable previews until a backend compiler is added.
                </div>
              </aside>
            </div>

            <div className="grid h-[210px] flex-none xl:grid-cols-2">
              <div className="border-r border-border px-4 py-4">
                <div className="mb-3 text-[10px] font-bold tracking-[0.35em] text-muted-foreground">
                  CONSOLE
                </div>

                <div className="terminal-frame h-[150px] overflow-auto p-3">
                  <pre className="whitespace-pre-wrap break-words text-xs leading-6">
                    {consoleOutput}
                  </pre>
                </div>
              </div>

              <div className="px-4 py-4">
                <div className="mb-3 text-[10px] font-bold tracking-[0.35em] text-muted-foreground">
                  RESULT
                </div>

                <div className="terminal-frame h-[150px] overflow-auto p-3 text-xs leading-6 text-muted-foreground">
                  <p>{resultText}</p>
                  <p className="mt-3">Expected approach: stack-based expression evaluation</p>
                  <p>Time: O(n)</p>
                  <p>Space: O(n)</p>
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
