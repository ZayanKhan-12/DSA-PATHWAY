"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";

type TocItem = {
  id: string;
  num: string;
  label: string;
};

type CodeExample = {
  language: string;
  code: string;
};

const toc: TocItem[] = [
  { id: "root-problem", num: "01", label: "Root Problem" },
  { id: "core-idea", num: "02", label: "Core Idea" },
  { id: "intuition", num: "03", label: "Intuition" },
  { id: "walkthrough", num: "04", label: "Step-by-Step Example" },
  { id: "code", num: "05", label: "Code Implementation" },
  { id: "complexity", num: "06", label: "Time Complexity" },
  { id: "real-world", num: "07", label: "Real-World Uses" },
  { id: "practice", num: "08", label: "Practice Problems" },
];

const codeExamples: CodeExample[] = [
  {
    language: "TypeScript",
    code: `function isValid(s: string): boolean {
  const stack: string[] = [];
  const pairs = new Map<string, string>([
    [")", "("],
    ["]", "["],
    ["}", "{"],
  ]);

  for (const ch of s) {
    if (ch === "(" || ch === "[" || ch === "{") {
      stack.push(ch);
    } else {
      if (stack.length === 0 || stack[stack.length - 1] !== pairs.get(ch)) {
        return false;
      }
      stack.pop();
    }
  }

  return stack.length === 0;
}`,
  },
  {
    language: "JavaScript",
    code: `function isValid(s) {
  const stack = [];
  const pairs = new Map([
    [")", "("],
    ["]", "["],
    ["}", "{"],
  ]);

  for (const ch of s) {
    if (ch === "(" || ch === "[" || ch === "{") {
      stack.push(ch);
    } else {
      if (stack.length === 0 || stack[stack.length - 1] !== pairs.get(ch)) {
        return false;
      }
      stack.pop();
    }
  }

  return stack.length === 0;
}`,
  },
  {
    language: "Python",
    code: `def is_valid(s):
    stack = []
    pairs = {
        ')': '(',
        ']': '[',
        '}': '{'
    }

    for ch in s:
        if ch in '([{':
            stack.append(ch)
        else:
            if not stack or stack[-1] != pairs[ch]:
                return False
            stack.pop()

    return len(stack) == 0`,
  },
  {
    language: "Java",
    code: `import java.util.*;

public class StackQueue {
    public static boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        Map<Character, Character> pairs = new HashMap<>();
        pairs.put(')', '(');
        pairs.put(']', '[');
        pairs.put('}', '{');

        for (char ch : s.toCharArray()) {
            if (ch == '(' || ch == '[' || ch == '{') {
                stack.push(ch);
            } else {
                if (stack.isEmpty() || stack.peek() != pairs.get(ch)) {
                    return false;
                }
                stack.pop();
            }
        }

        return stack.isEmpty();
    }
}`,
  },
  {
    language: "C++",
    code: `#include <stack>
#include <unordered_map>
#include <string>
using namespace std;

bool isValid(string s) {
    stack<char> st;
    unordered_map<char, char> pairs = {
        {')', '('},
        {']', '['},
        {'}', '{'}
    };

    for (char ch : s) {
        if (ch == '(' || ch == '[' || ch == '{') {
            st.push(ch);
        } else {
            if (st.empty() || st.top() != pairs[ch]) {
                return false;
            }
            st.pop();
        }
    }

    return st.empty();
}`,
  },
  {
    language: "C#",
    code: `using System.Collections.Generic;

public class StackQueue {
    public static bool IsValid(string s) {
        Stack<char> stack = new Stack<char>();
        Dictionary<char, char> pairs = new Dictionary<char, char> {
            { ')', '(' },
            { ']', '[' },
            { '}', '{' }
        };

        foreach (char ch in s) {
            if (ch == '(' || ch == '[' || ch == '{') {
                stack.Push(ch);
            } else {
                if (stack.Count == 0 || stack.Peek() != pairs[ch]) {
                    return false;
                }
                stack.Pop();
            }
        }

        return stack.Count == 0;
    }
}`,
  },
  {
    language: "Go",
    code: `func IsValid(s string) bool {
    stack := []rune{}
    pairs := map[rune]rune{
        ')': '(',
        ']': '[',
        '}': '{',
    }

    for _, ch := range s {
        if ch == '(' || ch == '[' || ch == '{' {
            stack = append(stack, ch)
        } else {
            if len(stack) == 0 || stack[len(stack)-1] != pairs[ch] {
                return false
            }
            stack = stack[:len(stack)-1]
        }
    }

    return len(stack) == 0
}`,
  },
  {
    language: "Rust",
    code: `use std::collections::HashMap;

fn is_valid(s: String) -> bool {
    let mut stack: Vec<char> = Vec::new();
    let pairs: HashMap<char, char> = HashMap::from([
        (')', '('),
        (']', '['),
        ('}', '{'),
    ]);

    for ch in s.chars() {
        if ch == '(' || ch == '[' || ch == '{' {
            stack.push(ch);
        } else {
            if stack.is_empty() || *stack.last().unwrap() != pairs[&ch] {
                return false;
            }
            stack.pop();
        }
    }

    stack.is_empty()
}`,
  },
  {
    language: "Kotlin",
    code: `fun isValid(s: String): Boolean {
    val stack = mutableListOf<Char>()
    val pairs = mapOf(
        ')' to '(',
        ']' to '[',
        '}' to '{'
    )

    for (ch in s) {
        if (ch == '(' || ch == '[' || ch == '{') {
            stack.add(ch)
        } else {
            if (stack.isEmpty() || stack.last() != pairs[ch]) {
                return false
            }
            stack.removeAt(stack.size - 1)
        }
    }

    return stack.isEmpty()
}`,
  },
  {
    language: "Swift",
    code: `func isValid(_ s: String) -> Bool {
    var stack: [Character] = []
    let pairs: [Character: Character] = [
        ")": "(",
        "]": "[",
        "}": "{"
    ]

    for ch in s {
        if ch == "(" || ch == "[" || ch == "{" {
            stack.append(ch)
        } else {
            if stack.isEmpty || stack.last! != pairs[ch]! {
                return false
            }
            stack.removeLast()
        }
    }

    return stack.isEmpty
}`,
  },
];

