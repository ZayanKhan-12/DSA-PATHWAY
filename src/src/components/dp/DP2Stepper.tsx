"use client";

import { useEffect, useMemo, useState } from "react";

type ExampleKey = "lcs" | "edit" | "knapsack" | "grid" | "minpath";
type DepKind = "top" | "left" | "diag";

type Dependency = {
  kind: DepKind;
  row: number;
  col: number;
  label: string;
};

type StateRow = {
  label: string;
  value: string;
};

type Frame = {
  step: number;
  action: string;
  explanation: string;
  row: number;
  col: number;
  table: number[][];
  dependencies: Dependency[];
  stateRows: StateRow[];
  resultLines: string[];
  activePseudo: number[];
};

type ExampleConfig = {
  key: ExampleKey;
  pill: string;
  heading: string;
  subheading: string;
  contextRight: string;
  topLabels: string[];
  leftLabels: string[];
  pseudo: string[];
  recurrence: string[];
  frames: Frame[];
};

const SPEEDS = [
  { label: "0.5x", ms: 2200 },
  { label: "1x", ms: 1300 },
  { label: "2x", ms: 750 },
  { label: "4x", ms: 420 },
] as const;

function clone2D(arr: number[][]) {
  return arr.map((row) => [...row]);
}

function cellClass(
  active: boolean,
  depKinds: DepKind[],
  value: number,
  isHeader = false
) {
  if (isHeader) return "border-border bg-background/70 text-muted-foreground";
  if (active) return "border-primary bg-primary/12 text-primary shadow-[0_0_18px_rgba(57,255,20,0.12)]";
  if (depKinds.includes("diag")) return "border-terminal-amber/70 bg-terminal-amber/10 text-terminal-amber";
  if (depKinds.includes("top")) return "border-terminal-cyan/70 bg-terminal-cyan/10 text-terminal-cyan";
  if (depKinds.includes("left")) return "border-terminal-magenta/70 bg-terminal-magenta/10 text-terminal-magenta";
  if (value !== 0) return "border-border bg-background/60 text-foreground";
  return "border-border bg-background/40 text-muted-foreground";
}

function depLabel(kind: DepKind) {
  if (kind === "top") return "TOP";
  if (kind === "left") return "LEFT";
  return "DIAGONAL";
}

function depColor(kind: DepKind) {
  if (kind === "top") return "text-terminal-cyan";
  if (kind === "left") return "text-terminal-magenta";
  return "text-terminal-amber";
}

