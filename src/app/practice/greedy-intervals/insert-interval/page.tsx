"use client";

import SimpleJsPracticePage, {
  type ExecuteResult,
  type PracticeTestCase,
} from "../../../components/practice/SimpleJsPracticePage";

type InsertInput = {
  intervals: number[][];
  newInterval: number[];
};

const STARTER_JS = `function insert(intervals, newInterval) {
  // Insert and merge the new interval.
  return [];
}`;

const SOLUTION_JS = `function insert(intervals, newInterval) {
  const result = [];
  let i = 0;

  while (i < intervals.length && intervals[i][1] < newInterval[0]) {
    result.push([...intervals[i]]);
    i++;
  }

  let merged = [...newInterval];

  while (i < intervals.length && intervals[i][0] <= merged[1]) {
    merged[0] = Math.min(merged[0], intervals[i][0]);
    merged[1] = Math.max(merged[1], intervals[i][1]);
    i++;
  }

  result.push(merged);

  while (i < intervals.length) {
    result.push([...intervals[i]]);
    i++;
  }

  return result;
}`;


const STARTER_CODE_BY_LANGUAGE = {
  javascript: STARTER_JS,
  python: `class Solution:
    def insert(self, intervals: List[List[int]], newInterval: List[int]) -> List[List[int]]:
        # Insert and merge the new interval.
        return []`,
  java: `class Solution {
    public int[][] insert(int[][] intervals, int[] newInterval) {
        // Insert and merge the new interval.
        return new int[][] {};
    }
}`,
  cpp: `class Solution {
public:
    vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval) {
        // Insert and merge the new interval.
        return {};
    }
};`,
  typescript: `function insert(intervals: number[][], newInterval: number[]): number[][] {
  // Insert and merge the new interval.
  return [];
}`,
  go: `func insert(intervals [][]int, newInterval []int) [][]int {
    // Insert and merge the new interval.
    return [][]int{}
}`,
  csharp: `public class Solution {
    public int[][] Insert(int[][] intervals, int[] newInterval) {
        // Insert and merge the new interval.
        return new int[][] {};
    }
}`,
  rust: `impl Solution {
    pub fn insert(intervals: Vec<Vec<i32>>, new_interval: Vec<i32>) -> Vec<Vec<i32>> {
        // Insert and merge the new interval.
        vec![]
    }
}`,
};

const SOLUTION_CODE_BY_LANGUAGE = {
  javascript: SOLUTION_JS,
  python: `class Solution:
    def insert(self, intervals: List[List[int]], newInterval: List[int]) -> List[List[int]]:
        result = []
        i = 0

        while i < len(intervals) and intervals[i][1] < newInterval[0]:
            result.append(intervals[i])
            i += 1

        merged = newInterval[:]

        while i < len(intervals) and intervals[i][0] <= merged[1]:
            merged[0] = min(merged[0], intervals[i][0])
            merged[1] = max(merged[1], intervals[i][1])
            i += 1

        result.append(merged)

        while i < len(intervals):
            result.append(intervals[i])
            i += 1

        return result`,
  java: `class Solution {
    public int[][] insert(int[][] intervals, int[] newInterval) {
        List<int[]> result = new ArrayList<>();
        int i = 0;

        while (i < intervals.length && intervals[i][1] < newInterval[0]) {
            result.add(intervals[i]);
            i++;
        }

        int[] merged = new int[] { newInterval[0], newInterval[1] };

        while (i < intervals.length && intervals[i][0] <= merged[1]) {
            merged[0] = Math.min(merged[0], intervals[i][0]);
            merged[1] = Math.max(merged[1], intervals[i][1]);
            i++;
        }

        result.add(merged);

        while (i < intervals.length) {
            result.add(intervals[i]);
            i++;
        }

        return result.toArray(new int[result.size()][]);
    }
}`,
  cpp: `class Solution {
public:
    vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval) {
        vector<vector<int>> result;
        int i = 0;

        while (i < intervals.size() && intervals[i][1] < newInterval[0]) {
            result.push_back(intervals[i]);
            i++;
        }

        vector<int> merged = newInterval;

        while (i < intervals.size() && intervals[i][0] <= merged[1]) {
            merged[0] = min(merged[0], intervals[i][0]);
            merged[1] = max(merged[1], intervals[i][1]);
            i++;
        }

        result.push_back(merged);

        while (i < intervals.size()) {
            result.push_back(intervals[i]);
            i++;
        }

        return result;
    }
};`,
  typescript: `function insert(intervals: number[][], newInterval: number[]): number[][] {
  const result: number[][] = [];
  let i = 0;

  while (i < intervals.length && intervals[i][1] < newInterval[0]) {
    result.push([...intervals[i]]);
    i++;
  }

  const merged = [...newInterval];

  while (i < intervals.length && intervals[i][0] <= merged[1]) {
    merged[0] = Math.min(merged[0], intervals[i][0]);
    merged[1] = Math.max(merged[1], intervals[i][1]);
    i++;
  }

  result.push(merged);

  while (i < intervals.length) {
    result.push([...intervals[i]]);
    i++;
  }

  return result;
}`,
  go: `func insert(intervals [][]int, newInterval []int) [][]int {
    result := [][]int{}
    i := 0

    for i < len(intervals) && intervals[i][1] < newInterval[0] {
        result = append(result, intervals[i])
        i++
    }

    merged := []int{newInterval[0], newInterval[1]}

    for i < len(intervals) && intervals[i][0] <= merged[1] {
        if intervals[i][0] < merged[0] {
            merged[0] = intervals[i][0]
        }

        if intervals[i][1] > merged[1] {
            merged[1] = intervals[i][1]
        }

        i++
    }

    result = append(result, merged)

    for i < len(intervals) {
        result = append(result, intervals[i])
        i++
    }

    return result
}`,
  csharp: `public class Solution {
    public int[][] Insert(int[][] intervals, int[] newInterval) {
        List<int[]> result = new List<int[]>();
        int i = 0;

        while (i < intervals.Length && intervals[i][1] < newInterval[0]) {
            result.Add(intervals[i]);
            i++;
        }

        int[] merged = new int[] { newInterval[0], newInterval[1] };

        while (i < intervals.Length && intervals[i][0] <= merged[1]) {
            merged[0] = Math.Min(merged[0], intervals[i][0]);
            merged[1] = Math.Max(merged[1], intervals[i][1]);
            i++;
        }

        result.Add(merged);

        while (i < intervals.Length) {
            result.Add(intervals[i]);
            i++;
        }

        return result.ToArray();
    }
}`,
  rust: `impl Solution {
    pub fn insert(intervals: Vec<Vec<i32>>, new_interval: Vec<i32>) -> Vec<Vec<i32>> {
        let mut result: Vec<Vec<i32>> = Vec::new();
        let mut i = 0;

        while i < intervals.len() && intervals[i][1] < new_interval[0] {
            result.push(intervals[i].clone());
            i += 1;
        }

        let mut merged = new_interval.clone();

        while i < intervals.len() && intervals[i][0] <= merged[1] {
            merged[0] = merged[0].min(intervals[i][0]);
            merged[1] = merged[1].max(intervals[i][1]);
            i += 1;
        }

        result.push(merged);

        while i < intervals.len() {
            result.push(intervals[i].clone());
            i += 1;
        }

        result
    }
}`,
};

