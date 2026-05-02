 "use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type NodeInfo = {
  id: number;
  x: number;
  y: number;
};

type Edge = {
  from: number;
  to: number;
  w: number;
};

type Frame = {
  action: string;
  explanation: string;
  currentNode: number | null;
  distances: (number | string)[];
  visited: number[];
  activeEdge: string | null;
  pseudoHighlights: number[];
};

const nodes: NodeInfo[] = [
  { id: 0, x: 90, y: 70 },
  { id: 1, x: 250, y: 40 },
  { id: 2, x: 260, y: 160 },
  { id: 3, x: 430, y: 80 },
  { id: 4, x: 450, y: 190 },
];

const edges: Edge[] = [
  { from: 0, to: 1, w: 4 },
  { from: 0, to: 2, w: 1 },
  { from: 2, to: 1, w: 2 },
  { from: 1, to: 3, w: 1 },
  { from: 2, to: 3, w: 5 },
  { from: 2, to: 4, w: 8 },
  { from: 3, to: 4, w: 3 },
];

const pseudo = [
  "dist[source] = 0",
  "repeat:",
  "  choose unvisited node with min dist",
  "  mark node visited",
  "  for each outgoing edge:",
  "    relax neighbor if better path found",
  "stop when no reachable unvisited node remains",
];

const SPEEDS = [
  { label: "0.5x", ms: 2200 },
  { label: "1x", ms: 1300 },
  { label: "2x", ms: 750 },
  { label: "4x", ms: 420 },
] as const;

function buildFrames(): Frame[] {
  const frames: Frame[] = [];
  const dist: (number | string)[] = ["∞", "∞", "∞", "∞", "∞"];
  const visited: number[] = [];

  dist[0] = 0;

  frames.push({
    action: "Initialize source",
    explanation: "Set distance of the source node 0 to 0. All other nodes start at infinity.",
    currentNode: 0,
    distances: [...dist],
    visited: [...visited],
    activeEdge: null,
    pseudoHighlights: [0],
  });

  const processOrder = [0, 2, 1, 3, 4];

  const relaxSteps: Record<number, { edge: string; to: number; newDist: number; text: string }[]> = {
    0: [
      { edge: "0-1", to: 1, newDist: 4, text: "Relax edge 0→1: dist[1] becomes 4." },
      { edge: "0-2", to: 2, newDist: 1, text: "Relax edge 0→2: dist[2] becomes 1." },
    ],
    2: [
      { edge: "2-1", to: 1, newDist: 3, text: "Relax edge 2→1: 1 + 2 = 3 improves dist[1]." },
      { edge: "2-3", to: 3, newDist: 6, text: "Relax edge 2→3: dist[3] becomes 6." },
      { edge: "2-4", to: 4, newDist: 9, text: "Relax edge 2→4: dist[4] becomes 9." },
    ],
    1: [
      { edge: "1-3", to: 3, newDist: 4, text: "Relax edge 1→3: 3 + 1 = 4 improves dist[3]." },
    ],
    3: [
      { edge: "3-4", to: 4, newDist: 7, text: "Relax edge 3→4: 4 + 3 = 7 improves dist[4]." },
    ],
    4: [],
  };

  for (const u of processOrder) {
    frames.push({
      action: `Choose node ${u}`,
      explanation: `Among all unvisited nodes, node ${u} currently has the smallest tentative distance, so Dijkstra finalizes it next.`,
      currentNode: u,
      distances: [...dist],
      visited: [...visited],
      activeEdge: null,
      pseudoHighlights: [1, 2],
    });

    visited.push(u);

    frames.push({
      action: `Mark node ${u} visited`,
      explanation: `Node ${u} is now finalized. Its shortest path value will not change again.`,
      currentNode: u,
      distances: [...dist],
      visited: [...visited],
      activeEdge: null,
      pseudoHighlights: [3],
    });

    for (const step of relaxSteps[u]) {
      dist[step.to] = step.newDist;

      frames.push({
        action: `Relax ${step.edge}`,
        explanation: step.text,
        currentNode: u,
        distances: [...dist],
        visited: [...visited],
        activeEdge: step.edge,
        pseudoHighlights: [4, 5],
      });
    }
  }

  frames.push({
    action: "Finish",
    explanation: "All reachable nodes are finalized. Final shortest distances from source 0 are now complete.",
    currentNode: null,
    distances: [...dist],
    visited: [...visited],
    activeEdge: null,
    pseudoHighlights: [6],
  });

  return frames;
}

function edgeKey(a: number, b: number) {
  return `${a}-${b}`;
}

function edgeColor(frame: Frame, a: number, b: number) {
  const k = edgeKey(a, b);
  if (frame.activeEdge === k) return "stroke-cyan-400";
  if (frame.visited.includes(a) && frame.visited.includes(b)) return "stroke-[rgb(57,255,20)]";
  return "stroke-[rgba(120,160,120,0.55)]";
}

