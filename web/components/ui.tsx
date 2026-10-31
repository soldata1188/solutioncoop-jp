import Link from "next/link";

/** 右向き矢印（ボタン・リンク用。装飾のため読み上げ対象外） */
export function ArrowIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className={`shrink-0 ${className}`} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

type ButtonVariant = "primary" | "outlineWhite" | "whiteCta" | "outlineCta" | "blue" | "ghost";

const buttonBase =
  "relative inline-flex min-h-12 items-center justify-center gap-3 rounded px-10 font-bold leading-snug no-underline transition-colors";

const buttonVariants: Record<ButtonVariant, string> = {
  // オレンジ地は #222 文字（6.73:1）。白文字は 2.36:1 のため使用しません。
  primary: "bg-cta text-ink shadow-sm hover:bg-cta-hover",
  outlineWhite: "border-2 border-white bg-transparent text-white hover:bg-white hover:text-primary-dark",
  // 白地＋オレンジ枠（文字は #B45309、5.02:1）
  whiteCta: "border-2 border-cta bg-white text-cta-text hover:bg-orange-50",
  outlineCta: "border-2 border-cta bg-white text-cta-text hover:bg-orange-50",
  blue: "bg-primary-dark text-white hover:bg-primary-darker",
  // 白地・グレー枠・青い矢印（資料などの「もっと見る」ボタン）
  ghost: "border border-line bg-white text-ink shadow-sm hover:border-primary [&>svg]:text-primary-dark",
};

export function buttonClass(variant: ButtonVariant = "primary", extra = "") {
  return `${buttonBase} ${buttonVariants[variant]} ${extra}`;
}

/** 文字は中央、矢印は右端に置くボタン */
export function LinkButton({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
}) {
  return (
    <Link href={href} className={buttonClass(variant, className)}>
      <span>{children}</span>
      <ArrowIcon className="absolute right-3.5 h-3.5 w-3.5" />
    </Link>
  );
}

/** 見出し下の小さな3つの四角（装飾） */
export function SquareDots({ className = "", tone = "pale" }: { className?: string; tone?: "pale" | "white" }) {
  const c = tone === "white" ? "bg-white/60" : "bg-[#b9d6f6]";
  return (
    <span aria-hidden="true" className={`flex justify-center gap-6 ${className}`}>
      <span className={`h-1.5 w-1.5 ${c}`} />
      <span className={`h-1.5 w-1.5 ${c}`} />
      <span className={`h-1.5 w-1.5 ${c}`} />
    </span>
  );
}

/** セクション見出し（中央揃え・太字・青＋3つの四角）。青 #1478E6 は24px以上の大きい文字でのみ使用 */
export function SectionHeading({
  id,
  children,
  lead,
  as: Tag = "h2",
}: {
  id?: string;
  children: React.ReactNode;
  lead?: React.ReactNode;
  as?: "h1" | "h2";
}) {
  return (
    <div className="text-center">
      <Tag id={id} className="text-2xl font-bold leading-snug text-primary md:text-[1.75rem]">
        {children}
      </Tag>
      <SquareDots className="mt-4" />
      {lead ? <p className="mx-auto mt-5 max-w-[580px] text-left text-[15px] text-body sm:text-center">{lead}</p> : null}
    </div>
  );
}

/** 左寄せの小見出し＋右へ伸びる線（リファレンスの「資料」「イベント」見出しの形） */
export function LineHeading({ id, children, as: Tag = "h3" }: { id?: string; children: React.ReactNode; as?: "h2" | "h3" }) {
  return (
    <div className="flex items-center gap-4">
      <Tag id={id} className="shrink-0 text-lg font-bold leading-snug text-primary-dark md:text-xl">
        {children}
      </Tag>
      <span aria-hidden="true" className="h-px flex-1 bg-line" />
    </div>
  );
}

/** セクション内の小見出し（左の青い四角） */
export function SubHeading({ id, children, as: Tag = "h3" }: { id?: string; children: React.ReactNode; as?: "h2" | "h3" }) {
  return (
    <Tag id={id} className="flex items-start gap-3 text-lg font-bold leading-snug text-ink md:text-xl">
      <span aria-hidden="true" className="mt-[0.45em] h-3 w-3 shrink-0 bg-primary" />
      <span>{children}</span>
    </Tag>
  );
}