function buildLCSExample(): ExampleConfig {
  const A = "abcd";
  const B = "ace";
  const m = A.length;
  const n = B.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  const frames: Frame[] = [];

  frames.push({
    step: 1,
    action: "Initialize DP table",
    explanation: `Create a ${(m + 1)} x ${(n + 1)} table of 0s. Row 0 and column 0 mean one string is empty.`,
    row: 0,
    col: 0,
    table: clone2D(dp),
    dependencies: [],
    stateRows: [
      { label: "Cell", value: "(0, 0)" },
      { label: "Chars", value: "∅ vs ∅" },
      { label: "Value", value: "0" },
    ],
    resultLines: ["LCS Length = ?", "Subsequence = pending"],
    activePseudo: [0],
  });

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      frames.push({
        step: frames.length + 1,
        action: `Inspect cell (${i}, ${j})`,
        explanation: `Compare A[${i - 1}] = "${A[i - 1]}" with B[${j - 1}] = "${B[j - 1]}".`,
        row: i,
        col: j,
        table: clone2D(dp),
        dependencies: [
          { kind: "top", row: i - 1, col: j, label: `dp[${i - 1}][${j}]` },
          { kind: "left", row: i, col: j - 1, label: `dp[${i}][${j - 1}]` },
          { kind: "diag", row: i - 1, col: j - 1, label: `dp[${i - 1}][${j - 1}]` },
        ],
        stateRows: [
          { label: "Cell", value: `(${i}, ${j})` },
          { label: "Chars", value: `"${A[i - 1]}" vs "${B[j - 1]}"` },
          { label: "Value", value: String(dp[i][j]) },
        ],
        resultLines: ["LCS Length = ?", "Subsequence = pending"],
        activePseudo: [1, 2, 3],
      });

      if (A[i - 1] === B[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
        frames.push({
          step: frames.length + 1,
          action: `Match at (${i}, ${j})`,
          explanation: `"${A[i - 1]}" == "${B[j - 1]}", so extend the diagonal: dp[${i}][${j}] = dp[${i - 1}][${j - 1}] + 1 = ${dp[i][j]}.`,
          row: i,
          col: j,
          table: clone2D(dp),
          dependencies: [{ kind: "diag", row: i - 1, col: j - 1, label: `dp[${i - 1}][${j - 1}] + 1` }],
          stateRows: [
            { label: "Cell", value: `(${i}, ${j})` },
            { label: "Chars", value: `"${A[i - 1]}" vs "${B[j - 1]}"` },
            { label: "Value", value: String(dp[i][j]) },
          ],
          resultLines: [`LCS Length so far = ${dp[i][j]}`, "Using a diagonal match"],
          activePseudo: [3, 4],
        });
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        frames.push({
          step: frames.length + 1,
          action: `Mismatch at (${i}, ${j})`,
          explanation: `"${A[i - 1]}" != "${B[j - 1]}", so take the better of top (${dp[i - 1][j]}) and left (${dp[i][j - 1]}).`,
          row: i,
          col: j,
          table: clone2D(dp),
          dependencies: [
            { kind: "top", row: i - 1, col: j, label: `dp[${i - 1}][${j}]` },
            { kind: "left", row: i, col: j - 1, label: `dp[${i}][${j - 1}]` },
          ],
          stateRows: [
            { label: "Cell", value: `(${i}, ${j})` },
            { label: "Chars", value: `"${A[i - 1]}" vs "${B[j - 1]}"` },
            { label: "Value", value: String(dp[i][j]) },
          ],
          resultLines: [`LCS Length so far = ${dp[i][j]}`, "Take top or left"],
          activePseudo: [5, 6],
        });
      }
    }
  }

  frames.push({
    step: frames.length + 1,
    action: "Finish LCS",
    explanation: `The final answer is dp[m][n] = dp[${m}][${n}] = ${dp[m][n]}.`,
    row: m,
    col: n,
    table: clone2D(dp),
    dependencies: [],
    stateRows: [
      { label: "Cell", value: `(${m}, ${n})` },
      { label: "Chars", value: `"${A[m - 1]}" vs "${B[n - 1]}"` },
      { label: "Value", value: String(dp[m][n]) },
    ],
    resultLines: [`LCS Length = ${dp[m][n]}`, 'Subsequence = "ac"'],
    activePseudo: [7],
  });

  return {
    key: "lcs",
    pill: "LCS",
    heading: "Longest Common Subsequence",
    subheading: "Classic 2D DP over two strings.",
    contextRight: `Strings: "${A}" and "${B}"`,
    topLabels: ["∅", ...B.split("")],
    leftLabels: ["∅", ...A.split("")],
    pseudo: [
      "make dp table of size (m + 1) x (n + 1)",
      "for i from 1 to m:",
      "  for j from 1 to n:",
      "    if A[i - 1] == B[j - 1]:",
      "      dp[i][j] = dp[i - 1][j - 1] + 1",
      "    else:",
      "      dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])",
      "answer = dp[m][n]",
    ],
    recurrence: [
      "if A[i-1] == B[j-1]:",
      "  dp[i][j] = dp[i-1][j-1] + 1",
      "else:",
      "  dp[i][j] = max(dp[i-1][j], dp[i][j-1])",
    ],
    frames,
  };
}

