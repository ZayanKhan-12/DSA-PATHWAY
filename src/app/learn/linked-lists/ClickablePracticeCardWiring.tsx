"use client";

import { useEffect } from "react";

export default function ClickablePracticeCardWiring() {
  useEffect(() => {
    const route = "/practice/linked-list/reverse-linked-list";

    const wireCard = () => {
      const cards = Array.from(
        document.querySelectorAll<HTMLElement>(".terminal-frame")
      );

      const target = cards.find((card) => {
        const text = (card.textContent || "").replace(/\s+/g, " ").trim();
        return (
          text.includes("Reverse Linked List") &&
          text.includes("Canonical pointer-rewiring problem")
        );
      });

      if (!target) return false;
      if (target.dataset.reverseLinkedListWired === "true") return true;

      target.dataset.reverseLinkedListWired = "true";
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
        window.location.href = route;
      });

      target.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          window.location.href = route;
        }
      });

      return true;
    };

    wireCard();

    const timers = [150, 400, 900, 1600].map((ms) =>
      window.setTimeout(wireCard, ms)
    );

    return () => {
      timers.forEach(window.clearTimeout);
    };
  }, []);

  return null;
}
