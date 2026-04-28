"use client";

type CircularQueueRingProps = {
  capacity: number;
  values: (number | string | null)[];
  head: number;
  tail: number;
  title?: string;
  activeIndex?: number | null;
};

export default function CircularQueueRing({
  capacity,
  values,
  head,
  tail,
  title = "CIRCULAR QUEUE",
  activeIndex = null,
}: CircularQueueRingProps) {
  const slots = Array.from({ length: capacity }, (_, i) => values[i] ?? null);

  return (
    <div className="border border-border bg-background/70 p-6 md:p-8">
      <div className="mb-5 text-xs tracking-[0.35em] text-foreground/65">
        {title}
      </div>

      <div className="relative mx-auto h-[420px] w-full max-w-[620px]">
        <div className="absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-border/60" />
        <div className="absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-border/30" />

        <div className="absolute left-1/2 top-1/2 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-primary/40 bg-background/90 text-center shadow-[0_0_20px_rgba(57,255,20,0.08)]">
          <div className="text-[11px] tracking-[0.25em] text-foreground/55">
            QUEUE CORE
          </div>
          <div className="mt-2 text-sm font-bold text-primary">FIFO</div>
          <div className="mt-2 text-xs text-foreground/65">Front = dequeue</div>
          <div className="text-xs text-foreground/65">Rear = enqueue</div>
        </div>

        {slots.map((value, i) => {
          const angle = -Math.PI / 2 + (2 * Math.PI * i) / capacity;
          const x = 50 + 30 * Math.cos(angle);
          const y = 50 + 30 * Math.sin(angle);

          const isHead = i === head;
          const isTail = i === tail;
          const isActive = value !== null;
          const isHighlighted = activeIndex === i;

          return (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="relative flex flex-col items-center">
                {isHead && (
                  <div className="mb-2 rounded border border-primary bg-primary/15 px-2 py-1 text-[10px] font-bold tracking-[0.18em] text-primary">
                    FRONT
                  </div>
                )}

                <div
                  className={[
                    "flex h-20 w-20 flex-col items-center justify-center rounded-full border text-center transition-all duration-300",
                    isHighlighted
                      ? "scale-110 border-yellow-400 bg-yellow-400/10 shadow-[0_0_18px_rgba(255,209,102,0.22)]"
                      : isActive
                      ? "border-primary/70 bg-primary/10 shadow-[0_0_18px_rgba(57,255,20,0.18)]"
                      : "border-border bg-background/60",
                  ].join(" ")}
                >
                  <div className="text-[10px] tracking-[0.22em] text-foreground/50">
                    IDX {i}
                  </div>
                  <div className="mt-1 text-2xl font-bold text-foreground">
                    {value ?? "·"}
                  </div>
                </div>

                {isTail && (
                  <div className="mt-2 rounded border border-cyan-400 bg-cyan-400/10 px-2 py-1 text-[10px] font-bold tracking-[0.18em] text-cyan-300">
                    REAR
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-3 grid grid-cols-3 gap-3">
        <div className="border border-border bg-background/60 p-4">
          <div className="text-[10px] tracking-[0.25em] text-foreground/55">
            FRONT INDEX
          </div>
          <div className="mt-2 text-xl font-bold text-primary">{head}</div>
        </div>

        <div className="border border-border bg-background/60 p-4">
          <div className="text-[10px] tracking-[0.25em] text-foreground/55">
            REAR INDEX
          </div>
          <div className="mt-2 text-xl font-bold text-cyan-300">{tail}</div>
        </div>

        <div className="border border-border bg-background/60 p-4">
          <div className="text-[10px] tracking-[0.25em] text-foreground/55">
            STORED ELEMENTS
          </div>
          <div className="mt-2 text-xl font-bold text-foreground">
            {slots.filter((x) => x !== null).length}
          </div>
        </div>
      </div>
    </div>
  );
}
