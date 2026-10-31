import Image from "next/image";
import Link from "next/link";

/** 支給ロゴ（JPGから白背景を除去したPNG/WebP）＋日本語の組合名 */
export function Wordmark() {
  return (
    <Link href="/" className="inline-flex min-h-11 shrink-0 items-center gap-2.5 font-bold text-navy-900 no-underline">
      <Image
        src="/brand/sol-logo-240.png"
        alt="ソリューション協同組合"
        width={240}
        height={159}
        priority
        className="h-9 w-auto md:h-10"
      />
      <span aria-hidden="true" className="hidden whitespace-nowrap text-[15px] tracking-wide sm:inline">ソリューション協同組合</span>
    </Link>
  );
}
