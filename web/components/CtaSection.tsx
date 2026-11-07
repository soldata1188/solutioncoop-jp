import { CONTACT_HREF, CONTACT_LABEL, TEL_HREF, org, repoFacts } from "@/lib/site";
import { PhoneIcon } from "./Header";
import { LineButton } from "./LineButton";
import { Phrases } from "./KeepWords";
import { LinkButton, SquaresPattern } from "./ui";

/** 最後のCTA帯。本文サイズの白文字を置くため、背景は濃い緑 #0F4D2A（白文字 9.93:1） */
export function CtaSection({ title = "育成就労制度への備えを、今から始めませんか。" }: { title?: string }) {
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden bg-primary-dark text-white">
      <SquaresPattern variant="band" />
      <div className="relative mx-auto max-w-[612px] px-4 py-14 text-center md:py-[72px]">
        <h2 id="cta-title" className="text-2xl font-bold leading-snug md:text-[1.75rem]">{title}</h2>
        <p className="mx-auto mt-5 text-left text-[15px] sm:text-center">
          外国人材の受入れや育成就労制度について、堺市の監理団体である当組合が丁寧にご説明いたします。ご相談はお気軽にお申し付けください。
        </p>
        {/* 主ボタンは「LINEで無料相談」1つ。メール（/contact のフォーム）は白枠の副ボタン */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <LineButton className="flex min-h-14 gap-2 px-8 text-base sm:min-w-64" iconClassName="h-5 w-5" />
          <LinkButton href={CONTACT_HREF} variant="outlineWhite" className="min-h-14 sm:min-w-64"><Phrases text={CONTACT_LABEL} /></LinkButton>
        </div>
        <p className="mt-6 text-[15px]">
          お電話でのご相談
          <a href={TEL_HREF} className="mx-auto mt-2 flex min-h-12 w-fit items-center gap-2 rounded border-2 border-white px-5 text-xl font-bold text-white no-underline hover:bg-white/10">
            <PhoneIcon className="h-5 w-5" />
            {org.tel}
          </a>
          <span className="mt-2 block text-sm">
            受付時間：{repoFacts.hours}（社内資料の記載）
            <span className="ml-1 rounded bg-amber-100 px-1 font-bold text-amber-900">要確認</span>
          </span>
        </p>
      </div>
    </section>
  );
}
