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
  commands: string[];
  values: number[][];
  expected: (number | boolean | null)[];
};

type MyQueueInstance = {
  push: (x: number) => void;
  pop: () => number;
  peek: () => number;
  empty: () => boolean;
};

type MyQueueConstructor = new () => MyQueueInstance;

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
  javascript: `class MyQueue {
  constructor() {
    // write your answer here
  }

  push(x) {

  }

  pop() {
    return 0;
  }

  peek() {
    return 0;
  }

  empty() {
    return true;
  }
}`,
  python: `class MyQueue:

    def __init__(self):
        # write your answer here
        pass

    def push(self, x: int) -> None:
        pass

    def pop(self) -> int:
        return 0

    def peek(self) -> int:
        return 0

    def empty(self) -> bool:
        return True`,
  java: `class MyQueue {

    public MyQueue() {
        // write your answer here
    }

    public void push(int x) {

    }

    public int pop() {
        return 0;
    }

    public int peek() {
        return 0;
    }

    public boolean empty() {
        return true;
    }
}`,
  cpp: `class MyQueue {
public:
    MyQueue() {
        // write your answer here
    }

    void push(int x) {

    }

    int pop() {
        return 0;
    }

    int peek() {
        return 0;
    }

    bool empty() {
        return true;
    }
};`,
  typescript: `class MyQueue {
  constructor() {
    // write your answer here
  }

  push(x: number): void {

  }

  pop(): number {
    return 0;
  }

  peek(): number {
    return 0;
  }

  empty(): boolean {
    return true;
  }
}`,
  go: `type MyQueue struct {
    // write your answer here
}

func Constructor() MyQueue {
    return MyQueue{}
}

func (this *MyQueue) Push(x int) {

}

func (this *MyQueue) Pop() int {
    return 0
}

func (this *MyQueue) Peek() int {
    return 0
}

func (this *MyQueue) Empty() bool {
    return true
}`,
  csharp: `public class MyQueue {

    public MyQueue() {
        // write your answer here
    }

    public void Push(int x) {

    }

    public int Pop() {
        return 0;
    }

    public int Peek() {
        return 0;
    }

    public bool Empty() {
        return true;
    }
}`,
  rust: `struct MyQueue {
    // write your answer here
}

impl MyQueue {
    fn new() -> Self {
        Self {}
    }

    fn push(&mut self, x: i32) {

    }

    fn pop(&mut self) -> i32 {
        0
    }

    fn peek(&self) -> i32 {
        0
    }

    fn empty(&self) -> bool {
        true
    }
}`,
};