function buildEditDistanceExample(): ExampleConfig {
  const A = "horse";
  const B = "ros";
  const m = A.length;
  const n = B.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  const frames: Frame[] = [];

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  frames.push({
    step: 1,
    action: "Initialize base cases",
    explanation: "Distance from a prefix to an empty string is the prefix length, so fill row 0 and column 0.",
    row: 0,
    col: 0,
    table: clone2D(dp),
    dependencies: [],
    stateRows: [
      { label: "Cell", value: "(0, 0)" },
      { label: "Chars", value: "∅ vs ∅" },
      { label: "Value", value: "0" },
    ],
    resultLines: ["Edit Distance = ?", "Operations pending"],
    activePseudo: [0],
  });

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (A[i - 1] === B[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
        frames.push({
          step: frames.length + 1,
          action: `Match at (${i}, ${j})`,
          explanation: `"${A[i - 1]}" == "${B[j - 1]}", so no extra edit is needed. Copy the diagonal value.`,
          row: i,
          col: j,
          table: clone2D(dp),
          dependencies: [{ kind: "diag", row: i - 1, col: j - 1, label: "copy diagonal" }],
          stateRows: [
            { label: "Cell", value: `(${i}, ${j})` },
            { label: "Chars", value: `"${A[i - 1]}" vs "${B[j - 1]}"` },
            { label: "Value", value: String(dp[i][j]) },
          ],
          resultLines: [`Distance so far = ${dp[i][j]}`, "No edit added"],
          activePseudo: [1, 2, 3],
        });
      } else {
        const replace = dp[i - 1][j - 1];
        const del = dp[i - 1][j];
        const insert = dp[i][j - 1];
        dp[i][j] = 1 + Math.min(replace, del, insert);

        frames.push({
          step: frames.length + 1,
          action: `Mismatch at (${i}, ${j})`,
          explanation: `"${A[i - 1]}" != "${B[j - 1]}": choose replace (${replace}), delete (${del}), or insert (${insert}), then add 1.`,
          row: i,
          col: j,
          table: clone2D(dp),
          dependencies: [
            { kind: "diag", row: i - 1, col: j - 1, label: "replace" },
            { kind: "top", row: i - 1, col: j, label: "delete" },
            { kind: "left", row: i, col: j - 1, label: "insert" },
          ],
          stateRows: [
            { label: "Cell", value: `(${i}, ${j})` },
            { label: "Chars", value: `"${A[i - 1]}" vs "${B[j - 1]}"` },
            { label: "Value", value: String(dp[i][j]) },
          ],
          resultLines: [`Distance so far = ${dp[i][j]}`, "1 + min(replace, delete, insert)"],
          activePseudo: [4, 5, 6],
        });
      }
    }
  }

  frames.push({
    step: frames.length + 1,
    action: "Finish Edit Distance",
    explanation: `The final answer is dp[${m}][${n}] = ${dp[m][n]}.`,
    row: m,
    col: n,
    table: clone2D(dp),
    dependencies: [],
    stateRows: [
      { label: "Cell", value: `(${m}, ${n})` },
      { label: "Chars", value: `"${A[m - 1]}" vs "${B[n - 1]}"` },
      { label: "Value", value: String(dp[m][n]) },
    ],
    resultLines: [`Edit Distance = ${dp[m][n]}`, "horse -> ros"],
    activePseudo: [7],
  });

  return {
    key: "edit",
    pill: "EDIT DISTANCE",
    heading: "Edit Distance",
    subheading: "Insertion / deletion / replacement DP.",
    contextRight: `Strings: "${A}" and "${B}"`,
    topLabels: ["∅", ...B.split("")],
    leftLabels: ["∅", ...A.split("")],
    pseudo: [
      "initialize row 0 and column 0",
      "if A[i-1] == B[j-1]:",
      "  dp[i][j] = dp[i-1][j-1]",
      "  // no new edit",
      "else:",
      "  dp[i][j] = 1 + min(",
      "    dp[i-1][j-1], dp[i-1][j], dp[i][j-1])",
      "answer = dp[m][n]",
    ],
    recurrence: [
      "if A[i-1] == B[j-1]:",
      "  dp[i][j] = dp[i-1][j-1]",
      "else:",
      "  dp[i][j] = 1 + min(",
      "    dp[i-1][j-1], dp[i-1][j], dp[i][j-1])",
    ],
    frames,
  };
}

