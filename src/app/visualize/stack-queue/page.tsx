"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type TabMode = "valid-parentheses" | "queue-bfs" | "monotonic-stack" | "circular-queue";

type StackFrame = {
  kind: "stack";
  current: string | null;
  stack: string[];
  action: string;
  explanation: string;
  valid: boolean;
};

type BfsFrame = {
  kind: "bfs";
  current: number | null;
  queue: number[];
  visited: number[];
  action: string;
  explanation: string;
  highlightEdge?: [number, number];
  processed: number[];
};

type MonoFrame = {
  kind: "mono";
  index: number;
  value: number | null;
  stack: number[];
  answer: number[];
  action: string;
  explanation: string;
};

type CircularFrame = {
  kind: "cqueue";
  action: string;
  explanation: string;
  queue: (number | null)[];
  head: number;
  tail: number;
  size: number;
  current: number | null;
};

type AnyFrame = StackFrame | BfsFrame | MonoFrame | CircularFrame;

type GraphNode = {
  id: number;
  x: number;
  y: number;
  label: string;
};

const vpInput = "([]){}";
const bfsNodes: GraphNode[] = [
  { id: 0, x: 16, y: 22, label: "0" },
  { id: 1, x: 38, y: 22, label: "1" },
  { id: 2, x: 60, y: 22, label: "2" },
  { id: 3, x: 30, y: 52, label: "3" },
  { id: 4, x: 52, y: 52, label: "4" },
  { id: 5, x: 41, y: 80, label: "5" },
];
const bfsEdges: [number, number][] = [
  [0, 1],
  [0, 2],
  [1, 3],
  [1, 4],
  [2, 4],
  [3, 5],
  [4, 5],
];

function buildValidParenthesesFrames(): StackFrame[] {
  const frames: StackFrame[] = [];
  const stack: string[] = [];
  const pairs: Record<string, string> = {
    ")": "(",
    "]": "[",
    "}": "{",
  };

  frames.push({
    kind: "stack",
    current: null,
    stack: [],
    action: "Initialize",
    explanation:
      "Start with an empty stack. Push opening brackets. Closing brackets must match the current top.",
    valid: true,
  });

  for (let i = 0; i < vpInput.length; i++) {
    const ch = vpInput[i];

    if ("([{".includes(ch)) {
      stack.push(ch);
      frames.push({
        kind: "stack",
        current: ch,
        stack: [...stack],
        action: `Push '${ch}'`,
        explanation: `'${ch}' is an opener, so it goes onto the stack.`,
        valid: true,
      });
    } else {
      frames.push({
        kind: "stack",
        current: ch,
        stack: [...stack],
        action: `Check '${ch}'`,
        explanation: `'${ch}' is a closer, so it must match the top opener on the stack.`,
        valid: true,
      });

      if (stack.length === 0 || stack[stack.length - 1] !== pairs[ch]) {
        frames.push({
          kind: "stack",
          current: ch,
          stack: [...stack],
          action: "Mismatch",
          explanation:
            `The closer '${ch}' does not match the top of the stack, so the string is invalid.`,
          valid: false,
        });
        return frames;
      }

      stack.pop();
      frames.push({
        kind: "stack",
        current: ch,
        stack: [...stack],
        action: `Pop for '${ch}'`,
        explanation: `'${ch}' matches the top opener, so we pop the stack.`,
        valid: true,
      });
    }
  }

  frames.push({
    kind: "stack",
    current: null,
    stack: [...stack],
    action: "Finish",
    explanation:
      stack.length === 0
        ? "The input ended and the stack is empty, so all brackets matched correctly."
        : "The input ended but openers remain in the stack, so the string is invalid.",
    valid: stack.length === 0,
  });

  return frames;
}

