// ============================================================
//  NEWS DATA LAYER
//  Đây là nơi lưu trữ toàn bộ tin tức.
//  File này tự động đọc từ data/news.json
// ============================================================

export type NewsCategory = 'news' | 'result' | 'system';

export interface NewsItem {
  id: string;           // mã duy nhất: "news-001"
  title: string;        // tiêu đề tiếng Nhật
  excerpt: string;      // tóm tắt ngắn
  content: string;      // nội dung đầy đủ (HTML)
  category: NewsCategory;
  date: string;         // YYYY-MM-DD
  published: boolean;   // true = đang hiển thị
  pinned?: boolean;     // true = ghim lên đầu phần mới nhất (nổi bật)
  image?: string;       // đường dẫn ảnh đại diện (ví dụ: /uploads/news/xxx.jpg)
  scheduledDate?: string; // ngày đăng tự động (YYYY-MM-DDTHH:mm)
  deleted?: boolean;     // soft delete
  deletedAt?: string;    // thời gian xóa
  updatedAt?: string;    // lần sửa cuối
  editLog?: any[];       // lịch sử sửa
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
