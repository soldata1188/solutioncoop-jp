"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/** 現在のページなら true（下層パスも含む。トップ "/" は完全一致のみ） */
export function isCurrent(pathname: string | null, href: string) {
  if (!pathname) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * ナビゲーション用リンク。現在のページでは aria-current="page" を付け、
 * activeClassName（下線・太字など）を追加します。
 */
export function NavLink({
  href,
  className = "",
  activeClassName = "",
  children,
}: {
  href: string;
  className?: string;
  activeClassName?: string;
  children: React.ReactNode;
}) {
  const current = isCurrent(usePathname(), href);
  return (
    <Link href={href} aria-current={current ? "page" : undefined} className={`${className} ${current ? activeClassName : ""}`}>
      {children}
    </Link>
  );
}
