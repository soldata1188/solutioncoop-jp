import Link from "next/link";
import { nav, allPages, CONTACT_HREF, CONTACT_LABEL, TEL_ARIA, TEL_HREF, org } from "@/lib/site";
import { NavLink } from "./NavLink";
import { Wordmark } from "./Wordmark";
import { ArrowIcon } from "./ui";
import { LineButton } from "./LineButton";
import { Phrases } from "./KeepWords";

const btnBase = "min-h-11 items-center gap-2 whitespace-nowrap rounded px-4 text-[13px] font-bold no-underline transition-colors";
// 主ボタンは LINE（#06C755 地に #222、7.05:1）。メールは白地の枠ボタン（#0F4D2A の枠と文字、9.93:1）
const btnOutlineColors = "border border-primary-dark bg-white text-primary-dark hover:bg-cta-tint";

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
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-3 px-4 py-1.5">
        <div className="flex items-center gap-6">
          <Wordmark />
          <nav aria-label="メインメニュー" className="hidden xl:block">
            <ul className="flex items-center">
              {nav.map((item) => (
                <li key={item.href}>
                  <NavLink
                    href={item.href}
                    className="inline-flex min-h-11 items-center whitespace-nowrap px-2 text-[13px] font-bold text-ink no-underline hover:text-primary-dark"
                    activeClassName="text-primary-dark underline decoration-2 underline-offset-[6px]"
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={TEL_HREF}
            aria-label={`${TEL_ARIA}（${org.tel}）`}
            className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded border border-primary-dark px-2 text-[13px] font-bold text-primary-dark no-underline hover:bg-pale lg:px-3 xl:px-2"
          >
            <PhoneIcon />
            <span className="hidden lg:inline xl:hidden">{org.tel}</span>
          </a>
          <LineButton className="hidden min-h-11 gap-1.5 px-3 text-[13px] sm:inline-flex" />
          <Link href={CONTACT_HREF} className={`hidden md:inline-flex ${btnBase} ${btnOutlineColors}`}>
            <Phrases text={CONTACT_LABEL} />
          </Link>
          <details className="group relative xl:hidden">
            <summary className="flex min-h-11 min-w-12 cursor-pointer flex-col items-center justify-center gap-[3px] rounded border border-line px-2 text-ink">
              <span aria-hidden="true" className="flex flex-col gap-[3px]">
                <span className="block h-0.5 w-5 bg-primary" />
                <span className="block h-0.5 w-5 bg-primary group-open:opacity-0" />
                <span className="block h-0.5 w-5 bg-primary" />
              </span>
              <span className="whitespace-nowrap text-xs font-bold leading-none">メニュー</span>
            </summary>
            <nav
              aria-label="メインメニュー（モバイル）"
              className="absolute right-0 mt-2 w-[min(18rem,calc(100vw-2rem))] rounded border border-line bg-white p-2 shadow-card"
            >
              <ul>
                {allPages.map((item) => (
                  <li key={item.href} className="border-b border-line last:border-b-0">
                    <NavLink
                      href={item.href}
                      className="flex min-h-12 items-center justify-between border-l-4 border-l-transparent px-3 text-[15px] font-bold text-ink no-underline hover:bg-pale"
                      activeClassName="border-l-primary-dark! bg-pale text-primary-dark"
                    >
                      {item.label}
                      <ArrowIcon className="h-3 w-3 text-primary-dark" />
                    </NavLink>
                  </li>
                ))}
              </ul>
              <div className="mt-2 grid gap-2">
                <LineButton className="flex min-h-11 gap-2 px-4 text-sm" />
                <Link href={CONTACT_HREF} className={`flex justify-center ${btnBase} ${btnOutlineColors}`}><Phrases text={CONTACT_LABEL} /></Link>
                <a href={TEL_HREF} aria-label={`${TEL_ARIA}（${org.tel}）`} className={`flex justify-center gap-2 ${btnBase} ${btnOutlineColors}`}>
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
