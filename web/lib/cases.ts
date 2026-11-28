/**
 * 受入れ事例の写真（既存サイト index16.html の事例欄に使われていた写真と業種・地域の記載）。
 * 企業名・人数・ご感想は未確認のため掲載しません。
 * 出典: ebf987b^ の web/app/page.tsx と web/lib/images.ts。文言・alt は原文のまま。
 */
export type CaseCard = {
  id: string;
  src: string;
  /** AVIF があるときは picture で先に出す */
  avifSrc?: string;
  alt: string;
  /** カードの見出し。原文の tag */
  tag: string;
  width: number;
  height: number;
  /** 仮画像のときだけ出す。実写真に差し替えたら外す */
  imageNote?: string;
};

export const caseCards: CaseCard[] = [
  {
    id: "site-steel",
    src: "/images/cases/machining-guidance.webp",
    avifSrc: "/images/cases/machining-guidance.avif",
    alt: "金属加工の現場で実習指導を行う様子",
    tag: "大阪府・金属加工",
    width: 1200,
    height: 900,
  },
  {
    id: "site-excavation",
    src: "/images/site-excavation.webp",
    alt: "土留めの木製矢板と配管が見える、掘削中の土木工事の現場",
    tag: "大阪府・造園土木",
    width: 800,
    height: 533,
  },
  {
    id: "site-interior",
    src: "/images/site-building-interior.webp",
    alt: "照明や資材、作業台が置かれた、内装工事中の広い建物内部",
    tag: "京都府・土木工事",
    width: 800,
    height: 533,
  },
  {
    id: "case-kensetsu",
    src: "/images/cases/heat-treatment.webp",
    avifSrc: "/images/cases/heat-treatment.avif",
    alt: "熱処理炉と作業用の箱が並ぶ工場の様子",
    tag: "金属熱処理",
    width: 1200,
    height: 900,
  },
  {
    id: "case-kikai-kinzoku",
    src: "/images/cases/cnc-lathe.webp",
    avifSrc: "/images/cases/cnc-lathe.avif",
    alt: "CNC旋盤の操作盤を扱う様子",
    tag: "機械・金属",
    width: 1200,
    height: 900,
  },
  {
    id: "case-naisou-tosou",
    src: "/images/cases/tatami.webp",
    avifSrc: "/images/cases/tatami.avif",
    alt: "畳の製造ラインで作業する様子",
    tag: "畳製造",
    width: 1200,
    height: 900,
  },
];
