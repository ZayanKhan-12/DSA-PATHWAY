"use client";

import SimpleJsPracticePage, {
  type ExecuteResult,
  type PracticeTestCase,
} from "../../../components/practice/SimpleJsPracticePage";

type IntervalsInput = number[][];

const STARTER_JS = `function merge(intervals) {
  // Merge all overlapping intervals.
  return [];
}`;

const SOLUTION_JS = `function merge(intervals) {
  if (intervals.length === 0) {
    return [];
  }

  intervals.sort((a, b) => a[0] - b[0]);

  const merged = [[...intervals[0]]];

  for (let i = 1; i < intervals.length; i++) {
    const current = intervals[i];
    const last = merged[merged.length - 1];

    if (current[0] <= last[1]) {
      last[1] = Math.max(last[1], current[1]);
    } else {
      merged.push([...current]);
    }
  }

  return merged;
}`;


const STARTER_CODE_BY_LANGUAGE = {
  javascript: STARTER_JS,
  python: `class Solution:
    def merge(self, intervals: List[List[int]]) -> List[List[int]]:
        # Merge all overlapping intervals.
        return []`,
  java: `class Solution {
    public int[][] merge(int[][] intervals) {
        // Merge all overlapping intervals.
        return new int[][] {};
    }
}`,
  cpp: `class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        // Merge all overlapping intervals.
        return {};
    }
};`,
  typescript: `function merge(intervals: number[][]): number[][] {
  // Merge all overlapping intervals.
  return [];
}`,
  go: `func merge(intervals [][]int) [][]int {
    // Merge all overlapping intervals.
    return [][]int{}
}`,
  csharp: `public class Solution {
    public int[][] Merge(int[][] intervals) {
        // Merge all overlapping intervals.
        return new int[][] {};
    }
}`,
  rust: `impl Solution {
    pub fn merge(intervals: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
        // Merge all overlapping intervals.
        vec![]
    }
}`,
};

const SOLUTION_CODE_BY_LANGUAGE = {
  javascript: SOLUTION_JS,
  python: `class Solution:
    def merge(self, intervals: List[List[int]]) -> List[List[int]]:
        if not intervals:
            return []

        intervals.sort(key=lambda interval: interval[0])

        merged = [intervals[0]]

        for start, end in intervals[1:]:
            last = merged[-1]

            if start <= last[1]:
                last[1] = max(last[1], end)
            else:
                merged.append([start, end])

        return merged`,
  java: `class Solution {
    public int[][] merge(int[][] intervals) {
        if (intervals.length == 0) {
            return new int[][] {};
        }

        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));

        List<int[]> merged = new ArrayList<>();

        for (int[] interval : intervals) {
            if (merged.isEmpty() || interval[0] > merged.get(merged.size() - 1)[1]) {
                merged.add(interval);
            } else {
                int[] last = merged.get(merged.size() - 1);
                last[1] = Math.max(last[1], interval[1]);
            }
        }

        return merged.toArray(new int[merged.size()][]);
    }
}`,
  cpp: `class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        if (intervals.empty()) {
            return {};
        }

        sort(intervals.begin(), intervals.end());

        vector<vector<int>> merged;

        for (auto& interval : intervals) {
            if (merged.empty() || interval[0] > merged.back()[1]) {
                merged.push_back(interval);
            } else {
                merged.back()[1] = max(merged.back()[1], interval[1]);
            }
        }

        return merged;
    }
};`,
  typescript: `function merge(intervals: number[][]): number[][] {
  if (intervals.length === 0) {
    return [];
  }

  intervals.sort((a, b) => a[0] - b[0]);

  const merged: number[][] = [[...intervals[0]]];

  for (let i = 1; i < intervals.length; i++) {
    const current = intervals[i];
    const last = merged[merged.length - 1];

    if (current[0] <= last[1]) {
      last[1] = Math.max(last[1], current[1]);
    } else {
      merged.push([...current]);
    }
  }

  return merged;
}`,
  go: `func merge(intervals [][]int) [][]int {
    if len(intervals) == 0 {
        return [][]int{}
    }

    sort.Slice(intervals, func(i int, j int) bool {
        return intervals[i][0] < intervals[j][0]
    })

    merged := [][]int{intervals[0]}

    for i := 1; i < len(intervals); i++ {
        current := intervals[i]
        last := merged[len(merged) - 1]

        if current[0] <= last[1] {
            if current[1] > last[1] {
                last[1] = current[1]
            }
        } else {
            merged = append(merged, current)
        }
    }

    return merged
}`,
  csharp: `public class Solution {
    public int[][] Merge(int[][] intervals) {
        if (intervals.Length == 0) {
            return new int[][] {};
        }

        Array.Sort(intervals, (a, b) => a[0].CompareTo(b[0]));

        List<int[]> merged = new List<int[]>();

        foreach (int[] interval in intervals) {
            if (merged.Count == 0 || interval[0] > merged[merged.Count - 1][1]) {
                merged.Add(interval);
            } else {
                int[] last = merged[merged.Count - 1];
                last[1] = Math.Max(last[1], interval[1]);
            }
        }

        return merged.ToArray();
    }
}`,
  rust: `impl Solution {
    pub fn merge(mut intervals: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
        if intervals.is_empty() {
            return vec![];
        }

        intervals.sort_by_key(|interval| interval[0]);

        let mut merged: Vec<Vec<i32>> = Vec::new();

        for interval in intervals {
            if merged.is_empty() || interval[0] > merged.last().unwrap()[1] {
                merged.push(interval);
            } else {
                let last_index = merged.len() - 1;
                merged[last_index][1] = merged[last_index][1].max(interval[1]);
            }
        }

        merged
    }
}`,
};

