"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * スクロールで節とカードを一度だけ出す。
 * html.motion を付ける前に、画面内の要素へ is-in を付けて、最初から見えるものが消えないようにします。
 * IntersectionObserver が無い、または動きを減らす設定では何もしません。
 */
export function RevealOnScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    if (!("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets: HTMLElement[] = [];
    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((section) => {
      if (section.hasAttribute("data-hero") || section.querySelector("[data-hero], img[fetchpriority='high']")) {
        section.removeAttribute("data-reveal");
        return;
      }
      const cards = section.querySelectorAll<HTMLElement>(".grid > li, ol.grid > li, ul.grid > li");
      if (cards.length > 1) {
        section.removeAttribute("data-reveal");
        cards.forEach((card, index) => {
          card.style.setProperty("--reveal-i", String(Math.min(index, 8)));
          card.setAttribute("data-reveal", "");
          targets.push(card);
        });
      } else {
        targets.push(section);
      }
    });

    const visible: HTMLElement[] = [];
    const pending: HTMLElement[] = [];
    targets.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) visible.push(el);
      else pending.push(el);
    });
    visible.forEach((el) => el.classList.add("is-in"));
    root.classList.add("motion");

    if (pending.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    pending.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
