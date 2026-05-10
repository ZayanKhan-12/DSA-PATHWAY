"use client";

import Link from "next/link";
import { useState } from "react";

type LanguageKey =
  | "javascript"
  | "python"
  | "java"
  | "cpp"
  | "typescript"
  | "go"
  | "csharp"
  | "rust";

type TestCase = {
  id: number;
  beginWord: string;
  endWord: string;
  wordList: string[];
  expected: number;
};

const LANGUAGES: { key: LanguageKey; label: string }[] = [
  { key: "javascript", label: "JAVASCRIPT" },
  { key: "python", label: "PYTHON" },
  { key: "java", label: "JAVA" },
  { key: "cpp", label: "C++" },
  { key: "typescript", label: "TYPESCRIPT" },
  { key: "go", label: "GO" },
  { key: "csharp", label: "C#" },
  { key: "rust", label: "RUST" },
];

const STARTER_CODE: Record<LanguageKey, string> = {
  javascript: `function ladderLength(beginWord, endWord, wordList) {
  // write your answer here using BFS
  throw new Error("Implement ladderLength first");
}`,
  python: `class Solution:
    def ladderLength(self, beginWord: str, endWord: str, wordList: List[str]) -> int:
        # write your answer here using BFS
        return 0`,
  java: `class Solution {
    public int ladderLength(String beginWord, String endWord, List<String> wordList) {
        // write your answer here using BFS
        return 0;
    }
}`,
  cpp: `class Solution {
public:
    int ladderLength(string beginWord, string endWord, vector<string>& wordList) {
        // write your answer here using BFS
        return 0;
    }
};`,
  typescript: `function ladderLength(beginWord: string, endWord: string, wordList: string[]): number {
  // write your answer here using BFS
  throw new Error("Implement ladderLength first");
}`,
  go: `func ladderLength(beginWord string, endWord string, wordList []string) int {
    // write your answer here using BFS
    return 0
}`,
  csharp: `public class Solution {
    public int LadderLength(string beginWord, string endWord, IList<string> wordList) {
        // write your answer here using BFS
        return 0;
    }
}`,
  rust: `impl Solution {
    pub fn ladder_length(begin_word: String, end_word: String, word_list: Vec<String>) -> i32 {
        // write your answer here using BFS
        0
    }
}`,
};

