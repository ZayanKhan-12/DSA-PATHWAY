"use client";

import { useEffect } from "react";

const PRACTICE_ROUTES = [
  {
    title: "Reverse Linked List",
    description: "Canonical pointer-rewiring problem",
    route: "/practice/linked-list/reverse-linked-list",
  },
  {
    title: "Linked List Cycle",
    description: "Fast/slow pointers",
    route: "/practice/linked-list/linked-list-cycle",
  },
  {
    title: "Merge Two Sorted Lists",
    description: "Pointer stitching",
    route: "/practice/linked-list/merge-two-sorted-lists",
  },
  {
    title: "Remove Nth Node From End",
    description: "Two-pointer gap technique",
    route: "/practice/linked-list/remove-nth-node-from-end",
  },
  {
    title: "Middle of the Linked List",
    description: "Fast/slow midpoint",
    route: "/practice/linked-list/middle-of-the-linked-list",
  },
  {
    title: "Reorder List",
    description: "Find middle + reverse + merge",
    route: "/practice/linked-list/reorder-list",
  },
];

export default function ClickablePracticeCardWiring() {
  useEffect(() => {
    const wireCards = () => {
      const cards = Array.from(
        document.querySelectorAll<HTMLElement>(".terminal-frame, .border")
      );

      for (const item of PRACTICE_ROUTES) {
        const target = cards.find((card) => {
          const text = (card.textContent || "").replace(/\s+/g, " ").trim();
          return text.includes(item.title) && text.includes(item.description);
        });

        if (!target) continue;
        if (target.dataset.practiceCardWired === item.title) continue;

        target.dataset.practiceCardWired = item.title;
        target.style.cursor = "pointer";
        target.setAttribute("role", "link");
        target.setAttribute("tabindex", "0");

        target.classList.add(
          "block",
          "transition-colors",
          "hover:border-primary",
          "hover:bg-primary/5"
        );

        target.addEventListener("click", () => {
          window.location.href = item.route;
        });

        target.addEventListener("keydown", (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            window.location.href = item.route;
          }
        });
      }
    };

    wireCards();

    const timers = [150, 400, 900, 1600].map((ms) =>
      window.setTimeout(wireCards, ms)
    );

    return () => {
      timers.forEach(window.clearTimeout);
    };
  }, []);

  return null;
}