function buildBfsFrames(): BfsFrame[] {
  const graph: Record<number, number[]> = {
    0: [1, 2],
    1: [3, 4],
    2: [4],
    3: [5],
    4: [5],
    5: [],
  };

  const frames: BfsFrame[] = [];
  const queue: number[] = [0];
  const visited = new Set<number>([0]);
  const processed: number[] = [];

  frames.push({
    kind: "bfs",
    current: null,
    queue: [...queue],
    visited: [...visited],
    processed: [...processed],
    action: "Initialize BFS",
    explanation:
      "Start BFS from node 0. Queue order matters: the first node inserted is processed first.",
  });

  while (queue.length > 0) {
    const current = queue.shift()!;

    frames.push({
      kind: "bfs",
      current,
      queue: [...queue],
      visited: [...visited],
      processed: [...processed],
      action: `Dequeue ${current}`,
      explanation: `Remove node ${current} from the front of the queue and process it.`,
    });

    processed.push(current);

    frames.push({
      kind: "bfs",
      current,
      queue: [...queue],
      visited: [...visited],
      processed: [...processed],
      action: `Process ${current}`,
      explanation: `Node ${current} is now officially processed. Next we inspect its neighbors.`,
    });

    for (const neighbor of graph[current]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);

        frames.push({
          kind: "bfs",
          current: neighbor,
          queue: [...queue],
          visited: [...visited],
          processed: [...processed],
          action: `Enqueue ${neighbor}`,
          explanation: `Discovered node ${neighbor} from node ${current}, so add it to the back of the queue.`,
          highlightEdge: [current, neighbor],
        });
      } else {
        frames.push({
          kind: "bfs",
          current: neighbor,
          queue: [...queue],
          visited: [...visited],
          processed: [...processed],
          action: `Skip ${neighbor}`,
          explanation: `Node ${neighbor} was already discovered earlier, so do not enqueue it again.`,
          highlightEdge: [current, neighbor],
        });
      }
    }
  }

  frames.push({
    kind: "bfs",
    current: null,
    queue: [],
    visited: [...visited],
    processed: [...processed],
    action: "Finish BFS",
    explanation: `The queue is empty, so BFS is done. Final visit order: [${processed.join(", ")}].`,
  });

  return frames;
}

function buildMonotonicStackFrames(): MonoFrame[] {
  const nums = [73, 74, 75, 71, 69, 72, 76, 73];
  const frames: MonoFrame[] = [];
  const stack: number[] = [];
  const answer = new Array(nums.length).fill(0);

  frames.push({
    kind: "mono",
    index: -1,
    value: null,
    stack: [...stack],
    answer: [...answer],
    action: "Initialize",
    explanation:
      "We keep a decreasing stack of indices. When a warmer day appears, it resolves earlier colder days.",
  });

  for (let i = 0; i < nums.length; i++) {
    frames.push({
      kind: "mono",
      index: i,
      value: nums[i],
      stack: [...stack],
      answer: [...answer],
      action: `Read ${nums[i]}`,
      explanation: `Inspect day ${i} with temperature ${nums[i]}.`,
    });

    while (stack.length > 0 && nums[i] > nums[stack[stack.length - 1]]) {
      const prev = stack.pop()!;
      answer[prev] = i - prev;

      frames.push({
        kind: "mono",
        index: i,
        value: nums[i],
        stack: [...stack],
        answer: [...answer],
        action: `Resolve day ${prev}`,
        explanation: `Temperature ${nums[i]} is warmer than ${nums[prev]}, so day ${prev} waits ${i - prev} day(s).`,
      });
    }

    stack.push(i);
    frames.push({
      kind: "mono",
      index: i,
      value: nums[i],
      stack: [...stack],
      answer: [...answer],
      action: `Push index ${i}`,
      explanation: `Push day ${i} onto the monotonic stack as an unresolved candidate.`,
    });
  }

  frames.push({
    kind: "mono",
    index: -1,
    value: null,
    stack: [...stack],
    answer: [...answer],
    action: "Finish",
    explanation:
      "Any indices still in the stack never found a warmer future day, so their answers stay 0.",
  });

  return frames;
}