const SOLUTION_CODE: Record<LanguageKey, string> = {
  javascript: `function ladderLength(beginWord, endWord, wordList) {
  const wordSet = new Set(wordList);

  if (!wordSet.has(endWord)) {
    return 0;
  }

  const queue = [[beginWord, 1]];
  const visited = new Set([beginWord]);
  let head = 0;

  while (head < queue.length) {
    const [word, length] = queue[head];
    head++;

    if (word === endWord) {
      return length;
    }

    for (let i = 0; i < word.length; i++) {
      for (let code = 97; code <= 122; code++) {
        const nextWord =
          word.slice(0, i) +
          String.fromCharCode(code) +
          word.slice(i + 1);

        if (wordSet.has(nextWord) && !visited.has(nextWord)) {
          visited.add(nextWord);
          queue.push([nextWord, length + 1]);
        }
      }
    }
  }

  return 0;
}`,
  python: `from collections import deque

class Solution:
    def ladderLength(self, beginWord: str, endWord: str, wordList: List[str]) -> int:
        word_set = set(wordList)

        if endWord not in word_set:
            return 0

        queue = deque([(beginWord, 1)])
        visited = {beginWord}

        while queue:
            word, length = queue.popleft()

            if word == endWord:
                return length

            for i in range(len(word)):
                for code in range(ord("a"), ord("z") + 1):
                    next_word = word[:i] + chr(code) + word[i + 1:]

                    if next_word in word_set and next_word not in visited:
                        visited.add(next_word)
                        queue.append((next_word, length + 1))

        return 0`,
  java: `class Solution {
    public int ladderLength(String beginWord, String endWord, List<String> wordList) {
        Set<String> wordSet = new HashSet<>(wordList);

        if (!wordSet.contains(endWord)) {
            return 0;
        }

        Queue<String> words = new LinkedList<>();
        Queue<Integer> lengths = new LinkedList<>();

        words.offer(beginWord);
        lengths.offer(1);

        Set<String> visited = new HashSet<>();
        visited.add(beginWord);

        while (!words.isEmpty()) {
            String word = words.poll();
            int length = lengths.poll();

            if (word.equals(endWord)) {
                return length;
            }

            char[] chars = word.toCharArray();

            for (int i = 0; i < chars.length; i++) {
                char original = chars[i];

                for (char ch = 'a'; ch <= 'z'; ch++) {
                    chars[i] = ch;
                    String nextWord = new String(chars);

                    if (wordSet.contains(nextWord) && !visited.contains(nextWord)) {
                        visited.add(nextWord);
                        words.offer(nextWord);
                        lengths.offer(length + 1);
                    }
                }

                chars[i] = original;
            }
        }

        return 0;
    }
}`,
  cpp: `class Solution {
public:
    int ladderLength(string beginWord, string endWord, vector<string>& wordList) {
        unordered_set<string> wordSet(wordList.begin(), wordList.end());

        if (!wordSet.count(endWord)) {
            return 0;
        }

        queue<pair<string, int>> q;
        q.push({beginWord, 1});

        unordered_set<string> visited;
        visited.insert(beginWord);

        while (!q.empty()) {
            auto [word, length] = q.front();
            q.pop();

            if (word == endWord) {
                return length;
            }

            for (int i = 0; i < word.size(); i++) {
                string nextWord = word;

                for (char ch = 'a'; ch <= 'z'; ch++) {
                    nextWord[i] = ch;

                    if (wordSet.count(nextWord) && !visited.count(nextWord)) {
                        visited.insert(nextWord);
                        q.push({nextWord, length + 1});
                    }
                }
            }
        }

        return 0;
    }
};`,
  typescript: `function ladderLength(beginWord: string, endWord: string, wordList: string[]): number {
  const wordSet = new Set(wordList);

  if (!wordSet.has(endWord)) {
    return 0;
  }

  const queue: [string, number][] = [[beginWord, 1]];
  const visited = new Set<string>([beginWord]);
  let head = 0;

  while (head < queue.length) {
    const [word, length] = queue[head];
    head++;

    if (word === endWord) {
      return length;
    }

    for (let i = 0; i < word.length; i++) {
      for (let code = 97; code <= 122; code++) {
        const nextWord =
          word.slice(0, i) +
          String.fromCharCode(code) +
          word.slice(i + 1);

        if (wordSet.has(nextWord) && !visited.has(nextWord)) {
          visited.add(nextWord);
          queue.push([nextWord, length + 1]);
        }
      }
    }
  }

  return 0;
}`,
  go: `func ladderLength(beginWord string, endWord string, wordList []string) int {
    wordSet := map[string]bool{}

    for _, word := range wordList {
        wordSet[word] = true
    }

    if !wordSet[endWord] {
        return 0
    }

    type Item struct {
        word string
        length int
    }

    queue := []Item{{beginWord, 1}}
    visited := map[string]bool{beginWord: true}
    head := 0

    for head < len(queue) {
        current := queue[head]
        head++

        if current.word == endWord {
            return current.length
        }

        chars := []byte(current.word)

        for i := 0; i < len(chars); i++ {
            original := chars[i]

            for ch := byte('a'); ch <= byte('z'); ch++ {
                chars[i] = ch
                nextWord := string(chars)

                if wordSet[nextWord] && !visited[nextWord] {
                    visited[nextWord] = true
                    queue = append(queue, Item{nextWord, current.length + 1})
                }
            }

            chars[i] = original
        }
    }

    return 0
}`,
  csharp: `public class Solution {
    public int LadderLength(string beginWord, string endWord, IList<string> wordList) {
        HashSet<string> wordSet = new HashSet<string>(wordList);

        if (!wordSet.Contains(endWord)) {
            return 0;
        }

        Queue<(string word, int length)> queue = new Queue<(string, int)>();
        queue.Enqueue((beginWord, 1));

        HashSet<string> visited = new HashSet<string>();
        visited.Add(beginWord);

        while (queue.Count > 0) {
            var current = queue.Dequeue();

            if (current.word == endWord) {
                return current.length;
            }

            char[] chars = current.word.ToCharArray();

            for (int i = 0; i < chars.Length; i++) {
                char original = chars[i];

                for (char ch = 'a'; ch <= 'z'; ch++) {
                    chars[i] = ch;
                    string nextWord = new string(chars);

                    if (wordSet.Contains(nextWord) && !visited.Contains(nextWord)) {
                        visited.Add(nextWord);
                        queue.Enqueue((nextWord, current.length + 1));
                    }
                }

                chars[i] = original;
            }
        }

        return 0;
    }
}`,
  rust: `use std::collections::{HashSet, VecDeque};

impl Solution {
    pub fn ladder_length(begin_word: String, end_word: String, word_list: Vec<String>) -> i32 {
        let word_set: HashSet<String> = word_list.into_iter().collect();

        if !word_set.contains(&end_word) {
            return 0;
        }

        let mut queue = VecDeque::new();
        queue.push_back((begin_word.clone(), 1));

        let mut visited = HashSet::new();
        visited.insert(begin_word);

        while let Some((word, length)) = queue.pop_front() {
            if word == end_word {
                return length;
            }

            let mut chars: Vec<char> = word.chars().collect();

            for i in 0..chars.len() {
                let original = chars[i];

                for code in b'a'..=b'z' {
                    chars[i] = code as char;
                    let next_word: String = chars.iter().collect();

                    if word_set.contains(&next_word) && !visited.contains(&next_word) {
                        visited.insert(next_word.clone());
                        queue.push_back((next_word, length + 1));
                    }
                }

                chars[i] = original;
            }
        }

        0
    }
}`,
};

