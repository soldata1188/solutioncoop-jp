/**
 * 技能実習・特定技能（1号）・育成就労の比較。
 * 育成就労の列は、リポジトリ内の公的資料（育成就労/育成就労制度の関係省令等について.pdf、育成就労制度 運用要領）に基づきます。
 * 分野別の運用方針などで今後変わり得る点・確認が済んでいない点は check: true（要確認）としています。
 */
export type Cell = { text: string; check?: boolean };
export type CompareRow = { label: string; jisshu: Cell; tokutei: Cell; ikusei: Cell };

export const compareRows: CompareRow[] = [
  {
    label: "制度の目的",
    jisshu: { text: "国際貢献（開発途上地域等への技能等の移転）" },
    tokutei: { text: "人手不足の分野での、一定の専門性・技能を持つ人材の確保" },
    ikusei: { text: "人材育成と人材確保（3年間で特定技能1号の水準の人材を育成）" },
  },
  {
    label: "在留できる期間",
    jisshu: { text: "最長5年（1号・2号・3号の区分あり）" },
    tokutei: { text: "通算で上限5年" },
    ikusei: { text: "原則3年（1号〜3号の区分は廃止）" },
  },
  {
    label: "受入れの対象",
    jisshu: { text: "定められた職種・作業" },
    tokutei: { text: "特定産業分野" },
    ikusei: { text: "定められた分野・業務区分", check: true },
  },
  {
    label: "本人の意向による転籍・転職",
    jisshu: { text: "原則として認められていません" },
    tokutei: { text: "同じ分野の中での転職が可能" },
    ikusei: { text: "一定の要件のもとで可能（分野ごとに1〜2年の範囲で転籍制限期間を設定。技能・日本語の水準なども要件）", check: true },
  },
  {
    label: "日本語能力",
    jisshu: { text: "入国時の試験要件は原則なし（介護職種を除く）" },
    tokutei: { text: "分野ごとに定められた日本語試験等の合格が原則" },
    ikusei: { text: "就労開始前にA1相当（N5等）の試験合格または講習受講。終了時までにA2相当（N4等）を目指す" },
  },
  {
    label: "技能の目標",
    jisshu: { text: "技能検定（基礎級・3級など）等の受検" },
    tokutei: { text: "分野ごとの技能評価試験等の合格が原則" },
    ikusei: { text: "1年目に技能検定基礎級等、終了時に技能検定3級または特定技能1号評価試験" },
  },
  {
    label: "受入れ企業を支える機関",
    jisshu: { text: "監理団体（許可制）" },
    tokutei: { text: "登録支援機関（支援の委託が可能）" },
    ikusei: { text: "監理支援機関（新たな許可が必要）" },
  },
  {
    label: "業務の内容",
    jisshu: { text: "必須業務が従事時間の2分の1以上" },
    tokutei: { text: "分野ごとに定められた業務" },
    ikusei: { text: "必須業務が従事時間の3分の1以上、安全衛生に関する業務が10分の1以上" },
  },
  {
    label: "送出機関に支払う費用",
    jisshu: { text: "—" },
    tokutei: { text: "—" },
    ikusei: { text: "外国人本人が負担する手数料は、月給の2か月分が上限" },
  },
  {
    label: "家族の帯同",
    jisshu: { text: "認められていません" },
    tokutei: { text: "原則として認められていません" },
    ikusei: { text: "認められない見込みです", check: true },
  },
];

/** 当組合の対応状況（Boss 確認済みの表現のみ） */
export const ourStatus = {
  jisshu: "監理団体として許可を受けております（許1708000610・一般監理事業）",
  tokutei: "登録支援機関として登録しております（19登-001221）",
  ikusei: "育成就労制度に向けて準備中です",
};
