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
