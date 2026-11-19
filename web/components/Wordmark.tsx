import Image from "next/image";
import Link from "next/link";
import logo from "@/public/brand/SOL_Solution_Coop_2026-11-19.png";

/**
 * 公式ロゴ（2026-11-19）。余白の緑だけを切り、色と形はそのまま。
 * ファイルは表示高さ 44px の 2 倍（131×88）。ヘッダーは priority。
 */
export function LogoTile({
  className = "",
  alt = "ソリューション協同組合",
  priority = false,
}: {
  className?: string;
  /** 隣に組合名の文字がある場所では "" にして読み上げの重複を避けます */
  alt?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={logo}
      alt={alt}
      width={131}
      height={88}
      priority={priority}
      sizes="66px"
      className={`h-11 w-auto max-w-none shrink-0 ${className}`}
    />
  );
}

export function Wordmark() {
  return (
    <Link href="/" className="inline-flex min-h-11 min-w-11 shrink-0 items-center gap-2.5 font-bold text-ink no-underline">
      <LogoTile priority />
      <span aria-hidden="true" className="hidden whitespace-nowrap text-[15px] tracking-wide sm:inline">ソリューション協同組合</span>
    </Link>
  );
}
