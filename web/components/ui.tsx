import Link from "next/link";

/** 右向き矢印（ボタン・リンク用。装飾のため読み上げ対象外） */
export function ArrowIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className={`shrink-0 ${className}`} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

type ButtonVariant = "primary" | "outlineWhite" | "whiteCta" | "outlineCta" | "dark" | "ghost";

const buttonBase =
  "relative inline-flex min-h-12 items-center justify-center gap-2.5 rounded px-8 font-bold leading-snug no-underline transition-colors";

const buttonVariants: Record<ButtonVariant, string> = {
  // 主ボタン：#1E7F46 地に白文字（5.02:1）、hover #0F4D2A（9.93:1）
  primary: "bg-primary text-white shadow-sm hover:bg-primary-dark",
  outlineWhite: "border-2 border-white bg-transparent text-white hover:bg-white hover:text-primary-dark",
  // 白地＋濃い緑の枠（枠・文字とも #0F4D2A、9.93:1）
  whiteCta: "border-2 border-primary-dark bg-white text-primary-dark hover:bg-cta-tint",
  outlineCta: "border-2 border-primary-dark bg-white text-primary-dark hover:bg-cta-tint",
  dark: "bg-primary-dark text-white hover:bg-primary-darker",
  // 白地・グレー枠・緑の矢印（「もっと見る」などの副ボタン）
  ghost: "border border-line bg-white text-ink shadow-sm hover:border-primary [&>svg]:text-primary-dark",
};

export function buttonClass(variant: ButtonVariant = "primary", extra = "") {
  return `${buttonBase} ${buttonVariants[variant]} ${extra}`;
}

/** 文字と矢印をひとまとまりで中央に置くボタン（左右の余白は同じ。空きの枠は作りません） */
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
      <ArrowIcon className="h-3.5 w-3.5" />
    </Link>
  );
}

/** 見出し下の小さな3つの四角（装飾） */
export function SquareDots({ className = "", tone = "pale" }: { className?: string; tone?: "pale" | "white" }) {
  const c = tone === "white" ? "bg-white/60" : "bg-pale-border";
  return (
    <span aria-hidden="true" className={`flex justify-center gap-6 ${className}`}>
      <span className={`h-1.5 w-1.5 ${c}`} />
      <span className={`h-1.5 w-1.5 ${c}`} />
      <span className={`h-1.5 w-1.5 ${c}`} />
    </span>
  );
}

/** セクション見出し（中央揃え・太字・緑＋3つの四角）。#1E7F46（白地 5.02:1） */
export function SectionHeading({
  id,
  children,
  lead,
  as: Tag = "h2",
  eyebrow,
  sub,
}: {
  id?: string;
  children: React.ReactNode;
  lead?: React.ReactNode;
  as?: "h1" | "h2";
  /** 見出しの上の小さなラベル */
  eyebrow?: React.ReactNode;
  /** 見出しの下の副題 */
  sub?: React.ReactNode;
}) {
  return (
    <div className="text-center">
      {eyebrow ? <p className="mb-2 text-sm font-bold tracking-wide text-primary-dark">{eyebrow}</p> : null}
      <Tag id={id} className="text-2xl font-bold leading-snug text-primary md:text-[1.75rem]">
        {children}
      </Tag>
      {sub ? <p className="mt-3 text-[15px] font-bold leading-relaxed text-ink md:text-base">{sub}</p> : null}
      <SquareDots className="mt-4" />
      {lead ? <p className="mx-auto mt-5 max-w-[580px] text-left text-[15px] text-body sm:text-center">{lead}</p> : null}
    </div>
  );
}

/** 左寄せの小見出し＋右へ伸びる線（リファレンスの見出しの形） */
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

/** セクション内の小見出し（左の緑の四角） */
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
  eyebrow,
  sub,
}: {
  id?: string;
  title?: React.ReactNode;
  lead?: React.ReactNode;
  eyebrow?: React.ReactNode;
  sub?: React.ReactNode;
  tone?: "white" | "pale";
  width?: keyof typeof widths;
  children: React.ReactNode;
  className?: string;
  flushBottom?: boolean;
}) {
  return (
    <section aria-labelledby={title && id ? id : undefined} className={`${tone === "pale" ? "bg-pale" : "bg-white"} ${className}`}>
      <div className={`mx-auto ${widths[width]} px-4 ${flushBottom ? "pt-14 md:pt-[72px]" : "py-14 md:py-[72px]"}`}>
        {title ? <SectionHeading id={id} lead={lead} eyebrow={eyebrow} sub={sub}>{title}</SectionHeading> : null}
        <div className={title ? "mt-10" : ""}>{children}</div>
      </div>
    </section>
  );
}

/** 緑地に半透明の四角を散らした背景パターン（抽象図形のみ） */
export function SquaresPattern({ variant = "hero" }: { variant?: "hero" | "band" }) {
  return (
    <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1200 520">
      {variant === "hero" ? (
        <>
          {/* 明るい（白）四角は白文字のコントラストを下げるため、文字の来ない左右の端（x≤140 / x≥1050）にのみ置きます。
              中央付近は濃い四角のみ（白文字のコントラストは上がる方向）。 */}
          <rect x="60" y="20" width="200" height="200" className="fill-primary-dark" opacity="0.35" />
          <rect x="-60" y="280" width="200" height="200" fill="#ffffff" opacity="0.08" />
          <rect x="1050" y="190" width="220" height="220" fill="#ffffff" opacity="0.1" />
          <rect x="1040" y="-40" width="160" height="160" className="fill-primary-dark" opacity="0.35" />
          <rect x="860" y="360" width="140" height="140" className="fill-primary-dark" opacity="0.25" />
          <rect x="340" y="400" width="160" height="160" className="fill-primary-dark" opacity="0.3" />
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

/**
 * 写真の代わりに置く中立の枠（抽象的な四角のみ。文字は表示しません）。
 * 実際の写真が届くまでの仮置き用です。差し替えが必要な場所は data-image-needed（note）で検索できます。
 * 閲覧者には「要確認」などの表示を見せず、読み上げ対象外にします。
 * 現在、サイト内での使用箇所はありません（restyle22-notes.md 参照）。
 */
export function ImagePlaceholder({
  note,
  className = "",
  tone = "light",
}: {
  /** 開発者向けのメモ（どの写真が必要か）。画面には表示しません */
  note?: string;
  className?: string;
  tone?: "light" | "onDark";
}) {
  const box = tone === "onDark" ? "bg-white/10" : "bg-pale";
  return (
    <div aria-hidden="true" data-image-needed={note ?? ""} className={`relative w-full overflow-hidden ${box} ${className}`}>
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        <rect x="70" y="50" width="120" height="120" className={tone === "onDark" ? "fill-white" : "fill-primary"} opacity="0.1" />
        <rect x="160" y="110" width="150" height="150" className={tone === "onDark" ? "fill-white" : "fill-primary"} opacity="0.07" />
        <rect x="270" y="40" width="70" height="70" className="fill-brand" opacity="0.18" />
      </svg>
    </div>
  );
}

/** 番号タブ付きの淡い緑枠カード（「選ばれる理由」型） */
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
