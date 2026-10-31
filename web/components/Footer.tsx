import Link from "next/link";
import { nav, org, fullAddress, licenses } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-white text-body">
      <div className="mx-auto max-w-[812px] px-4 py-10">
        <nav aria-label="フッターメニュー">
          <ul className="flex flex-wrap justify-center gap-x-1 text-[13px]">
            {[...nav, { href: "/contact", label: "お問い合わせ・資料請求" }, { href: "/privacy", label: "個人情報保護方針" }].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-flex min-h-11 items-center px-2 text-ink no-underline hover:text-primary-dark hover:underline hover:underline-offset-4">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-6 border-t border-line pt-6 text-center text-[13px] leading-7 text-muted">
          <p className="text-[15px] font-bold text-ink">{org.name}</p>
          <address className="mt-1 not-italic">
            {fullAddress}
            <br />
            TEL：<a className="inline-flex min-h-11 items-center font-bold text-primary-dark underline underline-offset-4 sm:min-h-0" href="tel:0722248067">{org.tel}</a>
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
