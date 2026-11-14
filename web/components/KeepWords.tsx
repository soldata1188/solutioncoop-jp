import { Fragment } from "react";

/**
 * 語の途中で改行させないための部品。
 * word-break: auto-phrase に未対応のブラウザ（一部の Safari・Firefox）や、auto-phrase でも語の途中で区切られる場合に備えます。
 * 文言は変えず、指定した語を inline-block の span で包むだけです（読み上げ・検索への影響はありません）。
 */
const WORDS = ["SDGs未来都市・堺", "お問い合わせ", "メールでの", "無料相談", "個人情報", "電話で", "フォームへ"];
const RE = new RegExp(`(${WORDS.join("|")})`);

/** 1つのまとまりを途中で折り返さない */
export function NoBreak({ children }: { children: React.ReactNode }) {
  return <span className="inline-block whitespace-nowrap">{children}</span>;
}

/** 文中の WORDS に当たる語だけを NoBreak で包みます */
export function KeepWords({ text }: { text: string }) {
  return (
    <>
      {text.split(RE).map((part, i) => (part === "" ? null : i % 2 === 1 ? <NoBreak key={i}>{part}</NoBreak> : <Fragment key={i}>{part}</Fragment>))}
    </>
  );
}

/**
 * ボタン・短い見出し用：文節ごとに NoBreak で包み、文節の間だけで改行できるようにします（<wbr> 付き）。
 * 例：「LINEで無料相談」→「LINEで」「無料相談」
 */
const PHRASES: Record<string, string[]> = {
  "LINEで無料相談": ["LINEで", "無料相談"],
  "メールでのお問い合わせ": ["メールでの", "お問い合わせ"],
  "電話で相談": ["電話で", "相談"],
  "フォームへ進む": ["フォームへ", "進む"],
};
export function Phrases({ text }: { text: string }) {
  return <Chunks parts={PHRASES[text] ?? [text]} />;
}

/** 与えたまとまりの間だけで改行できるようにします（各まとまりは途中で折り返しません） */
export function Chunks({ parts }: { parts: readonly string[] }) {
  // 1つの span にまとめ、flex のボタン内でも1つの要素として扱われるようにします
  return (
    <span>
      {parts.map((p, i) => (
        <Fragment key={p}>
          {i > 0 ? <wbr /> : null}
          <NoBreak>{p}</NoBreak>
        </Fragment>
      ))}
    </span>
  );
}
