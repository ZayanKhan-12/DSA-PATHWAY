"use client";

import Link from "next/link";
import { useState } from "react";

type TocItem = {
  id: string;
  label: string;
};

type CodeMap = Record<string, string>;

const TOC: TocItem[] = [
  { id: "root-problem", label: "01 Root Problem" },
  { id: "core-idea", label: "02 Core Idea" },
  { id: "dijkstra-intuition", label: "03 Dijkstra Intuition" },
  { id: "worked-example", label: "04 Worked Example" },
  { id: "code-implementation", label: "05 Code Implementation" },
  { id: "time-complexity", label: "06 Time Complexity" },
  { id: "real-world-uses", label: "07 Real-World Uses" },
  { id: "practice-problems", label: "08 Practice Problems" },
];

const CODE_SAMPLES: CodeMap = {
  TypeScript: `type Edge = { to: number; w: number };

function dijkstra(graph: Edge[][], src: number): number[] {
  const n = graph.length;
  const dist = Array(n).fill(Infinity);
  const used = Array(n).fill(false);

  dist[src] = 0;

  for (let round = 0; round < n; round++) {
    let u = -1;

    for (let i = 0; i < n; i++) {
      if (!used[i] && (u === -1 || dist[i] < dist[u])) {
        u = i;
      }
    }

    if (u === -1 || dist[u] === Infinity) {
      break;
    }

    used[u] = true;

    for (const edge of graph[u]) {
      const cand = dist[u] + edge.w;
      if (cand < dist[edge.to]) {
        dist[edge.to] = cand;
      }
    }
  }

  return dist;
}`,

  JavaScript: `function dijkstra(graph, src) {
  const n = graph.length;
  const dist = Array(n).fill(Infinity);
  const used = Array(n).fill(false);

  dist[src] = 0;

  for (let round = 0; round < n; round++) {
    let u = -1;

    for (let i = 0; i < n; i++) {
      if (!used[i] && (u === -1 || dist[i] < dist[u])) {
        u = i;
      }
    }

    if (u === -1 || dist[u] === Infinity) break;

    used[u] = true;

    for (const edge of graph[u]) {
      const cand = dist[u] + edge.w;
      if (cand < dist[edge.to]) {
        dist[edge.to] = cand;
      }
    }
  }

  return dist;
}`,

  Python: `def dijkstra(graph, src):
    n = len(graph)
    dist = [float("inf")] * n
    used = [False] * n

    dist[src] = 0

    for _ in range(n):
        u = -1
        for i in range(n):
            if not used[i] and (u == -1 or dist[i] < dist[u]):
                u = i

        if u == -1 or dist[u] == float("inf"):
            break

        used[u] = True

        for to, w in graph[u]:
            cand = dist[u] + w
            if cand < dist[to]:
                dist[to] = cand

    return dist`,

  Java: `import java.util.*;

public class DijkstraNaive {
  static class Edge {
    int to, w;
    Edge(int to, int w) {
      this.to = to;
      this.w = w;
    }
  }

  static int[] dijkstra(List<Edge>[] graph, int src) {
    int n = graph.length;
    int[] dist = new int[n];
    boolean[] used = new boolean[n];
    Arrays.fill(dist, Integer.MAX_VALUE);
    dist[src] = 0;

    for (int round = 0; round < n; round++) {
      int u = -1;

      for (int i = 0; i < n; i++) {
        if (!used[i] && (u == -1 || dist[i] < dist[u])) {
          u = i;
        }
      }

      if (u == -1 || dist[u] == Integer.MAX_VALUE) break;

      used[u] = true;

      for (Edge e : graph[u]) {
        if (dist[u] + e.w < dist[e.to]) {
          dist[e.to] = dist[u] + e.w;
        }
      }
    }

    return dist;
  }
}`,

  "C++": `#include <bits/stdc++.h>
using namespace std;

struct Edge {
    int to, w;
};

vector<int> dijkstra(vector<vector<Edge>>& graph, int src) {
    int n = graph.size();
    vector<int> dist(n, INT_MAX);
    vector<bool> used(n, false);

    dist[src] = 0;

    for (int round = 0; round < n; round++) {
        int u = -1;
        for (int i = 0; i < n; i++) {
            if (!used[i] && (u == -1 || dist[i] < dist[u])) {
                u = i;
            }
        }

        if (u == -1 || dist[u] == INT_MAX) break;

        used[u] = true;

        for (auto edge : graph[u]) {
            if (dist[u] + edge.w < dist[edge.to]) {
                dist[edge.to] = dist[u] + edge.w;
            }
        }
    }

    return dist;
}`,

  "C#": `using System;
using System.Collections.Generic;

public class Edge {
    public int To;
    public int W;
    public Edge(int to, int w) {
        To = to;
        W = w;
    }
}

public class Solution {
    public int[] Dijkstra(List<Edge>[] graph, int src) {
        int n = graph.Length;
        int[] dist = new int[n];
        bool[] used = new bool[n];
        Array.Fill(dist, int.MaxValue);
        dist[src] = 0;

        for (int round = 0; round < n; round++) {
            int u = -1;

            for (int i = 0; i < n; i++) {
                if (!used[i] && (u == -1 || dist[i] < dist[u])) {
                    u = i;
                }
            }

            if (u == -1 || dist[u] == int.MaxValue) break;

            used[u] = true;

            foreach (var edge in graph[u]) {
                int cand = dist[u] + edge.W;
                if (cand < dist[edge.To]) {
                    dist[edge.To] = cand;
                }
            }
        }

        return dist;
    }
}`,

  Go: `package main

import "math"

type Edge struct {
	to int
	w  int
}

func dijkstra(graph [][]Edge, src int) []int {
	n := len(graph)
	dist := make([]int, n)
	used := make([]bool, n)

	for i := 0; i < n; i++ {
		dist[i] = math.MaxInt
	}

	dist[src] = 0

	for round := 0; round < n; round++ {
		u := -1

		for i := 0; i < n; i++ {
			if !used[i] && (u == -1 || dist[i] < dist[u]) {
				u = i
			}
		}

		if u == -1 || dist[u] == math.MaxInt {
			break
		}

		used[u] = true

		for _, edge := range graph[u] {
			cand := dist[u] + edge.w
			if cand < dist[edge.to] {
				dist[edge.to] = cand
			}
		}
	}

	return dist
}`,

  Rust: `#[derive(Clone, Copy)]
struct Edge {
    to: usize,
    w: i32,
}

fn dijkstra(graph: &Vec<Vec<Edge>>, src: usize) -> Vec<i32> {
    let n = graph.len();
    let mut dist = vec![i32::MAX; n];
    let mut used = vec![false; n];

    dist[src] = 0;

    for _ in 0..n {
        let mut u: Option<usize> = None;

        for i in 0..n {
            if !used[i] && (u.is_none() || dist[i] < dist[u.unwrap()]) {
                u = Some(i);
            }
        }

        if u.is_none() || dist[u.unwrap()] == i32::MAX {
            break;
        }

        let u = u.unwrap();
        used[u] = true;

        for edge in &graph[u] {
            let cand = dist[u] + edge.w;
            if cand < dist[edge.to] {
                dist[edge.to] = cand;
            }
        }
    }

    dist
}`,

  Kotlin: `data class Edge(val to: Int, val w: Int)

fun dijkstra(graph: List<List<Edge>>, src: Int): IntArray {
    val n = graph.size
    val dist = IntArray(n) { Int.MAX_VALUE }
    val used = BooleanArray(n)

    dist[src] = 0

    repeat(n) {
        var u = -1

        for (i in 0 until n) {
            if (!used[i] && (u == -1 || dist[i] < dist[u])) {
                u = i
            }
        }

        if (u == -1 || dist[u] == Int.MAX_VALUE) return@repeat

        used[u] = true

        for (edge in graph[u]) {
            val cand = dist[u] + edge.w
            if (cand < dist[edge.to]) {
                dist[edge.to] = cand
            }
        }
    }

    return dist
}`,

  Swift: `struct Edge {
    let to: Int
    let w: Int
}

func dijkstra(_ graph: [[Edge]], _ src: Int) -> [Int] {
    let n = graph.count
    var dist = Array(repeating: Int.max, count: n)
    var used = Array(repeating: false, count: n)

    dist[src] = 0

    for _ in 0..<n {
        var u = -1

        for i in 0..<n {
            if !used[i] && (u == -1 || dist[i] < dist[u]) {
                u = i
            }
        }

        if u == -1 || dist[u] == Int.max { break }

        used[u] = true

        for edge in graph[u] {
            let cand = dist[u] + edge.w
            if cand < dist[edge.to] {
                dist[edge.to] = cand
            }
        }
    }

    return dist
}`,
};

