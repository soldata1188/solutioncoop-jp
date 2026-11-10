/**
 * 情報公開の書類。ファイルは fileUrl を入れたときだけ出す。
 * status が preparing のあいだは「準備中」と表示し、リンクは出さない。
 */
export type DisclosureDocument = {
  id: string;
  name: string;
  status: "preparing" | "published";
  fileUrl?: string;
};

export const disclosureDocuments: DisclosureDocument[] = [
  { id: "unei-kitei", name: "監理団体の業務の運営に関する規程（監理費表を含む）", status: "preparing" },
];
