import Link from "next/link";
import { nav, allPages, CONTACT_HREF, TEL_HREF, org } from "@/lib/site";
import { Wordmark } from "./Wordmark";
import { ArrowIcon } from "./ui";

const btnBase = "min-h-11 items-center gap-2 whitespace-nowrap rounded px-4 text-[13px] font-bold no-underline transition-colors";
// オレンジ地は #222 文字（6.73:1）。白地のオレンジ枠ボタンは #B45309 文字（5.02:1）
const btnPrimaryColors = "bg-cta text-ink hover:bg-cta-hover";
const btnOutlineColors = "border border-cta bg-white text-cta-text hover:bg-orange-50";

export function PhoneIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={`shrink-0 ${className}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z" />
    </svg>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-3 px-4 py-1.5">
        <div className="flex items-center gap-6">
          <Wordmark />
          <nav aria-label="メインメニュー" className="hidden xl:block">
            <ul className="flex items-center">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-11 items-center whitespace-nowrap px-2.5 text-[13px] font-bold text-ink no-underline hover:text-primary-dark"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={TEL_HREF}
            aria-label={`電話をかける ${org.tel}`}
            className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded border border-primary-dark px-2 text-[13px] font-bold text-primary-dark no-underline hover:bg-pale lg:px-3 xl:px-2"
          >
            <PhoneIcon />
            <span className="hidden lg:inline xl:hidden">{org.tel}</span>
          </a>
          <Link href={CONTACT_HREF} className={`hidden sm:inline-flex ${btnBase} ${btnPrimaryColors}`}>
            お問い合わせ
            <ArrowIcon className="h-3 w-3" />
          </Link>
          <Link href={CONTACT_HREF} className={`hidden sm:inline-flex xl:hidden ${btnBase} ${btnOutlineColors}`}>
            資料請求
            <ArrowIcon className="h-3 w-3" />
          </Link>
          <details className="group relative xl:hidden">
            <summary className="flex min-h-11 min-w-12 cursor-pointer flex-col items-center justify-center gap-[3px] rounded border border-line px-2 text-ink">
              <span aria-hidden="true" className="flex flex-col gap-[3px]">
                <span className="block h-0.5 w-5 bg-primary" />
                <span className="block h-0.5 w-5 bg-primary group-open:opacity-0" />
                <span className="block h-0.5 w-5 bg-primary" />
              </span>
              <span className="whitespace-nowrap text-[10px] font-bold leading-none">メニュー</span>
            </summary>
            <nav
              aria-label="メインメニュー（モバイル）"
              className="absolute right-0 mt-2 w-[min(18rem,calc(100vw-2rem))] rounded border border-line bg-white p-2 shadow-card"
            >
              <ul>
                {allPages.map((item) => (
                  <li key={item.href} className="border-b border-line last:border-b-0">
                    <Link href={item.href} className="flex min-h-12 items-center justify-between px-3 text-[15px] font-bold text-ink no-underline hover:bg-pale">
                      {item.label}
                      <ArrowIcon className="h-3 w-3 text-primary-dark" />
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-2 grid gap-2">
                <Link href={CONTACT_HREF} className={`flex justify-center ${btnBase} ${btnPrimaryColors}`}>お問い合わせ</Link>
                <Link href={CONTACT_HREF} className={`flex justify-center ${btnBase} ${btnOutlineColors}`}>資料請求</Link>
                <a href={TEL_HREF} className={`flex justify-center gap-2 ${btnBase} ${btnOutlineColors}`}>
                  <PhoneIcon />
                  電話 {org.tel}
                </a>
              </div>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
