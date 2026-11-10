import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui";
import { disclosureDocuments } from "@/lib/disclosure";
import { pageMeta } from "@/lib/meta";

const body =
  "関係法令を順守し、透明性の高い運営を行うため、当組合の監理費表および運営規程などの重要書類を公開しております。各ドキュメントは直接ダウンロード、または閲覧が可能です。";

export const metadata = pageMeta("/disclosure", "情報公開", body);

export default function Page() {
  return (
    <>
      <PageHeader path="/disclosure" title="情報公開" lead={body} />
      <Section width="narrow">
        <ul className="divide-y divide-line border-y border-line">
          {disclosureDocuments.map((doc) => {
            const file = doc.status === "published" ? doc.fileUrl : undefined;
            return (
              <li key={doc.id} className="flex min-h-14 items-center justify-between gap-4 py-3">
                <span className="text-[15px] font-bold text-ink">{doc.name}</span>
                {file ? (
                  <a href={file} className="text-sm font-bold text-primary-dark underline underline-offset-4">
                    閲覧する
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
