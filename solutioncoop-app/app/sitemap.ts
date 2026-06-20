// app/sitemap.ts — Tự động tạo sitemap.xml mỗi khi có tin mới
import { MetadataRoute } from 'next';
import { promises as fs } from 'fs';
import path from 'path';
import type { NewsItem } from '@/lib/news';

const BASE = 'https://solutioncoop-jp.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const file  = path.join(process.cwd(), 'data', 'news.json');
  const items: NewsItem[] = JSON.parse(await fs.readFile(file, 'utf-8'));
  const published = items.filter(n => n.published && !n.deleted);

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    { url: `${BASE}/news`,        lastModified: published[0] ? new Date(published[0].date) : new Date(), changeFrequency: 'daily',   priority: 0.9 },
    { url: `${BASE}/faq`,         lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/disclosure`,  lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/ikusei-shuro`,lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/privacy`,     lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
  ];

  const newsPages: MetadataRoute.Sitemap = published.map(n => ({
    url:             `${BASE}/news/${n.id}`,
    lastModified:    new Date(n.updatedAt || n.date),
    changeFrequency: 'monthly' as const,
    priority:        0.7,
    ...(n.image ? { } : {}),
  }));

  return [...staticPages, ...newsPages];
}