const SOLUTION_CODE: Record<LanguageKey, string> = {
  javascript: `class MyQueue {
  constructor() {
    this.input = [];
    this.output = [];
  }

  push(x) {
    this.input.push(x);
  }

  moveInputToOutput() {
    if (this.output.length === 0) {
      while (this.input.length > 0) {
        this.output.push(this.input.pop());
      }
    }
  }

  pop() {
    this.moveInputToOutput();
    return this.output.pop();
  }

  peek() {
    this.moveInputToOutput();
    return this.output[this.output.length - 1];
  }

  empty() {
    return this.input.length === 0 && this.output.length === 0;
  }
}`,
  python: `class MyQueue:

    def __init__(self):
        self.input = []
        self.output = []

    def push(self, x: int) -> None:
        self.input.append(x)

    def move_input_to_output(self) -> None:
        if not self.output:
            while self.input:
                self.output.append(self.input.pop())

    def pop(self) -> int:
        self.move_input_to_output()
        return self.output.pop()

    def peek(self) -> int:
        self.move_input_to_output()
        return self.output[-1]

    def empty(self) -> bool:
        return not self.input and not self.output`,
  java: `class MyQueue {
    private Stack<Integer> input;
    private Stack<Integer> output;

    public MyQueue() {
        input = new Stack<>();
        output = new Stack<>();
    }

    public void push(int x) {
        input.push(x);
    }

    private void moveInputToOutput() {
        if (output.isEmpty()) {
            while (!input.isEmpty()) {
                output.push(input.pop());
            }
        }
    }

    public int pop() {
        moveInputToOutput();
        return output.pop();
    }

    public int peek() {
        moveInputToOutput();
        return output.peek();
    }

    public boolean empty() {
        return input.isEmpty() && output.isEmpty();
    }
}`,
  cpp: `class MyQueue {
public:
    stack<int> input;
    stack<int> output;

    MyQueue() {}

    void push(int x) {
        input.push(x);
    }

    void moveInputToOutput() {
        if (output.empty()) {
            while (!input.empty()) {
                output.push(input.top());
                input.pop();
            }
        }
    }

    int pop() {
        moveInputToOutput();
        int value = output.top();
        output.pop();
        return value;
    }

    int peek() {
        moveInputToOutput();
        return output.top();
    }

    bool empty() {
        return input.empty() && output.empty();
    }
};`,
  typescript: `class MyQueue {
  private input: number[] = [];
  private output: number[] = [];

  push(x: number): void {
    this.input.push(x);
  }

  private moveInputToOutput(): void {
    if (this.output.length === 0) {
      while (this.input.length > 0) {
        this.output.push(this.input.pop()!);
      }
    }
  }

  pop(): number {
    this.moveInputToOutput();
    return this.output.pop()!;
  }

  peek(): number {
    this.moveInputToOutput();
    return this.output[this.output.length - 1];
  }

  empty(): boolean {
    return this.input.length === 0 && this.output.length === 0;
  }
}`,
  go: `type MyQueue struct {
    input  []int
    output []int
}

func Constructor() MyQueue {
    return MyQueue{
        input:  []int{},
        output: []int{},
    }
}

func (this *MyQueue) Push(x int) {
    this.input = append(this.input, x)
}

func (this *MyQueue) moveInputToOutput() {
    if len(this.output) == 0 {
        for len(this.input) > 0 {
            last := this.input[len(this.input)-1]
            this.input = this.input[:len(this.input)-1]
            this.output = append(this.output, last)
        }
    }
}

func (this *MyQueue) Pop() int {
    this.moveInputToOutput()
    value := this.output[len(this.output)-1]
    this.output = this.output[:len(this.output)-1]
    return value
}

func (this *MyQueue) Peek() int {
    this.moveInputToOutput()
    return this.output[len(this.output)-1]
}

func (this *MyQueue) Empty() bool {
    return len(this.input) == 0 && len(this.output) == 0
}`,
  csharp: `public class MyQueue {
    private Stack<int> input;
    private Stack<int> output;

    public MyQueue() {
        input = new Stack<int>();
        output = new Stack<int>();
    }

    public void Push(int x) {
        input.Push(x);
    }

    private void MoveInputToOutput() {
        if (output.Count == 0) {
            while (input.Count > 0) {
                output.Push(input.Pop());
            }
        }
    }

    public int Pop() {
        MoveInputToOutput();
        return output.Pop();
    }

    public int Peek() {
        MoveInputToOutput();
        return output.Peek();
    }

    public bool Empty() {
        return input.Count == 0 && output.Count == 0;
    }
}`,
  rust: `struct MyQueue {
    input: Vec<i32>,
    output: Vec<i32>,
}

impl MyQueue {
    fn new() -> Self {
        Self {
            input: Vec::new(),
            output: Vec::new(),
        }
    }

    fn push(&mut self, x: i32) {
        self.input.push(x);
    }

    fn move_input_to_output(&mut self) {
        if self.output.is_empty() {
            while let Some(value) = self.input.pop() {
                self.output.push(value);
            }
        }
    }

    fn pop(&mut self) -> i32 {
        self.move_input_to_output();
        self.output.pop().unwrap()
    }

    fn peek(&mut self) -> i32 {
        self.move_input_to_output();
        *self.output.last().unwrap()
    }

    fn empty(&self) -> bool {
        self.input.is_empty() && self.output.is_empty()
    }
}`,
};

const TEST_CASES: TestCase[] = [
  {
    id: 1,
    commands: ["MyQueue", "push", "push", "peek", "pop", "empty"],
    values: [[], [1], [2], [], [], []],
    expected: [null, null, null, 1, 1, false],
  },
  {
    id: 2,
    commands: ["MyQueue", "push", "empty", "peek", "pop", "empty"],
    values: [[], [10], [], [], [], []],
    expected: [null, null, false, 10, 10, true],
  },
  {
    id: 3,
    commands: ["MyQueue", "push", "push", "push", "pop", "peek", "pop", "empty"],
    values: [[], [1], [2], [3], [], [], [], []],
    expected: [null, null, null, null, 1, 2, 2, false],
  },
];

function getLanguageLabel(language: LanguageKey) {
  return LANGUAGES.find((item) => item.key === language)?.label ?? language;
}

function arraysEqual(a: (number | boolean | null)[], b: (number | boolean | null)[]) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function executeJavaScriptMyQueue(code: string, test: TestCase) {
  try {
    const QueueClass = new Function(`
      "use strict";
      ${code}
      return MyQueue;
    `)() as MyQueueConstructor;

    if (typeof QueueClass !== "function") {
      return {
        pass: false,
        actual: [] as (number | boolean | null)[],
        error: "MyQueue class was not found. Keep the class named MyQueue.",
      };
    }

    let queue: MyQueueInstance | null = null;
    const actual: (number | boolean | null)[] = [];

    for (let i = 0; i < test.commands.length; i++) {
      const command = test.commands[i];
      const args = test.values[i];

      if (command === "MyQueue") {
        queue = new QueueClass();
        actual.push(null);
        continue;
      }

      if (!queue) {
        throw new Error("MyQueue was not initialized.");
      }

      if (command === "push") {
        queue.push(args[0]);
        actual.push(null);
      } else if (command === "pop") {
        actual.push(queue.pop());
      } else if (command === "peek") {
        actual.push(queue.peek());
      } else if (command === "empty") {
        actual.push(queue.empty());
      }
    }

    return {
      pass: arraysEqual(actual, test.expected),
      actual,
      error: "",
    };
  } catch (error) {
    return {
      pass: false,
      actual: [] as (number | boolean | null)[],
      error: error instanceof Error ? error.message : "Unknown runtime error.",
    };
  }
}

