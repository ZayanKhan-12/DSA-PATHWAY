"use client";

import { useEffect } from "react";

type TocItem = {
  numberLabel: string;
  plainLabel: string;
  ids: string[];
};

const TOC_ITEMS: TocItem[] = [
  {
    numberLabel: "01 Root Problem",
    plainLabel: "Root Problem",
    ids: ["root", "root-problem"],
  },
  {
    numberLabel: "02 Core Idea",
    plainLabel: "Core Idea",
    ids: ["core", "core-idea"],
  },
  {
    numberLabel: "03 Intuition",
    plainLabel: "Intuition",
    ids: ["intuition"],
  },
  {
    numberLabel: "04 Step-by-Step Example",
    plainLabel: "Step-by-Step Example",
    ids: ["example", "step-by-step-example", "step-by-step"],
  },
  {
    numberLabel: "05 Code Implementation",
    plainLabel: "Code Implementation",
    ids: ["code", "implementation", "code-implementation"],
  },
  {
    numberLabel: "06 Time Complexity",
    plainLabel: "Time Complexity",
    ids: ["complexity", "time-complexity"],
  },
  {
    numberLabel: "07 Real-World Uses",
    plainLabel: "Real-World Uses",
    ids: ["uses", "real-world-uses", "real-world"],
  },
  {
    numberLabel: "08 Practice Problems",
    plainLabel: "Practice Problems",
    ids: ["practice", "practice-problems"],
  },
];

function normalize(value: string) {
  return value.replace(/\s+/g, " ").trim().toLowerCase();
}

function countTocLabels(text: string) {
  const clean = normalize(text);

  return TOC_ITEMS.filter((item) => {
    return clean.includes(normalize(item.plainLabel));
  }).length;
}

function getTarget(item: TocItem) {
  for (const id of item.ids) {
    const target = document.getElementById(id);

    if (target) {
      target.style.scrollMarginTop = "96px";
      return target;
    }
  }

  const headings = Array.from(
    document.querySelectorAll<HTMLElement>("h1, h2, h3, h4, [data-section-title]")
  );

  const heading = headings.find((node) => {
    return normalize(node.textContent || "") === normalize(item.plainLabel);
  });

  if (!heading) return null;

  let current: HTMLElement | null = heading;

  for (let depth = 0; depth < 8 && current; depth++) {
    const tag = current.tagName.toLowerCase();
    const text = current.textContent || "";

    if (
      tag === "section" ||
      current.getAttribute("class")?.includes("section") ||
      current.getAttribute("class")?.includes("terminal-frame")
    ) {
      if (countTocLabels(text) <= 1) {
        current.id = item.ids[0];
        current.style.scrollMarginTop = "96px";
        return current;
      }
    }

    current = current.parentElement;
  }

  heading.id = item.ids[0];
  heading.style.scrollMarginTop = "96px";
  return heading;
}

function findClickableTocNode(item: TocItem) {
  const wantedNumber = normalize(item.numberLabel);
  const wantedPlain = normalize(item.plainLabel);

  const nodes = Array.from(
    document.querySelectorAll<HTMLElement>("a, button, li, p, span, div")
  );

  const exactMatches = nodes.filter((node) => {
    const text = normalize(node.textContent || "");

    return text === wantedNumber || text === wantedPlain;
  });

  if (exactMatches.length === 0) return null;

  exactMatches.sort((a, b) => {
    const aText = normalize(a.textContent || "");
    const bText = normalize(b.textContent || "");

    return aText.length - bText.length;
  });

  return exactMatches[0];
}

function routeToItem(item: TocItem) {
  const target = getTarget(item);

  if (!target) return;

  window.history.pushState(null, "", `#${target.id}`);

  target.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

function wireToc() {
  for (const item of TOC_ITEMS) {
    const node = findClickableTocNode(item);

    if (!node) continue;

    node.style.cursor = "pointer";
    node.setAttribute("role", "link");
    node.setAttribute("tabindex", "0");
    node.setAttribute("aria-label", `Go to ${item.plainLabel}`);

    node.classList.add("transition-colors", "hover:text-primary");

    node.onclick = (event) => {
      event.preventDefault();
      event.stopPropagation();
      routeToItem(item);
    };

    node.onkeydown = (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        event.stopPropagation();
        routeToItem(item);
      }
    };
  }
}

export default function LessonTocSectionRouter() {
  useEffect(() => {
    wireToc();

    if (window.location.hash) {
      const hash = window.location.hash.replace("#", "");
      const item = TOC_ITEMS.find((tocItem) => tocItem.ids.includes(hash));

      if (item) {
        window.setTimeout(() => routeToItem(item), 250);
      }
    }

    const observer = new MutationObserver(() => {
      wireToc();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    const timers = [100, 300, 700, 1200, 1800, 2500].map((ms) =>
      window.setTimeout(wireToc, ms)
    );

    return () => {
      observer.disconnect();
      timers.forEach(window.clearTimeout);
    };
  }, []);

  return null;
}
