import Link from "next/link";
import { LogoTile } from "@/components/Wordmark";
import { org, fullAddress, licenses, sdgs, TEL_HREF, CONTACT_HREF, CONTACT_LABEL, X_HANDLE, X_URL } from "@/lib/site";
import { LineButton } from "./LineButton";
import { Chunks, Phrases } from "./KeepWords";

const footerLead = { href: "/roadmap", label: "2027年4月に向けた準備" };
const footerLinks = [
  { href: "/support", label: "受入れ後の支援" },
  { href: "/faq", label: "よくある質問" },
  { href: "/about", label: "組合概要" },
  { href: CONTACT_HREF, label: CONTACT_LABEL },
  { href: "/disclosure", label: "情報公開" },
  { href: "/privacy", label: "個人情報保護方針" },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-white text-body">
      <div className="mx-auto max-w-[812px] px-4 py-10">
        <nav aria-label="フッターメニュー" className="mx-auto max-w-xl text-center">
          <p>
            <Link href={footerLead.href} className="inline-flex min-h-11 items-center text-[15px] font-bold text-primary-dark no-underline hover:underline hover:underline-offset-4">
              {footerLead.label}
            </Link>
          </p>
          <ul className="grid grid-cols-2 text-sm sm:flex sm:flex-wrap sm:justify-center">
            {footerLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="flex min-h-11 items-center justify-center px-2 text-ink no-underline hover:text-primary-dark hover:underline hover:underline-offset-4 sm:inline-flex">
                  <Phrases text={item.label} />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {/* スマートフォンでは、直前の CTA 帯と画面下部の固定バーに同じ電話・LINE・メールがあるため、その2つは表示しません。
            公式Xは固定バーに無いため、画面幅を問わず表示します。PC は LINE・メールの横に並べます。 */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <LineButton className="hidden min-h-12 gap-2 px-6 text-base sm:inline-flex" iconClassName="h-5 w-5" />
          <Link href={CONTACT_HREF} className="hidden min-h-12 items-center rounded border-2 border-primary-dark bg-white px-6 text-base font-bold text-primary-dark no-underline hover:bg-cta-tint sm:inline-flex">
            <Phrases text={CONTACT_LABEL} />
          </Link>
          <a
            href={X_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center rounded border-2 border-primary-dark bg-white px-6 text-base font-bold text-primary-dark no-underline hover:bg-cta-tint"
          >
            公式X（@{X_HANDLE}）
            <span className="sr-only">（新しいタブで開きます）</span>
          </a>
        </div>
        {/* SDGs未来都市・堺の応援（文字のみ。ロゴ画像は承認範囲の確認前のため使いません）。黒文字・1〜2行 */}
        <p className="mx-auto mt-6 max-w-[560px] rounded border border-line-strong bg-white px-4 py-4 text-center text-base font-bold leading-relaxed text-black shadow-card [text-wrap:balance]">
          <Chunks parts={sdgs.supportParts} />
        </p>
        <div className="mt-6 border-t border-line pt-6 text-center text-sm leading-7 text-muted">
          <p className="inline-flex max-w-full flex-wrap items-center justify-center gap-2.5 text-[15px] font-bold text-ink">
            <LogoTile alt="" />
            {org.name}
          </p>
          <address className="mt-1 not-italic">
            {fullAddress}
            <br />
            TEL：<a className="inline-flex min-h-11 items-center font-bold text-primary-dark underline underline-offset-4 sm:min-h-0" href={TEL_HREF}>{org.tel}</a>
            <span aria-hidden="true">　</span>FAX：{org.fax}
            <br />
            メール：<a className="inline-flex min-h-11 items-center text-primary-dark underline underline-offset-4 sm:min-h-0" href={`mailto:${org.email}`}>{org.email}</a>
          </address>
          <p className="mt-2">
            監理団体許可番号：{licenses.kanri.number}（{licenses.kanri.kind}）
            <span className="hidden sm:inline">　</span>
            <br className="sm:hidden" />
            登録支援機関登録番号：{licenses.toroku.number}
          </p>
        </div>
      </div>
      <p className="bg-primary-dark py-3 text-center text-xs text-white">© {org.name}</p>
    </footer>
  );
}
