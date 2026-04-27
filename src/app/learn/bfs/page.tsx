import Link from "next/link";
import BFSCodeTabs from "@/components/BFSCodeTabs";

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
  ["why-queue", "02", "Why a Queue?"],
  ["intuition", "03", "BFS Intuition"],
  ["walkthrough", "04", "Step-by-Step Example"],
  ["code", "05", "Code Implementation"],
  ["complexity", "06", "Time Complexity"],
  ["real-world", "07", "Real-World Uses"],
  ["practice", "08", "Practice Problems"],
] as const;

export default function LearnBFS() {
  return (
    <main className="relative min-h-screen">
      <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur">
        <div className="container flex h-14 items-center justify-between px-4 md:px-8">
          <Link href="/" className="flex items-center gap-2 text-sm font-bold tracking-widest">
            <span className="inline-block h-3 w-3 bg-primary shadow-[0_0_12px_hsl(var(--primary))]" />
            <span className="text-glow">DSA<span className="text-muted-foreground">.</span>ENGINE</span>
          </Link>
          <nav className="flex items-center gap-4 text-[11px] uppercase tracking-widest text-muted-foreground">
            <Link href="/visualize/bfs" className="hover:text-primary">// visualizer</Link>
            <Link href="/" className="hover:text-primary">// home</Link>
          </nav>
        </div>
      </header>

      <section className="border-b border-border">
        <div className="container px-4 md:px-8 py-12 md:py-16">
          <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            learn // bfs · module 06
          </div>
          <h1 className="mt-2 text-4xl md:text-6xl font-extrabold leading-[0.95]">
            Breadth-First<br />
            <span className="text-primary text-glow">Search.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-sm md:text-base text-muted-foreground leading-relaxed">
            BFS is the algorithm that finds the <span className="text-foreground">shortest path in unweighted graphs</span>.
            Master this and you&apos;ve cracked half of all interview graph problems. Let&apos;s derive it from first principles.
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
                href="/visualize/bfs"
                className="mt-4 block border border-primary bg-primary/10 px-3 py-2 text-center text-[10px] font-bold tracking-widest text-primary hover:bg-primary hover:text-primary-foreground"
              >
                ▶ OPEN VISUALIZER
              </Link>
            </aside>

            <div>
              <Section id="root-problem" idx="01" title="The Root Problem">
                <p>You&apos;re given a maze. Or a social network. Or a chessboard. The question is always some variant of:</p>
                <p className="border-l-2 border-primary pl-4 text-foreground">
                  &quot;What&apos;s the <span className="text-primary">minimum number of steps</span> from A to B?&quot;
                </p>
                <p>
                  If every step costs the same (1 move = 1 unit), then the right tool is BFS. Period.
                  DFS will find <em>a</em> path. BFS finds the <span className="text-foreground">shortest one</span>.
                </p>
              </Section>

              <Section id="why-queue" idx="02" title="Why a Queue?">
                <p>
                  Imagine dropping a stone into a pond. Ripples expand outward — distance 1, then distance 2, then distance 3.
                  BFS mimics this. To do it, we need to process nodes <span className="text-foreground">in the order they were discovered</span>.
                </p>
                <p>
                  That&apos;s the definition of <span className="text-primary">FIFO (first-in, first-out)</span>. A stack (LIFO) would dive deep
                  before exploring siblings — that&apos;s DFS. A queue keeps us level-by-level.
                </p>
                <Code>{`stack  →  DFS  →  goes deep first
queue  →  BFS  →  goes wide first`}</Code>
              </Section>

              <Section id="intuition" idx="03" title="BFS Intuition">
                <p>Three sets, one loop. That&apos;s the whole algorithm:</p>
                <ul className="list-none space-y-2 pl-0">
                  <li><span className="text-primary">▸ queue</span> — nodes we know about but haven&apos;t explored yet</li>
                  <li><span className="text-primary">▸ visited</span> — nodes we&apos;ve already enqueued (to avoid revisits)</li>
                  <li><span className="text-primary">▸ current</span> — the node we&apos;re processing this iteration</li>
                </ul>
                <p>
                  Loop: pop from queue → look at neighbors → push unvisited ones → mark them visited.
                  Repeat until the queue is empty. Done.
                </p>
              </Section>

              <Section id="walkthrough" idx="04" title="Step-by-Step Example">
                <p>The interactive visualizer is the best way to feel this. Press STEP and watch the queue mutate.</p>
                <Link
                  href="/visualize/bfs"
                  className="inline-flex items-center gap-2 border-2 border-primary bg-primary px-5 py-3 text-sm font-bold tracking-widest text-primary-foreground hover:shadow-[var(--shadow-glow)]"
                >
                  ▶ LAUNCH VISUALIZER
                </Link>
                <p className="mt-4">Here&apos;s the trace for a tree rooted at A:</p>
                <Code>{`start: queue=[A]    visited={A}
pop A:  queue=[B,C]  visited={A,B,C}
pop B:  queue=[C,D,E] visited={A,B,C,D,E}
pop C:  queue=[D,E,F,G] visited={A..G}
pop D:  queue=[E,F,G]
pop E:  queue=[F,G,H]
pop F:  queue=[G,H,I]
pop G:  queue=[H,I]
pop H:  queue=[I]
pop I:  queue=[]   ← DONE
visit order: A B C D E F G H I`}</Code>
              </Section>

              <Section id="code" idx="05" title="Code Implementation">
                <p>
                  Same BFS logic, shown across multiple languages.
                  The key invariant stays the same:
                  <span className="text-primary"> mark visited when you enqueue, not when you dequeue.</span>
                </p>
                <BFSCodeTabs />
                <p>
                  <span className="text-terminal-amber">⚠ perf note:</span> some languages make front-removal from a plain array expensive.
                  In production, prefer a real queue or deque structure to keep BFS at O(V+E).
                </p>
              </Section>

              <Section id="complexity" idx="06" title="Time Complexity">
                <Code>{`Time:   O(V + E)
Space:  O(V)

V = number of vertices (nodes)
E = number of edges`}</Code>

                <p>
                  To calculate BFS time complexity properly, break the algorithm into the actual operations it performs.
                  Don&apos;t just memorize <span className="text-primary">O(V + E)</span> — derive it.
                </p>

                <div className="space-y-4">
                  <div className="terminal-frame p-4">
                    <div className="text-sm font-bold text-foreground">1. Initialization work</div>
                    <div className="mt-2 text-[13px] text-muted-foreground leading-relaxed">
                      We create:
                      <span className="text-foreground"> visited</span>,
                      <span className="text-foreground"> queue</span>,
                      and sometimes
                      <span className="text-foreground"> order</span>.
                      That setup is constant or proportional to the first node only, so this part is
                      <span className="text-primary"> O(1)</span>.
                    </div>
                  </div>

                  <div className="terminal-frame p-4">
                    <div className="text-sm font-bold text-foreground">2. Each node is dequeued once → O(V)</div>
                    <div className="mt-2 text-[13px] text-muted-foreground leading-relaxed">
                      A node is added to the queue only once because once it is marked visited,
                      it can never be enqueued again.
                      Since there are <span className="text-foreground">V</span> nodes total,
                      the dequeue step can happen at most <span className="text-foreground">V</span> times.
                      That contributes <span className="text-primary">O(V)</span>.
                    </div>
                  </div>

                  <div className="terminal-frame p-4">
                    <div className="text-sm font-bold text-foreground">3. Neighbor scanning across all nodes → O(E)</div>
                    <div className="mt-2 text-[13px] text-muted-foreground leading-relaxed">
                      The expensive part is the inner loop:
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
                      Across the entire BFS, this loop runs once per adjacency entry.
                      <br /><br />
                      In an adjacency-list graph:
                      <br />
                      - for a <span className="text-foreground">directed graph</span>, total neighbor visits = <span className="text-primary">E</span>
                      <br />
                      - for an <span className="text-foreground">undirected graph</span>, each edge appears twice in adjacency lists, so total neighbor visits = <span className="text-primary">2E</span>
                      <br /><br />
                      Since constants are ignored in Big-O,
                      <span className="text-primary"> O(2E) = O(E)</span>.
                    </div>
                  </div>

                  <div className="terminal-frame p-4">
                    <div className="text-sm font-bold text-foreground">4. Add the two costs together</div>
                    <div className="mt-2 text-[13px] text-muted-foreground leading-relaxed">
                      Total BFS work =
                    </div>
                    <pre className="mt-3 overflow-x-auto border border-border bg-background/60 p-3 text-[12px] text-foreground">
{`node processing   +   edge scanning
     O(V)          +      O(E)
= O(V + E)`}
                    </pre>
                  </div>

                  <div className="terminal-frame p-4">
                    <div className="text-sm font-bold text-foreground">5. Space complexity</div>
                    <div className="mt-2 text-[13px] text-muted-foreground leading-relaxed">
                      The queue can hold up to <span className="text-foreground">V</span> nodes in the worst case.
                      The visited set can also hold up to <span className="text-foreground">V</span> nodes.
                      The traversal order list, if stored, can hold up to <span className="text-foreground">V</span> nodes too.
                      <br /><br />
                      So:
                    </div>
                    <pre className="mt-3 overflow-x-auto border border-border bg-background/60 p-3 text-[12px] text-foreground">
{`O(V) + O(V) + O(V) = O(V)`}
                    </pre>
                  </div>
                </div>

                <div className="mt-6 border-l-2 border-primary pl-4 text-sm text-muted-foreground leading-relaxed">
                  <span className="text-primary">Exam shortcut:</span><br />
                  BFS touches every node once and every edge once overall, so the time complexity is
                  <span className="text-foreground"> O(V + E)</span>.
                </div>

                <div className="mt-6 terminal-frame p-4">
                  <div className="text-sm font-bold text-foreground">Important note about JavaScript / TypeScript</div>
                  <div className="mt-2 text-[13px] text-muted-foreground leading-relaxed">
                    In theory, BFS is <span className="text-primary">O(V + E)</span>.
                    But in JavaScript, using <code className="text-foreground">Array.shift()</code> can be
                    <span className="text-terminal-amber"> O(n)</span> because removing from the front shifts all remaining elements.
                    <br /><br />
                    So:
                    <br />
                    - <span className="text-foreground">algorithmically</span>, BFS is still <span className="text-primary">O(V + E)</span>
                    <br />
                    - <span className="text-foreground">this implementation detail</span> may slow the real runtime
                    <br /><br />
                    In production, use a deque or a queue with a head pointer.
                  </div>
                </div>
              </Section>

              <Section id="real-world" idx="07" title="Real-World Uses">
                <p>
                  BFS is not just an interview algorithm. It shows up anywhere you need the
                  <span className="text-foreground"> shortest path in an unweighted system</span>,
                  or when you need to explore things level by level.
                </p>

                <div className="space-y-3">
                  {[
                    [
                      "Navigation in simple maps",
                      "If every road segment is treated equally, BFS finds the minimum number of moves from one location to another."
                    ],
                    [
                      "Social networks",
                      "Finding degrees of separation between people is a BFS problem: friend → friend-of-friend → friend-of-friend-of-friend."
                    ],
                    [
                      "Web crawling",
                      "A crawler can use BFS to explore pages level by level starting from a seed URL, which is useful for controlled discovery."
                    ],
                    [
                      "Network broadcasting",
                      "Routers and switches often model propagation in layers. BFS helps simulate how information spreads hop by hop."
                    ],
                    [
                      "Grid/maze games",
                      "In games, BFS is used to find the shortest path for movement on boards, mazes, and tile maps when each move costs the same."
                    ],
                    [
                      "Emergency response search",
                      "If responders must search buildings floor by floor or room by room in concentric layers, BFS matches that operational strategy."
                    ],
                  ].map(([title, desc]) => (
                    <div key={title} className="terminal-frame p-4">
                      <div className="text-sm font-bold text-foreground">{title}</div>
                      <div className="mt-1 text-[13px] text-muted-foreground leading-relaxed">{desc}</div>
                    </div>
                  ))}
                </div>

                <Code>{`Real-life BFS pattern:
start from source
explore all distance-1 states
then all distance-2 states
then all distance-3 states
...
first time you reach target = shortest path`}</Code>
              </Section>

              <Section id="practice" idx="08" title="Practice Problems">
                <ul className="space-y-2 pl-0">
                  {[
                    ["Number of Islands", "EASY", "Grid BFS — flood fill from each unvisited '1'."],
                    ["Rotting Oranges", "MED", "Multi-source BFS — start with every rotten cell in the queue."],
                    ["Word Ladder", "HARD", "BFS over implicit graph where edges are 1-letter swaps."],
                    ["Shortest Path in Binary Matrix", "MED", "8-direction BFS, classic shortest-path."],
                    ["Open the Lock", "MED", "BFS over states, deadends as visited."],
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
                <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">// next_module</div>
                <h3 className="mt-2 text-2xl md:text-3xl font-bold">
                  Next up: <span className="text-primary text-glow">DFS &amp; Recursion</span>
                </h3>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link href="/visualize/bfs" className="border-2 border-primary bg-primary px-5 py-3 text-sm font-bold tracking-widest text-primary-foreground hover:shadow-[var(--shadow-glow)]">
                    ▶ PRACTICE_IN_VIZ
                  </Link>
                  <Link href="/" className="border-2 border-border px-5 py-3 text-sm font-bold tracking-widest hover:border-primary hover:text-primary">
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