function buildKnapsackExample(): ExampleConfig {
  const weights = [1, 3, 4];
  const values = [15, 20, 30];
  const capacity = 4;
  const items = weights.length;
  const dp = Array.from({ length: items + 1 }, () => Array(capacity + 1).fill(0));
  const frames: Frame[] = [];

  frames.push({
    step: 1,
    action: "Initialize knapsack table",
    explanation: "Row 0 means no items available. Column 0 means zero capacity. Those states are all 0.",
    row: 0,
    col: 0,
    table: clone2D(dp),
    dependencies: [],
    stateRows: [
      { label: "Item", value: "0" },
      { label: "Capacity", value: "0" },
      { label: "Value", value: "0" },
    ],
    resultLines: ["Best Value = ?", "Capacity planning pending"],
    activePseudo: [0],
  });

  for (let i = 1; i <= items; i++) {
    for (let c = 1; c <= capacity; c++) {
      const w = weights[i - 1];
      const v = values[i - 1];

      if (w > c) {
        dp[i][c] = dp[i - 1][c];
        frames.push({
          step: frames.length + 1,
          action: `Item ${i} does not fit`,
          explanation: `Weight ${w} exceeds capacity ${c}, so copy the value from the row above.`,
          row: i,
          col: c,
          table: clone2D(dp),
          dependencies: [{ kind: "top", row: i - 1, col: c, label: "skip item" }],
          stateRows: [
            { label: "Item", value: `${i}` },
            { label: "Capacity", value: `${c}` },
            { label: "Value", value: `${dp[i][c]}` },
          ],
          resultLines: [`Best so far = ${dp[i][c]}`, "Forced skip"],
          activePseudo: [1, 2, 3],
        });
      } else {
        const skip = dp[i - 1][c];
        const take = dp[i - 1][c - w] + v;
        dp[i][c] = Math.max(skip, take);

        frames.push({
          step: frames.length + 1,
          action: `Evaluate item ${i} at capacity ${c}`,
          explanation: `Either skip the item (${skip}) or take it (${take} = dp[${i - 1}][${c - w}] + ${v}). Store the better one.`,
          row: i,
          col: c,
          table: clone2D(dp),
          dependencies: [
            { kind: "top", row: i - 1, col: c, label: "skip" },
            { kind: "diag", row: i - 1, col: c - w, label: "take source" },
          ],
          stateRows: [
            { label: "Item", value: `${i}` },
            { label: "Capacity", value: `${c}` },
            { label: "Value", value: `${dp[i][c]}` },
          ],
          resultLines: [`Best so far = ${dp[i][c]}`, "max(skip, take)"],
          activePseudo: [1, 4, 5, 6],
        });
      }
    }
  }

  frames.push({
    step: frames.length + 1,
    action: "Finish Knapsack",
    explanation: `The final answer is dp[${items}][${capacity}] = ${dp[items][capacity]}.`,
    row: items,
    col: capacity,
    table: clone2D(dp),
    dependencies: [],
    stateRows: [
      { label: "Item", value: `${items}` },
      { label: "Capacity", value: `${capacity}` },
      { label: "Value", value: `${dp[items][capacity]}` },
    ],
    resultLines: [`Best Value = ${dp[items][capacity]}`, "Items considered = 3"],
    activePseudo: [7],
  });

  return {
    key: "knapsack",
    pill: "KNAPSACK",
    heading: "0/1 Knapsack",
    subheading: "2D DP over item index and remaining capacity.",
    contextRight: "Weights: [1,3,4], Values: [15,20,30], Capacity: 4",
    topLabels: ["0", "1", "2", "3", "4"],
    leftLabels: ["0", "1", "2", "3"],
    pseudo: [
      "make dp table (items + 1) x (capacity + 1)",
      "for i from 1 to items:",
      "  if weight[i] > cap:",
      "    dp[i][cap] = dp[i-1][cap]",
      "  else:",
      "    dp[i][cap] = max(skip, take)",
      "    take = dp[i-1][cap-weight] + value",
      "answer = dp[items][capacity]",
    ],
    recurrence: [
      "if weight[i] > cap:",
      "  dp[i][cap] = dp[i-1][cap]",
      "else:",
      "  dp[i][cap] = max(",
      "    dp[i-1][cap],",
      "    dp[i-1][cap-weight[i]] + value[i])",
    ],
    frames,
  };
}

