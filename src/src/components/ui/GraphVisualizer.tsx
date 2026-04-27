import { useEffect, useRef, useState } from "react";

type Node = { id: number; x: number; y: number };
type Edge = [number, number];

const NODES: Node[] = [
  { id: 0, x: 50, y: 15 },
  { id: 1, x: 22, y: 38 },
  { id: 2, x: 78, y: 38 },
  { id: 3, x: 10, y: 65 },
  { id: 4, x: 36, y: 65 },
  { id: 5, x: 64, y: 65 },
  { id: 6, x: 90, y: 65 },
  { id: 7, x: 28, y: 88 },
  { id: 8, x: 72, y: 88 },
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

function bfsOrder(start = 0): number[] {
  const order: number[] = [];
  const seen = new Set<number>([start]);
  const q = [start];
  while (q.length) {
    const v = q.shift()!;
    order.push(v);
    for (const n of adj.get(v)!) {
      if (!seen.has(n)) { seen.add(n); q.push(n); }
    }
  }
  return order;
}

function dfsOrder(start = 0): number[] {
  const order: number[] = [];
  const seen = new Set<number>();
  const dfs = (v: number) => {
    seen.add(v);
    order.push(v);
    for (const n of adj.get(v)!) if (!seen.has(n)) dfs(n);
  };
  dfs(start);
  return order;
}

export const GraphVisualizer = () => {
  const [algo, setAlgo] = useState<"BFS" | "DFS">("BFS");
  const [step, setStep] = useState(0);
  const [running, setRunning] = useState(true);
  const intervalRef = useRef<number | null>(null);

  const order = algo === "BFS" ? bfsOrder() : dfsOrder();
  const visitedSet = new Set(order.slice(0, step));
  const current = step > 0 ? order[step - 1] : null;

  useEffect(() => {
    if (!running) return;
    intervalRef.current = window.setInterval(() => {
      setStep((s) => (s >= order.length ? 0 : s + 1));
    }, 700);
    return () => { if (intervalRef.current) window.clearInterval(intervalRef.current); };
  }, [running, algo, order.length]);

  const switchAlgo = (a: "BFS" | "DFS") => {
    setAlgo(a);
    setStep(0);
  };

  return (
    <div className="terminal-frame scanlines overflow-hidden">
      {/* title bar */}
      <div className="flex items-center justify-between border-b border-border bg-secondary/60 px-3 py-2 text-xs">
        <div className="flex items-center gap-2 text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-destructive/70" />
          <span className="h-2 w-2 rounded-full bg-terminal-amber/70" />
          <span className="h-2 w-2 rounded-full bg-primary/70" />
          <span className="ml-3">~/visualizer/graph.{algo.toLowerCase()}.ts</span>
        </div>
        <div className="flex gap-1">
          {(["BFS", "DFS"] as const).map((a) => (
            <button
              key={a}
              onClick={() => switchAlgo(a)}
              className={`px-2 py-0.5 text-[10px] font-bold tracking-widest border transition-colors ${
                algo === a
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border text-muted-foreground hover:text-primary hover:border-primary"
              }`}
            >
              {a}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px]">
        {/* graph */}
        <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[360px] bg-background/40">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
            {/* edges */}
            {EDGES.map(([a, b], i) => {
              const A = NODES[a], B = NODES[b];
              const active = visitedSet.has(a) && visitedSet.has(b);
              return (
                <line
                  key={i}
                  x1={A.x} y1={A.y} x2={B.x} y2={B.y}
                  stroke={active ? "hsl(var(--primary))" : "hsl(var(--border))"}
                  strokeWidth={active ? 0.5 : 0.3}
                  className={active ? "" : ""}
                  vectorEffect="non-scaling-stroke"
                />
              );
            })}
            {/* nodes */}
            {NODES.map((n) => {
              const visited = visitedSet.has(n.id);
              const isCurrent = current === n.id;
              return (
                <g key={n.id}>
                  <circle
                    cx={n.x} cy={n.y} r={isCurrent ? 4.2 : 3.4}
                    fill={visited ? "hsl(var(--primary))" : "hsl(var(--card))"}
                    stroke={visited ? "hsl(var(--primary))" : "hsl(var(--border))"}
                    strokeWidth={0.4}
                    vectorEffect="non-scaling-stroke"
                    className={isCurrent ? "animate-pulse-node origin-center" : ""}
                    style={{ transformBox: "fill-box", transformOrigin: "center" }}
                  />
                  <text
                    x={n.x} y={n.y + 1.2}
                    textAnchor="middle"
                    fontSize={3}
                    fontFamily="JetBrains Mono"
                    fontWeight={700}
                    fill={visited ? "hsl(var(--primary-foreground))" : "hsl(var(--muted-foreground))"}
                  >
                    {n.id}
                  </text>
                </g>
              );
            })}
          </svg>
          <div className="absolute bottom-2 left-3 font-mono text-[10px] text-muted-foreground">
            <span className="text-primary">●</span> visited &nbsp; <span className="text-muted-foreground">●</span> unvisited
          </div>
        </div>

        {/* trace panel */}
        <div className="border-t lg:border-t-0 lg:border-l border-border bg-card/60 p-3 text-xs">
          <div className="mb-2 text-muted-foreground">
            <span className="text-primary">$</span> trace.log
          </div>
          <div className="mb-3 text-[10px] text-muted-foreground">
            algorithm: <span className="text-primary">{algo}</span><br />
            queue/stack visit order:
          </div>
          <div className="flex flex-wrap gap-1">
            {order.map((id, i) => (
              <span
                key={i}
                className={`inline-flex h-6 w-6 items-center justify-center border text-[10px] font-bold transition-all ${
                  i < step
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground"
                } ${i === step - 1 ? "shadow-[0_0_10px_hsl(var(--primary))]" : ""}`}
              >
                {id}
              </span>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => setRunning((r) => !r)}
              className="flex-1 border border-primary bg-primary/10 px-2 py-1 text-[10px] font-bold tracking-widest text-primary hover:bg-primary hover:text-primary-foreground"
            >
              {running ? "▮▮ PAUSE" : "▶ PLAY"}
            </button>
            <button
              onClick={() => setStep(0)}
              className="border border-border px-2 py-1 text-[10px] font-bold tracking-widest text-muted-foreground hover:border-primary hover:text-primary"
            >
              ↻
            </button>
          </div>
          <div className="mt-3 border-t border-border pt-2 text-[10px] text-muted-foreground">
            step: <span className="text-primary">{step}</span> / {order.length}
          </div>
        </div>
      </div>
    </div>
  );
};
