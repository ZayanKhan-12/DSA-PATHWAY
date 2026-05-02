 "use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Frame = {
  title: string;
  explanation: string;
  currentStep: string;
  cacheState: string;
  dbState: string;
  queueState: string;
  highlight: string;
  metrics: {
    latency: string;
    dbLoad: string;
    cacheHit: string;
  };
};

const pseudo = [
  "request arrives at API layer",
  "check cache first",
  "if cache miss: read database",
  "fill cache with returned value",
  "optionally enqueue background work",
  "return response to client",
];

const SPEEDS = [
  { label: "0.5x", ms: 2200 },
  { label: "1x", ms: 1300 },
  { label: "2x", ms: 750 },
  { label: "4x", ms: 420 },
] as const;

function buildFrames(): Frame[] {
  return [
    {
      title: "Client sends request",
      explanation: "A user asks for profile:123. The request enters the API layer first.",
      currentStep: "API receives GET /profile/123",
      cacheState: "(empty)",
      dbState: "profile:123 -> {name: 'Zayan'}",
      queueState: "(idle)",
      highlight: "api",
      metrics: { latency: "pending", dbLoad: "low", cacheHit: "no" },
    },
    {
      title: "Check cache",
      explanation: "We check Redis or an in-memory cache before hitting the database.",
      currentStep: "lookup cache(profile:123)",
      cacheState: "(miss)",
      dbState: "profile:123 -> {name: 'Zayan'}",
      queueState: "(idle)",
      highlight: "cache",
      metrics: { latency: "medium", dbLoad: "medium", cacheHit: "miss" },
    },
    {
      title: "Cache miss → read DB",
      explanation: "Because cache missed, the application falls back to the database.",
      currentStep: "db.read(profile:123)",
      cacheState: "(miss)",
      dbState: "read success",
      queueState: "(idle)",
      highlight: "db",
      metrics: { latency: "higher", dbLoad: "higher", cacheHit: "miss" },
    },
    {
      title: "Fill cache",
      explanation: "The fresh database result is written into cache so the next request is cheaper.",
      currentStep: "cache.set(profile:123, value)",
      cacheState: "profile:123 -> {name: 'Zayan'}",
      dbState: "profile:123 -> {name: 'Zayan'}",
      queueState: "(idle)",
      highlight: "cache",
      metrics: { latency: "recovering", dbLoad: "falling", cacheHit: "warming" },
    },
    {
      title: "Optional async side work",
      explanation: "We can queue analytics, feed refresh, or audit logging instead of blocking the response.",
      currentStep: "enqueue analytics(profile_view)",
      cacheState: "profile:123 -> {name: 'Zayan'}",
      dbState: "profile:123 -> {name: 'Zayan'}",
      queueState: "job#441 -> analytics(profile_view)",
      highlight: "queue",
      metrics: { latency: "low", dbLoad: "low", cacheHit: "warming" },
    },
    {
      title: "Return response",
      explanation: "The client gets the response. The next read should now be a cache hit.",
      currentStep: "200 OK",
      cacheState: "profile:123 -> {name: 'Zayan'}",
      dbState: "profile:123 -> {name: 'Zayan'}",
      queueState: "worker will process analytics later",
      highlight: "client",
      metrics: { latency: "low", dbLoad: "low", cacheHit: "ready" },
    },
    {
      title: "Second request becomes cache hit",
      explanation: "The same read now returns from cache immediately, skipping the database.",
      currentStep: "cache hit → return fast",
      cacheState: "profile:123 -> {name: 'Zayan'}",
      dbState: "no query needed",
      queueState: "background processing continues",
      highlight: "cache",
      metrics: { latency: "very low", dbLoad: "minimal", cacheHit: "hit" },
    },
  ];
}

function Box({
  title,
  children,
  active,
}: {
  title: string;
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <div
      className={`border p-5 md:p-6 ${
        active
          ? "border-primary bg-primary/10 shadow-[0_0_20px_rgba(57,255,20,0.14)]"
          : "border-border bg-card/35"
      }`}
    >
      <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
        {title}
      </div>
      <div className="text-lg leading-8 text-muted-foreground">{children}</div>
    </div>
  );
}