function buildGridExample(): ExampleConfig {
  const rows = 3;
  const cols = 4;
  const dp = Array.from({ length: rows }, () => Array(cols).fill(0));
  const frames: Frame[] = [];

  dp[0][0] = 1;
  frames.push({
    step: 1,
    action: "Initialize start cell",
    explanation: "There is exactly one way to stand at the starting cell.",
    row: 0,
    col: 0,
    table: clone2D(dp),
    dependencies: [],
    stateRows: [
      { label: "Row", value: "0" },
      { label: "Col", value: "0" },
      { label: "Ways", value: "1" },
    ],
    resultLines: ["Unique Paths = ?", "Count paths to bottom-right"],
    activePseudo: [0],
  });

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (r === 0 && c === 0) continue;
      const top = r > 0 ? dp[r - 1][c] : 0;
      const left = c > 0 ? dp[r][c - 1] : 0;
      dp[r][c] = top + left;

      frames.push({
        step: frames.length + 1,
        action: `Compute paths to (${r}, ${c})`,
        explanation: `Paths come only from top (${top}) and left (${left}), so dp[${r}][${c}] = ${top} + ${left} = ${dp[r][c]}.`,
        row: r,
        col: c,
        table: clone2D(dp),
        dependencies: [
          ...(r > 0 ? [{ kind: "top" as const, row: r - 1, col: c, label: "top" }] : []),
          ...(c > 0 ? [{ kind: "left" as const, row: r, col: c - 1, label: "left" }] : []),
        ],
        stateRows: [
          { label: "Row", value: `${r}` },
          { label: "Col", value: `${c}` },
          { label: "Ways", value: `${dp[r][c]}` },
        ],
        resultLines: [`Paths so far = ${dp[r][c]}`, "top + left"],
        activePseudo: [1, 2, 3, 4],
      });
    }
  }

  frames.push({
    step: frames.length + 1,
    action: "Finish Grid DP",
    explanation: `The final answer is the bottom-right cell = ${dp[rows - 1][cols - 1]}.`,
    row: rows - 1,
    col: cols - 1,
    table: clone2D(dp),
    dependencies: [],
    stateRows: [
      { label: "Row", value: `${rows - 1}` },
      { label: "Col", value: `${cols - 1}` },
      { label: "Ways", value: `${dp[rows - 1][cols - 1]}` },
    ],
    resultLines: [`Unique Paths = ${dp[rows - 1][cols - 1]}`, "3 x 4 grid"],
    activePseudo: [5],
  });

  return {
    key: "grid",
    pill: "GRID DP",
    heading: "Unique Paths",
    subheading: "Grid DP using top + left transitions.",
    contextRight: "Grid: 3 rows x 4 cols",
    topLabels: ["0", "1", "2", "3"],
    leftLabels: ["0", "1", "2"],
    pseudo: [
      "dp[0][0] = 1",
      "for each cell (r, c):",
      "  top = dp[r-1][c] if exists",
      "  left = dp[r][c-1] if exists",
      "  dp[r][c] = top + left",
      "answer = dp[rows-1][cols-1]",
    ],
    recurrence: [
      "dp[r][c] = top + left",
      "top = dp[r-1][c] if r > 0 else 0",
      "left = dp[r][c-1] if c > 0 else 0",
    ],
    frames,
  };
}

function buildMinPathExample(): ExampleConfig {
  const grid = [
    [1, 3, 1],
    [1, 5, 1],
    [4, 2, 1],
  ];
  const rows = grid.length;
  const cols = grid[0].length;
  const dp = Array.from({ length: rows }, () => Array(cols).fill(0));
  const frames: Frame[] = [];

  dp[0][0] = grid[0][0];
  frames.push({
    step: 1,
    action: "Initialize start cost",
    explanation: `The start cell cost is its own value: ${grid[0][0]}.`,
    row: 0,
    col: 0,
    table: clone2D(dp),
    dependencies: [],
    stateRows: [
      { label: "Cell", value: "(0, 0)" },
      { label: "Grid Value", value: `${grid[0][0]}` },
      { label: "Min Cost", value: `${dp[0][0]}` },
    ],
    resultLines: ["Min Path Sum = ?", "Need bottom-right cost"],
    activePseudo: [0],
  });

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (r === 0 && c === 0) continue;

      if (r === 0) {
        dp[r][c] = dp[r][c - 1] + grid[r][c];
      } else if (c === 0) {
        dp[r][c] = dp[r - 1][c] + grid[r][c];
      } else {
        dp[r][c] = Math.min(dp[r - 1][c], dp[r][c - 1]) + grid[r][c];
      }

      frames.push({
        step: frames.length + 1,
        action: `Compute min cost at (${r}, ${c})`,
        explanation:
          r === 0
            ? `Top row: can only come from the left, so ${dp[r][c - 1]} + ${grid[r][c]} = ${dp[r][c]}.`
            : c === 0
            ? `Left column: can only come from above, so ${dp[r - 1][c]} + ${grid[r][c]} = ${dp[r][c]}.`
            : `Take min(top=${dp[r - 1][c]}, left=${dp[r][c - 1]}) + cell=${grid[r][c]} => ${dp[r][c]}.`,
        row: r,
        col: c,
        table: clone2D(dp),
        dependencies: [
          ...(r > 0 ? [{ kind: "top" as const, row: r - 1, col: c, label: "top" }] : []),
          ...(c > 0 ? [{ kind: "left" as const, row: r, col: c - 1, label: "left" }] : []),
        ],
        stateRows: [
          { label: "Cell", value: `(${r}, ${c})` },
          { label: "Grid Value", value: `${grid[r][c]}` },
          { label: "Min Cost", value: `${dp[r][c]}` },
        ],
        resultLines: [`Min cost so far = ${dp[r][c]}`, "min(top, left) + grid[r][c]"],
        activePseudo: [1, 2, 3, 4, 5],
      });
    }
  }

  frames.push({
    step: frames.length + 1,
    action: "Finish Min Path Sum",
    explanation: `The bottom-right answer is ${dp[rows - 1][cols - 1]}.`,
    row: rows - 1,
    col: cols - 1,
    table: clone2D(dp),
    dependencies: [],
    stateRows: [
      { label: "Cell", value: `(${rows - 1}, ${cols - 1})` },
      { label: "Grid Value", value: `${grid[rows - 1][cols - 1]}` },
      { label: "Min Cost", value: `${dp[rows - 1][cols - 1]}` },
    ],
    resultLines: [`Min Path Sum = ${dp[rows - 1][cols - 1]}`, "Path cost minimized"],
    activePseudo: [6],
  });

  return {
    key: "minpath",
    pill: "MIN PATH SUM",
    heading: "Minimum Path Sum",
    subheading: "Weighted grid DP using min(top, left).",
    contextRight: "Grid: [[1,3,1],[1,5,1],[4,2,1]]",
    topLabels: ["0", "1", "2"],
    leftLabels: ["0", "1", "2"],
    pseudo: [
      "dp[0][0] = grid[0][0]",
      "for each cell:",
      "  if top row: from left only",
      "  if left col: from top only",
      "  else: min(top, left)",
      "  add current grid value",
      "answer = dp[lastRow][lastCol]",
    ],
    recurrence: [
      "dp[r][c] = min(top, left) + grid[r][c]",
      "top row -> left only",
      "left col -> top only",
    ],
    frames,
  };
}