const TEST_CASES: TestCase[] = [
  {
    id: 1,
    beginWord: "hit",
    endWord: "cog",
    wordList: ["hot", "dot", "dog", "lot", "log", "cog"],
    expected: 5,
  },
  {
    id: 2,
    beginWord: "hit",
    endWord: "cog",
    wordList: ["hot", "dot", "dog", "lot", "log"],
    expected: 0,
  },
  {
    id: 3,
    beginWord: "a",
    endWord: "c",
    wordList: ["a", "b", "c"],
    expected: 2,
  },
  {
    id: 4,
    beginWord: "lost",
    endWord: "miss",
    wordList: ["most", "mist", "miss", "lost", "fist", "fish"],
    expected: 4,
  },
  {
    id: 5,
    beginWord: "talk",
    endWord: "tail",
    wordList: ["tall", "tail", "bail", "mail", "main"],
    expected: 3,
  },
];

function getLanguageLabel(language: LanguageKey) {
  return LANGUAGES.find((item) => item.key === language)?.label ?? language;
}

function executeJavaScript(code: string, test: TestCase) {
  try {
    const ladderLength = new Function(`
      "use strict";
      ${code}
      return ladderLength;
    `)() as (beginWord: string, endWord: string, wordList: string[]) => number;

    if (typeof ladderLength !== "function") {
      return {
        pass: false,
        actual: 0,
        error: "ladderLength function was not found. Keep the function named ladderLength.",
      };
    }

    const actual = ladderLength(test.beginWord, test.endWord, [...test.wordList]);

    if (typeof actual !== "number") {
      return {
        pass: false,
        actual: 0,
        error: "Your function must return a number.",
      };
    }

    return {
      pass: actual === test.expected,
      actual,
      error: "",
    };
  } catch (error) {
    return {
      pass: false,
      actual: 0,
      error: error instanceof Error ? error.message : "Unknown runtime error.",
    };
  }
}

