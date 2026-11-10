import { INDUSTRY_CAVEAT, INDUSTRY_SOURCE, type Work } from "@/lib/industries";

export function Marks({ flags, source = "6" }: { flags: Work["flags"]; source?: "6" | "14" }) {
  const items: string[] = [];
  if (flags.added) items.push("新たに追加");
  if (flags.spec2) items.push("特定技能2号へ移行可");
  if (source === "6" && flags.exam1) items.push("第6回：3年目に特定技能1号評価試験を活用");
  if (items.length === 0) return null;
  return (
    <ul className="mt-3 flex flex-wrap gap-1">
      {items.map((label) => (
        <li key={label} className="rounded border border-line bg-white px-2 py-1 text-xs font-bold text-ink">{label}</li>
      ))}
    </ul>
  );
}

export function FieldMarks({ works }: { works: Work[] }) {
  const flags: Work["flags"] = {};
  for (const work of works) {
    if (work.flags.added) flags.added = true;
    if (work.flags.spec2) flags.spec2 = true;
    if ((work.source ?? "6") === "6" && work.flags.exam1) flags.exam1 = true;
  }
  return <Marks flags={flags} source="6" />;
}

export function SourceNote() {
  const sixth = INDUSTRY_SOURCE.sixth;
  const fourteenth = INDUSTRY_SOURCE.fourteenth;
  return (
    <div className="mt-6 space-y-2 text-sm text-muted">
      <p>{INDUSTRY_CAVEAT}</p>
      <p>
        <a href={sixth.pdfUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-primary-dark underline underline-offset-4">
          {sixth.document}（{sixth.when}）PDF
          <span className="sr-only">（新しいタブで開きます）</span>
        </a>
        {" / "}
        <a href={sixth.pageUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-primary-dark underline underline-offset-4">
          会議ページ
          <span className="sr-only">（新しいタブで開きます）</span>
        </a>
      </p>
      <p>
        <a href={fourteenth.pdfUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-primary-dark underline underline-offset-4">
          {fourteenth.document}（{fourteenth.when}）PDF
          <span className="sr-only">（新しいタブで開きます）</span>
        </a>
        {" / "}
        <a href={fourteenth.pageUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-primary-dark underline underline-offset-4">
          会議ページ
          <span className="sr-only">（新しいタブで開きます）</span>
        </a>
      </p>
    </div>
  );
}