function buildExamples(): Record<ExampleKey, ExampleConfig> {
  return {
    lcs: buildLCSExample(),
    edit: buildEditDistanceExample(),
    knapsack: buildKnapsackExample(),
    grid: buildGridExample(),
    minpath: buildMinPathExample(),
  };
}

function StatCard({
  title,
  value,
  accent = "primary",
}: {
  title: string;
  value: string;
  accent?: "primary" | "cyan" | "amber" | "neutral";
}) {
  const accentClass =
    accent === "cyan"
      ? "text-terminal-cyan"
      : accent === "amber"
      ? "text-terminal-amber"
      : accent === "neutral"
      ? "text-foreground"
      : "text-primary";

  return (
    <div className="border border-border bg-background/55 px-4 py-4">
      <div className="text-[10px] uppercase tracking-[0.34em] text-muted-foreground">{title}</div>
      <div className={`mt-3 text-3xl font-bold ${accentClass}`}>{value}</div>
    </div>
  );
}

function Panel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-border bg-background/45 p-3">
      <div className="text-xs uppercase tracking-[0.34em] text-muted-foreground">{title}</div>
      <div className="mt-3">{children}</div>
    </div>
  );
}

export default function DP2Stepper() {
  const examples = useMemo(() => buildExamples(), []);
  const [activeKey, setActiveKey] = useState<ExampleKey>("lcs");
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState<(typeof SPEEDS)[number]["label"]>("1x");

  const example = examples[activeKey];
  const frames = example.frames;
  const frame = frames[step];
  const progress = ((step + 1) / frames.length) * 100;

  useEffect(() => {
    setStep(0);
    setPlaying(false);
  }, [activeKey]);

  useEffect(() => {
    if (!playing) return;
    const speedMs = SPEEDS.find((s) => s.label === speed)?.ms ?? 1300;

    const id = setInterval(() => {
      setStep((prev) => {
        if (prev >= frames.length - 1) {
          setPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, speedMs);

    return () => clearInterval(id);
  }, [playing, frames.length, speed]);

  const explainDependency = () => {
    if (frame.dependencies.length === 0) {
      return "This state has no incoming dependency highlight yet. It is either a base case or an initialization step.";
    }
    return frame.dependencies
      .map((d) => `${depLabel(d.kind)} uses cell (${d.row}, ${d.col}) via ${d.label}`)
      .join(" • ");
  };

  return (
    <div className="space-y-4">
      <div className="border border-border bg-card/35 p-3.5 md:p-4">
        <div className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
          Example / Problem
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {Object.values(examples).map((ex) => (
            <button
              key={ex.key}
              onClick={() => setActiveKey(ex.key)}
              className={`rounded-full border px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.16em] transition ${
                activeKey === ex.key
                  ? "border-primary bg-primary/12 text-primary shadow-[0_0_16px_rgba(57,255,20,0.10)]"
                  : "border-border bg-background/60 text-muted-foreground hover:border-primary hover:text-primary"
              }`}
            >
              {ex.pill}
            </button>
          ))}
        </div>

        <div className="mt-3 flex flex-col gap-1.5 border-t border-border pt-3 text-sm md:flex-row md:items-center md:justify-between">
          <div className="text-foreground">{example.heading}</div>
          <div className="text-muted-foreground">{example.contextRight}</div>
        </div>
      </div>

      <div className="grid items-start gap-4 xl:grid-cols-[minmax(0,1.85fr)_300px]">
        <section className="border border-border bg-card/35">
          <div className="border-b border-border bg-secondary/55 px-4 py-3 text-sm text-muted-foreground">
            ~/visualize/dp2-{activeKey}.ts — step {step + 1}/{frames.length}
          </div>

          <div className="space-y-3 p-3 md:space-y-3.5 md:p-3.5">
            <div className="grid gap-3 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-3">
                <div className="border border-border bg-background/45 p-3">
                  <div className="text-[10px] uppercase tracking-[0.34em] text-muted-foreground">Action</div>
                  <div className="mt-1.5 text-base font-bold text-foreground md:text-lg">{frame.action}</div>
                </div>

                <div className="border border-border bg-background/45 p-3">
                  <div className="text-[10px] uppercase tracking-[0.34em] text-muted-foreground">Explanation</div>
                  <p className="mt-1.5 text-[13px] leading-5 text-muted-foreground">{frame.explanation}</p>
                </div>
              </div>

              <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
                {frame.stateRows.slice(0, 3).map((row) => (
                  <StatCard
                    key={row.label}
                    title={row.label}
                    value={row.value}
                    accent={row.label.toLowerCase().includes("value") ? "primary" : "neutral"}
                  />
                ))}
              </div>
            </div>

            <div className="border border-border bg-card/25 p-3">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2.5">
                <div className="text-xs uppercase tracking-[0.34em] text-muted-foreground">
                  2D DP Table Visualization
                </div>
                <div className="text-xs text-muted-foreground">{example.subheading}</div>
              </div>

              <div className="grid items-start gap-4 xl:grid-cols-[max-content_minmax(0,1fr)]">
                <div className="inline-block max-w-full overflow-x-auto align-top">
                  <div
                    className="grid min-w-max gap-2"
                    style={{
                      gridTemplateColumns: `42px repeat(${example.topLabels.length}, 42px)`,
                    }}
                  >
                    <div className="flex items-center justify-center text-muted-foreground text-sm">i ↓</div>
                    {example.topLabels.map((label, idx) => (
                      <div
                        key={`top-${idx}`}
                        className={
                          cellClass(false, [], 0, true) +
                          " flex h-10 w-10 items-center justify-center border text-[11px] font-bold"
                        }
                      >
                        {label}
                      </div>
                    ))}

                    {frame.table.map((row, r) => (
                      <div key={r} className="contents">
                        <div
                          className={
                            cellClass(false, [], 0, true) +
                            " flex h-10 w-10 items-center justify-center border text-[11px] font-bold"
                          }
                        >
                          {example.leftLabels[r]}
                        </div>

                        {row.map((val, c) => {
                          const depKinds = frame.dependencies
                            .filter((d) => d.row === r && d.col === c)
                            .map((d) => d.kind);

                          const active = frame.row === r && frame.col === c && !(r === 0 && c === 0 && val === 0);

                          return (
                            <div
                              key={`${r}-${c}`}
                              className={
                                cellClass(active, depKinds, val) +
                                " flex h-10 w-10 items-center justify-center border text-[12px] font-bold"
                              }
                            >
                              {val}
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-3 lg:grid-cols-2">
                  <Panel title="Dependency Inspector">
                    <div className="space-y-2 text-[13px] text-muted-foreground">
                      {frame.dependencies.length === 0 ? (
                        <div>No highlighted dependencies yet.</div>
                      ) : (
                        frame.dependencies.map((d, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <span className={depColor(d.kind)}>{d.kind === "top" ? "↑" : d.kind === "left" ? "←" : "↖"}</span>
                            <div>
                              <span className={`font-bold ${depColor(d.kind)}`}>{depLabel(d.kind)}</span>
                              <span> → cell ({d.row}, {d.col})</span>
                              <div className="text-muted-foreground/80">{d.label}</div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </Panel>

                  <Panel title="Why This Cell Updates">
                    <div className="text-[13px] leading-5 text-muted-foreground">
                      {explainDependency()}
                    </div>
                  </Panel>

                  <Panel title="DP Mode Context">
                    <div className="space-y-2 text-[13px] text-muted-foreground">
                      <div><span className="text-foreground">Problem:</span> {example.heading}</div>
                      <div><span className="text-foreground">View:</span> {example.subheading}</div>
                      <div><span className="text-foreground">Current step:</span> {frame.action}</div>
                    </div>
                  </Panel>

                  <Panel title="Result Snapshot">
                    <div className="space-y-2 text-[13px]">
                      {frame.resultLines.map((line, idx) => (
                        <div
                          key={idx}
                          className={idx === frame.resultLines.length - 1 ? "font-bold text-primary" : "text-foreground"}
                        >
                          {line}
                        </div>
                      ))}
                    </div>
                  </Panel>
                </div>
              </div>
            </div>

            <div className="border border-border bg-background/35 p-3">
              <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      setPlaying(false);
                      setStep((s) => Math.max(0, s - 1));
                    }}
                    disabled={step === 0}
                    className="border border-border bg-background/60 px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-foreground transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    ← PREV
                  </button>

                  <button
                    onClick={() => {
                      setPlaying(false);
                      setStep((s) => Math.min(frames.length - 1, s + 1));
                    }}
                    disabled={step === frames.length - 1}
                    className="border border-primary bg-primary px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    STEP →
                  </button>

                  <button
                    onClick={() => setPlaying((p) => !p)}
                    className="border border-border bg-background/60 px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-foreground transition hover:border-primary hover:text-primary"
                  >
                    {playing ? "PAUSE" : "AUTO PLAY"}
                  </button>

                  <button
                    onClick={() => {
                      setPlaying(false);
                      setStep(0);
                    }}
                    className="border border-border bg-background/60 px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-foreground transition hover:border-primary hover:text-primary"
                  >
                    RESET
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                  <span className="uppercase tracking-[0.25em]">Speed</span>
                  {SPEEDS.map((s) => (
                    <button
                      key={s.label}
                      onClick={() => setSpeed(s.label)}
                      className={`border px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] ${
                        speed === s.label
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-background/55 text-muted-foreground hover:border-primary hover:text-primary"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-2.5">
                <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.28em] text-muted-foreground">
                  <span>Progress</span>
                  <span>{step + 1}/{frames.length}</span>
                </div>

                <div className="h-2 overflow-hidden border border-border bg-background/70">
                  <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <input
                  type="range"
                  min={0}
                  max={frames.length - 1}
                  value={step}
                  onChange={(e) => {
                    setPlaying(false);
                    setStep(Number(e.target.value));
                  }}
                  className="mt-2.5 w-full accent-[rgb(57,255,20)]"
                />
              </div>
            </div>
          </div>
        </section>

        <aside className="space-y-4">
          <div className="border border-border bg-card/35 p-3">
            <div className="flex items-center justify-between">
              <div className="text-xs uppercase tracking-[0.34em] text-muted-foreground">
                Current State
              </div>
              <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Step {step + 1}/{frames.length}
              </div>
            </div>

            <div className="mt-2.5 space-y-2 text-[13px] text-foreground">
              {frame.stateRows.map((row) => (
                <div key={row.label} className="flex items-start justify-between gap-4">
                  <span className="text-muted-foreground">{row.label}:</span>
                  <span className={row.label.toLowerCase().includes("value") ? "font-bold text-primary" : "font-semibold"}>
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-border bg-card/35 p-3">
            <div className="text-xs uppercase tracking-[0.34em] text-muted-foreground">
              Recurrence Rule
            </div>

            <pre className="mt-2.5 overflow-x-auto border border-border bg-background/55 p-2.5 text-[11px] leading-5 text-foreground whitespace-pre-wrap">
{example.recurrence.join("\n")}
            </pre>
          </div>

          <div className="border border-border bg-card/35 p-3">
            <div className="text-xs uppercase tracking-[0.34em] text-muted-foreground">
              Pseudocode
            </div>

            <div className="mt-2.5 space-y-1.5">
              {example.pseudo.map((line, idx) => {
                const active = frame.activePseudo.includes(idx);
                return (
                  <div
                    key={`${example.key}-${idx}`}
                    className={`flex items-start gap-3 border px-2.5 py-2 text-[11px] ${
                      active
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border bg-background/45 text-muted-foreground"
                    }`}
                  >
                    <span className={`w-5 shrink-0 font-mono ${active ? "text-primary" : "text-muted-foreground"}`}>
                      {idx + 1}
                    </span>
                    <code className="whitespace-pre-wrap">{line}</code>
                  </div>
                );
              })}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
