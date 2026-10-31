import Link from "next/link";

/** 右向き矢印（ボタン・リンク用。装飾のため読み上げ対象外） */
export function ArrowIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className={`shrink-0 ${className}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

type ButtonVariant = "primary" | "outlineWhite" | "outlineAccent" | "navy" | "ghost";

const buttonBase =
  "inline-flex min-h-12 items-center justify-center gap-3 rounded-md px-6 font-bold leading-snug no-underline transition-colors";

const buttonVariants: Record<ButtonVariant, string> = {
  // オレンジ地に紺文字（#12305E / #F97316 = 4.65:1、AA適合）。白文字は 2.8:1 のため使いません。
  primary: "bg-accent-500 text-navy-900 shadow-sm hover:bg-accent-400",
  outlineWhite: "border-2 border-white bg-transparent text-white hover:bg-white hover:text-navy-900",
  outlineAccent: "border-2 border-accent-500 bg-white text-accent-700 hover:bg-orange-50",
  navy: "bg-navy-900 text-white hover:bg-navy-700",
  ghost: "border border-line bg-white text-navy-900 shadow-sm hover:border-navy-700",
};

export function buttonClass(variant: ButtonVariant = "primary", extra = "") {
  return `${buttonBase} ${buttonVariants[variant]} ${extra}`;
}

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
      <ArrowIcon />
    </Link>
  );
}

/** 見出し下の小さな3つの四角（装飾） */
export function SquareDots({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`flex justify-center gap-2.5 ${className}`}>
      <span className="h-1.5 w-1.5 bg-navy-900" />
      <span className="h-1.5 w-1.5 bg-accent-500" />
      <span className="h-1.5 w-1.5 bg-navy-900" />
    </span>
  );
}

/** セクション見出し（中央揃え・太字・紺＋3つの四角） */
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
      <Tag id={id} className="text-2xl font-bold leading-snug text-navy-900 md:text-[1.9rem]">
        {children}
      </Tag>
      <SquareDots className="mt-4" />
      {lead ? <p className="mx-auto mt-5 max-w-2xl text-left text-muted sm:text-center">{lead}</p> : null}
    </div>
  );
}

/** セクション内の小見出し（左の紺の四角） */
export function SubHeading({ id, children, as: Tag = "h3" }: { id?: string; children: React.ReactNode; as?: "h2" | "h3" }) {
  return (
    <Tag id={id} className="flex items-start gap-3 text-xl font-bold leading-snug text-navy-900">
      <span aria-hidden="true" className="mt-[0.45em] h-3 w-3 shrink-0 bg-navy-900" />
      <span>{children}</span>
    </Tag>
  );
}

/** 白／淡いブルーを交互に使うセクション枠 */
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
  flushBottom?: boolean;
  id?: string;
  title?: React.ReactNode;
  lead?: React.ReactNode;
  tone?: "white" | "pale";
  width?: "narrow" | "default" | "wide";
  children: React.ReactNode;
  className?: string;
}) {
  const max = width === "narrow" ? "max-w-3xl" : width === "wide" ? "max-w-6xl" : "max-w-5xl";
  return (
    <section aria-labelledby={title && id ? id : undefined} className={`${tone === "pale" ? "bg-pale" : "bg-white"} ${className}`}>
      <div className={`mx-auto ${max} px-4 ${flushBottom ? "pt-16 md:pt-20" : "py-16 md:py-20"}`}>
        {title ? <SectionHeading id={id} lead={lead}>{title}</SectionHeading> : null}
        <div className={title ? "mt-10 md:mt-12" : ""}>{children}</div>
      </div>
    </section>
  );
}

/** カード（角丸小さめ・淡い影） */
export function Card({ children, className = "", as: Tag = "div" }: { children: React.ReactNode; className?: string; as?: "div" | "li" | "article" }) {
  return <Tag className={`rounded-md border border-line bg-white p-6 shadow-card ${className}`}>{children}</Tag>;
}

/** 紺地に半透明の四角を散らした背景パターン（SOLロゴの角形を意識した抽象図形） */
export function SquaresPattern() {
  return (
    <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1200 520">
      <g fill="#ffffff">
        <rect x="-40" y="40" width="220" height="220" opacity="0.05" />
        <rect x="120" y="300" width="120" height="120" opacity="0.06" />
        <rect x="560" y="-60" width="180" height="180" opacity="0.05" />
        <rect x="780" y="80" width="260" height="260" opacity="0.07" />
        <rect x="960" y="300" width="200" height="200" opacity="0.05" />
        <rect x="1080" y="20" width="110" height="110" opacity="0.08" />
        <rect x="660" y="360" width="90" height="90" opacity="0.06" />
      </g>
      <rect x="1040" y="250" width="34" height="34" fill="#f97316" opacity="0.55" />
      <rect x="250" y="70" width="18" height="18" fill="#f97316" opacity="0.45" />
    </svg>
  );
}

/** 写真の代わりに置く「画像要確認」枠（実写素材はご支給・ご確認のうえ差し替え） */
export function ImagePlaceholder({ note, className = "" }: { note?: string; className?: string }) {
  return (
    <div className={`relative flex aspect-[4/3] w-full items-end overflow-hidden rounded-md border-2 border-dashed border-white/50 bg-white/5 ${className}`}>
      <svg aria-hidden="true" viewBox="0 0 400 300" className="absolute inset-0 h-full w-full">
        <rect x="70" y="60" width="120" height="120" fill="#ffffff" opacity="0.14" />
        <rect x="150" y="120" width="150" height="150" fill="#ffffff" opacity="0.1" />
        <rect x="250" y="50" width="80" height="80" fill="#f97316" opacity="0.7" />
        <rect x="40" y="200" width="50" height="50" fill="#ffffff" opacity="0.18" />
      </svg>
      <p className="relative m-3 rounded bg-amber-50 px-2 py-1 text-sm font-bold text-amber-900">
        【画像要確認】{note}
      </p>
    </div>
  );
}