export default function ImplementQueueUsingStacksPracticePage() {
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

    const result = executeJavaScriptMyQueue(editorCode.javascript, selectedCase);

    setConsoleOutput(
      [
        "$ run.sample",
        `case: ${selectedCase.id}`,
        `commands: ${JSON.stringify(selectedCase.commands)}`,
        `values: ${JSON.stringify(selectedCase.values)}`,
        `expected: ${JSON.stringify(selectedCase.expected)}`,
        `got: ${result.error ? "runtime error" : JSON.stringify(result.actual)}`,
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
      const result = executeJavaScriptMyQueue(editorCode.javascript, test);

      if (result.pass) {
        passed++;
        lines.push(`case ${test.id}: PASS`);
      } else {
        lines.push(`case ${test.id}: FAIL`);
        lines.push(`  commands: ${JSON.stringify(test.commands)}`);
        lines.push(`  values: ${JSON.stringify(test.values)}`);
        lines.push(`  expected: ${JSON.stringify(test.expected)}`);
        lines.push(`  got: ${result.error ? "runtime error" : JSON.stringify(result.actual)}`);
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
                  EASY
                </span>
                <span className="border border-border px-3 py-1 text-[10px] font-bold tracking-[0.25em] text-muted-foreground">
                  STACK
                </span>
                <span className="border border-border px-3 py-1 text-[10px] font-bold tracking-[0.25em] text-muted-foreground">
                  QUEUE
                </span>
              </div>

              <div className="mb-3 flex items-center gap-3">
                <span className="text-5xl font-bold leading-none text-primary">$</span>
                <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                  Implement Queue using Stacks
                </h1>
              </div>

              <p className="max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
                Implement a first-in-first-out queue using only two last-in-first-out stacks.
              </p>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              <div className="mb-4 text-[10px] font-bold tracking-[0.35em] text-muted-foreground">
                DESCRIPTION
              </div>

              <div className="space-y-5 text-sm leading-7 text-muted-foreground">
                <div className="terminal-frame p-4">
                  <p>
                    Design a queue that supports <span className="text-foreground">push</span>,{" "}
                    <span className="text-foreground">pop</span>,{" "}
                    <span className="text-foreground">peek</span>, and{" "}
                    <span className="text-foreground">empty</span>.
                  </p>
                  <p className="mt-2">
                    The main trick is using one stack for incoming values and one stack for outgoing values.
                  </p>
                  <p className="mt-2">
                    Only move values from input to output when the output stack is empty.
                  </p>
                </div>

                <div>
                  <div className="mb-3 text-[10px] font-bold tracking-[0.35em] text-muted-foreground">
                    EXAMPLES
                  </div>

                  <div className="terminal-frame p-4">
                    <h2 className="mb-3 text-xl font-bold text-foreground">Example 1</h2>
                    <pre className="overflow-x-auto whitespace-pre-wrap text-xs leading-6 md:text-sm">
{`Input:
["MyQueue","push","push","peek","pop","empty"]
[[],[1],[2],[],[],[]]

Output:
[null,null,null,1,1,false]`}
                    </pre>
                  </div>

                  <div className="terminal-frame mt-3 p-4">
                    <h2 className="mb-3 text-xl font-bold text-foreground">Explanation</h2>
                    <pre className="overflow-x-auto whitespace-pre-wrap text-xs leading-6 md:text-sm">
{`push(1) -> queue is [1]
push(2) -> queue is [1,2]
peek()  -> returns 1
pop()   -> returns 1
empty() -> returns false`}
                    </pre>
                  </div>
                </div>

                <div className="terminal-frame p-4">
                  <h2 className="mb-3 text-xl font-bold text-foreground">Constraints</h2>
                  <ul className="list-disc space-y-2 pl-5">
                    <li>1 ≤ x ≤ 9</li>
                    <li>At most 100 calls will be made</li>
                    <li>All calls to pop and peek are valid</li>
                    <li>Use stack operations to simulate queue behavior</li>
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
                        <p className="mb-1 text-foreground">commands:</p>
                        <p className="break-all">{JSON.stringify(test.commands)}</p>
                        <p className="mt-2 text-foreground">expected:</p>
                        <p className="break-all">{JSON.stringify(test.expected)}</p>
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
                  <p className="mt-3">Expected approach: two stacks</p>
                  <p>Push: O(1)</p>
                  <p>Pop / Peek: amortized O(1)</p>
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
