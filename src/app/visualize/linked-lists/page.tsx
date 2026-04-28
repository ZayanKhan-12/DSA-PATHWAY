"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Stage = "init" | "save" | "reverse" | "advance" | "done";
type Tone = "primary" | "cyan" | "amber" | "neutral";

type Badge = {
  text: string;
  tone: Tone;
};

type Frame = {
  stage: Stage;
  action: string;
  explanation: string;
  headIdx: number;
  currentIdx: number;
  prevIdx: number;
  nextIdx: number;
  remaining: number[];
  reversed: number[];
  activePseudo: number[];
  processedCount: number;
};

const VALUES = [3, 7, 11, 19];

const PSEUDO = [
  "prev = null",
  "current = head",
  "while (current !== null):",
  "next = current.next",
  "current.next = prev",
  "prev = current",
  "current = next",
  "return prev",
];

function range(start: number, endInclusive: number) {
  if (start < 0 || endInclusive < start) return [];
  return Array.from({ length: endInclusive - start + 1 }, (_, i) => start + i);
}

function descending(start: number) {
  if (start < 0) return [];
  return Array.from({ length: start + 1 }, (_, i) => start - i);
}

function labelFromIndex(idx: number) {
  return idx >= 0 && idx < VALUES.length ? `n${idx + 1} (${VALUES[idx]})` : "null";
}

function buildFrames(values: number[]): Frame[] {
  const n = values.length;
  const frames: Frame[] = [];

  let prev = -1;
  let current = 0;

  frames.push({
    stage: "init",
    action: "Initialize pointers",
    explanation:
      "We begin with prev = null and current = head. Nothing is reversed yet. current marks the node we are about to process.",
    headIdx: 0,
    currentIdx: 0,
    prevIdx: -1,
    nextIdx: -1,
    remaining: range(0, n - 1),
    reversed: [],
    activePseudo: [0, 1],
    processedCount: 0,
  });

  while (current !== -1) {
    const next = current + 1 < n ? current + 1 : -1;

    frames.push({
      stage: "save",
      action: `Save next from n${current + 1}`,
      explanation:
        next === -1
          ? `n${current + 1} is the tail, so next becomes null.`
          : `Before changing any pointer, save a reference to n${next + 1} so the rest of the list is not lost.`,
      headIdx: 0,
      currentIdx: current,
      prevIdx: prev,
      nextIdx: next,
      remaining: range(current, n - 1),
      reversed: descending(prev),
      activePseudo: [2, 3],
      processedCount: Math.max(prev + 1, 0),
    });

    frames.push({
      stage: "reverse",
      action: `Reverse n${current + 1}.next`,
      explanation:
        prev === -1
          ? `Set n${current + 1}.next = null. This becomes the start of the reversed chain.`
          : `Change n${current + 1}.next so it points backward to n${prev + 1}.`,
      headIdx: 0,
      currentIdx: current,
      prevIdx: prev,
      nextIdx: next,
      remaining: next === -1 ? [] : range(next, n - 1),
      reversed: [current, ...descending(prev)],
      activePseudo: [4],
      processedCount: Math.max(prev + 1, 0),
    });

    prev = current;
    current = next;

    frames.push({
      stage: current === -1 ? "done" : "advance",
      action: current === -1 ? "Finish reversal" : "Advance prev and current",
      explanation:
        current === -1
          ? "current becomes null, so the loop ends. prev now points to the new head of the fully reversed list."
          : `Move prev to n${prev + 1} and move current to the saved next node.`,
      headIdx: current === -1 ? prev : 0,
      currentIdx: current,
      prevIdx: prev,
      nextIdx: -1,
      remaining: current === -1 ? [] : range(current, n - 1),
      reversed: descending(prev),
      activePseudo: current === -1 ? [5, 6, 7] : [5, 6],
      processedCount: prev + 1,
    });
  }

  return frames;
}

function toneClass(tone: Tone) {
  switch (tone) {
    case "primary":
      return "border-primary/70 bg-primary/10 text-primary";
    case "cyan":
      return "border-terminal-cyan/70 bg-terminal-cyan/10 text-terminal-cyan";
    case "amber":
      return "border-terminal-amber/70 bg-terminal-amber/10 text-terminal-amber";
    default:
      return "border-border bg-background/70 text-muted-foreground";
  }
}

