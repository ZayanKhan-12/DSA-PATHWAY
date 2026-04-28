import Link from "next/link";
import DFSStepper from "@/components/DFSStepper";

export default function VisualizeDFS() {
  return (
    <main className="relative min-h-screen">
      <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
        <div className="container flex h-14 items-center justify-between px-4 md:px-8">
          <Link href="/" className="flex items-center gap-2 text-sm font-bold tracking-widest">
            <span className="inline-block h-3 w-3 bg-primary shadow-[0_0_12px_hsl(var(--primary))]" />
            <span className="text-glow">DSA<span className="text-muted-foreground">.</span>ENGINE</span>
          </Link>
          <nav className="flex items-center gap-4 text-[11px] uppercase tracking-widest text-muted-foreground">
            <Link href="/learn/dfs" className="hover:text-primary">// lesson</Link>
            <Link href="/" className="hover:text-primary">// home</Link>
          </nav>
        </div>
      </header>

      <section className="border-b border-border">
        <div className="container px-4 md:px-8 py-10 md:py-14">
          <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            visualize // dfs
          </div>
          <h1 className="mt-2 text-3xl md:text-5xl font-bold leading-tight">
            Depth-First Search<br />
            <span className="text-primary text-glow">step by step.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-muted-foreground">
            Press <span className="text-primary">STEP →</span> to advance one DFS operation.
            Watch the recursion stack, visited set, and current node update as DFS dives deep and backtracks.
          </p>

          <div className="mt-8">
            <DFSStepper />
          </div>

          <div className="mt-8 grid md:grid-cols-3 gap-3 text-xs">
            <div className="terminal-frame p-4">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">invariant_01</div>
              <div className="mt-1 text-foreground">DFS follows one path <span className="text-primary">as deep as possible</span> before backtracking.</div>
            </div>
            <div className="terminal-frame p-4">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">invariant_02</div>
              <div className="mt-1 text-foreground">A node is marked visited when it is <span className="text-primary">first entered</span>.</div>
            </div>
            <div className="terminal-frame p-4">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">invariant_03</div>
              <div className="mt-1 text-foreground">Backtracking happens only after <span className="text-primary">all descendants</span> are processed.</div>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/learn/dfs" className="border-2 border-primary bg-primary px-5 py-3 text-sm font-bold tracking-widest text-primary-foreground hover:shadow-[var(--shadow-glow)]">
              ▶ READ_THE_LESSON
            </Link>
            <Link href="/" className="border-2 border-border px-5 py-3 text-sm font-bold tracking-widest hover:border-primary hover:text-primary">
              $ back_to_home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
