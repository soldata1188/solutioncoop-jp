import type { Faq } from "@/lib/faq";
import { CheckBadge } from "./Placeholder";
import { KeepWords } from "./KeepWords";

/**
 * 枠線なしのアコーディオン（<details>/<summary>。JS不要）。
 * 回答は閉じていても DOM 上に存在するため、FAQPage JSON-LD と表示内容が一致します。
 */
export function FaqList({ items, headingLevel = "h3" }: { items: Faq[]; headingLevel?: "h2" | "h3" }) {
  const Q = headingLevel;
  return (
    <div>
      {items.map((f) => (
        <details key={f.q} className="group border-b border-line-strong">
          <summary className="flex min-h-14 cursor-pointer items-center justify-between gap-4 py-4 text-ink hover:text-primary-dark">
            <Q className="flex items-start gap-3 text-[15px] font-bold leading-relaxed md:text-base">
              <span aria-hidden="true" className="font-bold text-primary-dark">Q</span>
              <span>{f.q}</span>
            </Q>
            <span aria-hidden="true" className="relative h-4 w-4 shrink-0">
              <span className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-primary" />
              <span className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-primary group-open:hidden" />
            </span>
          </summary>
          <div className="flex gap-3 pb-5 pr-2 md:pr-8">
            <span aria-hidden="true" className="font-bold text-cta-text">A</span>
            <p className="text-[15px] text-body">
              <KeepWords text={f.a} />
              {f.needsCheck ? <CheckBadge /> : null}
            </p>
          </div>
        </details>
      ))}
    </div>
  );
}
