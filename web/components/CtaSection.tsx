import { CONTACT_HREF, org } from "@/lib/site";
import { LinkButton, SquaresPattern, SquareDots } from "./ui";

export function CtaSection({ title = "育成就労制度への備えを、今から始めませんか。" }: { title?: string }) {
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden bg-navy-900 text-white">
      <SquaresPattern />
      <div className="relative mx-auto max-w-3xl px-4 py-16 text-center md:py-20">
        <h2 id="cta-title" className="text-2xl font-bold leading-snug md:text-3xl">{title}</h2>
        <SquareDots className="mt-4 [&>span:nth-child(odd)]:bg-white" />
        <p className="mx-auto mt-6 max-w-2xl text-left text-slate-100 sm:text-center">
          外国人材の受入れや育成就労制度について、堺市の監理団体である当組合が丁寧にご説明いたします。資料請求・ご相談はお気軽にお申し付けください。
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <LinkButton href={CONTACT_HREF} className="min-h-14 text-lg">お問い合わせ</LinkButton>
          <LinkButton href={CONTACT_HREF} variant="outlineWhite" className="min-h-14 text-lg">資料請求</LinkButton>
        </div>
        <p className="mt-6 text-slate-100">
          お電話でのご相談：<a href="tel:0722248067" className="inline-flex min-h-11 items-center font-bold text-white underline underline-offset-4">{org.tel}</a>
          <span className="block text-sm">（受付時間：<span className="rounded bg-amber-100 px-1 font-bold text-amber-900">要確認</span>）</span>
        </p>
      </div>
    </section>
  );
}
