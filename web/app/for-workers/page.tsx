import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/ui";
import { ForWorkers } from "@/components/ForWorkers";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta(
  "/for-workers",
  "外国人材・実習生のみなさまへ",
  "ベトナム、インドネシア、フィリピンから来た実習生のみなさまへ。ソリューション協同組合の手伝い、困ったときの電話、国の相談窓口をご案内します。",
);

export default function Page() {
  return (
    <>
      <PageHeader title="外国人材・実習生のみなさまへ" path="/for-workers" />
      <Section width="wide">
        <ForWorkers />
      </Section>
    </>
  );
}
