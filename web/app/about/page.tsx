import { PageHeader } from "@/components/PageHeader";
import { CtaSection } from "@/components/CtaSection";
import { Chunks } from "@/components/KeepWords";
import { CheckBadge } from "@/components/Placeholder";
import { Photo } from "@/components/Photo";
import { photos } from "@/lib/images";
import { Section } from "@/components/ui";
import { pageMeta } from "@/lib/meta";
import { org, fullAddress, licenses, repoFacts, sdgs, TEL_HREF } from "@/lib/site";

export const metadata = pageMeta(
  "/about",
  "組合概要｜堺の監理団体",
  "堺市堺区甲斐町東に事務所を置く監理団体、ソリューション協同組合の組合概要です。所在地・連絡先、代表者、職員数、管理人数、受入実績、監理団体の許可番号、登録支援機関の登録番号、沿革などをご案内いたします。",
);

export default function Page() {
  const rows: [string, React.ReactNode][] = [
    ["名称", org.name],
    ["代表者", org.representative],
    ["所在地", fullAddress],
    ["電話番号", <a key="tel" href={TEL_HREF} className="font-bold text-primary-dark underline underline-offset-4">{org.tel}</a>],
    ["FAX番号", org.fax],
    ["メールアドレス", <a key="mail" href={`mailto:${org.email}`} className="font-bold text-primary-dark underline underline-offset-4">{org.email}</a>],
    ["設立", repoFacts.established],
    [
      "事業内容",
      <span key="biz">
        技能実習制度に基づく監理事業（一般監理事業）
        <br />
        特定技能外国人の支援業務（登録支援機関）
        <span className="mt-1 block">共同購買事業、受注のあっせん、海外進出のサポートなど（社内資料の記載）<CheckBadge /></span>
      </span>,
    ],
    ["職員数", org.staff],
    ["管理人数", `${org.managed}（技能実習生・特定技能外国人）`],
    ["技能実習生|受入実績", org.terms],
    ["受入企業数", org.clients],
    ["専任日本語教師", org.teachers],
    ["表彰", org.award],
    ["連携する送り出し国", "ベトナム、インドネシア、フィリピン"],
  ];
  return (
    <>
      <PageHeader
        title="組合概要"
        path="/about"
        lead="堺市堺区を拠点に、大阪府内の中小企業様の外国人材受入れをご支援する監理団体です。"
        leadAfter={
          // SDGs未来都市・堺の応援（文字のみ。ロゴ画像は承認範囲の確認前のため使いません）
          <section aria-labelledby="sdgs-title" className="mt-5 rounded border border-line-strong border-l-4 border-l-primary bg-white p-4 shadow-card sm:p-5">
            <h2 id="sdgs-title" className="text-lg font-bold text-ink">{sdgs.heading}</h2>
            <p className="mt-2 text-base font-bold leading-relaxed text-black [text-wrap:balance]">
              <Chunks parts={sdgs.supportParts} />
            </p>
            <p className="mt-2 text-[15px] text-body">
              {sdgs.selected}（出典：
              <a href={sdgs.sourceUrl} target="_blank" rel="noopener noreferrer" className="whitespace-nowrap text-primary-dark underline underline-offset-4">
                {sdgs.sourceLabel}
                <span className="sr-only">（新しいタブで開きます）</span>
              </a>
              ）
            </p>
          </section>
        }
      />
      <Section id="office" title="堺から、大阪の企業様を支えます" width="default">
        <div className="grid items-start gap-6 md:grid-cols-[3fr_2fr]">
          <Photo photo={photos.office} sizes="(min-width: 768px) 470px, 100vw" caption={<>「ソリューション協同組合」の看板を掲げた当組合の建物（撮影場所<CheckBadge />）</>} />
          <div>
            <p className="text-[15px]">
              当組合は、堺市堺区に事務所を構え、職員{org.staff}の体制で、大阪府内の中小企業様の外国人材受入れをご支援しております。
            </p>
            <Photo photo={photos.sakai} sizes="(min-width: 768px) 310px, 100vw" className="mt-5" caption="地元・堺の海辺の風景" />
          </div>
        </div>
      </Section>

      <Section id="overview" title="組合の概要" width="narrow" tone="pale">
        <table className="w-full border-separate border-spacing-0 overflow-hidden rounded text-left text-[15px] shadow-card md:text-base">
          <caption className="sr-only">ソリューション協同組合の概要</caption>
          <tbody>
            {rows.map(([k, v]) => (
              <tr key={k}>
                <th scope="row" className="w-[8.5rem] border-b border-white bg-label p-3 align-top font-bold text-ink sm:w-48 sm:p-4">
                  {/* 「|」は改行してよい位置（狭い画面で「実績」だけが次の行に残らないように） */}
                  {k.split("|").map((t) => (
                    <span key={t} className="inline-block">{t}</span>
                  ))}
                </th>
                <td className="border-b border-line bg-white p-3 sm:p-4">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      <Section id="history" title="沿革" width="narrow">
        <ol className="border-l-2 border-tab pl-6">
          {repoFacts.history.map((h) => (
            <li key={h.year} className="relative pb-6 last:pb-0">
              <span aria-hidden="true" className="absolute -left-[33px] top-1.5 h-3 w-3 rounded-full bg-primary-dark" />
              <p className="text-sm font-bold text-primary-dark">{h.year}</p>
              <p className="mt-0.5">
                {h.text}
                {h.confirmed ? null : <CheckBadge />}
              </p>
            </li>
          ))}
        </ol>
        <p className="mt-6 text-sm text-muted">
          ※設立・許可・登録以外の項目は、既存の社内資料・旧サイトの記載をもとにしており、年月・内容を確認中です。
        </p>
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
            ※当組合は、技能実習法に基づく監理団体として許可を受けております。2027年4月1日施行の育成就労制度に向けて準備中です。
          </p>
      </Section>
      <CtaSection />
    </>
  );
}
