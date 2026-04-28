"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";

type TocItem = {
  id: string;
  num: string;
  label: string;
};

type CodeExample = {
  language: string;
  code: string;
};

const toc: TocItem[] = [
  { id: "root-problem", num: "01", label: "Root Problem" },
  { id: "core-idea", num: "02", label: "Core Idea" },
  { id: "intuition", num: "03", label: "Intuition" },
  { id: "walkthrough", num: "04", label: "Step-by-Step Example" },
  { id: "code", num: "05", label: "Code Implementation" },
  { id: "complexity", num: "06", label: "Time Complexity" },
  { id: "real-world", num: "07", label: "Real-World Uses" },
  { id: "practice", num: "08", label: "Practice Problems" },
];

const codeExamples: CodeExample[] = [
  {
    language: "TypeScript",
    code: `function lengthOfLongestSubstring(s: string): number {
  const seen = new Map<string, number>();
  let left = 0;
  let best = 0;

  for (let right = 0; right < s.length; right++) {
    const ch = s[right];

    if (seen.has(ch) && seen.get(ch)! >= left) {
      left = seen.get(ch)! + 1;
    }

    seen.set(ch, right);
    best = Math.max(best, right - left + 1);
  }

  return best;
}`,
  },
  {
    language: "JavaScript",
    code: `function lengthOfLongestSubstring(s) {
  const seen = new Map();
  let left = 0;
  let best = 0;

  for (let right = 0; right < s.length; right++) {
    const ch = s[right];

    if (seen.has(ch) && seen.get(ch) >= left) {
      left = seen.get(ch) + 1;
    }

    seen.set(ch, right);
    best = Math.max(best, right - left + 1);
  }

  return best;
}`,
  },
  {
    language: "Python",
    code: `def length_of_longest_substring(s):
    seen = {}
    left = 0
    best = 0

    for right, ch in enumerate(s):
        if ch in seen and seen[ch] >= left:
            left = seen[ch] + 1

        seen[ch] = right
        best = max(best, right - left + 1)

    return best`,
  },
  {
    language: "Java",
    code: `import java.util.*;

public class SlidingWindow {
    public static int lengthOfLongestSubstring(String s) {
        Map<Character, Integer> seen = new HashMap<>();
        int left = 0;
        int best = 0;

        for (int right = 0; right < s.length(); right++) {
            char ch = s.charAt(right);

            if (seen.containsKey(ch) && seen.get(ch) >= left) {
                left = seen.get(ch) + 1;
            }

            seen.put(ch, right);
            best = Math.max(best, right - left + 1);
        }

        return best;
    }
}`,
  },
  {
    language: "C++",
    code: `#include <string>
#include <unordered_map>
using namespace std;

int lengthOfLongestSubstring(string s) {
    unordered_map<char, int> seen;
    int left = 0;
    int best = 0;

    for (int right = 0; right < s.size(); right++) {
        char ch = s[right];

        if (seen.count(ch) && seen[ch] >= left) {
            left = seen[ch] + 1;
        }

        seen[ch] = right;
        best = max(best, right - left + 1);
    }

    return best;
}`,
  },
  {
    language: "C#",
    code: `using System.Collections.Generic;

public class SlidingWindow {
    public static int LengthOfLongestSubstring(string s) {
        Dictionary<char, int> seen = new Dictionary<char, int>();
        int left = 0;
        int best = 0;

        for (int right = 0; right < s.Length; right++) {
            char ch = s[right];

            if (seen.ContainsKey(ch) && seen[ch] >= left) {
                left = seen[ch] + 1;
            }

            seen[ch] = right;
            best = System.Math.Max(best, right - left + 1);
        }

        return best;
    }
}`,
  },
  {
    language: "Go",
    code: `func LengthOfLongestSubstring(s string) int {
    seen := map[byte]int{}
    left := 0
    best := 0

    for right := 0; right < len(s); right++ {
        ch := s[right]

        if idx, ok := seen[ch]; ok && idx >= left {
            left = idx + 1
        }

        seen[ch] = right
        if right-left+1 > best {
            best = right - left + 1
        }
    }

    return best
}`,
  },
  {
    language: "Rust",
    code: `use std::collections::HashMap;

fn length_of_longest_substring(s: String) -> i32 {
    let chars: Vec<char> = s.chars().collect();
    let mut seen: HashMap<char, usize> = HashMap::new();
    let mut left = 0usize;
    let mut best = 0usize;

    for right in 0..chars.len() {
        let ch = chars[right];

        if let Some(&idx) = seen.get(&ch) {
            if idx >= left {
                left = idx + 1;
            }
        }

        seen.insert(ch, right);
        best = best.max(right - left + 1);
    }

    best as i32
}`,
  },
  {
    language: "Kotlin",
    code: `fun lengthOfLongestSubstring(s: String): Int {
    val seen = mutableMapOf<Char, Int>()
    var left = 0
    var best = 0

    for (right in s.indices) {
        val ch = s[right]

        if (ch in seen && seen[ch]!! >= left) {
            left = seen[ch]!! + 1
        }

        seen[ch] = right
        best = maxOf(best, right - left + 1)
    }

    return best
}`,
  },
  {
    language: "Swift",
    code: `func lengthOfLongestSubstring(_ s: String) -> Int {
    let chars = Array(s)
    var seen: [Character: Int] = [:]
    var left = 0
    var best = 0

    for right in 0..<chars.count {
        let ch = chars[right]

        if let idx = seen[ch], idx >= left {
            left = idx + 1
        }

        seen[ch] = right
        best = max(best, right - left + 1)
    }

    return best
}`,
  },
];

