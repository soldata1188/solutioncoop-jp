import { PageHeader } from "@/components/PageHeader";
import { CtaSection } from "@/components/CtaSection";
import { CheckBadge } from "@/components/Placeholder";
import { pageMeta } from "@/lib/meta";
import { pricingByCountry, DEFAULT_COUNTRY } from "@/lib/pricing";

export const metadata = pageMeta(
  "/pricing",
  "費用・料金（インドネシア向け・目安）",
  "育成就労でインドネシアから人材を受け入れる場合の費用の目安（暫定・税別・1名あたり）をご案内いたします。最終金額は個別にご案内します。",
);

export default function Page() {
  const p = pricingByCountry[DEFAULT_COUNTRY];
  const label = `目安・暫定（${p.version}・${p.asOf}時点）`;
  return (
    <>
      <PageHeader
        title="費用・料金"
        lead={`育成就労制度で${p.countryLabel}から人材を受け入れる場合の費用の目安です。金額はすべて1名あたり・税別です。`}
      />
      <div className="mx-auto max-w-4xl px-4 py-12">
        <aside role="note" className="rounded-lg border-2 border-amber-600 bg-amber-50 p-5 text-amber-950">
          <p className="text-lg font-bold">{p.countryLabel}向け｜{label}</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>最終金額は個別にご案内します。</li>
            <li>現在の金額は技能実習制度の料金を転記した暫定値です。育成就労制度の正式な単価は確定しておりません。</li>
            <li>金額はすべて税別です（非課税・実費の項目は備考に記載しています）。外国人材の給与は含みません。</li>
            <li>「要確認」と表示している項目は、今後変更となる可能性があります。</li>
          </ul>
        </aside>

        {p.groups.map((g, gi) => (
          <section key={g.title} aria-labelledby={`g${gi}`} className="mt-10">
            <h2 id={`g${gi}`} className="text-2xl font-bold text-navy-950">
              {g.title}
              {g.step ? <span className="ml-2 text-base font-medium text-muted">（{g.step}）</span> : null}
            </h2>
            <ul className="mt-4 space-y-3 sm:hidden">
              {g.rows.map((r) => (
                <li key={r.item} className="rounded-lg border border-slate-200 p-4">
                  <p className="font-bold text-navy-900">{r.item}</p>
                  <p className="mt-1 text-lg font-bold">{r.amount}<span className="ml-1 text-sm font-normal">（税別）</span></p>
                  <p className="text-sm text-muted">{label}</p>
                  {r.note ? <p className="mt-1 text-sm">{r.note}</p> : null}
                  {r.needsCheck ? (
                    <p className="mt-1 text-sm">
                      <CheckBadge />
                      <span className="ml-1 text-muted">{r.checkReason}</span>
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
            <div className="mt-4 hidden sm:block">
              <table className="w-full border-collapse text-left">
                <caption className="sr-only">{g.title}の費用（{label}・税別・1名あたり）</caption>
                <thead>
                  <tr className="bg-navy-900 text-white">
                    <th scope="col" className="p-3">項目</th>
                    <th scope="col" className="p-3">金額（税別・{label}）</th>
                    <th scope="col" className="p-3">備考</th>
                  </tr>
                </thead>
                <tbody>
                  {g.rows.map((r) => (
                    <tr key={r.item} className="border-b border-slate-200 align-top">
                      <th scope="row" className="p-3 font-bold text-navy-900">{r.item}</th>
                      <td className="p-3">
                        <span className="font-bold">{r.amount}</span>
                        <span className="block text-sm text-muted">{label}</span>
                      </td>
                      <td className="p-3 text-sm">
                        {r.note ? <span className="block">{r.note}</span> : null}
                        {r.needsCheck ? (
                          <span className="mt-1 block">
                            <CheckBadge />
                            <span className="ml-1 text-muted">{r.checkReason}</span>
                          </span>
                        ) : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))}

        <p className="mt-10 rounded-lg bg-navy-50 p-5 font-bold text-navy-900">
          最終金額は個別にご案内します。ベトナム・フィリピンからの受入れ費用についても、お問い合わせください。
        </p>
        <p className="mt-3 text-sm text-muted">出典：当組合 費用一覧 {p.docNo}（{p.version}・{p.asOf}時点）</p>
      </div>
      <CtaSection title="お見積りのご依頼・費用のご相談はこちら" />
    </>
  );
}
