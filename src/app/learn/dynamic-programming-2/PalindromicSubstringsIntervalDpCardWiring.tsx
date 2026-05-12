"use client";

import { useEffect } from "react";

export default function PalindromicSubstringsIntervalDpCardWiring() {
  useEffect(() => {
    const internalRoute = "/practice/dynamic-programming-2/palindromic-substrings-interval-dp";

    const normalize = (value: string) =>
      value.replace(/\s+/g, " ").trim().toLowerCase();

    const isCorrectCardText = (text: string) => {
      const clean = normalize(text);

      return (
        clean.includes("palindromic substrings") &&
        clean.includes("interval dp") &&
        clean.includes("substring boundaries") &&
        !clean.includes("unique paths") &&
        !clean.includes("0/1 knapsack") &&
        !clean.includes("edit distance") &&
        !clean.includes("longest common subsequence") &&
        !clean.includes("$ practice problems")
      );
    };

    const findCard = () => {
      const titleNodes = Array.from(
        document.querySelectorAll<HTMLElement>("h1, h2, h3, h4, p, span, div")
      ).filter((node) => {
        const text = normalize(node.textContent || "");
        return text === "palindromic substrings / interval dp" || text.includes("palindromic substrings");
      });

      for (const titleNode of titleNodes) {
        let current: HTMLElement | null = titleNode;

        for (let depth = 0; depth < 8 && current; depth++) {
          if (isCorrectCardText(current.textContent || "")) {
            return current;
          }

          current = current.parentElement;
        }
      }

      const fallbackCards = Array.from(
        document.querySelectorAll<HTMLElement>(".terminal-frame, article, section, [class*='border']")
      )
        .filter((card) => isCorrectCardText(card.textContent || ""))
        .sort((a, b) => (a.textContent || "").length - (b.textContent || "").length);

      return fallbackCards[0] ?? null;
    };

    const wireCard = () => {
      const target = findCard();

      if (!target) return false;

      target.dataset.palindromicSubstringsIntervalDpCardWired = "true";
      target.style.cursor = "pointer";
      target.setAttribute("role", "link");
      target.setAttribute("tabindex", "0");
      target.setAttribute("aria-label", "Open Palindromic Substrings Interval DP practice page");

      target.classList.add(
        "transition-colors",
        "hover:border-primary",
        "hover:bg-primary/5"
      );

      target.onclick = () => {
        window.location.href = internalRoute;
      };

      target.onkeydown = (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          window.location.href = internalRoute;
        }
      };

      return true;
    };

    wireCard();

    const observer = new MutationObserver(() => {
      wireCard();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    const timers = [100, 300, 700, 1200, 1800, 2500].map((ms) =>
      window.setTimeout(wireCard, ms)
    );

    return () => {
      observer.disconnect();
      timers.forEach(window.clearTimeout);
    };
  }, []);

  return null;
}
