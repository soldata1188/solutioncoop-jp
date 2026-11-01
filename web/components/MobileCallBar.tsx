import Link from "next/link";
import { CONTACT_HREF, TEL_HREF, org } from "@/lib/site";
import { PhoneIcon } from "./Header";
import { LineButton } from "./LineButton";

/**
 * スマートフォン用の固定CTA（画面下部・3つの操作）。
 * body に同じ高さ分の下余白を付けているため、ページ末尾の内容を覆いません。
 * 各ボタンは高さ52px（タップ領域44px以上）。
 */
export function MobileCallBar() {
  const item = "flex min-h-[52px] flex-col items-center justify-center gap-0.5 rounded px-1 text-[13px] font-bold leading-tight no-underline";
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 px-2 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] shadow-[0_-2px_8px_rgba(0,0,0,0.08)] backdrop-blur md:hidden">
      <div className="mx-auto grid max-w-[612px] grid-cols-3 gap-2">
        <a href={TEL_HREF} aria-label={`電話で相談する ${org.tel}`} className={`${item} bg-primary-dark text-white`}>
          <PhoneIcon className="h-5 w-5" />
          電話で相談
        </a>
        <LineButton className={item} iconClassName="h-5 w-5" />
        <Link href={CONTACT_HREF} className={`${item} bg-cta text-ink`}>
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m3 7 9 6 9-6" />
          </svg>
          お問い合わせ
        </Link>
      </div>
    </div>
  );
}
