import { PageHeader } from "@/components/PageHeader";
import { CtaSection } from "@/components/CtaSection";
import { Placeholder } from "@/components/Placeholder";
import { Section } from "@/components/ui";
import { pageMeta } from "@/lib/meta";
import { org, fullAddress, licenses } from "@/lib/site";

export const metadata = pageMeta(
  "/about",
  "組合概要｜堺の監理団体",
  "堺市堺区の監理団体、ソリューション協同組合の組合概要です。所在地、連絡先、職員数、管理人数などをご案内いたします。",
);

export default function Page() {
  const rows: [string, React.ReactNode][] = [
    ["名称", org.name],
    ["代表者", org.representative],
    ["所在地", fullAddress],
    ["電話番号", <a key="tel" href="tel:0722248067" className="font-bold text-primary-dark underline underline-offset-4">{org.tel}</a>],
    ["FAX番号", org.fax],
    ["メールアドレス", <a key="mail" href={`mailto:${org.email}`} className="font-bold text-primary-dark underline underline-offset-4">{org.email}</a>],
    ["設立", <Placeholder key="est" />],
    [
      "事業内容",
      <span key="biz">
        技能実習制度に基づく監理事業（一般監理事業）
        <br />
        特定技能外国人の支援業務（登録支援機関）
        <span className="mt-1 block"><Placeholder>その他の事業内容</Placeholder></span>
      </span>,
    ],
    ["職員数", org.staff],
    ["管理人数", `${org.managed}（技能実習生・特定技能外国人）`],
    ["連携する送り出し国", "ベトナム、インドネシア、フィリピン"],
  ];
  return (
    <>
      <PageHeader title="組合概要" lead="堺市堺区を拠点に、大阪府内の中小企業様の外国人材受入れをご支援する監理団体です。" />
      <Section id="overview" title="組合の概要" width="narrow">
        <table className="w-full border-separate border-spacing-0 overflow-hidden rounded text-left text-[15px] shadow-card md:text-base">
          <caption className="sr-only">ソリューション協同組合の概要</caption>
          <tbody>
            {rows.map(([k, v]) => (
              <tr key={k}>
                <th scope="row" className="w-28 border-b border-white bg-label p-4 align-top font-bold text-ink sm:w-48">{k}</th>
                <td className="border-b border-line bg-white p-4">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      <Section id="license" title="許可・登録" tone="pale">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="border-b-4 border-primary bg-white p-6 shadow-card">
              <h3 className="text-lg font-bold text-ink">{licenses.kanri.label}</h3>
              <dl className="mt-3 space-y-1">
                <div><dt className="inline font-bold">許可番号：</dt><dd className="inline">{licenses.kanri.number}</dd></div>
                <div><dt className="inline font-bold">許可の別：</dt><dd className="inline">{licenses.kanri.kind}</dd></div>
                <div><dt className="inline font-bold">法人の種類：</dt><dd className="inline">{licenses.kanri.corpType}</dd></div>
                <div><dt className="inline font-bold">許可年月日：</dt><dd className="inline">{licenses.kanri.grantedOn}</dd></div>
                <div><dt className="inline font-bold">有効期間：</dt><dd className="inline">{licenses.kanri.validity}</dd></div>
                <div>
                  <dt className="font-bold">許可の条件：</dt>
                  <dd>
                    <ul className="list-disc pl-6">
                      {licenses.kanri.conditions.map((c) => <li key={c}>{c}</li>)}
                    </ul>
                  </dd>
                </div>
              </dl>
            </div>
            <div className="border-b-4 border-primary bg-white p-6 shadow-card">
              <h3 className="text-lg font-bold text-ink">{licenses.toroku.label}</h3>
              <dl className="mt-3 space-y-1">
                <div><dt className="inline font-bold">登録番号：</dt><dd className="inline">{licenses.toroku.number}</dd></div>
                <div><dt className="inline font-bold">登録年月日：</dt><dd className="inline">{licenses.toroku.registeredOn}</dd></div>
                <div><dt className="inline font-bold">有効期間：</dt><dd className="inline">{licenses.toroku.validity}</dd></div>
              </dl>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted">
            ※当組合は、技能実習法に基づく監理団体として許可を受けております。2027年4月に始まる育成就労制度に向けて準備中です。
          </p>
      </Section>
      <CtaSection />
    </>
  );
}
