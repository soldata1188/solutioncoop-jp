import Link from "next/link";
import { nav, CONTACT_HREF, CONTACT_LABEL } from "@/lib/site";
import { Wordmark } from "./Wordmark";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2">
        <Wordmark />
        <nav aria-label="メインメニュー" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center whitespace-nowrap rounded px-2.5 text-[15px] font-medium text-ink hover:bg-navy-50 hover:text-navy-900"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href={CONTACT_HREF}
            className="hidden min-h-11 items-center whitespace-nowrap rounded-md bg-navy-900 px-4 text-[15px] font-bold text-white hover:bg-navy-700 sm:inline-flex"
          >
            {CONTACT_LABEL}
          </Link>
          <details className="group relative xl:hidden">
            <summary className="flex min-h-11 min-w-11 cursor-pointer list-none items-center justify-center rounded-md border border-slate-300 px-3 text-[15px] font-bold text-navy-900 [&::-webkit-details-marker]:hidden">
              メニュー
            </summary>
            <nav
              aria-label="メインメニュー（モバイル）"
              className="absolute right-0 mt-2 w-72 rounded-lg border border-slate-200 bg-white p-2 shadow-lg"
            >
              <ul>
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="flex min-h-12 items-center rounded px-3 text-base hover:bg-navy-50">
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li className="mt-2">
                  <Link
                    href={CONTACT_HREF}
                    className="flex min-h-12 items-center justify-center rounded-md bg-navy-900 px-3 font-bold text-white hover:bg-navy-700"
                  >
                    {CONTACT_LABEL}
                  </Link>
                </li>
              </ul>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
