import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'companies.json');

export async function GET() {
  try {
    const raw = await fs.readFile(DB_PATH, 'utf-8');
    const data = JSON.parse(raw);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read companies data' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!Array.isArray(body)) {
      return NextResponse.json({ error: 'Payload must be an array of strings' }, { status: 400 });
    }
    await fs.writeFile(DB_PATH, JSON.stringify(body, null, 2), 'utf-8');
    return NextResponse.json({ success: true, message: 'Saved successfully' });
  } catch (error) {

    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}