function Header() {
  return (
    <div className="border-b border-border bg-background/90">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4 lg:px-10">
        <Link href="/" className="font-mono text-sm font-bold tracking-[0.2em] text-primary">
          ■ DSA.ENGINE
        </Link>

        <div className="flex items-center gap-6 font-mono text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
          <Link href="/visualize/advanced-graphs" className="transition hover:text-primary">
            // Visualizer
          </Link>
          <Link href="/" className="transition hover:text-primary">
            // Home
          </Link>
        </div>
      </div>
    </div>
  );
}

function SectionTitle({
  idx,
  title,
  id,
}: {
  idx: string;
  title: string;
  id: string;
}) {
  return (
    <section id={id} className="scroll-mt-24 space-y-3">
      <div className="font-mono text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
        {idx} // Section
      </div>
      <div className="flex items-center gap-4">
        <span className="font-mono text-6xl font-extrabold leading-none text-primary drop-shadow-[0_0_12px_rgba(57,255,20,0.55)]">
          $
        </span>
        <h2 className="font-mono text-4xl font-extrabold tracking-tight text-foreground md:text-6xl">
          {title}
        </h2>
      </div>
    </section>
  );
}

function TerminalCard({
  title,
  children,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`border border-border bg-card/40 p-5 md:p-6 ${className}`}>
      <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
        {title}
      </div>
      <div className="space-y-3 text-lg leading-8 text-muted-foreground">{children}</div>
    </div>
  );
}

