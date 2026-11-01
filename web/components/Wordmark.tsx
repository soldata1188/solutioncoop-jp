import Image from "next/image";
import Link from "next/link";
import logoTile from "@/public/brand/sol-logo-tile.webp";

/**
 * 新ロゴ（深緑 #0E4A32 の正方形タイルに白の S・L とライムの O）＋日本語の組合名。
 * 小さい表示では「Solution Coop」の文字が判読できないため、SOL 部分のみのタイル（256px 原寸の WebP）を角丸で表示します。
 * 原本: 支給の logo_chinh_SOL_green_dark_1000.png（1000×1000）
 */
export function LogoTile({
  className = "h-10 w-10",
  alt = "ソリューション協同組合",
  priority = false,
}: {
  className?: string;
  /** 隣に組合名の文字がある場所では "" にして読み上げの重複を避けます */
  alt?: string;
  priority?: boolean;
}) {
  return <Image src={logoTile} alt={alt} sizes="48px" priority={priority} className={`rounded-md ${className}`} />;
}

export function Wordmark() {
  return (
    <Link href="/" className="inline-flex min-h-11 shrink-0 items-center gap-2.5 font-bold text-ink no-underline">
      <LogoTile priority className="h-10 w-10 md:h-11 md:w-11" />
      <span aria-hidden="true" className="hidden whitespace-nowrap text-[15px] tracking-wide sm:inline">ソリューション協同組合</span>
    </Link>
  );
}
