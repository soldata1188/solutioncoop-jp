/**
 * ホームの受入れ企業ショーケース。
 * サンプル・公開不可：各企業の掲載同意取得後に実データへ差し替え
 */
export const CLIENTS_PUBLISHABLE = false;

export type ClientCard = {
  name: string;
  industry?: string;
};

/** 見出しの数字と前後の文言。表計算からこのオブジェクトだけ埋めればよい。 */
export const clientHeadline = {
  companiesLead: "取引社数",
  companiesCount: "○○",
  companiesUnit: "社！",
  peopleCount: "○○",
  peopleTail: "名の受入れ実績！",
} as const;

function sample(letter: string): ClientCard {
  return { name: `サンプル企業 ${letter}`, industry: "サンプル業種" };
}

export const clientRowOne: ClientCard[] = ["A", "B", "C", "D", "E", "F", "G", "H"].map(sample);
export const clientRowTwo: ClientCard[] = ["I", "J", "K", "L", "M", "N", "O", "P"].map(sample);
