"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Node = { id: number; x: number; y: number; label: string };
type Edge = [number, number];

const NODES: Node[] = [
  { id: 0, x: 50, y: 12, label: "A" },
  { id: 1, x: 22, y: 36, label: "B" },
  { id: 2, x: 78, y: 36, label: "C" },
  { id: 3, x: 10, y: 64, label: "D" },
  { id: 4, x: 36, y: 64, label: "E" },
  { id: 5, x: 64, y: 64, label: "F" },
  { id: 6, x: 90, y: 64, label: "G" },
  { id: 7, x: 28, y: 90, label: "H" },
  { id: 8, x: 72, y: 90, label: "I" },
];

const EDGES: Edge[] = [
  [0, 1], [0, 2],
  [1, 3], [1, 4],
  [2, 5], [2, 6],
  [4, 7], [5, 8],
];

const adj = (() => {
  const m = new Map<number, number[]>();
  NODES.forEach((n) => m.set(n.id, []));
  EDGES.forEach(([a, b]) => {
    m.get(a)!.push(b);
    m.get(b)!.push(a);
  });
  return m;
})();

type Frame = {
  queue: number[];
  visited: number[];
  current: number | null;
  explain: string;
  highlightEdge?: [number, number];
};

function buildFrames(start = 0): Frame[] {
  const frames: Frame[] = [];
  const visited: number[] = [start];
  const queue: number[] = [start];

  frames.push({
    queue: [...queue],
    visited: [...visited],
    current: null,
    explain: `Initialize: push start node ${NODES[start].label} into the queue and mark it visited.`,
  });

  while (queue.length) {
    const v = queue.shift()!;
    frames.push({
      queue: [...queue],
      visited: [...visited],
      current: v,
      explain: `Dequeue ${NODES[v].label}. Now explore every unvisited neighbor.`,
    });

    for (const n of adj.get(v)!) {
      if (!visited.includes(n)) {
        visited.push(n);
        queue.push(n);
        frames.push({
          queue: [...queue],
          visited: [...visited],
          current: v,
          highlightEdge: [v, n],
          explain: `Visit neighbor ${NODES[n].label}: mark visited, enqueue. Queue grows: [${queue.map(i => NODES[i].label).join(", ")}].`,
        });
      }
    }
  }

  frames.push({
    queue: [],
    visited: [...visited],
    current: null,
    explain: `Queue is empty → BFS complete. Visit order: ${visited.map(i => NODES[i].label).join(" → ")}.`,
  });

  return frames;
}

