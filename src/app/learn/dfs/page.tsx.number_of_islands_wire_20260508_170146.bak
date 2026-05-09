import Link from "next/link";
import DFSCodeTabs from "@/components/DFSCodeTabs";

const Section = ({
  id,
  idx,
  title,
  children,
}: {
  id: string;
  idx: string;
  title: string;
  children: React.ReactNode;
}) => (
  <section id={id} className="border-b border-border py-10 md:py-14">
    <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
      {idx} // {id.replace(/-/g, "_")}
    </div>
    <h2 className="mt-2 text-2xl md:text-4xl font-bold">
      <span className="text-primary text-glow">$</span> {title}
    </h2>
    <div className="mt-5 text-sm md:text-[15px] text-muted-foreground leading-relaxed space-y-4 max-w-3xl">
      {children}
    </div>
  </section>
);

const Code = ({ children }: { children: string }) => (
  <pre className="terminal-frame overflow-x-auto p-4 text-[12px] md:text-xs leading-relaxed text-foreground">
    {children}
  </pre>
);

const TOC = [
  ["root-problem", "01", "Root Problem"],
  ["why-stack", "02", "Why a Stack / Recursion?"],
  ["intuition", "03", "DFS Intuition"],
  ["walkthrough", "04", "Step-by-Step Example"],
  ["code", "05", "Code Implementation"],
  ["complexity", "06", "Time Complexity"],
  ["real-world", "07", "Real-World Uses"],
  ["practice", "08", "Practice Problems"],
] as const;