const TEST_CASES: PracticeTestCase<IntervalsInput>[] = [
  {
    id: 1,
    displayLines: ['intervals: [[1,3],[2,6],[8,10],[15,18]]'],
    input: [[1,3],[2,6],[8,10],[15,18]],
    expectedSummary: '[[1,6],[8,10],[15,18]]',
  },
  {
    id: 2,
    displayLines: ['intervals: [[1,4],[4,5]]'],
    input: [[1,4],[4,5]],
    expectedSummary: '[[1,5]]',
  },
  {
    id: 3,
    displayLines: ['intervals: [[1,4],[0,2],[3,5]]'],
    input: [[1,4],[0,2],[3,5]],
    expectedSummary: '[[0,5]]',
  },
  {
    id: 4,
    displayLines: ['intervals: [[1,4],[5,6]]'],
    input: [[1,4],[5,6]],
    expectedSummary: '[[1,4],[5,6]]',
  },
];

function cloneIntervals(value: number[][]) {
  return value.map((item) => [...item]);
}

function executeCase(code: string, testCase: PracticeTestCase<IntervalsInput>): ExecuteResult {
  try {
    const fn = new Function(`
      "use strict";
      ${code}
      return merge;
    `)();

    if (typeof fn !== "function") {
      return {
        pass: false,
        actualSummary: "missing function",
        error: "merge function was not found.",
      };
    }

    const actual = fn(cloneIntervals(testCase.input));
    const actualSummary = JSON.stringify(actual);
    return {
      pass: actualSummary === testCase.expectedSummary,
      actualSummary,
    };
  } catch (error) {
    return {
      pass: false,
      actualSummary: "runtime error",
      error: error instanceof Error ? error.message : "Unknown runtime error.",
    };
  }
}

export default function MergeIntervalsPracticePage() {
  return (
    <SimpleJsPracticePage
      title="Merge Intervals"
      difficultyLabel="MED"
      difficultyClassName="border-yellow-400 text-yellow-400"
      tags={["GREEDY", "INTERVALS"]}
      lessonHref="/learn/greedy-intervals"
      description="Sort by start time, then grow or flush the current merged interval."
      starterJavaScript={STARTER_JS}
      solutionJavaScript={SOLUTION_JS}
      starterCodeByLanguage={STARTER_CODE_BY_LANGUAGE}
      solutionCodeByLanguage={SOLUTION_CODE_BY_LANGUAGE}
      infoSections={[
        {
          title: "DESCRIPTION",
          bodyLines: [
            "Given a collection of intervals, merge every overlapping pair and return the compressed result.",
            "The key move is sorting first, so you only compare the current interval against the last merged one.",
          ],
        },
        {
          title: "PATTERN",
          bodyLines: [
            "Sort intervals by start.",
            "If the next interval overlaps the last merged interval, extend the end.",
            "Otherwise start a brand new merged interval.",
          ],
        },
      ]}
      testCases={TEST_CASES}
      executeCase={executeCase}
      resultMetaLines={[
        "Expected approach: sort + linear scan",
        "Time: O(n log n)",
        "Space: O(n) output",
      ]}
    />
  );
}
