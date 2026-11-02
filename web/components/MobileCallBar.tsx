import Link from "next/link";
import { CONTACT_HREF, CONTACT_LABEL, TEL_HREF, org } from "@/lib/site";
import { BarVisibility } from "./BarVisibility";
import { PhoneIcon } from "./Header";
import { LineButton } from "./LineButton";

/**
 * スマートフォン用の固定CTA（画面下部・3つの操作）。
 * バーの高さは 69px（上枠1＋上余白8＋ボタン52＋下余白8）。BarRoute がフッターの後ろに同じ69px＋safe-area分の余白を置くため、ページ末尾の内容を覆いません。
 * /contact・/privacy では表示しません（BarRoute）。
 * 各ボタンは高さ52px（タップ領域44px以上）、文字は13px。iPhone のホームバー分は env(safe-area-inset-bottom) で確保します。
 * トップではヒーローが見えている間だけ隠します（BarVisibility。JavaScript 無効時は常に表示）。
 */
export function MobileCallBar() {
  const item = "flex min-h-[52px] flex-col items-center justify-center gap-0.5 rounded px-1 text-[13px] font-bold leading-tight no-underline";
  return (
    <div id="mobile-cta-bar" data-hidden="false" className="fixed inset-x-0 bottom-0 z-40 transition-transform duration-200 data-[hidden=true]:translate-y-full motion-reduce:transition-none border-t border-line bg-white/95 px-2 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] shadow-[0_-2px_8px_rgba(0,0,0,0.08)] backdrop-blur md:hidden">
      <div className="mx-auto grid max-w-[612px] grid-cols-3 gap-2">
        <a href={TEL_HREF} aria-label={`電話で相談（${org.tel}）`} className={`${item} bg-primary-dark text-white`}>
          <PhoneIcon className="h-5 w-5" />
          電話で相談
        </a>
        <LineButton className={item} iconClassName="h-5 w-5" />
        <Link href={CONTACT_HREF} className={`${item} bg-cta text-ink`}>
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m3 7 9 6 9-6" />
          </svg>
          {CONTACT_LABEL}
        </Link>
      </div>
      <BarVisibility barId="mobile-cta-bar" />
    </div>
  );
}
