"use client";

import { useEffect, useMemo, useState } from "react";

type Mode = "bfs" | "dfs" | "stack" | "queue";

type Frame = {
  action: string;
  explanation: string;
  items: number[];
  output?: number[];
};

const STACK_FRAMES: Frame[] = [
  {
    action: "push(4)",
    explanation: "Push adds a value onto the top of the stack.",
    items: [4],
    output: [],
  },
  {
    action: "push(9)",
    explanation: "Another push places the new value above the previous one.",
    items: [4, 9],
    output: [],
  },
  {
    action: "push(12)",
    explanation: "The newest value is now on top, so it will be removed first.",
    items: [4, 9, 12],
    output: [],
  },
  {
    action: "pop()",
    explanation: "Pop removes the top item first. This is LIFO behavior.",
    items: [4, 9],
    output: [12],
  },
  {
    action: "peek()",
    explanation: "Peek reads the current top without changing the structure.",
    items: [4, 9],
    output: [12],
  },
];

const QUEUE_FRAMES: Frame[] = [
  {
    action: "enqueue(3)",
    explanation: "Enqueue inserts at the rear. The first item is also the front.",
    items: [3],
    output: [],
  },
  {
    action: "enqueue(7)",
    explanation: "The queue grows from front to rear in arrival order.",
    items: [3, 7],
    output: [],
  },
  {
    action: "enqueue(11)",
    explanation: "The queue now has three elements in FIFO order.",
    items: [3, 7, 11],
    output: [],
  },
  {
    action: "dequeue()",
    explanation: "Dequeue removes from the front first. This is FIFO behavior.",
    items: [7, 11],
    output: [3],
  },
  {
    action: "enqueue(15)",
    explanation: "New values still join at the rear after removals.",
    items: [7, 11, 15],
    output: [3],
  },
];

const BFS_ORDER = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const DFS_ORDER = [0, 1, 3, 4, 7, 2, 5, 8, 6];

const EDGES = [
  [0, 1],
  [0, 2],
  [1, 3],
  [1, 4],
  [2, 5],
  [2, 6],
  [4, 7],
  [5, 8],
] as const;

const POSITIONS: Record<number, { x: number; y: number }> = {
  0: { x: 50, y: 16 },
  1: { x: 22, y: 38 },
  2: { x: 78, y: 38 },
  3: { x: 10, y: 68 },
  4: { x: 34, y: 68 },
  5: { x: 66, y: 68 },
  6: { x: 90, y: 68 },
  7: { x: 26, y: 92 },
  8: { x: 74, y: 92 },
};

function TerminalDots() {
  return (
    <div className="flex items-center gap-2">
      <span className="h-2.5 w-2.5 rounded-full bg-red-400/90" />
      <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/90" />
      <span className="h-2.5 w-2.5 rounded-full bg-primary/90" />
    </div>
  );
}

function SmallStat({
  label,
  value,
  accent = "text-foreground",
}: {
  label: string;
  value: string;
  accent?: string;
}) {
  return (
    <div className="rounded-none border border-border bg-card/40 px-4 py-3 min-w-0 overflow-hidden">
      <div className="mb-2 text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
        {label}
      </div>
      <div className={`font-mono text-xl font-bold ${accent} break-words leading-tight`}>
        {value}
      </div>
    </div>
  );
}

