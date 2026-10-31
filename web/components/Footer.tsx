import Link from "next/link";
import { nav, org, fullAddress, licenses } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t-4 border-navy-900 bg-white text-ink">
      <div className="mx-auto max-w-5xl px-4 py-10">
        <nav aria-label="フッターメニュー">
          <ul className="flex flex-wrap justify-center gap-x-1 text-sm">
            {[...nav, { href: "/contact", label: "お問い合わせ・資料請求" }, { href: "/privacy", label: "個人情報保護方針" }].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-flex min-h-11 items-center px-2 text-navy-900 no-underline hover:underline hover:underline-offset-4">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-6 border-t border-line pt-6 text-center text-sm leading-7 text-muted">
          <p className="text-base font-bold text-navy-900">{org.name}</p>
          <address className="mt-1 not-italic">
            {fullAddress}
            <br />
            TEL：<a className="inline-flex min-h-11 items-center font-bold text-navy-900 underline underline-offset-4 sm:min-h-0" href="tel:0722248067">{org.tel}</a>
            <span aria-hidden="true">　</span>FAX：{org.fax}
            <br />
            メール：<a className="inline-flex min-h-11 items-center text-navy-900 underline underline-offset-4 sm:min-h-0" href={`mailto:${org.email}`}>{org.email}</a>
          </address>
          <p className="mt-2">
            監理団体許可番号：{licenses.kanri.number}（{licenses.kanri.kind}）
            <span className="hidden sm:inline">　</span>
            <br className="sm:hidden" />
            登録支援機関登録番号：{licenses.toroku.number}
          </p>
        </div>
      </div>
      <p className="bg-navy-900 py-3 text-center text-xs text-white">© {org.name}</p>
    </footer>
  );
}
