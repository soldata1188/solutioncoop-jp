"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { isCurrent } from "./NavLink";

const HOME_IDS = ["reasons", "for-workers", "news", "contact"];
const ABOUT_IDS = ["business", "disclosure"];

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
  const sectionIds = pathname === "/" ? HOME_IDS : pathname === "/about" ? ABOUT_IDS : [];
  const activeId = seenId && sectionIds.includes(seenId) ? seenId : null;

  useEffect(() => {
    const ids = pathname === "/" ? HOME_IDS : pathname === "/about" ? ABOUT_IDS : [];
    if (ids.length === 0) return;
    const targets = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el != null);
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
        const inView = hash !== "" && hash === activeId;
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              prefetch={false}
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
