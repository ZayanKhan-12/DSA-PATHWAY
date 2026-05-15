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


const STARTER_CODE_BY_LANGUAGE = {
  javascript: STARTER_JS,
  python: `class Solution:
    def solveMeetingRooms(self, intervals: List[List[int]]) -> dict:
        # Return:
        # { "canAttendAll": bool, "minRooms": int }
        return { "canAttendAll": True, "minRooms": 0 }`,
  java: `class Solution {
    public Map<String, Object> solveMeetingRooms(int[][] intervals) {
        // Return:
        // { "canAttendAll": Boolean, "minRooms": Integer }
        Map<String, Object> result = new HashMap<>();
        result.put("canAttendAll", true);
        result.put("minRooms", 0);
        return result;
    }
}`,
  cpp: `class Solution {
public:
    pair<bool, int> solveMeetingRooms(vector<vector<int>>& intervals) {
        // Return {canAttendAll, minRooms}
        return {true, 0};
    }
};`,
  typescript: `type MeetingRoomsResult = {
  canAttendAll: boolean;
  minRooms: number;
};

function solveMeetingRooms(intervals: number[][]): MeetingRoomsResult {
  // Return whether one person can attend all meetings
  // and the minimum number of rooms required.
  return { canAttendAll: true, minRooms: 0 };
}`,
  go: `type MeetingRoomsResult struct {
    CanAttendAll bool
    MinRooms int
}

func solveMeetingRooms(intervals [][]int) MeetingRoomsResult {
    // Return whether one person can attend all meetings
    // and the minimum number of rooms required.
    return MeetingRoomsResult{CanAttendAll: true, MinRooms: 0}
}`,
  csharp: `public class MeetingRoomsResult {
    public bool CanAttendAll { get; set; }
    public int MinRooms { get; set; }
}

public class Solution {
    public MeetingRoomsResult SolveMeetingRooms(int[][] intervals) {
        // Return whether one person can attend all meetings
        // and the minimum number of rooms required.
        return new MeetingRoomsResult {
            CanAttendAll = true,
            MinRooms = 0
        };
    }
}`,
  rust: `pub struct MeetingRoomsResult {
    pub can_attend_all: bool,
    pub min_rooms: i32,
}

impl Solution {
    pub fn solve_meeting_rooms(intervals: Vec<Vec<i32>>) -> MeetingRoomsResult {
        // Return whether one person can attend all meetings
        // and the minimum number of rooms required.
        MeetingRoomsResult {
            can_attend_all: true,
            min_rooms: 0,
        }
    }
}`,
};

