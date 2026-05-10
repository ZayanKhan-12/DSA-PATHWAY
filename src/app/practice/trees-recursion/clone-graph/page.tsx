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

type GraphNode = {
  val: number;
  neighbors: GraphNode[];
};

type TestCase = {
  id: number;
  adjList: number[][];
  expected: number[][];
};

class GraphNodeClass {
  val: number;
  neighbors: GraphNodeClass[];

  constructor(val = 0, neighbors: GraphNodeClass[] = []) {
    this.val = val;
    this.neighbors = neighbors;
  }
}

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
  javascript: `function cloneGraph(node) {
  // write your answer here
  throw new Error("Implement cloneGraph first");
}`,
  python: `class Solution:
    def cloneGraph(self, node: Optional["Node"]) -> Optional["Node"]:
        # write your answer here
        return None`,
  java: `class Solution {
    public Node cloneGraph(Node node) {
        // write your answer here
        return null;
    }
}`,
  cpp: `class Solution {
public:
    Node* cloneGraph(Node* node) {
        // write your answer here
        return nullptr;
    }
};`,
  typescript: `function cloneGraph(node: Node | null): Node | null {
  // write your answer here
  return null;
}`,
  go: `func cloneGraph(node *Node) *Node {
    // write your answer here
    return nil
}`,
  csharp: `public class Solution {
    public Node CloneGraph(Node node) {
        // write your answer here
        return null;
    }
}`,
  rust: `impl Solution {
    pub fn clone_graph(node: Option<Rc<RefCell<Node>>>) -> Option<Rc<RefCell<Node>>> {
        // write your answer here
        None
    }
}`,
};

const SOLUTION_CODE: Record<LanguageKey, string> = {
  javascript: `function cloneGraph(node) {
  if (node === null) {
    return null;
  }

  const oldToNew = new Map();

  function dfs(current) {
    if (oldToNew.has(current)) {
      return oldToNew.get(current);
    }

    const copy = new Node(current.val);
    oldToNew.set(current, copy);

    for (const neighbor of current.neighbors) {
      copy.neighbors.push(dfs(neighbor));
    }

    return copy;
  }

  return dfs(node);
}`,
  python: `class Solution:
    def cloneGraph(self, node: Optional["Node"]) -> Optional["Node"]:
        if not node:
            return None

        old_to_new = {}

        def dfs(current):
            if current in old_to_new:
                return old_to_new[current]

            copy = Node(current.val)
            old_to_new[current] = copy

            for neighbor in current.neighbors:
                copy.neighbors.append(dfs(neighbor))

            return copy

        return dfs(node)`,
  java: `class Solution {
    private Map<Node, Node> oldToNew = new HashMap<>();

    public Node cloneGraph(Node node) {
        if (node == null) {
            return null;
        }

        if (oldToNew.containsKey(node)) {
            return oldToNew.get(node);
        }

        Node copy = new Node(node.val);
        oldToNew.put(node, copy);

        for (Node neighbor : node.neighbors) {
            copy.neighbors.add(cloneGraph(neighbor));
        }

        return copy;
    }
}`,
  cpp: `class Solution {
public:
    unordered_map<Node*, Node*> oldToNew;

    Node* cloneGraph(Node* node) {
        if (node == nullptr) {
            return nullptr;
        }

        if (oldToNew.count(node)) {
            return oldToNew[node];
        }

        Node* copy = new Node(node->val);
        oldToNew[node] = copy;

        for (Node* neighbor : node->neighbors) {
            copy->neighbors.push_back(cloneGraph(neighbor));
        }

        return copy;
    }
};`,
  typescript: `function cloneGraph(node: Node | null): Node | null {
  if (node === null) {
    return null;
  }

  const oldToNew = new Map<Node, Node>();

  function dfs(current: Node): Node {
    if (oldToNew.has(current)) {
      return oldToNew.get(current)!;
    }

    const copy = new Node(current.val);
    oldToNew.set(current, copy);

    for (const neighbor of current.neighbors) {
      copy.neighbors.push(dfs(neighbor));
    }

    return copy;
  }

  return dfs(node);
}`,
  go: `func cloneGraph(node *Node) *Node {
    if node == nil {
        return nil
    }

    oldToNew := map[*Node]*Node{}

    var dfs func(*Node) *Node
    dfs = func(current *Node) *Node {
        if copy, exists := oldToNew[current]; exists {
            return copy
        }

        copy := &Node{Val: current.Val}
        oldToNew[current] = copy

        for _, neighbor := range current.Neighbors {
            copy.Neighbors = append(copy.Neighbors, dfs(neighbor))
        }

        return copy
    }

    return dfs(node)
}`,
  csharp: `public class Solution {
    private Dictionary<Node, Node> oldToNew = new Dictionary<Node, Node>();

    public Node CloneGraph(Node node) {
        if (node == null) {
            return null;
        }

        if (oldToNew.ContainsKey(node)) {
            return oldToNew[node];
        }

        Node copy = new Node(node.val);
        oldToNew[node] = copy;

        foreach (Node neighbor in node.neighbors) {
            copy.neighbors.Add(CloneGraph(neighbor));
        }

        return copy;
    }
}`,
  rust: `use std::cell::RefCell;
use std::collections::HashMap;
use std::rc::Rc;

impl Solution {
    pub fn clone_graph(node: Option<Rc<RefCell<Node>>>) -> Option<Rc<RefCell<Node>>> {
        fn dfs(
            node: Rc<RefCell<Node>>,
            old_to_new: &mut HashMap<i32, Rc<RefCell<Node>>>,
        ) -> Rc<RefCell<Node>> {
            let value = node.borrow().val;

            if let Some(copy) = old_to_new.get(&value) {
                return Rc::clone(copy);
            }

            let copy = Rc::new(RefCell::new(Node {
                val: value,
                neighbors: vec![],
            }));

            old_to_new.insert(value, Rc::clone(&copy));

            for neighbor in node.borrow().neighbors.iter() {
                let cloned_neighbor = dfs(Rc::clone(neighbor), old_to_new);
                copy.borrow_mut().neighbors.push(cloned_neighbor);
            }

            copy
        }

        match node {
            Some(node) => Some(dfs(node, &mut HashMap::new())),
            None => None,
        }
    }
}`,
};

