"use client";

import SimpleJsPracticePage, {
  type ExecuteResult,
  type PracticeTestCase,
} from "../../../components/practice/SimpleJsPracticePage";

type MeetingInput = number[][];

const STARTER_JS = `function solveMeetingRooms(intervals) {
  // Return:
  // { canAttendAll: boolean, minRooms: number }
  return { canAttendAll: true, minRooms: 0 };
}`;

const SOLUTION_JS = `function solveMeetingRooms(intervals) {
  if (intervals.length === 0) {
    return { canAttendAll: true, minRooms: 0 };
  }

  const sorted = intervals.map((item) => [...item]).sort((a, b) => a[0] - b[0]);

  let canAttendAll = true;
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i][0] < sorted[i - 1][1]) {
      canAttendAll = false;
      break;
    }
  }

  const starts = sorted.map((item) => item[0]).sort((a, b) => a - b);
  const ends = sorted.map((item) => item[1]).sort((a, b) => a - b);

  let startIndex = 0;
  let endIndex = 0;
  let roomsInUse = 0;
  let maxRooms = 0;

  while (startIndex < starts.length) {
    if (starts[startIndex] < ends[endIndex]) {
      roomsInUse++;
      maxRooms = Math.max(maxRooms, roomsInUse);
      startIndex++;
    } else {
      roomsInUse--;
      endIndex++;
    }
  }

  return {
    canAttendAll,
    minRooms: maxRooms,
  };
}`;

const TEST_CASES: PracticeTestCase<MeetingInput>[] = [
  {
    id: 1,
    displayLines: ['intervals: [[0,30],[5,10],[15,20]]'],
    input: [[0,30],[5,10],[15,20]],
    expectedSummary: '{"canAttendAll":false,"minRooms":2}',
  },
  {
    id: 2,
    displayLines: ['intervals: [[7,10],[2,4]]'],
    input: [[7,10],[2,4]],
    expectedSummary: '{"canAttendAll":true,"minRooms":1}',
  },
  {
    id: 3,
    displayLines: ['intervals: [[1,5],[5,10],[10,15]]'],
    input: [[1,5],[5,10],[10,15]],
    expectedSummary: '{"canAttendAll":true,"minRooms":1}',
  },
  {
    id: 4,
    displayLines: ['intervals: [[1,4],[2,3],[3,6]]'],
    input: [[1,4],[2,3],[3,6]],
    expectedSummary: '{"canAttendAll":false,"minRooms":2}',
  },
];

function cloneIntervals(value: number[][]) {
  return value.map((item) => [...item]);
}

function executeCase(code: string, testCase: PracticeTestCase<MeetingInput>): ExecuteResult {
  try {
    const fn = new Function(`
      "use strict";
      ${code}
      return solveMeetingRooms;
    `)();

    if (typeof fn !== "function") {
      return {
        pass: false,
        actualSummary: "missing function",
        error: "solveMeetingRooms function was not found.",
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

export default function MeetingRoomsPracticePage() {
  return (
    <SimpleJsPracticePage
      title="Meeting Rooms I / II"
      difficultyLabel="MED"
      difficultyClassName="border-yellow-400 text-yellow-400"
      tags={["GREEDY", "INTERVALS"]}
      lessonHref="/learn/greedy-intervals"
      description="One scan checks if all meetings fit one schedule; another sweep-line computes the minimum room count."
      starterJavaScript={STARTER_JS}
      solutionJavaScript={SOLUTION_JS}
      infoSections={[
        {
          title: "DESCRIPTION",
          bodyLines: [
            "This combined page covers both Meeting Rooms I and Meeting Rooms II.",
            "Return whether one person can attend them all and also the minimum number of rooms required.",
          ],
        },
        {
          title: "PATTERN",
          bodyLines: [
            "Sort by start time to detect overlap for Meeting Rooms I.",
            "For Meeting Rooms II, separate starts and ends, then sweep both arrays.",
            "Whenever the next meeting starts before the earliest current end, you need another room.",
          ],
        },
      ]}
      testCases={TEST_CASES}
      executeCase={executeCase}
      resultMetaLines={[
        "Expected approach: sort + overlap check + sweep line",
        "Time: O(n log n)",
        "Space: O(n)",
      ]}
    />
  );
}
