import Link from "next/link";
import DP2Stepper from "@/components/dp/DP2Stepper";

export default function DynamicProgramming2VisualizerPage() {
  return (
    <main className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
        <div className="container h-14 px-4 md:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold tracking-widest text-sm">
            <span className="h-3 w-3 bg-primary shadow-[0_0_14px_hsl(var(--primary))]" />
            <span className="text-primary text-glow">DSA.ENGINE</span>
          </Link>

          <div className="flex items-center gap-6 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            <Link href="/learn/dynamic-programming-2" className="hover:text-primary transition-colors">
              // lesson
            </Link>
            <Link href="/" className="hover:text-primary transition-colors">
              // home
            </Link>
          </div>
        </div>
      </header>

      <div className="container max-w-[1680px] px-4 md:px-5 py-6 md:py-8">
        <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          visualize // dynamic_programming_2
        </div>

        <h1 className="mt-1 text-4xl md:text-[52px] font-extrabold leading-[0.92]">
          Dynamic Programming II
          <br />
          <span className="text-primary text-glow">Visualizer.</span>
        </h1>

        <p className="mt-3 max-w-6xl text-sm md:text-[14px] text-muted-foreground leading-6">
          Explore classic 2D DP problems with interactive visualizations.
          Watch how cells depend on top, left, diagonal, or other earlier states depending on the DP model.
        </p>

        <div className="mt-5 flex flex-wrap gap-2.5">
          <Link
            href="/learn/dynamic-programming-2"
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

        <div className="mt-6">
          <DP2Stepper />
        </div>
      </div>
    </main>
  );
}