const TEST_CASES: TestCase[] = [
  {
    id: 1,
    adjList: [
      [2, 4],
      [1, 3],
      [2, 4],
      [1, 3],
    ],
    expected: [
      [2, 4],
      [1, 3],
      [2, 4],
      [1, 3],
    ],
  },
  {
    id: 2,
    adjList: [[]],
    expected: [[]],
  },
  {
    id: 3,
    adjList: [],
    expected: [],
  },
  {
    id: 4,
    adjList: [[2], [1]],
    expected: [[2], [1]],
  },
  {
    id: 5,
    adjList: [
      [2, 3],
      [1, 3],
      [1, 2],
    ],
    expected: [
      [2, 3],
      [1, 3],
      [1, 2],
    ],
  },
];

function getLanguageLabel(language: LanguageKey) {
  return LANGUAGES.find((item) => item.key === language)?.label ?? language;
}

function buildGraph(adjList: number[][]): GraphNodeClass | null {
  if (adjList.length === 0) {
    return null;
  }

  const nodes = adjList.map((_, index) => new GraphNodeClass(index + 1));

  for (let index = 0; index < adjList.length; index++) {
    nodes[index].neighbors = adjList[index]
      .map((neighborValue) => nodes[neighborValue - 1])
      .filter((node): node is GraphNodeClass => Boolean(node));
  }

  return nodes[0];
}

function serializeGraph(node: GraphNode | null): number[][] {
  if (node === null) {
    return [];
  }

  const visited = new Map<number, GraphNode>();
  const queue: GraphNode[] = [node];

  while (queue.length > 0) {
    const current = queue.shift()!;

    if (visited.has(current.val)) {
      continue;
    }

    visited.set(current.val, current);

    for (const neighbor of current.neighbors) {
      if (!visited.has(neighbor.val)) {
        queue.push(neighbor);
      }
    }
  }

  const maxValue = Math.max(...Array.from(visited.keys()));
  const result: number[][] = [];

  for (let value = 1; value <= maxValue; value++) {
    const current = visited.get(value);
    result.push(current ? current.neighbors.map((neighbor) => neighbor.val) : []);
  }

  return result;
}

function collectNodeRefs(node: GraphNode | null): Set<GraphNode> {
  const seen = new Set<GraphNode>();
  const stack: GraphNode[] = node ? [node] : [];

  while (stack.length > 0) {
    const current = stack.pop();

    if (!current || seen.has(current)) {
      continue;
    }

    seen.add(current);

    for (const neighbor of current.neighbors) {
      stack.push(neighbor);
    }
  }

  return seen;
}

