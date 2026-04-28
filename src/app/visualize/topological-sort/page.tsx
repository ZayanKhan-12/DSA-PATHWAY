"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type GraphNode = {
  id: number;
  label: string;
  x: number;
  y: number;
};

type Edge = [number, number];

type Frame = {
  current: number | null;
  queue: number[];
  indegree: number[];
  order: number[];
  processed: boolean[];
  explain: string;
  highlightEdge?: Edge;
  cycleDetected: boolean;
};

const NODES: GraphNode[] = [
  { id: 0, label: "A", x: 14, y: 18 },
  { id: 1, label: "B", x: 38, y: 18 },
  { id: 2, label: "C", x: 62, y: 18 },
  { id: 3, label: "D", x: 26, y: 48 },
  { id: 4, label: "E", x: 50, y: 48 },
  { id: 5, label: "F", x: 74, y: 48 },
  { id: 6, label: "G", x: 38, y: 78 },
  { id: 7, label: "H", x: 62, y: 78 },
];

const EDGES: Edge[] = [
  [0, 3], // A -> D
  [1, 3], // B -> D
  [1, 4], // B -> E
  [2, 4], // C -> E
  [2, 5], // C -> F
  [3, 6], // D -> G
  [4, 6], // E -> G
  [4, 7], // E -> H
  [5, 7], // F -> H
];

function buildAdjacency(n: number, edges: Edge[]) {
  const adj = new Map<number, number[]>();
  for (let i = 0; i < n; i++) adj.set(i, []);
  for (const [u, v] of edges) adj.get(u)!.push(v);
  return adj;
}

function buildInitialIndegree(n: number, edges: Edge[]) {
  const indegree = new Array(n).fill(0);
  for (const [, v] of edges) indegree[v]++;
  return indegree;
}

function buildFrames() {
  const n = NODES.length;
  const adj = buildAdjacency(n, EDGES);
  const indegree = buildInitialIndegree(n, EDGES);
  const queue: number[] = [];
  const order: number[] = [];
  const processed = new Array(n).fill(false);
  const frames: Frame[] = [];

  const pushFrame = (
    explain: string,
    current: number | null = null,
    highlightEdge?: Edge,
    cycleDetected = false
  ) => {
    frames.push({
      current,
      queue: [...queue],
      indegree: [...indegree],
      order: [...order],
      processed: [...processed],
      explain,
      highlightEdge,
      cycleDetected,
    });
  };

  pushFrame(
    "Initialize indegree for every node by counting incoming edges. Nodes with indegree 0 can be processed immediately."
  );

  for (let node = 0; node < n; node++) {
    if (indegree[node] === 0) {
      queue.push(node);
      pushFrame(
        `${NODES[node].label} has indegree 0, so it is safe to add to the queue.`,
        null
      );
    }
  }

  let head = 0;

  while (head < queue.length) {
    const node = queue[head++];
    processed[node] = true;

    pushFrame(
      `Pop ${NODES[node].label} from the queue. It is now the next valid node in topological order.`,
      node
    );

    order.push(node);

    pushFrame(
      `Append ${NODES[node].label} to the output ordering.`,
      node
    );

    for (const neighbor of adj.get(node) ?? []) {
      indegree[neighbor]--;

      pushFrame(
        `Remove edge ${NODES[node].label} → ${NODES[neighbor].label}. This decreases indegree(${NODES[neighbor].label}) by 1.`,
        node,
        [node, neighbor]
      );

      if (indegree[neighbor] === 0) {
        queue.push(neighbor);

        pushFrame(
          `${NODES[neighbor].label} now has indegree 0, so it becomes available and is added to the queue.`,
          node,
          [node, neighbor]
        );
      }
    }
  }

  const cycleDetected = order.length !== n;

  if (cycleDetected) {
    pushFrame(
      "The queue is empty before all nodes were processed. That means a cycle exists, so no valid topological ordering is possible.",
      null,
      undefined,
      true
    );
  } else {
    pushFrame(
      `Finished. A valid topological order is ${order
        .map((id) => NODES[id].label)
        .join(" → ")}.`,
      null
    );
  }

  return frames;
}

