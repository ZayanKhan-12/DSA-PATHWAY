const STEPS = [
  { k: "01", t: "ROOT_PROBLEM", d: "Strip the prompt to its essential constraint. What is actually being asked?" },
  { k: "02", t: "VISUAL_INTUITION", d: "Sketch it. Trees, grids, pointers — the picture exposes the structure." },
  { k: "03", t: "DATA_STRUCTURE", d: "Pick the structure that matches the access pattern. Hash? Heap? Graph?" },
  { k: "04", t: "ALGORITHM", d: "BFS, DFS, two-pointer, DP — choose the technique the structure invites." },
  { k: "05", t: "IMPLEMENTATION", d: "Translate intuition to code with surgical precision. Edge cases included." },
  { k: "06", t: "PRACTICE", d: "Variants, twists, harder constraints. Pattern-locking happens here." },
  { k: "07", t: "COMPLEXITY", d: "Prove it. Big-O on time and space. Defend your choice." },
];

export const PhilosophyFlow = () => {
  return (
    <div className="terminal-frame p-6 md:p-10">
      <div className="mb-8 flex items-baseline justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            // method
          </div>
          <h2 className="mt-1 text-2xl md:text-3xl font-bold text-glow">
            THE_LOOP<span className="blink text-primary">_</span>
          </h2>
        </div>
        <div className="hidden md:block text-right text-[10px] text-muted-foreground">
          run forever<br />
          <span className="text-primary">while (curious)</span>
        </div>
      </div>

      <ol className="relative space-y-3">
        {STEPS.map((s, i) => (
          <li
            key={s.k}
            className="group relative grid grid-cols-[auto_auto_1fr] items-start gap-4 border border-transparent bg-background/40 p-3 transition-all hover:border-primary hover:bg-primary/5 hover:translate-x-1"
          >
            <span className="mt-0.5 text-xs text-muted-foreground group-hover:text-primary">
              {s.k}
            </span>
            <span className="mt-1 text-primary">
              {i === STEPS.length - 1 ? "└─" : "├─"}
            </span>
            <div>
              <div className="font-mono text-sm font-bold tracking-wider text-foreground group-hover:text-primary">
                {s.t}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                {s.d}
              </div>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-6 border-t border-border pt-4 text-[10px] text-muted-foreground">
        <span className="text-primary">$</span> exit 0 &nbsp;<span className="text-muted-foreground">// internalized.</span>
      </div>
    </div>
  );
};
