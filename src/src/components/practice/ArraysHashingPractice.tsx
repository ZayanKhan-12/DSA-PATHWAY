"use client";

import { useState } from "react";

type Language =
  | "TypeScript"
  | "JavaScript"
  | "Python"
  | "Java"
  | "C++"
  | "C#"
  | "Go"
  | "Rust"
  | "Kotlin"
  | "Swift";

type Problem = {
  slug: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  category: string;
  shortDescription: string;
  statement: string;
  examples: {
    input: string;
    output: string;
    explanation: string;
  }[];
  hint: string;
  solutionSummary: string;
  solutions: Record<Language, string>;
};

const LANGUAGES: Language[] = [
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
];

function difficultyClasses(level: Problem["difficulty"]) {
  if (level === "Easy") {
    return "border-primary bg-primary/10 text-primary";
  }
  if (level === "Medium") {
    return "border-terminal-amber bg-terminal-amber/10 text-terminal-amber";
  }
  return "border-terminal-magenta bg-terminal-magenta/10 text-terminal-magenta";
}

const PROBLEMS: Problem[] = [
  {
    slug: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    category: "Hash Map",
    shortDescription: "Classic complement lookup problem.",
    statement:
      "Given an array of integers nums and an integer target, return the indices of the two numbers such that they add up to target. You may assume that each input has exactly one solution, and you may not use the same element twice.",
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "nums[0] + nums[1] = 2 + 7 = 9",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        explanation: "nums[1] + nums[2] = 2 + 4 = 6",
      },
    ],
    hint:
      "As you scan the array, ask: if nums[i] is the second number, what first number would I need? Store seen values inside a hash map as value -> index.",
    solutionSummary:
      "Use a hash map. For each value x, compute need = target - x. If need was already seen, return the pair of indices immediately. Otherwise store x with its index.",
    solutions: {
      TypeScript: `function twoSum(nums: number[], target: number): number[] {
  const seen = new Map<number, number>();

  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];

    if (seen.has(need)) {
      return [seen.get(need)!, i];
    }

    seen.set(nums[i], i);
  }

  return [];
}`,
      JavaScript: `function twoSum(nums, target) {
  const seen = new Map();

  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];

    if (seen.has(need)) {
      return [seen.get(need), i];
    }

    seen.set(nums[i], i);
  }

  return [];
}`,
      Python: `def two_sum(nums, target):
    seen = {}

    for i, x in enumerate(nums):
        need = target - x

        if need in seen:
            return [seen[need], i]

        seen[x] = i

    return []`,
      Java: `import java.util.*;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> seen = new HashMap<>();

        for (int i = 0; i < nums.length; i++) {
            int need = target - nums[i];

            if (seen.containsKey(need)) {
                return new int[] { seen.get(need), i };
            }

            seen.put(nums[i], i);
        }

        return new int[] {};
    }
}`,
      "C++": `#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> seen;

        for (int i = 0; i < nums.size(); i++) {
            int need = target - nums[i];

            if (seen.count(need)) {
                return {seen[need], i};
            }

            seen[nums[i]] = i;
        }

        return {};
    }
};`,
      "C#": `using System.Collections.Generic;

public class Solution {
    public int[] TwoSum(int[] nums, int target) {
        Dictionary<int, int> seen = new Dictionary<int, int>();

        for (int i = 0; i < nums.Length; i++) {
            int need = target - nums[i];

            if (seen.ContainsKey(need)) {
                return new int[] { seen[need], i };
            }

            seen[nums[i]] = i;
        }

        return new int[] { };
    }
}`,
      Go: `func twoSum(nums []int, target int) []int {
    seen := map[int]int{}

    for i, x := range nums {
        need := target - x

        if j, ok := seen[need]; ok {
            return []int{j, i}
        }

        seen[x] = i
    }

    return []int{}
}`,
      Rust: `use std::collections::HashMap;

impl Solution {
    pub fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {
        let mut seen: HashMap<i32, i32> = HashMap::new();

        for (i, x) in nums.iter().enumerate() {
            let need = target - *x;

            if let Some(j) = seen.get(&need) {
                return vec![*j, i as i32];
            }

            seen.insert(*x, i as i32);
        }

        vec![]
    }
}`,
      Kotlin: `class Solution {
    fun twoSum(nums: IntArray, target: Int): IntArray {
        val seen = HashMap<Int, Int>()

        for (i in nums.indices) {
            val need = target - nums[i]

            if (seen.containsKey(need)) {
                return intArrayOf(seen[need]!!, i)
            }

            seen[nums[i]] = i
        }

        return intArrayOf()
    }
}`,
      Swift: `class Solution {
    func twoSum(_ nums: [Int], _ target: Int) -> [Int] {
        var seen: [Int: Int] = [:]

        for (i, x) in nums.enumerated() {
            let need = target - x

            if let j = seen[need] {
                return [j, i]
            }

            seen[x] = i
        }

        return []
    }
}`,
    },
  },
  {
    slug: "contains-duplicate",
    title: "Contains Duplicate",
    difficulty: "Easy",
    category: "Hash Set",
    shortDescription: "Hash set duplicate detection.",
    statement:
      "Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.",
    examples: [
      {
        input: "nums = [1,2,3,1]",
        output: "true",
        explanation: "The value 1 appears more than once.",
      },
      {
        input: "nums = [1,2,3,4]",
        output: "false",
        explanation: "Every value is distinct.",
      },
    ],
    hint:
      "If you had a set of values already seen, how quickly could you detect a repeat?",
    solutionSummary:
      "Use a hash set. As you scan nums, if the current number is already in the set, return true. Otherwise insert it and continue.",
    solutions: {
      TypeScript: `function containsDuplicate(nums: number[]): boolean {
  const seen = new Set<number>();

  for (const x of nums) {
    if (seen.has(x)) {
      return true;
    }

    seen.add(x);
  }

  return false;
}`,
      JavaScript: `function containsDuplicate(nums) {
  const seen = new Set();

  for (const x of nums) {
    if (seen.has(x)) {
      return true;
    }

    seen.add(x);
  }

  return false;
}`,
      Python: `def contains_duplicate(nums):
    seen = set()

    for x in nums:
        if x in seen:
            return True
        seen.add(x)

    return False`,
      Java: `import java.util.*;

class Solution {
    public boolean containsDuplicate(int[] nums) {
        Set<Integer> seen = new HashSet<>();

        for (int x : nums) {
            if (seen.contains(x)) {
                return true;
            }

            seen.add(x);
        }

        return false;
    }
}`,
      "C++": `#include <vector>
#include <unordered_set>
using namespace std;

class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        unordered_set<int> seen;

        for (int x : nums) {
            if (seen.count(x)) {
                return true;
            }

            seen.insert(x);
        }

        return false;
    }
};`,
      "C#": `using System.Collections.Generic;

public class Solution {
    public bool ContainsDuplicate(int[] nums) {
        HashSet<int> seen = new HashSet<int>();

        foreach (int x in nums) {
            if (seen.Contains(x)) {
                return true;
            }

            seen.Add(x);
        }

        return false;
    }
}`,
      Go: `func containsDuplicate(nums []int) bool {
    seen := map[int]bool{}

    for _, x := range nums {
        if seen[x] {
            return true
        }

        seen[x] = true
    }

    return false
}`,
      Rust: `use std::collections::HashSet;

impl Solution {
    pub fn contains_duplicate(nums: Vec<i32>) -> bool {
        let mut seen = HashSet::new();

        for x in nums {
            if seen.contains(&x) {
                return true;
            }

            seen.insert(x);
        }

        false
    }
}`,
      Kotlin: `class Solution {
    fun containsDuplicate(nums: IntArray): Boolean {
        val seen = HashSet<Int>()

        for (x in nums) {
            if (seen.contains(x)) {
                return true
            }

            seen.add(x)
        }

        return false
    }
}`,
      Swift: `class Solution {
    func containsDuplicate(_ nums: [Int]) -> Bool {
        var seen = Set<Int>()

        for x in nums {
            if seen.contains(x) {
                return true
            }

            seen.insert(x)
        }

        return false
    }
}`,
    },
  },
  {
    slug: "valid-anagram",
    title: "Valid Anagram",
    difficulty: "Easy",
    category: "Frequency Count",
    shortDescription: "Frequency count character matching.",
    statement:
      "Given two strings s and t, return true if t is an anagram of s, and false otherwise.",
    examples: [
      {
        input: 's = "anagram", t = "nagaram"',
        output: "true",
        explanation: "Every character count matches.",
      },
      {
        input: 's = "rat", t = "car"',
        output: "false",
        explanation: "The counts do not match.",
      },
    ],
    hint:
      "Two strings are anagrams only when every character appears the same number of times in both strings.",
    solutionSummary:
      "If the lengths differ, return false. Otherwise count the characters from s, then subtract using t. If any count goes negative or a character is missing, return false.",
    solutions: {
      TypeScript: `function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) {
    return false;
  }

  const count = new Map<string, number>();

  for (const ch of s) {
    count.set(ch, (count.get(ch) ?? 0) + 1);
  }

  for (const ch of t) {
    if (!count.has(ch)) {
      return false;
    }

    count.set(ch, count.get(ch)! - 1);

    if (count.get(ch)! < 0) {
      return false;
    }
  }

  return true;
}`,
      JavaScript: `function isAnagram(s, t) {
  if (s.length !== t.length) {
    return false;
  }

  const count = new Map();

  for (const ch of s) {
    count.set(ch, (count.get(ch) || 0) + 1);
  }

  for (const ch of t) {
    if (!count.has(ch)) {
      return false;
    }

    count.set(ch, count.get(ch) - 1);

    if (count.get(ch) < 0) {
      return false;
    }
  }

  return true;
}`,
      Python: `def is_anagram(s, t):
    if len(s) != len(t):
        return False

    count = {}

    for ch in s:
        count[ch] = count.get(ch, 0) + 1

    for ch in t:
        if ch not in count:
            return False

        count[ch] -= 1

        if count[ch] < 0:
            return False

    return True`,
      Java: `import java.util.*;

class Solution {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) {
            return false;
        }

        Map<Character, Integer> count = new HashMap<>();

        for (char ch : s.toCharArray()) {
            count.put(ch, count.getOrDefault(ch, 0) + 1);
        }

        for (char ch : t.toCharArray()) {
            if (!count.containsKey(ch)) {
                return false;
            }

            count.put(ch, count.get(ch) - 1);

            if (count.get(ch) < 0) {
                return false;
            }
        }

        return true;
    }
}`,
      "C++": `#include <string>
#include <unordered_map>
using namespace std;

class Solution {
public:
    bool isAnagram(string s, string t) {
        if (s.size() != t.size()) {
            return false;
        }

        unordered_map<char, int> count;

        for (char ch : s) {
            count[ch]++;
        }

        for (char ch : t) {
            if (!count.count(ch)) {
                return false;
            }

            count[ch]--;

            if (count[ch] < 0) {
                return false;
            }
        }

        return true;
    }
};`,
      "C#": `using System.Collections.Generic;

public class Solution {
    public bool IsAnagram(string s, string t) {
        if (s.Length != t.Length) {
            return false;
        }

        Dictionary<char, int> count = new Dictionary<char, int>();

        foreach (char ch in s) {
            if (!count.ContainsKey(ch)) {
                count[ch] = 0;
            }

            count[ch]++;
        }

        foreach (char ch in t) {
            if (!count.ContainsKey(ch)) {
                return false;
            }

            count[ch]--;

            if (count[ch] < 0) {
                return false;
            }
        }

        return true;
    }
}`,
      Go: `func isAnagram(s string, t string) bool {
    if len(s) != len(t) {
        return false
    }

    count := map[rune]int{}

    for _, ch := range s {
        count[ch]++
    }

    for _, ch := range t {
        if _, ok := count[ch]; !ok {
            return false
        }

        count[ch]--

        if count[ch] < 0 {
            return false
        }
    }

    return true
}`,
      Rust: `use std::collections::HashMap;

impl Solution {
    pub fn is_anagram(s: String, t: String) -> bool {
        if s.len() != t.len() {
            return false;
        }

        let mut count: HashMap<char, i32> = HashMap::new();

        for ch in s.chars() {
            *count.entry(ch).or_insert(0) += 1;
        }

        for ch in t.chars() {
            if let Some(v) = count.get_mut(&ch) {
                *v -= 1;

                if *v < 0 {
                    return false;
                }
            } else {
                return false;
            }
        }

        true
    }
}`,
      Kotlin: `class Solution {
    fun isAnagram(s: String, t: String): Boolean {
        if (s.length != t.length) {
            return false
        }

        val count = HashMap<Char, Int>()

        for (ch in s) {
            count[ch] = (count[ch] ?: 0) + 1
        }

        for (ch in t) {
            if (!count.containsKey(ch)) {
                return false
            }

            count[ch] = count[ch]!! - 1

            if (count[ch]!! < 0) {
                return false
            }
        }

        return true
    }
}`,
      Swift: `class Solution {
    func isAnagram(_ s: String, _ t: String) -> Bool {
        if s.count != t.count {
            return false
        }

        var count: [Character: Int] = [:]

        for ch in s {
            count[ch, default: 0] += 1
        }

        for ch in t {
            guard let value = count[ch] else {
                return false
            }

            count[ch] = value - 1

            if count[ch]! < 0 {
                return false
            }
        }

        return true
    }
}`,
    },
  },
];