function ArrowEdge({
  from,
  to,
  highlighted,
  dimmed,
}: {
  from: GraphNode;
  to: GraphNode;
  highlighted: boolean;
  dimmed: boolean;
}) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const length = Math.sqrt(dx * dx + dy * dy) || 1;
  const ux = dx / length;
  const uy = dy / length;

  const startX = from.x + ux * 5;
  const startY = from.y + uy * 5;
  const endX = to.x - ux * 5.5;
  const endY = to.y - uy * 5.5;

  const arrowSize = 1.8;
  const leftX = endX - ux * arrowSize - uy * arrowSize;
  const leftY = endY - uy * arrowSize + ux * arrowSize;
  const rightX = endX - ux * arrowSize + uy * arrowSize;
  const rightY = endY - uy * arrowSize - ux * arrowSize;

  const color = highlighted
    ? "#ffd166"
    : dimmed
    ? "rgba(120,160,120,0.25)"
    : "rgba(57,255,20,0.65)";

  const width = highlighted ? 0.7 : 0.38;

  return (
    <>
      <line
        x1={startX}
        y1={startY}
        x2={endX}
        y2={endY}
        stroke={color}
        strokeWidth={width}
        vectorEffect="non-scaling-stroke"
      />
      <polygon
        points={`${endX},${endY} ${leftX},${leftY} ${rightX},${rightY}`}
        fill={color}
      />
    </>
  );
}