function Section({
  id,
  num,
  title,
  children,
}: {
  id: string;
  num: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="border-b border-border py-14 scroll-mt-24">
      <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
        {num} // {id.replaceAll("-", "_")}
      </div>

      <h2 className="mt-3 text-3xl md:text-4xl font-bold leading-tight">
        <span className="text-primary text-glow">$</span> {title}
      </h2>

      <div className="mt-5 text-sm md:text-[15px] text-muted-foreground leading-relaxed space-y-4 max-w-4xl">
        {children}
      </div>
    </section>
  );
}

export default function LearnStackQueuePage() {
  const [selectedLanguage, setSelectedLanguage] = useState("TypeScript");

  const currentCode =
    codeExamples.find((item) => item.language === selectedLanguage)?.code ??
    codeExamples[0].code;

  return (
    <main className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
        <div className="container px-4 md:px-8 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold tracking-widest text-sm">
            <span className="h-3 w-3 bg-primary shadow-[0_0_14px_hsl(var(--primary))]" />
            <span className="text-primary text-glow">DSA.ENGINE</span>
          </Link>

          <div className="flex items-center gap-6 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            <Link href="/visualize/stack-queue" className="hover:text-primary transition-colors">
              // visualizer
            </Link>
            <Link href="/" className="hover:text-primary transition-colors">
              // home
            </Link>
          </div>
        </div>
      </header>

      <div className="container px-4 md:px-8 py-12 md:py-16">
        <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          learn // stack_queue · module 03
        </div>

        <h1 className="mt-2 text-4xl md:text-6xl font-extrabold leading-[0.95]">
          Stack &
          <br />
          <span className="text-primary text-glow">Queue.</span>
        </h1>

        <p className="mt-5 max-w-3xl text-sm md:text-base text-muted-foreground leading-relaxed">
          Stacks and queues are not just data structures — they are execution models.
          A stack gives you <span className="text-foreground">last in, first out</span>.
          A queue gives you <span className="text-foreground">first in, first out</span>.
          Once you recognize which processing order the problem needs, many questions become mechanical.
        </p>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
          <aside className="terminal-frame p-4 h-fit lg:sticky lg:top-20">
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
              ./table_of_contents
            </div>

            <div className="space-y-3">
              {toc.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <span className="text-primary font-bold">{item.num}</span>
                  <span>{item.label}</span>
                </a>
              ))}
            </div>

            <Link
              href="/visualize/stack-queue"
              className="mt-6 inline-flex items-center justify-center w-full border border-primary px-4 py-3 text-xs font-bold tracking-[0.25em] text-primary hover:bg-primary hover:text-black transition-colors"
            >
              ▶ OPEN_VISUALIZER
            </Link>
          </aside>

          <div>
            <Section id="root-problem" num="01" title="The Root Problem">
              <p>
                Many problems are really about processing order:
              </p>
              <p>▸ most recently opened thing closes first</p>
              <p>▸ earliest inserted thing gets processed first</p>
              <p>▸ nested structure must unwind in reverse order</p>
              <p>▸ layered traversal must expand level by level</p>
              <div className="terminal-frame p-4">
                <p className="text-foreground font-semibold">Main question:</p>
                <p className="mt-2">
                  Does this problem want reverse unwinding, or fair arrival order?
                </p>
              </div>
            </Section>

            <Section id="core-idea" num="02" title="Core Idea">
              <div className="terminal-frame p-4">
                <p>Stack → <span className="text-primary">LIFO</span> → last in, first out</p>
                <p>Queue → <span className="text-primary">FIFO</span> → first in, first out</p>
              </div>

              <p>
                Use a stack when the newest unresolved thing must be handled first.
                Use a queue when work should be processed in arrival order.
              </p>

              <p>
                Stack patterns:
              </p>
              <p>▸ parentheses / bracket validation</p>
              <p>▸ monotonic stack</p>
              <p>▸ expression parsing</p>
              <p>▸ undo / backtracking style state</p>

              <p>
                Queue patterns:
              </p>
              <p>▸ BFS traversal</p>
              <p>▸ scheduling</p>
              <p>▸ level-order processing</p>
              <p>▸ shortest path in unweighted graphs</p>
            </Section>

            <Section id="intuition" num="03" title="Intuition">
              <p>
                Stack is like a pile of trays:
                the last tray placed on top is the first one you can remove.
              </p>

              <p>
                Queue is like a line:
                the first person who entered is served first.
              </p>

              <div className="terminal-frame p-4">
                <p><span className="text-primary font-semibold">stack.push()</span> → add to top</p>
                <p><span className="text-primary font-semibold">stack.pop()</span> → remove from top</p>
                <p><span className="text-primary font-semibold">queue.push()</span> → add to back</p>
                <p><span className="text-primary font-semibold">queue.pop/front</span> → remove from front</p>
              </div>

              <p>
                In bracket matching, the most recent opener is the only one the next closer is allowed to match.
                That is why stack is the correct structure.
              </p>
            </Section>

            <Section id="walkthrough" num="04" title="Step-by-Step Example">
              <p>
                Classic example: <span className="text-foreground">Valid Parentheses</span>
              </p>

              <div className="terminal-frame overflow-x-auto p-4 text-[12px] md:text-xs leading-relaxed text-foreground">
                <pre>{`s = "([]){}"`}</pre>
              </div>

              <p>Walkthrough:</p>

              <div className="terminal-frame overflow-x-auto p-4 text-[12px] md:text-xs leading-relaxed text-foreground">
                <pre>{`read '(' -> push '('       stack = ['(']
read '[' -> push '['       stack = ['(', '[']
read ']' -> matches '['    stack = ['(']
read ')' -> matches '('    stack = []
read '{' -> push '{'       stack = ['{']
read '}' -> matches '{'    stack = []

end of input and stack empty -> valid`}</pre>
              </div>

              <p>
                Why stack works:
                every closer must match the most recent unmatched opener.
              </p>
            </Section>

            <Section id="code" num="05" title="Code Implementation">
              <p>
                Below is the same stack logic across 10 languages using Valid Parentheses.
              </p>

              <div className="terminal-frame p-4">
                <p>1. Push every opener</p>
                <p>2. On closer, check top of stack</p>
                <p>3. If mismatch or empty stack → invalid</p>
                <p>4. If stack is empty at the end → valid</p>
              </div>

              <div className="flex flex-wrap gap-2">
                {codeExamples.map((item) => (
                  <button
                    key={item.language}
                    onClick={() => setSelectedLanguage(item.language)}
                    className={`px-4 py-2 text-xs md:text-sm border tracking-wide font-semibold transition-colors ${
                      selectedLanguage === item.language
                        ? "bg-primary text-black border-primary"
                        : "border-border text-muted-foreground hover:text-primary hover:border-primary"
                    }`}
                  >
                    {item.language}
                  </button>
                ))}
              </div>

              <div className="terminal-frame overflow-x-auto p-4 text-[12px] md:text-xs leading-relaxed text-foreground">
                <pre className="whitespace-pre">{currentCode}</pre>
              </div>

              <div className="space-y-3">
                <p className="text-foreground font-semibold">What matters in the code:</p>
                <p>▸ Openers get pushed</p>
                <p>▸ Closers never get pushed</p>
                <p>▸ Closers validate against the current stack top</p>
                <p>▸ Empty stack at the wrong time means invalid structure</p>
                <p>▸ Non-empty stack at the end means unresolved openers remain</p>
              </div>
            </Section>

            <Section id="complexity" num="06" title="Time Complexity">
              <div className="terminal-frame overflow-x-auto p-4 text-[12px] md:text-xs leading-relaxed text-foreground">
                <pre>{`Time:  O(n)
Space: O(n)

n = length of input`}</pre>
              </div>

              <p>
                Derive it properly:
              </p>

              <div className="space-y-4">
                <div className="terminal-frame p-4">
                  <h3 className="text-base font-bold text-foreground">
                    1. We scan the input once → O(n)
                  </h3>
                  <pre className="mt-4 overflow-x-auto">{`for (const ch of s) {
  ...
}`}</pre>
                  <p className="mt-4">
                    Each character is processed one time.
                  </p>
                </div>

                <div className="terminal-frame p-4">
                  <h3 className="text-base font-bold text-foreground">
                    2. Each push/pop is O(1)
                  </h3>
                  <pre className="mt-4 overflow-x-auto">{`stack.push(ch)
stack.pop()
stack[stack.length - 1]`}</pre>
                  <p className="mt-4">
                    These operations all take constant time.
                  </p>
                </div>

                <div className="terminal-frame p-4">
                  <h3 className="text-base font-bold text-foreground">
                    3. Total work
                  </h3>
                  <pre className="mt-4 overflow-x-auto">{`n characters * O(1) work each = O(n)`}</pre>
                </div>

                <div className="terminal-frame p-4">
                  <h3 className="text-base font-bold text-foreground">
                    4. Space complexity
                  </h3>
                  <p className="mt-4">
                    In the worst case, the stack holds every opener.
                  </p>
                  <pre className="mt-4 overflow-x-auto">{`s = "(((([[[{{{" -> stack size can be n

Space = O(n)`}</pre>
                </div>
              </div>

              <div className="border-l-4 border-primary pl-5 py-2">
                <p className="text-primary font-semibold">Exam shortcut:</p>
                <p className="mt-2">
                  One pass through the input, constant-time stack operations per character,
                  so total time is <span className="text-foreground font-semibold">O(n)</span>.
                </p>
              </div>
            </Section>

            <Section id="real-world" num="07" title="Real-World Uses">
              <div className="mt-8 flex flex-col gap-4">
                {[
                  ["Expression Parsing", "Match brackets, parse operators, evaluate expressions."],
                  ["Compilers", "Track nested scopes and syntax structure."],
                  ["Undo Systems", "Most recent action is undone first."],
                  ["Browser History", "Back-stack behavior is LIFO-like."],
                  ["Task Scheduling", "Queues process work fairly in arrival order."],
                  ["Graph Traversal", "Queues drive BFS and shortest paths in unweighted graphs."],
                ].map(([title, desc]) => (
                  <div key={title} className="terminal-frame p-4">
                    <h3 className="text-sm font-bold text-foreground">{title}</h3>
                    <p className="mt-2 text-muted-foreground">{desc}</p>
                  </div>
                ))}
              </div>
            </Section>

            <Section id="practice" num="08" title="Practice Problems">
              <div className="space-y-4">
                {[
                  ["Valid Parentheses", "Pure stack matching."],
                  ["Min Stack", "Stack with augmented state."],
                  ["Evaluate Reverse Polish Notation", "Stack-based expression evaluation."],
                  ["Daily Temperatures", "Monotonic decreasing stack."],
                  ["Implement Queue using Stacks", "Bridge stack/queue models."],
                ].map(([title, desc]) => (
                  <div key={title} className="terminal-frame p-4">
                    <h3 className="text-sm font-bold text-foreground">{title}</h3>
                    <p className="mt-2 text-muted-foreground">{desc}</p>
                  </div>
                ))}
              </div>
            </Section>

            <div className="py-12">
              <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                // module_actions
              </div>

              <h2 className="mt-2 text-2xl md:text-3xl font-bold">
                Stack & Queue <span className="text-primary text-glow">Ready.</span>
              </h2>

              <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
                Open the visualizer or return home.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/visualize/stack-queue"
                  className="border-2 border-primary bg-primary px-5 py-3 text-sm font-bold tracking-[0.25em] text-black hover:opacity-90"
                >
                  ▶ OPEN_STACK_VISUALIZER
                </Link>

                <Link
                  href="/"
                  className="border-2 border-border px-5 py-3 text-sm font-bold tracking-[0.25em] text-foreground hover:border-primary hover:text-primary transition-colors"
                >
                  $ BACK_TO_HOME
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
