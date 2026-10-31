import { SquaresPattern, SquareDots } from "./ui";

/**
 * 下層ページの見出し帯（青 #1478E6 ＋半透明の四角）。
 * 帯の中は大きい白文字（タイトル）のみとし、本文サイズのリード文は白背景側に置いてコントラストを確保します。
 */
export function PageHeader({ title, lead }: { title: string; lead?: string }) {
  return (
    <>
      <div className="relative overflow-hidden bg-primary text-white">
        <SquaresPattern />
        <div className="relative mx-auto max-w-[812px] px-4 py-12 text-center md:py-14">
          <h1 className="text-[1.75rem] font-bold leading-snug md:text-[2.25rem]">{title}</h1>
          <SquareDots tone="white" className="mt-4" />
        </div>
      </div>
      {lead ? (
        <div className="border-b border-line bg-white">
          <p className="mx-auto max-w-[612px] px-4 py-7 text-[15px] text-body md:text-center">{lead}</p>
        </div>
      ) : null}
    </>
  );
}
