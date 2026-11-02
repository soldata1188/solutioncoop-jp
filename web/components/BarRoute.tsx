"use client";

import { usePathname } from "next/navigation";

/** 固定バーを出さないページ（/contact はページ内に電話・LINE・フォームがあるため、/privacy は本文の閲覧を優先するため） */
const HIDDEN_ON = ["/contact", "/privacy"];

/**
 * スマートフォン用の固定バーを、ページに応じて表示・非表示にします。
 * 表示するページでは、バーと同じ高さ（69px＋safe-area）の余白をフッターの後ろに置き、ページ末尾（©の行）を覆わないようにします。
 * パスはサーバー側でも判定されるため、JavaScript が無効でも同じ表示になります。
 */
export function BarRoute({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname && HIDDEN_ON.some((p) => pathname === p || pathname.startsWith(`${p}/`))) return null;
  return (
    <>
      <div aria-hidden="true" className="h-[calc(69px+env(safe-area-inset-bottom))] shrink-0 md:hidden" />
      {children}
    </>
  );
}
