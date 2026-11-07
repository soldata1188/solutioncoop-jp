"use client";

import { useState } from "react";
import { CheckBadge } from "@/components/Placeholder";
import type { Cell } from "@/lib/compare";

type Row = { label: string; jisshu: Cell; tokutei: Cell; ikusei: Cell };
type Col = { key: "jisshu" | "tokutei" | "ikusei"; label: string };

/**
 * スマートフォン用の比較（項目ごとの開閉式）。開くと3制度の内容を並べて表示します。
 * - 見出しのボタンに aria-expanded / aria-controls を付け、キーボード（Enter・Space）で開閉できます
 * - 初期状態は最初の項目だけを開きます
 * - JavaScript が無効のとき（html に .js が付かないとき）は、すべての項目を開いた状態で表示します（globals.css）
 */
export function CompareAccordion({ rows, cols }: { rows: Row[]; cols: readonly Col[] }) {
  const [open, setOpen] = useState<ReadonlySet<number>>(() => new Set([0]));
  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  return (
    <div className="space-y-3">
      {rows.map((r, i) => {
        const isOpen = open.has(i);
        const panelId = `compare-panel-${i}`;
        const buttonId = `compare-button-${i}`;
        return (
          <section key={r.label} aria-labelledby={buttonId} className="overflow-hidden rounded bg-white shadow-card">
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
                className="compare-toggle flex min-h-12 w-full items-center justify-between gap-3 bg-label px-4 py-2 text-left font-bold text-ink"
              >
                <span>{r.label}</span>
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-primary-dark transition-transform motion-reduce:transition-none" style={{ transform: isOpen ? "rotate(180deg)" : undefined }} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
            </h3>
            <div id={panelId} data-open={isOpen ? "true" : "false"} className="compare-panel">
              <dl className="divide-y divide-line">
                {cols.map((c) => (
                  <div key={c.key} className={`px-4 py-3 ${c.key === "ikusei" ? "bg-cta-tint" : ""}`}>
                    <dt className="text-sm font-bold text-primary-dark">{c.label}</dt>
                    <dd className="mt-0.5 text-[15px]">
                      {r[c.key].text}
                      {r[c.key].check ? <CheckBadge /> : null}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>
        );
      })}
    </div>
  );
}