const widths = {
  /** 文章中心のセクション（約580px） */
  narrow: "max-w-[612px]",
  /** カード・表のセクション */
  default: "max-w-[812px]",
  /** 幅の必要な表 */
  wide: "max-w-[932px]",
};

/** 白／淡いブルーを交互に使うセクション枠（左右16pxの余白込み） */
export function Section({
  id,
  title,
  lead,
  tone = "white",
  width = "default",
  children,
  className = "",
  flushBottom = false,
}: {
  id?: string;
  title?: React.ReactNode;
  lead?: React.ReactNode;
  tone?: "white" | "pale";
  width?: keyof typeof widths;
  children: React.ReactNode;
  className?: string;
  flushBottom?: boolean;
}) {
  return (
    <section aria-labelledby={title && id ? id : undefined} className={`${tone === "pale" ? "bg-pale" : "bg-white"} ${className}`}>
      <div className={`mx-auto ${widths[width]} px-4 ${flushBottom ? "pt-14 md:pt-[72px]" : "py-14 md:py-[72px]"}`}>
        {title ? <SectionHeading id={id} lead={lead}>{title}</SectionHeading> : null}
        <div className={title ? "mt-10" : ""}>{children}</div>
      </div>
    </section>
  );
}

/** 青地に半透明の四角を散らした背景パターン（抽象図形のみ） */
export function SquaresPattern({ variant = "hero" }: { variant?: "hero" | "band" }) {
  return (
    <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1200 520">
      {variant === "hero" ? (
        <>
          <rect x="60" y="20" width="200" height="200" fill="#0d5fc4" opacity="0.35" />
          <rect x="700" y="40" width="220" height="220" fill="#ffffff" opacity="0.08" />
          <rect x="860" y="200" width="260" height="260" fill="#ffffff" opacity="0.1" />
          <rect x="1040" y="-40" width="160" height="160" fill="#0d5fc4" opacity="0.35" />
          <rect x="600" y="330" width="140" height="140" fill="#ffffff" opacity="0.07" />
          <rect x="340" y="400" width="160" height="160" fill="#0d5fc4" opacity="0.3" />
        </>
      ) : (
        <>
          <rect x="-40" y="40" width="220" height="220" fill="#ffffff" opacity="0.05" />
          <rect x="820" y="80" width="260" height="260" fill="#ffffff" opacity="0.06" />
          <rect x="1040" y="320" width="160" height="160" fill="#ffffff" opacity="0.05" />
        </>
      )}
    </svg>
  );
}

/** 写真・資料画像などの代わりに置く要確認枠（抽象的な四角のみ） */
export function ImagePlaceholder({
  label = "画像要確認",
  note,
  className = "",
  tone = "light",
}: {
  label?: string;
  note?: string;
  className?: string;
  tone?: "light" | "onBlue";
}) {
  const box = tone === "onBlue" ? "border-white/60 bg-white/10" : "border-[#b9d6f6] bg-pale";
  return (
    <div className={`relative flex w-full items-end overflow-hidden border-2 border-dashed ${box} ${className}`}>
      <svg aria-hidden="true" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        <rect x="70" y="50" width="120" height="120" fill={tone === "onBlue" ? "#ffffff" : "#1478e6"} opacity="0.14" />
        <rect x="160" y="110" width="150" height="150" fill={tone === "onBlue" ? "#ffffff" : "#1478e6"} opacity="0.1" />
        <rect x="270" y="40" width="70" height="70" fill="#ff8a00" opacity="0.55" />
      </svg>
      <p className="relative m-3 rounded bg-amber-50 px-2 py-1 text-xs font-bold leading-relaxed text-amber-900">
        【{label}】{note}
      </p>
    </div>
  );
}

/** 番号タブ付きの淡い青枠カード（「選ばれる理由」型） */
export function TabCard({ n, children, className = "", as: Tag = "li" }: { n: number; children: React.ReactNode; className?: string; as?: "li" | "div" }) {
  return (
    <Tag className={`relative flex flex-col border-[6px] border-tab bg-white ${className}`}>
      <span aria-hidden="true" className="absolute -left-[6px] -top-[6px] flex h-8 w-8 items-center justify-center bg-tab text-base font-bold text-primary-dark">
        {n}
      </span>
      {children}
    </Tag>
  );
}
