import Link from "next/link";
import { CurriculumTable } from "@/components/CurriculumTable";
import { GraphVisualizer } from "@/components/GraphVisualizer";
import { HeroTerminal } from "@/components/HeroTerminal";
import { PhilosophyFlow } from "@/components/PhilosophyFlow";

const Stat = ({ k, v, sub }: { k: string; v: string; sub: string }) => (
  <div className="border border-border bg-card/40 p-4">
    <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{k}</div>
    <div className="mt-1 text-2xl md:text-3xl font-bold text-glow text-primary">{v}</div>
    <div className="mt-0.5 text-[11px] text-muted-foreground">{sub}</div>
  </div>
);

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* NAV */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
        <div className="container flex h-14 items-center justify-between px-4 md:px-8">
          <a href="/" className="flex items-center gap-2 text-sm font-bold tracking-widest">
            <span className="inline-block h-3 w-3 bg-primary shadow-[0_0_12px_hsl(var(--primary))]" />
            <span className="text-glow">DSA<span className="text-muted-foreground">.</span>ENGINE</span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-[11px] uppercase tracking-widest text-muted-foreground">
            <a href="#method" className="hover:text-primary transition-colors">// method</a>
            <a href="/visualize/bfs" className="hover:text-primary transition-colors">// visualize</a>
            <a href="/learn/bfs" className="hover:text-primary transition-colors">// curriculum</a>
            <a href="#stack" className="hover:text-primary transition-colors">// stack</a>
          </nav>
          <a
            href="/learn/bfs"
            className="border border-primary bg-primary/10 px-3 py-1.5 text-[11px] font-bold tracking-widest text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            ./start →
          </a>
        </div>
      </header>

      {/* HERO */}
      <section id="top" className="relative border-b border-border">
        <div className="container px-4 md:px-8 py-12 md:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14 items-center">
            <div>
              <div className="inline-flex items-center gap-2 border border-border bg-card/60 px-2.5 py-1 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                <span className="h-1.5 w-1.5 bg-primary animate-pulse" />
                v0.4.2 · public beta
              </div>
              <h1 className="mt-5 text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[0.95] tracking-tight">
                <span className="text-glow">LEARN_DSA</span>
                <br />
                <span className="text-muted-foreground">LIKE A</span>{" "}
                <span className="text-primary text-glow">COMPILER.</span>
              </h1>
              <p className="mt-6 max-w-xl text-sm md:text-base text-muted-foreground leading-relaxed">
                Not flashcards. Not 3000 random problems. A surgical pipeline:
                <span className="text-foreground"> root problem → visual intuition → algorithm → code.</span>{" "}
                Built by an engineer who got tired of LeetCode roulette.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="/learn/bfs"
                  className="group inline-flex items-center gap-2 border-2 border-primary bg-primary px-5 py-3 text-sm font-bold tracking-widest text-primary-foreground hover:shadow-[var(--shadow-glow)] transition-all"
                >
                  <span>▶</span> RUN_CURRICULUM
                </a>
                <a
                  href="/visualize/bfs"
                  className="inline-flex items-center gap-2 border-2 border-border px-5 py-3 text-sm font-bold tracking-widest text-foreground hover:border-primary hover:text-primary transition-colors"
                >
                  <span className="text-primary">$</span> see_visualizer
                </a>
              </div>

              <div className="mt-10 grid grid-cols-3 gap-3 max-w-lg">
                <Stat k="modules" v="12" sub="from arrays → graphs" />
                <Stat k="problems" v="211" sub="curated, not bulk" />
                <Stat k="latency" v="<16ms" sub="WASM-rendered viz" />
              </div>
            </div>

            <div className="relative">
              <HeroTerminal />
              <div className="absolute -bottom-3 -right-3 hidden md:block border border-border bg-card px-2 py-1 text-[10px] text-muted-foreground">
                tty/0 · UTF-8 · 80×24
              </div>
            </div>
          </div>

          <div className="ascii-divider mt-16 text-xs">
            ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section id="method" className="border-b border-border">
        <div className="container px-4 md:px-8 py-16 md:py-24">
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-10 items-start">
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                section_01 // philosophy
              </div>
              <h2 className="mt-2 text-3xl md:text-5xl font-bold leading-tight">
                Stop memorizing.<br />
                <span className="text-primary text-glow">Start compiling.</span>
              </h2>
              <p className="mt-5 text-sm md:text-base text-muted-foreground max-w-md leading-relaxed">
                LeetCode teaches you to recognize problems. NeetCode teaches you to categorize them.
                We teach you to <span className="text-foreground">derive them</span> — so when the
                interviewer twists the prompt, your brain doesn't segfault.
              </p>
              <div className="mt-6 border-l-2 border-primary pl-4 text-sm text-muted-foreground">
                <span className="text-primary">"</span>The pattern isn't memorized.
                The pattern is <span className="text-foreground">re-derived in 4 seconds</span> because
                the structure of the problem demands it.<span className="text-primary">"</span>
              </div>
            </div>
            <PhilosophyFlow />
          </div>
        </div>
      </section>

      {/* VISUALIZER */}
      <section id="visualize" className="border-b border-border bg-card/20">
        <div className="container px-4 md:px-8 py-16 md:py-24">
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 items-start">
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                section_02 // visualizer
              </div>
              <h2 className="mt-2 text-3xl md:text-5xl font-bold leading-tight">
                Watch the<br />
                algorithm <span className="text-primary text-glow">think.</span>
              </h2>
              <p className="mt-5 text-sm md:text-base text-muted-foreground max-w-md leading-relaxed">
                Every traversal, every recursion, every state change — rendered live in WASM.
                Toggle BFS / DFS. Step through the queue. See why the order matters.
              </p>
              <ul className="mt-6 space-y-2 text-xs text-muted-foreground">
                <li><span className="text-primary">▸</span> 60fps Rust → WASM render pipeline</li>
                <li><span className="text-primary">▸</span> Step-by-step trace with state inspection</li>
                <li><span className="text-primary">▸</span> Custom graph editor (paste adjacency lists)</li>
                <li><span className="text-primary">▸</span> Side-by-side algorithm comparison mode</li>
              </ul>
            </div>
            <GraphVisualizer />
          </div>
        </div>
      </section>

      {/* CURRICULUM */}
      <section id="curriculum" className="border-b border-border">
        <div className="container px-4 md:px-8 py-16 md:py-24">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                section_03 // curriculum
              </div>
              <h2 className="mt-2 text-3xl md:text-5xl font-bold leading-tight">
                The <span className="text-primary text-glow">manifest.</span>
              </h2>
              <p className="mt-3 max-w-xl text-sm text-muted-foreground">
                Click a module. Each one ships with a visualizer, intuition primer,
                and a hand-curated problem set. No filler.
              </p>
            </div>
            <div className="hidden md:flex items-center gap-3 text-[10px] uppercase tracking-widest text-muted-foreground">
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 bg-primary" /> ready</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 bg-terminal-amber" /> beta</span>
              <span className="flex items-center gap-1.5"><span className="h-2 w-2 bg-muted-foreground/50" /> soon</span>
            </div>
          </div>
          <CurriculumTable />
        </div>
      </section>

      {/* STACK */}
      <section id="stack" className="border-b border-border bg-card/20">
        <div className="container px-4 md:px-8 py-16 md:py-24">
          <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            section_04 // architecture
          </div>
          <h2 className="mt-2 text-3xl md:text-5xl font-bold leading-tight">
            Built on a <span className="text-primary text-glow">serious</span> stack.
          </h2>

          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { layer: "FRONTEND", tech: "Next.js · TS · Tailwind", role: "UI, routing, state" },
              { layer: "ENGINE", tech: "Rust → WASM", role: "60fps visualizers" },
              { layer: "API", tech: "ASP.NET Core", role: "Auth · progress · business logic" },
              { layer: "DATA", tech: "Postgres · Redis", role: "Persistence · queues · cache" },
            ].map((s) => (
              <div key={s.layer} className="terminal-frame p-4 hover:border-primary transition-colors group">
                <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  {s.layer}
                </div>
                <div className="mt-2 text-base font-bold text-foreground group-hover:text-primary group-hover:text-glow transition-all">
                  {s.tech}
                </div>
                <div className="mt-2 text-[11px] text-muted-foreground">{s.role}</div>
              </div>
            ))}
          </div>

          <pre className="mt-10 overflow-x-auto border border-border bg-background/60 p-4 md:p-6 text-[10px] md:text-xs text-muted-foreground leading-relaxed">
{`Client ──▶ Next.js ──▶ Rust/WASM Engine
                │
                ▼
            ASP.NET Core API ──▶ Postgres
                │                   │
                ▼                   ▼
              Redis ──────▶ Code Runner (Rust/Go) ──▶ Worker pool`}
          </pre>
        </div>
      </section>

      {/* CTA */}
      <section className="border-b border-border">
        <div className="container px-4 md:px-8 py-20 md:py-28 text-center">
          <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            // exec final
          </div>
          <h2 className="mt-3 text-4xl md:text-6xl font-extrabold leading-tight">
            Your next interview<br />
            <span className="text-primary text-glow">won't know what hit it.</span>
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="/learn/bfs"
              className="border-2 border-primary bg-primary px-6 py-3 text-sm font-bold tracking-widest text-primary-foreground hover:shadow-[var(--shadow-glow)] transition-all"
            >
              ▶ START_MODULE_01
            </a>
            <a
              href="https://www.linkedin.com/in/zayan-k12/"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-border px-6 py-3 text-sm font-bold tracking-widest hover:border-primary hover:text-primary transition-colors"
            >
              $ linkedin
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="container px-4 md:px-8 py-10 text-[11px] text-muted-foreground">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
          <div>
            <div className="font-bold text-foreground">DSA.ENGINE</div>
            <div className="mt-1">© 2026 Zayan Khan · Computer Science · Software Engineer</div>
          </div>
          <div className="flex gap-5">
            <a href="mailto:khanzayan_123@hotmail.com" className="hover:text-primary transition-colors">email</a>
            <a href="https://www.linkedin.com/in/zayan-k12/" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">linkedin</a>
            <a href="/" className="hover:text-primary transition-colors">↑ top</a>
          </div>
        </div>
        <div className="mt-6 ascii-divider">
          ─── built with rustc + tsc + obsessive attention to time complexity ───
        </div>
      </footer>
    </main>
  );
}