export default function LearnDFS() {
  return (
    <main className="relative min-h-screen">
      <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
        <div className="container flex h-14 items-center justify-between px-4 md:px-8">
          <Link href="/" className="flex items-center gap-2 text-sm font-bold tracking-widest">
            <span className="inline-block h-3 w-3 bg-primary shadow-[0_0_12px_hsl(var(--primary))]" />
            <span className="text-glow">DSA<span className="text-muted-foreground">.</span>ENGINE</span>
          </Link>
          <nav className="flex items-center gap-4 text-[11px] uppercase tracking-widest text-muted-foreground">
            <Link href="/visualize/dfs" className="hover:text-primary">// visualizer</Link>
            <Link href="/" className="hover:text-primary">// home</Link>
          </nav>
        </div>
      </header>

      <section className="border-b border-border">
        <div className="container px-4 md:px-8 py-12 md:py-16">
          <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            learn // dfs · module 07
          </div>
          <h1 className="mt-2 text-4xl md:text-6xl font-extrabold leading-[0.95]">
            Depth-First<br />
            <span className="text-primary text-glow">Search.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-sm md:text-base text-muted-foreground leading-relaxed">
            DFS is the algorithm for exploring structure deeply before coming back.
            It is the foundation for recursion, backtracking, connected components, cycle detection, and many graph problems.
          </p>

          <div className="mt-8 grid md:grid-cols-[260px_1fr] gap-8">
            <aside className="terminal-frame p-4 h-fit md:sticky md:top-20">
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
                ./table_of_contents
              </div>
              <ul className="space-y-1.5 text-xs">
                {TOC.map(([id, idx, title]) => (
                  <li key={id}>
                    <a href={`#${id}`} className="flex gap-2 text-muted-foreground hover:text-primary transition-colors">
                      <span className="text-primary/70">{idx}</span>
                      <span>{title}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <Link
                href="/visualize/dfs"
                className="mt-4 block border border-primary bg-primary/10 px-3 py-2 text-center text-[10px] font-bold tracking-widest text-primary hover:bg-primary hover:text-primary-foreground"
              >
                ▶ OPEN VISUALIZER
              </Link>
            </aside>

            <div>
              <Section id="root-problem" idx="01" title="The Root Problem">
                <p>
                  Sometimes the goal is not the shortest path. Sometimes the real goal is:
                </p>
                <p className="border-l-2 border-primary pl-4 text-foreground">
                  “Go as deep as possible into the structure, then backtrack when you hit a dead end.”
                </p>
                <p>
                  That is the natural behavior of DFS. It is ideal when you want to fully explore a branch before checking alternatives.
                </p>
              </Section>

              <Section id="why-stack" idx="02" title="Why a Stack / Recursion?">
                <p>
                  DFS needs to remember where it came from so it can backtrack later.
                  That behavior matches a <span className="text-primary">stack</span>:
                  last in, first out.
                </p>
                <p>
                  Recursion gives you this stack automatically through the call stack.
                  An explicit stack gives you the same behavior iteratively.
                </p>
                <Code>{`stack      → iterative DFS
recursion  → recursive DFS
queue      → BFS, not DFS`}</Code>
              </Section>

              <Section id="intuition" idx="03" title="DFS Intuition">
                <p>DFS follows one branch to the bottom before exploring siblings.</p>
                <ul className="list-none space-y-2 pl-0">
                  <li><span className="text-primary">▸ current</span> — the node we are exploring now</li>
                  <li><span className="text-primary">▸ visited</span> — prevents revisits and cycles</li>
                  <li><span className="text-primary">▸ stack / recursion path</span> — remembers how to return</li>
                </ul>
                <p>
                  Core idea: visit node → recursively visit first unvisited neighbor → keep going deeper → backtrack when done.
                </p>
              </Section>

              <Section id="walkthrough" idx="04" title="Step-by-Step Example">
                <p>
                  The DFS visualizer shows exactly how the recursion path grows and shrinks.
                </p>
                <Link
                  href="/visualize/dfs"
                  className="inline-flex items-center gap-2 border-2 border-primary bg-primary px-5 py-3 text-sm font-bold tracking-widest text-primary-foreground hover:shadow-[var(--shadow-glow)]"
                >
                  ▶ LAUNCH VISUALIZER
                </Link>
                <p className="mt-4">One possible DFS order on this graph is:</p>
                <Code>{`A → B → D → E → H → C → F → I → G`}</Code>
              </Section>

              <Section id="code" idx="05" title="Code Implementation">
                <p>
                  Same DFS logic, shown across multiple languages.
                  The important invariant stays the same:
                  <span className="text-primary"> mark visited immediately when you enter the node.</span>
                </p>
                <DFSCodeTabs />
                <p>
                  Recursive DFS is the cleanest mental model, but the same traversal can also be implemented iteratively using an explicit stack.
                </p>
              </Section>

              <Section id="complexity" idx="06" title="Time Complexity">
                <Code>{`Time:   O(V + E)
Space:  O(V)

V = number of vertices (nodes)
E = number of edges`}</Code>

                <p>
                  To derive DFS time complexity properly, split the work into the operations DFS actually performs.
                  Don&apos;t just memorize <span className="text-primary">O(V + E)</span> — compute where it comes from.
                </p>

                <div className="space-y-4">
                  <div className="terminal-frame p-4">
                    <div className="text-sm font-bold text-foreground">1. Entering each node once → O(V)</div>
                    <div className="mt-2 text-[13px] text-muted-foreground leading-relaxed">
                      A node is only entered one time because the <span className="text-foreground">visited</span> set prevents revisits.
                      Since there are <span className="text-foreground">V</span> nodes total, the recursive call body can execute at most
                      <span className="text-primary"> V</span> times.
                    </div>
                  </div>

                  <div className="terminal-frame p-4">
                    <div className="text-sm font-bold text-foreground">2. Neighbor scanning across all nodes → O(E)</div>
                    <div className="mt-2 text-[13px] text-muted-foreground leading-relaxed">
                      The expensive part is the inner loop, where DFS scans adjacency lists.
                    </div>

                    <div className="mt-3 grid gap-3 md:grid-cols-2">
                      <div className="border border-border bg-background/60 p-3">
                        <div className="mb-2 text-[11px] font-bold tracking-widest text-primary">TypeScript</div>
                        <pre className="overflow-x-auto text-[12px] text-foreground">{`for (const neighbor of adj.get(node) ?? []) {
  ...
}`}</pre>
                      </div>

                      <div className="border border-border bg-background/60 p-3">
                        <div className="mb-2 text-[11px] font-bold tracking-widest text-primary">Python</div>
                        <pre className="overflow-x-auto text-[12px] text-foreground">{`for neighbor in adj.get(node, []):
    ...`}</pre>
                      </div>

                      <div className="border border-border bg-background/60 p-3">
                        <div className="mb-2 text-[11px] font-bold tracking-widest text-primary">Java</div>
                        <pre className="overflow-x-auto text-[12px] text-foreground">{`for (int neighbor : adj.getOrDefault(node, Collections.emptyList())) {
    ...
}`}</pre>
                      </div>

                      <div className="border border-border bg-background/60 p-3">
                        <div className="mb-2 text-[11px] font-bold tracking-widest text-primary">C++</div>
                        <pre className="overflow-x-auto text-[12px] text-foreground">{`for (int neighbor : adj[node]) {
    ...
}`}</pre>
                      </div>

                      <div className="border border-border bg-background/60 p-3">
                        <div className="mb-2 text-[11px] font-bold tracking-widest text-primary">C#</div>
                        <pre className="overflow-x-auto text-[12px] text-foreground">{`foreach (int neighbor in adj.GetValueOrDefault(node, new List<int>())) {
    ...
}`}</pre>
                      </div>

                      <div className="border border-border bg-background/60 p-3">
                        <div className="mb-2 text-[11px] font-bold tracking-widest text-primary">Go</div>
                        <pre className="overflow-x-auto text-[12px] text-foreground">{`for _, neighbor := range adj[node] {
    ...
}`}</pre>
                      </div>
                    </div>

                    <div className="mt-3 text-[13px] text-muted-foreground leading-relaxed">
                      Across the entire DFS, this loop runs once per adjacency entry.
                      <br /><br />
                      In an adjacency-list graph:
                      <br />
                      - for a <span className="text-foreground">directed graph</span>, total neighbor scans = <span className="text-primary">E</span>
                      <br />
                      - for an <span className="text-foreground">undirected graph</span>, each edge appears twice in adjacency lists, so total scans = <span className="text-primary">2E</span>
                      <br /><br />
                      Since constants are ignored in Big-O,
                      <span className="text-primary"> O(2E) = O(E)</span>.
                    </div>
                  </div>

                  <div className="terminal-frame p-4">
                    <div className="text-sm font-bold text-foreground">3. Add the two costs together</div>
                    <div className="mt-2 text-[13px] text-muted-foreground leading-relaxed">
                      Total DFS work =
                    </div>
                    <pre className="mt-3 overflow-x-auto border border-border bg-background/60 p-3 text-[12px] text-foreground">{`node visits       +   edge scans
   O(V)           +     O(E)
= O(V + E)`}</pre>
                  </div>

                  <div className="terminal-frame p-4">
                    <div className="text-sm font-bold text-foreground">4. Space complexity → O(V)</div>
                    <div className="mt-2 text-[13px] text-muted-foreground leading-relaxed">
                      The visited set can store up to <span className="text-foreground">V</span> nodes.
                      The recursion stack can also grow up to <span className="text-foreground">V</span> deep in the worst case
                      (for example, a path graph).
                      If you store traversal order, that is another O(V).
                    </div>
                    <pre className="mt-3 overflow-x-auto border border-border bg-background/60 p-3 text-[12px] text-foreground">{`O(V) + O(V) + O(V) = O(V)`}</pre>
                  </div>
                </div>

                <div className="mt-6 border-l-2 border-primary pl-4 text-sm text-muted-foreground leading-relaxed">
                  <span className="text-primary">Exam shortcut:</span><br />
                  DFS visits every node once and scans every edge once overall, so the total time complexity is
                  <span className="text-foreground"> O(V + E)</span>.
                </div>
              </Section>

              <Section id="real-world" idx="07" title="Real-World Uses">
                <div className="space-y-3">
                  {[
                    ["File system traversal", "Walking through folders and subfolders is naturally a DFS problem."],
                    ["Maze solving", "DFS explores one corridor fully, then backtracks when blocked."],
                    ["Cycle detection", "DFS is used to detect cycles in directed and undirected graphs."],
                    ["Topological sort", "DFS postorder is a core idea behind topological ordering."],
                    ["Backtracking puzzles", "Sudoku, N-Queens, and word search all rely on DFS-style exploration."],
                    ["Connected components", "Run DFS from each unvisited node to discover one full component at a time."],
                  ].map(([title, desc]) => (
                    <div key={title} className="terminal-frame p-4">
                      <div className="text-sm font-bold text-foreground">{title}</div>
                      <div className="mt-1 text-[13px] text-muted-foreground leading-relaxed">{desc}</div>
                    </div>
                  ))}
                </div>
              </Section>

              <Section id="practice" idx="08" title="Practice Problems">
                <ul className="space-y-2 pl-0">
                  {[
                    ["Number of Islands", "EASY", "Classic DFS flood fill on a grid."],
                    ["Max Area of Island", "EASY", "Use DFS to measure connected component size."],
                    ["Course Schedule", "MED", "Detect cycles in a directed graph using DFS states."],
                    ["Clone Graph", "MED", "DFS over graph structure while building copies."],
                    ["Surrounded Regions", "MED", "DFS boundary-connected cells before flipping."],
                  ].map(([t, d, desc]) => (
                    <li key={t} className="terminal-frame flex items-start justify-between gap-3 p-3">
                      <div className="min-w-0">
                        <div className="text-sm font-bold text-foreground">{t}</div>
                        <div className="text-[11px] text-muted-foreground mt-0.5">{desc}</div>
                      </div>
                      <span className={`shrink-0 border px-2 py-0.5 text-[10px] font-bold tracking-widest ${
                        d === "EASY" ? "border-primary text-primary" :
                        d === "MED" ? "border-terminal-amber text-terminal-amber" :
                        "border-terminal-magenta text-terminal-magenta"
                      }`}>
                        {d}
                      </span>
                    </li>
                  ))}
                </ul>
              </Section>

              <div className="py-12">
                <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  // next_module
                </div>

                <h3 className="mt-2 text-2xl md:text-3xl font-bold">
                  Next up: <span className="text-primary text-glow">Connected Components</span>
                </h3>

                <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
                  Continue to the next module to learn how DFS and BFS can discover whole connected regions in a graph.
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href="/learn/connected-components"
                    className="border-2 border-primary bg-primary px-5 py-3 text-sm font-bold tracking-widest text-primary-foreground hover:shadow-[var(--shadow-glow)]"
                  >
                    ▶ OPEN_CONNECTED_COMPONENTS
                  </Link>

                  <Link
                    href="/visualize/connected-components"
                    className="border-2 border-border px-5 py-3 text-sm font-bold tracking-widest hover:border-primary hover:text-primary"
                  >
                    $ OPEN_CC_VISUALIZER
                  </Link>

                  <Link
                    href="/"
                    className="border-2 border-border px-5 py-3 text-sm font-bold tracking-widest hover:border-primary hover:text-primary"
                  >
                    $ back_to_curriculum
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
