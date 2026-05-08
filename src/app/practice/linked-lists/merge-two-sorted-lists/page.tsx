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

type ListNode = {
  val: number;
  next: ListNode | null;
};

type TestCase = {
  id: number;
  list1: number[];
  list2: number[];
  expected: number[];
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
  javascript: `function mergeTwoLists(list1, list2) {
  // write your answer here
  return list1;
}`,
  python: `class Solution:
    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
        # write your answer here
        return list1`,
  java: `class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        // write your answer here
        return list1;
    }
}`,
  cpp: `class Solution {
public:
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        // write your answer here
        return list1;
    }
};`,
  typescript: `function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
  // write your answer here
  return list1;
}`,
  go: `func mergeTwoLists(list1 *ListNode, list2 *ListNode) *ListNode {
    // write your answer here
    return list1
}`,
  csharp: `public class Solution {
    public ListNode MergeTwoLists(ListNode list1, ListNode list2) {
        // write your answer here
        return list1;
    }
}`,
  rust: `impl Solution {
    pub fn merge_two_lists(
        list1: Option<Box<ListNode>>,
        list2: Option<Box<ListNode>>
    ) -> Option<Box<ListNode>> {
        // write your answer here
        list1
    }
}`,
};

const SOLUTION_CODE: Record<LanguageKey, string> = {
  javascript: `function mergeTwoLists(list1, list2) {
  const dummy = { val: 0, next: null };
  let tail = dummy;

  while (list1 !== null && list2 !== null) {
    if (list1.val <= list2.val) {
      tail.next = list1;
      list1 = list1.next;
    } else {
      tail.next = list2;
      list2 = list2.next;
    }

    tail = tail.next;
  }

  tail.next = list1 !== null ? list1 : list2;

  return dummy.next;
}`,
  python: `class Solution:
    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
        dummy = ListNode(0)
        tail = dummy

        while list1 and list2:
            if list1.val <= list2.val:
                tail.next = list1
                list1 = list1.next
            else:
                tail.next = list2
                list2 = list2.next

            tail = tail.next

        tail.next = list1 if list1 else list2

        return dummy.next`,
  java: `class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;

        while (list1 != null && list2 != null) {
            if (list1.val <= list2.val) {
                tail.next = list1;
                list1 = list1.next;
            } else {
                tail.next = list2;
                list2 = list2.next;
            }

            tail = tail.next;
        }

        tail.next = list1 != null ? list1 : list2;

        return dummy.next;
    }
}`,
  cpp: `class Solution {
public:
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        ListNode dummy(0);
        ListNode* tail = &dummy;

        while (list1 != nullptr && list2 != nullptr) {
            if (list1->val <= list2->val) {
                tail->next = list1;
                list1 = list1->next;
            } else {
                tail->next = list2;
                list2 = list2->next;
            }

            tail = tail->next;
        }

        tail->next = list1 != nullptr ? list1 : list2;

        return dummy.next;
    }
};`,
  typescript: `function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
  const dummy: ListNode = { val: 0, next: null };
  let tail = dummy;

  while (list1 !== null && list2 !== null) {
    if (list1.val <= list2.val) {
      tail.next = list1;
      list1 = list1.next;
    } else {
      tail.next = list2;
      list2 = list2.next;
    }

    tail = tail.next;
  }

  tail.next = list1 !== null ? list1 : list2;

  return dummy.next;
}`,
  go: `func mergeTwoLists(list1 *ListNode, list2 *ListNode) *ListNode {
    dummy := &ListNode{}
    tail := dummy

    for list1 != nil && list2 != nil {
        if list1.Val <= list2.Val {
            tail.Next = list1
            list1 = list1.Next
        } else {
            tail.Next = list2
            list2 = list2.Next
        }

        tail = tail.Next
    }

    if list1 != nil {
        tail.Next = list1
    } else {
        tail.Next = list2
    }

    return dummy.Next
}`,
  csharp: `public class Solution {
    public ListNode MergeTwoLists(ListNode list1, ListNode list2) {
        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;

        while (list1 != null && list2 != null) {
            if (list1.val <= list2.val) {
                tail.next = list1;
                list1 = list1.next;
            } else {
                tail.next = list2;
                list2 = list2.next;
            }

            tail = tail.next;
        }

        tail.next = list1 != null ? list1 : list2;

        return dummy.next;
    }
}`,
  rust: `impl Solution {
    pub fn merge_two_lists(
        list1: Option<Box<ListNode>>,
        list2: Option<Box<ListNode>>
    ) -> Option<Box<ListNode>> {
        match (list1, list2) {
            (None, list) => list,
            (list, None) => list,
            (Some(mut a), Some(mut b)) => {
                if a.val <= b.val {
                    let next = a.next.take();
                    a.next = Self::merge_two_lists(next, Some(b));
                    Some(a)
                } else {
                    let next = b.next.take();
                    b.next = Self::merge_two_lists(Some(a), next);
                    Some(b)
                }
            }
        }
    }
}`,
};

