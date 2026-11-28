import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui";
import { pageMeta } from "@/lib/meta";
import { LicenseFrames } from "@/components/LicenseFrames";
import { disclosureDocuments } from "@/lib/disclosure";
import { org, fullAddress, repoFacts, TEL_HREF } from "@/lib/site";

const OFFICE_SIZES = "(min-width: 768px) 470px, calc(100vw - 32px)";
const OFFICE_AVIF = "/images/office-480.avif 480w, /images/office-720.avif 720w, /images/office-800.avif 800w";
const OFFICE_WEBP = "/images/office-480.webp 480w, /images/office-720.webp 720w, /images/office-800.webp 800w";
const SAKAI_SIZES = "(min-width: 768px) 310px, calc(100vw - 32px)";
const SAKAI_AVIF = "/images/sakai-400.avif 400w, /images/sakai-600.avif 600w";
const SAKAI_WEBP = "/images/sakai-400.webp 400w, /images/sakai-600.webp 600w";

function AboutPhoto({
  avif,
  webp,
  src,
  sizes,
  alt,
  width,
  height,
  preload = false,
  caption,
  className = "",
}: {
  avif: string;
  webp: string;
  src: string;
  sizes: string;
  alt: string;
  width: number;
  height: number;
  preload?: boolean;
  caption: string;
  className?: string;
}) {
  return (
    <figure className={className}>
      {preload ? (
        <link rel="preload" as="image" type="image/avif" imageSrcSet={avif} imageSizes={sizes} fetchPriority="high" />
      ) : null}
      <picture>
        <source type="image/avif" sizes={sizes} srcSet={avif} />
        <source type="image/webp" sizes={sizes} srcSet={webp} />
        <img src={src} alt={alt} width={width} height={height} sizes={sizes} loading={preload ? "eager" : "lazy"} decoding="async" className="h-auto w-full object-cover" />
      </picture>
      <figcaption className="mt-2 text-[13px] leading-relaxed text-muted">{caption}</figcaption>
    </figure>
  );
}

export const metadata = pageMeta(
  "/about",
  "組合概要｜堺の監理団体",
  "堺市堺区甲斐町東に事務所を置く監理団体、ソリューション協同組合の組合概要です。所在地・連絡先、代表者、受入れ実績、監理団体の許可番号、登録支援機関の登録番号などをご案内いたします。",
);

export default function Page() {
  const rows: [string, React.ReactNode][] = [
    ["名称", org.name],
    ["代表者", org.representative],
    ["所在地", fullAddress],
    ["電話番号", <a key="tel" href={TEL_HREF} className="inline-flex min-h-11 items-center font-bold text-primary-dark underline underline-offset-4">{org.tel}</a>],
    ["FAX番号", org.fax],
    ["メールアドレス", <a key="mail" href={`mailto:${org.email}`} className="font-bold text-primary-dark underline underline-offset-4">{org.email}</a>],
    ["設立", repoFacts.established],
    [
      "事業内容",
      <span key="biz">
        技能実習制度に基づく監理事業（一般監理事業）
        <br />
        特定技能外国人の支援業務（登録支援機関）
        <span className="mt-1 block">共同購買事業、受注のあっせん、海外進出のサポートなど</span>
      </span>,
    ],
    ["技能実習生|受入れ実績", org.terms],
    ["受入れ企業数", org.clients],
    ["表彰", org.award],
    ["連携する送り出し国", "ベトナム、インドネシア、フィリピン"],
  ];
  return (
    <>
      <PageHeader title="組合概要" path="/about" />
      <Section id="office" title="堺から、大阪の企業様を支えます" width="default" reveal={false}>
        <div className="grid items-start gap-6 md:grid-cols-[3fr_2fr]">
          <AboutPhoto
            avif={OFFICE_AVIF}
            webp={OFFICE_WEBP}
            src="/images/office-800.webp"
            sizes={OFFICE_SIZES}
            alt="「ソリューション協同組合」堺市の事務所、研修センター"
            width={800}
            height={533}
            preload
            caption="「ソリューション協同組合」堺市の事務所、研修センター"
          />
          <div>
            <p className="text-[15px]">
              当組合は、堺市堺区に事務所を構え、大阪府内の中小企業様の外国人材受入れをご支援しております。
            </p>
            <AboutPhoto
              avif={SAKAI_AVIF}
              webp={SAKAI_WEBP}
              src="/images/sakai-600.webp"
              sizes={SAKAI_SIZES}
              alt="青空の下、堺の海辺に立つ白い木造の灯台"
              width={600}
              height={400}
              className="mt-5"
              caption="地元・堺の海辺の風景"
            />
          </div>
        </div>
      </Section>

      <Section id="overview" title="組合の概要" width="narrow" tone="pale">
        <table className="w-full border-separate border-spacing-0 overflow-hidden rounded-site text-left text-[15px] shadow-card md:text-base">
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

      <Section id="license" title="許可・登録" tone="pale">
          <LicenseFrames />
      </Section>
      <Section
        id="disclosure"
        title="情報公開"
        width="narrow"
        lead="関係法令を順守し、透明性の高い運営を行うため、当組合の監理費表および運営規程などの重要書類を公開しております。"
      >
        <ul className="divide-y divide-line border-y border-line">
          {disclosureDocuments.map((doc) => {
            const file = doc.status === "published" ? doc.fileUrl : undefined;
            return (
              <li key={doc.id} className="flex min-h-14 flex-col items-center justify-center gap-1 py-3 text-center sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:text-left">
                <span className="text-[15px] font-bold text-ink">{doc.name}</span>
                {file ? (
                  <a href={file} target="_blank" rel="noopener" className="inline-flex min-h-11 items-center text-sm font-bold text-primary-dark underline underline-offset-4">
                    PDF・{Math.round((doc.bytes ?? 0) / 1024)}KB
                    <span className="sr-only">（新しいタブで開きます）</span>
                  </a>
                ) : (
                  <span className="text-sm font-bold text-muted">準備中</span>
                )}
              </li>
            );
          })}
        </ul>
      </Section>
    </>
  );
}
