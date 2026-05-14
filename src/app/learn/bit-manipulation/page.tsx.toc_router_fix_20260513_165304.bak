 "use client";

import Link from "next/link";
import { useState } from "react";

const languageTabs = [
  "TypeScript",
  "JavaScript",
  "Python",
  "Java",
  "C++",
  "C#",
  "Go",
  "Rust",
  "Kotlin",
  "Swift",
] as const;

type Language = (typeof languageTabs)[number];

const codeMap: Record<Language, string> = {
  TypeScript: `function countSetBits(n: number): number {
  let count = 0;

  while (n !== 0) {
    count += n & 1;
    n >>= 1;
  }

  return count;
}

function isPowerOfTwo(n: number): boolean {
  return n > 0 && (n & (n - 1)) === 0;
}`,

  JavaScript: `function countSetBits(n) {
  let count = 0;

  while (n !== 0) {
    count += n & 1;
    n >>= 1;
  }

  return count;
}

function isPowerOfTwo(n) {
  return n > 0 && (n & (n - 1)) === 0;
}`,

  Python: `def count_set_bits(n):
    count = 0

    while n != 0:
        count += n & 1
        n >>= 1

    return count

def is_power_of_two(n):
    return n > 0 and (n & (n - 1)) == 0`,

  Java: `class Solution {
    public int countSetBits(int n) {
        int count = 0;

        while (n != 0) {
            count += (n & 1);
            n >>= 1;
        }

        return count;
    }

    public boolean isPowerOfTwo(int n) {
        return n > 0 && (n & (n - 1)) == 0;
    }
}`,

  "C++": `class Solution {
public:
    int countSetBits(int n) {
        int count = 0;

        while (n != 0) {
            count += (n & 1);
            n >>= 1;
        }

        return count;
    }

    bool isPowerOfTwo(int n) {
        return n > 0 && (n & (n - 1)) == 0;
    }
};`,

  "C#": `public class Solution {
    public int CountSetBits(int n) {
        int count = 0;

        while (n != 0) {
            count += (n & 1);
            n >>= 1;
        }

        return count;
    }

    public bool IsPowerOfTwo(int n) {
        return n > 0 && (n & (n - 1)) == 0;
    }
}`,

  Go: `func countSetBits(n int) int {
    count := 0

    for n != 0 {
        count += n & 1
        n >>= 1
    }

    return count
}

func isPowerOfTwo(n int) bool {
    return n > 0 && (n&(n-1)) == 0
}`,

  Rust: `fn count_set_bits(mut n: i32) -> i32 {
    let mut count = 0;

    while n != 0 {
        count += n & 1;
        n >>= 1;
    }

    count
}

fn is_power_of_two(n: i32) -> bool {
    n > 0 && (n & (n - 1)) == 0
}`,

  Kotlin: `fun countSetBits(nInput: Int): Int {
    var n = nInput
    var count = 0

    while (n != 0) {
        count += (n and 1)
        n = n shr 1
    }

    return count
}

fun isPowerOfTwo(n: Int): Boolean {
    return n > 0 && (n and (n - 1)) == 0
}`,

  Swift: `func countSetBits(_ value: Int) -> Int {
    var n = value
    var count = 0

    while n != 0 {
        count += (n & 1)
        n >>= 1
    }

    return count
}

func isPowerOfTwo(_ n: Int) -> Bool {
    return n > 0 && (n & (n - 1)) == 0
}`,
};

function SectionTitle({
  idx,
  title,
}: {
  idx: string;
  title: string;
}) {
  return (
    <div className="space-y-2">
      <div className="text-[11px] uppercase tracking-[0.38em] text-muted-foreground">
        {idx} // section
      </div>
      <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
        <span className="text-primary text-glow">$</span> {title}
      </h2>
    </div>
  );
}

function TerminalCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-border bg-card/40 p-5 md:p-6">
      <div className="text-xs uppercase tracking-[0.34em] text-muted-foreground">
        {title}
      </div>
      <div className="mt-4 text-sm leading-8 text-muted-foreground">
        {children}
      </div>
    </div>
  );
}

