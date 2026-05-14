"use client";

import { useEffect } from "react";

type TocItem = {
  label: string;
  title: string;
  targetIds: string[];
};

const TOC_ITEMS: TocItem[] = [
  { label: "01 Root Problem", title: "Root Problem", targetIds: ["root", "root-problem"] },
  { label: "02 Core Idea", title: "Core Idea", targetIds: ["core", "core-idea"] },
  { label: "03 Intuition", title: "Intuition", targetIds: ["intuition"] },
  { label: "04 Step-by-Step Example", title: "Step-by-Step Example", targetIds: ["example", "step-by-step-example", "step-by-step"] },
  { label: "05 Code Implementation", title: "Code Implementation", targetIds: ["code", "code-implementation", "implementation"] },
  { label: "06 Time Complexity", title: "Time Complexity", targetIds: ["complexity", "time-complexity"] },
  { label: "07 Real-World Uses", title: "Real-World Uses", targetIds: ["uses", "real-world-uses", "real-world"] },
  { label: "08 Practice Problems", title: "Practice Problems", targetIds: ["practice", "practice-problems"] },
];

function normalize(value: string) {
  return value
    .replace(/\$/g, "")
    .replace(/_/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function removeOldRouterOverlays() {
  document
    .querySelectorAll("[data-stable-toc-overlay='true']")
    .forEach((node) => node.remove());
}

function findTocContainer() {
  const allElements = Array.from(
    document.querySelectorAll<HTMLElement>("aside, nav, section, article, div")
  );

  const matches = allElements
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

  return matches[0] ?? null;
}

function getTarget(item: TocItem) {
  for (const id of item.targetIds) {
    const target = document.getElementById(id);

    if (target) {
      target.style.scrollMarginTop = "96px";
      return target as HTMLElement;
    }
  }

  const headings = Array.from(
    document.querySelectorAll<HTMLElement>("section, article, h1, h2, h3, h4, div")
  );

  const target = headings
    .filter((element) => {
      const text = normalize(element.textContent || "");

      if (!text.includes(normalize(item.title))) return false;
      if (text.includes("table of contents")) return false;
      if (text.length > 4500) return false;

      return true;
    })
    .sort((a, b) => {
      return (a.textContent || "").length - (b.textContent || "").length;
    })[0];

  if (!target) return null;

  let current: HTMLElement | null = target;

  for (let depth = 0; depth < 7 && current; depth++) {
    const tag = current.tagName.toLowerCase();

    if (tag === "section" || tag === "article") {
      current.id = item.targetIds[0];
      current.style.scrollMarginTop = "96px";
      return current;
    }

    current = current.parentElement;
  }

  target.id = item.targetIds[0];
  target.style.scrollMarginTop = "96px";
  return target;
}

function scrollToItem(item: TocItem) {
  const target = getTarget(item);

  if (!target) {
    console.warn("[StableLessonTocRouter] Target not found:", item.title);
    return;
  }

  window.history.replaceState(null, "", `#${target.id}`);

  target.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

function findTextNodeElement(container: HTMLElement, item: TocItem) {
  const candidates = Array.from(
    container.querySelectorAll<HTMLElement>("a, button, li, p, span, div")
  );

  return candidates
    .filter((node) => {
      const text = normalize(node.textContent || "");

      return (
        text === normalize(item.label) ||
        text === normalize(item.title) ||
        text.endsWith(normalize(item.title))
      );
    })
    .sort((a, b) => {
      return (a.textContent || "").length - (b.textContent || "").length;
    })[0] ?? null;
}

function createOverlay(container: HTMLElement, sourceNode: HTMLElement, item: TocItem) {
  const containerRect = container.getBoundingClientRect();
  const nodeRect = sourceNode.getBoundingClientRect();

  if (nodeRect.width === 0 || nodeRect.height === 0) return;

  const overlay = document.createElement("button");

  overlay.type = "button";
  overlay.dataset.stableTocOverlay = "true";
  overlay.setAttribute("aria-label", `Go to ${item.title}`);

  overlay.style.position = "absolute";
  overlay.style.left = "0px";
  overlay.style.right = "0px";
  overlay.style.top = `${nodeRect.top - containerRect.top - 10}px`;
  overlay.style.height = `${Math.max(nodeRect.height + 20, 42)}px`;
  overlay.style.zIndex = "50";
  overlay.style.cursor = "pointer";
  overlay.style.background = "transparent";
  overlay.style.border = "0";
  overlay.style.padding = "0";
  overlay.style.margin = "0";

  overlay.onmouseenter = () => {
    sourceNode.style.color = "var(--primary)";
  };

  overlay.onmouseleave = () => {
    sourceNode.style.color = "";
  };

  overlay.onclick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    scrollToItem(item);
  };

  container.appendChild(overlay);
}

function wireToc() {
  removeOldRouterOverlays();

  const container = findTocContainer();

  if (!container) {
    console.warn("[StableLessonTocRouter] TOC container not found.");
    return;
  }

  const computedPosition = window.getComputedStyle(container).position;

  if (computedPosition === "static") {
    container.style.position = "relative";
  }

  container.style.overflow = "visible";

  for (const item of TOC_ITEMS) {
    const sourceNode = findTextNodeElement(container, item);

    if (!sourceNode) {
      console.warn("[StableLessonTocRouter] TOC row not found:", item.label);
      continue;
    }

    sourceNode.style.cursor = "pointer";
    sourceNode.classList.add("transition-colors", "hover:text-primary");

    createOverlay(container, sourceNode, item);
  }
}

export default function StableLessonTocRouter() {
  useEffect(() => {
    const run = () => wireToc();

    run();

    const timers = [100, 300, 700, 1200, 1800, 2500].map((ms) =>
      window.setTimeout(run, ms)
    );

    window.addEventListener("resize", run);

    const observer = new MutationObserver(run);

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      timers.forEach(window.clearTimeout);
      window.removeEventListener("resize", run);
      observer.disconnect();
      removeOldRouterOverlays();
    };
  }, []);

  return null;
}
