"use client";

import { useEffect } from "react";

export default function MaxAreaOfIslandCardWiring() {
  useEffect(() => {
    const internalRoute = "/practice/trees-recursion/max-area-of-island";

    const normalize = (value: string) => value.replace(/\s+/g, " ").trim();

    const findCard = () => {
      const titleNodes = Array.from(
        document.querySelectorAll<HTMLElement>("h1, h2, h3, h4, p, span, div")
      ).filter((node) => normalize(node.textContent || "") === "Max Area of Island");

      for (const titleNode of titleNodes) {
        let current: HTMLElement | null = titleNode;

        for (let depth = 0; depth < 6 && current; depth++) {
          const text = normalize(current.textContent || "");

          const isExactCard =
            text.includes("Max Area of Island") &&
            text.includes("Use DFS to measure connected component size") &&
            !text.includes("Number of Islands") &&
            !text.includes("$ Practice Problems");

          if (isExactCard) {
            return current;
          }

          current = current.parentElement;
        }
      }

      const fallbackCards = Array.from(
        document.querySelectorAll<HTMLElement>(".terminal-frame, article, [class*='border']")
      )
        .filter((card) => {
          const text = normalize(card.textContent || "");

          return (
            text.includes("Max Area of Island") &&
            text.includes("Use DFS to measure connected component size") &&
            !text.includes("Number of Islands") &&
            !text.includes("$ Practice Problems")
          );
        })
        .sort((a, b) => normalize(a.textContent || "").length - normalize(b.textContent || "").length);

      return fallbackCards[0] ?? null;
    };

    const wireCard = () => {
      const target = findCard();

      if (!target) return false;
      if (target.dataset.maxAreaOfIslandCardWired === "true") return true;

      target.dataset.maxAreaOfIslandCardWired = "true";
      target.style.cursor = "pointer";
      target.setAttribute("role", "link");
      target.setAttribute("tabindex", "0");
      target.setAttribute("aria-label", "Open Max Area of Island practice page");

      target.classList.add(
        "transition-colors",
        "hover:border-primary",
        "hover:bg-primary/5"
      );

      target.addEventListener("click", () => {
        window.location.href = internalRoute;
      });

      target.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          window.location.href = internalRoute;
        }
      });

      return true;
    };

    wireCard();

    const timers = [100, 300, 700, 1200, 1800].map((ms) =>
      window.setTimeout(wireCard, ms)
    );

    return () => {
      timers.forEach(window.clearTimeout);
    };
  }, []);

  return null;
}
