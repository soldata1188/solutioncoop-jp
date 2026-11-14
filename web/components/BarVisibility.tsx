"use client";

import { useEffect } from "react";

/**
 * スマートフォン下部の固定CTAを、トップのヒーロー（data-hero）が見えている間だけ隠します。
 * - JavaScript が無効・ヒーローの無いページでは常に表示（サーバー側の初期状態は表示）
 * - 隠している間は inert を付け、キーボード操作・読み上げの対象から外します
 * - 固定配置のため、表示切り替えでレイアウトはずれません
 */
export function BarVisibility({ barId }: { barId: string }) {
  useEffect(() => {
    const bar = document.getElementById(barId);
    const hero = document.querySelector("[data-hero]");
    if (!bar || !hero || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        const hide = entry.isIntersecting;
        bar.dataset.hidden = hide ? "true" : "false";
        bar.toggleAttribute("inert", hide);
      },
      // ヒーローの下端が画面下の固定バー付近より上に出たら表示
      { rootMargin: "0px 0px -80px 0px" },
    );
    io.observe(hero);
    return () => {
      io.disconnect();
      bar.dataset.hidden = "false";
      bar.removeAttribute("inert");
    };
  }, [barId]);
  return null;
}
