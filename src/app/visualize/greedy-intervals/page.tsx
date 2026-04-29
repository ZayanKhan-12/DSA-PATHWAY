"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Interval = {
  id: string;
  start: number;
  end: number;
};

type Frame = {
  action: string;
  explanation: string;
  currentId: string | null;
  chosenIds: string[];
  rejectedIds: string[];
  lastEnd: string;
  intervals: Interval[];
};

const SPEEDS = [
  { label: "0.5x", ms: 2200 },
  { label: "1x", ms: 1300 },
  { label: "2x", ms: 750 },
  { label: "4x", ms: 420 },
] as const;

const rawIntervals: Interval[] = [
  { id: "A", start: 1, end: 3 },
  { id: "B", start: 2, end: 4 },
  { id: "C", start: 3, end: 5 },
  { id: "D", start: 0, end: 7 },
  { id: "E", start: 5, end: 8 },
  { id: "F", start: 8, end: 9 },
];

function buildFrames(): Frame[] {
  const sorted = [...rawIntervals].sort((a, b) => a.end - b.end);
  const frames: Frame[] = [];
  let lastEnd = -Infinity;
  const chosen: string[] = [];
  const rejected: string[] = [];

  frames.push({
    action: "Sort intervals by end time",
    explanation:
      "Greedy interval scheduling starts by sorting intervals by finishing time. Earlier finishing intervals leave more room for future choices.",
    currentId: null,
    chosenIds: [],
    rejectedIds: [],
    lastEnd: "−∞",
    intervals: sorted,
  });

  for (const interval of sorted) {
    frames.push({
      action: `Inspect ${interval.id} = [${interval.start}, ${interval.end}]`,
      explanation: `Compare start ${interval.start} with last chosen end ${
        lastEnd === -Infinity ? "−∞" : lastEnd
      }. If start >= lastEnd, we can safely take it.`,
      currentId: interval.id,
      chosenIds: [...chosen],
      rejectedIds: [...rejected],
      lastEnd: lastEnd === -Infinity ? "−∞" : String(lastEnd),
      intervals: sorted,
    });

    if (interval.start >= lastEnd) {
      chosen.push(interval.id);
      lastEnd = interval.end;

      frames.push({
        action: `Choose ${interval.id}`,
        explanation: `${interval.id} does not overlap the current schedule, so greedy accepts it and updates lastEnd to ${interval.end}.`,
        currentId: interval.id,
        chosenIds: [...chosen],
        rejectedIds: [...rejected],
        lastEnd: String(lastEnd),
        intervals: sorted,
      });
    } else {
      rejected.push(interval.id);

      frames.push({
        action: `Reject ${interval.id}`,
        explanation: `${interval.id} overlaps with a previously chosen interval, so greedy skips it to preserve a valid non-overlapping schedule.`,
        currentId: interval.id,
        chosenIds: [...chosen],
        rejectedIds: [...rejected],
        lastEnd: lastEnd === -Infinity ? "−∞" : String(lastEnd),
        intervals: sorted,
      });
    }
  }

  frames.push({
    action: "Finish",
    explanation: `The greedy scan is complete. The maximum compatible set found here is {${chosen.join(
      ", "
    )}}.`,
    currentId: null,
    chosenIds: [...chosen],
    rejectedIds: [...rejected],
    lastEnd: String(lastEnd),
    intervals: sorted,
  });

  return frames;
}

function intervalClass(frame: Frame, interval: Interval) {
  if (frame.currentId === interval.id) {
    return "border-terminal-cyan bg-terminal-cyan/10 text-terminal-cyan";
  }
  if (frame.chosenIds.includes(interval.id)) {
    return "border-primary bg-primary/10 text-primary";
  }
  if (frame.rejectedIds.includes(interval.id)) {
    return "border-terminal-amber bg-terminal-amber/10 text-terminal-amber";
  }
  return "border-border bg-background/55 text-foreground";
}

