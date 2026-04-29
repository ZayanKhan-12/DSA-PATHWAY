"use client";

import Link from "next/link";
import { useState } from "react";

const codeByLanguage = {
  TypeScript: `function longestCommonSubsequence(text1: string, text2: string): number {
  const m = text1.length;
  const n = text2.length;

  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[m][n];
}`,
  JavaScript: `function longestCommonSubsequence(text1, text2) {
  const m = text1.length;
  const n = text2.length;

  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[m][n];
}`,
  Python: `def longestCommonSubsequence(text1, text2):
    m = len(text1)
    n = len(text2)

    dp = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i - 1] == text2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])

    return dp[m][n]`,
  Java: `class Solution {
    public int longestCommonSubsequence(String text1, String text2) {
        int m = text1.length();
        int n = text2.length();

        int[][] dp = new int[m + 1][n + 1];

        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (text1.charAt(i - 1) == text2.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }

        return dp[m][n];
    }
}`,
  "C++": `class Solution {
public:
    int longestCommonSubsequence(string text1, string text2) {
        int m = text1.size();
        int n = text2.size();

        vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));

        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (text1[i - 1] == text2[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                } else {
                    dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }

        return dp[m][n];
    }
};`,
  Go: `func longestCommonSubsequence(text1 string, text2 string) int {
    m := len(text1)
    n := len(text2)

    dp := make([][]int, m+1)
    for i := range dp {
        dp[i] = make([]int, n+1)
    }

    for i := 1; i <= m; i++ {
        for j := 1; j <= n; j++ {
            if text1[i-1] == text2[j-1] {
                dp[i][j] = dp[i-1][j-1] + 1
            } else {
                if dp[i-1][j] > dp[i][j-1] {
                    dp[i][j] = dp[i-1][j]
                } else {
                    dp[i][j] = dp[i][j-1]
                }
            }
        }
    }

    return dp[m][n]
}`,
  Rust: `fn longest_common_subsequence(text1: String, text2: String) -> i32 {
    let a: Vec<char> = text1.chars().collect();
    let b: Vec<char> = text2.chars().collect();
    let m = a.len();
    let n = b.len();

    let mut dp = vec![vec![0; n + 1]; m + 1];

    for i in 1..=m {
        for j in 1..=n {
            if a[i - 1] == b[j - 1] {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = dp[i - 1][j].max(dp[i][j - 1]);
            }
        }
    }

    dp[m][n]
}`,
  Kotlin: `fun longestCommonSubsequence(text1: String, text2: String): Int {
    val m = text1.length
    val n = text2.length
    val dp = Array(m + 1) { IntArray(n + 1) }

    for (i in 1..m) {
        for (j in 1..n) {
            if (text1[i - 1] == text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1
            } else {
                dp[i][j] = maxOf(dp[i - 1][j], dp[i][j - 1])
            }
        }
    }

    return dp[m][n]
}`,
  Swift: `func longestCommonSubsequence(_ text1: String, _ text2: String) -> Int {
    let a = Array(text1)
    let b = Array(text2)
    let m = a.count
    let n = b.count

    var dp = Array(repeating: Array(repeating: 0, count: n + 1), count: m + 1)

    for i in 1...m {
        for j in 1...n {
            if a[i - 1] == b[j - 1] {
                dp[i][j] = dp[i - 1][j - 1] + 1
            } else {
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
            }
        }
    }

    return dp[m][n]
}`,
};

