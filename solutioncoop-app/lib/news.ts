// ============================================================
//  NEWS DATA LAYER
//  ニュースデータ管理層
//  data/news.json からデータを自動読み込みします。
// ============================================================

export type NewsCategory = 'news' | 'result' | 'system';

export interface NewsItem {
  id: string;           // ユニークID: "news-001"
  title: string;        // 日本語タイトル
  excerpt: string;      // 短い抜粋
  content: string;      // 本文コンテンツ (HTML/Markdown)
  category: NewsCategory;
  date: string;         // YYYY-MM-DD
  published: boolean;   // true = 公開中
  pinned?: boolean;     // true = トップに固定表示
  image?: string;       // サムネイル画像パス (/uploads/news/xxx.jpg)
  scheduledDate?: string; // 予約投稿日時 (YYYY-MM-DDTHH:mm)
  deleted?: boolean;     // ソフトデリート
  deletedAt?: string;    // 削除日時
  updatedAt?: string;    // 最終更新日時
  editLog?: any[];       // 編集履歴
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: string;
}

export const CATEGORY_CONFIG: Record<NewsCategory, {
  label: string;
  icon: string;
  badgeClass: string;
  color: string;
}> = {
  news:   { label: 'お知らせ',  icon: '🔔', badgeClass: 'nb-news',   color: '#1d4ed8' },
  result: { label: '受入実績',  icon: '👥', badgeClass: 'nb-result', color: '#15803d' },
  system: { label: '制度情報',  icon: '⚖️', badgeClass: 'nb-system', color: '#a16207' },
};

export function formatDateJP(dateStr: string): string {
  const d = new Date(dateStr);
  return `${d.getFullYear()}年${d.getMonth()+1}月${d.getDate()}日`;
}

export function formatDateDot(dateStr: string): string {
  return dateStr.replace(/-/g, '.');
}