const TEST_CASES: PracticeTestCase<InsertInput>[] = [
  {
    id: 1,
    displayLines: ['intervals: [[1,3],[6,9]]', 'newInterval: [2,5]'],
    input: { intervals: [[1,3],[6,9]], newInterval: [2,5] },
    expectedSummary: '[[1,5],[6,9]]',
  },
  {
    id: 2,
    displayLines: ['intervals: [[1,2],[3,5],[6,7],[8,10],[12,16]]', 'newInterval: [4,8]'],
    input: { intervals: [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval: [4,8] },
    expectedSummary: '[[1,2],[3,10],[12,16]]',
  },
  {
    id: 3,
    displayLines: ['intervals: []', 'newInterval: [5,7]'],
    input: { intervals: [], newInterval: [5,7] },
    expectedSummary: '[[5,7]]',
  },
  {
    id: 4,
    displayLines: ['intervals: [[1,5]]', 'newInterval: [2,3]'],
    input: { intervals: [[1,5]], newInterval: [2,3] },
    expectedSummary: '[[1,5]]',
  },
];

function cloneInput(value: InsertInput) {
  return {
    intervals: value.intervals.map((item) => [...item]),
    newInterval: [...value.newInterval],
  };
}

function executeCase(code: string, testCase: PracticeTestCase<InsertInput>): ExecuteResult {
  try {
    const fn = new Function(`
      "use strict";
      ${code}
      return insert;
    `)();

    if (typeof fn !== "function") {
      return {
        pass: false,
        actualSummary: "missing function",
        error: "insert function was not found.",
      };
    }

    const input = cloneInput(testCase.input);
    const actual = fn(input.intervals, input.newInterval);
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

export default function InsertIntervalPracticePage() {
  return (
    <SimpleJsPracticePage
      title="Insert Interval"
      difficultyLabel="MED"
      difficultyClassName="border-yellow-400 text-yellow-400"
      tags={["GREEDY", "INTERVALS"]}
      lessonHref="/learn/greedy-intervals"
      description="Place the new interval in order, merge the overlap window, then append the rest."
      starterJavaScript={STARTER_JS}
      solutionJavaScript={SOLUTION_JS}
      starterCodeByLanguage={STARTER_CODE_BY_LANGUAGE}
      solutionCodeByLanguage={SOLUTION_CODE_BY_LANGUAGE}
      infoSections={[
        {
          title: "DESCRIPTION",
          bodyLines: [
            "You are given a sorted non-overlapping interval list and one new interval.",
            "Insert the new interval in the right place and merge where necessary.",
          ],
        },
        {
          title: "PATTERN",
          bodyLines: [
            "Push all intervals that end before the new interval starts.",
            "Merge every interval that overlaps the new interval.",
            "Push the merged block, then append the remaining intervals.",
          ],
        },
      ]}
      testCases={TEST_CASES}
      executeCase={executeCase}
      resultMetaLines={[
        "Expected approach: one pass over sorted intervals",
        "Time: O(n)",
        "Space: O(n) output",
      ]}
    />
  );
}