export default function DynamicProgramming2LessonPage() {
  const languages = Object.keys(codeByLanguage);
  const [activeLanguage, setActiveLanguage] = useState("TypeScript");

  return (
    <main className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
        <div className="container h-14 px-4 md:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold tracking-widest text-sm">
            <span className="h-3 w-3 bg-primary shadow-[0_0_14px_hsl(var(--primary))]" />
            <span className="text-primary text-glow">DSA.ENGINE</span>
          </Link>

          <div className="flex items-center gap-6 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            <Link href="/visualize/dynamic-programming-2" className="hover:text-primary transition-colors">
              // visualizer
            </Link>
            <Link href="/" className="hover:text-primary transition-colors">
              // home
            </Link>
          </div>
        </div>
      </header>

      <div className="container px-4 md:px-8 py-12 md:py-16">
        <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          learn // dynamic_programming_2 — module 08
        </div>

        <h1 className="mt-2 text-4xl md:text-7xl font-extrabold leading-[0.95]">
          Dynamic Programming II
          <br />
          <span className="text-primary text-glow">Think in Grids and States.</span>
        </h1>

        <p className="mt-5 max-w-4xl text-sm md:text-lg text-muted-foreground leading-relaxed">
          DP II moves beyond one-dimensional recurrence chains. Now states often depend on
          both a row and a column, or on multiple dimensions such as interval boundaries,
          capacity, masks, or substrings.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/visualize/dynamic-programming-2"
            className="border-2 border-primary bg-primary px-5 py-3 text-sm font-bold tracking-[0.25em] text-black hover:opacity-90"
          >
            ▶ OPEN_VISUALIZER
          </Link>

          <Link
            href="/"
            className="border-2 border-border px-5 py-3 text-sm font-bold tracking-[0.25em] text-foreground hover:border-primary hover:text-primary transition-colors"
          >
            $ BACK_TO_HOME
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-[300px_minmax(0,920px)] gap-8 items-start">
          <aside className="terminal-frame p-5 h-fit lg:sticky lg:top-24">
            <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              ./table_of_contents
            </div>

            <div className="mt-5 space-y-4 text-sm">
              <a href="#root-problem" className="block hover:text-primary">01 Root Problem</a>
              <a href="#state" className="block hover:text-primary">02 2D State Definition</a>
              <a href="#transition" className="block hover:text-primary">03 Transition Rule</a>
              <a href="#walkthrough" className="block hover:text-primary">04 Step-by-Step Example</a>
              <a href="#code" className="block hover:text-primary">05 Code Implementation</a>
              <a href="#complexity" className="block hover:text-primary">06 Time Complexity</a>
              <a href="#real-world" className="block hover:text-primary">07 Real-World Uses</a>
              <a href="#practice" className="block hover:text-primary">08 Practice Problems</a>
            </div>

            <Link
              href="/visualize/dynamic-programming-2"
              className="mt-6 block border border-primary bg-primary/10 px-4 py-3 text-center text-xs font-bold tracking-[0.25em] text-primary hover:bg-primary hover:text-black"
            >
              ▶ OPEN VISUALIZER
            </Link>
          </aside>

          <div className="space-y-14 max-w-[920px]">
            <section id="root-problem">
              <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">01 // root_problem</div>
              <h2 className="mt-2 text-3xl md:text-5xl font-bold">$ The Root Problem</h2>
              <div className="mt-5 terminal-frame p-5 md:p-6 text-muted-foreground leading-relaxed">
                In DP II, one index is no longer enough. Problems often compare two sequences,
                track two boundaries, or combine decisions across multiple dimensions.
                That means each state must represent more information.
                <div className="mt-5 border border-border bg-background/60 p-4">
                  <div className="text-foreground font-bold mb-3">Typical DP II categories:</div>
                  <div className="space-y-2">
                    <div>• 2D prefix / grid DP</div>
                    <div>• knapsack-style capacity DP</div>
                    <div>• interval DP with [l, r]</div>
                    <div>• bitmask DP over subsets</div>
                  </div>
                </div>
              </div>
            </section>

            <section id="state">
              <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">02 // state_definition</div>
              <h2 className="mt-2 text-3xl md:text-5xl font-bold">$ 2D State Definition</h2>
              <div className="mt-5 terminal-frame p-5 md:p-6 text-muted-foreground leading-relaxed">
                For Longest Common Subsequence:
                <pre className="mt-4 border border-border bg-background/60 p-4 overflow-x-auto text-sm text-foreground">
{`dp[i][j] = length of the LCS between text1[0..i-1] and text2[0..j-1]`}
                </pre>
                <div className="mt-5">
                  Now the state depends on two positions, so the DP table becomes 2D instead of 1D.
                </div>
              </div>
            </section>

            <section id="transition">
              <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">03 // transition_rule</div>
              <h2 className="mt-2 text-3xl md:text-5xl font-bold">$ Transition Rule</h2>
              <div className="mt-5 terminal-frame p-5 md:p-6 text-muted-foreground leading-relaxed">
                At state (i, j), compare the last characters of the two prefixes.
                <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-border bg-background/60 p-4">
                    <div className="font-bold text-foreground">Match case</div>
                    <div className="mt-2">If text1[i - 1] === text2[j - 1], extend the diagonal subsequence.</div>
                    <pre className="mt-3 border border-border bg-background p-4 text-sm text-foreground overflow-x-auto">
{`dp[i][j] = dp[i - 1][j - 1] + 1`}
                    </pre>
                  </div>
                  <div className="border border-border bg-background/60 p-4">
                    <div className="font-bold text-foreground">Mismatch case</div>
                    <div className="mt-2">Drop one character from either top or left and keep the better result.</div>
                    <pre className="mt-3 border border-border bg-background p-4 text-sm text-foreground overflow-x-auto">
{`dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])`}
                    </pre>
                  </div>
                </div>
              </div>
            </section>

            <section id="walkthrough">
              <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">04 // walkthrough</div>
              <h2 className="mt-2 text-3xl md:text-5xl font-bold">$ Step-by-Step Example</h2>
              <div className="mt-5 terminal-frame p-5 md:p-6 text-muted-foreground leading-relaxed">
                Suppose:
                <pre className="mt-4 border border-border bg-background/60 p-4 text-sm text-foreground">
{`text1 = "abcde"
text2 = "ace"`}
                </pre>

                <div className="mt-5">
                  Build a table of size (m + 1) x (n + 1). The 0th row and 0th column are 0
                  because an empty string has LCS length 0 with anything.
                </div>

                <div className="mt-5">
                  Then fill the table left to right, top to bottom.
                  Every dp[i][j] depends only on already-computed cells:
                </div>

                <pre className="mt-4 border border-border bg-background/60 p-4 text-sm text-foreground">
{`top-left: dp[i - 1][j - 1]
top:      dp[i - 1][j]
left:     dp[i][j - 1]`}
                </pre>

                <div className="mt-5 border-l-2 border-primary pl-4 text-foreground">
                  Final answer = dp[m][n]
                </div>
              </div>
            </section>

            <section id="code">
              <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">05 // code</div>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold">$ Code Implementation</h2>

              <div className="mt-5 space-y-4">
                <div className="overflow-x-auto">
                  <div className="flex min-w-max gap-2 pb-1">
                    {languages.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setActiveLanguage(lang)}
                        className={`px-4 py-3 text-xs md:text-sm font-bold tracking-[0.06em] border transition-colors ${
                          activeLanguage === lang
                            ? "border-primary bg-primary text-black"
                            : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="terminal-frame p-3 md:p-4">
                  <div className="text-lg font-bold text-primary">{activeLanguage}</div>
                  <pre className="mt-3 border border-border bg-background/60 p-3 md:p-4 overflow-x-auto text-[13px] text-foreground whitespace-pre-wrap leading-7">
{codeByLanguage[activeLanguage as keyof typeof codeByLanguage]}
                  </pre>
                </div>
              </div>
            </section>

            <section id="complexity">
              <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">06 // complexity</div>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold">$ Time Complexity</h2>

              <div className="mt-5 space-y-4">
                <div className="terminal-frame p-4 md:p-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-border bg-background/60 p-4">
                      <div className="text-foreground font-bold">Time</div>
                      <div className="mt-2 text-2xl font-bold text-primary">O(m × n)</div>
                    </div>
                    <div className="border border-border bg-background/60 p-4">
                      <div className="text-foreground font-bold">Space</div>
                      <div className="mt-2 text-2xl font-bold text-primary">O(m × n)</div>
                    </div>
                  </div>
                </div>

                <div className="terminal-frame p-4 md:p-5 text-muted-foreground leading-relaxed">
                  <div className="text-foreground font-bold text-lg">Why time is O(m × n)</div>

                  <div className="mt-4 border border-border bg-background/60 p-4">
                    Let m = length of text1 and n = length of text2.
                    The table has (m + 1) × (n + 1) cells, but the real work happens on the m × n interior cells.
                  </div>

                  <div className="mt-4 space-y-4">
                    <div className="border border-border bg-background/60 p-4">
                      <div className="font-bold text-foreground">1. One state per cell</div>
                      <div className="mt-2">
                        Each pair (i, j) defines one DP state, so there are m × n total states to compute.
                      </div>
                    </div>

                    <div className="border border-border bg-background/60 p-4">
                      <div className="font-bold text-foreground">2. Constant work per state</div>
                      <div className="mt-2">
                        For each cell, we compare two characters and then do either:
                      </div>
                      <pre className="mt-3 border border-border bg-background p-4 overflow-x-auto text-sm text-foreground">
{`dp[i][j] = dp[i - 1][j - 1] + 1
or
dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])`}
                      </pre>
                      <div className="mt-3">
                        That is constant work, so each state costs O(1).
                      </div>
                    </div>

                    <div className="border border-border bg-background/60 p-4">
                      <div className="font-bold text-foreground">3. Total work</div>
                      <div className="mt-2">
                        m × n states × O(1) each = <span className="text-primary font-bold">O(m × n)</span>.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="terminal-frame p-4 md:p-5 text-muted-foreground leading-relaxed">
                  <div className="text-foreground font-bold text-lg">Why space is O(m × n)</div>
                  <div className="mt-4 border border-border bg-background/60 p-4">
                    The 2D DP table stores one value for every state pair (i, j), so the total memory is proportional to the table size.
                  </div>
                </div>

                <div className="terminal-frame p-4 md:p-5 text-muted-foreground leading-relaxed">
                  <div className="text-foreground font-bold text-lg">Optimization note</div>
                  <div className="mt-4 border-l-2 border-primary pl-4 text-foreground">
                    Some 2D DP problems can be compressed to O(n) space if each row only depends on the previous row.
                    But the full table is usually best for learning and visualization.
                  </div>
                </div>
              </div>
            </section>

            <section id="real-world">
              <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">07 // real_world</div>
              <h2 className="mt-2 text-3xl md:text-5xl font-bold">$ Real-World Uses</h2>
              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  ["Diff Tools", "Sequence alignment ideas appear in file comparison and version-control diffs."],
                  ["Bioinformatics", "DNA / protein sequence matching often uses 2D DP-style alignment tables."],
                  ["Text Processing", "Edit distance and subsequence similarity are DP-heavy."],
                  ["Knapsack Optimization", "Capacity-based DP appears in packing and budgeting systems."],
                  ["Scheduling", "Interval and state-based optimization often grows into higher-dimensional DP."],
                  ["Search & Recommendation", "Similarity scoring and structured matching can use DP transitions."],
                ].map(([title, desc]) => (
                  <div key={title} className="terminal-frame p-4 md:p-5">
                    <div className="font-bold text-foreground">{title}</div>
                    <div className="mt-2 text-muted-foreground">{desc}</div>
                  </div>
                ))}
              </div>
            </section>

            <section id="practice">
              <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">08 // practice</div>
              <h2 className="mt-2 text-3xl md:text-5xl font-bold">$ Practice Problems</h2>
              <div className="mt-5 grid grid-cols-1 gap-4">
                {[
                  ["Longest Common Subsequence", "Classic 2D DP over two strings."],
                  ["Edit Distance", "Another canonical string-to-string DP table."],
                  ["0/1 Knapsack", "Capacity and item-index state transitions."],
                  ["Unique Paths", "Grid DP over rows and columns."],
                  ["Palindromic Substrings / Interval DP", "States depend on substring boundaries."],
                  ["Bitmask DP Problems", "Subset-state optimization at higher complexity."],
                ].map(([title, desc]) => (
                  <div key={title} className="terminal-frame p-4 md:p-5">
                    <div className="font-bold text-foreground">{title}</div>
                    <div className="mt-2 text-muted-foreground">{desc}</div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
