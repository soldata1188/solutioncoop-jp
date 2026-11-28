"use client";

import { useEffect, useRef, useState } from "react";
import { achievements, achievementsHeading } from "@/lib/site";

/**
 * ホームの実績3枚。文言は最終値のまま描き、動きを減らす設定では数えない。
 * 画面に入ったあとだけ、数字を約1秒で数える。幅は桁数で確保する。
 */
export function AchievementCards() {
  const rootRef = useRef<HTMLUListElement>(null);
  const [live, setLive] = useState(false);
  const [nums, setNums] = useState(() => achievements.map((item) => item.count));

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let played = false;
    const io = new IntersectionObserver(
      (entries) => {
        if (played || !entries.some((entry) => entry.isIntersecting)) return;
        played = true;
        io.disconnect();
        setLive(true);
        const duration = 1000;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setNums(achievements.map((item) => Math.round(eased * item.count)));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        setNums(achievements.map(() => 0));
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.35 },
    );
    io.observe(root);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  const heading = achievementsHeading.text;
  const highlight = achievementsHeading.highlight;
  const mark =
    heading && highlight && heading.includes(highlight)
      ? {
          before: heading.slice(0, heading.indexOf(highlight)),
          mid: highlight,
          after: heading.slice(heading.indexOf(highlight) + highlight.length),
        }
      : null;

  return (
    <div>
      {heading ? (
        <p className="mb-6 text-center text-2xl font-bold leading-snug text-ink md:text-3xl">
          {mark ? (
            <>
              {mark.before}
              <span className="bg-cta px-1">{mark.mid}</span>
              {mark.after}
            </>
          ) : (
            heading
          )}
        </p>
      ) : null}
      <ul ref={rootRef} className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-3">
        {achievements.map((item, i) => (
          <li key={item.label} className="flex h-full flex-col items-center rounded-3xl border-4 border-pale-border bg-white px-4 py-6 text-center">
            <span className="inline-flex max-w-full items-center justify-center rounded-full bg-primary-dark px-4 py-1.5 text-sm font-bold leading-snug text-white">
              {item.label}
            </span>
            <p className="mt-6 flex items-end justify-center text-primary-dark">
              {item.prefix ? <span className="mb-1 text-xl font-bold sm:text-2xl">{item.prefix}</span> : null}
              <span className="text-6xl font-bold leading-none tabular-nums sm:text-7xl" style={{ minWidth: `${String(item.count).length}ch` }}>
                {live ? nums[i] : item.count}
              </span>
              {item.unit ? <span className="mb-1 ml-0.5 text-base font-bold sm:text-lg">{item.unit}</span> : null}
            </p>
            {item.description ? <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
