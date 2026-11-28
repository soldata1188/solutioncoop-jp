import Link from "next/link";
import { LogoTile } from "@/components/Wordmark";
import { ChatIcon } from "@/components/LineButton";
import { org, fullAddress, sdgs, TEL_HREF, FACEBOOK_URL, LINE_URL, LINE_ARIA, repoFacts } from "@/lib/site";
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

function FacebookIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M14.8 8.2V6.6c0-.6.4-.9 1-.9H17V3.4h-2.1C12.3 3.4 11 4.7 11 6.7v1.5H9.2v2.6H11V20h3.1v-9.2h2.2l.3-2.6h-2.5z" />
    </svg>
  );
}

const iconButton =
  "inline-flex size-11 items-center justify-center rounded-full bg-white text-primary-dark no-underline hover:bg-cta focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

const textLink = "font-bold text-white underline-offset-4 hover:text-cta hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

export function Footer() {
  return (
    <footer className="bg-primary-dark text-white">
      <div className="mx-auto grid max-w-[1100px] items-center gap-6 px-4 py-8 md:grid-cols-3 md:gap-8">
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

        <nav aria-label="フッターメニュー">
          <ul className="grid grid-cols-2 gap-x-3">
            {footerLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} prefetch={false} className={`flex min-h-11 items-center justify-center px-1 py-1 text-sm md:min-h-9 md:justify-start md:px-0 ${textLink}`}>
                  <Phrases text={item.label} />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center justify-center gap-3 md:justify-start">
          <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" aria-label="公式Facebook（新しいタブで開きます）" className={iconButton}>
            <FacebookIcon />
          </a>
          <a href={LINE_URL} target="_blank" rel="noopener noreferrer" aria-label={LINE_ARIA} className={iconButton}>
            <ChatIcon className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="border-t border-white/35 px-4 py-3 text-center text-[13px] leading-5 text-white">
        <p>
          <Chunks parts={sdgs.supportParts} />
        </p>
        <p className="mt-1">© {org.name}</p>
      </div>
    </footer>
  );
}
