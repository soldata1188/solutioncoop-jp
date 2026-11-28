import Link from "next/link";
import { LogoTile } from "@/components/Wordmark";
import { org, fullAddress, sdgs, TEL_HREF, repoFacts } from "@/lib/site";
import { Chunks, Phrases } from "./KeepWords";

/** 相談窓口、ホームの活動情報、下層ページ。 */
const footerLinks = [
  { href: "/#for-workers", label: "相談窓口" },
  { href: "/#news", label: "活動情報" },
  { href: "/faq", label: "よくある質問" },
  { href: "/about", label: "組合概要" },
  { href: "/about#disclosure", label: "情報公開" },
  { href: "/privacy", label: "個人情報保護方針" },
];

const textLink = "font-bold text-white underline-offset-4 hover:text-cta hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

export function Footer() {
  return (
    <footer className="bg-primary-dark text-white">
      <div className="mx-auto grid max-w-[1100px] items-center gap-6 px-4 py-8 md:grid-cols-2 md:gap-10">
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <p className="inline-flex max-w-full flex-wrap items-center justify-center gap-2.5 text-[15px] font-bold text-white md:justify-start">
              <span className="inline-flex items-center bg-white p-1">
                <LogoTile alt="ソリューション協同組合" heightClass="h-[22px]" />
              </span>
              <span aria-hidden="true">{org.name}</span>
            </p>
          <address className="mt-3 not-italic text-sm leading-6 text-white">
            {fullAddress}
            <br />
            TEL：<a className={`inline-flex min-h-11 items-center md:min-h-0 ${textLink}`} href={TEL_HREF}>{org.tel}</a>
            <br />
            受付時間：{repoFacts.hours}
            <br />
            FAX：{org.fax}
            <br />
            メール：<a className={`inline-flex min-h-11 items-center md:min-h-0 ${textLink}`} href={`mailto:${org.email}`}>{org.email}</a>
          </address>
        </div>

        <nav aria-label="フッターメニュー" className="md:justify-self-end">
          <ul className="grid grid-cols-2 gap-x-3 md:gap-x-8">
            {footerLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} prefetch={false} className={`flex min-h-11 items-center justify-center px-1 py-1 text-sm md:min-h-9 md:justify-start md:px-0 ${textLink}`}>
                  <Phrases text={item.label} />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-white/35 px-4 py-3 text-center text-sm leading-5 text-white">
        <p>
          <Chunks parts={sdgs.supportParts} />
        </p>
        <p className="mt-1">© {org.name}</p>
      </div>
    </footer>
  );
}
