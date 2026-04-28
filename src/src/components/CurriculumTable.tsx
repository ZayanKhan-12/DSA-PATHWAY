import Link from "next/link";

type Topic = {
  id: string;
  code: string;
  title: string;
  difficulty: "EASY" | "MED" | "HARD";
  problems: number;
  status: "READY" | "BETA" | "SOON";
  desc: string;
  href?: string;
};

const TOPICS: Topic[] = [
  { id: "01", code: "ARR", title: "Arrays & Hashing", difficulty: "EASY", problems: 24, status: "READY",
    href: "/learn/arrays-hashing", desc: "Two pointers, prefix sums, frequency maps" },
  { id: "02", code: "STR", title: "Strings & Sliding Window", difficulty: "EASY", problems: 18, status: "READY",
    href: "/learn/strings-sliding-window", desc: "Substring search, anagrams, palindromes" },
  { id: "03", code: "STK", title: "Stack & Queue", difficulty: "EASY", problems: 14, status: "READY",
    href: "/learn/stack-queue", desc: "Monotonic stacks, parsing, BFS scaffolding" },
  { id: "04", code: "LL", title: "Linked Lists", difficulty: "MED", problems: 16, status: "READY", desc: "Reversal, cycle detection, fast/slow pointers" },
  { id: "05", code: "TRE", title: "Trees & Recursion", difficulty: "MED", problems: 22, status: "READY", desc: "DFS, BFS, traversal patterns, tree DP", href: "/learn/dfs" },
  { id: "06", code: "GRH", title: "Graph Traversal", difficulty: "MED", problems: 28, status: "READY", desc: "BFS, DFS, topological sort, union-find", href: "/learn/bfs" },
  { id: "07", code: "DP1", title: "Dynamic Programming I", difficulty: "MED", problems: 20, status: "BETA", desc: "1D DP, memoization, classic recurrences" },
  { id: "08", code: "DP2", title: "Dynamic Programming II", difficulty: "HARD", problems: 18, status: "BETA", desc: "2D DP, knapsack, interval DP, bitmask" },
  { id: "09", code: "GRD", title: "Greedy & Intervals", difficulty: "MED", problems: 15, status: "READY", desc: "Sorting, scheduling, exchange arguments" },
  { id: "10", code: "BIT", title: "Bit Manipulation", difficulty: "MED", problems: 12, status: "BETA", desc: "Masks, XOR tricks, subsets via bits" },
  { id: "11", code: "ADV", title: "Advanced Graphs", difficulty: "HARD", problems: 16, status: "SOON", desc: "Dijkstra, Bellman-Ford, MST, SCC" },
  { id: "12", code: "SYS", title: "System Design Primer", difficulty: "HARD", problems: 8, status: "SOON", desc: "Caching, sharding, queues, consistency" },
];

const diffColor = (d: Topic["difficulty"]) =>
  d === "EASY" ? "text-primary" : d === "MED" ? "text-terminal-amber" : "text-terminal-magenta";

const statusBadge = (s: Topic["status"]) => {
  const map = {
    READY: "border-primary text-primary bg-primary/10",
    BETA: "border-terminal-amber text-terminal-amber bg-terminal-amber/10",
    SOON: "border-border text-muted-foreground bg-muted/30",
  } as const;
  return map[s];
};

export function CurriculumTable() {
  return (
    <div className="terminal-frame">
      <div className="flex items-center justify-between border-b border-border bg-secondary/60 px-3 py-2 text-xs text-muted-foreground">
        <span><span className="text-primary">$</span> ls -la ./curriculum/</span>
        <span className="hidden sm:inline">{TOPICS.length} modules · {TOPICS.reduce((a, t) => a + t.problems, 0)} problems</span>
      </div>

      <div className="hidden md:grid grid-cols-[60px_90px_1fr_90px_80px_100px] gap-3 border-b border-border bg-card/40 px-4 py-2 text-[10px] uppercase tracking-widest text-muted-foreground">
        <span>idx</span>
        <span>code</span>
        <span>module</span>
        <span>diff</span>
        <span>probs</span>
        <span>status</span>
      </div>

      <div>
        {TOPICS.map((t) =>
          t.href ? (
            <Link
              key={t.id}
              href={t.href}
              className="group block w-full border-b border-border/50 last:border-b-0 px-4 py-3 text-left transition-colors hover:bg-primary/5 focus:bg-primary/10 focus:outline-none"
            >
              <Row t={t} />
            </Link>
          ) : (
            <div
              key={t.id}
              className="group block w-full border-b border-border/50 last:border-b-0 px-4 py-3 text-left transition-colors"
            >
              <Row t={t} />
            </div>
          )
        )}
      </div>
    </div>
  );
}

function Row({ t }: { t: Topic }) {
  return (
    <>
      <div className="grid md:grid-cols-[60px_90px_1fr_90px_80px_100px] grid-cols-[40px_1fr_auto] items-center gap-3">
        <span className="font-mono text-xs text-muted-foreground group-hover:text-primary">
          [{t.id}]
        </span>
        <span className="hidden md:inline font-mono text-xs text-terminal-cyan">
          {t.code}
        </span>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-foreground group-hover:text-glow group-hover:text-primary truncate">
              {t.title}
            </span>
            <span className="hidden lg:inline text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
              →
            </span>
          </div>
          <div className="mt-0.5 text-[11px] text-muted-foreground truncate">
            {t.desc}
          </div>
        </div>
        <span className={`hidden md:inline text-xs font-bold ${diffColor(t.difficulty)}`}>
          {t.difficulty}
        </span>
        <span className="hidden md:inline text-xs text-muted-foreground">
          {t.problems.toString().padStart(2, "0")}
        </span>
        <span className={`inline-flex items-center justify-center border px-2 py-0.5 text-[10px] font-bold tracking-widest ${statusBadge(t.status)}`}>
          {t.status}
        </span>
      </div>

      <div className="md:hidden mt-1.5 flex items-center gap-3 text-[10px] text-muted-foreground">
        <span className="text-terminal-cyan">{t.code}</span>
        <span className={diffColor(t.difficulty)}>{t.difficulty}</span>
        <span>{t.problems} problems</span>
      </div>
    </>
  );
}
