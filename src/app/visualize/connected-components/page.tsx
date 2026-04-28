"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Mode = "DFS" | "BFS";

type GraphNode = {
  id: number;
  x: number;
  y: number;
  label: string;
};

type Edge = [number, number];

type Frame = {
  current: number | null;
  frontier: number[];
  visited: number[];
  order: number[];
  componentCount: number;
  activeComponent: number;
  componentAssignments: Record<number, number>;
  explain: string;
  highlightEdge?: Edge;
};

const NODES: GraphNode[] = [
  { id: 0, x: 16, y: 24, label: "A" },
  { id: 1, x: 32, y: 14, label: "B" },
  { id: 2, x: 34, y: 34, label: "C" },
  { id: 3, x: 18, y: 46, label: "D" },

  { id: 4, x: 60, y: 22, label: "E" },
  { id: 5, x: 74, y: 14, label: "F" },
  { id: 6, x: 76, y: 34, label: "G" },

  { id: 7, x: 58, y: 68, label: "H" },
  { id: 8, x: 76, y: 68, label: "I" },
];

const EDGES: Edge[] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [0, 2],

  [4, 5],
  [5, 6],
  [4, 6],

  [7, 8],
];

const COMPONENT_COLORS = [
  "#39ff14",
  "#00e5ff",
  "#ff4fd8",
  "#ffd166",
  "#8aff80",
];

const adj = (() => {
  const m = new Map<number, number[]>();

  for (const node of NODES) {
    m.set(node.id, []);
  }

  for (const [a, b] of EDGES) {
    m.get(a)!.push(b);
    m.get(b)!.push(a);
  }

  for (const [, neighbors] of m) {
    neighbors.sort((a, b) => a - b);
  }

  return m;
})();

function getLabel(id: number) {
  return NODES.find((n) => n.id === id)?.label ?? String(id);
}

function getComponentColor(componentNumber: number) {
  return COMPONENT_COLORS[
    (componentNumber - 1) % COMPONENT_COLORS.length
  ];
}

function buildFrames(mode: Mode): Frame[] {
  const frames: Frame[] = [];
  const visited = new Set<number>();
  const componentAssignments: Record<number, number> = {};
  const order: number[] = [];
  let componentCount = 0;

  const pushFrame = (
    explain: string,
    current: number | null,
    frontier: number[],
    activeComponent: number,
    highlightEdge?: Edge
  ) => {
    frames.push({
      current,
      frontier: [...frontier],
      visited: [...visited],
      order: [...order],
      componentCount,
      activeComponent,
      componentAssignments: { ...componentAssignments },
      explain,
      highlightEdge,
    });
  };

  for (const start of NODES.map((n) => n.id)) {
    if (visited.has(start)) continue;

    componentCount += 1;

    const frontier: number[] = [start];
    visited.add(start);
    componentAssignments[start] = componentCount;

    pushFrame(
      `Start component ${componentCount} at ${getLabel(start)}. Mark it visited and place it in the ${
        mode === "DFS" ? "stack" : "queue"
      }.`,
      null,
      frontier,
      componentCount
    );

    while (frontier.length > 0) {
      const current =
        mode === "DFS" ? frontier.pop()! : frontier.shift()!;

      order.push(current);

      pushFrame(
        `${mode} selects ${getLabel(current)} from the ${
          mode === "DFS" ? "stack" : "queue"
        } and explores its neighbors.`,
        current,
        frontier,
        componentCount
      );

      for (const neighbor of adj.get(current) ?? []) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          componentAssignments[neighbor] = componentCount;
          frontier.push(neighbor);

          pushFrame(
            `Discover ${getLabel(neighbor)} from ${getLabel(
              current
            )}. It belongs to component ${componentCount}, so mark it visited and ${
              mode === "DFS" ? "push" : "enqueue"
            } it.`,
            current,
            frontier,
            componentCount,
            [current, neighbor]
          );
        }
      }
    }

    pushFrame(
      `Component ${componentCount} is complete. Move to the next unvisited node to start the next component.`,
      null,
      [],
      componentCount
    );
  }

  pushFrame(
    `Traversal finished. Final answer: ${componentCount} connected components.`,
    null,
    [],
    componentCount
  );

  return frames;
}