const TEST_CASES: TestCase[] = [
  { id: 1, list1: [1, 2, 4], list2: [1, 3, 4], expected: [1, 1, 2, 3, 4, 4] },
  { id: 2, list1: [], list2: [], expected: [] },
  { id: 3, list1: [], list2: [0], expected: [0] },
  { id: 4, list1: [-10, -5, 0], list2: [-6, -3, 2], expected: [-10, -6, -5, -3, 0, 2] },
];

function getLanguageLabel(language: LanguageKey) {
  return LANGUAGES.find((item) => item.key === language)?.label ?? language;
}

function buildLinkedList(values: number[]): ListNode | null {
  const dummy: ListNode = { val: 0, next: null };
  let tail = dummy;

  for (const value of values) {
    tail.next = { val: value, next: null };
    tail = tail.next;
  }

  return dummy.next;
}

function linkedListToArray(head: ListNode | null): number[] {
  const result: number[] = [];
  let current = head;
  let guard = 0;

  while (current !== null && guard < 10000) {
    result.push(current.val);
    current = current.next;
    guard++;
  }

  return result;
}

function arraysEqual(a: number[], b: number[]) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function executeJavaScript(code: string, test: TestCase) {
  try {
    const mergeTwoLists = new Function(`
      "use strict";
      ${code}
      return mergeTwoLists;
    `)() as (list1: ListNode | null, list2: ListNode | null) => ListNode | null;

    if (typeof mergeTwoLists !== "function") {
      return {
        pass: false,
        actual: [] as number[],
        error: "mergeTwoLists function was not found. Keep the function named mergeTwoLists.",
      };
    }

    const list1 = buildLinkedList(test.list1);
    const list2 = buildLinkedList(test.list2);
    const mergedHead = mergeTwoLists(list1, list2);
    const actual = linkedListToArray(mergedHead);

    return {
      pass: arraysEqual(actual, test.expected),
      actual,
      error: "",
    };
  } catch (error) {
    return {
      pass: false,
      actual: [] as number[],
      error: error instanceof Error ? error.message : "Unknown runtime error.",
    };
  }
}

export default function MergeTwoSortedListsPracticePage() {
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
        `list1: ${JSON.stringify(selectedCase.list1)}`,
        `list2: ${JSON.stringify(selectedCase.list2)}`,
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
        lines.push(`  list1: ${JSON.stringify(test.list1)}`);
        lines.push(`  list2: ${JSON.stringify(test.list2)}`);
        lines.push(`  expected: ${JSON.stringify(test.expected)}`);
        lines.push(`  got: ${result.error ? "runtime error" : JSON.stringify(result.actual)}`);
        if (result.error) lines.push(`  error: ${result.error}`);
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
            <Link className="hover:text-primary" href="/visualize/linked-lists">
              VISUALIZER
            </Link>
            <Link className="hover:text-primary" href="/learn/linked-lists">
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
                  LINKED LIST
                </span>
                <span className="border border-border px-3 py-1 text-[10px] font-bold tracking-[0.25em] text-muted-foreground">
                  TWO POINTERS
                </span>
              </div>

              <div className="mb-3 flex items-center gap-3">
                <span className="text-5xl font-bold leading-none text-primary">$</span>
                <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                  Merge Two Sorted Lists
                </h1>
              </div>

              <p className="max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
                Merge two sorted linked lists into one sorted linked list by pointer stitching.
              </p>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              <div className="mb-4 text-[10px] font-bold tracking-[0.35em] text-muted-foreground">
                DESCRIPTION
              </div>

              <div className="space-y-5 text-sm leading-7 text-muted-foreground">
                <div className="terminal-frame p-4">
                  <p>
                    Given two sorted linked lists, merge them into one sorted list and return its head.
                  </p>
                  <p className="mt-2">
                    Use a <span className="text-foreground">dummy node</span> and a{" "}
                    <span className="text-foreground">tail pointer</span> to stitch nodes in sorted order.
                  </p>
                </div>

                <div className="terminal-frame p-4">
                  <h2 className="mb-3 text-xl font-bold text-foreground">Example 1</h2>
                  <pre className="overflow-x-auto whitespace-pre-wrap text-xs leading-6 md:text-sm">
{`Input: list1 = [1,2,4], list2 = [1,3,4]
Output: [1,1,2,3,4,4]`}
                  </pre>
                </div>

                <div className="terminal-frame p-4">
                  <h2 className="mb-3 text-xl font-bold text-foreground">Constraints</h2>
                  <ul className="list-disc space-y-2 pl-5">
                    <li>The number of nodes in both lists is between 0 and 50</li>
                    <li>-100 ≤ Node.val ≤ 100</li>
                    <li>Both lists are sorted in non-decreasing order</li>
                    <li>Expected time: O(n + m)</li>
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
                        <p className="text-foreground">list1:</p>
                        <p className="break-all">{JSON.stringify(test.list1)}</p>
                        <p className="mt-2 text-foreground">list2:</p>
                        <p className="break-all">{JSON.stringify(test.list2)}</p>
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
                  <p className="mt-3">Expected approach: dummy node + tail pointer</p>
                  <p>Time: O(n + m)</p>
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
