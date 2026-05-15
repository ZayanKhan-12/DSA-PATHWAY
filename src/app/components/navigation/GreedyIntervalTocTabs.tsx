"use client";

import { useEffect } from "react";

type TocItem = {
  label: string;
  title: string;
  id: string;
  keywords: string[];
};

const TOC_ITEMS: TocItem[] = [
  {
    label: "01 Root Problem",
    title: "Root Problem",
    id: "root",
    keywords: ["root problem"],
  },
  {
    label: "02 Core Idea",
    title: "Core Idea",
    id: "core",
    keywords: ["core idea"],
  },
  {
    label: "03 Intuition",
    title: "Intuition",
    id: "intuition",
    keywords: ["intuition"],
  },
  {
    label: "04 Step-by-Step Example",
    title: "Step-by-Step Example",
    id: "example",
    keywords: ["step-by-step example", "step by step example"],
  },
  {
    label: "05 Code Implementation",
    title: "Code Implementation",
    id: "code",
    keywords: ["code implementation"],
  },
  {
    label: "06 Time Complexity",
    title: "Time Complexity",
    id: "complexity",
    keywords: ["time complexity"],
  },
  {
    label: "07 Real-World Uses",
    title: "Real-World Uses",
    id: "uses",
    keywords: ["real-world uses", "real world uses"],
  },
  {
    label: "08 Practice Problems",
    title: "Practice Problems",
    id: "practice",
    keywords: ["practice problems"],
  },
];

function normalize(value: string) {
  return value
    .replace(/\$/g, "")
    .replace(/_/g, " ")
    .replace(/\/\//g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function stripNumber(value: string) {
  return normalize(value).replace(/^\d+\s+/, "");
}

function findTocContainer() {
  const candidates = Array.from(
    document.querySelectorAll<HTMLElement>("aside, nav, section, article, div")
  )
    .filter((element) => {
      const text = normalize(element.textContent || "");

      return (
        text.includes("table of contents") &&
        text.includes("root problem") &&
        text.includes("core idea") &&
        text.includes("practice problems")
      );
    })
    .sort((a, b) => {
      return (a.textContent || "").length - (b.textContent || "").length;
    });

  return candidates[0] ?? null;
}

function findTocRow(tocContainer: HTMLElement, item: TocItem) {
  const nodes = Array.from(
    tocContainer.querySelectorAll<HTMLElement>("a, button, li, p, span, div")
  );

  const textNode =
    nodes
      .filter((node) => {
        const text = normalize(node.textContent || "");

        if (!text) return false;
        if (text.length > 160) return false;

        return (
          text === normalize(item.label) ||
          text === normalize(item.title) ||
          stripNumber(text) === normalize(item.title) ||
          text.endsWith(normalize(item.title))
        );
      })
      .sort((a, b) => {
        return (a.textContent || "").length - (b.textContent || "").length;
      })[0] ?? null;

  if (!textNode) return null;

  let current: HTMLElement | null = textNode;

  while (current && current !== tocContainer) {
    const text = normalize(current.textContent || "");

    if (text.includes(normalize(item.title)) && text.length <= 220) {
      return current;
    }

    current = current.parentElement;
  }

  return textNode;
}

function isInsideToc(element: HTMLElement, tocContainer: HTMLElement | null) {
  return Boolean(tocContainer && tocContainer.contains(element));
}

function findSectionById(item: TocItem) {
  const ids = [
    item.id,
    `${item.id}-section`,
    `${item.id}-problem`,
    item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""),
  ];

  for (const id of ids) {
    const existing = document.getElementById(id);

    if (existing) {
      existing.style.scrollMarginTop = "110px";
      return existing as HTMLElement;
    }
  }

  return null;
}

