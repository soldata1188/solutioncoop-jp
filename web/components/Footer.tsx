import Link from "next/link";
import { nav, org, fullAddress, licenses } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-navy-950 text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-2">
        <div>
          <p className="text-xl font-bold">{org.name}</p>
          <address className="mt-3 not-italic leading-8 text-slate-100">
            {fullAddress}
            <br />
            TEL：<a className="underline underline-offset-4" href="tel:0722248067">{org.tel}</a>
            <br />
            FAX：{org.fax}
            <br />
            メール：<a className="underline underline-offset-4" href={`mailto:${org.email}`}>{org.email}</a>
          </address>
          <p className="mt-3 text-sm leading-7 text-slate-200">
            監理団体許可番号：{licenses.kanri.number}（{licenses.kanri.kind}）
            <br />
            登録支援機関登録番号：{licenses.toroku.number}
          </p>
        </div>
        <nav aria-label="フッターメニュー">
          <ul className="grid grid-cols-2 gap-x-4">
            {[...nav, { href: "/contact", label: "お問い合わせ・資料請求" }, { href: "/privacy", label: "個人情報保護方針" }].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-flex min-h-11 items-center text-slate-100 underline-offset-4 hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <p className="border-t border-white/15 py-4 text-center text-sm text-slate-200">
        © {org.name}
      </p>
    </footer>
  );
}
