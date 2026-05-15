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