function findSectionByHeading(item: TocItem, tocContainer: HTMLElement | null) {
  const candidates = Array.from(
    document.querySelectorAll<HTMLElement>("h1, h2, h3, h4, h5, h6, section, article, div")
  )
    .filter((element) => {
      if (isInsideToc(element, tocContainer)) return false;

      const text = normalize(element.textContent || "");

      if (!text) return false;
      if (text.includes("table of contents")) return false;
      if (text.length > 5000) return false;

      return item.keywords.some((keyword) => text.includes(normalize(keyword)));
    })
    .sort((a, b) => {
      const aText = normalize(a.textContent || "");
      const bText = normalize(b.textContent || "");

      const aExact = item.keywords.some((keyword) => aText === normalize(keyword)) ? 0 : 1;
      const bExact = item.keywords.some((keyword) => bText === normalize(keyword)) ? 0 : 1;

      if (aExact !== bExact) return aExact - bExact;

      return (a.textContent || "").length - (b.textContent || "").length;
    });

  const best = candidates[0];

  if (!best) return null;

  let current: HTMLElement | null = best;

  for (let depth = 0; depth < 8 && current; depth++) {
    const tag = current.tagName.toLowerCase();
    const text = normalize(current.textContent || "");

    if (
      (tag === "section" || tag === "article") &&
      !text.includes("table of contents") &&
      item.keywords.some((keyword) => text.includes(normalize(keyword)))
    ) {
      current.id = item.id;
      current.style.scrollMarginTop = "110px";
      return current;
    }

    current = current.parentElement;
  }

  best.id = item.id;
  best.style.scrollMarginTop = "110px";
  return best;
}

function findPracticeSection(tocContainer: HTMLElement | null) {
  const headings = Array.from(
    document.querySelectorAll<HTMLElement>("h1, h2, h3, h4, section, article, div")
  )
    .filter((element) => {
      if (isInsideToc(element, tocContainer)) return false;

      const text = normalize(element.textContent || "");

      return (
        text.includes("practice problems") &&
        !text.includes("table of contents") &&
        text.length < 5000
      );
    })
    .sort((a, b) => {
      return a.getBoundingClientRect().top - b.getBoundingClientRect().top;
    });

  const target = headings[0];

  if (!target) return null;

  target.id = "practice";
  target.style.scrollMarginTop = "110px";

  return target;
}

function getTarget(item: TocItem) {
  const tocContainer = findTocContainer();

  if (item.id === "practice") {
    return findSectionById(item) || findPracticeSection(tocContainer);
  }

  return findSectionById(item) || findSectionByHeading(item, tocContainer);
}

function getScrollableParents(element: HTMLElement) {
  const parents: HTMLElement[] = [];
  let current = element.parentElement;

  while (current) {
    const style = window.getComputedStyle(current);
    const scrollable =
      /(auto|scroll|overlay)/.test(style.overflowY) &&
      current.scrollHeight > current.clientHeight + 20;

    if (scrollable) {
      parents.push(current);
    }

    current = current.parentElement;
  }

  return parents;
}

function scrollToTarget(target: HTMLElement) {
  target.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });

  const parents = getScrollableParents(target);

  for (const parent of parents) {
    const parentRect = parent.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    parent.scrollTo({
      top: parent.scrollTop + targetRect.top - parentRect.top - 100,
      behavior: "smooth",
    });
  }
}

function routeToItem(item: TocItem) {
  const target = getTarget(item);

  if (!target) {
    console.warn("[GreedyIntervalTocTabs] Target not found:", item.title);
    return;
  }

  window.history.replaceState(null, "", `#${target.id}`);
  scrollToTarget(target);
}

function wireToc() {
  const tocContainer = findTocContainer();

  if (!tocContainer) return;

  for (const item of TOC_ITEMS) {
    const row = findTocRow(tocContainer, item);

    if (!row) continue;

    row.style.cursor = "pointer";
    row.setAttribute("role", "button");
    row.setAttribute("tabindex", "0");
    row.setAttribute("aria-label", `Go to ${item.title}`);
    row.classList.add("transition-colors", "hover:text-primary");

    row.onclick = (event) => {
      event.preventDefault();
      event.stopPropagation();
      routeToItem(item);
    };

    row.onkeydown = (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        event.stopPropagation();
        routeToItem(item);
      }
    };
  }
}

export default function GreedyIntervalTocTabs() {
  useEffect(() => {
    wireToc();

    const timers = [100, 300, 700, 1200, 2000].map((ms) =>
      window.setTimeout(wireToc, ms)
    );

    return () => {
      timers.forEach(window.clearTimeout);
    };
  }, []);

  return null;
}
