"use client";

import { useEffect, useMemo, useState } from "react";

type Frame = {
  step: number;
  action: string;
  explanation: string;
  i: number;
  value: number;
  dp: number[];
  activePseudo: number[];
};

const nums = [2, 7, 9, 3, 1];

const pseudo = [
  "dp[0] = nums[0]",
  "dp[1] = max(nums[0], nums[1])",
  "for i from 2 to n - 1:",
  "  take = dp[i - 2] + nums[i]",
  "  skip = dp[i - 1]",
  "  dp[i] = max(take, skip)",
  "answer = dp[n - 1]",
];

function buildFrames(): Frame[] {
  const frames: Frame[] = [];
  const dp = new Array(nums.length).fill(0);

  dp[0] = nums[0];
  frames.push({
    step: 1,
    action: "Initialize dp[0]",
    explanation: `With only one house, the best we can do is rob house 0, so dp[0] = ${dp[0]}.`,
    i: 0,
    value: nums[0],
    dp: [...dp],
    activePseudo: [0],
  });

  dp[1] = Math.max(nums[0], nums[1]);
  frames.push({
    step: 2,
    action: "Initialize dp[1]",
    explanation: `For the first two houses, choose the better one: max(${nums[0]}, ${nums[1]}) = ${dp[1]}.`,
    i: 1,
    value: nums[1],
    dp: [...dp],
    activePseudo: [1],
  });

  for (let i = 2; i < nums.length; i++) {
    const take = dp[i - 2] + nums[i];
    const skip = dp[i - 1];

    frames.push({
      step: frames.length + 1,
      action: `Evaluate house ${i}`,
      explanation: `At house ${i}, compare: take = dp[${i - 2}] + nums[${i}] = ${dp[i - 2]} + ${nums[i]} = ${take}, skip = dp[${i - 1}] = ${skip}.`,
      i,
      value: nums[i],
      dp: [...dp],
      activePseudo: [2, 3, 4],
    });

    dp[i] = Math.max(take, skip);

    frames.push({
      step: frames.length + 1,
      action: `Write dp[${i}]`,
      explanation: `Store the better choice: dp[${i}] = max(${take}, ${skip}) = ${dp[i]}.`,
      i,
      value: nums[i],
      dp: [...dp],
      activePseudo: [5],
    });
  }

  frames.push({
    step: frames.length + 1,
    action: "Finish",
    explanation: `The final answer is dp[n - 1] = dp[${nums.length - 1}] = ${dp[nums.length - 1]}.`,
    i: nums.length - 1,
    value: nums[nums.length - 1],
    dp: [...dp],
    activePseudo: [6],
  });

  return frames;
}

function Cell({
  label,
  value,
  active = false,
}: {
  label: string;
  value: string | number;
  active?: boolean;
}) {
  return (
    <div className={`border px-4 py-4 text-center ${active ? "border-primary bg-primary/10" : "border-border bg-background/60"}`}>
      <div className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">{label}</div>
      <div className={`mt-3 text-3xl font-bold ${active ? "text-primary" : "text-foreground"}`}>{value}</div>
    </div>
  );
}

export default function DP1Stepper() {
  const frames = useMemo(() => buildFrames(), []);
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

  return (
    <div className="border border-border bg-card/35">
      <div className="border-b border-border bg-secondary/55 px-5 py-3 text-sm text-muted-foreground">
        ~/visualize/dp1-house-robber.ts — step {step + 1}/{frames.length}
      </div>

      <div className="space-y-5 p-5 md:p-6">
        <div className="border border-border bg-background/45 p-4 md:p-5">
          <div className="text-[10px] uppercase tracking-[0.34em] text-muted-foreground">Action</div>
          <div className="mt-3 text-xl font-bold text-foreground md:text-2xl">{frame.action}</div>
        </div>

        <div className="border border-border bg-background/45 p-4 md:p-5">
          <div className="text-[10px] uppercase tracking-[0.34em] text-muted-foreground">Explanation</div>
          <p className="mt-3 text-sm leading-7 text-muted-foreground md:text-base">{frame.explanation}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <Cell label="Current Index" value={frame.i} active />
          <Cell label="nums[i]" value={frame.value} />
          <Cell label="Best So Far" value={frame.dp[frame.i]} />
        </div>

        <div className="border border-border bg-card/25 p-4 md:p-5">
          <div className="mb-5 text-xs uppercase tracking-[0.34em] text-muted-foreground">
            Input Array
          </div>

          <div className="grid grid-cols-5 gap-3">
            {nums.map((n, idx) => (
              <Cell
                key={idx}
                label={`nums[${idx}]`}
                value={n}
                active={idx === frame.i}
              />
            ))}
          </div>
        </div>

        <div className="border border-border bg-card/25 p-4 md:p-5">
          <div className="mb-5 text-xs uppercase tracking-[0.34em] text-muted-foreground">
            DP Table
          </div>

          <div className="grid grid-cols-5 gap-3">
            {frame.dp.map((n, idx) => (
              <Cell
                key={idx}
                label={`dp[${idx}]`}
                value={n}
                active={idx === frame.i}
              />
            ))}
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

            <div className="text-sm text-muted-foreground">
              Final target: <span className="font-bold text-primary">dp[n - 1]</span>
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
    </div>
  );
}
