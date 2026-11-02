import Link from "next/link";
import { LogoTile } from "@/components/Wordmark";
import { allPages, org, fullAddress, licenses, sdgs, TEL_HREF, CONTACT_HREF, CONTACT_LABEL } from "@/lib/site";
import { LineButton } from "./LineButton";
import { KeepWords, Phrases } from "./KeepWords";

export function Footer() {
  return (
    <footer className="border-t border-line bg-white text-body">
      <div className="mx-auto max-w-[812px] px-4 py-10">
        <nav aria-label="フッターメニュー">
          <ul className="grid grid-cols-2 gap-x-3 text-sm sm:flex sm:flex-wrap sm:justify-center sm:gap-x-1 sm:text-[13px]">
            {[...allPages, { href: CONTACT_HREF, label: CONTACT_LABEL }, { href: "/privacy", label: "個人情報保護方針" }].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="flex min-h-11 items-center border-b border-line px-1 text-ink sm:inline-flex sm:border-b-0 sm:px-2 no-underline hover:text-primary-dark hover:underline hover:underline-offset-4">
                  <Phrases text={item.label} />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {/* スマートフォンでは、直前の CTA 帯と画面下部の固定バーに同じ操作があるため、ボタンは表示しません。
            PC は主ボタン「LINEで無料相談」＋メールの副ボタン（電話番号は下の所在地欄のリンク） */}
        <div className="mt-6 hidden items-center justify-center gap-3 sm:flex">
          <LineButton className="inline-flex min-h-12 gap-2 px-6 text-base" iconClassName="h-5 w-5" />
          <Link href={CONTACT_HREF} className="inline-flex min-h-12 items-center rounded border-2 border-primary-dark bg-white px-6 text-base font-bold text-primary-dark no-underline hover:bg-cta-tint">
            <Phrases text={CONTACT_LABEL} />
          </Link>
        </div>
        <div className="mt-6 border-t border-line pt-6 text-center text-[13px] leading-7 text-muted">
          <p className="inline-flex items-center gap-2.5 text-[15px] font-bold text-ink">
            <LogoTile alt="" className="h-10 w-10" />
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
          <p className="mt-2 text-black"><KeepWords text={sdgs.support} /></p>
        </div>
      </div>
      <p className="bg-primary-dark py-3 text-center text-xs text-white">© {org.name}</p>
    </footer>
  );
}
