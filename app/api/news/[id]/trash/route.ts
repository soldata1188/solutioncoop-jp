// API: Soft delete (move to trash) — PUT /api/news/[id]/trash
// API: Restore from trash — PUT /api/news/[id]/restore
import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'news.json');
async function readNews() { return JSON.parse(await fs.readFile(DATA_FILE,'utf-8')); }
async function writeNews(d: object[]) { await fs.writeFile(DATA_FILE, JSON.stringify(d,null,2),'utf-8'); }

type Params = { params: Promise<{ id: string }> };

// PUT /api/news/[id]/trash → soft delete
export async function PUT(_req: Request, { params }: Params) {
  const { id } = await params;
  const items = await readNews();
  const idx = items.findIndex((i: { id: string }) => i.id === id);
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  items[idx].deleted   = true;
  items[idx].deletedAt = new Date().toISOString();
  items[idx].published = false;
  await writeNews(items);
  return NextResponse.json(items[idx]);
}
