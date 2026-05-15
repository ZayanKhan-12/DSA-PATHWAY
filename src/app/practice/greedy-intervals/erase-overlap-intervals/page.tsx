"use client";

import SimpleJsPracticePage, {
  type ExecuteResult,
  type PracticeTestCase,
} from "../../../components/practice/SimpleJsPracticePage";

type IntervalsInput = number[][];

const STARTER_JS = `function eraseOverlapIntervals(intervals) {
  // Return the minimum number of intervals to remove.
  return 0;
}`;

const SOLUTION_JS = `function eraseOverlapIntervals(intervals) {
  if (intervals.length === 0) {
    return 0;
  }

  intervals.sort((a, b) => a[1] - b[1]);

  let kept = 1;
  let previousEnd = intervals[0][1];

  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] >= previousEnd) {
      kept++;
      previousEnd = intervals[i][1];
    }
  }

  return intervals.length - kept;
}`;


const STARTER_CODE_BY_LANGUAGE = {
  javascript: STARTER_JS,
  python: `class Solution:
    def eraseOverlapIntervals(self, intervals: List[List[int]]) -> int:
        # Return the minimum number of intervals to remove.
        return 0`,
  java: `class Solution {
    public int eraseOverlapIntervals(int[][] intervals) {
        // Return the minimum number of intervals to remove.
        return 0;
    }
}`,
  cpp: `class Solution {
public:
    int eraseOverlapIntervals(vector<vector<int>>& intervals) {
        // Return the minimum number of intervals to remove.
        return 0;
    }
};`,
  typescript: `function eraseOverlapIntervals(intervals: number[][]): number {
  // Return the minimum number of intervals to remove.
  return 0;
}`,
  go: `func eraseOverlapIntervals(intervals [][]int) int {
    // Return the minimum number of intervals to remove.
    return 0
}`,
  csharp: `public class Solution {
    public int EraseOverlapIntervals(int[][] intervals) {
        // Return the minimum number of intervals to remove.
        return 0;
    }
}`,
  rust: `impl Solution {
    pub fn erase_overlap_intervals(intervals: Vec<Vec<i32>>) -> i32 {
        // Return the minimum number of intervals to remove.
        0
    }
}`,
};

const SOLUTION_CODE_BY_LANGUAGE = {
  javascript: SOLUTION_JS,
  python: `class Solution:
    def eraseOverlapIntervals(self, intervals: List[List[int]]) -> int:
        if not intervals:
            return 0

        intervals.sort(key=lambda interval: interval[1])

        kept = 1
        previous_end = intervals[0][1]

        for start, end in intervals[1:]:
            if start >= previous_end:
                kept += 1
                previous_end = end

        return len(intervals) - kept`,
  java: `class Solution {
    public int eraseOverlapIntervals(int[][] intervals) {
        if (intervals.length == 0) {
            return 0;
        }

        Arrays.sort(intervals, (a, b) -> Integer.compare(a[1], b[1]));

        int kept = 1;
        int previousEnd = intervals[0][1];

        for (int i = 1; i < intervals.length; i++) {
            int start = intervals[i][0];
            int end = intervals[i][1];

            if (start >= previousEnd) {
                kept++;
                previousEnd = end;
            }
        }

        return intervals.length - kept;
    }
}`,
  cpp: `class Solution {
public:
    int eraseOverlapIntervals(vector<vector<int>>& intervals) {
        if (intervals.empty()) {
            return 0;
        }

        sort(intervals.begin(), intervals.end(), [](const vector<int>& a, const vector<int>& b) {
            return a[1] < b[1];
        });

        int kept = 1;
        int previousEnd = intervals[0][1];

        for (int i = 1; i < intervals.size(); i++) {
            int start = intervals[i][0];
            int end = intervals[i][1];

            if (start >= previousEnd) {
                kept++;
                previousEnd = end;
            }
        }

        return intervals.size() - kept;
    }
};`,
  typescript: `function eraseOverlapIntervals(intervals: number[][]): number {
  if (intervals.length === 0) {
    return 0;
  }

  intervals.sort((a, b) => a[1] - b[1]);

  let kept = 1;
  let previousEnd = intervals[0][1];

  for (let i = 1; i < intervals.length; i++) {
    const start = intervals[i][0];
    const end = intervals[i][1];

    if (start >= previousEnd) {
      kept++;
      previousEnd = end;
    }
  }

  return intervals.length - kept;
}`,
  go: `func eraseOverlapIntervals(intervals [][]int) int {
    if len(intervals) == 0 {
        return 0
    }

    sort.Slice(intervals, func(i int, j int) bool {
        return intervals[i][1] < intervals[j][1]
    })

    kept := 1
    previousEnd := intervals[0][1]

    for i := 1; i < len(intervals); i++ {
        start := intervals[i][0]
        end := intervals[i][1]

        if start >= previousEnd {
            kept++
            previousEnd = end
        }
    }

    return len(intervals) - kept
}`,
  csharp: `public class Solution {
    public int EraseOverlapIntervals(int[][] intervals) {
        if (intervals.Length == 0) {
            return 0;
        }

        Array.Sort(intervals, (a, b) => a[1].CompareTo(b[1]));

        int kept = 1;
        int previousEnd = intervals[0][1];

        for (int i = 1; i < intervals.Length; i++) {
            int start = intervals[i][0];
            int end = intervals[i][1];

            if (start >= previousEnd) {
                kept++;
                previousEnd = end;
            }
        }

        return intervals.Length - kept;
    }
}`,
  rust: `impl Solution {
    pub fn erase_overlap_intervals(mut intervals: Vec<Vec<i32>>) -> i32 {
        if intervals.is_empty() {
            return 0;
        }

        intervals.sort_by_key(|interval| interval[1]);

        let mut kept = 1;
        let mut previous_end = intervals[0][1];

        for i in 1..intervals.len() {
            let start = intervals[i][0];
            let end = intervals[i][1];

            if start >= previous_end {
                kept += 1;
                previous_end = end;
            }
        }

        intervals.len() as i32 - kept
    }
}`,
};

