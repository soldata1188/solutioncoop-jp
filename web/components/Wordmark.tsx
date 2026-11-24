import Link from "next/link";

/**
 * 公式ロゴ（2026-11-19 白背景）。余白だけを切り、色と形はそのまま。
 * ファイルは 130×88。ヘッダーは h-8（32px）。フッターは h-[22px] で白地の上。
 * 表示は可逆 WebP。PNG は構造化データ用に同じパスのまま残しています。
 */
export function LogoTile({
  className = "",
  alt = "ソリューション協同組合",
  priority = false,
  heightClass = "h-11",
}: {
  className?: string;
  /** 隣に組合名の文字がある場所では "" にして読み上げの重複を避けます */
  alt?: string;
  priority?: boolean;
  /** ヘッダーは h-8（32px）。フッターは h-[22px]。 */
  heightClass?: string;
}) {
  return (
    <picture className={`inline-flex ${heightClass} w-auto max-w-none shrink-0 ${className}`}>
      <source type="image/webp" srcSet="/brand/SOL_Solution_Coop_2026-11-19_white.webp" />
      <img
        src="/brand/SOL_Solution_Coop_2026-11-19_white.png"
        alt={alt}
        width={130}
        height={88}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className="h-full w-auto max-w-none"
      />
    </picture>
  );
}

export function Wordmark() {
  return (
    <Link href="/" className="inline-flex min-h-11 min-w-11 shrink-0 items-center gap-2.5 font-bold text-ink no-underline">
      <LogoTile priority heightClass="h-8" />
      <span aria-hidden="true" className="hidden whitespace-nowrap text-[15px] tracking-wide sm:inline">ソリューション協同組合</span>
    </Link>
  );
}
