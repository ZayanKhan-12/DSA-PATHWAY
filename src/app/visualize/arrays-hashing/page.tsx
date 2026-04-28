"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Frame = {
  i: number;
  value: number | null;
  need: number | null;
  seen: Record<number, number>;
  answer: number[] | null;
  explain: string;
};

const nums = [2, 7, 11, 15];
const target = 9;

function buildFrames(): Frame[] {
  const frames: Frame[] = [];
  const seen: Record<number, number> = {};

  frames.push({
    i: -1,
    value: null,
    need: null,
    seen: {},
    answer: null,
    explain: "Start with an empty hash map. We will scan the array once and store value → index.",
  });

  for (let i = 0; i < nums.length; i++) {
    const value = nums[i];
    const need = target - value;

    frames.push({
      i,
      value,
      need,
      seen: { ...seen },
      answer: null,
      explain: `Look at nums[${i}] = ${value}. The complement we need is ${need}.`,
    });

    if (seen[need] !== undefined) {
      frames.push({
        i,
        value,
        need,
        seen: { ...seen },
        answer: [seen[need], i],
        explain: `${need} is already in the map at index ${seen[need]}, so we found the answer: [${seen[need]}, ${i}].`,
      });
      return frames;
    }

    seen[value] = i;

    frames.push({
      i,
      value,
      need,
      seen: { ...seen },
      answer: null,
      explain: `${need} was not found, so store ${value} → ${i} in the hash map and continue.`,
    });
  }

  frames.push({
    i: nums.length,
    value: null,
    need: null,
    seen: { ...seen },
    answer: null,
    explain: "Finished scanning the array. No valid pair was found.",
  });

  return frames;
}

export default function ArraysHashingVisualizerPage() {
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
    }, 1000);

    return () => window.clearInterval(timer);
  }, [playing, frames.length]);

  return (
    <main className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
        <div className="container px-4 md:px-8 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold tracking-widest text-sm">
            <span className="h-3 w-3 bg-primary shadow-[0_0_14px_hsl(var(--primary))]" />
            <span className="text-primary text-glow">DSA.ENGINE</span>
          </Link>

          <div className="flex items-center gap-6 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            <Link href="/learn/arrays-hashing" className="hover:text-primary transition-colors">
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
          visualize // arrays_hashing
        </div>

        <h1 className="mt-2 text-4xl md:text-6xl font-extrabold leading-[0.95]">
          Arrays & Hashing
          <br />
          <span className="text-primary text-glow">Visualizer.</span>
        </h1>

        <p className="mt-5 max-w-3xl text-sm md:text-base text-muted-foreground leading-relaxed">
          This walks through <span className="text-foreground">Two Sum</span> step by step using a hash map.
          Watch how the map grows as we scan the array and how the answer appears as soon as the complement is found.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/learn/arrays-hashing"
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
                  ~/visualize/arrays-hashing.ts — step {step + 1}/{frames.length}
                </span>
              </div>

              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                two_sum
              </div>
            </div>

            <div className="p-4 md:p-5 space-y-4">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
                  input
                </div>
                <div className="border border-border bg-background/60 p-4 text-sm text-muted-foreground">
                  nums = [{nums.join(", ")}], target = {target}
                </div>
              </div>

              <div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
                  array scan
                </div>
                <div className="flex flex-wrap gap-3">
                  {nums.map((value, index) => {
                    const active = frame.i === index;
                    const partOfAnswer = frame.answer?.includes(index) ?? false;

                    return (
                      <div
                        key={index}
                        className={`border px-4 py-3 min-w-[88px] text-center ${
                          partOfAnswer
                            ? "border-primary bg-primary/10 text-primary"
                            : active
                            ? "border-yellow-400 bg-yellow-400/10 text-yellow-300"
                            : "border-border text-foreground"
                        }`}
                      >
                        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                          idx {index}
                        </div>
                        <div className="mt-2 text-lg font-bold">{value}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

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
                    index
                  </div>
                  <div className="mt-2 text-lg font-bold text-foreground">
                    {frame.i < 0 || frame.i >= nums.length ? "—" : frame.i}
                  </div>
                </div>

                <div className="border border-border bg-background/50 p-3">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    value
                  </div>
                  <div className="mt-2 text-lg font-bold text-foreground">
                    {frame.value ?? "—"}
                  </div>
                </div>

                <div className="border border-border bg-background/50 p-3">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    need
                  </div>
                  <div className="mt-2 text-lg font-bold text-primary">
                    {frame.need ?? "—"}
                  </div>
                </div>

                <div className="border border-border bg-background/50 p-3">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    answer
                  </div>
                  <div className="mt-2 text-lg font-bold text-foreground">
                    {frame.answer ? `[${frame.answer.join(", ")}]` : "—"}
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
                current hash map
              </div>

              <div className="space-y-2">
                {Object.keys(frame.seen).length === 0 ? (
                  <div className="border border-border bg-background/60 px-3 py-2 text-sm text-muted-foreground">
                    (empty)
                  </div>
                ) : (
                  Object.entries(frame.seen).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between border border-border bg-background/60 px-3 py-2 text-sm"
                    >
                      <span className="font-bold text-foreground">{key}</span>
                      <span className="text-primary">index {value}</span>
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
                <p>1. Arrays hold the sequence.</p>
                <p>2. The hash map stores fast memory while scanning.</p>
                <p>3. We check for the complement before inserting current value.</p>
                <p>4. That gives O(n) time instead of O(n²).</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
