import Link from "next/link";
import { SquaresPattern, SquareDots } from "./ui";
import { JsonLd } from "./JsonLd";
import { breadcrumbJsonLd } from "@/lib/site";

/**
 * 下層ページの見出し帯（緑 #1E7F46 ＋半透明の四角）。
 * 帯の中は大きい白文字（タイトル）のみとし、本文サイズのリード文は白背景側に置いてコントラストを確保します。
 * path を渡すと、パンくずリスト（表示＋BreadcrumbList 構造化データ）を出力します。
 */
export function PageHeader({ title, lead, path, crumb }: { title: string; lead?: string; path?: string; crumb?: string }) {
  const name = crumb ?? title;
  return (
    <>
      <div className="relative overflow-hidden bg-primary text-white">
        <SquaresPattern />
        <div className="relative mx-auto max-w-[812px] px-4 py-12 text-center md:py-14">
          <h1 className="text-[1.75rem] font-bold leading-snug md:text-[2.25rem]">{title}</h1>
          <SquareDots tone="white" className="mt-4" />
        </div>
      </div>
      {path ? (
        <>
          <nav aria-label="パンくずリスト" className="border-b border-line bg-pale">
            <ol className="mx-auto flex max-w-[932px] flex-wrap items-center gap-x-2 px-4 text-[13px]">
              <li>
                <Link href="/" className="inline-flex min-h-11 items-center text-primary-dark underline underline-offset-4">ホーム</Link>
              </li>
              <li aria-hidden="true" className="text-muted">›</li>
              <li aria-current="page" className="inline-flex min-h-11 items-center text-ink">{name}</li>
            </ol>
          </nav>
          <JsonLd data={breadcrumbJsonLd([{ name, path }])} />
        </>
      ) : null}
      {lead ? (
        <div className="border-b border-line bg-white">
          <p className="mx-auto max-w-[612px] px-4 py-7 text-[15px] text-body md:text-center">{lead}</p>
        </div>
      ) : null}
    </>
  );
}
