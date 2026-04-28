"use client";

type CircularQueueRingProps = {
  capacity: number;
  values: (number | string | null)[];
  head: number; // FRONT
  tail: number; // REAR
  title?: string;
};

export default function CircularQueueRing({
  capacity,
  values,
  head,
  tail,
  title = "CIRCULAR QUEUE",
}: CircularQueueRingProps) {
  const radius = 36;
  const center = 50;

  const slots = Array.from({ length: capacity }, (_, i) => values[i] ?? null);

  return (
    <div className="border border-border bg-background/70 p-8">
      <div className="mb-6 text-xs tracking-[0.35em] text-foreground/65">
        {title}
      </div>

      <div className="relative mx-auto h-[560px] w-full max-w-[760px]">
        {/* outer ring guide */}
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-border/60" />

        {/* center info */}
        <div className="absolute left-1/2 top-1/2 flex h-40 w-40 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-primary/40 bg-background/85 text-center">
          <div className="text-[11px] tracking-[0.25em] text-foreground/55">
            QUEUE CORE
          </div>
          <div className="mt-2 text-sm font-bold text-primary">FIFO</div>
          <div className="mt-2 text-xs text-foreground/65">
            Front = dequeue
          </div>
          <div className="text-xs text-foreground/65">
            Rear = enqueue
          </div>
        </div>

        {slots.map((value, i) => {
          const angle = -Math.PI / 2 + (2 * Math.PI * i) / capacity;
          const x = center + radius * Math.cos(angle);
          const y = center + radius * Math.sin(angle);

          const isHead = i === head;
          const isTail = i === tail;
          const isActive = value !== null;

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
                    "flex h-24 w-24 flex-col items-center justify-center rounded-full border text-center",
                    isActive
                      ? "border-primary/70 bg-primary/10 shadow-[0_0_18px_rgba(57,255,20,0.18)]"
                      : "border-border bg-background/60",
                  ].join(" ")}
                >
                  <div className="text-[10px] tracking-[0.22em] text-foreground/50">
                    IDX {i}
                  </div>
                  <div className="mt-1 text-3xl font-bold text-foreground">
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

      <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-3">
        <div className="border border-border bg-background/60 p-4">
          <div className="text-[10px] tracking-[0.25em] text-foreground/55">
            FRONT INDEX
          </div>
          <div className="mt-2 text-2xl font-bold text-primary">{head}</div>
        </div>

        <div className="border border-border bg-background/60 p-4">
          <div className="text-[10px] tracking-[0.25em] text-foreground/55">
            REAR INDEX
          </div>
          <div className="mt-2 text-2xl font-bold text-cyan-300">{tail}</div>
        </div>

        <div className="border border-border bg-background/60 p-4">
          <div className="text-[10px] tracking-[0.25em] text-foreground/55">
            STORED ELEMENTS
          </div>
          <div className="mt-2 text-2xl font-bold text-foreground">
            {slots.filter((x) => x !== null).length}
          </div>
        </div>
      </div>

      <div className="mt-6 border border-border bg-background/60 p-4 text-sm text-foreground/70">
        <div className="font-semibold text-foreground">Why this is truly circular:</div>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>Slots are arranged in a ring, not a straight line.</li>
          <li>FRONT and REAR are independent positions.</li>
          <li>The queue wraps around the array when the tail reaches the end.</li>
          <li>Dequeues happen at FRONT, enqueues happen at REAR.</li>
        </ul>
      </div>
    </div>
  );
}
