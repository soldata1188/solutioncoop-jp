"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * スクロールで節とカードを一度だけ出す。
 * 隠すのは html.motion を付けたあとだけ。JS が無い、Observer が無い、動きを減らす設定では付けません。
 * 画面内の要素には motion より先に is-in を付けます。約2秒後に残りも出します。
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
          const step = card.closest("ul.news-rows") ? index : Math.min(index, 8);
          card.style.setProperty("--reveal-i", String(step));
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
      if (rect.top < window.innerHeight && rect.bottom > 0) visible.push(el);
      else pending.push(el);
    });
    visible.forEach((el) => el.classList.add("is-in"));

    let io: IntersectionObserver | null = null;
    if (pending.length > 0) {
      try {
        io = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              entry.target.classList.add("is-in");
              io?.unobserve(entry.target);
            });
          },
          { rootMargin: "0px 0px 40% 0px", threshold: 0 },
        );
        pending.forEach((el) => io?.observe(el));
      } catch {
        pending.forEach((el) => el.classList.add("is-in"));
        io = null;
      }
    }

    root.classList.add("motion");

    const showAll = () => {
      document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)").forEach((el) => el.classList.add("is-in"));
    };
    const timer = window.setTimeout(showAll, 2000);

    return () => {
      window.clearTimeout(timer);
      io?.disconnect();
    };
  }, [pathname]);

  return null;
}
