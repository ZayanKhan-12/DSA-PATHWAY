"use client";

import { useEffect } from "react";

type TocItem = {
  label: string;
  title: string;
  ids: string[];
};

const TOC_ITEMS: TocItem[] = [
  { label: "01 Root Problem", title: "Root Problem", ids: ["root", "root-problem"] },
  { label: "02 Core Idea", title: "Core Idea", ids: ["core", "core-idea"] },
  { label: "03 Intuition", title: "Intuition", ids: ["intuition"] },
  { label: "04 Step-by-Step Example", title: "Step-by-Step Example", ids: ["example", "step-by-step-example", "step-by-step"] },
  { label: "05 Code Implementation", title: "Code Implementation", ids: ["code", "code-implementation", "implementation"] },
  { label: "06 Time Complexity", title: "Time Complexity", ids: ["complexity", "time-complexity"] },
  { label: "07 Real-World Uses", title: "Real-World Uses", ids: ["uses", "real-world-uses", "real-world"] },
  { label: "08 Practice Problems", title: "Practice Problems", ids: ["practice", "practice-problems"] },
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
        TOC_ITEMS.every((item) => text.includes(normalize(item.title)))
      );
    })
    .sort((a, b) => {
      return (a.textContent || "").length - (b.textContent || "").length;
    });

  return candidates[0] ?? null;
}

function findTocTextNode(container: HTMLElement, item: TocItem) {
  const nodes = Array.from(
    container.querySelectorAll<HTMLElement>("a, button, li, p, span, div")
  );

  return (
    nodes
      .filter((node) => {
        const text = normalize(node.textContent || "");

        if (!text) return false;
        if (text.length > 140) return false;

        return (
          text === normalize(item.label) ||
          text === normalize(item.title) ||
          stripNumber(text) === normalize(item.title) ||
          text.endsWith(normalize(item.title))
        );
      })
      .sort((a, b) => {
        return (a.textContent || "").length - (b.textContent || "").length;
      })[0] ?? null
  );
}

function findClickableRow(container: HTMLElement, textNode: HTMLElement, item: TocItem) {
  let current: HTMLElement | null = textNode;

  while (current && current !== container.parentElement) {
    const text = normalize(current.textContent || "");

    if (
      text.includes(normalize(item.title)) &&
      text.length <= 180 &&
      current !== container
    ) {
      return current;
    }

    if (current === container) break;
    current = current.parentElement;
  }

  return textNode;
}

function isInsideToc(element: HTMLElement, tocContainer: HTMLElement | null) {
  return Boolean(tocContainer && tocContainer.contains(element));
}

function findExistingTarget(item: TocItem) {
  for (const id of item.ids) {
    const target = document.getElementById(id);

    if (target) {
      target.style.scrollMarginTop = "96px";
      return target as HTMLElement;
    }
  }

  return null;
}

function findTargetByTitle(item: TocItem, tocContainer: HTMLElement | null) {
  const title = normalize(item.title);

  const candidates = Array.from(
    document.querySelectorAll<HTMLElement>("h1, h2, h3, h4, section, article, div")
  )
    .filter((element) => {
      if (isInsideToc(element, tocContainer)) return false;

      const text = normalize(element.textContent || "");

      if (!text.includes(title)) return false;
      if (text.includes("table of contents")) return false;
      if (text.length > 5000) return false;

      return true;
    })
    .sort((a, b) => {
      const aText = normalize(a.textContent || "");
      const bText = normalize(b.textContent || "");

      const aExact = aText === title || aText.endsWith(title) ? 0 : 1;
      const bExact = bText === title || bText.endsWith(title) ? 0 : 1;

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
      text.includes(title) &&
      !text.includes("table of contents")
    ) {
      current.id = item.ids[0];
      current.style.scrollMarginTop = "96px";
      return current;
    }

    current = current.parentElement;
  }

  best.id = item.ids[0];
  best.style.scrollMarginTop = "96px";
  return best;
}

function findTargetBySectionOrder(item: TocItem, tocContainer: HTMLElement | null) {
  const itemIndex = TOC_ITEMS.findIndex((tocItem) => tocItem.title === item.title);

  if (itemIndex === -1) return null;

  const sectionCandidates = Array.from(
    document.querySelectorAll<HTMLElement>("section, article, div")
  )
    .filter((element) => {
      if (isInsideToc(element, tocContainer)) return false;

      const text = normalize(element.textContent || "");

      if (text.includes("table of contents")) return false;
      if (text.length > 7000) return false;

      return TOC_ITEMS.some((tocItem) => text.includes(normalize(tocItem.title)));
    })
    .sort((a, b) => {
      return a.getBoundingClientRect().top - b.getBoundingClientRect().top;
    });

  const uniqueSections: HTMLElement[] = [];

  for (const candidate of sectionCandidates) {
    const alreadyCovered = uniqueSections.some((existing) => {
      return existing.contains(candidate) || candidate.contains(existing);
    });

    if (!alreadyCovered) {
      uniqueSections.push(candidate);
    }
  }

  const target = uniqueSections[itemIndex];

  if (!target) return null;

  target.id = item.ids[0];
  target.style.scrollMarginTop = "96px";
  return target;
}

function getTarget(item: TocItem) {
  const tocContainer = findTocContainer();

  return (
    findExistingTarget(item) ||
    findTargetByTitle(item, tocContainer) ||
    findTargetBySectionOrder(item, tocContainer)
  );
}

function getScrollParent(element: HTMLElement) {
  let parent = element.parentElement;

  while (parent) {
    const style = window.getComputedStyle(parent);
    const canScrollY =
      /(auto|scroll|overlay)/.test(style.overflowY) &&
      parent.scrollHeight > parent.clientHeight + 20;

    if (canScrollY) {
      return parent;
    }

    parent = parent.parentElement;
  }

  return document.scrollingElement || document.documentElement;
}

function scrollToTarget(target: HTMLElement) {
  const scrollParent = getScrollParent(target);
  const offset = 96;

  if (
    scrollParent === document.documentElement ||
    scrollParent === document.body ||
    scrollParent === document.scrollingElement
  ) {
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - offset,
      behavior: "smooth",
    });

    return;
  }

  const parentRect = scrollParent.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();

  scrollParent.scrollTo({
    top: scrollParent.scrollTop + targetRect.top - parentRect.top - offset,
    behavior: "smooth",
  });
}

function routeToItem(item: TocItem) {
  const target = getTarget(item);

  if (!target) {
    console.warn("[SafeLessonTocLinks] Target not found:", item.title);
    return;
  }

  window.history.replaceState(null, "", `#${target.id}`);
  scrollToTarget(target);
}

function wireTocRows() {
  const tocContainer = findTocContainer();

  if (!tocContainer) return;

  for (const item of TOC_ITEMS) {
    const textNode = findTocTextNode(tocContainer, item);

    if (!textNode) continue;

    const row = findClickableRow(tocContainer, textNode, item);

    row.style.cursor = "pointer";
    row.setAttribute("role", "link");
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

export default function SafeLessonTocLinks() {
  useEffect(() => {
    wireTocRows();

    const timers = [100, 300, 700, 1200, 2000].map((ms) =>
      window.setTimeout(wireTocRows, ms)
    );

    return () => {
      timers.forEach(window.clearTimeout);
    };
  }, []);

  return null;
}
