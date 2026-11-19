import Link from "next/link";
import { LogoTile } from "@/components/Wordmark";
import { nav, org, fullAddress, licenses, sdgs, TEL_HREF, CONTACT_HREF, CONTACT_LABEL, FACEBOOK_URL, X_HANDLE, X_URL } from "@/lib/site";
import { LineButton } from "./LineButton";
import { Chunks, Phrases } from "./KeepWords";

const footerLinks = [...nav, { href: "/privacy", label: "個人情報保護方針" }];

function XIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M4 4.2h4.2l4 5.5 4.5-5.5H20L14.2 12 20 19.8h-4.2l-4.3-5.8-4.8 5.8H4l6.2-7.5L4 4.2z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M14.8 8.2V6.6c0-.6.4-.9 1-.9H17V3.4h-2.1C12.3 3.4 11 4.7 11 6.7v1.5H9.2v2.6H11V20h3.1v-9.2h2.2l.3-2.6h-2.5z" />
    </svg>
  );
}

const iconButton = "inline-flex size-11 items-center justify-center rounded-full border border-pale-border bg-white text-primary-dark no-underline hover:border-primary";

export function Footer() {
  return (
    <footer className="border-t border-primary/20 bg-pale text-body">
      <div className="mx-auto max-w-[1100px] px-4 py-12 md:py-16">
        <div className="grid items-start gap-12 md:grid-cols-12 md:gap-10">
          <div className="flex flex-col items-center text-center md:col-span-5 md:items-start md:text-left">
            <p className="inline-flex max-w-full flex-wrap items-center justify-center gap-2.5 text-[15px] font-bold text-ink md:justify-start">
              <LogoTile alt="" />
              {org.name}
            </p>
            <address className="mt-4 not-italic text-sm leading-7 text-body">
              {fullAddress}
              <br />
              TEL：<a className="inline-flex min-h-11 items-center font-bold text-primary-dark underline underline-offset-4 md:min-h-0" href={TEL_HREF}>{org.tel}</a>
              <span aria-hidden="true">　</span>FAX：{org.fax}
              <br />
              メール：<a className="inline-flex min-h-11 items-center text-primary-dark underline underline-offset-4 md:min-h-0" href={`mailto:${org.email}`}>{org.email}</a>
            </address>
            <p className="mt-4 text-sm leading-7 text-muted">
              監理団体許可番号：{licenses.kanri.number}（{licenses.kanri.kind}）
              <br />
              登録支援機関登録番号：{licenses.toroku.number}
            </p>
            <p className="mt-5 max-w-[18rem] text-base font-bold leading-relaxed text-black [text-wrap:balance]">
              <Chunks parts={sdgs.supportParts} />
            </p>
          </div>

          <nav aria-label="フッターメニュー" className="md:col-span-3">
            <p className="text-[11px] font-bold tracking-[0.16em] text-primary-dark">メニュー</p>
            <ul className="mt-2">
              {footerLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="flex min-h-11 items-center justify-center text-sm font-bold text-ink no-underline hover:text-primary-dark hover:underline hover:underline-offset-4 md:justify-start">
                    <Phrases text={item.label} />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col items-center md:col-span-4 md:items-start">
            <p className="text-[11px] font-bold tracking-[0.16em] text-primary-dark">連絡先</p>
            <div className="mt-4 flex flex-col items-center gap-3 md:items-start">
              <LineButton className="hidden min-h-12 gap-2 px-6 text-base sm:inline-flex" iconClassName="h-5 w-5" />
              <Link href={CONTACT_HREF} className="hidden min-h-12 items-center rounded border-2 border-primary-dark bg-white px-6 text-base font-bold text-primary-dark no-underline hover:bg-cta-tint sm:inline-flex">
                <Phrases text={CONTACT_LABEL} />
              </Link>
            </div>
            <div className="mt-4 flex items-center justify-center gap-3 md:justify-start">
              <a href={X_URL} target="_blank" rel="noopener noreferrer" className={iconButton}>
                <XIcon />
                <span className="sr-only">公式X（@{X_HANDLE}）（新しいタブで開きます）</span>
              </a>
              <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className={iconButton}>
                <FacebookIcon />
                <span className="sr-only">公式Facebook（新しいタブで開きます）</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <p className="bg-primary-dark py-3 text-center text-xs text-white">© {org.name}</p>
    </footer>
  );
}