const SOLUTION_CODE_BY_LANGUAGE = {
  javascript: SOLUTION_JS,
  python: `class Solution:
    def solveMeetingRooms(self, intervals: List[List[int]]) -> dict:
        if not intervals:
            return { "canAttendAll": True, "minRooms": 0 }

        sorted_intervals = sorted(intervals, key=lambda interval: interval[0])

        can_attend_all = True

        for i in range(1, len(sorted_intervals)):
            if sorted_intervals[i][0] < sorted_intervals[i - 1][1]:
                can_attend_all = False
                break

        starts = sorted(interval[0] for interval in intervals)
        ends = sorted(interval[1] for interval in intervals)

        start_index = 0
        end_index = 0
        rooms_in_use = 0
        max_rooms = 0

        while start_index < len(starts):
            if starts[start_index] < ends[end_index]:
                rooms_in_use += 1
                max_rooms = max(max_rooms, rooms_in_use)
                start_index += 1
            else:
                rooms_in_use -= 1
                end_index += 1

        return {
            "canAttendAll": can_attend_all,
            "minRooms": max_rooms
        }`,
  java: `class Solution {
    public Map<String, Object> solveMeetingRooms(int[][] intervals) {
        Map<String, Object> result = new HashMap<>();

        if (intervals.length == 0) {
            result.put("canAttendAll", true);
            result.put("minRooms", 0);
            return result;
        }

        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));

        boolean canAttendAll = true;

        for (int i = 1; i < intervals.length; i++) {
            if (intervals[i][0] < intervals[i - 1][1]) {
                canAttendAll = false;
                break;
            }
        }

        int[] starts = new int[intervals.length];
        int[] ends = new int[intervals.length];

        for (int i = 0; i < intervals.length; i++) {
            starts[i] = intervals[i][0];
            ends[i] = intervals[i][1];
        }

        Arrays.sort(starts);
        Arrays.sort(ends);

        int startIndex = 0;
        int endIndex = 0;
        int roomsInUse = 0;
        int maxRooms = 0;

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

        result.put("canAttendAll", canAttendAll);
        result.put("minRooms", maxRooms);
        return result;
    }
}`,
  cpp: `class Solution {
public:
    pair<bool, int> solveMeetingRooms(vector<vector<int>>& intervals) {
        if (intervals.empty()) {
            return {true, 0};
        }

        vector<vector<int>> sortedIntervals = intervals;

        sort(sortedIntervals.begin(), sortedIntervals.end(), [](const vector<int>& a, const vector<int>& b) {
            return a[0] < b[0];
        });

        bool canAttendAll = true;

        for (int i = 1; i < sortedIntervals.size(); i++) {
            if (sortedIntervals[i][0] < sortedIntervals[i - 1][1]) {
                canAttendAll = false;
                break;
            }
        }

        vector<int> starts;
        vector<int> ends;

        for (const auto& interval : intervals) {
            starts.push_back(interval[0]);
            ends.push_back(interval[1]);
        }

        sort(starts.begin(), starts.end());
        sort(ends.begin(), ends.end());

        int startIndex = 0;
        int endIndex = 0;
        int roomsInUse = 0;
        int maxRooms = 0;

        while (startIndex < starts.size()) {
            if (starts[startIndex] < ends[endIndex]) {
                roomsInUse++;
                maxRooms = max(maxRooms, roomsInUse);
                startIndex++;
            } else {
                roomsInUse--;
                endIndex++;
            }
        }

        return {canAttendAll, maxRooms};
    }
};`,
  typescript: `type MeetingRoomsResult = {
  canAttendAll: boolean;
  minRooms: number;
};

function solveMeetingRooms(intervals: number[][]): MeetingRoomsResult {
  if (intervals.length === 0) {
    return { canAttendAll: true, minRooms: 0 };
  }

  const sortedIntervals = intervals
    .map((interval) => [...interval])
    .sort((a, b) => a[0] - b[0]);

  let canAttendAll = true;

  for (let i = 1; i < sortedIntervals.length; i++) {
    if (sortedIntervals[i][0] < sortedIntervals[i - 1][1]) {
      canAttendAll = false;
      break;
    }
  }

  const starts = intervals.map((interval) => interval[0]).sort((a, b) => a - b);
  const ends = intervals.map((interval) => interval[1]).sort((a, b) => a - b);

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
}`,
  go: `type MeetingRoomsResult struct {
    CanAttendAll bool
    MinRooms int
}

func solveMeetingRooms(intervals [][]int) MeetingRoomsResult {
    if len(intervals) == 0 {
        return MeetingRoomsResult{CanAttendAll: true, MinRooms: 0}
    }

    sortedIntervals := make([][]int, len(intervals))

    for i := range intervals {
        sortedIntervals[i] = []int{intervals[i][0], intervals[i][1]}
    }

    sort.Slice(sortedIntervals, func(i int, j int) bool {
        return sortedIntervals[i][0] < sortedIntervals[j][0]
    })

    canAttendAll := true

    for i := 1; i < len(sortedIntervals); i++ {
        if sortedIntervals[i][0] < sortedIntervals[i - 1][1] {
            canAttendAll = false
            break
        }
    }

    starts := make([]int, len(intervals))
    ends := make([]int, len(intervals))

    for i := range intervals {
        starts[i] = intervals[i][0]
        ends[i] = intervals[i][1]
    }

    sort.Ints(starts)
    sort.Ints(ends)

    startIndex := 0
    endIndex := 0
    roomsInUse := 0
    maxRooms := 0

    for startIndex < len(starts) {
        if starts[startIndex] < ends[endIndex] {
            roomsInUse++

            if roomsInUse > maxRooms {
                maxRooms = roomsInUse
            }

            startIndex++
        } else {
            roomsInUse--
            endIndex++
        }
    }

    return MeetingRoomsResult{
        CanAttendAll: canAttendAll,
        MinRooms: maxRooms,
    }
}`,
  csharp: `public class MeetingRoomsResult {
    public bool CanAttendAll { get; set; }
    public int MinRooms { get; set; }
}

public class Solution {
    public MeetingRoomsResult SolveMeetingRooms(int[][] intervals) {
        if (intervals.Length == 0) {
            return new MeetingRoomsResult {
                CanAttendAll = true,
                MinRooms = 0
            };
        }

        int[][] sortedIntervals = intervals
            .Select(interval => new int[] { interval[0], interval[1] })
            .OrderBy(interval => interval[0])
            .ToArray();

        bool canAttendAll = true;

        for (int i = 1; i < sortedIntervals.Length; i++) {
            if (sortedIntervals[i][0] < sortedIntervals[i - 1][1]) {
                canAttendAll = false;
                break;
            }
        }

        int[] starts = intervals.Select(interval => interval[0]).OrderBy(value => value).ToArray();
        int[] ends = intervals.Select(interval => interval[1]).OrderBy(value => value).ToArray();

        int startIndex = 0;
        int endIndex = 0;
        int roomsInUse = 0;
        int maxRooms = 0;

        while (startIndex < starts.Length) {
            if (starts[startIndex] < ends[endIndex]) {
                roomsInUse++;
                maxRooms = Math.Max(maxRooms, roomsInUse);
                startIndex++;
            } else {
                roomsInUse--;
                endIndex++;
            }
        }

        return new MeetingRoomsResult {
            CanAttendAll = canAttendAll,
            MinRooms = maxRooms
        };
    }
}`,
  rust: `pub struct MeetingRoomsResult {
    pub can_attend_all: bool,
    pub min_rooms: i32,
}

impl Solution {
    pub fn solve_meeting_rooms(intervals: Vec<Vec<i32>>) -> MeetingRoomsResult {
        if intervals.is_empty() {
            return MeetingRoomsResult {
                can_attend_all: true,
                min_rooms: 0,
            };
        }

        let mut sorted_intervals = intervals.clone();
        sorted_intervals.sort_by_key(|interval| interval[0]);

        let mut can_attend_all = true;

        for i in 1..sorted_intervals.len() {
            if sorted_intervals[i][0] < sorted_intervals[i - 1][1] {
                can_attend_all = false;
                break;
            }
        }

        let mut starts: Vec<i32> = intervals.iter().map(|interval| interval[0]).collect();
        let mut ends: Vec<i32> = intervals.iter().map(|interval| interval[1]).collect();

        starts.sort();
        ends.sort();

        let mut start_index = 0;
        let mut end_index = 0;
        let mut rooms_in_use = 0;
        let mut max_rooms = 0;

        while start_index < starts.len() {
            if starts[start_index] < ends[end_index] {
                rooms_in_use += 1;
                max_rooms = max_rooms.max(rooms_in_use);
                start_index += 1;
            } else {
                rooms_in_use -= 1;
                end_index += 1;
            }
        }

        MeetingRoomsResult {
            can_attend_all,
            min_rooms: max_rooms,
        }
    }
}`,
};

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
      starterCodeByLanguage={STARTER_CODE_BY_LANGUAGE}
      solutionCodeByLanguage={SOLUTION_CODE_BY_LANGUAGE}
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