function arraysEqual(a: number[][], b: number[][]) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function executeJavaScript(code: string, test: TestCase) {
  try {
    const cloneGraph = new Function(
      "Node",
      `
        "use strict";
        ${code}
        return cloneGraph;
      `
    )(GraphNodeClass) as (node: GraphNode | null) => GraphNode | null;

    if (typeof cloneGraph !== "function") {
      return {
        pass: false,
        actual: [] as number[][],
        error: "cloneGraph function was not found. Keep the function named cloneGraph.",
      };
    }

    const original = buildGraph(test.adjList);
    const cloned = cloneGraph(original);
    const actual = serializeGraph(cloned);

    if (!arraysEqual(actual, test.expected)) {
      return {
        pass: false,
        actual,
        error: "",
      };
    }

    if (original !== null && cloned === original) {
      return {
        pass: false,
        actual,
        error: "Returned the original graph instead of a deep clone.",
      };
    }

    const originalRefs = collectNodeRefs(original);
    const clonedRefs = collectNodeRefs(cloned);

    for (const clonedRef of clonedRefs) {
      if (originalRefs.has(clonedRef)) {
        return {
          pass: false,
          actual,
          error: "Clone graph reused original node references.",
        };
      }
    }

    return {
      pass: true,
      actual,
      error: "",
    };
  } catch (error) {
    return {
      pass: false,
      actual: [] as number[][],
      error: error instanceof Error ? error.message : "Unknown runtime error.",
    };
  }
}

export default function CloneGraphPracticePage() {
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
        `adjList: ${JSON.stringify(selectedCase.adjList)}`,
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
        lines.push(`  adjList: ${JSON.stringify(test.adjList)}`);
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
        : passed === 0
          ? "Not accepted yet. Implement cloneGraph, then run again."
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
            <Link className="hover:text-primary" href="/learn/dfs">
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
                  DFS
                </span>
                <span className="border border-border px-3 py-1 text-[10px] font-bold tracking-[0.25em] text-muted-foreground">
                  GRAPH
                </span>
              </div>

              <div className="mb-3 flex items-center gap-3">
                <span className="text-5xl font-bold leading-none text-primary">$</span>
                <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                  Clone Graph
                </h1>
              </div>

              <p className="max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
                DFS over graph structure while building deep copies of every node.
              </p>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              <div className="mb-4 text-[10px] font-bold tracking-[0.35em] text-muted-foreground">
                DESCRIPTION
              </div>

              <div className="space-y-5 text-sm leading-7 text-muted-foreground">
                <div className="terminal-frame p-4">
                  <p>
                    Given a reference to a node in a connected undirected graph, return a deep copy of the graph.
                  </p>
                  <p className="mt-2">
                    Each node has a <span className="text-foreground">val</span> and a list of{" "}
                    <span className="text-foreground">neighbors</span>.
                  </p>
                  <p className="mt-2">
                    Use a map from original node to copied node so cycles do not cause infinite recursion.
                  </p>
                </div>

                <div className="terminal-frame p-4">
                  <h2 className="mb-3 text-xl font-bold text-foreground">Example</h2>
                  <pre className="overflow-x-auto whitespace-pre-wrap text-xs leading-6 md:text-sm">
{`Input: adjList = [[2,4],[1,3],[2,4],[1,3]]
Output: [[2,4],[1,3],[2,4],[1,3]]

The output graph must be structurally equal,
but every node must be a new copied object.`}
                  </pre>
                </div>

                <div className="terminal-frame p-4">
                  <h2 className="mb-3 text-xl font-bold text-foreground">DFS Clone Pattern</h2>
                  <ul className="list-disc space-y-2 pl-5">
                    <li>If node is null, return null</li>
                    <li>If node was already copied, return its copy</li>
                    <li>Create a new node with the same value</li>
                    <li>DFS clone each neighbor and attach it to the copy</li>
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
                        <p className="text-foreground">adjList:</p>
                        <p className="break-all">{JSON.stringify(test.adjList)}</p>
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
                  <p className="mt-3">Expected approach: DFS + hash map</p>
                  <p>Time: O(V + E)</p>
                  <p>Space: O(V)</p>
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