function StackVisual({ items }: { items: number[] }) {
  return (
    <div className="rounded-none border border-border bg-secondary/20 p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
          Stack state
        </div>
        <div className="text-xs text-muted-foreground">LIFO</div>
      </div>

      <div className="flex min-h-[260px] items-end justify-center">
        <div className="flex w-full max-w-[220px] flex-col-reverse gap-3">
          {items.length === 0 ? (
            <div className="rounded-none border border-dashed border-border px-4 py-8 text-center text-sm text-muted-foreground">
              empty stack
            </div>
          ) : (
            items.map((item, idx) => {
              const isTop = idx === items.length - 1;
              return (
                <div key={`${item}-${idx}`} className="relative">
                  {isTop && (
                    <div className="mb-2 text-center text-[10px] uppercase tracking-[0.25em] text-primary">
                      top
                    </div>
                  )}
                  <div
                    className={`flex h-16 items-center justify-between border px-5 font-mono text-lg ${
                      isTop
                        ? "border-primary bg-primary/10 text-primary shadow-[0_0_18px_rgba(57,255,20,0.18)]"
                        : "border-border bg-card/40 text-foreground"
                    }`}
                  >
                    <span>node</span>
                    <span className="text-2xl font-bold">{item}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

function QueueVisual({ items }: { items: number[] }) {
  const rearIndex = items.length - 1;

  return (
    <div className="rounded-none border border-border bg-secondary/20 p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
          Queue state
        </div>
        <div className="text-xs text-muted-foreground">FIFO</div>
      </div>

      <div className="rounded-none border border-border bg-background/40 p-5">
        <div className="mb-4 flex items-center justify-between text-[10px] uppercase tracking-[0.25em]">
          <span className="text-terminal-cyan">front</span>
          <span className="text-muted-foreground">dequeue → left side</span>
          <span className="text-primary">rear</span>
        </div>

        {items.length === 0 ? (
          <div className="rounded-none border border-dashed border-border px-4 py-10 text-center text-sm text-muted-foreground">
            empty queue
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {items.map((item, idx) => {
                const isFront = idx === 0;
                const isRear = idx === rearIndex;

                return (
                  <div key={`${item}-${idx}`} className="flex items-center gap-3">
                    <div className="min-w-[150px]">
                      <div
                        className={`border px-4 py-5 text-center font-mono transition-all ${
                          isFront
                            ? "border-terminal-cyan bg-terminal-cyan/10 text-terminal-cyan shadow-[0_0_18px_rgba(34,211,238,0.12)]"
                            : isRear
                            ? "border-primary bg-primary/10 text-primary shadow-[0_0_18px_rgba(57,255,20,0.12)]"
                            : "border-border bg-card/40 text-foreground"
                        }`}
                      >
                        <div className="mb-2 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                          idx {idx}
                        </div>
                        <div className="text-3xl font-bold">{item}</div>
                      </div>

                      <div className="mt-2 flex items-center justify-between text-[10px] uppercase tracking-[0.22em]">
                        <span className={isFront ? "text-terminal-cyan" : "text-transparent"}>
                          FRONT
                        </span>
                        <span className={isRear ? "text-primary" : "text-transparent"}>
                          REAR
                        </span>
                      </div>
                    </div>

                    {idx < items.length - 1 && (
                      <div className="flex min-w-[36px] items-center justify-center">
                        <span className="font-mono text-lg text-muted-foreground">→</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="border border-border bg-card/40 px-4 py-3">
                <div className="mb-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  front value
                </div>
                <div className="font-mono text-2xl font-bold text-terminal-cyan">
                  {String(items[0])}
                </div>
              </div>

              <div className="border border-border bg-card/40 px-4 py-3">
                <div className="mb-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  rear value
                </div>
                <div className="font-mono text-2xl font-bold text-primary">
                  {String(items[rearIndex])}
                </div>
              </div>

              <div className="border border-border bg-card/40 px-4 py-3">
                <div className="mb-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  queue order
                </div>
                <div className="font-mono text-sm font-bold text-foreground">
                  {items.join("  →  ")}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function GraphVisual({
  order,
  step,
  mode,
}: {
  order: number[];
  step: number;
  mode: "bfs" | "dfs";
}) {
  const visited = new Set(order.slice(0, step + 1));
  const current = order[step];

  return (
    <div className="rounded-none border border-border bg-secondary/20 p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
          Graph state
        </div>
        <div className="text-xs text-muted-foreground">{mode.toUpperCase()}</div>
      </div>

      <div className="relative min-h-[420px] w-full">
        <svg viewBox="0 0 100 100" className="h-[420px] w-full">
          {EDGES.map(([a, b], idx) => {
            const pa = POSITIONS[a];
            const pb = POSITIONS[b];
            const active = visited.has(a) && visited.has(b);

            return (
              <line
                key={idx}
                x1={pa.x}
                y1={pa.y}
                x2={pb.x}
                y2={pb.y}
                stroke={active ? "rgba(57,255,20,0.95)" : "rgba(57,255,20,0.12)"}
                strokeWidth="0.35"
              />
            );
          })}

          {Object.entries(POSITIONS).map(([nodeStr, pos]) => {
            const node = Number(nodeStr);
            const isVisited = visited.has(node);
            const isCurrent = node === current;

            return (
              <g key={node} transform={`translate(${pos.x}, ${pos.y})`}>
                <circle
                  r={isCurrent ? 4.8 : 4}
                  fill={
                    isCurrent
                      ? "rgba(57,255,20,1)"
                      : isVisited
                      ? "rgba(57,255,20,0.92)"
                      : "rgba(57,255,20,0.05)"
                  }
                  stroke={isVisited ? "rgba(57,255,20,1)" : "rgba(167,191,167,0.18)"}
                  strokeWidth="0.3"
                />
                <text
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="2.1"
                  fontFamily="monospace"
                  fontWeight="700"
                  fill={isVisited ? "#041204" : "rgba(190,210,190,0.75)"}
                >
                  {node}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

export default function StackQueueVisualizerPreview() {
  const [mode, setMode] = useState<Mode>("bfs");
  const [step, setStep] = useState(0);

  const frames = useMemo(() => {
    if (mode === "stack") return STACK_FRAMES;
    if (mode === "queue") return QUEUE_FRAMES;
    return [];
  }, [mode]);

  const graphOrder = mode === "dfs" ? DFS_ORDER : BFS_ORDER;
  const totalSteps = mode === "stack" || mode === "queue" ? frames.length : graphOrder.length;
  const safeStep = Math.min(step, Math.max(0, totalSteps - 1));

  useEffect(() => {
    setStep(0);
  }, [mode]);

  const currentFrame =
    mode === "stack" || mode === "queue"
      ? frames[safeStep] ?? frames[0]
      : null;

  const trace =
    mode === "stack"
      ? ["push(4)", "push(9)", "push(12)", "pop()", "peek()"]
      : mode === "queue"
      ? ["enqueue(3)", "enqueue(7)", "enqueue(11)", "dequeue()", "enqueue(15)"]
      : graphOrder.map(String);

  return (
    <section className="border-t border-border bg-background">
      <div className="mx-auto max-w-[1500px] px-6 py-24 lg:px-10">
        <div className="grid items-start gap-12 xl:grid-cols-[0.95fr_1.1fr]">
          <div className="max-w-2xl">
            <div className="mb-5 font-mono text-[12px] uppercase tracking-[0.32em] text-muted-foreground">
              section_03 // visualizer
            </div>

            <h2 className="max-w-[14ch] font-mono text-5xl font-bold leading-[0.92] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Watch the structure <span className="text-primary text-glow">think.</span>
            </h2>

            <p className="mt-6 max-w-xl font-mono text-lg leading-8 text-muted-foreground">
              Toggle between graph traversal and linear data structures. Preview
              <span className="text-foreground"> BFS</span>, <span className="text-foreground">DFS</span>,
              <span className="text-foreground"> stacks</span>, and <span className="text-foreground">queues</span>
              in the same futuristic terminal panel.
            </p>

            <ul className="mt-8 space-y-3 font-mono text-sm text-muted-foreground">
              <li>▸ BFS / DFS graph traversal preview</li>
              <li>▸ Stack push / pop / peek preview</li>
              <li>▸ Queue enqueue / dequeue preview</li>
              <li>▸ Same landing-page visual language as the rest of DSA.ENGINE</li>
            </ul>
          </div>

          <div className="terminal-frame border border-border bg-card/40">
            <div className="border-b border-border bg-secondary/40 px-4 py-3">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <TerminalDots />
                  <div className="font-mono text-sm text-muted-foreground">
                    ~/visualizer/
                    {mode === "bfs" || mode === "dfs"
                      ? "graph.traversal.ts"
                      : mode === "stack"
                      ? "stack.ts"
                      : "queue.ts"}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {(["bfs", "dfs", "stack", "queue"] as Mode[]).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMode(m)}
                      className={`border px-3 py-1 font-mono text-xs tracking-[0.2em] transition-colors ${
                        mode === m
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border text-muted-foreground hover:border-primary/60 hover:text-foreground"
                      }`}
                    >
                      {m.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-5 p-5 xl:grid-cols-[1.15fr_330px]">
              <div className="space-y-5">
                {mode === "stack" || mode === "queue" ? (
                  <>
                    <div className="grid gap-4 sm:grid-cols-3">
                      <SmallStat
                        label="Structure"
                        value={mode.toUpperCase()}
                        accent="text-primary"
                      />
                      <SmallStat
                        label="Current action"
                        value={currentFrame?.action ?? "—"}
                        accent="text-foreground"
                      />
                      <SmallStat
                        label="Size"
                        value={String(currentFrame?.items.length ?? 0)}
                        accent={mode === "stack" ? "text-terminal-amber" : "text-terminal-cyan"}
                      />
                    </div>

                    {mode === "stack" ? (
                      <StackVisual items={currentFrame?.items ?? []} />
                    ) : (
                      <QueueVisual items={currentFrame?.items ?? []} />
                    )}
                  </>
                ) : (
                  <GraphVisual
                    order={graphOrder}
                    step={safeStep}
                    mode={mode}
                  />
                )}

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setStep((s) => Math.max(0, s - 1))}
                    disabled={safeStep === 0}
                    className="border border-border px-4 py-2 font-mono text-sm text-foreground transition-colors hover:border-primary disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    ← PREV
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep((s) => Math.min(totalSteps - 1, s + 1))}
                    disabled={safeStep === totalSteps - 1}
                    className="border border-primary bg-primary px-4 py-2 font-mono text-sm text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    STEP →
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep(0)}
                    className="border border-border px-4 py-2 font-mono text-sm text-foreground transition-colors hover:border-primary"
                  >
                    RESET
                  </button>

                  <div className="ml-auto font-mono text-sm text-muted-foreground">
                    step {safeStep + 1} / {totalSteps}
                  </div>
                </div>
              </div>

              <div className="space-y-5">
                <div className="rounded-none border border-border bg-secondary/20 p-4">
                  <div className="mb-3 text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                    trace.log
                  </div>

                  <div className="mb-3 font-mono text-sm text-muted-foreground">
                    mode: <span className="text-primary">{mode.toUpperCase()}</span>
                  </div>

                  <div className="space-y-2 font-mono text-sm">
                    {trace.map((item, idx) => (
                      <div
                        key={item + idx}
                        className={`border px-3 py-2 ${
                          idx === safeStep
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border text-muted-foreground"
                        }`}
                      >
                        {mode === "bfs" || mode === "dfs" ? `${item}` : `${idx + 1}. ${item}`}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-none border border-border bg-secondary/20 p-4">
                  <div className="mb-3 text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                    explanation
                  </div>
                  <p className="font-mono text-sm leading-7 text-muted-foreground">
                    {mode === "stack" || mode === "queue"
                      ? currentFrame?.explanation
                      : mode === "bfs"
                      ? "BFS visits nodes level by level using a queue. Earlier discoveries are processed first."
                      : "DFS goes as deep as possible before backtracking. It behaves like a stack, explicit or recursive."}
                  </p>
                </div>

                <div className="rounded-none border border-border bg-secondary/20 p-4">
                  <div className="mb-3 text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                    output
                  </div>

                  {mode === "stack" || mode === "queue" ? (
                    currentFrame?.output && currentFrame.output.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {currentFrame.output.map((value, idx) => (
                          <div
                            key={`${value}-${idx}`}
                            className="border border-terminal-amber bg-terminal-amber/10 px-3 py-2 font-mono text-sm text-terminal-amber"
                          >
                            {value}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="font-mono text-sm text-muted-foreground">(none yet)</div>
                    )
                  ) : (
                    <div className="font-mono text-sm text-muted-foreground">
                      visited order: {graphOrder.slice(0, safeStep + 1).join(" → ")}
                    </div>
                  )}
                </div>

                <div className="rounded-none border border-border bg-secondary/20 p-4">
                  <div className="mb-3 text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                    what this teaches
                  </div>
                  <ul className="space-y-2 font-mono text-sm text-muted-foreground">
                    <li>• BFS = level-order traversal</li>
                    <li>• DFS = depth-first exploration</li>
                    <li>• Stack = LIFO</li>
                    <li>• Queue = FIFO</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