function SummaryMetric({
  title,
  value,
  sub,
}: {
  title: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="border border-border bg-background/60 px-5 py-5">
      <div className="text-sm font-semibold text-foreground">{title}</div>
      <div className="mt-3 font-mono text-4xl font-extrabold text-primary">{value}</div>
      {sub ? <div className="mt-2 text-sm text-muted-foreground">{sub}</div> : null}
    </div>
  );
}

function TocCard() {
  return (
    <div className="sticky top-6 space-y-4">
      <div className="border border-border bg-card/40 p-5">
        <div className="mb-5 font-mono text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
          ./Table_Of_Contents
        </div>

        <div className="space-y-3">
          {TOC.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="block font-mono text-lg text-foreground transition hover:text-primary"
            >
              {item.label}
            </a>
          ))}
        </div>

        <Link
          href="/visualize/advanced-graphs"
          className="mt-6 flex items-center justify-center border border-primary bg-primary/10 px-4 py-4 font-mono text-sm font-bold uppercase tracking-[0.3em] text-primary transition hover:bg-primary hover:text-background"
        >
          ▶ Open_Visualizer
        </Link>
      </div>
    </div>
  );
}

function CodeTabs() {
  const languages = Object.keys(CODE_SAMPLES);
  const [active, setActive] = useState("TypeScript");

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        {languages.map((lang) => {
          const selected = lang === active;
          return (
            <button
              key={lang}
              onClick={() => setActive(lang)}
              className={[
                "border px-5 py-3 font-mono text-sm font-bold transition",
                selected
                  ? "border-primary bg-primary text-background"
                  : "border-border bg-background/40 text-muted-foreground hover:border-primary hover:text-primary",
              ].join(" ")}
            >
              {lang}
            </button>
          );
        })}
      </div>

      <div className="border border-border bg-card/40 p-5 md:p-6">
        <div className="mb-4 text-3xl font-extrabold text-primary">{active}</div>
        <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-[16px] leading-8 text-foreground">
          {CODE_SAMPLES[active]}
        </pre>
      </div>
    </div>
  );
}

