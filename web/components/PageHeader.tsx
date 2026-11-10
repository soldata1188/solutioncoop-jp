import Link from "next/link";
import { SquaresPattern, SquareDots } from "./ui";
import { JsonLd } from "./JsonLd";
import { breadcrumbJsonLd } from "@/lib/site";

/**
 * 下層ページの見出し帯（緑 #1E7F46 ＋半透明の四角）。
 * 帯の中は大きい白文字（タイトル）のみとし、本文サイズのリード文は白背景側に置いてコントラストを確保します。
 * path を渡すと、パンくずリスト（表示＋BreadcrumbList 構造化データ）を出力します。
 */
/** leadAfter：リード文の直下に置く要素（例：/contact の「フォームへ進む」） */
export function PageHeader({ title, lead, path, crumb, ancestors, leadAfter }: { title: string; lead?: string; path?: string; crumb?: string; ancestors?: { name: string; path: string }[]; leadAfter?: React.ReactNode }) {
  const name = crumb ?? title;
  const trail = path ? [...(ancestors ?? []), { name, path }] : [];
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
            <ol className="mx-auto flex max-w-[932px] flex-wrap items-center gap-x-2 px-4 text-sm">
              <li>
                <Link href="/" className="inline-flex min-h-11 min-w-11 items-center text-primary-dark underline underline-offset-4">ホーム</Link>
              </li>
              {trail.map((item, i) => {
                const last = i === trail.length - 1;
                return (
                  <li key={item.path} className="inline-flex min-h-11 items-center gap-x-2">
                    <span aria-hidden="true" className="text-muted">›</span>
                    {last ? (
                      <span aria-current="page" className="inline-flex min-h-11 items-center text-ink">{item.name}</span>
                    ) : (
                      <Link href={item.path} className="inline-flex min-h-11 items-center text-primary-dark underline underline-offset-4">{item.name}</Link>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
          <JsonLd data={breadcrumbJsonLd(trail)} />
        </>
      ) : null}
      {lead ? (
        <div className="border-b border-line bg-white">
          <div className="mx-auto max-w-[612px] px-4 py-7">
            <p className="text-[15px] text-body md:text-base">{lead}</p>
            {leadAfter}
          </div>
        </div>
      ) : null}
    </>
  );
}
