import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'quotes.json');

async function readQuotes() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeQuotes(data: any[]) {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

export async function GET() {
  const quotes = await readQuotes();
  // Sort by created date descending
  return NextResponse.json(quotes.sort((a: any, b: any) => b.createdAt.localeCompare(a.createdAt)));
}

export async function PUT(req: Request) {
  const { id, ...updates } = await req.json();
  const quotes = await readQuotes();
  const index = quotes.findIndex((q: any) => q.id === id);
  
  if (index === -1) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  quotes[index] = { ...quotes[index], ...updates };
  await writeQuotes(quotes);
  
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  
  if (!id) return NextResponse.json({ error: 'Missing ID' }, { status: 400 });

  const quotes = await readQuotes();
  const filtered = quotes.filter((q: any) => q.id !== id);
  await writeQuotes(filtered);
  
  return NextResponse.json({ ok: true });
}
