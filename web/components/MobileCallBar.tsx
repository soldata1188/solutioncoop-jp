import Link from "next/link";
import { CONTACT_HREF, TEL_HREF, org } from "@/lib/site";
import { PhoneIcon } from "./Header";

/**
 * スマートフォン用の固定CTA（画面下部）。
 * body に下余白（pb-[68px]）を付けているため、ページ末尾の内容を覆いません。
 */
export function MobileCallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 px-3 py-2 shadow-[0_-2px_8px_rgba(0,0,0,0.08)] backdrop-blur md:hidden">
      <div className="mx-auto grid max-w-[612px] grid-cols-2 gap-2">
        <a
          href={TEL_HREF}
          aria-label={`電話で相談する ${org.tel}`}
          className="flex min-h-12 items-center justify-center gap-2 rounded bg-primary-dark px-2 text-[15px] font-bold text-white no-underline"
        >
          <PhoneIcon className="h-5 w-5" />
          電話で相談
        </a>
        <Link
          href={CONTACT_HREF}
          className="flex min-h-12 items-center justify-center rounded bg-cta px-2 text-[15px] font-bold text-ink no-underline"
        >
          ご相談・資料請求
        </Link>
      </div>
    </div>
  );
}