export default function SystemDesignPrimerVisualizerPage() {
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
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-background/90">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4 lg:px-10">
          <Link href="/" className="font-mono text-sm font-bold tracking-[0.2em] text-primary">
            ■ DSA.ENGINE
          </Link>

          <div className="flex items-center gap-6 font-mono text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
            <Link href="/learn/system-design-primer" className="transition hover:text-primary">
              // Lesson
            </Link>
            <Link href="/" className="transition hover:text-primary">
              // Home
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1600px] px-6 pb-24 pt-8 lg:px-10">
        <section className="space-y-5">
          <div className="font-mono text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
            Visualize // System_Design_Primer
          </div>

          <h1 className="font-mono text-5xl font-extrabold tracking-tight text-foreground md:text-7xl">
            System Design Primer{" "}
            <span className="text-primary drop-shadow-[0_0_14px_rgba(57,255,20,0.55)]">
              Visualizer.
            </span>
          </h1>

          <p className="max-w-5xl text-xl leading-9 text-muted-foreground">
            This visualizer walks through a classic cache-first request flow so you can see where
            the client, API, cache, database, and queue each fit into the system.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/learn/system-design-primer"
              className="border border-primary bg-primary/10 px-5 py-3 font-mono text-sm font-bold uppercase tracking-[0.3em] text-primary transition hover:bg-primary hover:text-background"
            >
              ▶ Read_The_Lesson
            </Link>

            <Link
              href="/"
              className="border border-border px-5 py-3 font-mono text-sm font-bold uppercase tracking-[0.3em] text-foreground transition hover:border-primary hover:text-primary"
            >
              $ Back_To_Home
            </Link>
          </div>
        </section>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.45fr_0.9fr]">
          <section className="border border-border bg-card/35">
            <div className="border-b border-border bg-secondary/55 px-5 py-3 text-sm text-muted-foreground">
              ~/visualize/system-design-primer.ts — step {step + 1}/{frames.length}
            </div>

            <div className="space-y-5 p-5 md:p-6">
              <Box title="Current Action" active>
                <div className="text-3xl font-bold text-foreground">{frame.title}</div>
                <div className="mt-3">{frame.explanation}</div>
              </Box>

              <div className="grid gap-4 md:grid-cols-3">
                <Box title="Latency" active={frame.highlight === "client"}>
                  <div className="font-mono text-3xl font-extrabold text-primary">{frame.metrics.latency}</div>
                </Box>
                <Box title="DB Load" active={frame.highlight === "db"}>
                  <div className="font-mono text-3xl font-extrabold text-terminal-amber">{frame.metrics.dbLoad}</div>
                </Box>
                <Box title="Cache Status" active={frame.highlight === "cache"}>
                  <div className="font-mono text-3xl font-extrabold text-terminal-cyan">{frame.metrics.cacheHit}</div>
                </Box>
              </div>

              <div className="grid gap-4 xl:grid-cols-2">
                <Box title="System Pipeline">
                  <div className="space-y-3 font-mono text-base">
                    <div className={frame.highlight === "client" ? "text-primary" : ""}>CLIENT</div>
                    <div>↓</div>
                    <div className={frame.highlight === "api" ? "text-primary" : ""}>API SERVER</div>
                    <div>↓</div>
                    <div className={frame.highlight === "cache" ? "text-primary" : ""}>CACHE</div>
                    <div>↓</div>
                    <div className={frame.highlight === "db" ? "text-primary" : ""}>DATABASE</div>
                    <div>↓</div>
                    <div className={frame.highlight === "queue" ? "text-primary" : ""}>QUEUE / WORKERS</div>
                  </div>
                </Box>

                <Box title="Current Step Trace">
                  <div className="font-mono text-xl text-foreground">{frame.currentStep}</div>
                </Box>
              </div>

              <div className="grid gap-4 xl:grid-cols-3">
                <Box title="Cache State" active={frame.highlight === "cache"}>
                  <div className="font-mono text-base">{frame.cacheState}</div>
                </Box>

                <Box title="Database State" active={frame.highlight === "db"}>
                  <div className="font-mono text-base">{frame.dbState}</div>
                </Box>

                <Box title="Queue State" active={frame.highlight === "queue"}>
                  <div className="font-mono text-base">{frame.queueState}</div>
                </Box>
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
            <Box title="Pseudocode">
              <div className="space-y-2">
                {pseudo.map((line, i) => (
                  <div
                    key={i}
                    className={`border px-3 py-3 text-sm ${
                      i === step || (step > 5 && i === 1)
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border bg-background/45 text-muted-foreground"
                    }`}
                  >
                    <span className="mr-3 font-mono text-primary">{i + 1}</span>
                    {line}
                  </div>
                ))}
              </div>
            </Box>

            <Box title="Design Rules">
              <p>Cache first when reads dominate and staleness is acceptable.</p>
              <p>Queue background work instead of blocking user-facing latency.</p>
              <p>Shard when one database becomes the bottleneck.</p>
              <p>Choose consistency level based on correctness requirements.</p>
            </Box>

            <Box title="Mental Model">
              <p>Cache = speed</p>
              <p>Queue = smoothing spikes</p>
              <p>Shard = splitting load</p>
              <p>Consistency = correctness vs latency / scale trade-off</p>
            </Box>
          </aside>
        </div>
      </main>
    </div>
  );
}
