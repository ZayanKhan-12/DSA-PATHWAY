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
  TypeScript: `type Interval = [number, number];

function maxNonOverlapping(intervals: Interval[]): number {
  intervals.sort((a, b) => a[1] - b[1]);

  let count = 0;
  let lastEnd = -Infinity;

  for (const [start, end] of intervals) {
    if (start >= lastEnd) {
      count++;
      lastEnd = end;
    }
  }

  return count;
}`,

  JavaScript: `function maxNonOverlapping(intervals) {
  intervals.sort((a, b) => a[1] - b[1]);

  let count = 0;
  let lastEnd = -Infinity;

  for (const [start, end] of intervals) {
    if (start >= lastEnd) {
      count++;
      lastEnd = end;
    }
  }

  return count;
}`,

  Python: `def max_non_overlapping(intervals):
    intervals.sort(key=lambda x: x[1])

    count = 0
    last_end = float("-inf")

    for start, end in intervals:
        if start >= last_end:
            count += 1
            last_end = end

    return count`,

  Java: `import java.util.*;

class Solution {
    public int maxNonOverlapping(int[][] intervals) {
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[1], b[1]));

        int count = 0;
        int lastEnd = Integer.MIN_VALUE;

        for (int[] interval : intervals) {
            if (interval[0] >= lastEnd) {
                count++;
                lastEnd = interval[1];
            }
        }

        return count;
    }
}`,

  "C++": `#include <bits/stdc++.h>
using namespace std;

int maxNonOverlapping(vector<pair<int, int>>& intervals) {
    sort(intervals.begin(), intervals.end(),
         [](const auto& a, const auto& b) {
             return a.second < b.second;
         });

    int count = 0;
    int lastEnd = INT_MIN;

    for (auto& [start, end] : intervals) {
        if (start >= lastEnd) {
            count++;
            lastEnd = end;
        }
    }

    return count;
}`,

  "C#": `using System;

public class Solution {
    public int MaxNonOverlapping(int[][] intervals) {
        Array.Sort(intervals, (a, b) => a[1].CompareTo(b[1]));

        int count = 0;
        int lastEnd = int.MinValue;

        foreach (var interval in intervals) {
            if (interval[0] >= lastEnd) {
                count++;
                lastEnd = interval[1];
            }
        }

        return count;
    }
}`,

  Go: `package main

import "sort"

func maxNonOverlapping(intervals [][]int) int {
    sort.Slice(intervals, func(i, j int) bool {
        return intervals[i][1] < intervals[j][1]
    })

    count := 0
    lastEnd := -1 << 60

    for _, interval := range intervals {
        start, end := interval[0], interval[1]
        if start >= lastEnd {
            count++
            lastEnd = end
        }
    }

    return count
}`,

  Rust: `fn max_non_overlapping(intervals: &mut Vec<(i32, i32)>) -> i32 {
    intervals.sort_by_key(|x| x.1);

    let mut count = 0;
    let mut last_end = i32::MIN;

    for &(start, end) in intervals.iter() {
        if start >= last_end {
            count += 1;
            last_end = end;
        }
    }

    count
}`,

  Kotlin: `fun maxNonOverlapping(intervals: Array<IntArray>): Int {
    intervals.sortBy { it[1] }

    var count = 0
    var lastEnd = Int.MIN_VALUE

    for (interval in intervals) {
        if (interval[0] >= lastEnd) {
            count++
            lastEnd = interval[1]
        }
    }

    return count
}`,

  Swift: `func maxNonOverlapping(_ intervals: inout [[Int]]) -> Int {
    intervals.sort { $0[1] < $1[1] }

    var count = 0
    var lastEnd = Int.min

    for interval in intervals {
        let start = interval[0]
        let end = interval[1]

        if start >= lastEnd {
            count += 1
            lastEnd = end
        }
    }

    return count
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
    <div className="border border-border bg-card/40 p-4 md:p-5">
      <div className="text-xs uppercase tracking-[0.34em] text-muted-foreground">
        {title}
      </div>
      <div className="mt-3 text-sm leading-7 text-muted-foreground">
        {children}
      </div>
    </div>
  );
}

export default function GreedyIntervalsPage() {
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
            <Link href="/visualize/greedy-intervals" className="hover:text-primary transition-colors">
              // visualizer
            </Link>
            <Link href="/" className="hover:text-primary transition-colors">
              // home
            </Link>
          </div>
        </div>
      </header>

      <div className="container max-w-[1680px] px-4 md:px-6 py-8 md:py-10">
        <div className="grid gap-6 xl:grid-cols-[300px_minmax(0,1fr)]">
          <aside className="xl:sticky xl:top-24 h-fit border border-border bg-card/40 p-5">
            <div className="text-[11px] uppercase tracking-[0.34em] text-muted-foreground">
              ./table_of_contents
            </div>

            <div className="mt-5 space-y-4 text-sm">
              {[
                "01 Root Problem",
                "02 Core Idea",
                "03 Intuition",
                "04 Step-by-Step Example",
                "05 Code Implementation",
                "06 Time Complexity",
                "07 Real-World Uses",
                "08 Practice Problems",
              ].map((item) => (
                <div key={item} className="text-foreground">{item}</div>
              ))}
            </div>

            <Link
              href="/visualize/greedy-intervals"
              className="mt-6 inline-flex w-full items-center justify-center border-2 border-primary bg-primary px-4 py-3 text-sm font-bold tracking-[0.22em] text-black hover:opacity-90"
            >
              ▶ OPEN_VISUALIZER
            </Link>
          </aside>

          <section className="space-y-8">
            <div className="text-[10px] uppercase tracking-[0.34em] text-muted-foreground">
              learn // greedy_intervals — module 09
            </div>

            <h1 className="text-4xl md:text-7xl font-extrabold leading-[0.95]">
              Greedy & Intervals
              <br />
              <span className="text-primary text-glow">Lesson.</span>
            </h1>

            <p className="max-w-5xl text-sm md:text-base leading-8 text-muted-foreground">
              Greedy algorithms work when the best local choice also leads to the best
              global result. In interval problems, the classic greedy move is usually:
              sort first, then keep the interval that leaves the most future room.
              That often means sorting by end time, choosing the earliest finishing
              interval, and skipping overlapping ones.
            </p>

            <SectionTitle idx="01" title="Root Problem" />
            <TerminalCard title="Problem framing">
              In interval scheduling, each interval competes for time on the line. If we choose an
              interval that ends late, we may block many future intervals. So the real question is
              not just which interval looks good by itself, but which choice preserves the most
              future options.
            </TerminalCard>

            <SectionTitle idx="02" title="Core Idea" />
            <TerminalCard title="Greedy rule">
              Sort intervals by finishing time. Then scan left to right:
              choose an interval if its start is at least the end of the last chosen interval.
              This is optimal for maximizing the number of non-overlapping intervals because
              finishing earlier leaves the most space for what comes next.
            </TerminalCard>

            <SectionTitle idx="03" title="Intuition" />
            <div className="grid gap-4 md:grid-cols-3">
              <TerminalCard title="Why end time?">
                Ending earlier is valuable because it frees the timeline sooner.
              </TerminalCard>
              <TerminalCard title="Why not earliest start?">
                Starting early does not help if the interval also ends very late.
              </TerminalCard>
              <TerminalCard title="Why not shortest length?">
                A short interval is not always best if it starts too late or blocks the schedule.
              </TerminalCard>
            </div>

            <SectionTitle idx="04" title="Step-by-Step Example" />
            <TerminalCard title="Example">
              Suppose the intervals are:
              <br /><br />
              [1, 3], [2, 4], [3, 5], [0, 7], [5, 8], [8, 9]
              <br /><br />
              Sort by end:
              <br />
              [1, 3], [2, 4], [3, 5], [0, 7], [5, 8], [8, 9]
              <br /><br />
              Pick [1, 3]
              <br />
              Skip [2, 4] because it overlaps
              <br />
              Pick [3, 5]
              <br />
              Skip [0, 7]
              <br />
              Pick [5, 8]
              <br />
              Pick [8, 9]
              <br /><br />
              Final greedy answer: 4 intervals.
            </TerminalCard>

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

            <div className="border border-border bg-card/40 p-5">
              <div className="text-2xl font-bold text-primary">{activeLang}</div>
              <pre className="mt-4 overflow-x-auto border border-border bg-background/60 p-5 text-sm leading-8 text-foreground">
{codeMap[activeLang]}
              </pre>
            </div>

            <SectionTitle idx="06" title="Time Complexity" />
            <div className="grid gap-4 md:grid-cols-2">
              <TerminalCard title="Sorting cost">
                If there are n intervals, sorting by end time costs O(n log n).
              </TerminalCard>
              <TerminalCard title="Scan cost">
                After sorting, we do one linear pass, which costs O(n).
              </TerminalCard>
              <TerminalCard title="Total time">
                O(n log n) + O(n) = O(n log n). Sorting dominates.
              </TerminalCard>
              <TerminalCard title="Space">
                Usually O(1) extra if sorting in place, otherwise it depends on the language sort implementation.
              </TerminalCard>
            </div>

            <TerminalCard title="Why this formula is correct">
              The greedy decision itself is cheap. For each interval, we only compare its start
              with the last chosen end. That is constant work per interval. The expensive part is
              ordering the intervals correctly first. Because sorting grows faster than a linear scan,
              the final complexity is O(n log n).
            </TerminalCard>

            <SectionTitle idx="07" title="Real-World Uses" />
            <div className="grid gap-4 md:grid-cols-2">
              <TerminalCard title="Meeting scheduling">
                Choose the maximum number of meetings that fit in one room.
              </TerminalCard>
              <TerminalCard title="CPU / task scheduling">
                Pick compatible jobs without overlap.
              </TerminalCard>
              <TerminalCard title="Ad slot placement">
                Choose the best compatible windows.
              </TerminalCard>
              <TerminalCard title="Calendar compression">
                Merge or compare time blocks efficiently.
              </TerminalCard>
            </div>

            <SectionTitle idx="08" title="Practice Problems" />
            <div className="grid gap-4">
              {[
                "Maximum number of non-overlapping intervals",
                "Minimum arrows to burst balloons",
                "Merge intervals",
                "Insert interval",
                "Meeting Rooms I / II",
                "Erase overlap intervals",
              ].map((item) => (
                <div key={item} className="border border-border bg-card/40 px-5 py-4 text-foreground">
                  {item}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
