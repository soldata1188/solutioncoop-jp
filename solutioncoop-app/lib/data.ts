import { promises as fs } from 'fs';
import path from 'path';
import type { NewsItem } from './news';

/**
 * ニュース記事の最新データを取得します。
 * (Lấy dữ liệu tin tức mới nhất)
 */
export async function getLatestNews(limit: number = 12): Promise<NewsItem[]> {
  try {
    const file = path.join(process.cwd(), 'data', 'news.json');
    const raw = await fs.readFile(file, 'utf-8');
    const all: NewsItem[] = JSON.parse(raw);
    
    return all
      .filter(n => n.published && !n.deleted)
      .sort((a, b) => (a.date < b.date ? 1 : -1))
      .slice(0, limit);
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

/**
 * 受入企業の実績リストを取得します。
 * (Lấy danh sách các công ty đối tác)
 */
export async function getCompanies(): Promise<string[]> {
  try {
    const file = path.join(process.cwd(), 'data', 'companies.json');
    const raw = await fs.readFile(file, 'utf-8');
    return JSON.parse(raw);
  } catch (error) {
    console.error('Error fetching companies:', error);
    return [];
  }
}
