"use client";

import { useEffect, useRef, useState } from "react";
import { achievements } from "@/lib/site";

const stroke = {
  "aria-hidden": true as const,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

/** 技能実習生（人の集まり） */
function IconPeople() {
  return (
    <svg {...stroke} width={26} height={26} className="block h-[26px] w-[26px] shrink-0">
      <circle cx="7.5" cy="7.5" r="2" />
      <circle cx="16.5" cy="7.5" r="2" />
      <path d="M3.8 18.2c.5-2.7 2.3-4.1 3.7-4.1s3.2 1.4 3.7 4.1" />
      <path d="M12.8 18.2c.5-2.7 2.3-4.1 3.7-4.1s3.2 1.4 3.7 4.1" />
    </svg>
  );
}

/** 受入れ企業（建物） */
function IconBuilding() {
  return (
    <svg {...stroke} width={26} height={26} className="block h-[26px] w-[26px] shrink-0">
      <path d="M4 20h16" />
      <path d="M6.5 20V9.5L11 6v14" />
      <path d="M11 20V11h6.5V20" />
      <path d="M8.2 12h1.2M8.2 15h1.2M8.2 18h1.2M13.2 14h1.2M13.2 17h1.2" />
    </svg>
  );
}

/** 知事表彰（メダル） */
function IconMedal() {
  return (
    <svg {...stroke} width={26} height={26} className="block h-[26px] w-[26px] shrink-0">
      <path d="M8.5 3.5 12 9l3.5-5.5" />
      <circle cx="12" cy="15" r="4.6" />
      <path d="M12 13.2v2.2M10.6 16.2h2.8" />
    </svg>
  );
}

const icons = [IconPeople, IconBuilding, IconMedal];

/**
 * ホームの実績3枚。文言はサーバー描画の最終値のまま。
 * 画面に入ったあとだけ、アイコンを一度出し、65 と 80 を約1秒で数える。
 */
export function AchievementCards() {
  const rootRef = useRef<HTMLUListElement>(null);
  const [play, setPlay] = useState(false);
  const [live, setLive] = useState(false);
  const [nums, setNums] = useState(() => achievements.map((item) => item.count ?? null));

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
        setPlay(true);
        setLive(true);
        const duration = 1000;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          setNums(achievements.map((item) => (item.count == null ? null : Math.round(eased * item.count))));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        setNums(achievements.map((item) => (item.count == null ? null : 0)));
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

  return (
    <ul ref={rootRef} className="grid grid-cols-3 items-stretch gap-2 sm:gap-4">
      {achievements.map((item, i) => {
        const Icon = icons[i];
        const counted = item.count != null && item.unit;
        return (
          <li key={item.label} className="flex h-full flex-col items-center justify-start border-t-[3px] border-primary bg-white px-1.5 py-4 text-center shadow-card sm:px-4 sm:py-6">
            <span aria-hidden="true" className={`achieve-icon mb-2 flex size-12 shrink-0 items-center justify-center rounded-full bg-pale text-primary${play ? " is-in" : ""}`} style={play ? { animationDelay: `${i * 80}ms` } : undefined}>
              <Icon />
            </span>
            <span className="flex min-h-10 w-full items-start justify-center text-xs font-bold leading-snug text-ink sm:min-h-10 sm:text-sm">{item.label}</span>
            <span className={`mt-2 max-w-full font-bold text-primary-dark ${counted ? "text-lg leading-none sm:text-4xl" : "text-lg leading-tight sm:text-2xl"}`}>
              {counted && live ? (
                <span className="inline-flex items-baseline justify-center">
                  <span className="inline-block min-w-[2ch] text-center tabular-nums">{nums[i]}</span>
                  {item.unit}
                </span>
              ) : (
                item.value
              )}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
