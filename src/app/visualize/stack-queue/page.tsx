"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Frame = {
  index: number;
  ch: string | null;
  stack: string[];
  valid: boolean;
  explain: string;
};

const input = "([]){}";

function buildFrames(): Frame[] {
  const frames: Frame[] = [];
  const stack: string[] = [];
  const pairs: Record<string, string> = {
    ")": "(",
    "]": "[",
    "}": "{",
  };

  frames.push({
    index: -1,
    ch: null,
    stack: [],
    valid: true,
    explain: "Start with an empty stack. Openers will be pushed. Closers must match the top.",
  });

  for (let i = 0; i < input.length; i++) {
    const ch = input[i];

    if (ch === "(" || ch === "[" || ch === "{") {
      stack.push(ch);
      frames.push({
        index: i,
        ch,
        stack: [...stack],
        valid: true,
        explain: `Read '${ch}'. It is an opener, so push it onto the stack.`,
      });
    } else {
      frames.push({
        index: i,
        ch,
        stack: [...stack],
        valid: true,
        explain: `Read '${ch}'. It is a closer, so compare it with the top of the stack.`,
      });

      if (stack.length === 0 || stack[stack.length - 1] !== pairs[ch]) {
        frames.push({
          index: i,
          ch,
          stack: [...stack],
          valid: false,
          explain: `Mismatch: '${ch}' does not match the current stack top. The string is invalid.`,
        });
        return frames;
      }

      stack.pop();
      frames.push({
        index: i,
        ch,
        stack: [...stack],
        valid: true,
        explain: `'${ch}' matches correctly, so pop the opener from the stack.`,
      });
    }
  }

  frames.push({
    index: input.length,
    ch: null,
    stack: [...stack],
    valid: stack.length === 0,
    explain:
      stack.length === 0
        ? "Finished scanning the string and the stack is empty. The parentheses are valid."
        : "Finished scanning but the stack is not empty. There are unmatched openers left.",
  });

  return frames;
}

export default function StackQueueVisualizerPage() {
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

        <p className="mt-5 max-w-3xl text-sm md:text-base text-muted-foreground leading-relaxed">
          This visualizer shows the stack solution for{" "}
          <span className="text-foreground">Valid Parentheses</span>.
          Watch how openers get pushed, closers validate against the top, and correctness depends on LIFO behavior.
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

        <div className="mt-10 grid grid-cols-1 xl:grid-cols-[1.35fr_0.95fr] gap-8">
          <div className="terminal-frame overflow-hidden">
            <div className="flex items-center justify-between border-b border-border bg-secondary/60 px-3 py-2 text-xs">
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-destructive/70" />
                <span className="h-2 w-2 rounded-full bg-yellow-500/70" />
                <span className="h-2 w-2 rounded-full bg-primary/70" />
                <span className="ml-3">
                  ~/visualize/stack-queue.ts — step {step + 1}/{frames.length}
                </span>
              </div>
            </div>

            <div className="p-4 md:p-5 space-y-4">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
                  input
                </div>
                <div className="border border-border bg-background/60 p-4 text-sm text-muted-foreground">
                  s = "{input}"
                </div>
              </div>

              <div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
                  current character
                </div>
                <div className="border border-border bg-background/60 p-4 text-lg font-bold text-primary">
                  {frame.ch ?? "—"}
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

              <div className="grid grid-cols-3 gap-3">
                <div className="border border-border bg-background/50 p-3">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    index
                  </div>
                  <div className="mt-2 text-lg font-bold text-foreground">
                    {frame.index >= 0 && frame.index < input.length ? frame.index : "—"}
                  </div>
                </div>

                <div className="border border-border bg-background/50 p-3">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    stack size
                  </div>
                  <div className="mt-2 text-lg font-bold text-foreground">
                    {frame.stack.length}
                  </div>
                </div>

                <div className="border border-border bg-background/50 p-3">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    valid
                  </div>
                  <div className={`mt-2 text-lg font-bold ${frame.valid ? "text-primary" : "text-red-400"}`}>
                    {frame.valid ? "YES" : "NO"}
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
                stack state
              </div>

              <div className="border border-border bg-background/60 p-4 min-h-[180px] flex flex-col-reverse gap-2">
                {frame.stack.length === 0 ? (
                  <div className="text-sm text-muted-foreground">(empty)</div>
                ) : (
                  frame.stack.map((item, idx) => (
                    <div
                      key={`${item}-${idx}`}
                      className={`border px-3 py-2 text-sm font-bold text-center ${
                        idx === frame.stack.length - 1
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-foreground"
                      }`}
                    >
                      {item}
                    </div>
                  ))
                )}
              </div>

              <div className="mt-3 text-xs text-muted-foreground">
                Top of stack = last pushed item.
              </div>
            </div>

            <div className="terminal-frame p-4">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
                what this teaches
              </div>

              <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                <p>1. Nested structure is naturally LIFO.</p>
                <p>2. The newest unresolved opener must be closed first.</p>
                <p>3. Stack top is the only legal match target.</p>
                <p>4. Empty-at-end means the structure fully resolved.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