function PracticeCard({ problem }: { problem: Problem }) {
  const [open, setOpen] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("TypeScript");
  const [answer, setAnswer] = useState("");

  return (
    <div className="border border-border bg-card/40">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full px-5 py-5 text-left transition-colors hover:bg-primary/5 md:px-6"
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <div className="text-2xl font-bold text-foreground">{problem.title}</div>
            <div className="max-w-4xl text-base leading-8 text-muted-foreground">
              {problem.shortDescription}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <span
              className={`border px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] ${difficultyClasses(
                problem.difficulty
              )}`}
            >
              {problem.difficulty}
            </span>

            <span className="border border-border bg-terminal-cyan/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-terminal-cyan">
              {problem.category}
            </span>

            <span className="border border-border px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-foreground">
              {open ? "Close" : "Open"}
            </span>
          </div>
        </div>
      </button>

      {open && (
        <div className="border-t border-border px-5 py-5 md:px-6 md:py-6">
          <div className="space-y-5">
            <div className="border border-border bg-background/50 p-5">
              <div className="mb-3 text-xs uppercase tracking-[0.28em] text-muted-foreground">
                Problem
              </div>
              <p className="text-base leading-8 text-muted-foreground">{problem.statement}</p>
            </div>

            <div className="grid gap-4">
              {problem.examples.map((example, index) => (
                <div key={index} className="border border-border bg-background/50 p-5">
                  <div className="mb-3 text-xs uppercase tracking-[0.28em] text-muted-foreground">
                    Example {index + 1}
                  </div>

                  <div className="space-y-2 text-sm leading-7 text-muted-foreground">
                    <div>
                      <span className="font-bold text-foreground">Input:</span> {example.input}
                    </div>
                    <div>
                      <span className="font-bold text-foreground">Output:</span> {example.output}
                    </div>
                    <div>
                      <span className="font-bold text-foreground">Explanation:</span>{" "}
                      {example.explanation}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border border-border bg-background/50 p-5">
              <div className="mb-3 text-xs uppercase tracking-[0.28em] text-muted-foreground">
                Your Answer / Approach
              </div>

              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Write how you would solve it before checking the solution..."
                className="min-h-[180px] w-full resize-y border border-border bg-card/40 px-4 py-4 text-sm leading-7 text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary"
              />

              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setShowHint((prev) => !prev)}
                  className="border border-terminal-cyan bg-terminal-cyan/10 px-4 py-3 text-xs font-bold uppercase tracking-[0.18em] text-terminal-cyan transition-colors hover:bg-terminal-cyan/20"
                >
                  {showHint ? "Hide Hint" : "Show Hint"}
                </button>

                <button
                  type="button"
                  onClick={() => setShowSolution((prev) => !prev)}
                  className="border border-primary bg-primary/10 px-4 py-3 text-xs font-bold uppercase tracking-[0.18em] text-primary transition-colors hover:bg-primary/20"
                >
                  {showSolution ? "Hide Solution" : "Show Solution"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setAnswer("");
                    setShowHint(false);
                    setShowSolution(false);
                    setSelectedLanguage("TypeScript");
                  }}
                  className="border border-border px-4 py-3 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
                >
                  Reset
                </button>
              </div>
            </div>

            {showHint && (
              <div className="border border-terminal-cyan bg-terminal-cyan/10 p-5">
                <div className="mb-3 text-xs uppercase tracking-[0.28em] text-terminal-cyan">
                  Hint
                </div>
                <p className="text-base leading-8 text-muted-foreground">{problem.hint}</p>
              </div>
            )}

            {showSolution && (
              <div className="space-y-4 border border-primary/40 bg-primary/5 p-5">
                <div>
                  <div className="text-2xl font-bold text-primary">Solution</div>
                  <p className="mt-2 text-base leading-8 text-muted-foreground">
                    {problem.solutionSummary}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  {LANGUAGES.map((language) => (
                    <button
                      key={language}
                      type="button"
                      onClick={() => setSelectedLanguage(language)}
                      className={`border px-4 py-3 text-xs font-bold uppercase tracking-[0.16em] transition-colors ${
                        selectedLanguage === language
                          ? "border-primary bg-primary text-black"
                          : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                      }`}
                    >
                      {language}
                    </button>
                  ))}
                </div>

                <div className="border border-border bg-background/70 p-5">
                  <div className="mb-3 text-xs uppercase tracking-[0.28em] text-muted-foreground">
                    {selectedLanguage} Solution
                  </div>

                  <pre className="overflow-x-auto whitespace-pre-wrap text-sm leading-7 text-foreground">
{problem.solutions[selectedLanguage]}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ArraysHashingPractice() {
  return (
    <div className="space-y-4">
      <div className="border border-border bg-card/40 p-5 md:p-6">
        <div className="text-sm leading-8 text-muted-foreground">
          Click a problem to open it. Try solving it yourself first, write your approach,
          then use <span className="text-terminal-cyan">Show Hint</span> or{" "}
          <span className="text-primary">Show Solution</span> only if you get stuck.
        </div>
      </div>

      {PROBLEMS.map((problem) => (
        <PracticeCard key={problem.slug} problem={problem} />
      ))}
    </div>
  );
}