export default function ConnectedComponentsVisualizerPage() {
  const [mode, setMode] = useState<Mode>("DFS");
  const frames = useMemo(() => buildFrames(mode), [mode]);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    setStep(0);
    setPlaying(false);
  }, [mode]);

  useEffect(() => {
    if (!playing) return;

    const id = window.setInterval(() => {
      setStep((prev) => {
        if (prev >= frames.length - 1) {
          setPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 900);

    return () => window.clearInterval(id);
  }, [playing, frames.length]);

  const frame = frames[step];
  const visitedSet = new Set(frame.visited);
  const frontierSet = new Set(frame.frontier);

  const groups = Array.from(
    { length: frame.componentCount },
    (_, index) => {
      const id = index + 1;
      const nodes = Object.entries(frame.componentAssignments)
        .filter(([, component]) => component === id)
        .map(([nodeId]) => Number(nodeId))
        .sort((a, b) => a - b);

      return { id, nodes };
    }
  );

  return (
    <main className="min-h-screen bg-background text-foreground bg-grid scanlines">
      <header className="border-b border-border/80 bg-background/80 backdrop-blur">
        <div className="container px-4 md:px-8 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="text-xs md:text-sm font-bold tracking-[0.15em] uppercase flex items-center gap-2"
          >
            <span className="inline-block h-3 w-3 bg-primary shadow-[0_0_12px_hsl(var(--primary))]" />
            <span className="text-glow">
              DSA<span className="text-muted-foreground">.</span>ENGINE
            </span>
          </Link>

          <nav className="flex items-center gap-4 text-[11px] uppercase tracking-widest text-muted-foreground">
            <Link href="/learn/connected-components" className="hover:text-primary">
              // lesson
            </Link>
            <Link href="/" className="hover:text-primary">
              // home
            </Link>
          </nav>
        </div>
      </header>

      <section className="container px-4 md:px-8 py-12 md:py-16">
        <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          visualize // connected_components
        </div>

        <h1 className="mt-2 text-4xl md:text-6xl font-extrabold leading-[0.95]">
          Connected Components
          <br />
          <span className="text-primary text-glow">Visualizer.</span>
        </h1>

        <p className="mt-5 max-w-3xl text-sm md:text-base text-muted-foreground leading-relaxed">
          This visualizer shows how <span className="text-foreground">DFS</span> or{" "}
          <span className="text-foreground">BFS</span> discovers one connected
          component at a time. Every time the algorithm finds an unvisited node,
          it starts a brand new traversal and grows that full region before
          moving on.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/learn/connected-components"
            className="border-2 border-primary bg-primary px-5 py-3 text-sm font-bold tracking-widest text-primary-foreground hover:shadow-[0_0_24px_rgba(57,255,20,0.25)]"
          >
            ▶ READ_THE_LESSON
          </Link>

          <Link
            href="/"
            className="border-2 border-border px-5 py-3 text-sm font-bold tracking-widest hover:border-primary hover:text-primary"
          >
            $ back_to_curriculum
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
                  ~/visualize/connected-components.ts — step {step + 1}/{frames.length}
                </span>
              </div>

              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                mode: {mode}
              </div>
            </div>

            <div className="relative aspect-[16/10] bg-background/40 border-b border-border">
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full"
              >
                {EDGES.map(([a, b], idx) => {
                  const nodeA = NODES[a];
                  const nodeB = NODES[b];
                  const compA = frame.componentAssignments[a];
                  const compB = frame.componentAssignments[b];

                  const isHighlighted =
                    frame.highlightEdge &&
                    ((frame.highlightEdge[0] === a && frame.highlightEdge[1] === b) ||
                      (frame.highlightEdge[0] === b && frame.highlightEdge[1] === a));

                  const sameKnownComponent =
                    compA !== undefined && compB !== undefined && compA === compB;

                  const stroke = isHighlighted
                    ? "#ffd166"
                    : sameKnownComponent
                    ? getComponentColor(compA)
                    : "rgba(140, 160, 140, 0.35)";

                  const strokeWidth = isHighlighted ? 0.9 : sameKnownComponent ? 0.6 : 0.35;

                  return (
                    <line
                      key={idx}
                      x1={nodeA.x}
                      y1={nodeA.y}
                      x2={nodeB.x}
                      y2={nodeB.y}
                      stroke={stroke}
                      strokeWidth={strokeWidth}
                      vectorEffect="non-scaling-stroke"
                    />
                  );
                })}

                {NODES.map((node) => {
                  const component = frame.componentAssignments[node.id];
                  const isCurrent = frame.current === node.id;
                  const isVisited = visitedSet.has(node.id);
                  const isInFrontier = frontierSet.has(node.id);

                  const fill = isCurrent
                    ? "#ffd166"
                    : component
                    ? getComponentColor(component)
                    : "rgba(8, 14, 10, 0.95)";

                  const stroke = isCurrent
                    ? "#ffd166"
                    : isInFrontier
                    ? "#00e5ff"
                    : component
                    ? getComponentColor(component)
                    : "rgba(120, 150, 120, 0.5)";

                  const radius = isCurrent ? 4.8 : isVisited ? 4.2 : 3.8;

                  return (
                    <g key={node.id}>
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={radius}
                        fill={fill}
                        stroke={stroke}
                        strokeWidth={isInFrontier ? 0.8 : 0.45}
                        vectorEffect="non-scaling-stroke"
                        className={isCurrent ? "animate-pulse" : ""}
                      />
                      <text
                        x={node.x}
                        y={node.y + 1.4}
                        textAnchor="middle"
                        fontSize={3}
                        fontFamily="JetBrains Mono, monospace"
                        fontWeight={800}
                        fill={isVisited || isCurrent ? "#050805" : "rgba(210, 225, 210, 0.85)"}
                      >
                        {node.label}
                      </text>
                    </g>
                  );
                })}
              </svg>

              <div className="absolute bottom-3 left-3 flex flex-wrap gap-3 font-mono text-[10px] text-muted-foreground">
                <span>
                  <span className="mr-1 text-[#ffd166]">●</span>current
                </span>
                <span>
                  <span className="mr-1 text-[#00e5ff]">○</span>
                  {mode === "DFS" ? "in stack" : "in queue"}
                </span>
                <span>
                  <span className="mr-1 text-primary">■</span>component color
                </span>
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
                    mode
                  </div>
                  <div className="mt-2 text-lg font-bold text-foreground">{mode}</div>
                </div>

                <div className="border border-border bg-background/50 p-3">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    components found
                  </div>
                  <div className="mt-2 text-lg font-bold text-primary">
                    {frame.componentCount}
                  </div>
                </div>

                <div className="border border-border bg-background/50 p-3">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    visited nodes
                  </div>
                  <div className="mt-2 text-lg font-bold text-foreground">
                    {frame.visited.length}/{NODES.length}
                  </div>
                </div>

                <div className="border border-border bg-background/50 p-3">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    traversal order
                  </div>
                  <div className="mt-2 text-lg font-bold text-foreground">
                    {frame.order.length}
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

                <button
                  onClick={() => setMode("DFS")}
                  className={`border px-4 py-2 text-xs font-bold tracking-widest ${
                    mode === "DFS"
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border hover:border-primary hover:text-primary"
                  }`}
                >
                  DFS
                </button>

                <button
                  onClick={() => setMode("BFS")}
                  className={`border px-4 py-2 text-xs font-bold tracking-widest ${
                    mode === "BFS"
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border hover:border-primary hover:text-primary"
                  }`}
                >
                  BFS
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="terminal-frame p-4">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
                {mode === "DFS" ? "stack" : "queue"} state
              </div>

              <div className="border border-border bg-background/60 p-3 min-h-[72px] flex items-center gap-2 flex-wrap">
                {frame.frontier.length === 0 ? (
                  <span className="text-muted-foreground text-sm">(empty)</span>
                ) : (
                  frame.frontier.map((id, index) => (
                    <span
                      key={`${id}-${index}`}
                      className="inline-flex h-10 min-w-[40px] px-3 items-center justify-center border border-cyan-400 bg-cyan-400/10 text-cyan-300 text-sm font-bold"
                    >
                      {getLabel(id)}
                    </span>
                  ))
                )}
              </div>

              <div className="mt-3 text-xs text-muted-foreground leading-relaxed">
                {mode === "DFS"
                  ? "DFS uses a stack (LIFO): the last discovered node is explored next."
                  : "BFS uses a queue (FIFO): the earliest discovered node is explored next."}
              </div>
            </div>

            <div className="terminal-frame p-4">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
                traversal order
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
                      {getLabel(id)}
                    </span>
                  ))
                )}
              </div>
            </div>

            <div className="terminal-frame p-4">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
                discovered components
              </div>

              <div className="space-y-3">
                {groups.length === 0 ? (
                  <div className="text-sm text-muted-foreground">(no components discovered yet)</div>
                ) : (
                  groups.map((group) => (
                    <div
                      key={group.id}
                      className="border border-border bg-background/60 p-3"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="inline-block h-3 w-3"
                          style={{
                            backgroundColor: getComponentColor(group.id),
                            boxShadow: `0 0 12px ${getComponentColor(group.id)}`,
                          }}
                        />
                        <span className="text-sm font-bold text-foreground">
                          Component {group.id}
                        </span>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {group.nodes.map((nodeId) => (
                          <span
                            key={nodeId}
                            className="inline-flex h-8 min-w-[36px] px-2 items-center justify-center border text-xs font-bold"
                            style={{
                              borderColor: getComponentColor(group.id),
                              color: getComponentColor(group.id),
                              backgroundColor: "rgba(0,0,0,0.25)",
                            }}
                          >
                            {getLabel(nodeId)}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="terminal-frame p-4">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
                what this teaches
              </div>

              <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                <p>
                  1. Outer loop scans every node.
                </p>
                <p>
                  2. If a node is still unvisited, that means a new connected component starts there.
                </p>
                <p>
                  3. DFS/BFS then fully explores that whole region.
                </p>
                <p>
                  4. Every time a fresh traversal starts, the component count increases by 1.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