const TEST_CASES: PracticeTestCase<IntervalsInput>[] = [
  {
    id: 1,
    displayLines: ['intervals: [[1,2],[2,3],[3,4],[1,3]]'],
    input: [[1,2],[2,3],[3,4],[1,3]],
    expectedSummary: '1',
  },
  {
    id: 2,
    displayLines: ['intervals: [[1,2],[1,2],[1,2]]'],
    input: [[1,2],[1,2],[1,2]],
    expectedSummary: '2',
  },
  {
    id: 3,
    displayLines: ['intervals: [[1,2],[2,3]]'],
    input: [[1,2],[2,3]],
    expectedSummary: '0',
  },
  {
    id: 4,
    displayLines: ['intervals: [[1,100],[11,22],[1,11],[2,12]]'],
    input: [[1,100],[11,22],[1,11],[2,12]],
    expectedSummary: '2',
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
      return eraseOverlapIntervals;
    `)();

    if (typeof fn !== "function") {
      return {
        pass: false,
        actualSummary: "missing function",
        error: "eraseOverlapIntervals function was not found.",
      };
    }

    const actual = fn(cloneIntervals(testCase.input));
    const actualSummary = String(actual);

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

export default function EraseOverlapIntervalsPracticePage() {
  return (
    <SimpleJsPracticePage
      title="Erase Overlap Intervals"
      difficultyLabel="MED"
      difficultyClassName="border-yellow-400 text-yellow-400"
      tags={["GREEDY", "INTERVALS"]}
      lessonHref="/learn/greedy-intervals"
      description="Keep the interval that ends earliest so future intervals have the best chance to fit."
      starterJavaScript={STARTER_JS}
      solutionJavaScript={SOLUTION_JS}
      starterCodeByLanguage={STARTER_CODE_BY_LANGUAGE}
      solutionCodeByLanguage={SOLUTION_CODE_BY_LANGUAGE}
      infoSections={[
        {
          title: "DESCRIPTION",
          bodyLines: [
            "Return the minimum number of intervals to remove so that the rest are non-overlapping.",
            "This is the complement of keeping the largest possible non-overlapping set.",
          ],
        },
        {
          title: "PATTERN",
          bodyLines: [
            "Sort by ending time.",
            "Greedily keep an interval only if it starts after or at the previous kept end.",
            "Answer = total intervals - kept intervals.",
          ],
        },
      ]}
      testCases={TEST_CASES}
      executeCase={executeCase}
      resultMetaLines={[
        "Expected approach: earliest-end greedy",
        "Time: O(n log n)",
        "Space: O(1) excluding sort",
      ]}
    />
  );
}
