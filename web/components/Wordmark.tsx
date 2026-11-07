import Image from "next/image";
import Link from "next/link";
import logo from "@/public/brand/SOL_Solution_Coop_official_2026-11-07.jpg";

/**
 * 公式ロゴ（2026-11-07 支給の全体）。緑地、白の S・L、淡い黄色の O、下段の白文字「Solution Coop」。
 * 切り抜き・変色・比率変更はしません。表示枠は原本と同じ 1500:1200 です。
 * 原本: public/brand/SOL_Solution_Coop_official_2026-11-07.jpg
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
      priority={priority}
      sizes="55px"
      className={`h-11 w-[55px] max-w-none shrink-0 object-contain ${className}`}
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
