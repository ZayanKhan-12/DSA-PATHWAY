import { useEffect, useState } from "react";

const lines = [
  "$ initializing dsa.engine v0.4.2 ...",
  "$ loading visualizer modules ........... [ok]",
  "$ mounting curriculum/12-modules ....... [ok]",
  "$ ready. type 'start' to begin.",
];

export const HeroTerminal = () => {
  const [shown, setShown] = useState(0);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    if (shown >= lines.length) return;
    const line = lines[shown];
    if (charIdx < line.length) {
      const t = setTimeout(() => setCharIdx(charIdx + 1), 18);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setShown(shown + 1);
      setCharIdx(0);
    }, 250);
    return () => clearTimeout(t);
  }, [shown, charIdx]);

  return (
    <div className="terminal-frame scanlines crt-flicker p-4 md:p-5 font-mono text-[11px] md:text-xs leading-relaxed">
      <div className="flex items-center gap-2 border-b border-border pb-2 mb-3 text-muted-foreground">
        <span className="h-2 w-2 rounded-full bg-destructive/70" />
        <span className="h-2 w-2 rounded-full bg-terminal-amber/70" />
        <span className="h-2 w-2 rounded-full bg-primary/70" />
        <span className="ml-2">zayan@dsa-engine: ~</span>
      </div>
      <div className="space-y-1 min-h-[110px]">
        {lines.slice(0, shown).map((l, i) => (
          <div key={i} className="text-primary/90">{l}</div>
        ))}
        {shown < lines.length && (
          <div className="text-primary/90">
            {lines[shown].slice(0, charIdx)}
            <span className="blink">▌</span>
          </div>
        )}
        {shown >= lines.length && (
          <div className="text-primary">
            <span className="text-muted-foreground">$</span> start<span className="blink">▌</span>
          </div>
        )}
      </div>
    </div>
  );
};
