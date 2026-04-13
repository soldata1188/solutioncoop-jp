import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import type { NewsItem } from '@/lib/news';

const DATA_FILE = path.join(process.cwd(), 'data', 'news.json');

async function readNews(): Promise<NewsItem[]> {
  const raw = await fs.readFile(DATA_FILE, 'utf-8');
  return JSON.parse(raw);
}

async function writeNews(items: NewsItem[]): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(items, null, 2), 'utf-8');
}

// GET /api/news — list all (query: ?published=true&category=result)
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const onlyPublished = searchParams.get('published') === 'true';
  const category      = searchParams.get('category');

  let items = await readNews();
  if (onlyPublished) items = items.filter(i => i.published);
  if (category && category !== 'all') items = items.filter(i => i.category === category);
  items.sort((a, b) => (a.date < b.date ? 1 : -1));

  return NextResponse.json(items);
}

// POST /api/news — create new item
export async function POST(req: Request) {
  const body: Omit<NewsItem, 'id'> = await req.json();
  const items = await readNews();

  // Generate ID
  const nums = items.map(i => parseInt(i.id.replace('news-', '')) || 0);
  const nextNum = Math.max(0, ...nums) + 1;
  const newItem: NewsItem = {
    id: `news-${String(nextNum).padStart(3, '0')}`,
    ...body,
  };

  items.unshift(newItem); // newest first
  await writeNews(items);
  return NextResponse.json(newItem, { status: 201 });
}
