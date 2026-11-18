/**
 * 情報公開の書類。ファイルは fileUrl を入れたときだけ出す。
 * status が preparing のあいだは「準備中」と表示し、リンクは出さない。
 */
export type DisclosureDocument = {
  id: string;
  name: string;
  status: "preparing" | "published";
  fileUrl?: string;
  /** ファイルのバイト数。表示は 1024 で割って四捨五入した KB */
  bytes?: number;
};

export const disclosureDocuments: DisclosureDocument[] = [
  {
    id: "unei-kitei",
    name: "監理支援機関の業務の運営に関する規程",
    status: "published",
    fileUrl: "/documents/kanri-shien-kikan-unei-kitei.pdf",
    bytes: 414771,
  },
  {
    id: "kojin-joho",
    name: "個人情報適正管理規程",
    status: "published",
    fileUrl: "/documents/kojin-joho-tekisei-kanri-kitei.pdf",
    bytes: 41133,
  },
  {
    id: "kyoka-toroku",
    name: "監理団体許可証",
    status: "published",
    fileUrl: "/documents/kanri-dantai-kyokasho.pdf",
    bytes: 156447,
  },
];
