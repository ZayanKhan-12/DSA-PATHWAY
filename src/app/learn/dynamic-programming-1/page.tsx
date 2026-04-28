"use client";

import Link from "next/link";
import { useState } from "react";

const codeByLanguage = {
  TypeScript: `function rob(nums: number[]): number {
  const n = nums.length;
  if (n === 1) return nums[0];

  const dp = new Array(n).fill(0);
  dp[0] = nums[0];
  dp[1] = Math.max(nums[0], nums[1]);

  for (let i = 2; i < n; i++) {
    const take = dp[i - 2] + nums[i];
    const skip = dp[i - 1];
    dp[i] = Math.max(take, skip);
  }

  return dp[n - 1];
}`,
  JavaScript: `function rob(nums) {
  const n = nums.length;
  if (n === 1) return nums[0];

  const dp = new Array(n).fill(0);
  dp[0] = nums[0];
  dp[1] = Math.max(nums[0], nums[1]);

  for (let i = 2; i < n; i++) {
    const take = dp[i - 2] + nums[i];
    const skip = dp[i - 1];
    dp[i] = Math.max(take, skip);
  }

  return dp[n - 1];
}`,
  Python: `def rob(nums):
    n = len(nums)
    if n == 1:
        return nums[0]

    dp = [0] * n
    dp[0] = nums[0]
    dp[1] = max(nums[0], nums[1])

    for i in range(2, n):
        take = dp[i - 2] + nums[i]
        skip = dp[i - 1]
        dp[i] = max(take, skip)

    return dp[-1]`,
  Java: `class Solution {
    public int rob(int[] nums) {
        int n = nums.length;
        if (n == 1) return nums[0];

        int[] dp = new int[n];
        dp[0] = nums[0];
        dp[1] = Math.max(nums[0], nums[1]);

        for (int i = 2; i < n; i++) {
            int take = dp[i - 2] + nums[i];
            int skip = dp[i - 1];
            dp[i] = Math.max(take, skip);
        }

        return dp[n - 1];
    }
}`,
  "C++": `class Solution {
public:
    int rob(vector<int>& nums) {
        int n = nums.size();
        if (n == 1) return nums[0];

        vector<int> dp(n, 0);
        dp[0] = nums[0];
        dp[1] = max(nums[0], nums[1]);

        for (int i = 2; i < n; i++) {
            int take = dp[i - 2] + nums[i];
            int skip = dp[i - 1];
            dp[i] = max(take, skip);
        }

        return dp[n - 1];
    }
};`,
  Go: `func rob(nums []int) int {
    n := len(nums)
    if n == 1 {
        return nums[0]
    }

    dp := make([]int, n)
    dp[0] = nums[0]
    dp[1] = max(nums[0], nums[1])

    for i := 2; i < n; i++ {
        take := dp[i-2] + nums[i]
        skip := dp[i-1]
        dp[i] = max(take, skip)
    }

    return dp[n-1]
}`,
  Rust: `fn rob(nums: Vec<i32>) -> i32 {
    let n = nums.len();
    if n == 1 {
        return nums[0];
    }

    let mut dp = vec![0; n];
    dp[0] = nums[0];
    dp[1] = nums[0].max(nums[1]);

    for i in 2..n {
        let take = dp[i - 2] + nums[i];
        let skip = dp[i - 1];
        dp[i] = take.max(skip);
    }

    dp[n - 1]
}`,
  Kotlin: `fun rob(nums: IntArray): Int {
    val n = nums.size
    if (n == 1) return nums[0]

    val dp = IntArray(n)
    dp[0] = nums[0]
    dp[1] = maxOf(nums[0], nums[1])

    for (i in 2 until n) {
        val take = dp[i - 2] + nums[i]
        val skip = dp[i - 1]
        dp[i] = maxOf(take, skip)
    }

    return dp[n - 1]
}`,
  Swift: `func rob(_ nums: [Int]) -> Int {
    let n = nums.count
    if n == 1 { return nums[0] }

    var dp = Array(repeating: 0, count: n)
    dp[0] = nums[0]
    dp[1] = max(nums[0], nums[1])

    for i in 2..<n {
        let take = dp[i - 2] + nums[i]
        let skip = dp[i - 1]
        dp[i] = max(take, skip)
    }

    return dp[n - 1]
}`,
};

