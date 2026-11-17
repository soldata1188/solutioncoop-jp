import Image from "next/image";
import Link from "next/link";
import { Chunks } from "@/components/KeepWords";
import { photos } from "@/lib/images";
import { CONTACT_HREF, LINE_URL } from "@/lib/site";

/** ヒーロー下端の工場スカイライン（自作。写真の上に重ねる装飾） */
function FactorySkyline() {
  return (
    <svg aria-hidden="true" viewBox="0 0 1440 168" preserveAspectRatio="xMidYMax slice" className="pointer-events-none absolute inset-x-0 bottom-0 h-[4.5rem] w-full sm:h-24 md:h-28">
      <path
        fill="#02150d"
        d="M0 168V118H36V96h18V78h10v18h16v22h28V88h14V62h8v26h22v30h40V104h70V78h16V52h8v26h24v26h36V92h48V118h32V70h12V46h8v24h20v48h44V96h56V64h18V40h10v24h22v32h40V108h64V86h22V58h8v28h16v22h48V100h36V72h14V48h8v24h18v28h52V112h70V90h24V66h8v24h20v22h80V118h90V96h28V74h10v22h22v22H1440V168H0Z"
      />
    </svg>
  );
}

function IconConstruction() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
      <path d="M4 20h16M8 20V9l4-5 4 5v11" />
      <path d="M12 4v-1M10 20v-4h4v4" />
    </svg>
  );
}

function IconFactory() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
      <path d="M3 20V11l5 3V11l5 3V9h8v11H3z" />
      <path d="M16 6V3M16 6h3" />
    </svg>
  );
}

function IconBuilding() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
      <path d="M5 20V5h8v15M13 20V10h6v10" />
      <path d="M8 8h2M8 12h2M8 16h2M16 13h2M16 16h2" />
    </svg>
  );
}

const chipBase = "inline-flex min-h-9 items-center gap-1.5 rounded px-3 py-1 text-sm font-bold leading-none";

/**
 * トップのヒーロー。背景は既存の金属加工場の写真。
 * 許可証などと同様、実写を足す場合は photos.siteSteel を差し替える。
 */
export function HomeHero() {
  return (
    <section data-hero className="relative isolate overflow-hidden text-white">
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src={photos.siteSteel.src}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      {/* 暗い緑のオーバーレイ。白文字・黄色アクセントが写真の明暗に左右されないようにする */}
      <div aria-hidden="true" className="absolute inset-0 bg-primary-darker/88" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-primary-darker/40 via-transparent to-transparent" />
      <FactorySkyline />

      <div className="relative mx-auto flex max-w-[920px] flex-col items-center px-4 pb-24 pt-14 text-center sm:pb-28 sm:pt-16 md:pb-32 md:pt-20">
        <h1 className="text-[1.7rem] font-black leading-tight sm:text-4xl md:text-5xl">
          <span className="block text-white">
            <Chunks parts={["技能実習生・", "育成就労・", "特定技能、"]} />
          </span>
          <span className="mt-2 block text-cta">
            <Chunks parts={["外国人採用を", "適正な監理で支えます。"]} />
          </span>
        </h1>

        <p className="mt-6 text-base font-bold leading-relaxed text-white md:mt-8 md:text-xl">
          <span className="block">
            <span className="inline-block">実習生の受入れから</span>
            <span className="inline-block">
              <span className="mx-1 text-cta">育成就労・特定技能</span>
              への移行まで、
            </span>
          </span>
          <span className="mt-1 block">
            <span className="inline-block">70社超の実績とノウハウで、</span>
            <span className="inline-block">貴社の外国人材活用を</span>
            <span className="inline-block">トータルサポートいたします。</span>
          </span>
        </p>

        <div className="mt-8 flex w-full max-w-3xl flex-col items-center gap-3 rounded-2xl border border-white/30 bg-white/10 px-3 py-3 sm:mt-10 sm:w-auto sm:flex-row sm:gap-4 sm:px-5 md:py-4">
          <p className="text-xs font-bold tracking-wide text-cta">主な対応業種</p>
          <ul className="flex flex-wrap items-center justify-center gap-2">
            <li className={`${chipBase} bg-white text-primary-darker`}>
              <IconConstruction />
              建設業
            </li>
            <li className={`${chipBase} bg-white text-primary-darker`}>
              <IconFactory />
              製造業
            </li>
            <li className={`${chipBase} border border-white/50 bg-primary-darker text-white`}>
              <IconBuilding />
              その他業種
            </li>
          </ul>
        </div>

        <p className="mt-5 text-sm font-bold leading-relaxed text-white md:text-base">
          <span className="inline-block">大阪・関西圏の</span>
          <span className="mx-1 inline-block text-xl font-black text-cta md:text-2xl">70社を超える企業</span>
          <span className="inline-block">に導入されています。</span>
        </p>

        <div className="mt-8 grid w-full max-w-xl grid-cols-2 gap-2 sm:gap-3 md:mt-10">
          <Link
            href={CONTACT_HREF}
            className="flex min-h-16 items-center justify-center gap-1 rounded-lg bg-cta px-2 py-3 text-center font-black text-ink no-underline transition-colors hover:bg-cta-hover"
          >
            <span className="flex flex-col items-center leading-tight">
              <span className="text-[13px] sm:text-lg">
                <Chunks parts={["受入れを", "検討する"]} />
              </span>
              <span className="mt-0.5 text-[10px] font-bold sm:text-xs">無料相談・お問い合わせ</span>
            </span>
            <span aria-hidden="true" className="text-base sm:text-xl">→</span>
          </Link>
          <a
            href={LINE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-16 flex-col items-center justify-center rounded-lg border-2 border-white/80 bg-white/15 px-2 py-3 text-center font-black leading-tight text-white no-underline transition-colors hover:bg-white/25"
          >
            <span className="text-[13px] sm:text-lg">24時間相談窓口</span>
            <span className="mt-0.5 text-[10px] font-bold sm:text-xs">
              <Chunks parts={["実習生・", "外国人材の方はこちら"]} />
            </span>
            <span className="sr-only">（LINE公式アカウントを新しいタブで開きます）</span>
          </a>
        </div>
      </div>
    </section>
  );
}
