import Link from "next/link";
import DP1Stepper from "@/components/dp/DP1Stepper";

export default function DynamicProgramming1VisualizerPage() {
  return (
    <main className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
        <div className="container h-14 px-4 md:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold tracking-widest text-sm">
            <span className="h-3 w-3 bg-primary shadow-[0_0_14px_hsl(var(--primary))]" />
            <span className="text-primary text-glow">DSA.ENGINE</span>
          </Link>

          <div className="flex items-center gap-6 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            <Link href="/learn/dynamic-programming-1" className="hover:text-primary transition-colors">
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
          visualize // dynamic_programming_1
        </div>

        <h1 className="mt-2 text-4xl md:text-6xl font-extrabold leading-[0.95]">
          Dynamic Programming I
          <br />
          <span className="text-primary text-glow">Visualizer.</span>
        </h1>

        <p className="mt-5 max-w-4xl text-sm md:text-base text-muted-foreground leading-relaxed">
          This visualizer walks through a classic 1D DP recurrence using House Robber.
          Watch how each dp[i] depends on smaller already-solved states.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/learn/dynamic-programming-1"
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

        <div className="mt-10">
          <DP1Stepper />
        </div>
      </div>
    </main>
  );
}
