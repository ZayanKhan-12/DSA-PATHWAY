"use client";

import { useMemo, useState } from "react";

type NodeItem = {
  id: string;
  value: number;
};

type Frame = {
  step: number;
  action: string;
  explanation: string;
  nodes: NodeItem[];
  current: string | null;
  prev: string | null;
  next: string | null;
  head: string | null;
  links: Record<string, string | null>;
};

const baseNodes: NodeItem[] = [
  { id: "n1", value: 3 },
  { id: "n2", value: 7 },
  { id: "n3", value: 11 },
  { id: "n4", value: 19 },
];

function cloneLinks(links: Record<string, string | null>) {
  return JSON.parse(JSON.stringify(links));
}

function buildFrames(): Frame[] {
  const nodes = baseNodes;
  const frames: Frame[] = [];

  let links: Record<string, string | null> = {
    n1: "n2",
    n2: "n3",
    n3: "n4",
    n4: null,
  };

  let prev: string | null = null;
  let current: string | null = "n1";
  let head: string | null = "n1";

  frames.push({
    step: 1,
    action: "Initialize pointers",
    explanation:
      "We start with prev = null and current = head. The goal is to reverse each next pointer one node at a time.",
    nodes,
    current,
    prev,
    next: null,
    head,
    links: cloneLinks(links),
  });

  while (current) {
    const next = links[current];

    frames.push({
      step: frames.length + 1,
      action: `Save next from ${current}`,
      explanation:
        `Before changing pointers, store next = ${next ?? "null"} so we do not lose the rest of the list.`,
      nodes,
      current,
      prev,
      next,
      head,
      links: cloneLinks(links),
    });

    links[current] = prev;

    frames.push({
      step: frames.length + 1,
      action: `Reverse pointer at ${current}`,
      explanation:
        `${current}.next now points backward to ${prev ?? "null"} instead of forward.`,
      nodes,
      current,
      prev,
      next,
      head,
      links: cloneLinks(links),
    });

    prev = current;
    current = next;

    frames.push({
      step: frames.length + 1,
      action: "Advance pointers",
      explanation:
        `Move prev forward to ${prev ?? "null"} and move current to ${current ?? "null"}.`,
      nodes,
      current,
      prev,
      next,
      head,
      links: cloneLinks(links),
    });
  }

  head = prev;

  frames.push({
    step: frames.length + 1,
    action: "Finish",
    explanation:
      `current reached null, so prev is the new head. The reversed list now starts at ${head}.`,
    nodes,
    current,
    prev,
    next: null,
    head,
    links: cloneLinks(links),
  });

  return frames;
}

function findNode(nodes: NodeItem[], id: string | null) {
  return nodes.find((n) => n.id === id) ?? null;
}

