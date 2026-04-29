"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type MethodKey =
  | "two-sum"
  | "frequency"
  | "duplicate"
  | "anagrams"
  | "remainders";

type BucketCell = {
  label: string;
  value: string;
  active?: boolean;
};

type Frame = {
  action: string;
  explanation: string;
  pointer: number;
  currentValue: string;
  hashInput: string;
  hashFormula: string;
  hashOutput: string;
  need: string;
  answer: string;
  buckets: BucketCell[][];
  memoryLines: string[];
  hashMapEntries: { key: string; value: string; bucket: string; active?: boolean }[];
  codeHighlights: number[];
  insight: string;
  collisionInfo: string;
};

type MethodConfig = {
  key: MethodKey;
  pill: string;
  subtitle: string;
  goal: string;
  hashIdea: string;
  inputLabel: string;
  inputText: string;
  items: string[];
  slotCount: number;
  memoryTitle: string;
  bucketTitle: string;
  pseudo: string[];
  teaches: string[];
  frames: Frame[];
};

const SPEEDS = [
  { label: "0.5x", ms: 2200 },
  { label: "1x", ms: 1200 },
  { label: "2x", ms: 700 },
  { label: "4x", ms: 380 },
] as const;

function cloneBuckets(b: BucketCell[][]) {
  return b.map((bucket) => bucket.map((cell) => ({ ...cell })));
}

function emptyBuckets(n: number): BucketCell[][] {
  return Array.from({ length: n }, () => []);
}

function simpleHashNumber(x: number, mod: number) {
  return ((x % mod) + mod) % mod;
}

function stringHash(s: string, mod: number) {
  let h = 0;
  for (const ch of s) h = (h * 31 + ch.charCodeAt(0)) % mod;
  return h;
}

function signatureHash(s: string, mod: number) {
  const sig = s.split("").sort().join("");
  return { sig, idx: stringHash(sig, mod) };
}

function bucketCollisionText(bucket: BucketCell[]) {
  if (bucket.length === 0) return "No collision: bucket is empty before insert.";
  if (bucket.length === 1) return "Collision handling visible: this bucket already contains 1 entry.";
  return `Collision handling visible: this bucket already contains ${bucket.length} entries.`;
}


function buildNumberMapEntriesFromMap(
  m: Map<number, number>,
  slotCount: number,
  activeKey?: number
) {
  return [...m.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([k, v]) => ({
      key: String(k),
      value: String(v),
      bucket: String(simpleHashNumber(k, slotCount)),
      active: activeKey !== undefined && k === activeKey,
    }));
}

function buildNumberFreqEntries(
  m: Map<number, number>,
  slotCount: number,
  activeKey?: number
) {
  return [...m.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([k, v]) => ({
      key: String(k),
      value: `count=${v}`,
      bucket: String(simpleHashNumber(k, slotCount)),
      active: activeKey !== undefined && k === activeKey,
    }));
}

function buildNumberSetEntries(
  seen: Set<number>,
  slotCount: number,
  activeKey?: number
) {
  return [...seen.values()]
    .sort((a, b) => a - b)
    .map((k) => ({
      key: String(k),
      value: "present",
      bucket: String(simpleHashNumber(k, slotCount)),
      active: activeKey !== undefined && k === activeKey,
    }));
}

function buildStringGroupEntries(
  m: Map<string, string[]>,
  slotCount: number,
  activeKey?: string
) {
  return [...m.entries()].map(([k, v]) => ({
    key: k,
    value: `[${v.join(", ")}]`,
    bucket: String(stringHash(k, slotCount)),
    active: activeKey !== undefined && k == activeKey,
  }));
}

function buildRemainderEntries(
  m: Map<number, number[]>,
  activeKey?: number
) {
  return [...m.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([k, v]) => ({
      key: `rem ${k}`,
      value: `[${v.join(", ")}]`,
      bucket: String(k),
      active: activeKey !== undefined && k === activeKey,
    }));
}

