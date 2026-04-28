"use client";

import { useState } from "react";

const SNIPPETS: Record<string, string> = {
  TypeScript: `function dfs(
  node: number,
  adj: Map<number, number[]>,
  visited: Set<number>,
  order: number[]
): void {
  visited.add(node);
  order.push(node);

  for (const neighbor of adj.get(node) ?? []) {
    if (!visited.has(neighbor)) {
      dfs(neighbor, adj, visited, order);
    }
  }
}`,

  JavaScript: `function dfs(node, adj, visited, order) {
  visited.add(node);
  order.push(node);

  for (const neighbor of adj.get(node) || []) {
    if (!visited.has(neighbor)) {
      dfs(neighbor, adj, visited, order);
    }
  }
}`,

  Python: `def dfs(node, adj, visited, order):
    visited.add(node)
    order.append(node)

    for neighbor in adj.get(node, []):
        if neighbor not in visited:
            dfs(neighbor, adj, visited, order)`,

  Java: `public static void dfs(
    int node,
    Map<Integer, List<Integer>> adj,
    Set<Integer> visited,
    List<Integer> order
) {
    visited.add(node);
    order.add(node);

    for (int neighbor : adj.getOrDefault(node, Collections.emptyList())) {
        if (!visited.contains(neighbor)) {
            dfs(neighbor, adj, visited, order);
        }
    }
}`,

  "C++": `void dfs(
    int node,
    unordered_map<int, vector<int>>& adj,
    unordered_set<int>& visited,
    vector<int>& order
) {
    visited.insert(node);
    order.push_back(node);

    for (int neighbor : adj[node]) {
        if (!visited.count(neighbor)) {
            dfs(neighbor, adj, visited, order);
        }
    }
}`,

  "C#": `public static void Dfs(
    int node,
    Dictionary<int, List<int>> adj,
    HashSet<int> visited,
    List<int> order
) {
    visited.Add(node);
    order.Add(node);

    foreach (int neighbor in adj.GetValueOrDefault(node, new List<int>())) {
        if (!visited.Contains(neighbor)) {
            Dfs(neighbor, adj, visited, order);
        }
    }
}`,

  Go: `func DFS(node int, adj map[int][]int, visited map[int]bool, order *[]int) {
    visited[node] = true
    *order = append(*order, node)

    for _, neighbor := range adj[node] {
        if !visited[neighbor] {
            DFS(neighbor, adj, visited, order)
        }
    }
}`,

  Rust: `use std::collections::{HashMap, HashSet};

fn dfs(
    node: i32,
    adj: &HashMap<i32, Vec<i32>>,
    visited: &mut HashSet<i32>,
    order: &mut Vec<i32>,
) {
    visited.insert(node);
    order.push(node);

    if let Some(neighbors) = adj.get(&node) {
        for &neighbor in neighbors {
            if !visited.contains(&neighbor) {
                dfs(neighbor, adj, visited, order);
            }
        }
    }
}`,

  Kotlin: `fun dfs(
    node: Int,
    adj: Map<Int, List<Int>>,
    visited: MutableSet<Int>,
    order: MutableList<Int>
) {
    visited.add(node)
    order.add(node)

    for (neighbor in adj[node].orEmpty()) {
        if (neighbor !in visited) {
            dfs(neighbor, adj, visited, order)
        }
    }
}`,

  Swift: `func dfs(
    _ node: Int,
    _ adj: [Int: [Int]],
    _ visited: inout Set<Int>,
    _ order: inout [Int]
) {
    visited.insert(node)
    order.append(node)

    for neighbor in adj[node, default: []] {
        if !visited.contains(neighbor) {
            dfs(neighbor, adj, &visited, &order)
        }
    }
}`,
};

const LANGUAGES = Object.keys(SNIPPETS);

export default function DFSCodeTabs() {
  const [lang, setLang] = useState("TypeScript");

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {LANGUAGES.map((name) => (
          <button
            key={name}
            onClick={() => setLang(name)}
            className={`border px-3 py-1.5 text-[11px] font-bold tracking-widest transition-colors ${
              lang === name
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:border-primary hover:text-primary"
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      <pre className="terminal-frame overflow-x-auto p-4 text-[12px] md:text-xs leading-relaxed text-foreground">
        <code>{SNIPPETS[lang]}</code>
      </pre>

      <p className="text-sm text-muted-foreground">
        Same DFS pattern, different syntax: mark visited immediately, process the node,
        then recurse into each unvisited neighbor.
      </p>
    </div>
  );
}
