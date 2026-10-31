import Link from "next/link";
import { CONTACT_HREF, CONTACT_LABEL, org } from "@/lib/site";

export function CtaSection({ title = "育成就労制度への備えを、今から始めませんか。" }: { title?: string }) {
  return (
    <section aria-labelledby="cta-title" className="bg-navy-900 text-white">
      <div className="mx-auto max-w-4xl px-4 py-14 text-center">
        <h2 id="cta-title" className="text-2xl font-bold leading-snug md:text-3xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-slate-100">
          外国人材の受入れや育成就労制度について、堺市の監理団体である当組合が丁寧にご説明いたします。資料請求・ご相談はお気軽にお申し付けください。
        </p>
        <Link
          href={CONTACT_HREF}
          className="mt-8 inline-flex min-h-14 items-center justify-center rounded-md bg-accent-500 px-8 text-lg font-bold text-navy-950 shadow hover:bg-accent-400"
        >
          {CONTACT_LABEL}
        </Link>
        <p className="mt-5 text-slate-100">
          お電話でのご相談：<a href="tel:0722248067" className="font-bold underline underline-offset-4">{org.tel}</a>
          <span className="block text-sm">（受付時間：<span className="rounded bg-amber-100 px-1 font-bold text-amber-900">要確認</span>）</span>
        </p>
      </div>
    </section>
  );
}
