"use client";

import Link from "next/link";
import { useState } from "react";

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
    code: `function countComponents(n: number, adj: Map<number, number[]>): number {
  const visited = new Set<number>();
  let components = 0;

  function dfs(node: number): void {
    visited.add(node);

    for (const neighbor of adj.get(node) ?? []) {
      if (!visited.has(neighbor)) {
        dfs(neighbor);
      }
    }
  }

  for (let node = 0; node < n; node++) {
    if (!visited.has(node)) {
      dfs(node);
      components++;
    }
  }

  return components;
}`,
  },
  {
    language: "JavaScript",
    code: `function countComponents(n, adj) {
  const visited = new Set();
  let components = 0;

  function dfs(node) {
    visited.add(node);

    for (const neighbor of adj.get(node) || []) {
      if (!visited.has(neighbor)) {
        dfs(neighbor);
      }
    }
  }

  for (let node = 0; node < n; node++) {
    if (!visited.has(node)) {
      dfs(node);
      components++;
    }
  }

  return components;
}`,
  },
  {
    language: "Python",
    code: `def count_components(n, adj):
    visited = set()
    components = 0

    def dfs(node):
        visited.add(node)
        for neighbor in adj.get(node, []):
            if neighbor not in visited:
                dfs(neighbor)

    for node in range(n):
        if node not in visited:
            dfs(node)
            components += 1

    return components`,
  },
  {
    language: "Java",
    code: `import java.util.*;

public class ConnectedComponents {
    public static int countComponents(int n, Map<Integer, List<Integer>> adj) {
        Set<Integer> visited = new HashSet<>();
        int components = 0;

        for (int node = 0; node < n; node++) {
            if (!visited.contains(node)) {
                dfs(node, adj, visited);
                components++;
            }
        }

        return components;
    }

    private static void dfs(int node, Map<Integer, List<Integer>> adj, Set<Integer> visited) {
        visited.add(node);

        for (int neighbor : adj.getOrDefault(node, new ArrayList<>())) {
            if (!visited.contains(neighbor)) {
                dfs(neighbor, adj, visited);
            }
        }
    }
}`,
  },
  {
    language: "C++",
    code: `#include <vector>
using namespace std;

void dfs(int node, vector<vector<int>>& adj, vector<bool>& visited) {
    visited[node] = true;

    for (int neighbor : adj[node]) {
        if (!visited[neighbor]) {
            dfs(neighbor, adj, visited);
        }
    }
}

int countComponents(int n, vector<vector<int>>& adj) {
    vector<bool> visited(n, false);
    int components = 0;

    for (int node = 0; node < n; node++) {
        if (!visited[node]) {
            dfs(node, adj, visited);
            components++;
        }
    }

    return components;
}`,
  },
  {
    language: "C#",
    code: `using System.Collections.Generic;

public class ConnectedComponents {
    public static int CountComponents(int n, Dictionary<int, List<int>> adj) {
        HashSet<int> visited = new HashSet<int>();
        int components = 0;

        void Dfs(int node) {
            visited.Add(node);

            if (adj.ContainsKey(node)) {
                foreach (int neighbor in adj[node]) {
                    if (!visited.Contains(neighbor)) {
                        Dfs(neighbor);
                    }
                }
            }
        }

        for (int node = 0; node < n; node++) {
            if (!visited.Contains(node)) {
                Dfs(node);
                components++;
            }
        }

        return components;
    }
}`,
  },
  {
    language: "Go",
    code: `func dfs(node int, adj map[int][]int, visited map[int]bool) {
    visited[node] = true

    for _, neighbor := range adj[node] {
        if !visited[neighbor] {
            dfs(neighbor, adj, visited)
        }
    }
}

func countComponents(n int, adj map[int][]int) int {
    visited := make(map[int]bool)
    components := 0

    for node := 0; node < n; node++ {
        if !visited[node] {
            dfs(node, adj, visited)
            components++
        }
    }

    return components
}`,
  },
  {
    language: "Rust",
    code: `use std::collections::{HashMap, HashSet};

fn dfs(node: i32, adj: &HashMap<i32, Vec<i32>>, visited: &mut HashSet<i32>) {
    visited.insert(node);

    if let Some(neighbors) = adj.get(&node) {
        for &neighbor in neighbors {
            if !visited.contains(&neighbor) {
                dfs(neighbor, adj, visited);
            }
        }
    }
}

fn count_components(n: i32, adj: &HashMap<i32, Vec<i32>>) -> i32 {
    let mut visited = HashSet::new();
    let mut components = 0;

    for node in 0..n {
        if !visited.contains(&node) {
            dfs(node, adj, &mut visited);
            components += 1;
        }
    }

    components
}`,
  },
  {
    language: "Kotlin",
    code: `fun countComponents(n: Int, adj: Map<Int, List<Int>>): Int {
    val visited = mutableSetOf<Int>()
    var components = 0

    fun dfs(node: Int) {
        visited.add(node)

        for (neighbor in adj[node] ?: emptyList()) {
            if (neighbor !in visited) {
                dfs(neighbor)
            }
        }
    }

    for (node in 0 until n) {
        if (node !in visited) {
            dfs(node)
            components++
        }
    }

    return components
}`,
  },
  {
    language: "Swift",
    code: `func countComponents(_ n: Int, _ adj: [Int: [Int]]) -> Int {
    var visited = Set<Int>()
    var components = 0

    func dfs(_ node: Int) {
        visited.insert(node)

        for neighbor in adj[node] ?? [] {
            if !visited.contains(neighbor) {
                dfs(neighbor)
            }
        }
    }

    for node in 0..<n {
        if !visited.contains(node) {
            dfs(node)
            components += 1
        }
    }

    return components
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
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="border-b border-border py-14 scroll-mt-24">
      <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
        {num} // {id.replaceAll("-", "_")}
      </div>

      <h2 className="mt-3 text-3xl md:text-4xl font-bold leading-tight">
        <span className="text-primary text-glow">$</span> {title}
      </h2>

      <div className="mt-5 text-sm md:text-[15px] text-muted-foreground leading-relaxed space-y-4 max-w-3xl">
        {children}
      </div>
    </section>
  );
}

export default function LearnConnectedComponentsPage() {
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
            <Link href="/visualize/connected-components" className="hover:text-primary transition-colors">
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
          learn // connected_components · module 08
        </div>

        <h1 className="mt-2 text-4xl md:text-6xl font-extrabold leading-[0.95]">
          Connected
          <br />
          <span className="text-primary text-glow">Components.</span>
        </h1>

        <p className="mt-5 max-w-2xl text-sm md:text-base text-muted-foreground leading-relaxed">
          This module teaches how BFS and DFS are used to discover entire disconnected
          regions in a graph. Instead of asking, <span className="text-foreground">"Can I reach one node from another?"</span>,
          we now ask, <span className="text-foreground">"How many separate groups exist in the graph?"</span>
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
              href="/visualize/connected-components"
              className="mt-6 inline-flex items-center justify-center w-full border border-primary px-4 py-3 text-xs font-bold tracking-[0.25em] text-primary hover:bg-primary hover:text-black transition-colors"
            >
              ▶ OPEN VISUALIZER
            </Link>
          </aside>

          <div>
            <Section id="root-problem" num="01" title="The Root Problem">
              <p>
                In many problems, the graph is not one fully connected structure. Instead, it is split into
                multiple isolated pieces.
              </p>

              <div className="terminal-frame p-4">
                <p className="text-foreground font-semibold">Main question:</p>
                <p className="mt-2">How many separate connected groups exist in the graph?</p>
              </div>

              <p>
                A <span className="text-primary">connected component</span> is a maximal group of vertices such that
                every vertex in that group is reachable from every other vertex in that same group.
              </p>
            </Section>

            <Section id="core-idea" num="02" title="Core Idea">
              <p>The main pattern is:</p>

              <div className="terminal-frame overflow-x-auto p-4 text-[12px] md:text-xs leading-relaxed text-foreground">
                <pre>{`components = 0
for each node:
    if node is not visited:
        run DFS/BFS starting from node
        components += 1`}</pre>
              </div>

              <p>
                Every time you find an unvisited node, that means you found the start of a brand-new component.
                The DFS/BFS from that node marks the whole component.
              </p>
            </Section>

            <Section id="intuition" num="03" title="Intuition">
              <p>
                Think of a country with many islands. Roads connect cities on the same island, but no roads connect
                cities across different islands.
              </p>

              <p>
                If you start from one city and drive everywhere possible, you only cover one island.
                To count all islands, you repeat this process from the next unvisited city.
              </p>

              <div className="terminal-frame p-4">
                <p><span className="text-primary font-semibold">Traversal 1</span> → marks component 1</p>
                <p><span className="text-primary font-semibold">Traversal 2</span> → marks component 2</p>
                <p><span className="text-primary font-semibold">Traversal 3</span> → marks component 3</p>
              </div>
            </Section>

            <Section id="walkthrough" num="04" title="Step-by-Step Example">
              <p>Suppose we have:</p>

              <div className="terminal-frame overflow-x-auto p-4 text-[12px] md:text-xs leading-relaxed text-foreground">
                <pre>{`0 -- 1 -- 2      3 -- 4      5

Component 1 = {0,1,2}
Component 2 = {3,4}
Component 3 = {5}`}</pre>
              </div>

              <p>Walkthrough:</p>

              <div className="terminal-frame overflow-x-auto p-4 text-[12px] md:text-xs leading-relaxed text-foreground">
                <pre>{`node 0 unvisited -> run DFS/BFS -> visits 0,1,2 -> components = 1
node 1 already visited
node 2 already visited
node 3 unvisited -> run DFS/BFS -> visits 3,4 -> components = 2
node 4 already visited
node 5 unvisited -> run DFS/BFS -> visits 5 -> components = 3`}</pre>
              </div>

              <p>
                Final answer:
                <span className="text-primary font-semibold"> 3 connected components</span>
              </p>
            </Section>

            <Section id="code" num="05" title="Code Implementation">
              <p>
                Below is the same connected-components logic shown across multiple languages.
                The algorithm pattern does not change:
              </p>

              <div className="terminal-frame p-4">
                <p>1. Maintain a <span className="text-primary">visited</span> structure</p>
                <p>2. Scan all nodes</p>
                <p>3. If a node is unvisited, run DFS/BFS</p>
                <p>4. Increment <span className="text-primary">components</span></p>
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
                <pre className="whitespace-pre-wrap">{currentCode}</pre>
              </div>

              <div className="space-y-3">
                <p className="text-foreground font-semibold">Structure to notice:</p>
                <p>▸ Outer loop scans all nodes</p>
                <p>▸ DFS/BFS fully marks one component</p>
                <p>▸ <code>components++</code> happens only when starting a fresh traversal</p>
                <p>▸ No node is processed twice because of the visited set</p>
              </div>
            </Section>

            <Section id="complexity" num="06" title="Time Complexity">
              <div className="terminal-frame overflow-x-auto p-4 text-[12px] md:text-xs leading-relaxed text-foreground">
                <pre>{`Time:  O(V + E)
Space: O(V)

V = number of vertices (nodes)
E = number of edges`}</pre>
              </div>

              <p>Now let’s derive that properly instead of just memorizing it.</p>

              <div className="space-y-4">
                <div className="terminal-frame p-4">
                  <h3 className="text-base font-bold text-foreground">
                    1. Outer loop over all nodes → O(V)
                  </h3>
                  <p className="mt-4">We run:</p>
                  <pre className="mt-4 overflow-x-auto">{`for (let node = 0; node < n; node++) {
  if (!visited.has(node)) {
    dfs(node);
    components++;
  }
}`}</pre>
                  <p className="mt-4">This loop checks each node once. So the direct work of the loop itself is:</p>
                  <pre className="mt-4 overflow-x-auto">{`T1(V) = c1 * V
=> O(V)`}</pre>
                </div>

                <div className="terminal-frame p-4">
                  <h3 className="text-base font-bold text-foreground">
                    2. DFS/BFS total vertex work → O(V)
                  </h3>
                  <p className="mt-4">Across the entire algorithm, each node becomes visited exactly once.</p>
                  <pre className="mt-4 overflow-x-auto">{`visited.add(node)`}</pre>
                  <p className="mt-4">Since each node is added to visited once:</p>
                  <pre className="mt-4 overflow-x-auto">{`Total node-processing cost = c2 * V
=> O(V)`}</pre>
                </div>

                <div className="terminal-frame p-4">
                  <h3 className="text-base font-bold text-foreground">
                    3. Total neighbor scanning → O(E)
                  </h3>
                  <p className="mt-4">The expensive part is here:</p>
                  <pre className="mt-4 overflow-x-auto">{`for (const neighbor of adj.get(node) ?? []) {
  if (!visited.has(neighbor)) {
    dfs(neighbor);
  }
}`}</pre>
                  <p className="mt-4">This loop runs over adjacency lists.</p>
                  <p className="mt-4">If the graph has:</p>
                  <p>▸ directed edges → total adjacency entries = E</p>
                  <p>▸ undirected edges → each edge appears twice = 2E</p>
                  <p className="mt-4">So:</p>
                  <pre className="mt-4 overflow-x-auto">{`Directed graph:   O(E)
Undirected graph: O(2E) = O(E)`}</pre>
                </div>

                <div className="terminal-frame p-4">
                  <h3 className="text-base font-bold text-foreground">
                    4. Combine everything
                  </h3>
                  <p className="mt-4">Total time:</p>
                  <pre className="mt-4 overflow-x-auto">{`T(V, E) = O(V) + O(V) + O(E)
        = O(2V + E)
        = O(V + E)`}</pre>
                  <p className="mt-4">Constants are ignored in Big-O, so:</p>
                  <pre className="mt-4 overflow-x-auto">{`O(2V + E) = O(V + E)`}</pre>
                </div>

                <div className="terminal-frame p-4">
                  <h3 className="text-base font-bold text-foreground">
                    5. Why repeated DFS calls do NOT make it O(V * (V + E))
                  </h3>
                  <p className="mt-4">This is the most common mistake.</p>
                  <p className="mt-4">
                    Even though DFS/BFS may be started multiple times, each start only happens on an unvisited node,
                    and once a component is traversed, all of its nodes become visited.
                  </p>
                  <p className="mt-4">
                    That means the total traversal work across all components is still just one full pass over all vertices
                    and edges overall.
                  </p>
                </div>

                <div className="terminal-frame p-4">
                  <h3 className="text-base font-bold text-foreground">
                    6. Space complexity → O(V)
                  </h3>
                  <p className="mt-4">We use:</p>
                  <p>▸ visited set → up to V nodes</p>
                  <p>▸ recursion stack (DFS) → up to V in worst case</p>
                  <p>▸ queue (if using BFS) → up to V in worst case</p>
                  <pre className="mt-4 overflow-x-auto">{`Space = O(V)`}</pre>
                </div>
              </div>

              <div className="border-l-4 border-primary pl-5 py-2">
                <p className="text-primary font-semibold">Exam shortcut:</p>
                <p className="mt-2">
                  Each node is visited once, each edge is scanned once overall
                  (or twice in an undirected adjacency list, which is still O(E)),
                  so connected components runs in <span className="text-foreground font-semibold">O(V + E)</span>.
                </p>
              </div>
            </Section>

            <Section id="real-world" num="07" title="Real-World Uses">
              <div className="mt-8 flex flex-col gap-4">
                {[
                  ["Social Networks", "Find separate communities or disconnected friend groups."],
                  ["Computer Networks", "Detect isolated machines or disconnected sub-networks."],
                  ["Maps", "Identify isolated regions in a road system."],
                  ["Image Processing", "Connected pixel region detection."],
                  ["Biology", "Find clusters in protein/gene interaction graphs."],
                  ["Infrastructure", "Detect disconnected service regions."],
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
                  ["Number of Connected Components in an Undirected Graph", "Direct graph version."],
                  ["Number of Provinces", "Adjacency matrix connected components."],
                  ["Number of Islands", "Grid version of connected components."],
                  ["Max Area of Island", "Connected components + area counting."],
                  ["Surrounded Regions", "Boundary-connected component logic."],
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
                // next_module
              </div>

              <h2 className="mt-2 text-2xl md:text-3xl font-bold">
                Next up: <span className="text-primary text-glow">Topological Sort</span>
              </h2>

              <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
                Continue to the next module to learn how dependency ordering works in directed acyclic graphs.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/learn/topological-sort"
                  className="border-2 border-primary bg-primary px-5 py-3 text-sm font-bold tracking-[0.25em] text-primary-foreground hover:shadow-[var(--shadow-glow)]"
                >
                  ▶ OPEN_TOPOLOGICAL_SORT
                </Link>

                <Link
                  href="/visualize/topological-sort"
                  className="border-2 border-border px-5 py-3 text-sm font-bold tracking-[0.25em] text-foreground hover:border-primary hover:text-primary transition-colors"
                >
                  $ OPEN_TOPO_VISUALIZER
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
