"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { isCurrent } from "./NavLink";

const SECTION_IDS = ["business", "reasons", "cases"];

export function SiteNav({
  items,
  listClassName,
  linkClassName,
  activeClassName,
}: {
  items: { href: string; label: string }[];
  listClassName: string;
  linkClassName: string;
  activeClassName: string;
}) {
  const pathname = usePathname();
  const [seenId, setSeenId] = useState<string | null>(null);
  const activeId = pathname === "/" ? seenId : null;

  useEffect(() => {
    if (pathname !== "/") return;
    const targets = SECTION_IDS.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el != null);
    if (targets.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setSeenId(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0.15, 0.4] },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <ul className={listClassName}>
      {items.map((item) => {
        const hash = item.href.includes("#") ? item.href.split("#")[1] : "";
        const onPage = !hash && isCurrent(pathname, item.href);
        const inView = pathname === "/" && hash !== "" && hash === activeId;
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={onPage ? "page" : inView ? "location" : undefined}
              className={`${linkClassName} ${onPage || inView ? activeClassName : ""}`}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
