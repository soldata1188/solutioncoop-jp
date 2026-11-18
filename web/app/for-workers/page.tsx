import { ConsultDesk } from "@/components/ConsultDesk";
import { Section } from "@/components/ui";
import { CONSULT_CLAIMS } from "@/lib/consult";
import { lineQrSvg } from "@/lib/line-qr";
import { pageMeta } from "@/lib/meta";
import { MESSENGER_URL } from "@/lib/site";

export const metadata = pageMeta("/for-workers", CONSULT_CLAIMS.pageTitle, CONSULT_CLAIMS.pageDescription);

export default async function Page() {
  const lineQr = await lineQrSvg();
  const messengerQr = MESSENGER_URL ? await lineQrSvg(MESSENGER_URL) : "";
  return (
    <Section width="wide" tone="pale">
      <ConsultDesk lineQr={lineQr} messengerQr={messengerQr} />
    </Section>
  );
}