export default function LinkedListStepper() {
  const frames = useMemo(() => buildFrames(), []);
  const [index, setIndex] = useState(0);
  const frame = frames[index];

  const positions: Record<string, { x: number; y: number }> = {
    n1: { x: 80, y: 110 },
    n2: { x: 260, y: 110 },
    n3: { x: 440, y: 110 },
    n4: { x: 620, y: 110 },
  };

  return (
    <div className="terminal-frame overflow-hidden">
      <div className="flex items-center justify-between border-b border-border bg-secondary/60 px-3 py-2 text-xs">
        <div className="flex items-center gap-2 text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-destructive/70" />
          <span className="h-2 w-2 rounded-full bg-yellow-500/70" />
          <span className="h-2 w-2 rounded-full bg-primary/70" />
          <span className="ml-3">~/visualize/linked-list-reversal.ts — step {frame.step}/{frames.length}</span>
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

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {[
            ["head", frame.head],
            ["current", frame.current],
            ["prev", frame.prev],
            ["next", frame.next],
          ].map(([label, id]) => {
            const node = findNode(frame.nodes, id);
            return (
              <div key={label} className="border border-border bg-background/50 p-3">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  {label}
                </div>
                <div className="mt-2 text-lg font-bold text-primary">
                  {node ? `${node.id} (${node.value})` : "null"}
                </div>
              </div>
            );
          })}
        </div>

        <div className="terminal-frame p-4">
          <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-3">
            linked list state
          </div>

          <div className="border border-border bg-background/60 p-4 overflow-x-auto">
            <svg viewBox="0 0 720 220" className="w-full min-w-[720px] h-[220px]">
              <defs>
                <marker
                  id="arrow-forward"
                  markerWidth="10"
                  markerHeight="10"
                  refX="9"
                  refY="3"
                  orient="auto"
                  markerUnits="strokeWidth"
                >
                  <path d="M0,0 L0,6 L9,3 z" fill="#39ff14" />
                </marker>
                <marker
                  id="arrow-neutral"
                  markerWidth="10"
                  markerHeight="10"
                  refX="9"
                  refY="3"
                  orient="auto"
                  markerUnits="strokeWidth"
                >
                  <path d="M0,0 L0,6 L9,3 z" fill="#385c39" />
                </marker>
              </defs>

              {frame.nodes.map((node) => {
                const pos = positions[node.id];
                const target = frame.links[node.id];

                if (!target) {
                  return (
                    <g key={`link-${node.id}`}>
                      <line
                        x1={pos.x + 90}
                        y1={pos.y + 25}
                        x2={pos.x + 145}
                        y2={pos.y + 25}
                        stroke={node.id === frame.current ? "#39ff14" : "#385c39"}
                        strokeWidth="3"
                        markerEnd={node.id === frame.current ? "url(#arrow-forward)" : "url(#arrow-neutral)"}
                      />
                      <text
                        x={pos.x + 150}
                        y={pos.y + 30}
                        fontSize="12"
                        fill="#9aa89a"
                        fontFamily="monospace"
                      >
                        null
                      </text>
                    </g>
                  );
                }

                const targetPos = positions[target];
                const backward = targetPos.x < pos.x;
                const y = backward ? pos.y - 12 : pos.y + 25;

                return (
                  <g key={`link-${node.id}`}>
                    <line
                      x1={backward ? pos.x : pos.x + 90}
                      y1={y}
                      x2={backward ? targetPos.x + 90 : targetPos.x}
                      y2={y}
                      stroke={node.id === frame.current ? "#39ff14" : "#385c39"}
                      strokeWidth="3"
                      markerEnd={node.id === frame.current ? "url(#arrow-forward)" : "url(#arrow-neutral)"}
                    />
                  </g>
                );
              })}

              {frame.nodes.map((node) => {
                const pos = positions[node.id];
                const isCurrent = node.id === frame.current;
                const isPrev = node.id === frame.prev;
                const isHead = node.id === frame.head;

                return (
                  <g key={node.id}>
                    {isHead ? (
                      <text
                        x={pos.x + 45}
                        y={pos.y - 24}
                        textAnchor="middle"
                        fontSize="12"
                        fill="#39ff14"
                        fontFamily="monospace"
                      >
                        HEAD
                      </text>
                    ) : null}

                    <rect
                      x={pos.x}
                      y={pos.y}
                      width="90"
                      height="50"
                      fill={
                        isCurrent
                          ? "rgba(255,209,102,0.12)"
                          : isPrev
                          ? "rgba(57,255,20,0.10)"
                          : "rgba(0,0,0,0.35)"
                      }
                      stroke={isCurrent ? "#ffd166" : isPrev ? "#39ff14" : "#385c39"}
                      strokeWidth="2"
                    />
                    <line
                      x1={pos.x + 58}
                      y1={pos.y}
                      x2={pos.x + 58}
                      y2={pos.y + 50}
                      stroke={isCurrent ? "#ffd166" : isPrev ? "#39ff14" : "#385c39"}
                      strokeWidth="2"
                    />
                    <text
                      x={pos.x + 28}
                      y={pos.y + 31}
                      textAnchor="middle"
                      fontSize="20"
                      fill="#e8efe8"
                      fontFamily="monospace"
                      fontWeight="bold"
                    >
                      {node.value}
                    </text>
                    <text
                      x={pos.x + 73}
                      y={pos.y + 31}
                      textAnchor="middle"
                      fontSize="12"
                      fill="#9aa89a"
                      fontFamily="monospace"
                    >
                      next
                    </text>

                    <text
                      x={pos.x + 45}
                      y={pos.y + 72}
                      textAnchor="middle"
                      fontSize="11"
                      fill={isCurrent ? "#ffd166" : isPrev ? "#39ff14" : "#9aa89a"}
                      fontFamily="monospace"
                    >
                      {isCurrent ? "CURRENT" : isPrev ? "PREV" : node.id.toUpperCase()}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            disabled={index === 0}
            className="border border-border px-4 py-2 text-xs font-bold tracking-widest hover:border-primary hover:text-primary disabled:opacity-40"
          >
            ← PREV
          </button>

          <button
            onClick={() => setIndex((i) => Math.min(frames.length - 1, i + 1))}
            disabled={index === frames.length - 1}
            className="border border-primary bg-primary/10 px-4 py-2 text-xs font-bold tracking-widest text-primary hover:bg-primary hover:text-primary-foreground disabled:opacity-40"
          >
            STEP →
          </button>

          <button
            onClick={() => setIndex(0)}
            className="border border-border px-4 py-2 text-xs font-bold tracking-widest hover:border-primary hover:text-primary"
          >
            RESET
          </button>
        </div>
      </div>
    </div>
  );
}
