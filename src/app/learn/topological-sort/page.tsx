"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";

type TocItem = {
  id: string;
  num: string;
  label: string;
};

type CodeExample = {
  language: string;
  code: string;
};

const toc: TocItem[] = [
  { id: "root-problem", num: "01", label: "Root Problem" },
  { id: "core-idea", num: "02", label: "Core Idea" },
  { id: "intuition", num: "03", label: "Intuition" },
  { id: "walkthrough", num: "04", label: "Step-by-Step Example" },
  { id: "code", num: "05", label: "Code Implementation" },
  { id: "complexity", num: "06", label: "Time Complexity" },
  { id: "real-world", num: "07", label: "Real-World Uses" },
  { id: "practice", num: "08", label: "Practice Problems" },
];

const codeExamples: CodeExample[] = [
  {
    language: "TypeScript",
    code: `function topologicalSort(n: number, adj: Map<number, number[]>): number[] {
  const indegree = new Array<number>(n).fill(0);

  for (let node = 0; node < n; node++) {
    for (const neighbor of adj.get(node) ?? []) {
      indegree[neighbor]++;
    }
  }

  const queue: number[] = [];
  for (let node = 0; node < n; node++) {
    if (indegree[node] === 0) {
      queue.push(node);
    }
  }

  const order: number[] = [];
  let head = 0;

  while (head < queue.length) {
    const node = queue[head++];
    order.push(node);

    for (const neighbor of adj.get(node) ?? []) {
      indegree[neighbor]--;
      if (indegree[neighbor] === 0) {
        queue.push(neighbor);
      }
    }
  }

  return order.length === n ? order : [];
}`,
  },
  {
    language: "JavaScript",
    code: `function topologicalSort(n, adj) {
  const indegree = new Array(n).fill(0);

  for (let node = 0; node < n; node++) {
    for (const neighbor of adj.get(node) || []) {
      indegree[neighbor]++;
    }
  }

  const queue = [];
  for (let node = 0; node < n; node++) {
    if (indegree[node] === 0) {
      queue.push(node);
    }
  }

  const order = [];
  let head = 0;

  while (head < queue.length) {
    const node = queue[head++];
    order.push(node);

    for (const neighbor of adj.get(node) || []) {
      indegree[neighbor]--;
      if (indegree[neighbor] === 0) {
        queue.push(neighbor);
      }
    }
  }

  return order.length === n ? order : [];
}`,
  },
  {
    language: "Python",
    code: `from collections import deque

def topological_sort(n, adj):
    indegree = [0] * n

    for node in range(n):
        for neighbor in adj.get(node, []):
            indegree[neighbor] += 1

    queue = deque()
    for node in range(n):
        if indegree[node] == 0:
            queue.append(node)

    order = []

    while queue:
        node = queue.popleft()
        order.append(node)

        for neighbor in adj.get(node, []):
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                queue.append(neighbor)

    return order if len(order) == n else []`,
  },
  {
    language: "Java",
    code: `import java.util.*;

public class TopologicalSort {
    public static List<Integer> topologicalSort(int n, Map<Integer, List<Integer>> adj) {
        int[] indegree = new int[n];

        for (int node = 0; node < n; node++) {
            for (int neighbor : adj.getOrDefault(node, Collections.emptyList())) {
                indegree[neighbor]++;
            }
        }

        Queue<Integer> queue = new ArrayDeque<>();
        for (int node = 0; node < n; node++) {
            if (indegree[node] == 0) {
                queue.offer(node);
            }
        }

        List<Integer> order = new ArrayList<>();

        while (!queue.isEmpty()) {
            int node = queue.poll();
            order.add(node);

            for (int neighbor : adj.getOrDefault(node, Collections.emptyList())) {
                indegree[neighbor]--;
                if (indegree[neighbor] == 0) {
                    queue.offer(neighbor);
                }
            }
        }

        return order.size() == n ? order : new ArrayList<>();
    }
}`,
  },
  {
    language: "C++",
    code: `#include <vector>
#include <queue>
using namespace std;

vector<int> topologicalSort(int n, vector<vector<int>>& adj) {
    vector<int> indegree(n, 0);

    for (int node = 0; node < n; node++) {
        for (int neighbor : adj[node]) {
            indegree[neighbor]++;
        }
    }

    queue<int> q;
    for (int node = 0; node < n; node++) {
        if (indegree[node] == 0) {
            q.push(node);
        }
    }

    vector<int> order;

    while (!q.empty()) {
        int node = q.front();
        q.pop();
        order.push_back(node);

        for (int neighbor : adj[node]) {
            indegree[neighbor]--;
            if (indegree[neighbor] == 0) {
                q.push(neighbor);
            }
        }
    }

    return order.size() == n ? order : vector<int>{};
}`,
  },
  {
    language: "C#",
    code: `using System.Collections.Generic;

public class TopologicalSort {
    public static List<int> Sort(int n, Dictionary<int, List<int>> adj) {
        int[] indegree = new int[n];

        for (int node = 0; node < n; node++) {
            if (adj.ContainsKey(node)) {
                foreach (int neighbor in adj[node]) {
                    indegree[neighbor]++;
                }
            }
        }

        Queue<int> queue = new Queue<int>();
        for (int node = 0; node < n; node++) {
            if (indegree[node] == 0) {
                queue.Enqueue(node);
            }
        }

        List<int> order = new List<int>();

        while (queue.Count > 0) {
            int node = queue.Dequeue();
            order.Add(node);

            if (adj.ContainsKey(node)) {
                foreach (int neighbor in adj[node]) {
                    indegree[neighbor]--;
                    if (indegree[neighbor] == 0) {
                        queue.Enqueue(neighbor);
                    }
                }
            }
        }

        return order.Count == n ? order : new List<int>();
    }
}`,
  },
  {
    language: "Go",
    code: `func TopologicalSort(n int, adj map[int][]int) []int {
    indegree := make([]int, n)

    for node := 0; node < n; node++ {
        for _, neighbor := range adj[node] {
            indegree[neighbor]++
        }
    }

    queue := []int{}
    for node := 0; node < n; node++ {
        if indegree[node] == 0 {
            queue = append(queue, node)
        }
    }

    order := []int{}
    head := 0

    for head < len(queue) {
        node := queue[head]
        head++
        order = append(order, node)

        for _, neighbor := range adj[node] {
            indegree[neighbor]--
            if indegree[neighbor] == 0 {
                queue = append(queue, neighbor)
            }
        }
    }

    if len(order) != n {
        return []int{}
    }

    return order
}`,
  },
  {
    language: "Rust",
    code: `use std::collections::{HashMap, VecDeque};

fn topological_sort(n: usize, adj: &HashMap<usize, Vec<usize>>) -> Vec<usize> {
    let mut indegree = vec![0; n];

    for node in 0..n {
        if let Some(neighbors) = adj.get(&node) {
            for &neighbor in neighbors {
                indegree[neighbor] += 1;
            }
        }
    }

    let mut queue = VecDeque::new();
    for node in 0..n {
        if indegree[node] == 0 {
            queue.push_back(node);
        }
    }

    let mut order = Vec::new();

    while let Some(node) = queue.pop_front() {
        order.push(node);

        if let Some(neighbors) = adj.get(&node) {
            for &neighbor in neighbors {
                indegree[neighbor] -= 1;
                if indegree[neighbor] == 0 {
                    queue.push_back(neighbor);
                }
            }
        }
    }

    if order.len() == n {
        order
    } else {
        Vec::new()
    }
}`,
  },
  {
    language: "Kotlin",
    code: `fun topologicalSort(n: Int, adj: Map<Int, List<Int>>): List<Int> {
    val indegree = IntArray(n)

    for (node in 0 until n) {
        for (neighbor in adj[node] ?: emptyList()) {
            indegree[neighbor]++
        }
    }

    val queue = ArrayDeque<Int>()
    for (node in 0 until n) {
        if (indegree[node] == 0) {
            queue.addLast(node)
        }
    }

    val order = mutableListOf<Int>()

    while (queue.isNotEmpty()) {
        val node = queue.removeFirst()
        order.add(node)

        for (neighbor in adj[node] ?: emptyList()) {
            indegree[neighbor]--
            if (indegree[neighbor] == 0) {
                queue.addLast(neighbor)
            }
        }
    }

    return if (order.size == n) order else emptyList()
}`,
  },
  {
    language: "Swift",
    code: `func topologicalSort(_ n: Int, _ adj: [Int: [Int]]) -> [Int] {
    var indegree = Array(repeating: 0, count: n)

    for node in 0..<n {
        for neighbor in adj[node] ?? [] {
            indegree[neighbor] += 1
        }
    }

    var queue: [Int] = []
    for node in 0..<n {
        if indegree[node] == 0 {
            queue.append(node)
        }
    }

    var order: [Int] = []
    var head = 0

    while head < queue.count {
        let node = queue[head]
        head += 1
        order.append(node)

        for neighbor in adj[node] ?? [] {
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0 {
                queue.append(neighbor)
            }
        }
    }

    return order.count == n ? order : []
}`,
  },
];