function Section({
  id,
  num,
  title,
  children,
}: {
  id: string;
  num: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="border-b border-border py-14 scroll-mt-24">
      <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
        {num} // {id.replaceAll("-", "_")}
      </div>

      <h2 className="mt-3 text-3xl md:text-4xl font-bold leading-tight">
        <span className="text-primary text-glow">$</span> {title}
      </h2>

      <div className="mt-5 text-sm md:text-[15px] text-muted-foreground leading-relaxed space-y-4 max-w-4xl">
        {children}
      </div>
    </section>
  );
}

export default function LearnStringsSlidingWindowPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("TypeScript");

  const currentCode =
    codeExamples.find((item) => item.language === selectedLanguage)?.code ??
    codeExamples[0].code;

  return (
    <main className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
        <div className="container px-4 md:px-8 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold tracking-widest text-sm">
            <span className="h-3 w-3 bg-primary shadow-[0_0_14px_hsl(var(--primary))]" />
            <span className="text-primary text-glow">DSA.ENGINE</span>
          </Link>

          <div className="flex items-center gap-6 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            <Link href="/visualize/strings-sliding-window" className="hover:text-primary transition-colors">
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
          learn // strings_sliding_window · module 02
        </div>

        <h1 className="mt-2 text-4xl md:text-6xl font-extrabold leading-[0.95]">
          Strings &
          <br />
          <span className="text-primary text-glow">Sliding Window.</span>
        </h1>

        <p className="mt-5 max-w-3xl text-sm md:text-base text-muted-foreground leading-relaxed">
          Sliding Window is how you solve substring problems without recomputing every substring from scratch.
          Instead of brute-forcing all start/end pairs, you maintain a moving window and update just the state that changes.
          That is why so many string problems collapse from <span className="text-foreground">O(n²)</span> to{" "}
          <span className="text-foreground">O(n)</span>.
        </p>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
          <aside className="terminal-frame p-4 h-fit lg:sticky lg:top-20">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
              ./table_of_contents
            </div>

            <div className="space-y-3">
              {toc.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <span className="text-primary font-bold">{item.num}</span>
                  <span>{item.label}</span>
                </a>
              ))}
            </div>

            <Link
              href="/visualize/strings-sliding-window"
              className="mt-6 inline-flex items-center justify-center w-full border border-primary px-4 py-3 text-xs font-bold tracking-[0.25em] text-primary hover:bg-primary hover:text-black transition-colors"
            >
              ▶ OPEN_VISUALIZER
            </Link>
          </aside>

          <div>
            <Section id="root-problem" num="01" title="The Root Problem">
              <p>
                String problems often ask about a substring with some property:
                no repeats, fixed frequency, minimum valid cover, longest replacement window, anagram match, and so on.
              </p>
              <p>
                The naive instinct is:
              </p>
              <div className="terminal-frame overflow-x-auto p-4 text-[12px] md:text-xs leading-relaxed text-foreground">
                <pre>{`try every start
  try every end
    validate substring`}</pre>
              </div>
              <p>
                That often becomes O(n²) or O(n³), depending on how validation is done.
              </p>
              <div className="terminal-frame p-4">
                <p className="text-foreground font-semibold">Main question:</p>
                <p className="mt-2">
                  How do we reuse information from the current substring instead of rebuilding it every time?
                </p>
              </div>
            </Section>

            <Section id="core-idea" num="02" title="Core Idea">
              <p>
                Sliding Window uses two pointers:
              </p>
              <div className="terminal-frame p-4">
                <p>1. <span className="text-primary">left</span> = start of the current window</p>
                <p>2. <span className="text-primary">right</span> = end of the current window</p>
              </div>
              <p>
                Then you maintain some compact state for the current window:
              </p>
              <p>▸ a set of characters</p>
              <p>▸ a frequency map</p>
              <p>▸ counts of valid/invalid conditions</p>
              <p>▸ most recent index of each character</p>
              <p>
                The key shift is this: you do not “solve each substring separately.”
                You evolve one window over time.
              </p>
            </Section>

            <Section id="intuition" num="03" title="Intuition">
              <p>
                Picture a highlighted box moving across the string.
              </p>
              <div className="terminal-frame p-4">
                <p><span className="text-primary font-semibold">expand right</span> → add one new character</p>
                <p><span className="text-primary font-semibold">shrink left</span> → remove one old character</p>
                <p><span className="text-primary font-semibold">update state</span> → keep the window valid</p>
              </div>
              <p>
                So instead of recomputing the substring from zero, you only handle the delta:
                one character entered, or one character left.
              </p>
              <p>
                That is why sliding window is really a <span className="text-foreground">state maintenance technique</span>,
                not just a “two pointers trick.”
              </p>
            </Section>

            <Section id="walkthrough" num="04" title="Step-by-Step Example">
              <p>
                Use the classic problem: <span className="text-foreground">Longest Substring Without Repeating Characters</span>.
              </p>

              <div className="terminal-frame overflow-x-auto p-4 text-[12px] md:text-xs leading-relaxed text-foreground">
                <pre>{`s = "abcabcbb"`}</pre>
              </div>

              <p>Walkthrough:</p>

              <div className="terminal-frame overflow-x-auto p-4 text-[12px] md:text-xs leading-relaxed text-foreground">
                <pre>{`left = 0, right = 0
window = "a"      valid, best = 1

left = 0, right = 1
window = "ab"     valid, best = 2

left = 0, right = 2
window = "abc"    valid, best = 3

left = 0, right = 3
window = "abca"   invalid because 'a' repeats

move left to after previous 'a'
left = 1
window = "bca"    valid again, best still = 3`}</pre>
              </div>

              <p>
                The crucial point is that we do not throw away the whole substring.
                We only move left as far as needed to restore validity.
              </p>

              <div className="terminal-frame p-4">
                <p className="text-foreground font-semibold">Mental model:</p>
                <p className="mt-2">
                  right grows the candidate, left repairs the candidate.
                </p>
              </div>
            </Section>

            <Section id="code" num="05" title="Code Implementation">
              <p>
                Below is the same logic across 10 languages.
                The pattern is:
              </p>

              <div className="terminal-frame p-4">
                <p>1. Expand right</p>
                <p>2. Check if the new character breaks validity</p>
                <p>3. Move left only as much as needed</p>
                <p>4. Update best answer</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {codeExamples.map((item) => (
                  <button
                    key={item.language}
                    onClick={() => setSelectedLanguage(item.language)}
                    className={`px-4 py-2 text-xs md:text-sm border tracking-wide font-semibold transition-colors ${
                      selectedLanguage === item.language
                        ? "bg-primary text-black border-primary"
                        : "border-border text-muted-foreground hover:text-primary hover:border-primary"
                    }`}
                  >
                    {item.language}
                  </button>
                ))}
              </div>

              <div className="terminal-frame overflow-x-auto p-4 text-[12px] md:text-xs leading-relaxed text-foreground">
                <pre className="whitespace-pre">{currentCode}</pre>
              </div>

              <div className="space-y-3">
                <p className="text-foreground font-semibold">What matters in the code:</p>
                <p>▸ The map stores the last seen index of each character</p>
                <p>▸ We only move left forward, never backward</p>
                <p>▸ We update left with the max valid position, not blindly by 1</p>
                <p>▸ This lets us “jump” past old duplicates efficiently</p>
                <p>▸ The window length is always <code>right - left + 1</code></p>
              </div>
            </Section>

            <Section id="complexity" num="06" title="Time Complexity">
              <div className="terminal-frame overflow-x-auto p-4 text-[12px] md:text-xs leading-relaxed text-foreground">
                <pre>{`Time:  O(n)
Space: O(min(n, charset))

n = string length`}</pre>
              </div>

              <p>
                Now derive that carefully.
              </p>

              <div className="space-y-4">
                <div className="terminal-frame p-4">
                  <h3 className="text-base font-bold text-foreground">
                    1. Right pointer moves across the string once → O(n)
                  </h3>
                  <pre className="mt-4 overflow-x-auto">{`for (let right = 0; right < s.length; right++) {
  ...
}`}</pre>
                  <p className="mt-4">
                    The right pointer starts at 0 and ends at n - 1. That is n total moves.
                  </p>
                </div>

                <div className="terminal-frame p-4">
                  <h3 className="text-base font-bold text-foreground">
                    2. Left pointer also moves at most n times total → O(n)
                  </h3>
                  <p className="mt-4">
                    This is the most important insight.
                    Even though left may move many times during the algorithm, it never moves backward.
                  </p>
                  <pre className="mt-4 overflow-x-auto">{`0 <= left <= n`}</pre>
                  <p className="mt-4">
                    So across the whole run, total left movement is at most n.
                  </p>
                </div>

                <div className="terminal-frame p-4">
                  <h3 className="text-base font-bold text-foreground">
                    3. Total pointer movement is linear
                  </h3>
                  <pre className="mt-4 overflow-x-auto">{`right moves at most n times
left moves at most n times

O(n + n) = O(2n) = O(n)`}</pre>
                  <p className="mt-4">
                    That is why sliding window is linear even though it sometimes “looks nested.”
                  </p>
                </div>

                <div className="terminal-frame p-4">
                  <h3 className="text-base font-bold text-foreground">
                    4. Hash map operations are O(1) on average
                  </h3>
                  <pre className="mt-4 overflow-x-auto">{`seen.has(ch)
seen.get(ch)
seen.set(ch, right)`}</pre>
                  <p className="mt-4">
                    These are average-case constant-time operations, so each step does O(1) extra work.
                  </p>
                </div>

                <div className="terminal-frame p-4">
                  <h3 className="text-base font-bold text-foreground">
                    5. Why this is not O(n²)
                  </h3>
                  <p className="mt-4">
                    People see one pointer inside another and think it must multiply.
                    That is wrong here because the inner work is amortized.
                  </p>
                  <p className="mt-4">
                    You are not restarting left from 0 for every right.
                    Both pointers march forward through the string only once overall.
                  </p>
                </div>

                <div className="terminal-frame p-4">
                  <h3 className="text-base font-bold text-foreground">
                    6. Space complexity
                  </h3>
                  <p className="mt-4">
                    The map stores at most one entry per distinct character currently relevant.
                  </p>
                  <pre className="mt-4 overflow-x-auto">{`Space = O(min(n, charset))`}</pre>
                  <p className="mt-4">
                    If the alphabet is fixed and small, this is effectively constant.
                    If not, it grows with the number of distinct characters seen.
                  </p>
                </div>
              </div>

              <div className="border-l-4 border-primary pl-5 py-2">
                <p className="text-primary font-semibold">Exam shortcut:</p>
                <p className="mt-2">
                  Both pointers move only forward, never backward, so total pointer movement is linear.
                  That makes the algorithm <span className="text-foreground font-semibold">O(n)</span>.
                </p>
              </div>
            </Section>

            <Section id="real-world" num="07" title="Real-World Uses">
              <div className="mt-8 flex flex-col gap-4">
                {[
                  ["Streaming Text", "Track recent unique tokens or valid rolling substrings in real time."],
                  ["Log Analysis", "Detect suspicious repeated bursts or bounded string patterns."],
                  ["Search Systems", "Scan contiguous windows for matching or near-matching criteria."],
                  ["Bioinformatics", "Analyze sequence windows in DNA and protein strings."],
                  ["Compression", "Reason about local repetition and short-range symbol patterns."],
                  ["Security Scanning", "Inspect moving windows of payload text for signatures."],
                ].map(([title, desc]) => (
                  <div key={title} className="terminal-frame p-4">
                    <h3 className="text-sm font-bold text-foreground">{title}</h3>
                    <p className="mt-2 text-muted-foreground">{desc}</p>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="practice" num="08" title="Practice Problems">
              <div className="space-y-4">
                {[
                  ["Longest Substring Without Repeating Characters", "Classic variable-size window."],
                  ["Minimum Window Substring", "Shrink down to the smallest valid cover."],
                  ["Permutation in String", "Fixed-size validity window."],
                  ["Find All Anagrams in a String", "Frequency-based window matching."],
                  ["Longest Repeating Character Replacement", "Window validity under bounded edits."],
                ].map(([title, desc]) => (
                  <div key={title} className="terminal-frame p-4">
                    <h3 className="text-sm font-bold text-foreground">{title}</h3>
                    <p className="mt-2 text-muted-foreground">{desc}</p>
                  </div>
                ))}
              </div>
            </Section>

            <div className="py-12">
              <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                // module_actions
              </div>

              <h2 className="mt-2 text-2xl md:text-3xl font-bold">
                Strings & Sliding Window <span className="text-primary text-glow">Ready.</span>
              </h2>

              <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
                Open the visualizer or return home.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/visualize/strings-sliding-window"
                  className="border-2 border-primary bg-primary px-5 py-3 text-sm font-bold tracking-[0.25em] text-black hover:opacity-90"
                >
                  ▶ OPEN_STRINGS_VISUALIZER
                </Link>

                <Link
                  href="/"
                  className="border-2 border-border px-5 py-3 text-sm font-bold tracking-[0.25em] text-foreground hover:border-primary hover:text-primary transition-colors"
                >
                  $ BACK_TO_HOME
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