export default function BitManipulationPage() {
  const [activeLang, setActiveLang] = useState<Language>("TypeScript");

  return (
    <main className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
        <div className="container max-w-[1680px] h-14 px-4 md:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold tracking-widest text-sm">
            <span className="h-3 w-3 bg-primary shadow-[0_0_14px_hsl(var(--primary))]" />
            <span className="text-primary text-glow">DSA.ENGINE</span>
          </Link>

          <div className="flex items-center gap-6 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            <Link href="/visualize/bit-manipulation" className="hover:text-primary transition-colors">
              // visualizer
            </Link>
            <Link href="/" className="hover:text-primary transition-colors">
              // home
            </Link>
          </div>
        </div>
      </header>

      <div className="container max-w-[1680px] px-4 md:px-6 py-8 md:py-10">
        <div className="grid gap-8 xl:grid-cols-[300px_minmax(0,1fr)]">
          <aside className="xl:sticky xl:top-24 h-fit border border-border bg-card/40 p-5 md:p-6">
            <div className="text-[11px] uppercase tracking-[0.34em] text-muted-foreground">
              ./table_of_contents
            </div>

            <div className="mt-6 space-y-5 text-sm">
              {[
                "01 Root Problem",
                "02 Core Idea",
                "03 Intuition",
                "04 Worked Example",
                "05 Code Implementation",
                "06 Time Complexity",
                "07 Real-World Uses",
                "08 Practice Problems",
              ].map((item) => (
                <div key={item} className="text-foreground">
                  {item}
                </div>
              ))}
            </div>

            <Link
              href="/visualize/bit-manipulation"
              className="mt-8 inline-flex w-full items-center justify-center border-2 border-primary bg-primary px-4 py-3 text-sm font-bold tracking-[0.22em] text-black hover:opacity-90"
            >
              ▶ OPEN_VISUALIZER
            </Link>
          </aside>

          <section className="space-y-10">
            <div className="text-[10px] uppercase tracking-[0.34em] text-muted-foreground">
              learn // bit_manipulation — module 10
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl md:text-7xl font-extrabold leading-[0.95]">
                Bit Manipulation
                <br />
                <span className="text-primary text-glow">Lesson.</span>
              </h1>

              <p className="max-w-5xl text-sm md:text-base leading-8 text-muted-foreground">
                Bit manipulation treats integers as sequences of 0s and 1s. Instead of working
                only with decimal values, we directly inspect and transform the underlying bits.
                This is useful for masks, compact state storage, XOR tricks, and subset generation.
              </p>
            </div>

            <div className="space-y-5">
              <SectionTitle idx="01" title="Root Problem" />
              <TerminalCard title="Problem framing">
                Many problems become easier when you think at the binary level. Instead of asking
                “what is this number,” ask “which bits are on, which bits are off, and how can I
                flip, clear, or test them efficiently?”
              </TerminalCard>
            </div>

            <div className="space-y-5">
              <SectionTitle idx="02" title="Core Idea" />
              <TerminalCard title="Main operators">
                AND (&) keeps only bits that are 1 in both places.
                <br />
                OR (|) turns on bits that appear in either place.
                <br />
                XOR (^) flips where bits differ.
                <br />
                NOT (~) inverts bits.
                <br />
                Left shift ({"<<"}) moves bits left.
                <br />
                Right shift ({">>"}) moves bits right.
              </TerminalCard>
            </div>

            <div className="space-y-5">
              <SectionTitle idx="03" title="Intuition" />
              <div className="grid gap-4 md:grid-cols-3">
                <TerminalCard title="Masking">
                  Use a mask to isolate or toggle one exact bit position.
                </TerminalCard>
                <TerminalCard title="XOR logic">
                  XOR is powerful because equal bits cancel and different bits survive.
                </TerminalCard>
                <TerminalCard title="Compact state">
                  A single integer can represent many boolean states at once.
                </TerminalCard>
              </div>
            </div>

            <div className="space-y-5">
              <SectionTitle idx="04" title="Worked Example" />
              <TerminalCard title="Example walkthrough">
                Let n = 13
                <br />
                Binary: 1101
                <br />
                <br />
                Count set bits:
                <br />
                1101 → last bit 1
                <br />
                0110 → last bit 0
                <br />
                0011 → last bit 1
                <br />
                0001 → last bit 1
                <br />
                <br />
                Total set bits = 3
                <br />
                <br />
                Power of two check:
                <br />
                n is power of two only if n & (n - 1) == 0
                <br />
                For 8: 1000 & 0111 = 0000
                <br />
                For 13: 1101 & 1100 = 1100 ≠ 0
              </TerminalCard>
            </div>

            <div className="space-y-5">
              <SectionTitle idx="05" title="Code Implementation" />

              <div className="overflow-x-auto">
                <div className="flex gap-3 min-w-max pb-3">
                  {languageTabs.map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => setActiveLang(lang)}
                      className={`border px-6 py-4 text-sm font-bold tracking-[0.14em] transition-colors ${
                        lang === activeLang
                          ? "border-primary bg-primary text-black"
                          : "border-border bg-background/50 text-muted-foreground hover:border-primary hover:text-primary"
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border border-border bg-card/40 p-5 md:p-6">
                <div className="text-2xl font-bold text-primary">{activeLang}</div>
                <pre className="mt-4 overflow-x-auto border border-border bg-background/60 p-5 md:p-6 text-sm leading-8 text-foreground">
{codeMap[activeLang]}
                </pre>
              </div>
            </div>

            <div className="space-y-5">
              <SectionTitle idx="06" title="Time Complexity" />
              <div className="grid gap-4 md:grid-cols-2">
                <TerminalCard title="Per bit scan">
                  If you scan every bit of an integer, the time is O(number of bits).
                </TerminalCard>
                <TerminalCard title="Fixed-width machine integers">
                  For 32-bit or 64-bit integers, bit operations are usually treated as O(1).
                </TerminalCard>
                <TerminalCard title="Space">
                  Most bit tricks use O(1) extra space.
                </TerminalCard>
                <TerminalCard title="Why it is fast">
                  Bitwise instructions are low-level operations directly supported by hardware.
                </TerminalCard>
              </div>
            </div>

            <div className="space-y-5">
              <SectionTitle idx="07" title="Real-World Uses" />
              <div className="grid gap-4 md:grid-cols-2">
                <TerminalCard title="Permissions">
                  File permissions and flags are often stored as bit masks.
                </TerminalCard>
                <TerminalCard title="State compression">
                  Subset DP and visited-state compression use bits heavily.
                </TerminalCard>
                <TerminalCard title="Graphics / systems">
                  Low-level rendering and systems code often manipulate bit fields.
                </TerminalCard>
                <TerminalCard title="Fast toggles">
                  Turn features on and off with one integer mask.
                </TerminalCard>
              </div>
            </div>

            <div className="space-y-5">
              <SectionTitle idx="08" title="Practice Problems" />
              <div className="grid gap-4">
                {[
                  "Count set bits",
                  "Power of two",
                  "Single number using XOR",
                  "Subset generation with bitmasks",
                  "Reverse bits",
                  "Bitmask permissions / flags",
                ].map((item) => (
                  <div
                    key={item}
                    className="border border-border bg-card/40 px-5 py-4 md:px-6 md:py-5 text-foreground"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
