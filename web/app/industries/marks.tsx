import { INDUSTRY_CAVEAT, INDUSTRY_SOURCE, type Work } from "@/lib/industries";

const labels = [
  ["added", "新たに追加"],
  ["spec2", "特定技能2号へ移行可"],
  ["exam1", "3年目は特定技能1号評価試験"],
  ["reprint", "第5回会議資料の再掲"],
  ["newMaterial", "今回新たに示す資料"],
  ["revised", "第5回資料を一部修正"],
] as const;

export function Marks({ flags }: { flags: Work["flags"] }) {
  const items = labels.filter(([key]) => flags[key]);
  if (items.length === 0) return null;
  return (
    <ul className="mt-3 flex flex-wrap gap-1">
      {items.map(([, label]) => (
        <li key={label} className="rounded border border-line bg-white px-2 py-1 text-xs font-bold text-ink">{label}</li>
      ))}
    </ul>
  );
}

export function FieldMarks({ works }: { works: Work[] }) {
  const flags: Work["flags"] = {};
  for (const work of works) {
    for (const [key, value] of Object.entries(work.flags)) {
      if (value) flags[key as keyof Work["flags"]] = true;
    }
  }
  return <Marks flags={flags} />;
}

export function SourceNote() {
  return (
    <p className="mt-6 text-sm text-muted">
      {INDUSTRY_CAVEAT}
      <a href={INDUSTRY_SOURCE.pageUrl} target="_blank" rel="noopener noreferrer" className="ml-1 font-bold text-primary-dark underline underline-offset-4">
        {INDUSTRY_SOURCE.meeting}（{INDUSTRY_SOURCE.when}、{INDUSTRY_SOURCE.publisher}）
        <span className="sr-only">（新しいタブで開きます）</span>
      </a>
    </p>
  );
}
