"use client";

import Link from "next/link";
import { useState } from "react";

const codeByLanguage = {
  TypeScript: `class ListNode {
  val: number;
  next: ListNode | null;

  constructor(val: number, next: ListNode | null = null) {
    this.val = val;
    this.next = next;
  }
}

function reverseList(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null;
  let current: ListNode | null = head;

  while (current !== null) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }

  return prev;
}`,
  JavaScript: `function reverseList(head) {
  let prev = null;
  let current = head;

  while (current !== null) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }

  return prev;
}`,
  Python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverse_list(head):
    prev = None
    current = head

    while current is not None:
        nxt = current.next
        current.next = prev
        prev = current
        current = nxt

    return prev`,
  Java: `class ListNode {
    int val;
    ListNode next;

    ListNode(int val) {
        this.val = val;
    }
}

class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode current = head;

        while (current != null) {
            ListNode next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }

        return prev;
    }
}`,
  "C++": `struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

ListNode* reverseList(ListNode* head) {
    ListNode* prev = nullptr;
    ListNode* current = head;

    while (current != nullptr) {
        ListNode* next = current->next;
        current->next = prev;
        prev = current;
        current = next;
    }

    return prev;
}`,
  C: `typedef struct ListNode {
    int val;
    struct ListNode* next;
} ListNode;

ListNode* reverseList(ListNode* head) {
    ListNode* prev = NULL;
    ListNode* current = head;

    while (current != NULL) {
        ListNode* next = current->next;
        current->next = prev;
        prev = current;
        current = next;
    }

    return prev;
}`,
  Go: `type ListNode struct {
    Val  int
    Next *ListNode
}

func reverseList(head *ListNode) *ListNode {
    var prev *ListNode = nil
    current := head

    for current != nil {
        next := current.Next
        current.Next = prev
        prev = current
        current = next
    }

    return prev
}`,
  Rust: `// Usually handled with Option<Box<ListNode>>
// Core iterative idea:
let mut prev = None;
let mut current = head;

while let Some(mut node) = current {
    let next = node.next.take();
    node.next = prev;
    prev = Some(node);
    current = next;
}`,
  Kotlin: `class ListNode(var val: Int) {
    var next: ListNode? = null
}

fun reverseList(head: ListNode?): ListNode? {
    var prev: ListNode? = null
    var current = head

    while (current != null) {
        val next = current.next
        current.next = prev
        prev = current
        current = next
    }

    return prev
}`,
  Swift: `final class ListNode {
    var val: Int
    var next: ListNode?

    init(_ val: Int, _ next: ListNode? = nil) {
        self.val = val
        self.next = next
    }
}

