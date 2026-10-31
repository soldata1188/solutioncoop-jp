import { SquaresPattern, SquareDots } from "./ui";

/** 下層ページの見出し帯（紺地＋半透明の四角） */
export function PageHeader({ title, lead }: { title: string; lead?: string }) {
  return (
    <div className="relative overflow-hidden bg-navy-900 text-white">
      <SquaresPattern />
      <div className="relative mx-auto max-w-4xl px-4 py-12 text-center md:py-16">
        <h1 className="text-[1.75rem] font-bold leading-snug md:text-4xl">{title}</h1>
        <SquareDots className="mt-4 [&>span:nth-child(odd)]:bg-white" />
        {lead ? <p className="mx-auto mt-5 max-w-2xl text-left text-slate-100 sm:text-center">{lead}</p> : null}
      </div>
    </div>
  );
}
