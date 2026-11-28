"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, CONTACT_HREF, TEL_HREF, org } from "@/lib/site";
import { SiteNav } from "./SiteNav";
import { LineButton } from "./LineButton";

const btnBase = "inline-flex min-h-11 items-center justify-center gap-2 whitespace-nowrap rounded-site px-4 text-[13px] font-bold no-underline transition-colors";

/** 開く前の scrollY。null のあいだは固定していない。 */
let savedScrollY: number | null = null;

function lockScroll() {
  if (savedScrollY != null) return;
  const y = window.scrollY;
  savedScrollY = y;
  const body = document.body;
  body.style.position = "fixed";
  body.style.top = `-${y}px`;
  body.style.left = "0";
  body.style.right = "0";
  body.style.width = "100%";
}

function unlockScroll(restore = true) {
  if (savedScrollY == null) return;
  const y = savedScrollY;
  savedScrollY = null;
  const body = document.body;
  body.style.position = "";
  body.style.top = "";
  body.style.left = "";
  body.style.right = "";
  body.style.width = "";
  if (restore) window.scrollTo({ top: y, left: 0, behavior: "instant" });
}

/** 1200px 未満のメニュー。パネルは画面に固定し、閉じるときはスクロール位置を戻します。 */
export function MobileMenu() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const skipPath = useRef(true);

  function close() {
    unlockScroll();
    setOpen(false);
  }

  function openMenu() {
    lockScroll();
    setOpen(true);
  }

  useEffect(() => {
    if (skipPath.current) {
      skipPath.current = false;
      return;
    }
    unlockScroll(false);
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onHash = () => {
      unlockScroll();
      setOpen(false);
    };
    window.addEventListener("hashchange", onHash);
    return () => {
      window.removeEventListener("hashchange", onHash);
      unlockScroll();
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function onPanelClick(event: React.MouseEvent) {
    const anchor = (event.target as HTMLElement).closest("a");
    if (!anchor) return;
    const href = anchor.getAttribute("href") ?? "";
    const hash = href.includes("#") ? href.split("#")[1] : "";
    const path = href.split("#")[0];
    const samePage = hash !== "" && (path === "" || path === pathname);
    if (!samePage) {
      unlockScroll(false);
      setOpen(false);
      return;
    }
    event.preventDefault();
    unlockScroll();
    setOpen(false);
    requestAnimationFrame(() => {
      document.getElementById(hash)?.scrollIntoView({ block: "start", behavior: "instant" });
      const next = path === "" ? `#${hash}` : `${path}#${hash}`;
      history.pushState(null, "", next);
    });
  }

  return (
    <div className="min-[1200px]:hidden">
      <button
        type="button"
        className="flex min-h-11 min-w-12 flex-col items-center justify-center gap-[3px] rounded-site border border-line px-2 text-ink"
        aria-expanded={open}
        aria-controls="mobile-menu-panel"
        onClick={() => (open ? close() : openMenu())}
      >
        <span aria-hidden="true" className="flex flex-col gap-[3px]">
          <span className="block h-0.5 w-5 bg-primary" />
          <span className={`block h-0.5 w-5 bg-primary ${open ? "opacity-0" : ""}`} />
          <span className="block h-0.5 w-5 bg-primary" />
        </span>
        <span className="whitespace-nowrap text-xs font-bold leading-none">{open ? "閉じる" : "メニュー"}</span>
      </button>
      {open ? (
        <nav
          id="mobile-menu-panel"
          aria-label="メインメニュー（モバイル）"
          className="fixed inset-x-0 z-[60] overflow-y-auto border-b border-line bg-white px-4 py-3 shadow-card"
          style={{ top: "57px", maxHeight: "calc(100dvh - 57px - 4.5rem)" }}
          onClick={onPanelClick}
        >
          <SiteNav
            items={nav}
            listClassName=""
            linkClassName="flex min-h-12 items-center justify-center border-b border-line border-l-4 border-l-transparent px-3 text-center text-[15px] font-bold text-ink no-underline hover:bg-pale min-[640px]:justify-start min-[640px]:text-left"
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
            <Link href={CONTACT_HREF} prefetch={false} className={`${btnBase} bg-primary text-white hover:bg-primary-dark`}>お問い合わせ</Link>
          </div>
        </nav>
      ) : null}
    </div>
  );
}
