import type { Faq } from "@/lib/faq";
import { CheckBadge } from "./Placeholder";

/**
 * 枠線なしのアコーディオン（<details>/<summary>。JS不要）。
 * 回答は閉じていても DOM 上に存在するため、FAQPage JSON-LD と表示内容が一致します。
 */
export function FaqList({ items, headingLevel = "h3" }: { items: Faq[]; headingLevel?: "h2" | "h3" }) {
  const Q = headingLevel;
  return (
    <div className="border-t border-line">
      {items.map((f) => (
        <details key={f.q} className="group border-b border-line">
          <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-4 py-4 text-navy-900 hover:text-navy-700">
            <Q className="flex items-start gap-3 text-base font-bold leading-relaxed md:text-lg">
              <span aria-hidden="true" className="font-bold text-navy-900">Q</span>
              <span>{f.q}</span>
            </Q>
            <span aria-hidden="true" className="relative h-5 w-5 shrink-0">
              <span className="absolute left-0 top-1/2 h-0.5 w-5 -translate-y-1/2 bg-navy-900" />
              <span className="absolute left-1/2 top-0 h-5 w-0.5 -translate-x-1/2 bg-navy-900 group-open:hidden" />
            </span>
          </summary>
          <div className="flex gap-3 pb-6 pl-0 pr-2 md:pr-10">
            <span aria-hidden="true" className="font-bold text-accent-700">A</span>
            <p className="text-ink">
              {f.a}
              {f.needsCheck ? <CheckBadge /> : null}
            </p>
          </div>
        </details>
      ))}
    </div>
  );
}