function nodeClass(frame: Frame, id: number) {
  if (frame.currentNode === id) return "fill-cyan-500 stroke-cyan-300";
  if (frame.visited.includes(id)) return "fill-[rgb(57,255,20)]/20 stroke-[rgb(57,255,20)]";
  return "fill-[rgba(10,20,10,0.85)] stroke-[rgba(120,160,120,0.55)]";
}

function badgeClass(active: boolean) {
  return active
    ? "border-primary bg-primary/10 text-primary"
    : "border-border bg-background/45 text-muted-foreground";
}

export default function AdvancedGraphsVisualizerPage() {
  const frames = useMemo(() => buildFrames(), []);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState<(typeof SPEEDS)[number]["label"]>("1x");

  const frame = frames[step];
  const progress = ((step + 1) / frames.length) * 100;

  useEffect(() => {
    if (!playing) return;

    const ms = SPEEDS.find((s) => s.label === speed)?.ms ?? 1300;
    const id = setInterval(() => {
      setStep((prev) => {
        if (prev >= frames.length - 1) {
          setPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, ms);

    return () => clearInterval(id);
  }, [playing, speed, frames.length]);

  return (
    <main className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
        <div className="container max-w-[1680px] h-14 px-4 md:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold tracking-widest text-sm">
            <span className="h-3 w-3 bg-primary shadow-[0_0_14px_hsl(var(--primary))]" />
            <span className="text-primary text-glow">DSA.ENGINE</span>
          </Link>

          <div className="flex items-center gap-6 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            <Link href="/learn/advanced-graphs" className="hover:text-primary transition-colors">
              // lesson
            </Link>
            <Link href="/" className="hover:text-primary transition-colors">
              // home
            </Link>
          </div>
        </div>
      </header>

      <div className="container max-w-[1680px] px-4 md:px-6 py-8 md:py-10">
        <div className="text-[10px] uppercase tracking-[0.34em] text-muted-foreground">
          visualize // advanced_graphs
        </div>

        <h1 className="mt-2 text-4xl md:text-6xl font-extrabold leading-[0.95]">
          Advanced Graphs
          <br />
          <span className="text-primary text-glow">Visualizer.</span>
        </h1>

        <p className="mt-5 max-w-5xl text-sm md:text-base leading-8 text-muted-foreground">
          This visualizer steps through Dijkstra’s algorithm. Watch the next cheapest node get
          chosen, then see how edge relaxations update tentative distances across the graph.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/learn/advanced-graphs"
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

        <div className="mt-8 grid gap-5 xl:grid-cols-[minmax(0,1.55fr)_360px]">
          <section className="border border-border bg-card/35">
            <div className="border-b border-border bg-secondary/55 px-5 py-3 text-sm text-muted-foreground">
              ~/visualize/advanced-graphs.ts — step {step + 1}/{frames.length}
            </div>

            <div className="space-y-5 p-5 md:space-y-6 md:p-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="border border-border bg-background/55 px-4 py-4 md:px-5 md:py-5">
                  <div className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                    Current node
                  </div>
                  <div className="mt-3 text-4xl font-bold text-terminal-cyan">
                    {frame.currentNode === null ? "—" : frame.currentNode}
                  </div>
                </div>

                <div className="border border-border bg-background/55 px-4 py-4 md:px-5 md:py-5">
                  <div className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                    Visited count
                  </div>
                  <div className="mt-3 text-4xl font-bold text-primary">
                    {frame.visited.length}
                  </div>
                </div>

                <div className="border border-border bg-background/55 px-4 py-4 md:px-5 md:py-5">
                  <div className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                    Active edge
                  </div>
                  <div className="mt-3 text-3xl font-bold text-foreground">
                    {frame.activeEdge ?? "—"}
                  </div>
                </div>
              </div>

              <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
                <div className="space-y-4">
                  <div className="border border-border bg-background/45 p-5">
                    <div className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                      Current action
                    </div>
                    <div className="mt-3 text-2xl font-bold text-foreground">
                      {frame.action}
                    </div>
                  </div>

                  <div className="border border-border bg-background/45 p-5">
                    <div className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                      Explanation
                    </div>
                    <p className="mt-3 text-sm leading-8 text-muted-foreground">
                      {frame.explanation}
                    </p>
                  </div>
                </div>

                <div className="border border-border bg-background/45 p-5">
                  <div className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                    Distance table
                  </div>

                  <div className="mt-4 space-y-2">
                    {frame.distances.map((d, i) => (
                      <div
                        key={i}
                        className={`flex items-center justify-between border px-3 py-3 text-sm ${
                          frame.currentNode === i
                            ? "border-terminal-cyan bg-terminal-cyan/10 text-terminal-cyan"
                            : frame.visited.includes(i)
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border bg-background/45 text-foreground"
                        }`}
                      >
                        <span>node {i}</span>
                        <span className="font-bold">{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border border-border bg-background/45 p-5">
                <div className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                  Graph view
                </div>

                <div className="mt-4 overflow-x-auto">
                  <svg width="560" height="260" viewBox="0 0 560 260" className="mx-auto">
                    {edges.map((edge) => {
                      const a = nodes.find((n) => n.id === edge.from)!;
                      const b = nodes.find((n) => n.id === edge.to)!;
                      const midX = (a.x + b.x) / 2;
                      const midY = (a.y + b.y) / 2;

                      return (
                        <g key={`${edge.from}-${edge.to}`}>
                          <line
                            x1={a.x}
                            y1={a.y}
                            x2={b.x}
                            y2={b.y}
                            strokeWidth="3"
                            className={edgeColor(frame, edge.from, edge.to)}
                          />
                          <rect
                            x={midX - 14}
                            y={midY - 12}
                            width="28"
                            height="22"
                            fill="rgba(0,0,0,0.85)"
                            stroke="rgba(120,160,120,0.35)"
                          />
                          <text
                            x={midX}
                            y={midY + 5}
                            textAnchor="middle"
                            fontSize="12"
                            fill="rgb(220,220,220)"
                          >
                            {edge.w}
                          </text>
                        </g>
                      );
                    })}

                    {nodes.map((node) => (
                      <g key={node.id}>
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r="28"
                          strokeWidth="3"
                          className={nodeClass(frame, node.id)}
                        />
                        <text
                          x={node.x}
                          y={node.y + 5}
                          textAnchor="middle"
                          fontSize="20"
                          fontWeight="700"
                          fill="white"
                        >
                          {node.id}
                        </text>
                      </g>
                    ))}
                  </svg>
                </div>
              </div>

              <div className="border border-border bg-background/35 p-5">
                <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => {
                        setPlaying(false);
                        setStep((s) => Math.max(0, s - 1));
                      }}
                      disabled={step === 0}
                      className="border border-border bg-background/60 px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-foreground transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      ← PREV
                    </button>

                    <button
                      onClick={() => {
                        setPlaying(false);
                        setStep((s) => Math.min(frames.length - 1, s + 1));
                      }}
                      disabled={step === frames.length - 1}
                      className="border border-primary bg-primary px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      STEP →
                    </button>

                    <button
                      onClick={() => setPlaying((p) => !p)}
                      className="border border-border bg-background/60 px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-foreground transition hover:border-primary hover:text-primary"
                    >
                      {playing ? "PAUSE" : "AUTO PLAY"}
                    </button>

                    <button
                      onClick={() => {
                        setPlaying(false);
                        setStep(0);
                      }}
                      className="border border-border bg-background/60 px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-foreground transition hover:border-primary hover:text-primary"
                    >
                      RESET
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                    <span className="uppercase tracking-[0.25em]">Speed</span>
                    {SPEEDS.map((s) => (
                      <button
                        key={s.label}
                        onClick={() => setSpeed(s.label)}
                        className={`border px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] ${
                          speed === s.label
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border bg-background/55 text-muted-foreground hover:border-primary hover:text-primary"
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-5">
                  <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.28em] text-muted-foreground">
                    <span>Progress</span>
                    <span>{step + 1}/{frames.length}</span>
                  </div>

                  <div className="h-3 overflow-hidden border border-border bg-background/70">
                    <div
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <input
                    type="range"
                    min={0}
                    max={frames.length - 1}
                    value={step}
                    onChange={(e) => {
                      setPlaying(false);
                      setStep(Number(e.target.value));
                    }}
                    className="mt-4 w-full accent-[rgb(57,255,20)]"
                  />
                </div>
              </div>
            </div>
          </section>

          <aside className="space-y-5">
            <div className="border border-border bg-card/35 p-5">
              <div className="text-xs uppercase tracking-[0.34em] text-muted-foreground">
                Pseudocode
              </div>
              <div className="mt-4 space-y-2">
                {pseudo.map((line, i) => {
                  const active = frame.pseudoHighlights.includes(i);
                  return (
                    <div
                      key={i}
                      className={`border px-3 py-3 text-sm ${
                        active
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-border bg-background/45 text-muted-foreground"
                      }`}
                    >
                      <span className="mr-3 font-mono text-primary">{i + 1}</span>
                      {line}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="border border-border bg-card/35 p-5">
              <div className="text-xs uppercase tracking-[0.34em] text-muted-foreground">
                Key rule
              </div>
              <div className="mt-4 space-y-3 text-sm leading-7 text-muted-foreground">
                <div>Dijkstra always expands the unvisited node with minimum tentative distance.</div>
                <div>After that node is finalized, relax all of its outgoing edges.</div>
              </div>
            </div>

            <div className="border border-border bg-card/35 p-5">
              <div className="text-xs uppercase tracking-[0.34em] text-muted-foreground">
                Important warning
              </div>
              <div className="mt-4 space-y-3 text-sm leading-7 text-muted-foreground">
                <div>Dijkstra requires non-negative edge weights.</div>
                <div>If negative edges exist, Bellman-Ford is the safer choice.</div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
