 "use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Frame = {
  action: string;
  explanation: string;
  value: number;
  binary: string;
  mask: string;
  result: string;
  bitIndex: string;
  decision: "inspect" | "apply" | "done";
  pseudoHighlights: number[];
};

const SPEEDS = [
  { label: "0.5x", ms: 2200 },
  { label: "1x", ms: 1300 },
  { label: "2x", ms: 750 },
  { label: "4x", ms: 420 },
] as const;

const pseudo = [
  "count = 0",
  "while n != 0:",
  "  read last bit with (n & 1)",
  "  add that bit to count",
  "  shift n right by 1",
  "return count",
];

function toBinaryString(n: number) {
  return n.toString(2).padStart(4, "0");
}

function buildFrames(): Frame[] {
  const original = 13;
  let n = original;
  let count = 0;
  const frames: Frame[] = [];

  frames.push({
    action: "Initialize bit scan",
    explanation:
      "We will count how many 1-bits appear in n = 13. Read the last bit using n & 1, then shift right.",
    value: n,
    binary: toBinaryString(n),
    mask: "0001",
    result: String(count),
    bitIndex: "start",
    decision: "inspect",
    pseudoHighlights: [0, 1],
  });

  let idx = 0;
  while (n !== 0) {
    const bit = n & 1;

    frames.push({
      action: `Inspect bit ${idx}`,
      explanation: `n & 1 reads the least significant bit. Here ${toBinaryString(n)} & 0001 = ${bit}.`,
      value: n,
      binary: toBinaryString(n),
      mask: "0001",
      result: `bit = ${bit}`,
      bitIndex: String(idx),
      decision: "inspect",
      pseudoHighlights: [1, 2],
    });

    count += bit;

    frames.push({
      action: `Add bit ${idx} to count`,
      explanation: `Because the extracted bit is ${bit}, update the running count to ${count}.`,
      value: n,
      binary: toBinaryString(n),
      mask: "0001",
      result: `count = ${count}`,
      bitIndex: String(idx),
      decision: "apply",
      pseudoHighlights: [3],
    });

    n >>= 1;

    frames.push({
      action: `Shift right after bit ${idx}`,
      explanation: `Right shift discards the last processed bit and moves the next bit into place. New n = ${n}.`,
      value: n,
      binary: n === 0 ? "0000" : toBinaryString(n),
      mask: "0001",
      result: `n = ${n}`,
      bitIndex: String(idx),
      decision: "apply",
      pseudoHighlights: [4],
    });

    idx++;
  }

  frames.push({
    action: "Finish",
    explanation: `All bits have been processed. The number 13 (1101) contains ${count} set bits.`,
    value: 0,
    binary: "0000",
    mask: "0001",
    result: `count = ${count}`,
    bitIndex: "done",
    decision: "done",
    pseudoHighlights: [5],
  });

  return frames;
}

function badgeClass(decision: Frame["decision"]) {
  if (decision === "inspect") return "border-terminal-cyan bg-terminal-cyan/10 text-terminal-cyan";
  if (decision === "apply") return "border-primary bg-primary/10 text-primary";
  return "border-primary bg-primary text-black";
}

function StatCard({
  title,
  value,
  accent = "primary",
}: {
  title: string;
  value: string;
  accent?: "primary" | "cyan" | "neutral";
}) {
  const color =
    accent === "cyan"
      ? "text-terminal-cyan"
      : accent === "neutral"
      ? "text-foreground"
      : "text-primary";

  return (
    <div className="border border-border bg-background/55 px-4 py-4 md:px-5 md:py-5">
      <div className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
        {title}
      </div>
      <div className={`mt-3 text-4xl font-bold ${color}`}>{value}</div>
    </div>
  );
}

export default function BitManipulationVisualizerPage() {
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
            <Link href="/learn/bit-manipulation" className="hover:text-primary transition-colors">
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
          visualize // bit_manipulation
        </div>

        <h1 className="mt-2 text-4xl md:text-6xl font-extrabold leading-[0.95]">
          Bit Manipulation
          <br />
          <span className="text-primary text-glow">Visualizer.</span>
        </h1>

        <p className="mt-5 max-w-5xl text-sm md:text-base leading-8 text-muted-foreground">
          This visualizer shows how a number is processed one bit at a time. Watch the least
          significant bit get read with n & 1, added into the count, and removed with a right shift.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/learn/bit-manipulation"
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
              ~/visualize/bit-manipulation.ts — step {step + 1}/{frames.length}
            </div>

            <div className="space-y-5 p-5 md:space-y-6 md:p-6">
              <div className="grid gap-4 md:grid-cols-4">
                <StatCard title="Decimal value" value={String(frame.value)} accent="neutral" />
                <StatCard title="Binary" value={frame.binary} accent="cyan" />
                <StatCard title="Mask" value={frame.mask} accent="neutral" />
                <div className="border border-border bg-background/55 px-4 py-4 md:px-5 md:py-5">
                  <div className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                    Decision state
                  </div>
                  <div className="mt-3">
                    <span className={`inline-flex border px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] ${badgeClass(frame.decision)}`}>
                      {frame.decision}
                    </span>
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
                    Current result
                  </div>
                  <div className="mt-3 text-2xl font-bold text-primary">
                    {frame.result}
                  </div>

                  <div className="mt-5 space-y-3 text-sm text-muted-foreground leading-7">
                    <div className="border border-border bg-background/55 px-3 py-3">
                      Current bit index: {frame.bitIndex}
                    </div>
                    <div className="border border-border bg-background/55 px-3 py-3">
                      Read last bit with: n & 1
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-border bg-background/45 p-5">
                <div className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                  Bit lane
                </div>

                <div className="mt-4 grid grid-cols-4 gap-3">
                  {frame.binary.split("").map((bit, idx) => {
                    const isLast = idx === 3;
                    return (
                      <div
                        key={idx}
                        className={`border px-4 py-5 text-center ${
                          isLast
                            ? "border-terminal-cyan bg-terminal-cyan/10 text-terminal-cyan"
                            : "border-border bg-background/55 text-foreground"
                        }`}
                      >
                        <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                          bit {3 - idx}
                        </div>
                        <div className="mt-3 text-4xl font-bold">{bit}</div>
                        <div className="mt-2 text-[10px] uppercase tracking-[0.22em]">
                          {isLast ? "read now" : "higher bit"}
                        </div>
                      </div>
                    );
                  })}
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
                Bit rules
              </div>
              <div className="mt-4 space-y-3 text-sm leading-7 text-muted-foreground">
                <div>1. n & 1 reads the least significant bit.</div>
                <div>2. Right shift removes the processed last bit.</div>
                <div>3. Repeat until n becomes 0.</div>
                <div>4. Sum of extracted 1s = population count.</div>
              </div>
            </div>

            <div className="border border-border bg-card/35 p-5">
              <div className="text-xs uppercase tracking-[0.34em] text-muted-foreground">
                Why this matters
              </div>
              <div className="mt-4 space-y-3 text-sm leading-7 text-muted-foreground">
                <div>Bit logic powers masks, XOR tricks, permissions, and subset state compression.</div>
                <div>Many “advanced” tricks are just repeated use of a few simple binary rules.</div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
