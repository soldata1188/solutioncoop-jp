import Link from "next/link";
import { nav, CONTACT_HREF, TEL_ARIA, TEL_HREF, org } from "@/lib/site";
import { SiteNav } from "./SiteNav";
import { Wordmark } from "./Wordmark";
import { MobileMenu } from "./MobileMenu";

const btnBase = "lift inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-control px-4 text-[13px] font-bold no-underline";

export function PhoneIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={`shrink-0 ${className}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z" />
    </svg>
  );
}

export function Header() {
  return (
    <>
    <header className="fixed inset-x-0 top-0 z-[70] border-b border-line bg-white">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-3 px-4 py-1.5">
        <div className="flex items-center gap-6">
          <Wordmark />
          <nav aria-label="メインメニュー" className="hidden min-[1200px]:block">
            <SiteNav
              items={nav}
              listClassName="flex items-center"
              linkClassName="inline-flex min-h-11 items-center whitespace-nowrap px-2 text-[13px] font-bold text-ink no-underline hover:text-primary-dark"
              activeClassName="text-primary-dark underline decoration-2 underline-offset-[6px]"
            />
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <a
            href={TEL_HREF}
            aria-label={`${TEL_ARIA} ${org.tel}`}
            className="lift inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-control border border-primary-dark px-2 text-[13px] font-bold text-primary-dark no-underline hover:bg-pale min-[1200px]:px-3"
          >
            <PhoneIcon />
            <span className="hidden min-[1200px]:inline">{org.tel}</span>
          </a>
          <Link href={CONTACT_HREF} prefetch={false} className={`hidden min-[1200px]:inline-flex ${btnBase} bg-primary px-5 text-white hover:bg-primary-dark`}>
            お問い合わせ
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
    <div aria-hidden="true" className="h-[57px] shrink-0" />
    </>
  );
}
