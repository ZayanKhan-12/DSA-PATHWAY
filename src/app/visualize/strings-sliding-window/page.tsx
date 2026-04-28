"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Frame = {
  left: number;
  right: number;
  current: string;
  seen: Record<string, number>;
  best: number;
  explain: string;
  activeChar: string | null;
};

const s = "abcabcbb";

function buildFrames(): Frame[] {
  const frames: Frame[] = [];
  const seen: Record<string, number> = {};
  let left = 0;
  let best = 0;

  frames.push({
    left: 0,
    right: -1,
    current: "",
    seen: {},
    best: 0,
    explain: "Start with an empty window. We will move right forward and only move left when the window becomes invalid.",
    activeChar: null,
  });

  for (let right = 0; right < s.length; right++) {
    const ch = s[right];

    frames.push({
      left,
      right,
      current: s.slice(left, right + 1),
      seen: { ...seen },
      best,
      explain: `Expand right to index ${right}. Character '${ch}' enters the window.`,
      activeChar: ch,
    });

    if (seen[ch] !== undefined && seen[ch] >= left) {
      const oldLeft = left;
      left = seen[ch] + 1;

      frames.push({
        left,
        right,
        current: s.slice(left, right + 1),
        seen: { ...seen },
        best,
        explain: `'${ch}' was already inside the valid window, so move left from ${oldLeft} to ${left} to remove the duplicate.`,
        activeChar: ch,
      });
    }

    seen[ch] = right;
    best = Math.max(best, right - left + 1);

    frames.push({
      left,
      right,
      current: s.slice(left, right + 1),
      seen: { ...seen },
      best,
      explain: `Store '${ch}' → ${right}. Current valid window = "${s.slice(left, right + 1)}". Best length so far = ${best}.`,
      activeChar: ch,
    });
  }

  frames.push({
    left,
    right: s.length - 1,
    current: s.slice(left),
    seen: { ...seen },
    best,
    explain: `Finished. The longest substring without repeating characters has length ${best}.`,
    activeChar: null,
  });

  return frames;
}

export default function StringsSlidingWindowVisualizerPage() {
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
            <Link href="/learn/strings-sliding-window" className="hover:text-primary transition-colors">
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
          visualize // strings_sliding_window
        </div>

        <h1 className="mt-2 text-4xl md:text-6xl font-extrabold leading-[0.95]">
          Strings & Sliding Window
          <br />
          <span className="text-primary text-glow">Visualizer.</span>
        </h1>

        <p className="mt-5 max-w-3xl text-sm md:text-base text-muted-foreground leading-relaxed">
          This visualizer shows the sliding-window solution for{" "}
          <span className="text-foreground">Longest Substring Without Repeating Characters</span>
          {" "}step by step. Watch how the window expands, how left repairs duplicate conflicts,
          and how the best answer is updated.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/learn/strings-sliding-window"
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
                  ~/visualize/strings-sliding-window.ts — step {step + 1}/{frames.length}
                </span>
              </div>
            </div>

            <div className="p-4 md:p-5 space-y-4">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
                  input string
                </div>
                <div className="border border-border bg-background/60 p-4 text-sm text-muted-foreground">
                  s = "{s}"
                </div>
              </div>

              <div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
                  live window
                </div>
                <div className="flex flex-wrap gap-3">
                  {Array.from(s).map((ch, index) => {
                    const inWindow = frame.right >= 0 && index >= frame.left && index <= frame.right;
                    const active = index === frame.right;

                    return (
                      <div
                        key={index}
                        className={`border px-4 py-3 min-w-[72px] text-center ${
                          active
                            ? "border-yellow-400 bg-yellow-400/10 text-yellow-300"
                            : inWindow
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-border text-foreground"
                        }`}
                      >
                        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                          {index}
                        </div>
                        <div className="mt-2 text-lg font-bold">{ch}</div>
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

              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                <div className="border border-border bg-background/50 p-3">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    left
                  </div>
                  <div className="mt-2 text-lg font-bold text-foreground">{frame.left}</div>
                </div>

                <div className="border border-border bg-background/50 p-3">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    right
                  </div>
                  <div className="mt-2 text-lg font-bold text-foreground">
                    {frame.right >= 0 ? frame.right : "—"}
                  </div>
                </div>

                <div className="border border-border bg-background/50 p-3">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    active char
                  </div>
                  <div className="mt-2 text-lg font-bold text-primary">
                    {frame.activeChar ?? "—"}
                  </div>
                </div>

                <div className="border border-border bg-background/50 p-3">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    current window
                  </div>
                  <div className="mt-2 text-lg font-bold text-foreground">
                    "{frame.current}"
                  </div>
                </div>

                <div className="border border-border bg-background/50 p-3">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    best
                  </div>
                  <div className="mt-2 text-lg font-bold text-primary">{frame.best}</div>
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
                seen map
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
                      <span className="text-primary">last seen @ {value}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="terminal-frame p-4">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
                algorithm summary
              </div>

              <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                <p>1. Expand with right.</p>
                <p>2. Detect whether the current character violates uniqueness.</p>
                <p>3. Move left just far enough to remove the conflict.</p>
                <p>4. Update best using the current valid window length.</p>
              </div>
            </div>

            <div className="terminal-frame p-4">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
                why it is O(n)
              </div>

              <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                <p>▸ right moves from 0 to n - 1 once</p>
                <p>▸ left also only moves forward</p>
                <p>▸ total pointer movement is linear</p>
                <p>▸ hash lookups are O(1) average</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
