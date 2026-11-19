import { LinkButton, Section } from "@/components/ui";
import { LineButton } from "@/components/LineButton";

export default function NotFound() {
  return (
    <Section width="narrow">
      <div className="text-center">
        <h1 className="text-[1.75rem] font-bold leading-snug text-primary md:text-3xl">お探しのページが見つかりませんでした</h1>
        <p className="mt-4 text-muted">ページが移動または削除された可能性がございます。お手数ですが、トップページからお探しください。</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <LinkButton href="/" variant="ghost">トップページへ戻る</LinkButton>
          <LineButton className="flex min-h-12 gap-2 px-8 text-base" iconClassName="h-5 w-5" />
        </div>
      </div>
    </Section>
  );
}