export default function WordLadderPracticePage() {
  const [language, setLanguage] = useState<LanguageKey>("javascript");
  const [editorCode, setEditorCode] = useState<Record<LanguageKey, string>>(STARTER_CODE);
  const [selectedCaseId, setSelectedCaseId] = useState(1);
  const [showSolution, setShowSolution] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState("$ ready");
  const [resultText, setResultText] = useState("Run your JavaScript code against the sample tests.");

  const selectedCase = TEST_CASES.find((test) => test.id === selectedCaseId) ?? TEST_CASES[0];

  function runSelectedCase() {
    if (language !== "javascript") {
      const label = getLanguageLabel(language);

      setConsoleOutput(
        [
          "$ run.sample",
          `language: ${label}`,
          "status: PREVIEW_ONLY",
          "",
          "Only JavaScript runs inside this frontend runner.",
          "Switch to JAVASCRIPT to run real tests.",
        ].join("\n")
      );

      setResultText(`${label} is editable preview only.`);
      return;
    }

    const result = executeJavaScript(editorCode.javascript, selectedCase);

    setConsoleOutput(
      [
        "$ run.sample",
        `case: ${selectedCase.id}`,
        `beginWord: ${selectedCase.beginWord}`,
        `endWord: ${selectedCase.endWord}`,
        `wordList: ${JSON.stringify(selectedCase.wordList)}`,
        `expected: ${selectedCase.expected}`,
        `got: ${result.error ? "runtime error" : String(result.actual)}`,
        `status: ${result.pass ? "PASS" : "FAIL"}`,
        result.error ? `error: ${result.error}` : "",
      ]
        .filter(Boolean)
        .join("\n")
    );

    setResultText(result.pass ? `Case ${selectedCase.id} passed.` : `Case ${selectedCase.id} failed.`);
  }

  function submitAllCases() {
    if (language !== "javascript") {
      const label = getLanguageLabel(language);

      setConsoleOutput(
        [
          "$ submit",
          `language: ${label}`,
          "status: PREVIEW_ONLY",
          "",
          "Only JavaScript runs inside this frontend runner.",
          "Switch to JAVASCRIPT to run real tests.",
        ].join("\n")
      );

      setResultText(`${label} is editable preview only.`);
      return;
    }

    const lines = ["$ submit"];
    let passed = 0;

    for (const test of TEST_CASES) {
      const result = executeJavaScript(editorCode.javascript, test);

      if (result.pass) {
        passed++;
        lines.push(`case ${test.id}: PASS`);
      } else {
        lines.push(`case ${test.id}: FAIL`);
        lines.push(`  beginWord: ${test.beginWord}`);
        lines.push(`  endWord: ${test.endWord}`);
        lines.push(`  wordList: ${JSON.stringify(test.wordList)}`);
        lines.push(`  expected: ${test.expected}`);
        lines.push(`  got: ${result.error ? "runtime error" : String(result.actual)}`);
        if (result.error) lines.push(`  error: ${result.error}`);
      }
    }

    lines.push("");
    lines.push(`passed: ${passed}/${TEST_CASES.length}`);

    setConsoleOutput(lines.join("\n"));

    setResultText(
      passed === TEST_CASES.length
        ? "Accepted. All test cases passed."
        : passed === 0
          ? "Not accepted yet. Implement ladderLength, then run again."
          : `Wrong Answer. ${passed}/${TEST_CASES.length} cases passed.`
    );
  }

  function loadSolution() {
    setEditorCode((previous) => ({
      ...previous,
      [language]: SOLUTION_CODE[language],
    }));

    setConsoleOutput(`$ loaded ${getLanguageLabel(language)} solution`);
    setResultText(language === "javascript" ? "Loaded runnable JavaScript solution." : "Loaded preview solution.");
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-[1740px] px-4 py-4">
        <div className="mb-4 flex h-14 items-center justify-between border border-border bg-black/30 px-5">
          <Link href="/" className="text-[10px] font-bold tracking-[0.35em] text-primary">
            DSA.ENGINE
          </Link>

          <div className="flex items-center gap-5 text-[10px] font-bold tracking-[0.3em] text-muted-foreground">
            <Link className="hover:text-primary" href="/learn/bfs">
              BACK TO LESSON
            </Link>
          </div>
        </div>

        <div className="grid h-[calc(100vh-96px)] min-h-[760px] gap-4 xl:grid-cols-[0.78fr_1.22fr]">
          <section className="flex min-h-0 flex-col overflow-hidden border border-border bg-black/20">
            <div className="border-b border-border bg-black/20 px-5 py-4">
              <div className="mb-3 flex gap-2">
                <span className="border border-pink-500 px-3 py-1 text-[10px] font-bold tracking-[0.25em] text-pink-500">
                  HARD
                </span>
                <span className="border border-border px-3 py-1 text-[10px] font-bold tracking-[0.25em] text-muted-foreground">
                  BFS
                </span>
                <span className="border border-border px-3 py-1 text-[10px] font-bold tracking-[0.25em] text-muted-foreground">
                  IMPLICIT GRAPH
                </span>
              </div>

              <div className="mb-3 flex items-center gap-3">
                <span className="text-5xl font-bold leading-none text-primary">$</span>
                <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                  Word Ladder
                </h1>
              </div>

              <p className="max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">
                BFS over an implicit graph where edges are one-letter word transformations.
              </p>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              <div className="mb-4 text-[10px] font-bold tracking-[0.35em] text-muted-foreground">
                DESCRIPTION
              </div>

              <div className="space-y-5 text-sm leading-7 text-muted-foreground">
                <div className="terminal-frame p-4">
                  <p>
                    Given <span className="text-foreground">beginWord</span>,{" "}
                    <span className="text-foreground">endWord</span>, and{" "}
                    <span className="text-foreground">wordList</span>, return the length of the shortest transformation sequence.
                  </p>
                  <p className="mt-2">
                    Each move changes exactly one letter, and each intermediate word must exist in the word list.
                  </p>
                  <p className="mt-2">
                    Use BFS because the first time you reach the end word is the shortest path.
                  </p>
                </div>

                <div className="terminal-frame p-4">
                  <h2 className="mb-3 text-xl font-bold text-foreground">Example</h2>
                  <pre className="overflow-x-auto whitespace-pre-wrap text-xs leading-6 md:text-sm">
{`Input:
beginWord = "hit"
endWord = "cog"
wordList = ["hot","dot","dog","lot","log","cog"]

Output: 5

Path:
hit -> hot -> dot -> dog -> cog`}
                  </pre>
                </div>

                <div className="terminal-frame p-4">
                  <h2 className="mb-3 text-xl font-bold text-foreground">BFS Pattern</h2>
                  <ul className="list-disc space-y-2 pl-5">
                    <li>Put beginWord in the queue with distance 1</li>
                    <li>Generate every one-letter mutation</li>
                    <li>Only visit mutations that exist in wordList</li>
                    <li>Return distance when endWord is reached</li>
                  </ul>
                </div>

                <button
                  onClick={() => setShowSolution((value) => !value)}
                  className="border border-primary px-4 py-2 text-[10px] font-bold tracking-[0.25em] text-primary transition-colors hover:bg-primary hover:text-black"
                >
                  {showSolution ? "HIDE_CODE_SOLUTION" : "SHOW_CODE_SOLUTION"}
                </button>

                {showSolution ? (
                  <div className="terminal-frame p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-[10px] font-bold tracking-[0.35em] text-muted-foreground">
                        SOLUTION
                      </span>
                      <span className="text-[10px] font-bold tracking-[0.35em] text-primary">
                        {getLanguageLabel(language)}
                      </span>
                    </div>

                    <pre className="overflow-x-auto whitespace-pre text-xs leading-6 md:text-sm">
                      {SOLUTION_CODE[language]}
                    </pre>
                  </div>
                ) : null}
              </div>
            </div>
          </section>

          <section className="flex min-h-0 flex-col overflow-hidden border border-border bg-black/20">
            <div className="border-b border-border bg-black/30 px-4 py-3">
              <div className="flex flex-wrap gap-2">
                {LANGUAGES.map((item) => (
                  <button
                    key={item.key}
                    onClick={() => setLanguage(item.key)}
                    className={`border px-3 py-2 text-[10px] font-bold tracking-[0.22em] transition-colors ${
                      language === item.key
                        ? "border-primary bg-primary text-black"
                        : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid min-h-0 flex-1 border-b border-border xl:grid-cols-[minmax(0,1fr)_360px]">
              <div className="flex min-h-0 flex-col border-r border-border px-4 py-4">
                <div className="mb-3 flex items-center justify-between">
                  <div className="text-[10px] font-bold tracking-[0.35em] text-muted-foreground">
                    CODE EDITOR
                  </div>

                  <button
                    onClick={loadSolution}
                    className="border border-border px-3 py-1.5 text-[10px] font-bold tracking-[0.22em] text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    LOAD SOLUTION
                  </button>
                </div>

                <div className="terminal-frame min-h-0 flex-1 overflow-hidden p-4">
                  <textarea
                    value={editorCode[language]}
                    onChange={(event) =>
                      setEditorCode((previous) => ({
                        ...previous,
                        [language]: event.target.value,
                      }))
                    }
                    spellCheck={false}
                    className="h-full w-full resize-none overflow-auto bg-transparent font-mono text-[13px] leading-6 text-foreground outline-none selection:bg-primary selection:text-black"
                  />
                </div>
              </div>

              <aside className="flex min-h-0 flex-col px-4 py-4">
                <div className="mb-3 text-[10px] font-bold tracking-[0.35em] text-muted-foreground">
                  TESTCASES
                </div>

                <div className="min-h-0 flex-1 space-y-3 overflow-y-auto pr-1">
                  {TEST_CASES.map((test) => (
                    <button
                      key={test.id}
                      onClick={() => setSelectedCaseId(test.id)}
                      className={`block w-full border p-3 text-left transition-colors ${
                        selectedCaseId === test.id
                          ? "border-primary bg-primary/10"
                          : "border-border hover:border-primary"
                      }`}
                    >
                      <div className="mb-2 text-[10px] font-bold tracking-[0.3em] text-muted-foreground">
                        CASE {test.id}
                      </div>

                      <div className="text-xs leading-5 text-muted-foreground">
                        <p className="text-foreground">beginWord: {test.beginWord}</p>
                        <p className="text-foreground">endWord: {test.endWord}</p>
                        <p className="mt-2 text-foreground">wordList:</p>
                        <p className="break-all">{JSON.stringify(test.wordList)}</p>
                        <p className="mt-2 text-foreground">expected: {test.expected}</p>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-3 grid grid-cols-2 gap-3">
                  <button
                    onClick={runSelectedCase}
                    className="border border-primary bg-primary px-4 py-3 text-[10px] font-bold tracking-[0.25em] text-black transition-opacity hover:opacity-90"
                  >
                    RUN
                  </button>

                  <button
                    onClick={submitAllCases}
                    className="border border-border px-4 py-3 text-[10px] font-bold tracking-[0.25em] text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    SUBMIT
                  </button>
                </div>

                <div className="terminal-frame mt-3 p-3 text-xs leading-6 text-muted-foreground">
                  JavaScript runs real local tests. Other languages are editable previews.
                </div>
              </aside>
            </div>

            <div className="grid h-[210px] flex-none xl:grid-cols-2">
              <div className="border-r border-border px-4 py-4">
                <div className="mb-3 text-[10px] font-bold tracking-[0.35em] text-muted-foreground">
                  CONSOLE
                </div>

                <div className="terminal-frame h-[150px] overflow-auto p-3">
                  <pre className="whitespace-pre-wrap break-words text-xs leading-6">{consoleOutput}</pre>
                </div>
              </div>

              <div className="px-4 py-4">
                <div className="mb-3 text-[10px] font-bold tracking-[0.35em] text-muted-foreground">
                  RESULT
                </div>

                <div className="terminal-frame h-[150px] overflow-auto p-3 text-xs leading-6 text-muted-foreground">
                  <p>{resultText}</p>
                  <p className="mt-3">Expected approach: BFS shortest path</p>
                  <p>Time: O(N × L × 26)</p>
                  <p>Space: O(N)</p>
                  <p className="mt-3">Current testcase: Case {selectedCaseId}</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
