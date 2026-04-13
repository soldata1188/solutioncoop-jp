// app/sitemap.ts — Tự động tạo sitemap.xml mỗi khi có tin mới
import { MetadataRoute } from 'next';
import { promises as fs } from 'fs';
import path from 'path';
import type { NewsItem } from '@/lib/news';

const BASE = 'https://solutioncoop-jp.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const file  = path.join(process.cwd(), 'data', 'news.json');
  const items: NewsItem[] = JSON.parse(await fs.readFile(file, 'utf-8'));
  const published = items.filter(n => n.published);

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE,                  lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/news`,        lastModified: new Date(), changeFrequency: 'daily',   priority: 0.9 },
    { url: `${BASE}/estimate`,    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/contact`,     lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/privacy`,     lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
  ];

  const newsPages: MetadataRoute.Sitemap = published.map(n => ({
    url:             `${BASE}/news/${n.id}`,
    lastModified:    new Date(n.date),
    changeFrequency: 'monthly' as const,
    priority:        0.8,
  }));

  return [...staticPages, ...newsPages];
}