export default function AdvancedGraphsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="mx-auto max-w-[1600px] px-6 pb-24 pt-8 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)] xl:gap-12">
          <aside className="min-w-0">
            <TocCard />
          </aside>

          <div className="min-w-0 space-y-14 origin-top scale-[0.82] w-[122%] -ml-[11%]">
            <section className="space-y-5">
              <div className="font-mono text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
                Learn // Advanced_Graphs — Module 11
              </div>

              <h1 className="font-mono text-5xl font-extrabold tracking-tight text-foreground md:text-7xl">
                Advanced Graphs <span className="text-primary drop-shadow-[0_0_14px_rgba(57,255,20,0.55)]">Lesson.</span>
              </h1>

              <p className="max-w-5xl text-xl leading-9 text-muted-foreground">
                This module focuses on weighted shortest paths and graph optimization ideas.
                The central pattern is Dijkstra: always expand the unprocessed node with the
                best current distance, then relax outgoing edges. Once you understand that
                loop, the rest of the page becomes much easier.
              </p>
            </section>

            <div className="space-y-5">
              <SectionTitle idx="01" title="Root Problem" id="root-problem" />
              <TerminalCard title="Problem Framing">
                <p>
                  In weighted graphs, a normal BFS is no longer enough because edges can cost
                  different amounts. We need an algorithm that always keeps track of the best
                  known distance to every node and improves those distances as better routes are found.
                </p>
                <div className="border border-border bg-background/60 p-5">
                  <div className="font-semibold text-foreground">Goal:</div>
                  <p>
                    From a source node, compute the shortest distance to every other node
                    when all edge weights are non-negative.
                  </p>
                </div>
              </TerminalCard>
            </div>

            <div className="space-y-5">
              <SectionTitle idx="02" title="Core Idea" id="core-idea" />
              <TerminalCard title="Dijkstra Rule">
                <p>
                  Maintain tentative distances from the source. Repeatedly choose the
                  unprocessed node with the smallest current distance, then relax all outgoing edges from it.
                </p>
                <p>
                  Once a node is finalized in Dijkstra with non-negative weights, its shortest
                  distance is fixed and will not improve later.
                </p>
              </TerminalCard>
            </div>

            <div className="space-y-5">
              <SectionTitle idx="03" title="Dijkstra Intuition" id="dijkstra-intuition" />
              <div className="grid gap-4 xl:grid-cols-3">
                <TerminalCard title="Best Frontier First">
                  Always expand the cheapest unprocessed node. That is why the algorithm feels
                  greedy: it commits to the current best frontier.
                </TerminalCard>

                <TerminalCard title="Relaxation">
                  For an edge u → v with weight w, try:
                  <div className="border border-border bg-background/60 p-4 font-mono text-base text-foreground">
                    dist[v] = min(dist[v], dist[u] + w)
                  </div>
                </TerminalCard>

                <TerminalCard title="Non-Negative Weights">
                  Dijkstra depends on non-negative edges. If negative edges exist, a node that
                  looks finished now could be improved later, which breaks the logic.
                </TerminalCard>
              </div>
            </div>

            <div className="space-y-5">
              <SectionTitle idx="04" title="Worked Example" id="worked-example" />
              <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
                <TerminalCard title="Example Graph">
                  <div className="space-y-2">
                    <p>Source = 0</p>
                    <p>Edges:</p>
                    <div className="border border-border bg-background/60 p-4 font-mono text-base leading-8 text-foreground">
                      0 → 1 (4)
                      <br />
                      0 → 2 (1)
                      <br />
                      2 → 1 (2)
                      <br />
                      1 → 3 (1)
                      <br />
                      2 → 3 (5)
                    </div>
                  </div>
                </TerminalCard>

                <TerminalCard title="Walkthrough">
                  <p>Start: dist[0] = 0, everything else = ∞</p>
                  <p>Pick 0 first, relax its neighbors → dist[1] = 4, dist[2] = 1</p>
                  <p>Pick 2 next because 1 is smaller than 4</p>
                  <p>Relax from 2 → dist[1] becomes 3, dist[3] becomes 6</p>
                  <p>Pick 1 next → relax 1 → 3, so dist[3] becomes 4</p>
                  <p>Final shortest distances: [0, 3, 1, 4]</p>
                </TerminalCard>
              </div>
            </div>

            <div className="space-y-5">
              <SectionTitle idx="05" title="Code Implementation" id="code-implementation" />
              <CodeTabs />
            </div>

            <div className="space-y-5">
              <SectionTitle idx="06" title="Time Complexity" id="time-complexity" />

              <div className="border border-border bg-card/40 p-5 md:p-6 space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <SummaryMetric
                    title="Time"
                    value="Naive: O(V² + E)"
                    sub="Heap version: O((V + E) log V)"
                  />
                  <SummaryMetric
                    title="Space"
                    value="O(V + E)"
                    sub="distance + visited + graph + optional parent / priority queue"
                  />
                </div>

                <TerminalCard title="Why the naive version is O(V² + E)">
                  <p>
                    Let V = number of vertices and E = number of edges.
                    In the array / naive implementation, the expensive part is choosing the next node.
                  </p>

                  <div className="border border-border bg-background/60 p-5">
                    <div className="font-semibold text-foreground">Cost breakdown</div>
                    <div className="mt-3 space-y-2">
                      <p>• One full scan to find the smallest unvisited distance costs O(V)</p>
                      <p>• You repeat that scan up to V times</p>
                      <p>• So node selection contributes O(V × V) = O(V²)</p>
                      <p>• Across the whole run, relaxing all adjacency lists contributes O(E)</p>
                    </div>
                  </div>

                  <div className="border border-border bg-background/60 p-5 font-mono text-lg text-foreground">
                    Total = O(V² + E)
                  </div>
                </TerminalCard>

                <TerminalCard title="Why the heap version is O((V + E) log V)">
                  <p>
                    A min-priority queue avoids rescanning all vertices every round.
                    Instead, it lets us pull the next best node in logarithmic time.
                  </p>

                  <div className="border border-border bg-background/60 p-5">
                    <div className="font-semibold text-foreground">Heap-based work</div>
                    <div className="mt-3 space-y-2">
                      <p>• Up to V extract-min operations</p>
                      <p>• Up to E relax / push style updates</p>
                      <p>• Each such heap operation costs about O(log V)</p>
                    </div>
                  </div>

                  <div className="border border-border bg-background/60 p-5 font-mono text-lg text-foreground">
                    Total = O((V + E) log V)
                  </div>
                </TerminalCard>

                <div className="grid gap-4 xl:grid-cols-2">
                  <TerminalCard title="Step-by-Step Calculation">
                    <p>Break Dijkstra into two major costs:</p>
                    <p>1. choosing the next node</p>
                    <p>2. relaxing outgoing edges</p>

                    <div className="border border-border bg-background/60 p-5">
                      <div className="font-semibold text-foreground">Naive version</div>
                      <div className="mt-3 space-y-2">
                        <p>choose-next = O(V) per round</p>
                        <p>rounds = V</p>
                        <p>selection total = O(V²)</p>
                        <p>relaxation total = O(E)</p>
                      </div>
                    </div>

                    <div className="border border-border bg-background/60 p-5 font-mono text-lg text-foreground">
                      O(V²) + O(E) = O(V² + E)
                    </div>
                  </TerminalCard>

                  <TerminalCard title="Space">
                    <p>Typical storage comes from:</p>
                    <div className="border border-border bg-background/60 p-5">
                      <div className="space-y-2">
                        <p>dist array = O(V)</p>
                        <p>visited / finalized flags = O(V)</p>
                        <p>optional parent array = O(V)</p>
                        <p>adjacency list = O(V + E)</p>
                        <p>priority queue = up to O(V) or more entries depending on implementation</p>
                      </div>
                    </div>

                    <div className="border border-border bg-background/60 p-5 font-mono text-lg text-foreground">
                      Standard total auxiliary + graph storage: O(V + E)
                    </div>
                  </TerminalCard>
                </div>

                <TerminalCard title="When each version is better">
                  <p>
                    On sparse graphs, E is much smaller than V², so the heap version is usually
                    much faster in practice.
                  </p>
                  <p>
                    On dense graphs where E is close to V², the naive version can be more
                    acceptable because the gap narrows.
                  </p>
                  <p>
                    In most interview and production contexts, the heap-based implementation is
                    the standard version to remember.
                  </p>
                </TerminalCard>
              </div>
            </div>

            <div className="space-y-5">
              <SectionTitle idx="07" title="Real-World Uses" id="real-world-uses" />
              <div className="grid gap-4 xl:grid-cols-3">
                <TerminalCard title="Maps / Routing">
                  Find shortest travel cost from one place to many destinations when roads have
                  non-negative weights.
                </TerminalCard>

                <TerminalCard title="Networks">
                  Model latency / cost between machines or routers and compute efficient routes.
                </TerminalCard>

                <TerminalCard title="Game / AI Pathfinding">
                  Use weighted graph shortest-path ideas for movement cost, terrain difficulty,
                  and navigation systems.
                </TerminalCard>
              </div>
            </div>

            <div className="space-y-5">
              <SectionTitle idx="08" title="Practice Problems" id="practice-problems" />
              <TerminalCard title="Recommended Problems">
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="border border-border bg-background/60 p-4">
                    <div className="font-semibold text-foreground">Network Delay Time</div>
                    <div>Classic Dijkstra shortest-path application.</div>
                  </div>
                  <div className="border border-border bg-background/60 p-4">
                    <div className="font-semibold text-foreground">Path With Minimum Effort</div>
                    <div>Shortest-path thinking with custom edge cost logic.</div>
                  </div>
                  <div className="border border-border bg-background/60 p-4">
                    <div className="font-semibold text-foreground">Cheapest Flights Within K Stops</div>
                    <div>Compare shortest-path tools and constrained state design.</div>
                  </div>
                  <div className="border border-border bg-background/60 p-4">
                    <div className="font-semibold text-foreground">Bellman-Ford Comparison</div>
                    <div>Good for understanding when Dijkstra is not valid.</div>
                  </div>
                </div>
              </TerminalCard>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
