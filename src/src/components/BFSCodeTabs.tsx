"use client";

import { useState } from "react";

const SNIPPETS: Record<string, string> = {
  TypeScript: `function bfs(
  start: number,
  adj: Map<number, number[]>
): number[] {
  const order: number[] = [];
  const visited = new Set<number>([start]);
  const queue: number[] = [start];

  while (queue.length > 0) {
    const node = queue.shift()!;
    order.push(node);

    for (const neighbor of adj.get(node) ?? []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }

  return order;
}`,

  JavaScript: `function bfs(start, adj) {
  const order = [];
  const visited = new Set([start]);
  const queue = [start];

  while (queue.length > 0) {
    const node = queue.shift();
    order.push(node);

    for (const neighbor of adj.get(node) || []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }

  return order;
}`,

  Python: `from collections import deque

def bfs(start, adj):
    order = []
    visited = {start}
    queue = deque([start])

    while queue:
        node = queue.popleft()
        order.append(node)

        for neighbor in adj.get(node, []):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)

    return order`,

  Java: `import java.util.*;

public static List<Integer> bfs(int start, Map<Integer, List<Integer>> adj) {
    List<Integer> order = new ArrayList<>();
    Set<Integer> visited = new HashSet<>();
    Queue<Integer> queue = new LinkedList<>();

    visited.add(start);
    queue.offer(start);

    while (!queue.isEmpty()) {
        int node = queue.poll();
        order.add(node);

        for (int neighbor : adj.getOrDefault(node, Collections.emptyList())) {
            if (!visited.contains(neighbor)) {
                visited.add(neighbor);
                queue.offer(neighbor);
            }
        }
    }

    return order;
}`,

  "C++": `#include <vector>
#include <queue>
#include <unordered_set>
#include <unordered_map>
using namespace std;

vector<int> bfs(int start, unordered_map<int, vector<int>>& adj) {
    vector<int> order;
    unordered_set<int> visited;
    queue<int> q;

    visited.insert(start);
    q.push(start);

    while (!q.empty()) {
        int node = q.front();
        q.pop();
        order.push_back(node);

        for (int neighbor : adj[node]) {
            if (!visited.count(neighbor)) {
                visited.insert(neighbor);
                q.push(neighbor);
            }
        }
    }

    return order;
}`,

  "C#": `using System.Collections.Generic;

public static List<int> Bfs(int start, Dictionary<int, List<int>> adj) {
    var order = new List<int>();
    var visited = new HashSet<int> { start };
    var queue = new Queue<int>();
    queue.Enqueue(start);

    while (queue.Count > 0) {
        int node = queue.Dequeue();
        order.Add(node);

        foreach (int neighbor in adj.GetValueOrDefault(node, new List<int>())) {
            if (!visited.Contains(neighbor)) {
                visited.Add(neighbor);
                queue.Enqueue(neighbor);
            }
        }
    }

    return order;
}`,

  Go: `func BFS(start int, adj map[int][]int) []int {
    order := []int{}
    visited := map[int]bool{start: true}
    queue := []int{start}

    for len(queue) > 0 {
        node := queue[0]
        queue = queue[1:]
        order = append(order, node)

        for _, neighbor := range adj[node] {
            if !visited[neighbor] {
                visited[neighbor] = true
                queue = append(queue, neighbor)
            }
        }
    }

    return order
}`,

  Rust: `use std::collections::{HashMap, HashSet, VecDeque};

fn bfs(start: i32, adj: &HashMap<i32, Vec<i32>>) -> Vec<i32> {
    let mut order = Vec::new();
    let mut visited = HashSet::new();
    let mut queue = VecDeque::new();

    visited.insert(start);
    queue.push_back(start);

    while let Some(node) = queue.pop_front() {
        order.push(node);

        if let Some(neighbors) = adj.get(&node) {
            for &neighbor in neighbors {
                if !visited.contains(&neighbor) {
                    visited.insert(neighbor);
                    queue.push_back(neighbor);
                }
            }
        }
    }

    order
}`,

  Kotlin: `fun bfs(start: Int, adj: Map<Int, List<Int>>): List<Int> {
    val order = mutableListOf<Int>()
    val visited = mutableSetOf(start)
    val queue: ArrayDeque<Int> = ArrayDeque()
    queue.add(start)

    while (queue.isNotEmpty()) {
        val node = queue.removeFirst()
        order.add(node)

        for (neighbor in adj[node].orEmpty()) {
            if (neighbor !in visited) {
                visited.add(neighbor)
                queue.add(neighbor)
            }
        }
    }

    return order
}`,

  Swift: `func bfs(_ start: Int, _ adj: [Int: [Int]]) -> [Int] {
    var order: [Int] = []
    var visited: Set<Int> = [start]
    var queue: [Int] = [start]

    while !queue.isEmpty {
        let node = queue.removeFirst()
        order.append(node)

        for neighbor in adj[node, default: []] {
            if !visited.contains(neighbor) {
                visited.insert(neighbor)
                queue.append(neighbor)
            }
        }
    }

    return order
}`,
};

const LANGUAGES = Object.keys(SNIPPETS);

export default function BFSCodeTabs() {
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
        Same BFS pattern, different syntax: initialize <span className="text-primary">visited</span>,
        initialize a <span className="text-primary">queue</span>, process nodes level by level,
        and mark nodes visited when you enqueue them.
      </p>
    </div>
  );
}