function buildCircularQueueFrames(): CircularFrame[] {
  const frames: CircularFrame[] = [];
  const capacity = 5;
  const queue: (number | null)[] = new Array(capacity).fill(null);
  let head = 0;
  let tail = 0;
  let size = 0;

  const snap = (action: string, explanation: string, current: number | null = null) => {
    frames.push({
      kind: "cqueue",
      action,
      explanation,
      queue: [...queue],
      head,
      tail,
      size,
      current,
    });
  };

  snap(
    "Initialize",
    "A circular queue reuses array slots. head points to the front, tail points to the next insertion spot."
  );

  const enqueue = (value: number) => {
    queue[tail] = value;
    tail = (tail + 1) % capacity;
    size++;
    snap(`Enqueue ${value}`, `Insert ${value} at the tail position, then wrap tail using modulo arithmetic.`, value);
  };

  const dequeue = () => {
    const value = queue[head];
    queue[head] = null;
    head = (head + 1) % capacity;
    size--;
    snap(`Dequeue ${value}`, `Remove the front element and advance head using modulo arithmetic.`, value);
  };

  enqueue(10);
  enqueue(20);
  enqueue(30);
  dequeue();
  enqueue(40);
  enqueue(50);
  dequeue();
  enqueue(60);
  enqueue(70);

  snap(
    "Finish",
    "Notice how the queue wrapped around and reused earlier empty positions instead of shifting everything."
  );

  return frames;
}

