import { LinkButton, Section } from "@/components/ui";

export default function NotFound() {
  return (
    <Section width="narrow">
      <div className="text-center">
        <h1 className="text-[1.75rem] font-bold leading-snug text-navy-900 md:text-3xl">お探しのページが見つかりませんでした</h1>
        <p className="mt-4 text-muted">ページが移動または削除された可能性がございます。お手数ですが、トップページからお探しください。</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <LinkButton href="/" variant="ghost">トップページへ戻る</LinkButton>
          <LinkButton href="/contact">お問い合わせ・資料請求</LinkButton>
        </div>
      </div>
    </Section>
  );
}
