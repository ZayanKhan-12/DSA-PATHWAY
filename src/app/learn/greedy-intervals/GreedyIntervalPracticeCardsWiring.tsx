"use client";

import { useEffect } from "react";

const CARD_ROUTES: Record<string, string> = {
  "merge intervals": "/practice/greedy-intervals/merge-intervals",
  "insert interval": "/practice/greedy-intervals/insert-interval",
  "meeting rooms i / ii": "/practice/greedy-intervals/meeting-rooms",
  "erase overlap intervals": "/practice/greedy-intervals/erase-overlap-intervals",
};

const CARD_TITLES = Object.keys(CARD_ROUTES);

function normalize(value: string) {
  return value.replace(/\s+/g, " ").trim().toLowerCase();
}

function containsOtherCardTitle(text: string, currentTitle: string) {
  const clean = normalize(text);

  return CARD_TITLES.some((title) => {
    return title !== currentTitle && clean.includes(title);
  });
}

function isCardLikeElement(element: HTMLElement, title: string) {
  const text = normalize(element.textContent || "");

  if (!text.includes(title)) return false;
  if (containsOtherCardTitle(text, title)) return false;

  const className = String(element.getAttribute("class") || "");

  return (
    className.includes("border") ||
    className.includes("terminal-frame") ||
    className.includes("p-") ||
    element.tagName === "ARTICLE" ||
    element.tagName === "SECTION"
  );
}

function findIndividualCard(title: string) {
  const exactTitleNodes = Array.from(
    document.querySelectorAll<HTMLElement>("h1, h2, h3, h4, h5, h6, p, span, div")
  ).filter((node) => normalize(node.textContent || "") === title);

  let bestCard: HTMLElement | null = null;
  let bestLength = Number.POSITIVE_INFINITY;

  for (const titleNode of exactTitleNodes) {
    let current: HTMLElement | null = titleNode;

    for (let depth = 0; depth < 10 && current; depth++) {
      if (
        current !== document.body &&
        current.tagName !== "MAIN" &&
        isCardLikeElement(current, title)
      ) {
        const textLength = normalize(current.textContent || "").length;

        if (textLength < bestLength) {
          bestCard = current;
          bestLength = textLength;
        }
      }

      current = current.parentElement;
    }
  }

  return bestCard;
}

function resetBadParentClicks() {
  const wiredElements = Array.from(
    document.querySelectorAll<HTMLElement>("[data-greedy-interval-wired='true']")
  );

  for (const element of wiredElements) {
    const text = normalize(element.textContent || "");
    const titleCount = CARD_TITLES.filter((title) => text.includes(title)).length;

    if (titleCount > 1) {
      element.removeAttribute("data-greedy-interval-wired");
      element.removeAttribute("role");
      element.removeAttribute("tabindex");
      element.removeAttribute("aria-label");
      element.style.cursor = "";
      element.onclick = null;
      element.onkeydown = null;
    }
  }
}

function wireCards() {
  resetBadParentClicks();

  Object.entries(CARD_ROUTES).forEach(([title, route]) => {
    const card = findIndividualCard(title);

    if (!card) return;

    card.dataset.greedyIntervalWired = "true";
    card.style.cursor = "pointer";
    card.setAttribute("role", "link");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-label", `Open ${title} practice page`);

    card.classList.add(
      "transition-colors",
      "hover:border-primary",
      "hover:bg-primary/5"
    );

    card.onclick = (event) => {
      event.preventDefault();
      event.stopPropagation();
      window.location.href = route;
    };

    card.onkeydown = (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        event.stopPropagation();
        window.location.href = route;
      }
    };
  });
}

export default function GreedyIntervalPracticeCardsWiring() {
  useEffect(() => {
    wireCards();

    const observer = new MutationObserver(() => {
      wireCards();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    const timers = [100, 300, 700, 1200, 1800, 2500].map((ms) =>
      window.setTimeout(wireCards, ms)
    );

    return () => {
      observer.disconnect();
      timers.forEach(window.clearTimeout);
    };
  }, []);

  return null;
}