export default function DynamicProgramming1LessonPage() {
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
            <Link href="/visualize/dynamic-programming-1" className="hover:text-primary transition-colors">
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
          learn // dynamic_programming_1 — module 07
        </div>

        <h1 className="mt-2 text-4xl md:text-7xl font-extrabold leading-[0.95]">
          Dynamic Programming I
          <br />
          <span className="text-primary text-glow">Build From Smaller Answers.</span>
        </h1>

        <p className="mt-5 max-w-4xl text-sm md:text-lg text-muted-foreground leading-relaxed">
          DP starts when brute force keeps recomputing the same work. The goal is to define a state,
          write a recurrence, and build the answer from previously solved subproblems.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/visualize/dynamic-programming-1"
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
              <a href="#state" className="block hover:text-primary">02 State Definition</a>
              <a href="#recurrence" className="block hover:text-primary">03 Recurrence</a>
              <a href="#walkthrough" className="block hover:text-primary">04 Step-by-Step Example</a>
              <a href="#code" className="block hover:text-primary">05 Code Implementation</a>
              <a href="#complexity" className="block hover:text-primary">06 Time Complexity</a>
              <a href="#real-world" className="block hover:text-primary">07 Real-World Uses</a>
              <a href="#practice" className="block hover:text-primary">08 Practice Problems</a>
            </div>

            <Link
              href="/visualize/dynamic-programming-1"
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
                In many problems, a plain recursive solution branches into repeated subproblems.
                That means the algorithm solves the same smaller question again and again.
                DP fixes that by storing answers to smaller states and reusing them.
                <div className="mt-5 border border-border bg-background/60 p-4">
                  <div className="text-foreground font-bold mb-3">DP pattern:</div>
                  <div className="space-y-2">
                    <div>• identify repeated subproblems</div>
                    <div>• define a state</div>
                    <div>• write a transition / recurrence</div>
                    <div>• fill answers in a valid order</div>
                  </div>
                </div>
              </div>
            </section>

            <section id="state">
              <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">02 // state_definition</div>
              <h2 className="mt-2 text-3xl md:text-5xl font-bold">$ State Definition</h2>
              <div className="mt-5 terminal-frame p-5 md:p-6 text-muted-foreground leading-relaxed">
                For the House Robber style recurrence, define:
                <pre className="mt-4 border border-border bg-background/60 p-4 overflow-x-auto text-sm text-foreground">
{`dp[i] = maximum money we can rob from houses 0..i`}
                </pre>
                <div className="mt-5">
                  Once the state is clear, the rest of the DP becomes easier because every entry has a precise meaning.
                </div>
              </div>
            </section>

            <section id="recurrence">
              <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">03 // recurrence</div>
              <h2 className="mt-2 text-3xl md:text-5xl font-bold">$ Recurrence</h2>
              <div className="mt-5 terminal-frame p-5 md:p-6 text-muted-foreground leading-relaxed">
                At house <span className="text-foreground font-bold">i</span>, there are only two choices:
                <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-border bg-background/60 p-4">
                    <div className="font-bold text-foreground">Take house i</div>
                    <div className="mt-2">Then you must skip i - 1, so total = dp[i - 2] + nums[i]</div>
                  </div>
                  <div className="border border-border bg-background/60 p-4">
                    <div className="font-bold text-foreground">Skip house i</div>
                    <div className="mt-2">Then best total stays dp[i - 1]</div>
                  </div>
                </div>

                <pre className="mt-5 border border-border bg-background/60 p-4 overflow-x-auto text-sm text-foreground">
{`dp[i] = max(dp[i - 2] + nums[i], dp[i - 1])`}
                </pre>
              </div>
            </section>

            <section id="walkthrough">
              <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">04 // walkthrough</div>
              <h2 className="mt-2 text-3xl md:text-5xl font-bold">$ Step-by-Step Example</h2>
              <div className="mt-5 terminal-frame p-5 md:p-6 text-muted-foreground leading-relaxed">
                Suppose:
                <pre className="mt-4 border border-border bg-background/60 p-4 text-sm text-foreground">
{`nums = [2, 7, 9, 3, 1]`}
                </pre>

                <div className="mt-5">Base cases:</div>
                <pre className="mt-4 border border-border bg-background/60 p-4 text-sm text-foreground">
{`dp[0] = 2
dp[1] = max(2, 7) = 7`}
                </pre>

                <div className="mt-5">Then fill left to right:</div>
                <pre className="mt-4 border border-border bg-background/60 p-4 text-sm text-foreground">
{`dp[2] = max(dp[0] + 9, dp[1]) = max(11, 7) = 11
dp[3] = max(dp[1] + 3, dp[2]) = max(10, 11) = 11
dp[4] = max(dp[2] + 1, dp[3]) = max(12, 11) = 12`}
                </pre>

                <div className="mt-5 border-l-2 border-primary pl-4 text-foreground">
                  Final answer = dp[4] = 12
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
                      <div className="mt-2 text-2xl font-bold text-primary">O(n)</div>
                    </div>
                    <div className="border border-border bg-background/60 p-4">
                      <div className="text-foreground font-bold">Space</div>
                      <div className="mt-2 text-2xl font-bold text-primary">O(n)</div>
                    </div>
                  </div>
                </div>

                <div className="terminal-frame p-4 md:p-5 text-muted-foreground leading-relaxed">
                  <div className="text-foreground font-bold text-lg">Why time is O(n)</div>

                  <div className="mt-4 border border-border bg-background/60 p-4">
                    We fill one DP entry per index from left to right.
                    There are <span className="text-primary font-bold">n</span> indices total.
                  </div>

                  <div className="mt-4 space-y-4">
                    <div className="border border-border bg-background/60 p-4">
                      <div className="font-bold text-foreground">1. One state per index</div>
                      <div className="mt-2">
                        The DP table contains dp[0], dp[1], ..., dp[n - 1], so there are n total states.
                      </div>
                    </div>

                    <div className="border border-border bg-background/60 p-4">
                      <div className="font-bold text-foreground">2. Constant work per state</div>
                      <div className="mt-2">
                        For each i, we only compute:
                      </div>
                      <pre className="mt-3 border border-border bg-background p-4 overflow-x-auto text-sm text-foreground">
{`take = dp[i - 2] + nums[i]
skip = dp[i - 1]
dp[i] = max(take, skip)`}
                      </pre>
                      <div className="mt-3">
                        That is O(1) work for each state.
                      </div>
                    </div>

                    <div className="border border-border bg-background/60 p-4">
                      <div className="font-bold text-foreground">3. Total work</div>
                      <div className="mt-2">
                        n states × O(1) work each = <span className="text-primary font-bold">O(n)</span>.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="terminal-frame p-4 md:p-5 text-muted-foreground leading-relaxed">
                  <div className="text-foreground font-bold text-lg">Why space is O(n)</div>
                  <div className="mt-4 border border-border bg-background/60 p-4">
                    The DP array stores one value for each index, so it uses n total cells.
                  </div>
                  <pre className="mt-4 border border-border bg-background p-4 overflow-x-auto text-sm text-foreground">
{`const dp = new Array(n).fill(0)`}
                  </pre>
                </div>

                <div className="terminal-frame p-4 md:p-5 text-muted-foreground leading-relaxed">
                  <div className="text-foreground font-bold text-lg">Optimization note</div>
                  <div className="mt-4 border-l-2 border-primary pl-4 text-foreground">
                    Because each state only depends on the previous two states, this particular DP can be reduced
                    from O(n) space to <span className="text-primary font-bold">O(1)</span> space with two rolling variables.
                  </div>
                </div>
              </div>
            </section>

            <section id="real-world">
              <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">07 // real_world</div>
              <h2 className="mt-2 text-3xl md:text-5xl font-bold">$ Real-World Uses</h2>
              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  ["Budget Planning", "Choose the best sequence of non-conflicting spending decisions."],
                  ["Scheduling", "Build best results from earlier compatible time slots."],
                  ["Inventory Decisions", "Reuse earlier optimal states instead of recalculating from scratch."],
                  ["Finance", "Model sequential profit decisions with recurrence-based state updates."],
                  ["Game Strategy", "Store best sub-results instead of recomputing every branch."],
                  ["Optimization Systems", "DP appears whenever overlapping subproblems exist in ordered decision-making."],
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
                  ["House Robber", "Classic 1D DP recurrence."],
                  ["Min Cost Climbing Stairs", "State transition over one-dimensional positions."],
                  ["Fibonacci Number", "Simplest repeated-subproblem DP."],
                  ["Decode Ways", "Count possibilities with prefix-based recurrence."],
                  ["Coin Change", "Optimize using smaller amounts first."],
                  ["Maximum Subarray", "Local recurrence leading to global optimum."],
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