function nodeClass(badges: Badge[]) {
  const names = badges.map((b) => b.text);
  if (names.includes("CURRENT")) {
    return "border-terminal-cyan bg-terminal-cyan/10 shadow-[0_0_18px_rgba(34,211,238,0.10)]";
  }
  if (names.includes("PREV")) {
    return "border-terminal-amber bg-terminal-amber/10 shadow-[0_0_18px_rgba(251,191,36,0.10)]";
  }
  if (names.includes("NEW HEAD")) {
    return "border-primary bg-primary/10 shadow-[0_0_18px_rgba(57,255,20,0.12)]";
  }
  if (names.includes("HEAD")) {
    return "border-primary/60 bg-primary/5";
  }
  if (names.includes("NEXT")) {
    return "border-border bg-background/80";
  }
  return "border-border bg-background/60";
}

function getRemainingBadges(frame: Frame, idx: number): Badge[] {
  const badges: Badge[] = [];
  if (frame.stage !== "done" && idx === frame.headIdx) badges.push({ text: "HEAD", tone: "primary" });
  if (idx === frame.currentIdx) badges.push({ text: "CURRENT", tone: "cyan" });
  if (idx === frame.nextIdx) badges.push({ text: "NEXT", tone: "neutral" });
  return badges;
}

function getReversedBadges(frame: Frame, idx: number): Badge[] {
  const badges: Badge[] = [];
  if (frame.stage === "done" && idx === frame.headIdx) {
    badges.push({ text: "NEW HEAD", tone: "primary" });
  } else if (frame.stage !== "reverse" && idx === frame.prevIdx) {
    badges.push({ text: "PREV", tone: "amber" });
  }

  if (frame.stage === "reverse" && idx === frame.currentIdx) {
    badges.push({ text: "CURRENT", tone: "cyan" });
    badges.push({ text: "REWIRED", tone: "amber" });
  }

  return badges;
}

function NodeCard({
  index,
  value,
  badges,
}: {
  index: number;
  value: number;
  badges: Badge[];
}) {
  return (
    <div
      className={`flex h-[148px] w-[118px] shrink-0 flex-col items-center justify-between border px-3 py-3 text-center transition-all ${nodeClass(
        badges
      )}`}
    >
      <div className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
        n{index + 1}
      </div>

      <div className="text-4xl font-bold leading-none text-foreground">{value}</div>

      <div className="flex min-h-[40px] flex-wrap items-center justify-center gap-1.5">
        {badges.length > 0 ? (
          badges.map((badge) => (
            <span
              key={`${index}-${badge.text}`}
              className={`border px-2 py-1 text-[10px] font-bold uppercase tracking-[0.16em] ${toneClass(
                badge.tone
              )}`}
            >
              {badge.text}
            </span>
          ))
        ) : (
          <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            node
          </span>
        )}
      </div>
    </div>
  );
}

function Arrow({ tone = "primary" }: { tone?: "primary" | "amber" }) {
  const arrowText = tone === "amber" ? "text-terminal-amber" : "text-primary";
  const line = tone === "amber" ? "bg-terminal-amber" : "bg-primary";

  return (
    <div className="flex shrink-0 items-center gap-2 px-1">
      <div className={`h-[2px] w-10 ${line}`} />
      <div className={`text-xl leading-none ${arrowText}`}>→</div>
      <div className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
        next
      </div>
    </div>
  );
}

function NullCard() {
  return (
    <div className="flex h-[74px] min-w-[74px] items-center justify-center border border-border bg-background/70 px-4 text-lg text-muted-foreground">
      null
    </div>
  );
}