function HashMapTable({
  title,
  entries = [],
}: {
  title: string;
  entries?: { key: string; value: string; bucket: string; active?: boolean }[];
}) {
  return (
    <div className="border border-border bg-background/45 p-4">
      <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{title}</div>

      <div className="mt-4 overflow-hidden border border-border bg-background/55">
        <div className="grid grid-cols-[1fr_1fr_100px] border-b border-border bg-background/70 text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
          <div className="px-3 py-2">Key</div>
          <div className="border-l border-border px-3 py-2">Stored Value</div>
          <div className="border-l border-border px-3 py-2">Bucket</div>
        </div>

        {entries.length === 0 ? (
          <div className="px-3 py-4 text-sm text-muted-foreground">(empty)</div>
        ) : (
          entries.map((entry, idx) => (
            <div
              key={`${entry.key}-${entry.value}-${idx}`}
              className={`grid grid-cols-[1fr_1fr_100px] border-b border-border/70 last:border-b-0 text-sm ${
                entry.active ? "bg-primary/10 text-primary" : "text-foreground"
              }`}
            >
              <div className="px-3 py-3 break-words font-semibold">{entry.key}</div>
              <div className="border-l border-border px-3 py-3 break-words">{entry.value}</div>
              <div className="border-l border-border px-3 py-3 font-mono">{entry.bucket}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function buildTwoSum(): MethodConfig {
  const nums = [2, 7, 11, 15];
  const target = 9;
  const slots = 8;
  const buckets = emptyBuckets(slots);
  const frames: Frame[] = [];

  frames.push({
    action: "Initialize hash map",
    explanation:
      "We scan the array from left to right. For each value, we compute its complement and ask whether that complement is already in hashed memory.",
    pointer: -1,
    currentValue: "—",
    hashInput: "—",
    hashFormula: "bucket = value % 8",
    hashOutput: "—",
    need: "target - value",
    answer: "pending",
    buckets: cloneBuckets(buckets),
    memoryLines: ["map = {}"],
    codeHighlights: [0],
    insight:
      "Two Sum uses a hash map because lookups for complements are fast. The array remains in order, but memory grows beside it.",
    collisionInfo: "No bucket chosen yet.",
  });

  const map = new Map<number, number>();

  nums.forEach((value, i) => {
    const need = target - value;
    const hashIdx = simpleHashNumber(value, slots);

    frames.push({
      action: `Inspect nums[${i}] = ${value}`,
      explanation: `Current value is ${value}. To reach target ${target}, we need ${need}. Check the map before inserting the current value.`,
      pointer: i,
      currentValue: String(value),
      hashInput: String(value),
      hashFormula: `${value} % ${slots}`,
      hashOutput: String(hashIdx),
      need: String(need),
      answer: map.has(need) ? `[${map.get(need)}, ${i}]` : "not found yet",
      buckets: cloneBuckets(buckets),
      memoryLines:
        map.size === 0
          ? ["map = {}"]
          : [...map.entries()].map(([k, v]) => `${k} -> index ${v}`),
      hashMapEntries: buildNumberMapEntriesFromMap(map, slots),
      codeHighlights: [1, 2],
      insight:
        "The important trick is check first, insert second. That avoids pairing the current number with itself incorrectly.",
      collisionInfo: bucketCollisionText(buckets[hashIdx]),
    });

    if (map.has(need)) {
      frames.push({
        action: "Complement found",
        explanation: `${need} is already stored in hashed memory, so nums[${map.get(
          need
        )}] + nums[${i}] = ${target}. We can stop immediately.`,
        pointer: i,
        currentValue: String(value),
        hashInput: String(value),
        hashFormula: `${value} % ${slots}`,
        hashOutput: String(hashIdx),
        need: String(need),
        answer: `[${map.get(need)}, ${i}]`,
        buckets: cloneBuckets(buckets),
        memoryLines: [...map.entries()].map(([k, v]) => `${k} -> index ${v}`),
        hashMapEntries: buildNumberMapEntriesFromMap(map, slots),
        codeHighlights: [2, 3],
        insight:
          "This is why hashing helps: instead of scanning backward each time, the complement test is near constant time.",
        collisionInfo: "No insert happens here because the answer is already known.",
      });
      return;
    }

    map.set(value, i);
    buckets[hashIdx].push({
      label: `slot ${hashIdx}`,
      value: `${value}:${i}`,
      active: true,
    });

    frames.push({
      action: `Insert ${value} into hashed memory`,
      explanation: `Complement ${need} was not found, so store ${value} with its index ${i}. Its bucket is ${hashIdx}.`,
      pointer: i,
      currentValue: String(value),
      hashInput: String(value),
      hashFormula: `${value} % ${slots}`,
      hashOutput: String(hashIdx),
      need: String(need),
      answer: "continue scanning",
      buckets: cloneBuckets(buckets),
      memoryLines: [...map.entries()].map(([k, v]) => `${k} -> index ${v}`),
      hashMapEntries: buildNumberMapEntriesFromMap(map, slots, value),
      codeHighlights: [4, 5],
      insight:
        "The map stores value -> index, not index -> value. That direction is what makes complement lookup work.",
      collisionInfo: bucketCollisionText(buckets[hashIdx].slice(0, -1)),
    });

    buckets[hashIdx] = buckets[hashIdx].map((x) => ({ ...x, active: false }));
  });

  return {
    key: "two-sum",
    pill: "TWO SUM",
    subtitle: "Hash map lookup for complements",
    goal: "Find two indices whose values add to the target.",
    hashIdea: "Hash the current value so it can be found later as someone else's complement.",
    inputLabel: "Input",
    inputText: `nums = [2, 7, 11, 15], target = 9`,
    items: nums.map(String),
    slotCount: slots,
    memoryTitle: "Logical Hash Map Memory",
    bucketTitle: "Physical Bucket Layout",
    pseudo: [
      "create empty map",
      "for each value at index i:",
      "  need = target - value",
      "  if need in map: return [map[need], i]",
      "  map[value] = i",
      "return not found",
    ],
    teaches: [
      "Complement is checked before insertion.",
      "Hash map lookup replaces nested loops.",
      "Logical map view and physical bucket view are different perspectives.",
      "The bucket index comes from the hash formula, not the array index.",
      "Collisions do not break correctness if the structure handles them.",
    ],
    frames,
  };
}

function buildFrequency(): MethodConfig {
  const arr = [4, 1, 4, 2, 1, 4, 3];
  const slots = 8;
  const buckets = emptyBuckets(slots);
  const frames: Frame[] = [];
  const freq = new Map<number, number>();

  frames.push({
    action: "Initialize frequency map",
    explanation:
      "A frequency map counts how many times each value appears. The same value hashes to the same logical key again and again.",
    pointer: -1,
    currentValue: "—",
    hashInput: "—",
    hashFormula: "bucket = value % 8",
    hashOutput: "—",
    need: "count++",
    answer: "counts pending",
    buckets: cloneBuckets(buckets),
    memoryLines: ["freq = {}"],
    hashMapEntries: [],
    codeHighlights: [0],
    insight:
      "Hashing is not just for finding pairs. It is one of the most common ways to count occurrences efficiently.",
    collisionInfo: "No bucket chosen yet.",
  });

  arr.forEach((value, i) => {
    const idx = simpleHashNumber(value, slots);
    const next = (freq.get(value) ?? 0) + 1;
    freq.set(value, next);

    const bucket = buckets[idx];
    const existing = bucket.find((x) => x.value.startsWith(`${value}:`));
    const beforeCollision = bucket.length;

    if (existing) {
      existing.value = `${value}:count=${next}`;
      existing.active = true;
    } else {
      bucket.push({
        label: `slot ${idx}`,
        value: `${value}:count=${next}`,
        active: true,
      });
    }

    frames.push({
      action: `Count value ${value}`,
      explanation: `Hash ${value} into bucket ${idx}. Then update its running count from ${next - 1} to ${next}.`,
      pointer: i,
      currentValue: String(value),
      hashInput: String(value),
      hashFormula: `${value} % ${slots}`,
      hashOutput: String(idx),
      need: "increment frequency",
      answer: `count(${value}) = ${next}`,
      buckets: cloneBuckets(buckets),
      memoryLines: [...freq.entries()]
        .sort((a, b) => a[0] - b[0])
        .map(([k, v]) => `${k} -> ${v}`),
      hashMapEntries: buildNumberFreqEntries(freq, slots, value),
      codeHighlights: [1, 2, 3],
      insight:
        "The same value does not create a brand-new logical key. Instead, it updates the same logical frequency entry.",
      collisionInfo:
        beforeCollision === 0
          ? "No collision: bucket was empty."
          : "This bucket already had data, so collision handling is visible here.",
    });

    buckets[idx] = buckets[idx].map((x) => ({ ...x, active: false }));
  });

  return {
    key: "frequency",
    pill: "FREQUENCY MAP",
    subtitle: "Count occurrences with hashing",
    goal: "Count how many times each value appears.",
    hashIdea: "Hash each value to a memory location where its count lives.",
    inputLabel: "Input",
    inputText: `arr = [4, 1, 4, 2, 1, 4, 3]`,
    items: arr.map(String),
    slotCount: slots,
    memoryTitle: "Logical Frequency Memory",
    bucketTitle: "Bucket Layout for Counts",
    pseudo: [
      "create empty freq map",
      "for each value x in array:",
      "  if x not in freq: freq[x] = 0",
      "  freq[x] += 1",
      "return freq",
    ],
    teaches: [
      "Frequency maps are one of the most important array tools.",
      "Repeated values update one logical counter.",
      "Hashing supports counting, not just searching.",
      "Buckets are storage detail; counts are the logical result.",
      "This pattern appears in top-K, duplicates, majority, and anagram problems.",
    ],
    frames,
  };
}

function buildDuplicate(): MethodConfig {
  const arr = [8, 3, 5, 1, 3, 9];
  const slots = 8;
  const buckets = emptyBuckets(slots);
  const seen = new Set<number>();
  const frames: Frame[] = [];

  frames.push({
    action: "Initialize hash set",
    explanation:
      "A hash set stores membership only. The question is simple: have we seen this value before?",
    pointer: -1,
    currentValue: "—",
    hashInput: "—",
    hashFormula: "bucket = value % 8",
    hashOutput: "—",
    need: "seen?",
    answer: "no duplicate yet",
    buckets: cloneBuckets(buckets),
    memoryLines: ["seen = {}"],
    hashMapEntries: [],
    codeHighlights: [0],
    insight:
      "A set is the cleanest choice when you only care about existence, not counts or indices.",
    collisionInfo: "No bucket chosen yet.",
  });

  for (let i = 0; i < arr.length; i++) {
    const value = arr[i];
    const idx = simpleHashNumber(value, slots);

    frames.push({
      action: `Check whether ${value} is already seen`,
      explanation: `Before inserting ${value}, ask if it is already in the set.`,
      pointer: i,
      currentValue: String(value),
      hashInput: String(value),
      hashFormula: `${value} % ${slots}`,
      hashOutput: String(idx),
      need: "membership test",
      answer: seen.has(value) ? "duplicate found" : "not seen yet",
      buckets: cloneBuckets(buckets),
      memoryLines:
        seen.size === 0
          ? ["seen = {}"]
          : [...seen.values()].sort((a, b) => a - b).map((x) => `${x}`),
      hashMapEntries: buildNumberSetEntries(seen, slots),
      codeHighlights: [1, 2],
      insight:
        "The set gives a yes/no answer. That is enough for duplicate detection in one pass.",
      collisionInfo: bucketCollisionText(buckets[idx]),
    });

    if (seen.has(value)) {
      frames.push({
        action: "Duplicate detected",
        explanation: `${value} is already present in the set, so the array contains a duplicate.`,
        pointer: i,
        currentValue: String(value),
        hashInput: String(value),
        hashFormula: `${value} % ${slots}`,
        hashOutput: String(idx),
        need: "membership test",
        answer: `${value} is duplicate`,
        buckets: cloneBuckets(buckets),
        memoryLines: [...seen.values()].sort((a, b) => a - b).map((x) => `${x}`),
        hashMapEntries: buildNumberSetEntries(seen, slots, value),
        codeHighlights: [2, 3],
        insight:
          "Because lookup is fast, duplicate detection becomes O(n) instead of O(n²).",
        collisionInfo: "We stop at the moment the repeated value is detected.",
      });
      break;
    }

    seen.add(value);
    buckets[idx].push({ label: `slot ${idx}`, value: `${value}`, active: true });

    frames.push({
      action: `Insert ${value} into the set`,
      explanation: `${value} was not already seen, so insert it into bucket ${idx}.`,
      pointer: i,
      currentValue: String(value),
      hashInput: String(value),
      hashFormula: `${value} % ${slots}`,
      hashOutput: String(idx),
      need: "insert into set",
      answer: "continue scan",
      buckets: cloneBuckets(buckets),
      memoryLines: [...seen.values()].sort((a, b) => a - b).map((x) => `${x}`),
      hashMapEntries: buildNumberSetEntries(seen, slots, value),
      codeHighlights: [4],
      insight:
        "Set insertions let future values detect repetitions immediately.",
      collisionInfo: bucketCollisionText(buckets[idx].slice(0, -1)),
    });

    buckets[idx] = buckets[idx].map((x) => ({ ...x, active: false }));
  }

  return {
    key: "duplicate",
    pill: "DUPLICATE CHECK",
    subtitle: "Hash set membership while scanning",
    goal: "Detect whether any value appears more than once.",
    hashIdea: "Hash each value into a set so later repeats can be recognized instantly.",
    inputLabel: "Input",
    inputText: `arr = [8, 3, 5, 1, 3, 9]`,
    items: arr.map(String),
    slotCount: slots,
    memoryTitle: "Logical Seen Set",
    bucketTitle: "Physical Set Buckets",
    pseudo: [
      "create empty hash set",
      "for each value x:",
      "  if x in seen: duplicate found",
      "  insert x into seen",
      "return no duplicate",
    ],
    teaches: [
      "Sets answer existence questions.",
      "Membership check comes before insertion.",
      "The same one-pass idea shows up across many array problems.",
      "Hash buckets are the storage mechanism behind fast membership.",
      "Collision handling is still relevant even in a simple set.",
    ],
    frames,
  };
}

function buildAnagrams(): MethodConfig {
  const arr = ["eat", "tea", "tan", "ate", "nat", "bat"];
  const slots = 10;
  const buckets = emptyBuckets(slots);
  const groups = new Map<string, string[]>();
  const frames: Frame[] = [];

  frames.push({
    action: "Initialize grouped hash map",
    explanation:
      "Here the raw word is not the hash key. We first normalize the word into a signature, then hash that signature.",
    pointer: -1,
    currentValue: "—",
    hashInput: "signature(word)",
    hashFormula: "bucket = hash(sorted(word)) % 10",
    hashOutput: "—",
    need: "group by signature",
    answer: "groups pending",
    buckets: cloneBuckets(buckets),
    memoryLines: ["groups = {}"],
    hashMapEntries: [],
    codeHighlights: [0],
    insight:
      "Many hashing problems work because we transform the data before hashing it.",
    collisionInfo: "No bucket chosen yet.",
  });

  arr.forEach((word, i) => {
    const { sig, idx } = signatureHash(word, slots);
    const group = groups.get(sig) ?? [];
    const beforeCollision = buckets[idx].length;
    group.push(word);
    groups.set(sig, group);

    const existing = buckets[idx].find((x) => x.label === sig);
    if (existing) {
      existing.value = `[${group.join(", ")}]`;
      existing.active = true;
    } else {
      buckets[idx].push({ label: sig, value: `[${group.join(", ")}]`, active: true });
    }

    frames.push({
      action: `Normalize and hash "${word}"`,
      explanation: `Sort "${word}" to get signature "${sig}". That signature becomes the hash key, and the word joins that group.`,
      pointer: i,
      currentValue: word,
      hashInput: sig,
      hashFormula: `hash("${sig}") % ${slots}`,
      hashOutput: String(idx),
      need: "append to anagram group",
      answer: `${sig} -> [${group.join(", ")}]`,
      buckets: cloneBuckets(buckets),
      memoryLines: [...groups.entries()].map(([k, v]) => `${k} -> [${v.join(", ")}]`),
      hashMapEntries: buildStringGroupEntries(groups, slots, sig),
      codeHighlights: [1, 2, 3, 4],
      insight:
        "Different words can map to the same normalized signature. That is exactly what makes them anagrams.",
      collisionInfo:
        beforeCollision === 0
          ? "No bucket collision before insert."
          : "This bucket already had signature data, so storage collisions are possible even when logical grouping is correct.",
    });

    buckets[idx] = buckets[idx].map((x) => ({ ...x, active: false }));
  });

  return {
    key: "anagrams",
    pill: "GROUP ANAGRAMS",
    subtitle: "Hash normalized signatures",
    goal: "Group words that are anagrams of each other.",
    hashIdea: "Hash the normalized signature, not the original word.",
    inputLabel: "Input",
    inputText: `words = ["eat", "tea", "tan", "ate", "nat", "bat"]`,
    items: arr,
    slotCount: slots,
    memoryTitle: "Logical Signature Groups",
    bucketTitle: "Physical Signature Buckets",
    pseudo: [
      "create empty map",
      "for each word:",
      "  signature = sort(word)",
      "  map[signature].push(word)",
      "return grouped values",
    ],
    teaches: [
      "The best hash key is often a transformed representation.",
      "Hashing supports grouping, not only lookup.",
      "Words with the same sorted letters share a logical key.",
      "Physical bucket placement and logical grouping are different ideas.",
      "This is a classic example of feature engineering before hashing.",
    ],
    frames,
  };
}

function buildRemainders(): MethodConfig {
  const arr = [14, 27, 35, 42, 58, 63, 71];
  const mod = 5;
  const slots = 5;
  const buckets = emptyBuckets(slots);
  const groups = new Map<number, number[]>();
  const frames: Frame[] = [];

  frames.push({
    action: "Initialize remainder buckets",
    explanation:
      "In some problems, the hash key is the actual grouping rule itself. Here we group by remainder modulo 5.",
    pointer: -1,
    currentValue: "—",
    hashInput: "x",
    hashFormula: "bucket = x % 5",
    hashOutput: "—",
    need: "group by remainder",
    answer: "buckets pending",
    buckets: cloneBuckets(buckets),
    memoryLines: ["buckets = {}"],
    hashMapEntries: [],
    codeHighlights: [0],
    insight:
      "Modulo hashing is both a storage technique and a mathematical grouping pattern.",
    collisionInfo: "No bucket chosen yet.",
  });

  arr.forEach((value, i) => {
    const idx = value % mod;
    const list = groups.get(idx) ?? [];
    const beforeCollision = buckets[idx].length;
    list.push(value);
    groups.set(idx, list);

    const existing = buckets[idx][0];
    if (existing) {
      existing.value = `[${list.join(", ")}]`;
      existing.active = true;
    } else {
      buckets[idx].push({ label: `rem ${idx}`, value: `[${list.join(", ")}]`, active: true });
    }

    frames.push({
      action: `Place ${value} into remainder class ${idx}`,
      explanation: `${value} % ${mod} = ${idx}, so ${value} belongs in remainder bucket ${idx}.`,
      pointer: i,
      currentValue: String(value),
      hashInput: String(value),
      hashFormula: `${value} % ${mod}`,
      hashOutput: String(idx),
      need: "same remainder class",
      answer: `bucket ${idx}`,
      buckets: cloneBuckets(buckets),
      memoryLines: [...groups.entries()]
        .sort((a, b) => a[0] - b[0])
        .map(([k, v]) => `rem ${k} -> [${v.join(", ")}]`),
      hashMapEntries: buildRemainderEntries(groups, idx),
      codeHighlights: [1, 2, 3],
      insight:
        "This method shows that a hash key can come directly from arithmetic structure in the problem.",
      collisionInfo:
        beforeCollision === 0
          ? "No prior bucket occupancy."
          : "This remainder class already contains values, so more than one input shares the same hash result.",
    });

    buckets[idx] = buckets[idx].map((x) => ({ ...x, active: false }));
  });

  return {
    key: "remainders",
    pill: "REMAINDER BUCKETS",
    subtitle: "Hash by modulo class",
    goal: "Group values by their modulo class.",
    hashIdea: "Use arithmetic remainder as the hash key itself.",
    inputLabel: "Input",
    inputText: `arr = [14, 27, 35, 42, 58, 63, 71], k = 5`,
    items: arr.map(String),
    slotCount: slots,
    memoryTitle: "Logical Remainder Groups",
    bucketTitle: "Physical Modulo Buckets",
    pseudo: [
      "create k buckets",
      "for each value x:",
      "  r = x % k",
      "  place x in bucket r",
      "return grouped buckets",
    ],
    teaches: [
      "Modulo classes are a very common hashing idea.",
      "The hash function can be part of the math of the problem itself.",
      "Several different inputs can intentionally share one bucket.",
      "This pattern appears in divisibility, pairing, and cyclic grouping problems.",
      "Hashing is often just structured partitioning.",
    ],
    frames,
  };
}

function buildMethods(): Record<MethodKey, MethodConfig> {
  return {
    "two-sum": buildTwoSum(),
    frequency: buildFrequency(),
    duplicate: buildDuplicate(),
    anagrams: buildAnagrams(),
    remainders: buildRemainders(),
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
  const color =
    accent === "cyan"
      ? "text-terminal-cyan"
      : accent === "amber"
      ? "text-terminal-amber"
      : accent === "neutral"
      ? "text-foreground"
      : "text-primary";

  return (
    <div className="border border-border bg-background/55 px-4 py-4">
      <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{title}</div>
      <div className={`mt-3 text-3xl font-bold ${color}`}>{value}</div>
    </div>
  );
}

function BucketView({
  buckets,
  title,
}: {
  buckets: BucketCell[][];
  title: string;
}) {
  return (
    <div className="border border-border bg-background/45 p-4">
      <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{title}</div>

      <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {buckets.map((bucket, idx) => (
          <div key={idx} className="border border-border bg-background/55 p-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                Bucket
              </span>
              <span className="text-sm font-bold text-foreground">{idx}</span>
            </div>

            <div className="mt-3 min-h-[72px] space-y-2">
              {bucket.length === 0 ? (
                <div className="text-sm text-muted-foreground/70">(empty)</div>
              ) : (
                bucket.map((entry, j) => (
                  <div
                    key={`${idx}-${j}-${entry.label}-${entry.value}`}
                    className={`border px-2 py-2 text-xs ${
                      entry.active
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-background/60 text-foreground"
                    }`}
                  >
                    <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                      {entry.label}
                    </div>
                    <div className="mt-1 break-words font-semibold">{entry.value}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SideInfoCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-border bg-card/35 p-5">
      <div className="text-xs uppercase tracking-[0.34em] text-muted-foreground">{title}</div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

export default function ArraysHashingVisualizerPage() {
  const methods = useMemo(() => buildMethods(), []);
  const [activeKey, setActiveKey] = useState<MethodKey>("two-sum");
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState<(typeof SPEEDS)[number]["label"]>("1x");

  const method = methods[activeKey] ?? methods["two-sum"];
  const frames = method.frames ?? [];
  const safeStep =
    frames.length === 0 ? 0 : Math.max(0, Math.min(step, frames.length - 1));

  const frame: Frame =
    frames[safeStep] ??
    {
      action: "Initialize",
      explanation: "No frame available.",
      pointer: -1,
      currentValue: "—",
      hashInput: "—",
      hashFormula: "—",
      hashOutput: "—",
      need: "—",
      answer: "—",
      buckets: emptyBuckets(method.slotCount || 8),
      memoryLines: ["(empty)"],
      hashMapEntries: [],
      codeHighlights: [],
      insight: "No insight available.",
      collisionInfo: "No collision info available.",
    };

  const progress =
    frames.length === 0 ? 0 : ((safeStep + 1) / frames.length) * 100;

  useEffect(() => {
    setStep(0);
    setPlaying(false);
  }, [activeKey]);

  useEffect(() => {
    if (!playing || frames.length === 0) return;
    const ms = SPEEDS.find((s) => s.label === speed)?.ms ?? 1200;

    const id = setInterval(() => {
      setStep((prev) => {
        if (prev >= frames.length - 1) {
          setPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, ms);

    return () => clearInterval(id);
  }, [playing, speed, frames.length]);

  return (
    <main className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
        <div className="container flex h-14 items-center justify-between px-4 md:px-8">
          <Link href="/" className="flex items-center gap-2 text-sm font-bold tracking-widest">
            <span className="h-3 w-3 bg-primary shadow-[0_0_14px_hsl(var(--primary))]" />
            <span className="text-primary text-glow">DSA.ENGINE</span>
          </Link>

          <div className="flex items-center gap-6 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            <Link href="/learn/arrays-hashing" className="transition-colors hover:text-primary">
              // lesson
            </Link>
            <Link href="/" className="transition-colors hover:text-primary">
              // home
            </Link>
          </div>
        </div>
      </header>

      <div className="container max-w-[1680px] px-4 py-8 md:px-6 md:py-10">
        <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          visualize // arrays_hashing
        </div>

        <h1 className="mt-2 text-4xl font-extrabold leading-[0.95] md:text-6xl">
          Arrays & Hashing
          <br />
          <span className="text-primary text-glow">Visualizer.</span>
        </h1>

        <p className="mt-5 max-w-5xl text-sm leading-relaxed text-muted-foreground md:text-base">
          Watch the array scan from left to right while hashed memory grows beside it.
          This view separates the sequence itself, the hash rule, the bucket placement,
          and the logical memory structure so you can clearly see what hashing is doing.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href="/learn/arrays-hashing"
            className="border-2 border-primary bg-primary px-5 py-3 text-sm font-bold tracking-[0.25em] text-black hover:opacity-90"
          >
            ▶ READ_THE_LESSON
          </Link>

          <Link
            href="/"
            className="border-2 border-border px-5 py-3 text-sm font-bold tracking-[0.25em] text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            $ BACK_TO_HOME
          </Link>
        </div>

        <div className="mt-8 border border-border bg-card/35 p-4 md:p-5">
          <div className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
            Hashing Method
          </div>

          <div className="mt-4 flex flex-wrap gap-2.5">
            {Object.values(methods).map((m) => (
              <button
                key={m.key}
                onClick={() => setActiveKey(m.key)}
                className={`rounded-full border px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] transition ${
                  activeKey === m.key
                    ? "border-primary bg-primary/12 text-primary shadow-[0_0_16px_rgba(57,255,20,0.10)]"
                    : "border-border bg-background/60 text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {m.pill}
              </button>
            ))}
          </div>

          <div className="mt-4 grid gap-4 border-t border-border pt-4 md:grid-cols-2">
            <div>
              <div className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                Goal
              </div>
              <div className="mt-2 text-sm text-foreground">{method.goal}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
                Hashing Idea
              </div>
              <div className="mt-2 text-sm text-muted-foreground">{method.hashIdea}</div>
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1.65fr)_380px]">
          <section className="border border-border bg-card/35">
            <div className="flex items-center justify-between border-b border-border bg-secondary/55 px-5 py-3 text-sm text-muted-foreground">
              <span>
                ~/visualize/arrays-hashing.ts — step {frames.length === 0 ? 0 : safeStep + 1}/{frames.length}
              </span>
              <span className="text-[11px] uppercase tracking-[0.25em]">{method.pill}</span>
            </div>

            <div className="space-y-5 p-5 md:space-y-6 md:p-6">
              <div className="border border-border bg-background/45 p-4 md:p-5">
                <div className="text-[10px] uppercase tracking-[0.34em] text-muted-foreground">
                  {method.inputLabel}
                </div>
                <div className="mt-3 text-base text-foreground md:text-lg">{method.inputText}</div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                  title="Index"
                  value={frame.pointer >= 0 ? String(frame.pointer) : "—"}
                  accent="neutral"
                />
                <StatCard title="Value" value={frame.currentValue} accent="neutral" />
                <StatCard title="Need / Goal" value={frame.need} accent="primary" />
                <StatCard title="Hash Output" value={frame.hashOutput} accent="cyan" />
              </div>

              <div className="border border-border bg-background/45 p-4 md:p-5">
                <div className="flex items-center justify-between">
                  <div className="text-[10px] uppercase tracking-[0.34em] text-muted-foreground">
                    Array Scan
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Current pointer: {frame.pointer >= 0 ? `idx ${frame.pointer}` : "not started"}
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                  {method.items.map((item, idx) => {
                    const isCurrent = idx === frame.pointer;
                    const isPast = frame.pointer > idx;
                    return (
                      <div
                        key={`${method.key}-${idx}-${item}`}
                        className={`min-w-[88px] border px-4 py-3 text-center transition ${
                          isCurrent
                            ? "border-primary bg-primary/10 text-primary shadow-[0_0_18px_rgba(57,255,20,0.10)]"
                            : isPast
                            ? "border-terminal-cyan/60 bg-terminal-cyan/10 text-terminal-cyan"
                            : "border-border bg-background/55 text-foreground"
                        }`}
                      >
                        <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                          idx {idx}
                        </div>
                        <div className="mt-2 text-3xl font-bold">{item}</div>
                        <div className="mt-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                          {isCurrent ? "current" : isPast ? "processed" : "unseen"}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_0.85fr]">
                <div className="space-y-4">
                  <div className="border border-border bg-background/45 p-4 md:p-5">
                    <div className="text-[10px] uppercase tracking-[0.34em] text-muted-foreground">
                      Current Hash Step
                    </div>
                    <div className="mt-3 text-lg font-bold text-foreground">{frame.action}</div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      <div className="border border-border bg-background/55 p-3">
                        <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                          Hash Input
                        </div>
                        <div className="mt-2 break-words text-sm font-semibold text-foreground">
                          {frame.hashInput}
                        </div>
                      </div>

                      <div className="border border-border bg-background/55 p-3">
                        <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                          Hash Formula
                        </div>
                        <div className="mt-2 break-words text-sm font-semibold text-foreground">
                          {frame.hashFormula}
                        </div>
                      </div>

                      <div className="border border-border bg-background/55 p-3">
                        <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                          Bucket / Result
                        </div>
                        <div className="mt-2 break-words text-sm font-semibold text-primary">
                          {frame.hashOutput}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 grid gap-3 md:grid-cols-2">
                      <div className="border border-border bg-background/55 p-3">
                        <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                          Why this step matters
                        </div>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          {frame.insight}
                        </p>
                      </div>

                      <div className="border border-border bg-background/55 p-3">
                        <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                          Collision note
                        </div>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          {frame.collisionInfo}
                        </p>
                      </div>
                    </div>
                  </div>

                  <BucketView buckets={frame.buckets} title={method.bucketTitle} />
                </div>

                <div className="space-y-4">
                  <HashMapTable
                    title={method.memoryTitle}
                    entries={frame.hashMapEntries ?? []}
                  />

                  <div className="border border-border bg-background/45 p-4 md:p-5">
                    <div className="text-[10px] uppercase tracking-[0.34em] text-muted-foreground">
                      Memory Summary
                    </div>

                    <div className="mt-3 min-h-[120px] space-y-2">
                      {frame.memoryLines.map((line, i) => (
                        <div
                          key={i}
                          className="break-words border border-border bg-background/55 px-3 py-2 text-sm text-foreground"
                        >
                          {line}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border border-border bg-background/45 p-4 md:p-5">
                    <div className="text-[10px] uppercase tracking-[0.34em] text-muted-foreground">
                      Step-by-step explanation
                    </div>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      {frame.explanation}
                    </p>
                  </div>

                  <div className="border border-border bg-background/45 p-4 md:p-5">
                    <div className="text-[10px] uppercase tracking-[0.34em] text-muted-foreground">
                      Answer / outcome
                    </div>
                    <div className="mt-3 text-lg font-bold text-primary">{frame.answer}</div>
                  </div>
                </div>
              </div>

              <div className="border border-border bg-background/35 p-4 md:p-5">
                <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => {
                        setPlaying(false);
                        setStep((s) => Math.max(0, s - 1));
                      }}
                      disabled={safeStep === 0}
                      className="border border-border bg-background/60 px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-foreground transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      ← PREV
                    </button>

                    <button
                      onClick={() => {
                        setPlaying(false);
                        setStep((s) => Math.min(frames.length - 1, s + 1));
                      }}
                      disabled={safeStep === frames.length - 1}
                      className="border border-primary bg-primary px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      STEP →
                    </button>

                    <button
                      onClick={() => setPlaying((p) => !p)}
                      className="border border-border bg-background/60 px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-foreground transition hover:border-primary hover:text-primary"
                    >
                      {playing ? "PAUSE" : "AUTO PLAY"}
                    </button>

                    <button
                      onClick={() => {
                        setPlaying(false);
                        setStep(0);
                      }}
                      className="border border-border bg-background/60 px-5 py-3 text-sm font-bold uppercase tracking-[0.16em] text-foreground transition hover:border-primary hover:text-primary"
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

                <div className="mt-5">
                  <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.28em] text-muted-foreground">
                    <span>Progress</span>
                    <span>
                      {frames.length === 0 ? 0 : safeStep + 1}/{frames.length}
                    </span>
                  </div>

                  <div className="h-3 overflow-hidden border border-border bg-background/70">
                    <div
                      className="h-full bg-primary transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <input
                    type="range"
                    min={0}
                    max={Math.max(0, frames.length - 1)}
                    value={safeStep}
                    onChange={(e) => {
                      setPlaying(false);
                      setStep(Number(e.target.value));
                    }}
                    className="mt-4 w-full accent-[rgb(57,255,20)]"
                  />
                </div>
              </div>
            </div>
          </section>

          <aside className="space-y-5">
            <SideInfoCard title="Pseudocode">
              <div className="space-y-2">
                {method.pseudo.map((line, idx) => {
                  const active = frame.codeHighlights.includes(idx);
                  return (
                    <div
                      key={`${method.key}-code-${idx}`}
                      className={`flex items-start gap-3 border px-3 py-3 text-sm ${
                        active
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-border bg-background/45 text-muted-foreground"
                      }`}
                    >
                      <span
                        className={`w-5 shrink-0 font-mono ${
                          active ? "text-primary" : "text-muted-foreground"
                        }`}
                      >
                        {idx + 1}
                      </span>
                      <code className="whitespace-pre-wrap">{line}</code>
                    </div>
                  );
                })}
              </div>
            </SideInfoCard>

            <SideInfoCard title="What this method teaches">
              <div className="space-y-3 text-sm leading-7 text-muted-foreground">
                {method.teaches.map((t, i) => (
                  <div key={i}>
                    {i + 1}. {t}
                  </div>
                ))}
              </div>
            </SideInfoCard>

            <SideInfoCard title="Method summary">
              <div className="space-y-3 text-sm text-muted-foreground">
                <div>
                  <span className="text-foreground">Pattern:</span> {method.pill}
                </div>
                <div>
                  <span className="text-foreground">Goal:</span> {method.goal}
                </div>
                <div>
                  <span className="text-foreground">Hash key idea:</span> {method.hashIdea}
                </div>
              </div>
            </SideInfoCard>

            <div className="grid gap-4">
              <StatCard title="Current Value" value={frame.currentValue} accent="neutral" />
              <StatCard title="Need / Goal" value={frame.need} accent="primary" />
              <StatCard title="Hash Result" value={frame.hashOutput} accent="cyan" />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
