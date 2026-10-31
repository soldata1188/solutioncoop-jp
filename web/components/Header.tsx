import Link from "next/link";
import { nav, CONTACT_HREF } from "@/lib/site";
import { Wordmark } from "./Wordmark";
import { ArrowIcon } from "./ui";

const pillBase = "min-h-11 items-center gap-1.5 whitespace-nowrap rounded-full px-4 text-sm font-bold no-underline transition-colors";
// オレンジ地は紺文字（4.65:1）、白地のオレンジ枠ボタンは濃いオレンジ文字（5.18:1）
const pill = `inline-flex ${pillBase}`;
const pillPrimary = `${pill} bg-accent-500 text-navy-900 hover:bg-accent-400`;
const pillOutlineBase = "border-2 border-accent-500 bg-white text-accent-700 hover:bg-orange-50";
const pillOutline = `${pill} ${pillOutlineBase}`;

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-1.5">
        <Wordmark />
        <nav aria-label="メインメニュー" className="hidden xl:block">
          <ul className="flex items-center">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center whitespace-nowrap px-2.5 text-sm font-medium text-ink no-underline hover:text-navy-700 hover:underline hover:underline-offset-4"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <Link href={CONTACT_HREF} className={pillPrimary}>
            お問い合わせ
            <ArrowIcon className="h-3.5 w-3.5" />
          </Link>
          <Link href={CONTACT_HREF} className={`hidden sm:inline-flex ${pillBase} ${pillOutlineBase}`}>
            資料請求
            <ArrowIcon className="h-3.5 w-3.5" />
          </Link>
          <details className="group relative xl:hidden">
            <summary className="flex min-h-11 min-w-12 cursor-pointer flex-col items-center justify-center gap-[3px] rounded-md border border-line px-2 text-navy-900">
              <span aria-hidden="true" className="flex flex-col gap-[3px]">
                <span className="block h-0.5 w-5 bg-navy-900" />
                <span className="block h-0.5 w-5 bg-navy-900 group-open:opacity-0" />
                <span className="block h-0.5 w-5 bg-navy-900" />
              </span>
              <span className="whitespace-nowrap text-[10px] font-bold leading-none">メニュー</span>
            </summary>
            <nav
              aria-label="メインメニュー（モバイル）"
              className="absolute right-0 mt-2 w-[min(18rem,calc(100vw-2rem))] rounded-md border border-line bg-white p-2 shadow-card"
            >
              <ul>
                {nav.map((item) => (
                  <li key={item.href} className="border-b border-line last:border-b-0">
                    <Link href={item.href} className="flex min-h-12 items-center justify-between rounded px-3 text-base text-ink no-underline hover:bg-pale">
                      {item.label}
                      <ArrowIcon className="h-3.5 w-3.5 text-navy-700" />
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-2 grid gap-2">
                <Link href={CONTACT_HREF} className={`${pillPrimary} justify-center`}>お問い合わせ</Link>
                <Link href={CONTACT_HREF} className={`${pillOutline} justify-center`}>資料請求</Link>
              </div>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
