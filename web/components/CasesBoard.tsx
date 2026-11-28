"use client";

import { useEffect, useRef, useState } from "react";
import { caseCards } from "@/lib/cases";

function perView(): number {
  if (window.matchMedia("(min-width: 1024px)").matches) return 3;
  if (window.matchMedia("(min-width: 640px)").matches) return 2;
  return 1;
}

const IMAGE_SIZES = "(min-width: 1024px) 290px, (min-width: 640px) 46vw, calc(100vw - 32px)";

/**
 * 活動情報と同じページ送り。カードの見出しは復元した tag だけ。新しい本文は足さない。
 */
export function CasesBoard() {
  const scroller = useRef<HTMLUListElement>(null);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const sync = () => {
      const count = perView();
      const total = Math.max(1, Math.ceil(caseCards.length / count));
      const width = Math.max(el.clientWidth, 1);
      const current = Math.round(el.scrollLeft / width);
      setPages(total);
      setPage(Math.min(Math.max(current, 0), total - 1));
    };
    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(el);
    el.addEventListener("scroll", sync, { passive: true });
    return () => {
      observer.disconnect();
      el.removeEventListener("scroll", sync);
    };
  }, []);

  function go(next: number) {
    const el = scroller.current;
    if (!el) return;
    const total = Math.max(1, Math.ceil(caseCards.length / perView()));
    const clamped = Math.min(Math.max(next, 0), total - 1);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left: clamped * el.clientWidth, behavior: reduce ? "auto" : "smooth" });
    setPage(clamped);
  }

  return (
    <div className="min-w-0">
      <ul
        ref={scroller}
        className="flex w-full snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {caseCards.map((item) => (
          <li key={item.id} className="box-border w-full shrink-0 snap-start px-2 sm:w-1/2 lg:w-[calc(100%/3)]">
            <article className="flex h-full flex-col overflow-hidden rounded-site border border-line bg-white shadow-card">
              <div className="relative aspect-[4/3] bg-pale">
                <img
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  loading="lazy"
                  decoding="async"
                  sizes={IMAGE_SIZES}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                {item.imageNote ? (
                  <span className="pointer-events-none absolute bottom-2 left-2 rounded-control border border-line bg-white px-1.5 py-0.5 text-xs font-bold text-ink">
                    {item.imageNote}
                  </span>
                ) : null}
              </div>
              <div className="flex flex-1 flex-col px-4 py-4">
                <h3 className="text-base font-bold leading-snug text-ink">{item.tag}</h3>
              </div>
            </article>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex min-h-11 items-center justify-center gap-4">
        <button
          type="button"
          aria-label="前の受入れ事例"
          disabled={page <= 0}
          onClick={() => go(page - 1)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary bg-white text-xl leading-none text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-dark disabled:cursor-not-allowed disabled:opacity-40"
        >
          ‹
        </button>
        <div className="flex items-center gap-1" role="group" aria-label="受入れ事例のページ">
          {Array.from({ length: pages }, (_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`${index + 1}ページ目`}
              aria-current={index === page ? "true" : undefined}
              onClick={() => go(index)}
              className="inline-flex h-5 w-5 items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-dark"
            >
              <span aria-hidden="true" className={`h-2.5 w-2.5 rounded-full ${index === page ? "bg-primary-dark" : "border border-primary bg-white"}`} />
            </button>
          ))}
        </div>
        <button
          type="button"
          aria-label="次の受入れ事例"
          disabled={page >= pages - 1}
          onClick={() => go(page + 1)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary bg-white text-xl leading-none text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-dark disabled:cursor-not-allowed disabled:opacity-40"
        >
          ›
        </button>
      </div>
    </div>
  );
}
