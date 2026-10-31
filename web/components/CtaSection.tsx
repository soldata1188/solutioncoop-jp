import { CONTACT_HREF, org } from "@/lib/site";
import { LinkButton, SquaresPattern } from "./ui";

/** 最後のCTA帯。本文サイズの白文字を置くため、背景は濃い青 #0D5FC4（白文字 6.09:1） */
export function CtaSection({ title = "育成就労制度への備えを、今から始めませんか。" }: { title?: string }) {
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden bg-primary-dark text-white">
      <SquaresPattern variant="band" />
      <div className="relative mx-auto max-w-[612px] px-4 py-14 text-center md:py-[72px]">
        <h2 id="cta-title" className="text-2xl font-bold leading-snug md:text-[1.75rem]">{title}</h2>
        <p className="mx-auto mt-5 text-left text-[15px] sm:text-center">
          外国人材の受入れや育成就労制度について、堺市の監理団体である当組合が丁寧にご説明いたします。資料請求・ご相談はお気軽にお申し付けください。
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <LinkButton href={CONTACT_HREF} className="min-h-14 sm:min-w-56">お問い合わせ</LinkButton>
          <LinkButton href={CONTACT_HREF} variant="whiteCta" className="min-h-14 sm:min-w-56">資料請求</LinkButton>
        </div>
        <p className="mt-6 text-[15px]">
          お電話でのご相談：<a href="tel:0722248067" className="inline-flex min-h-11 items-center font-bold text-white underline underline-offset-4">{org.tel}</a>
          <span className="block text-sm">（受付時間：<span className="rounded bg-amber-100 px-1 font-bold text-amber-900">要確認</span>）</span>
        </p>
      </div>
    </section>
  );
}
