"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { nav, CONTACT_HREF, TEL_HREF, org } from "@/lib/site";
import { SiteNav } from "./SiteNav";
import { LineButton } from "./LineButton";

const btnBase = "inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded px-4 text-[13px] font-bold no-underline transition-colors";

function releaseScrollLock() {
  document.documentElement.style.overflow = "";
  document.body.style.overflow = "";
}

function setScrollLock(locked: boolean) {
  const value = locked ? "hidden" : "";
  document.documentElement.style.overflow = value;
  document.body.style.overflow = value;
}

/** 1200px 未満のハンバーガー。リンク・経路・ハッシュの変化で閉じ、閉じるときはスクロール固定を必ず外します。 */
export function MobileMenu() {
  const ref = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();

  function close() {
    if (ref.current) ref.current.open = false;
    releaseScrollLock();
  }

  useEffect(() => {
    if (ref.current) ref.current.open = false;
    releaseScrollLock();
  }, [pathname]);

  useEffect(() => {
    const onHash = () => {
      if (ref.current) ref.current.open = false;
      releaseScrollLock();
    };
    window.addEventListener("hashchange", onHash);
    return () => {
      window.removeEventListener("hashchange", onHash);
      releaseScrollLock();
    };
  }, []);

  return (
    <details
      ref={ref}
      className="group relative min-[1200px]:hidden"
      onToggle={(event) => setScrollLock(event.currentTarget.open)}
    >
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
        onClick={(event) => {
          if ((event.target as HTMLElement).closest("a")) close();
        }}
      >
        <SiteNav
          items={nav}
          listClassName=""
          linkClassName="flex min-h-12 items-center border-b border-line border-l-4 border-l-transparent px-3 text-[15px] font-bold text-ink no-underline hover:bg-pale"
          activeClassName="border-l-primary-dark! bg-pale text-primary-dark"
        />
        <div className="mt-2 grid gap-2">
          <a href={TEL_HREF} className={`${btnBase} border border-primary-dark bg-white text-primary-dark hover:bg-cta-tint`}>
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z" />
            </svg>
            電話 {org.tel}
          </a>
          <LineButton className="flex min-h-11 gap-2 px-4 text-sm" />
          <Link href={CONTACT_HREF} className={`${btnBase} bg-primary text-white hover:bg-primary-dark`}>お問い合わせ</Link>
        </div>
      </nav>
    </details>
  );
}