function StructureBox({
  title,
  items,
  labels,
  highlightTop = false,
  queueMode = false,
}: {
  title: string;
  items: (string | number | null)[];
  labels?: string[];
  highlightTop?: boolean;
  queueMode?: boolean;
}) {
  return (
    <div className="terminal-frame p-4">
      <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-3">
        {title}
      </div>

      <div className="border border-border bg-background/60 min-h-[180px] p-4 flex gap-2 flex-wrap items-end">
        {items.length === 0 ? (
          <div className="text-sm text-muted-foreground">(empty)</div>
        ) : (
          items.map((item, idx) => {
            const isTop = highlightTop && idx === items.length - 1;
            const isFront = queueMode && idx === 0;
            const isBack = queueMode && idx === items.length - 1;

            return (
              <div
                key={`${String(item)}-${idx}`}
                className={`min-w-[72px] px-4 py-3 border text-center font-bold text-sm ${
                  isTop || isFront
                    ? "border-primary text-primary bg-primary/10"
                    : "border-border text-foreground"
                }`}
              >
                <div>{item === null ? "·" : item}</div>
                {labels?.[idx] ? (
                  <div className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                    {labels[idx]}
                  </div>
                ) : null}
                {highlightTop && isTop && !labels?.[idx] && (
                  <div className="mt-1 text-[10px] uppercase tracking-wider text-primary">
                    top
                  </div>
                )}
                {queueMode && isFront && !labels?.[idx] && (
                  <div className="mt-1 text-[10px] uppercase tracking-wider text-primary">
                    front
                  </div>
                )}
                {queueMode && isBack && items.length > 1 && !labels?.[idx] && (
                  <div className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                    back
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

function BfsGraph({
  frame,
}: {
  frame: BfsFrame;
}) {
  const nodeById = new Map(bfsNodes.map((n) => [n.id, n]));

  return (
    <div className="terminal-frame p-4">
      <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-3">
        bfs graph
      </div>

      <div className="border border-border bg-background/60 p-4">
        <svg viewBox="0 0 100 100" className="w-full h-[260px]">
          {bfsEdges.map(([u, v], idx) => {
            const from = nodeById.get(u)!;
            const to = nodeById.get(v)!;
            const highlighted =
              frame.highlightEdge &&
              frame.highlightEdge[0] === u &&
              frame.highlightEdge[1] === v;

            return (
              <g key={idx}>
                <line
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke={highlighted ? "#ffd166" : "#2f5130"}
                  strokeWidth={highlighted ? 2.4 : 1.4}
                />
                <polygon
                  points={`${to.x},${to.y} ${to.x - 2},${to.y - 4} ${to.x + 2},${to.y - 4}`}
                  fill={highlighted ? "#ffd166" : "#2f5130"}
                />
              </g>
            );
          })}

          {bfsNodes.map((node) => {
            const isCurrent = frame.current === node.id;
            const isProcessed = frame.processed.includes(node.id);
            const isDiscovered = frame.visited.includes(node.id);

            let cls = {
              fill: "#071008",
              stroke: "#385c39",
              text: "#d8e3d1",
            };

            if (isProcessed) {
              cls = { fill: "#39ff14", stroke: "#39ff14", text: "#021002" };
            } else if (isCurrent) {
              cls = { fill: "#ffd166", stroke: "#ffd166", text: "#151100" };
            } else if (isDiscovered) {
              cls = { fill: "#00e5ff", stroke: "#00e5ff", text: "#031014" };
            }

            return (
              <g key={node.id}>
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={7}
                  fill={cls.fill}
                  stroke={cls.stroke}
                  strokeWidth={2}
                />
                <text
                  x={node.x}
                  y={node.y + 1.5}
                  textAnchor="middle"
                  fontSize="4"
                  fill={cls.text}
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

export default function StackQueueVisualizerPage() {
  const frameSets = useMemo(
    () => ({
      "valid-parentheses": buildValidParenthesesFrames(),
      "queue-bfs": buildBfsFrames(),
      "monotonic-stack": buildMonotonicStackFrames(),
      "circular-queue": buildCircularQueueFrames(),
    }),
    []
  );

  const [mode, setMode] = useState<TabMode>("valid-parentheses");
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  const frames = frameSets[mode];
  const frame = frames[step];

  useEffect(() => {
    setStep(0);
    setPlaying(false);
  }, [mode]);

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
    }, 1050);

    return () => window.clearInterval(timer);
  }, [playing, frames]);

  return (
    <main className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
        <div className="container px-4 md:px-8 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold tracking-widest text-sm">
            <span className="h-3 w-3 bg-primary shadow-[0_0_14px_hsl(var(--primary))]" />
            <span className="text-primary text-glow">DSA.ENGINE</span>
          </Link>

          <div className="flex items-center gap-6 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            <Link href="/learn/stack-queue" className="hover:text-primary transition-colors">
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
          visualize // stack_queue
        </div>

        <h1 className="mt-2 text-4xl md:text-6xl font-extrabold leading-[0.95]">
          Stack & Queue
          <br />
          <span className="text-primary text-glow">Visualizer.</span>
        </h1>

        <p className="mt-5 max-w-4xl text-sm md:text-base text-muted-foreground leading-relaxed">
          This version includes four interactive demos:
          <span className="text-foreground"> Valid Parentheses</span>,
          <span className="text-foreground"> Queue BFS</span>,
          <span className="text-foreground"> Monotonic Stack</span>, and
          <span className="text-foreground"> Circular Queue</span>.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/learn/stack-queue"
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

        <div className="mt-8 flex flex-wrap gap-3">
          {[
            ["valid-parentheses", "VALID PARENTHESES"],
            ["queue-bfs", "QUEUE BFS"],
            ["monotonic-stack", "MONOTONIC STACK"],
            ["circular-queue", "CIRCULAR QUEUE"],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setMode(key as TabMode)}
              className={`px-5 py-3 text-sm font-bold tracking-[0.25em] border-2 transition-colors ${
                mode === key
                  ? "border-primary bg-primary text-black"
                  : "border-border text-foreground hover:border-primary hover:text-primary"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 xl:grid-cols-[1.35fr_0.95fr] gap-8">
          <div className="terminal-frame overflow-hidden">
            <div className="flex items-center justify-between border-b border-border bg-secondary/60 px-3 py-2 text-xs">
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-destructive/70" />
                <span className="h-2 w-2 rounded-full bg-yellow-500/70" />
                <span className="h-2 w-2 rounded-full bg-primary/70" />
                <span className="ml-3">
                  ~/visualize/{mode}.ts — step {step + 1}/{frames.length}
                </span>
              </div>
            </div>

            <div className="p-4 md:p-5 space-y-4">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
                  action
                </div>
                <div className="border border-border bg-background/60 p-4 text-sm text-foreground">
                  {frame.action}
                </div>
              </div>

              <div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
                  explanation
                </div>
                <div className="border border-border bg-background/60 p-4 text-sm leading-relaxed text-muted-foreground">
                  {frame.explanation}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="border border-border bg-background/50 p-3">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    step
                  </div>
                  <div className="mt-2 text-lg font-bold text-foreground">
                    {step + 1}
                  </div>
                </div>

                <div className="border border-border bg-background/50 p-3">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    current
                  </div>
                  <div className="mt-2 text-lg font-bold text-primary">
                    {frame.kind === "stack"
                      ? frame.current ?? "—"
                      : frame.kind === "bfs"
                      ? frame.current ?? "—"
                      : frame.kind === "mono"
                      ? frame.value ?? "—"
                      : frame.current ?? "—"}
                  </div>
                </div>

                <div className="border border-border bg-background/50 p-3">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    status
                  </div>
                  <div className="mt-2 text-lg font-bold text-foreground">
                    {frame.kind === "stack"
                      ? frame.valid
                        ? "VALID"
                        : "INVALID"
                      : frame.kind === "bfs"
                      ? `[${frame.processed.join(", ")}]`
                      : frame.kind === "mono"
                      ? `[${frame.answer.join(", ")}]`
                      : `size=${frame.size}`}
                  </div>
                </div>
              </div>

              {frame.kind === "bfs" ? <BfsGraph frame={frame} /> : null}

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
            {frame.kind === "stack" ? (
              <>
                <StructureBox
                  title="stack state"
                  items={frame.stack}
                  highlightTop
                />

                <div className="terminal-frame p-4">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
                    stack rules
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                    <p>1. Last in, first out.</p>
                    <p>2. Openers push.</p>
                    <p>3. Closers match the top only.</p>
                    <p>4. Empty at finish means fully resolved.</p>
                  </div>
                </div>
              </>
            ) : frame.kind === "bfs" ? (
              <>
                <StructureBox
                  title="queue state"
                  items={frame.queue}
                  queueMode
                />

                <div className="terminal-frame p-4">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
                    visited / processed
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                        discovered
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {frame.visited.map((node, idx) => (
                          <div
                            key={`v-${node}-${idx}`}
                            className="px-4 py-2 border border-cyan-400 bg-cyan-400/10 text-cyan-300 font-bold text-sm"
                          >
                            {node}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                        processed
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {frame.processed.map((node, idx) => (
                          <div
                            key={`p-${node}-${idx}`}
                            className="px-4 py-2 border border-primary bg-primary/10 text-primary font-bold text-sm"
                          >
                            {node}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : frame.kind === "mono" ? (
              <>
                <StructureBox
                  title="monotonic stack (indices)"
                  items={frame.stack}
                  highlightTop
                />

                <div className="terminal-frame p-4">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
                    daily temperatures answer
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {frame.answer.map((v, idx) => (
                      <div
                        key={`${v}-${idx}`}
                        className={`border px-3 py-2 text-center text-sm ${
                          idx === frame.index
                            ? "border-yellow-400 bg-yellow-400/10 text-yellow-300"
                            : "border-border text-foreground"
                        }`}
                      >
                        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                          {idx}
                        </div>
                        <div className="mt-1 font-bold">{v}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="terminal-frame p-4">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
                    monotonic rule
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                    <p>1. Keep unresolved indices in stack.</p>
                    <p>2. Pop while current value breaks the monotonic condition.</p>
                    <p>3. Resolve popped indices immediately.</p>
                    <p>4. Push current index afterward.</p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <StructureBox
                  title="circular queue array"
                  items={frame.queue}
                  labels={frame.queue.map((_, idx) => {
                    const tags = [];
                    if (idx === frame.head) tags.push("head");
                    if (idx === frame.tail) tags.push("tail");
                    return tags.join("/");
                  })}
                />

                <div className="terminal-frame p-4">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
                    circular queue stats
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="border border-border bg-background/60 p-3">
                      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                        head
                      </div>
                      <div className="mt-2 text-lg font-bold text-primary">{frame.head}</div>
                    </div>
                    <div className="border border-border bg-background/60 p-3">
                      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                        tail
                      </div>
                      <div className="mt-2 text-lg font-bold text-primary">{frame.tail}</div>
                    </div>
                    <div className="border border-border bg-background/60 p-3">
                      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                        size
                      </div>
                      <div className="mt-2 text-lg font-bold text-foreground">{frame.size}</div>
                    </div>
                  </div>
                </div>

                <div className="terminal-frame p-4">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
                    circular queue rule
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                    <p>1. head = current front slot</p>
                    <p>2. tail = next insertion slot</p>
                    <p>3. wrap with modulo arithmetic</p>
                    <p>4. reuse old space instead of shifting items</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
