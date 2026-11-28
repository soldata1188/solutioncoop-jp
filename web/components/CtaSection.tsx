import { CONTACT_HREF, CONTACT_LABEL, TEL_HREF, org, repoFacts } from "@/lib/site";
import { PhoneIcon } from "./Header";
import { LineButton } from "./LineButton";
import { Phrases } from "./KeepWords";
import type { ReactNode } from "react";
import { LinkButton, SquareDots, SquaresPattern, sectionTitleClassOnDark } from "./ui";

/** 最後のCTA帯。本文サイズの白文字を置くため、背景は濃い緑 #0F4D2A（白文字 9.93:1） */
export function CtaSection({ title }: { title?: ReactNode }) {
  return (
    <section aria-labelledby={title ? "cta-title" : undefined} data-reveal="" className="relative overflow-hidden bg-primary-dark text-white">
      <SquaresPattern variant="band" />
      <div className="relative mx-auto max-w-[612px] px-4 py-14 text-center md:py-[72px]">
        {title ? (
          <>
            <h2 id="cta-title" className={sectionTitleClassOnDark}>{title}</h2>
            <SquareDots tone="white" className="mt-4" />
          </>
        ) : null}
        <p className={`mx-auto text-left text-[15px] sm:text-center ${title ? "mt-5" : ""}`}>
          外国人材の受入れや育成就労制度について、堺市の監理団体である当組合が丁寧にご説明いたします。どうぞお気軽にご相談ください。
        </p>
        {/* 主ボタンは「LINEで無料相談」1つ。メールでのお問い合わせ（/#contact）は白枠の副ボタン */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <LineButton className="flex min-h-14 gap-2 px-8 text-base sm:min-w-64" iconClassName="h-5 w-5" />
          <LinkButton href={CONTACT_HREF} variant="outlineWhite" className="min-h-14 sm:min-w-64"><Phrases text={CONTACT_LABEL} /></LinkButton>
        </div>
        <p className="mt-6 text-[15px]">
          お電話でのご相談
          <a href={TEL_HREF} className="mx-auto mt-2 flex min-h-12 w-fit items-center gap-2 rounded-control border border-white px-5 text-xl font-bold text-white no-underline hover:bg-white/10">
            <PhoneIcon className="h-5 w-5" />
            {org.tel}
          </a>
          <span className="mt-2 block text-sm">受付時間：{repoFacts.hours}</span>
        </p>
      </div>
    </section>
  );
}
