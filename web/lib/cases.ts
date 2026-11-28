/**
 * 受入れ事例の写真（既存サイト index16.html の事例欄に使われていた写真と業種・地域の記載）。
 * 企業名・人数・ご感想は未確認のため掲載しません。
 * 出典: ebf987b^ の web/app/page.tsx と web/lib/images.ts。文言・alt は原文のまま。
 */
export type CaseCard = {
  id: string;
  src: string;
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
    src: "/images/site-steel-workshop.webp",
    alt: "鋼材が積まれ、工具や脚立が並ぶ金属加工の作業場",
    tag: "大阪府・金属加工",
    width: 800,
    height: 533,
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
    src: "/images/cases/case-kensetsu.webp",
    alt: "建設業のイメージ画像",
    tag: "建設",
    width: 1600,
    height: 1000,
    imageNote: "イメージ",
  },
  {
    id: "case-kikai-kinzoku",
    src: "/images/cases/case-kikai-kinzoku.webp",
    alt: "機械・金属業のイメージ画像",
    tag: "機械・金属",
    width: 1600,
    height: 1000,
    imageNote: "イメージ",
  },
  {
    id: "case-naisou-tosou",
    src: "/images/cases/case-naisou-tosou.webp",
    alt: "内装・塗装業のイメージ画像",
    tag: "内装・塗装",
    width: 1600,
    height: 1000,
    imageNote: "イメージ",
  },
];
