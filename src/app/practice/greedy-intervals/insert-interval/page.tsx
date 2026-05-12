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
