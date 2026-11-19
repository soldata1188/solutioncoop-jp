import { ConsultDesk } from "@/components/ConsultDesk";
import { Section } from "@/components/ui";
import { CONSULT_CLAIMS } from "@/lib/consult";
import { lineQrSvg, qrSvg } from "@/lib/line-qr";
import { pageMeta } from "@/lib/meta";
import { consultMessengerHref } from "@/lib/site";

export const metadata = pageMeta("/for-workers", CONSULT_CLAIMS.pageTitle, CONSULT_CLAIMS.pageDescription);

export default async function Page() {
  const lineQr = await lineQrSvg();
  const messengerHref = consultMessengerHref();
  const messengerQr = messengerHref ? await qrSvg(messengerHref, "#1877F2") : "";
  return (
    <Section width="wide" tone="pale">
      <ConsultDesk lineQr={lineQr} messengerQr={messengerQr} messengerHref={messengerHref} />
    </Section>
  );
}