export function BFSStepper() {
  const frames = useMemo(() => buildFrames(0), []);
  const [i, setI] = useState(0);
  const f = frames[i];

  const visitedSet = new Set(f.visited);
  const queueSet = new Set(f.queue);

  return (
    <div className="terminal-frame scanlines overflow-hidden">
      <div className="flex items-center justify-between border-b border-border bg-secondary/60 px-3 py-2 text-xs">
        <div className="flex items-center gap-2 text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-destructive/70" />
          <span className="h-2 w-2 rounded-full bg-terminal-amber/70" />
          <span className="h-2 w-2 rounded-full bg-primary/70" />
          <span className="ml-3">~/visualize/bfs.ts — step {i + 1}/{frames.length}</span>
        </div>
        <Link href="/" className="text-[10px] uppercase tracking-widest text-muted-foreground hover:text-primary">
          ← home
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr]">
        <div className="relative aspect-[4/3] bg-background/40 border-b lg:border-b-0 lg:border-r border-border">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
            {EDGES.map(([a, b], idx) => {
              const A = NODES[a];
              const B = NODES[b];
              const both = visitedSet.has(a) && visitedSet.has(b);
              const isHighlight =
                f.highlightEdge &&
                ((f.highlightEdge[0] === a && f.highlightEdge[1] === b) ||
                 (f.highlightEdge[0] === b && f.highlightEdge[1] === a));

              return (
                <line
                  key={idx}
                  x1={A.x}
                  y1={A.y}
                  x2={B.x}
                  y2={B.y}
                  stroke={isHighlight ? "hsl(var(--terminal-amber))" : both ? "hsl(var(--primary))" : "hsl(var(--border))"}
                  strokeWidth={isHighlight ? 0.7 : both ? 0.5 : 0.3}
                  vectorEffect="non-scaling-stroke"
                />
              );
            })}

            {NODES.map((n) => {
              const visited = visitedSet.has(n.id);
              const inQueue = queueSet.has(n.id);
              const isCurrent = f.current === n.id;
              const fill = isCurrent
                ? "hsl(var(--terminal-amber))"
                : visited
                ? "hsl(var(--primary))"
                : "hsl(var(--card))";

              return (
                <g key={n.id}>
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={isCurrent ? 4.6 : 3.6}
                    fill={fill}
                    stroke={inQueue ? "hsl(var(--terminal-cyan))" : visited ? "hsl(var(--primary))" : "hsl(var(--border))"}
                    strokeWidth={inQueue ? 0.6 : 0.4}
                    vectorEffect="non-scaling-stroke"
                    className={isCurrent ? "animate-pulse-node" : ""}
                    style={{ transformBox: "fill-box", transformOrigin: "center" }}
                  />
                  <text
                    x={n.x}
                    y={n.y + 1.3}
                    textAnchor="middle"
                    fontSize={3}
                    fontFamily="JetBrains Mono"
                    fontWeight={700}
                    fill={visited || isCurrent ? "hsl(var(--primary-foreground))" : "hsl(var(--muted-foreground))"}
                  >
                    {n.label}
                  </text>
                </g>
              );
            })}
          </svg>

          <div className="absolute bottom-2 left-3 font-mono text-[10px] text-muted-foreground space-x-3">
            <span><span className="text-terminal-amber">●</span> current</span>
            <span><span className="text-primary">●</span> visited</span>
            <span><span className="text-terminal-cyan">○</span> in queue</span>
          </div>
        </div>

        <div className="bg-card/60 p-4 text-xs flex flex-col">
          <div className="mb-3">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">queue (FIFO)</div>
            <div className="border border-border bg-background/60 p-2 min-h-[44px] flex items-center gap-1 flex-wrap">
              {f.queue.length === 0 ? (
                <span className="text-muted-foreground text-[11px]">(empty)</span>
              ) : (
                f.queue.map((id, idx) => (
                  <span key={idx} className="inline-flex h-7 w-7 items-center justify-center border border-terminal-cyan bg-terminal-cyan/10 text-terminal-cyan text-[11px] font-bold">
                    {NODES[id].label}
                  </span>
                ))
              )}
              <span className="ml-auto text-[10px] text-muted-foreground">← front</span>
            </div>
          </div>

          <div className="mb-3">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">visited[]</div>
            <div className="border border-border bg-background/60 p-2 min-h-[44px] flex items-center gap-1 flex-wrap">
              {f.visited.map((id, idx) => (
                <span key={idx} className="inline-flex h-7 w-7 items-center justify-center border border-primary bg-primary/15 text-primary text-[11px] font-bold">
                  {NODES[id].label}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-3">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">current</div>
            <div className="border border-border bg-background/60 p-2 text-[13px] font-bold text-terminal-amber">
              {f.current === null ? "—" : NODES[f.current].label}
            </div>
          </div>

          <div className="flex-1">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">// explain</div>
            <div className="border-l-2 border-primary bg-background/40 p-3 text-[12px] leading-relaxed text-foreground">
              {f.explain}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            <button
              onClick={() => setI(Math.max(0, i - 1))}
              disabled={i === 0}
              className="border border-border px-2 py-2 text-[10px] font-bold tracking-widest text-muted-foreground hover:border-primary hover:text-primary disabled:opacity-30"
            >
              ← PREV
            </button>
            <button
              onClick={() => setI(Math.min(frames.length - 1, i + 1))}
              disabled={i === frames.length - 1}
              className="border border-primary bg-primary/10 px-2 py-2 text-[10px] font-bold tracking-widest text-primary hover:bg-primary hover:text-primary-foreground disabled:opacity-30"
            >
              STEP →
            </button>
            <button
              onClick={() => setI(0)}
              className="border border-border px-2 py-2 text-[10px] font-bold tracking-widest text-muted-foreground hover:border-terminal-amber hover:text-terminal-amber"
            >
              ↻ RESET
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