function ChainSection({
  title,
  subtitle,
  indices,
  badgeGetter,
  tone,
}: {
  title: string;
  subtitle: string;
  indices: number[];
  badgeGetter: (idx: number) => Badge[];
  tone: "primary" | "amber";
}) {
  return (
    <div className="border border-border bg-background/35 p-4 md:p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="text-xs uppercase tracking-[0.34em] text-muted-foreground">
          {title}
        </div>
        <div className="text-xs text-muted-foreground">{subtitle}</div>
      </div>

      <div className="overflow-x-auto border border-border bg-background/45 px-4 py-6 md:px-6 md:py-8">
        {indices.length === 0 ? (
          <div className="flex min-h-[170px] items-center justify-center">
            <NullCard />
          </div>
        ) : (
          <div className="flex min-h-[170px] min-w-max items-center gap-2">
            {indices.map((idx, i) => (
              <div key={`${title}-${idx}`} className="flex items-center gap-2">
                <NodeCard index={idx} value={VALUES[idx]} badges={badgeGetter(idx)} />
                {i < indices.length - 1 ? <Arrow tone={tone} /> : <NullCard />}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  accent = "primary",
}: {
  label: string;
  value: string;
  accent?: "primary" | "cyan" | "amber";
}) {
  const accentText =
    accent === "cyan"
      ? "text-terminal-cyan"
      : accent === "amber"
      ? "text-terminal-amber"
      : "text-primary";

  return (
    <div className="border border-border bg-background/55 px-4 py-4 md:px-5 md:py-5">
      <div className="text-[10px] uppercase tracking-[0.34em] text-muted-foreground">
        {label}
      </div>
      <div className={`mt-3 text-2xl font-bold md:text-3xl ${accentText}`}>
        {value}
      </div>
    </div>
  );
}

function StepDot({
  active,
  completed,
  onClick,
  index,
}: {
  active: boolean;
  completed: boolean;
  onClick: () => void;
  index: number;
}) {
  return (
    <button
      onClick={onClick}
      title={`Jump to step ${index + 1}`}
      className={`h-3 w-3 border transition-all ${
        active
          ? "scale-125 border-primary bg-primary"
          : completed
          ? "border-primary/70 bg-primary/50"
          : "border-border bg-background/70 hover:border-primary/60"
      }`}
    />
  );
}

export default function LinkedListsVisualizerPage() {
  const frames = useMemo(() => buildFrames(VALUES), []);
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);

  const frame = frames[step];
  const progress = ((step + 1) / frames.length) * 100;

  useEffect(() => {
    if (!playing) return;

    const id = setInterval(() => {
      setStep((prev) => {
        if (prev >= frames.length - 1) {
          setPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 1400);

    return () => clearInterval(id);
  }, [playing, frames.length]);

  const processed = Math.min(frame.processedCount, VALUES.length);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="border-b border-border bg-secondary/30">
        <div className="mx-auto flex max-w-[1460px] items-center justify-between px-5 py-4 md:px-6">
          <Link href="/" className="text-xl font-bold tracking-[0.18em] text-primary">
            ■ DSA.ENGINE
          </Link>

          <div className="flex items-center gap-7 text-xs uppercase tracking-[0.38em] text-muted-foreground">
            <Link href="/learn/linked-lists" className="hover:text-primary">
              // Lesson
            </Link>
            <Link href="/" className="hover:text-primary">
              // Home
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1460px] px-5 pb-14 pt-8 md:px-6 md:pt-10">
        <div className="mb-7 max-w-4xl">
          <div className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
            04 // Linked Lists
          </div>
          <h1 className="mt-3 text-4xl font-bold md:text-5xl">
            Linked List Reversal Visualizer
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Follow how <span className="text-primary">head</span>,{" "}
            <span className="text-terminal-cyan">current</span>,{" "}
            <span className="text-terminal-amber">prev</span>, and{" "}
            <span className="text-muted-foreground">next</span> move while each
            pointer flips one step at a time.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap gap-4">
          <Link
            href="/learn/linked-lists"
            className="border border-primary bg-primary px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] text-black transition hover:opacity-90"
          >
            ▶ READ_THE_LESSON
          </Link>

          <Link
            href="/"
            className="border border-border bg-background/60 px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] text-foreground transition hover:border-primary hover:text-primary"
          >
            $ BACK_TO_HOME
          </Link>
        </div>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_380px]">
          <section className="border border-border bg-card/35">
            <div className="border-b border-border bg-secondary/55 px-5 py-3 text-sm text-muted-foreground">
              ~/visualize/linked-list-reversal.ts — step {step + 1}/{frames.length}
            </div>

            <div className="space-y-5 p-5 md:space-y-6 md:p-6">
              <div className="border border-border bg-background/45 p-4 md:p-5">
                <div className="text-[10px] uppercase tracking-[0.34em] text-muted-foreground">
                  Action
                </div>
                <div className="mt-3 text-xl font-bold text-foreground md:text-2xl">
                  {frame.action}
                </div>
              </div>

              <div className="border border-border bg-background/45 p-4 md:p-5">
                <div className="text-[10px] uppercase tracking-[0.34em] text-muted-foreground">
                  Explanation
                </div>
                <p className="mt-3 text-sm leading-7 text-muted-foreground md:text-base">
                  {frame.explanation}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard label="HEAD" value={labelFromIndex(frame.headIdx)} accent="primary" />
                <StatCard label="CURRENT" value={labelFromIndex(frame.currentIdx)} accent="cyan" />
                <StatCard label="PREV" value={labelFromIndex(frame.prevIdx)} accent="amber" />
                <StatCard label="NEXT" value={labelFromIndex(frame.nextIdx)} />
              </div>

              <div className="border border-border bg-card/25 p-4 md:p-5">
                <div className="mb-5 text-xs uppercase tracking-[0.34em] text-muted-foreground">
                  Linked List Workspace
                </div>

                <div className="space-y-5">
                  <ChainSection
                    title="Remaining / Input Chain"
                    subtitle="Nodes not fully processed yet"
                    indices={frame.remaining}
                    badgeGetter={(idx) => getRemainingBadges(frame, idx)}
                    tone="primary"
                  />

                  <ChainSection
                    title={frame.stage === "reverse" ? "Reversed Chain Preview" : "Reversed / Processed Chain"}
                    subtitle={
                      frame.stage === "reverse"
                        ? "Shows the new link direction immediately after rewiring"
                        : "Nodes already processed by the algorithm"
                    }
                    indices={frame.reversed}
                    badgeGetter={(idx) => getReversedBadges(frame, idx)}
                    tone="amber"
                  />
                </div>
              </div>

              <div className="border border-border bg-background/35 p-4 md:p-5">
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
                      disabled={step === frames.length - 1 && !playing}
                      className="border border-border bg-background/60 px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-foreground transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
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

                  <div className="text-sm text-muted-foreground">
                    Processed: <span className="font-bold text-primary">{processed}</span> / {VALUES.length} nodes
                  </div>
                </div>

                <div className="mt-5">
                  <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.28em] text-muted-foreground">
                    <span>Progress</span>
                    <span>
                      {step + 1}/{frames.length}
                    </span>
                  </div>

                  <div className="h-3 overflow-hidden border border-border bg-background/70">
                    <div
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    {frames.map((_, i) => (
                      <StepDot
                        key={i}
                        index={i}
                        active={i === step}
                        completed={i < step}
                        onClick={() => {
                          setPlaying(false);
                          setStep(i);
                        }}
                      />
                    ))}
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

          <aside className="space-y-6">
            <div className="border border-border bg-card/35 p-5">
              <div className="text-xs uppercase tracking-[0.34em] text-muted-foreground">
                Pointer Guide
              </div>

              <div className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 border border-primary/70 bg-primary/10 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-primary">
                    HEAD
                  </span>
                  <p>Original front of the list. At the end, the new head is where prev finishes.</p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="mt-0.5 border border-terminal-cyan/70 bg-terminal-cyan/10 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-terminal-cyan">
                    CURRENT
                  </span>
                  <p>The node actively being processed right now.</p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="mt-0.5 border border-terminal-amber/70 bg-terminal-amber/10 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-terminal-amber">
                    PREV
                  </span>
                  <p>The front of the already reversed portion.</p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="mt-0.5 border border-border bg-background/70 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                    NEXT
                  </span>
                  <p>The saved node that lets us continue traversal safely after rewiring.</p>
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="border border-border bg-background/55 p-4">
                  <div className="text-[10px] uppercase tracking-[0.34em] text-muted-foreground">
                    List Size
                  </div>
                  <div className="mt-3 text-3xl font-bold text-foreground">{VALUES.length}</div>
                </div>

                <div className="border border-border bg-background/55 p-4">
                  <div className="text-[10px] uppercase tracking-[0.34em] text-muted-foreground">
                    Current Stage
                  </div>
                  <div className="mt-3 text-2xl font-bold uppercase text-primary">
                    {frame.stage}
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-border bg-card/35 p-5">
              <div className="text-xs uppercase tracking-[0.34em] text-muted-foreground">
                Pseudocode
              </div>

              <div className="mt-4 space-y-2">
                {PSEUDO.map((line, idx) => {
                  const active = frame.activePseudo.includes(idx);

                  return (
                    <button
                      key={line}
                      onClick={() => {
                        /* kept clickable for interactivity only */
                      }}
                      className={`flex w-full items-start gap-3 border px-3 py-3 text-left text-sm transition ${
                        active
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-border bg-background/45 text-muted-foreground hover:border-primary/40"
                      }`}
                    >
                      <span className={`w-5 shrink-0 font-mono ${active ? "text-primary" : "text-muted-foreground"}`}>
                        {idx + 1}
                      </span>
                      <code className="whitespace-pre-wrap">{line}</code>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="border border-border bg-card/35 p-5">
              <div className="text-xs uppercase tracking-[0.34em] text-muted-foreground">
                Why O(n) Time / O(1) Space
              </div>

              <div className="mt-4 space-y-4 text-sm leading-7 text-muted-foreground">
                <p>
                  <span className="font-bold text-primary">Time = O(n):</span> the algorithm visits each node exactly once.
                  For every node, it performs a constant amount of work:
                  save <code>next</code>, redirect one pointer, then move <code>prev</code> and <code>current</code>.
                </p>

                <p>
                  <span className="font-bold text-primary">Why not O(n²)?</span> there are no nested traversals.
                  The list is scanned in one straight pass from the original head to null.
                </p>

                <p>
                  <span className="font-bold text-primary">Space = O(1):</span> only a fixed number of extra references are used:
                  <code> prev</code>, <code>current</code>, and <code>next</code>.
                  This does not grow with input size.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
