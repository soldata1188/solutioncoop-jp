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

type Params = { params: Promise<{ id: string }> };

// GET /api/news/[id]
export async function GET(_req: Request, { params }: Params) {
  const { id } = await params;
  const items = await readNews();
  const item = items.find(i => i.id === id);
  if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(item);
}

// PUT /api/news/[id] — update
export async function PUT(req: Request, { params }: Params) {
  const { id } = await params;
  const body: Partial<NewsItem> = await req.json();
  const items = await readNews();
  const idx = items.findIndex(i => i.id === id);
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  items[idx] = { ...items[idx], ...body, id };
  await writeNews(items);
  return NextResponse.json(items[idx]);
}

// DELETE /api/news/[id]
export async function DELETE(_req: Request, { params }: Params) {
  const { id } = await params;
  const items = await readNews();
  const filtered = items.filter(i => i.id !== id);
  if (filtered.length === items.length)
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  await writeNews(filtered);
  return NextResponse.json({ success: true });
}
