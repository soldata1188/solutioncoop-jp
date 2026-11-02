import { PageHeader } from "@/components/PageHeader";
import { Placeholder } from "@/components/Placeholder";
import { Section, SubHeading } from "@/components/ui";
import { pageMeta } from "@/lib/meta";
import { org, fullAddress } from "@/lib/site";

export const metadata = pageMeta(
  "/privacy",
  "個人情報保護方針",
  "ソリューション協同組合の個人情報保護方針です。お問い合わせ等でお預かりする個人情報の取得方法、利用目的、第三者提供、安全管理措置、開示・訂正・利用停止等のご請求の窓口について定めています。",
);

const sections: { title: string; body: React.ReactNode }[] = [
  { title: "1. 基本方針", body: `${org.name}（以下「当組合」といいます。）は、組合員企業様、外国人材の皆様、お問い合わせいただいた皆様の個人情報の重要性を認識し、個人情報の保護に関する法律その他の関係法令およびガイドラインを遵守し、適切に取り扱います。` },
  { title: "2. 個人情報の取得", body: "当組合は、適法かつ公正な手段により個人情報を取得いたします。" },
  {
    title: "3. 利用目的",
    body: (
      <ul className="list-disc space-y-1 pl-6">
        <li>お問い合わせへの対応およびご連絡のため</li>
        <li>外国人材の受入れに関する監理・支援業務の実施のため</li>
        <li>組合員企業様への情報提供およびご案内のため</li>
        <li>法令に基づく報告・届出等の対応のため</li>
      </ul>
    ),
  },
  { title: "4. 第三者への提供", body: "当組合は、法令に基づく場合を除き、ご本人の同意を得ることなく個人情報を第三者に提供いたしません。" },
  { title: "5. 業務の委託", body: "利用目的の達成に必要な範囲で個人情報の取扱いを外部に委託する場合は、委託先を適切に選定し、必要かつ適切な監督を行います。" },
  { title: "6. 安全管理措置", body: "当組合は、個人情報の漏えい、滅失またはき損の防止その他の安全管理のため、必要かつ適切な措置を講じます。" },
  { title: "7. 開示・訂正・利用停止等のご請求", body: <>ご本人から個人情報の開示、訂正、追加、削除、利用停止等のご請求があった場合は、ご本人であることを確認のうえ、法令に従い遅滞なく対応いたします。ご請求の窓口は下記のとおりです。<span className="mt-2 block"><Placeholder>開示請求窓口・手続きの方法</Placeholder></span></> },
  { title: "8. 本方針の改定", body: "当組合は、法令の改正等に応じて本方針を見直し、改定することがあります。改定後の内容は本ページに掲載した時点から効力を生じるものとします。" },
];

export default function Page() {
  return (
    <>
      <PageHeader path="/privacy" title="個人情報保護方針" />
      <Section width="narrow">
        {sections.map((s) => (
          <section key={s.title} className="mb-8">
            <SubHeading as="h2">{s.title}</SubHeading>
            <div className="mt-2 [text-wrap:pretty] [word-break:auto-phrase]">{s.body}</div>
          </section>
        ))}
        <section className="border-l-4 border-primary bg-pale p-5">
          <SubHeading as="h2">お問い合わせ窓口</SubHeading>
          <p className="mt-2">
            {org.name}
            <br />
            個人情報保護責任者：<Placeholder />
            <br />
            {fullAddress}
            <br />
            TEL：{org.tel}　FAX：{org.fax}
            <br />
            メール：{org.email}
          </p>
          <p className="mt-3 text-sm text-muted">制定日：<Placeholder /></p>
        </section>
      </Section>
    </>
  );
}