function Section({
  id,
  num,
  title,
  children,
}: {
  id: string;
  num: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="border-b border-border py-14 scroll-mt-24">
      <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
        {num} // {id.replaceAll("-", "_")}
      </div>

      <h2 className="mt-3 text-3xl md:text-4xl font-bold leading-tight">
        <span className="text-primary text-glow">$</span> {title}
      </h2>

      <div className="mt-5 text-sm md:text-[15px] text-muted-foreground leading-relaxed space-y-4 max-w-4xl">
        {children}
      </div>
    </section>
  );
}

export default function LearnTopologicalSortPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("TypeScript");

  const currentCode =
    codeExamples.find((item) => item.language === selectedLanguage)?.code ??
    codeExamples[0].code;

  return (
    <main className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
        <div className="container px-4 md:px-8 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold tracking-widest text-sm">
            <span className="h-3 w-3 bg-primary shadow-[0_0_14px_hsl(var(--primary))]" />
            <span className="text-primary text-glow">DSA.ENGINE</span>
          </Link>

          <div className="flex items-center gap-6 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            <Link href="/visualize/topological-sort" className="hover:text-primary transition-colors">
              // visualizer
            </Link>
            <Link href="/" className="hover:text-primary transition-colors">
              // home
            </Link>
          </div>
        </div>
      </header>

      <div className="container px-4 md:px-8 py-12 md:py-16">
        <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          learn // topological_sort · module 09
        </div>

        <h1 className="mt-2 text-4xl md:text-6xl font-extrabold leading-[0.95]">
          Topological
          <br />
          <span className="text-primary text-glow">Sort.</span>
        </h1>

        <p className="mt-5 max-w-2xl text-sm md:text-base text-muted-foreground leading-relaxed">
          Topological Sort gives a valid ordering of nodes in a{" "}
          <span className="text-foreground">directed acyclic graph (DAG)</span>
          {" "}so that every prerequisite comes before what depends on it.
          This is the core idea behind dependency ordering.
        </p>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
          <aside className="terminal-frame p-4 h-fit lg:sticky lg:top-20">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
              ./table_of_contents
            </div>

            <div className="space-y-3">
              {toc.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <span className="text-primary font-bold">{item.num}</span>
                  <span>{item.label}</span>
                </a>
              ))}
            </div>

            <Link
              href="/visualize/topological-sort"
              className="mt-6 inline-flex items-center justify-center w-full border border-primary px-4 py-3 text-xs font-bold tracking-[0.25em] text-primary hover:bg-primary hover:text-black transition-colors"
            >
              ▶ OPEN_VISUALIZER
            </Link>