export default function TopologicalSortVisualizerPage() {
  const frames = useMemo(() => buildFrames(), []);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  const frame = frames[step];

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setStep((prev) => {
        if (prev >= frames.length - 1) {
          setPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 950);

    return () => window.clearInterval(timer);
  }, [playing, frames.length]);

  const queueVisible = frame.queue.slice(frame.processed.filter(Boolean).length - frame.order.length);

  return (
    <main className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
        <div className="container px-4 md:px-8 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold tracking-widest text-sm">
            <span className="h-3 w-3 bg-primary shadow-[0_0_14px_hsl(var(--primary))]" />
            <span className="text-primary text-glow">DSA.ENGINE</span>
          </Link>

          <div className="flex items-center gap-6 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            <Link href="/learn/topological-sort" className="hover:text-primary transition-colors">
              // lesson
            </Link>
            <Link href="/" className="hover:text-primary transition-colors">
              // home
            </Link>
          </div>
        </div>
      </header>

      <div className="container px-4 md:px-8 py-12 md:py-16">
        <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          visualize // topological_sort
        </div>

        <h1 className="mt-2 text-4xl md:text-6xl font-extrabold leading-[0.95]">
          Topological Sort
          <br />
          <span className="text-primary text-glow">Visualizer.</span>
        </h1>

        <p className="mt-5 max-w-3xl text-sm md:text-base text-muted-foreground leading-relaxed">
          This shows <span className="text-foreground">Kahn’s Algorithm</span> step by step:
          compute indegrees, queue all indegree-0 nodes, pop one, append it to the order,
          remove its outgoing edges, and unlock newly available nodes.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/learn/topological-sort"
            className="border-2 border-primary bg-primary px-5 py-3 text-sm font-bold tracking-[0.25em] text-black hover:opacity-90"
          >
            ▶ READ_THE_LESSON
          </Link>
<Link
            href="/"
            className="border-2 border-border px-5 py-3 text-sm font-bold tracking-[0.25em] text-foreground hover:border-primary hover:text-primary transition-colors"
          >
            $ BACK_TO_HOME
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 xl:grid-cols-[1.35fr_0.95fr] gap-8">
          <div className="terminal-frame overflow-hidden">
            <div className="flex items-center justify-between border-b border-border bg-secondary/60 px-3 py-2 text-xs">
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-destructive/70" />
                <span className="h-2 w-2 rounded-full bg-yellow-500/70" />
                <span className="h-2 w-2 rounded-full bg-primary/70" />
                <span className="ml-3">
                  ~/visualize/topological-sort.ts — step {step + 1}/{frames.length}
                </span>
              </div>

              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                kahn_algorithm
              </div>
            </div>

            <div className="relative aspect-[16/10] bg-background/40 border-b border-border">
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full"
              >
                {EDGES.map(([u, v], idx) => {
                  const from = NODES[u];
                  const to = NODES[v];
                  const highlighted =
                    !!frame.highlightEdge &&
                    frame.highlightEdge[0] === u &&
                    frame.highlightEdge[1] === v;

                  const dimmed = frame.processed[u];

                  return (
                    <ArrowEdge
                      key={idx}
                      from={from}
                      to={to}
                      highlighted={highlighted}
                      dimmed={dimmed}
                    />
                  );
                })}

                {NODES.map((node) => {
                  const isCurrent = frame.current === node.id;
                  const inQueue = frame.queue.includes(node.id) && !frame.processed[node.id];
                  const isProcessed = frame.processed[node.id];

                  const fill = isCurrent
                    ? "#ffd166"
                    : isProcessed
                    ? "#39ff14"
                    : inQueue
                    ? "#00e5ff"
                    : "rgba(8,14,10,0.95)";

                  const stroke = isCurrent
                    ? "#ffd166"
                    : isProcessed
                    ? "#39ff14"
                    : inQueue
                    ? "#00e5ff"
                    : "rgba(120,150,120,0.5)";

                  const textColor = isCurrent || isProcessed || inQueue
                    ? "#050805"
                    : "rgba(210,225,210,0.85)";

                  return (
                    <g key={node.id}>
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={isCurrent ? 4.9 : 4.3}
                        fill={fill}
                        stroke={stroke}
                        strokeWidth={0.5}
                      />
                      <text
                        x={node.x}
                        y={node.y + 1.2}
                        textAnchor="middle"
                        fontSize={3}
                        fontFamily="JetBrains Mono, monospace"
                        fontWeight={800}
                        fill={textColor}
                      >
                        {node.label}
                      </text>

                      <text
                        x={node.x}
                        y={node.y + 8.2}
                        textAnchor="middle"
                        fontSize={2.6}
                        fontFamily="JetBrains Mono, monospace"
                        fill="rgba(220,235,220,0.8)"
                      >
                        in:{frame.indegree[node.id]}
                      </text>
                    </g>
                  );
                })}
              </svg>

              <div className="absolute bottom-3 left-3 flex flex-wrap gap-3 font-mono text-[10px] text-muted-foreground">
                <span><span className="mr-1 text-[#ffd166]">●</span>current</span>
                <span><span className="mr-1 text-[#00e5ff]">●</span>in queue</span>
                <span><span className="mr-1 text-[#39ff14]">●</span>processed</span>
              </div>
            </div>

            <div className="p-4 md:p-5 space-y-4">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
                  explanation
                </div>
                <div className="border border-border bg-background/60 p-4 text-sm leading-relaxed text-muted-foreground">
                  {frame.explain}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="border border-border bg-background/50 p-3">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    queue size
                  </div>
                  <div className="mt-2 text-lg font-bold text-foreground">
                    {frame.queue.filter((id) => !frame.processed[id]).length}
                  </div>
                </div>

                <div className="border border-border bg-background/50 p-3">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    processed
                  </div>
                  <div className="mt-2 text-lg font-bold text-primary">
                    {frame.order.length}/{NODES.length}
                  </div>
                </div>

                <div className="border border-border bg-background/50 p-3">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    current
                  </div>
                  <div className="mt-2 text-lg font-bold text-foreground">
                    {frame.current === null ? "—" : NODES[frame.current].label}
                  </div>
                </div>

                <div className="border border-border bg-background/50 p-3">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    cycle
                  </div>
                  <div className={`mt-2 text-lg font-bold ${frame.cycleDetected ? "text-red-400" : "text-primary"}`}>
                    {frame.cycleDetected ? "YES" : "NO"}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => {
                    setPlaying(false);
                    setStep((prev) => Math.max(0, prev - 1));
                  }}
                  className="border border-border px-4 py-2 text-xs font-bold tracking-widest hover:border-primary hover:text-primary disabled:opacity-40"
                  disabled={step === 0}
                >
                  ← PREV
                </button>

                <button
                  onClick={() => {
                    setPlaying(false);
                    setStep((prev) => Math.min(frames.length - 1, prev + 1));
                  }}
                  className="border border-primary bg-primary/10 px-4 py-2 text-xs font-bold tracking-widest text-primary hover:bg-primary hover:text-primary-foreground disabled:opacity-40"
                  disabled={step === frames.length - 1}
                >
                  STEP →
                </button>

                <button
                  onClick={() => setPlaying((prev) => !prev)}
                  className="border border-border px-4 py-2 text-xs font-bold tracking-widest hover:border-primary hover:text-primary"
                >
                  {playing ? "PAUSE" : "AUTO PLAY"}
                </button>

                <button
                  onClick={() => {
                    setPlaying(false);
                    setStep(0);
                  }}
                  className="border border-border px-4 py-2 text-xs font-bold tracking-widest hover:border-primary hover:text-primary"
                >
                  RESET
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="terminal-frame p-4">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
                queue state
              </div>

              <div className="border border-border bg-background/60 p-3 min-h-[72px] flex items-center gap-2 flex-wrap">
                {frame.queue.filter((id) => !frame.processed[id]).length === 0 ? (
                  <span className="text-muted-foreground text-sm">(empty)</span>
                ) : (
                  frame.queue
                    .filter((id) => !frame.processed[id])
                    .map((id, index) => (
                      <span
                        key={`${id}-${index}`}
                        className="inline-flex h-10 min-w-[40px] px-3 items-center justify-center border border-cyan-400 bg-cyan-400/10 text-cyan-300 text-sm font-bold"
                      >
                        {NODES[id].label}
                      </span>
                    ))
                )}
              </div>

              <div className="mt-3 text-xs text-muted-foreground leading-relaxed">
                Only indegree-0 nodes are allowed inside the queue.
              </div>
            </div>

            <div className="terminal-frame p-4">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
                current output order
              </div>

              <div className="border border-border bg-background/60 p-3 min-h-[72px] flex items-center gap-2 flex-wrap">
                {frame.order.length === 0 ? (
                  <span className="text-muted-foreground text-sm">(none yet)</span>
                ) : (
                  frame.order.map((id, index) => (
                    <span
                      key={`${id}-${index}`}
                      className="inline-flex h-10 min-w-[40px] px-3 items-center justify-center border border-primary bg-primary/10 text-primary text-sm font-bold"
                    >
                      {NODES[id].label}
                    </span>
                  ))
                )}
              </div>
            </div>

            <div className="terminal-frame p-4">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
                indegree table
              </div>

              <div className="space-y-2">
                {NODES.map((node) => (
                  <div
                    key={node.id}
                    className="flex items-center justify-between border border-border bg-background/60 px-3 py-2 text-sm"
                  >
                    <span className="font-bold text-foreground">
                      {node.label}
                    </span>
                    <span className={frame.indegree[node.id] === 0 ? "text-primary font-bold" : "text-muted-foreground"}>
                      indegree = {frame.indegree[node.id]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="terminal-frame p-4">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
                what this teaches
              </div>

              <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                <p>1. Nodes with indegree 0 are currently legal to process.</p>
                <p>2. Removing a node simulates finishing that prerequisite.</p>
                <p>3. Decrementing neighbors unlocks future work.</p>
                <p>4. If processed nodes &lt; V at the end, a cycle exists.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