func reverseList(_ head: ListNode?) -> ListNode? {
    var prev: ListNode? = nil
    var current = head

    while current != nil {
        let next = current?.next
        current?.next = prev
        prev = current
        current = next
    }

    return prev
}`,
};

export default function LinkedListsLessonPage() {
  const languages = Object.keys(codeByLanguage);
  const [activeLanguage, setActiveLanguage] = useState("TypeScript");

  return (
    <main className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
        <div className="container h-14 px-4 md:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold tracking-widest text-sm">
            <span className="h-3 w-3 bg-primary shadow-[0_0_14px_hsl(var(--primary))]" />
            <span className="text-primary text-glow">DSA.ENGINE</span>
          </Link>

          <div className="flex items-center gap-6 text-[11px] uppercase tracking-[0.25em] text-muted-foreground">
            <Link href="/visualize/linked-lists" className="hover:text-primary transition-colors">
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
          learn // linked_lists — module 04
        </div>

        <h1 className="mt-2 text-4xl md:text-7xl font-extrabold leading-[0.95]">
          Linked Lists
          <br />
          <span className="text-primary text-glow">From Pointer Flow.</span>
        </h1>

        <p className="mt-5 max-w-4xl text-sm md:text-lg text-muted-foreground leading-relaxed">
          Arrays give you direct indexing. Linked lists give you pointer movement.
          You stop asking, “What is at index i?” and start asking, “Where does this node point next?”
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/visualize/linked-lists"
            className="border-2 border-primary bg-primary px-5 py-3 text-sm font-bold tracking-[0.25em] text-black hover:opacity-90"
          >
            ▶ OPEN_VISUALIZER
          </Link>

          <Link
            href="/"
            className="border-2 border-border px-5 py-3 text-sm font-bold tracking-[0.25em] text-foreground hover:border-primary hover:text-primary transition-colors"
          >
            $ BACK_TO_HOME
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-[300px_minmax(0,920px)] gap-8 items-start">
          <aside className="terminal-frame p-5 h-fit lg:sticky lg:top-24">
            <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              ./table_of_contents
            </div>

            <div className="mt-5 space-y-4 text-sm">
              <a href="#root-problem" className="block hover:text-primary">01 Root Problem</a>
              <a href="#core-idea" className="block hover:text-primary">02 Core Idea</a>
              <a href="#pointer-model" className="block hover:text-primary">03 Pointer Model</a>
              <a href="#reversal" className="block hover:text-primary">04 Reversal Walkthrough</a>
              <a href="#code" className="block hover:text-primary">05 Code Implementation</a>
              <a href="#complexity" className="block hover:text-primary">06 Time Complexity</a>
              <a href="#real-world" className="block hover:text-primary">07 Real-World Uses</a>
              <a href="#practice" className="block hover:text-primary">08 Practice Problems</a>
            </div>

            <Link
              href="/visualize/linked-lists"
              className="mt-6 block border border-primary bg-primary/10 px-4 py-3 text-center text-xs font-bold tracking-[0.25em] text-primary hover:bg-primary hover:text-black"
            >
              ▶ OPEN VISUALIZER
            </Link>
          </aside>

          <div className="space-y-14 max-w-[920px]">
            <section id="root-problem">
              <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">01 // root_problem</div>
              <h2 className="mt-2 text-3xl md:text-5xl font-bold">$ The Root Problem</h2>
              <div className="mt-5 terminal-frame p-5 md:p-6 text-muted-foreground leading-relaxed">
                In linked-list questions, the structure is not stored contiguously. You cannot jump by index.
                Every move depends on following pointers. That changes how you think.
                <div className="mt-5 border border-border bg-background/60 p-4">
                  <div className="text-foreground font-bold mb-3">Core questions:</div>
                  <div className="space-y-2">
                    <div>• Where am I now?</div>
                    <div>• What node comes next?</div>
                    <div>• What pointer am I about to lose?</div>
                    <div>• What should this node point to after the operation?</div>
                  </div>
                </div>
              </div>
            </section>

            <section id="core-idea">
              <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">02 // core_idea</div>
              <h2 className="mt-2 text-3xl md:text-5xl font-bold">$ Core Idea</h2>
              <div className="mt-5 terminal-frame p-5 md:p-6 text-muted-foreground leading-relaxed">
                A linked list is a sequence of nodes. Each node stores:
                <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-border bg-background/60 p-4">
                    <div className="font-bold text-foreground">value</div>
                    <div className="mt-2">The data stored at this node.</div>
                  </div>
                  <div className="border border-border bg-background/60 p-4">
                    <div className="font-bold text-foreground">next</div>
                    <div className="mt-2">A pointer to the next node, or null if the list ends.</div>
                  </div>
                </div>
              </div>
            </section>

            <section id="pointer-model">
              <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">03 // pointer_model</div>
              <h2 className="mt-2 text-3xl md:text-5xl font-bold">$ Pointer Mental Model</h2>
              <div className="mt-5 terminal-frame p-5 md:p-6 text-muted-foreground leading-relaxed">
                The single most important linked-list rule:
                <div className="mt-4 border border-primary bg-primary/10 p-4 text-primary font-bold">
                  Never overwrite a pointer you still need.
                </div>

                <div className="mt-5">
                  For reversal, that is why we save the next node before rewiring:
                </div>

                <pre className="mt-4 border border-border bg-background/60 p-4 overflow-x-auto text-sm text-foreground">
{`next = current.next
current.next = prev
prev = current
current = next`}
                </pre>

                <div className="mt-5">
                  If you skip storing <span className="text-foreground font-bold">next</span>, the rest of the list becomes unreachable
                  the moment you reverse <span className="text-foreground font-bold">current.next</span>.
                </div>
              </div>
            </section>

            <section id="reversal">
              <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">04 // reversal_walkthrough</div>
              <h2 className="mt-2 text-3xl md:text-5xl font-bold">$ Reversal Walkthrough</h2>
              <div className="mt-5 terminal-frame p-5 md:p-6 text-muted-foreground leading-relaxed">
                <div>Suppose the list is:</div>
                <pre className="mt-4 border border-border bg-background/60 p-4 text-sm text-foreground">
{`3 -> 7 -> 11 -> 19 -> null`}
                </pre>

                <div className="mt-5">We begin with:</div>
                <pre className="mt-4 border border-border bg-background/60 p-4 text-sm text-foreground">
{`prev = null
current = head`}
                </pre>

                <div className="mt-5">For each node:</div>
                <ol className="mt-4 space-y-3 list-decimal pl-6">
                  <li>save next</li>
                  <li>reverse current.next</li>
                  <li>advance prev</li>
                  <li>advance current</li>
                </ol>

                <div className="mt-5 border-l-2 border-primary pl-4 text-foreground">
                  When current becomes null, prev is the new head.
                </div>
              </div>
            </section>

            <section id="code">
              <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">05 // code</div>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold">$ Code Implementation</h2>

              <div className="mt-5 space-y-4">
                <div className="overflow-x-auto">
                  <div className="flex min-w-max gap-2 pb-1">
                    {languages.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setActiveLanguage(lang)}
                        className={`px-4 py-3 text-xs md:text-sm font-bold tracking-[0.06em] border transition-colors ${
                          activeLanguage === lang
                            ? "border-primary bg-primary text-black"
                            : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                        }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="terminal-frame p-3 md:p-4">
                  <div className="text-lg font-bold text-primary">{activeLanguage}</div>
                  <pre className="mt-3 border border-border bg-background/60 p-3 md:p-4 overflow-x-auto text-[13px] text-foreground whitespace-pre-wrap leading-7">
{codeByLanguage[activeLanguage as keyof typeof codeByLanguage]}
                  </pre>
                </div>
              </div>
            </section>

            <section id="complexity">
              <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">06 // complexity</div>
              <h2 className="mt-2 text-3xl md:text-4xl font-bold">$ Time Complexity</h2>

              <div className="mt-5 space-y-4">
                <div className="terminal-frame p-4 md:p-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-border bg-background/60 p-4">
                      <div className="text-foreground font-bold">Time</div>
                      <div className="mt-2 text-2xl font-bold text-primary">O(n)</div>
                    </div>
                    <div className="border border-border bg-background/60 p-4">
                      <div className="text-foreground font-bold">Space</div>
                      <div className="mt-2 text-2xl font-bold text-primary">O(1)</div>
                    </div>
                  </div>
                </div>

                <div className="terminal-frame p-4 md:p-5 text-muted-foreground leading-relaxed">
                  <div className="text-foreground font-bold text-lg">Why time is O(n)</div>

                  <div className="mt-4 border border-border bg-background/60 p-4">
                    Let <span className="text-primary font-bold">n</span> be the number of nodes in the list.
                    The algorithm walks through the list once from head to null.
                  </div>

                  <div className="mt-4 space-y-4">
                    <div className="border border-border bg-background/60 p-4">
                      <div className="font-bold text-foreground">1. Each loop iteration handles exactly one node</div>
                      <div className="mt-2">
                        In each pass of the while loop, <span className="text-foreground font-bold">current</span> points to one node.
                        After processing it, <span className="text-foreground font-bold">current</span> moves to the saved next node.
                        So no node is processed twice.
                      </div>
                    </div>

                    <div className="border border-border bg-background/60 p-4">
                      <div className="font-bold text-foreground">2. Work per node is constant</div>
                      <div className="mt-2">
                        For each node, we do only a fixed number of operations:
                      </div>
                      <pre className="mt-3 border border-border bg-background p-4 overflow-x-auto text-sm text-foreground">
{`next = current.next
current.next = prev
prev = current
current = next`}
                      </pre>
                      <div className="mt-3">
                        That is constant work, so each node contributes <span className="text-primary font-bold">O(1)</span>.
                      </div>
                    </div>

                    <div className="border border-border bg-background/60 p-4">
                      <div className="font-bold text-foreground">3. Total work</div>
                      <div className="mt-2">
                        Since there are <span className="text-primary font-bold">n</span> nodes and each node costs
                        <span className="text-primary font-bold"> O(1)</span> work:
                      </div>
                      <pre className="mt-3 border border-border bg-background p-4 overflow-x-auto text-sm text-foreground">
{`T(n) = n * O(1) = O(n)`}
                      </pre>
                    </div>
                  </div>
                </div>

                <div className="terminal-frame p-4 md:p-5 text-muted-foreground leading-relaxed">
                  <div className="text-foreground font-bold text-lg">Why space is O(1)</div>

                  <div className="mt-4 border border-border bg-background/60 p-4">
                    We do not allocate another list, array, stack, or hash map.
                    We only keep a few pointer variables:
                  </div>

                  <pre className="mt-4 border border-border bg-background p-4 overflow-x-auto text-sm text-foreground">
{`prev
current
next`}
                  </pre>

                  <div className="mt-4">
                    That number does not grow with input size, so the extra space remains
                    <span className="text-primary font-bold"> O(1)</span>.
                  </div>
                </div>

                <div className="terminal-frame p-4 md:p-5 text-muted-foreground leading-relaxed">
                  <div className="text-foreground font-bold text-lg">Exam shortcut</div>
                  <div className="mt-4 border-l-2 border-primary pl-4 text-foreground">
                    One pass through n nodes, constant pointer work per node, constant extra memory.
                    Therefore reversal runs in <span className="text-primary font-bold">O(n)</span> time and
                    <span className="text-primary font-bold"> O(1)</span> extra space.
                  </div>
                </div>
              </div>
            </section>

            <section id="real-world">
              <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">07 // real_world</div>
              <h2 className="mt-2 text-3xl md:text-5xl font-bold">$ Real-World Uses</h2>
              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  ["Browser History", "Back/forward navigation can be modeled by pointer movement between nodes."],
                  ["LRU Cache", "Hash map + doubly linked list is a classic production design."],
                  ["Music Playlists", "Next / previous track behavior matches linked traversal."],
                  ["Memory Allocators", "Free lists often rely on linked structures."],
                  ["Undo Systems", "State transitions can be connected as nodes in a chain."],
                  ["Task Pipelines", "Jobs can be passed through sequential node links."],
                ].map(([title, desc]) => (
                  <div key={title} className="terminal-frame p-4 md:p-5">
                    <div className="font-bold text-foreground">{title}</div>
                    <div className="mt-2 text-muted-foreground">{desc}</div>
                  </div>
                ))}
              </div>
            </section>

            <section id="practice">
              <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">08 // practice</div>
              <h2 className="mt-2 text-3xl md:text-5xl font-bold">$ Practice Problems</h2>
              <div className="mt-5 grid grid-cols-1 gap-4">
                {[
                  ["Reverse Linked List", "Canonical pointer-rewiring problem."],
                  ["Linked List Cycle", "Fast/slow pointers."],
                  ["Merge Two Sorted Lists", "Pointer stitching."],
                  ["Remove Nth Node From End", "Two-pointer gap technique."],
                  ["Middle of the Linked List", "Fast/slow midpoint."],
                  ["Reorder List", "Find middle + reverse + merge."],
                ].map(([title, desc]) => (
                  <div key={title} className="terminal-frame p-4 md:p-5">
                    <div className="font-bold text-foreground">{title}</div>
                    <div className="mt-2 text-muted-foreground">{desc}</div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">09 // next_module</div>
              <h2 className="mt-2 text-3xl md:text-5xl font-bold">
                Next up: <span className="text-primary text-glow">Trees</span>
              </h2>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href="/"
                  className="border-2 border-primary bg-primary px-5 py-3 text-sm font-bold tracking-[0.25em] text-black hover:opacity-90"
                >
                  ▶ BACK_TO_CURRICULUM
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