</aside>

          <div>
            <Section id="root-problem" num="01" title="The Root Problem">
              <p>
                In many systems, some tasks must happen before other tasks.
                You cannot build a project before its dependencies are installed.
                You cannot take an advanced course before its prerequisite.
                You cannot compute a formula if the cells it depends on are not ready yet.
              </p>

              <div className="terminal-frame p-4">
                <p className="text-foreground font-semibold">Main question:</p>
                <p className="mt-2">
                  How do we produce a valid order so every dependency appears before the node that needs it?
                </p>
              </div>

              <p>
                That is exactly what Topological Sort solves — but only for a{" "}
                <span className="text-primary">DAG</span> (Directed Acyclic Graph).
              </p>
            </Section>

            <Section id="core-idea" num="02" title="Core Idea">
              <p>
                The most standard version is <span className="text-foreground">Kahn’s Algorithm</span>.
                It works by repeatedly taking nodes whose indegree is 0.
              </p>

              <div className="terminal-frame overflow-x-auto p-4 text-[12px] md:text-xs leading-relaxed text-foreground">
                <pre>{`1. Compute indegree of every node
2. Put all indegree-0 nodes into a queue
3. Remove one node from the queue
4. Add it to the answer
5. "Delete" its outgoing edges by decrementing neighbors' indegrees
6. If a neighbor's indegree becomes 0, push it into the queue
7. Repeat until queue is empty`}</pre>
              </div>

              <p>
                If we process all V nodes, the graph has a valid topological order.
                If we get stuck early, a cycle exists.
              </p>
            </Section>

            <Section id="intuition" num="03" title="Intuition">
              <p>
                Think of a line of tasks where some tasks are locked until their prerequisites are finished.
              </p>

              <p>
                A node with indegree 0 has no remaining blockers, so it is safe to do now.
                Once you finish it, some other tasks may become unblocked.
              </p>

              <div className="terminal-frame p-4">
                <p><span className="text-primary font-semibold">indegree = 0</span> → ready now</p>
                <p><span className="text-primary font-semibold">remove node</span> → simulate finishing that task</p>
                <p><span className="text-primary font-semibold">decrement neighbors</span> → reduce remaining requirements</p>
              </div>

              <p>
                So Topological Sort is basically a repeated process of taking all currently available tasks,
                one by one, until everything is scheduled.
              </p>
            </Section>

            <Section id="walkthrough" num="04" title="Step-by-Step Example">
              <p>Suppose we have this DAG:</p>

              <div className="terminal-frame overflow-x-auto p-4 text-[12px] md:text-xs leading-relaxed text-foreground">
                <pre>{`0 -> 1
0 -> 2
1 -> 3
2 -> 3
3 -> 4`}</pre>
              </div>

              <p>Initial indegrees:</p>

              <div className="terminal-frame overflow-x-auto p-4 text-[12px] md:text-xs leading-relaxed text-foreground">
                <pre>{`node:      0  1  2  3  4
indegree:  0  1  1  2  1`}</pre>
              </div>

              <p>Now run Kahn’s Algorithm:</p>

              <div className="terminal-frame overflow-x-auto p-4 text-[12px] md:text-xs leading-relaxed text-foreground">
                <pre>{`queue = [0]
order = []

pop 0 -> order = [0]
decrement indegree(1), indegree(2)
queue = [1, 2]

pop 1 -> order = [0, 1]
decrement indegree(3)
queue = [2]

pop 2 -> order = [0, 1, 2]
decrement indegree(3) to 0
queue = [3]

pop 3 -> order = [0, 1, 2, 3]
decrement indegree(4) to 0
queue = [4]

pop 4 -> order = [0, 1, 2, 3, 4]`}</pre>
              </div>

              <p>
                Final answer:
                <span className="text-primary font-semibold"> [0, 1, 2, 3, 4]</span>
              </p>

              <p>
                Note: topological order is not always unique.{" "}
                <span className="text-foreground">[0, 2, 1, 3, 4]</span> is also valid here.
              </p>
            </Section>

            <Section id="code" num="05" title="Code Implementation">
              <p>
                Below is the same Topological Sort logic across 10 languages.
                The pattern stays the same:
              </p>

              <div className="terminal-frame p-4">
                <p>1. Build <span className="text-primary">indegree</span></p>
                <p>2. Push all indegree-0 nodes into a <span className="text-primary">queue</span></p>
                <p>3. Pop from queue and append to <span className="text-primary">order</span></p>
                <p>4. Decrement indegrees of outgoing neighbors</p>
                <p>5. Push any neighbor whose indegree becomes 0</p>
                <p>6. If order size &lt; V, a cycle exists</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {codeExamples.map((item) => (
                  <button
                    key={item.language}
                    onClick={() => setSelectedLanguage(item.language)}
                    className={`px-4 py-2 text-xs md:text-sm border tracking-wide font-semibold transition-colors ${
                      selectedLanguage === item.language
                        ? "bg-primary text-black border-primary"
                        : "border-border text-muted-foreground hover:text-primary hover:border-primary"
                    }`}
                  >
                    {item.language}
                  </button>
                ))}
              </div>

              <div className="terminal-frame overflow-x-auto p-4 text-[12px] md:text-xs leading-relaxed text-foreground">
                <pre className="whitespace-pre">{currentCode}</pre>
              </div>

              <div className="space-y-3">
                <p className="text-foreground font-semibold">Code details to notice:</p>
                <p>▸ We do <span className="text-foreground font-medium">not</span> use DFS here — this is Kahn’s queue-based method</p>
                <p>▸ We explicitly track <code>indegree</code></p>
                <p>▸ The queue holds only nodes that are currently legal to process</p>
                <p>▸ We use a <span className="text-foreground font-medium">head index</span> in TypeScript/JavaScript instead of <code>shift()</code></p>
                <p>▸ That matters, because <code>shift()</code> can make JS queue operations slower in practice</p>
                <p>▸ Returning an empty list means the graph contains a cycle, so no topological ordering exists</p>
              </div>
            </Section>

            <Section id="complexity" num="06" title="Time Complexity">
              <div className="terminal-frame overflow-x-auto p-4 text-[12px] md:text-xs leading-relaxed text-foreground">
                <pre>{`Time:  O(V + E)
Space: O(V)   [extra auxiliary space, not counting input graph]

V = number of vertices (nodes)
E = number of edges`}</pre>
              </div>

              <p>
                Now let’s derive that properly instead of memorizing it.
              </p>

              <div className="space-y-4">
                <div className="terminal-frame p-4">
                  <h3 className="text-base font-bold text-foreground">
                    1. Initialize indegree array → O(V)
                  </h3>
                  <p className="mt-4">
                    We create an array of size V and fill it with 0.
                  </p>
                  <pre className="mt-4 overflow-x-auto">{`const indegree = new Array(n).fill(0);`}</pre>
                  <p className="mt-4">Cost:</p>
                  <pre className="mt-4 overflow-x-auto">{`T1(V) = c1 * V
=> O(V)`}</pre>
                </div>

                <div className="terminal-frame p-4">
                  <h3 className="text-base font-bold text-foreground">
                    2. Compute indegrees by scanning all adjacency lists → O(E)
                  </h3>
                  <p className="mt-4">
                    We loop through every outgoing edge exactly once:
                  </p>
                  <pre className="mt-4 overflow-x-auto">{`for (let node = 0; node < n; node++) {
  for (const neighbor of adj.get(node) ?? []) {
    indegree[neighbor]++;
  }
}`}</pre>
                  <p className="mt-4">
                    The outer loop runs across vertices, but the total work of the inner loops
                    across the whole graph is exactly the number of adjacency entries.
                  </p>
                  <p className="mt-4">
                    In an adjacency-list DAG, that total is <span className="text-foreground font-semibold">E</span>.
                  </p>
                  <pre className="mt-4 overflow-x-auto">{`T2(E) = c2 * E
=> O(E)`}</pre>
                </div>

                <div className="terminal-frame p-4">
                  <h3 className="text-base font-bold text-foreground">
                    3. Put all indegree-0 nodes into the queue → O(V)
                  </h3>
                  <p className="mt-4">
                    We scan every node once to see whether it is ready initially.
                  </p>
                  <pre className="mt-4 overflow-x-auto">{`for (let node = 0; node < n; node++) {
  if (indegree[node] === 0) {
    queue.push(node);
  }
}`}</pre>
                  <pre className="mt-4 overflow-x-auto">{`T3(V) = c3 * V
=> O(V)`}</pre>
                </div>

                <div className="terminal-frame p-4">
                  <h3 className="text-base font-bold text-foreground">
                    4. Queue processing: each node is removed once → O(V)
                  </h3>
                  <p className="mt-4">
                    Every node can enter the order at most once, because once it is taken from the queue,
                    it is processed and never re-added.
                  </p>
                  <pre className="mt-4 overflow-x-auto">{`while (head < queue.length) {
  const node = queue[head++];
  order.push(node);
}`}</pre>
                  <pre className="mt-4 overflow-x-auto">{`Total node removals = V
=> O(V)`}</pre>
                </div>

                <div className="terminal-frame p-4">
                  <h3 className="text-base font-bold text-foreground">
                    5. Edge relaxation across the full algorithm → O(E)
                  </h3>
                  <p className="mt-4">
                    After removing a node, we scan its outgoing neighbors:
                  </p>
                  <pre className="mt-4 overflow-x-auto">{`for (const neighbor of adj.get(node) ?? []) {
  indegree[neighbor]--;
  if (indegree[neighbor] === 0) {
    queue.push(neighbor);
  }
}`}</pre>
                  <p className="mt-4">
                    Even though this loop appears inside the while-loop, each directed edge is still examined
                    only once overall — when its source node is processed.
                  </p>
                  <pre className="mt-4 overflow-x-auto">{`Total neighbor scans = E
=> O(E)`}</pre>
                </div>

                <div className="terminal-frame p-4">
                  <h3 className="text-base font-bold text-foreground">
                    6. Combine the work
                  </h3>
                  <pre className="mt-4 overflow-x-auto">{`T(V, E) = O(V) + O(E) + O(V) + O(V) + O(E)
        = O(3V + 2E)
        = O(V + E)`}</pre>
                  <p className="mt-4">
                    Big-O ignores constant factors, so:
                  </p>
                  <pre className="mt-4 overflow-x-auto">{`O(3V + 2E) = O(V + E)`}</pre>
                </div>

                <div className="terminal-frame p-4">
                  <h3 className="text-base font-bold text-foreground">
                    7. Why this is NOT O(V * E)
                  </h3>
                  <p className="mt-4">
                    This is the most common mistake.
                  </p>
                  <p className="mt-4">
                    Students see a while-loop and an inner neighbor loop and think the cost multiplies.
                    But it does not.
                  </p>
                  <p className="mt-4">
                    The key is that the total number of times all neighbor loops run together is just the
                    total number of edges in the graph.
                  </p>
                  <p className="mt-4">
                    We are not scanning all E edges for each vertex.
                    We are distributing the E edge scans across the full run of the algorithm.
                  </p>
                </div>

                <div className="terminal-frame p-4">
                  <h3 className="text-base font-bold text-foreground">
                    8. Space complexity → O(V)
                  </h3>
                  <p className="mt-4">Extra structures used:</p>
                  <p>▸ indegree array → O(V)</p>
                  <p>▸ queue → O(V) worst case</p>
                  <p>▸ output ordering → O(V)</p>
                  <pre className="mt-4 overflow-x-auto">{`Space = O(V)`}</pre>
                  <p className="mt-4">
                    If someone counts the input adjacency list too, then the full graph storage is O(V + E),
                    but the algorithm’s <span className="text-foreground font-semibold">extra auxiliary space</span>
                    is O(V).
                  </p>
                </div>
              </div>

              <div className="border-l-4 border-primary pl-5 py-2">
                <p className="text-primary font-semibold">Exam shortcut:</p>
                <p className="mt-2">
                  Build indegrees once, scan every edge once, push/pop every node at most once,
                  so Topological Sort using Kahn’s Algorithm runs in{" "}
                  <span className="text-foreground font-semibold">O(V + E)</span>.
                </p>
              </div>
            </Section>

            <Section id="real-world" num="07" title="Real-World Uses">
              <div className="mt-8 flex flex-col gap-4">
                {[
                  ["Course Scheduling", "Take prerequisite courses before advanced ones."],
                  ["Build Systems", "Compile files/modules in dependency order."],
                  ["Task Scheduling", "Run dependent jobs only after required jobs finish."],
                  ["Package Managers", "Install libraries in valid dependency order."],
                  ["Spreadsheets", "Recompute cells based on dependency graphs."],
                  ["Workflow Engines", "Schedule DAG-based pipelines in systems like Airflow."],
                ].map(([title, desc]) => (
                  <div key={title} className="terminal-frame p-4">
                    <h3 className="text-sm font-bold text-foreground">{title}</h3>
                    <p className="mt-2 text-muted-foreground">{desc}</p>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="practice" num="08" title="Practice Problems">
              <div className="space-y-4">
                {[
                  ["Course Schedule", "Detect if a valid ordering exists."],
                  ["Course Schedule II", "Return one valid topological ordering."],
                  ["Alien Dictionary", "Build order rules between characters."],
                  ["Parallel Courses", "Layered topological scheduling."],
                  ["Find All Possible Recipes from Given Supplies", "Dependency unlocking using indegree logic."],
                ].map(([title, desc]) => (
                  <div key={title} className="terminal-frame p-4">
                    <h3 className="text-sm font-bold text-foreground">{title}</h3>
                    <p className="mt-2 text-muted-foreground">{desc}</p>
                  </div>
                ))}
              </div>
            </Section>

            <div className="py-12">
              <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                // module_actions
              </div>

              <h2 className="mt-2 text-2xl md:text-3xl font-bold">
                Topological Sort <span className="text-primary text-glow">Ready.</span>
              </h2>

              <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
                Open the visualizer, go back to Connected Components, or return home.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/visualize/topological-sort"
                  className="border-2 border-primary bg-primary px-5 py-3 text-sm font-bold tracking-[0.25em] text-black hover:opacity-90"
                >
                  ▶ OPEN_TOPO_VISUALIZER
                </Link>

                <Link
                  href="/learn/connected-components"
                  className="border-2 border-border px-5 py-3 text-sm font-bold tracking-[0.25em] text-foreground hover:border-primary hover:text-primary transition-colors"
                >
                  $ BACK_TO_CONNECTED_COMPONENTS
                </Link>

                <Link
                  href="/"
                  className="border-2 border-border px-5 py-3 text-sm font-bold tracking-[0.25em] text-foreground hover:border-primary hover:text-primary transition-colors"
                >
                  $ BACK_TO_HOME
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