export default function GreedyIntervalsVisualizerPage() {
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
            <Link href="/learn/greedy-intervals" className="hover:text-primary transition-colors">
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
          visualize // greedy_intervals
        </div>

        <h1 className="mt-2 text-4xl md:text-6xl font-extrabold leading-[0.95]">
          Greedy & Intervals
          <br />
          <span className="text-primary text-glow">Visualizer.</span>
        </h1>

        <p className="mt-5 max-w-5xl text-sm md:text-base leading-8 text-muted-foreground">
          Watch the intervals get sorted by end time, then scanned one by one.
          The visualizer shows which interval greedy is currently considering,
          which ones were accepted, which were rejected, and how the last chosen
          finishing time controls every decision.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/learn/greedy-intervals"
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

        <div className="mt-8 grid gap-5 xl:grid-cols-[minmax(0,1.45fr)_360px]">
          <section className="border border-border bg-card/35">
            <div className="border-b border-border bg-secondary/55 px-5 py-3 text-sm text-muted-foreground">
              ~/visualize/greedy-intervals.ts — step {step + 1}/{frames.length}
            </div>

            <div className="space-y-5 p-5 md:p-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="border border-border bg-background/55 p-4">
                  <div className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                    Last chosen end
                  </div>
                  <div className="mt-3 text-3xl font-bold text-primary">{frame.lastEnd}</div>
                </div>

                <div className="border border-border bg-background/55 p-4">
                  <div className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                    Chosen count
                  </div>
                  <div className="mt-3 text-3xl font-bold text-foreground">{frame.chosenIds.length}</div>
                </div>

                <div className="border border-border bg-background/55 p-4">
                  <div className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                    Rejected count
                  </div>
                  <div className="mt-3 text-3xl font-bold text-terminal-amber">{frame.rejectedIds.length}</div>
                </div>
              </div>

              <div className="border border-border bg-background/45 p-5">
                <div className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                  Current action
                </div>
                <div className="mt-3 text-xl font-bold text-foreground">{frame.action}</div>
              </div>

              <div className="border border-border bg-background/45 p-5">
                <div className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                  Explanation
                </div>
                <p className="mt-3 text-sm leading-8 text-muted-foreground">
                  {frame.explanation}
                </p>
              </div>

              <div className="border border-border bg-background/45 p-5">
                <div className="flex items-center justify-between">
                  <div className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                    Sorted intervals
                  </div>
                  <div className="text-xs text-muted-foreground">
                    cyan = current · green = chosen · amber = rejected
                  </div>
                </div>

                <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                  {frame.intervals.map((interval) => (
                    <div
                      key={interval.id}
                      className={`border p-4 transition ${intervalClass(frame, interval)}`}
                    >
                      <div className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                        interval {interval.id}
                      </div>
                      <div className="mt-2 text-2xl font-bold">
                        [{interval.start}, {interval.end}]
                      </div>
                      <div className="mt-2 text-xs uppercase tracking-[0.24em]">
                        start={interval.start} · end={interval.end}
                      </div>
                    </div>
                  ))}
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
                Chosen schedule
              </div>
              <div className="mt-4 space-y-2">
                {frame.chosenIds.length === 0 ? (
                  <div className="border border-border bg-background/55 px-3 py-3 text-sm text-muted-foreground">
                    (none yet)
                  </div>
                ) : (
                  frame.chosenIds.map((id) => (
                    <div key={id} className="border border-primary bg-primary/10 px-3 py-3 text-sm font-semibold text-primary">
                      {id}
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="border border-border bg-card/35 p-5">
              <div className="text-xs uppercase tracking-[0.34em] text-muted-foreground">
                Rejected intervals
              </div>
              <div className="mt-4 space-y-2">
                {frame.rejectedIds.length === 0 ? (
                  <div className="border border-border bg-background/55 px-3 py-3 text-sm text-muted-foreground">
                    (none yet)
                  </div>
                ) : (
                  frame.rejectedIds.map((id) => (
                    <div key={id} className="border border-terminal-amber bg-terminal-amber/10 px-3 py-3 text-sm font-semibold text-terminal-amber">
                      {id}
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="border border-border bg-card/35 p-5">
              <div className="text-xs uppercase tracking-[0.34em] text-muted-foreground">
                Greedy rule
              </div>
              <div className="mt-4 space-y-3 text-sm leading-7 text-muted-foreground">
                <div>1. Sort by end time.</div>
                <div>2. Scan from earliest end to latest end.</div>
                <div>3. Choose interval if start ≥ lastEnd.</div>
                <div>4. Otherwise reject it.</div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
