// app/api/contact/[id]/route.ts — Update/Delete single contact
import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import type { ContactEntry } from '@/lib/types';

const CONTACT_FILE = path.join(process.cwd(), 'data', 'contacts.json');

async function readContacts(): Promise<ContactEntry[]> {
  try {
    return JSON.parse(await fs.readFile(CONTACT_FILE, 'utf-8'));
  } catch {
    return [];
  }
}
async function writeContacts(data: ContactEntry[]) {
  await fs.writeFile(CONTACT_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

type Params = { params: Promise<{ id: string }> };

// GET /api/contact/[id]
export async function GET(_req: Request, { params }: Params) {
  const { id } = await params;
  const contacts = await readContacts();
  const item = contacts.find(c => c.id === id);
  if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(item);
}

// PUT /api/contact/[id] — update read/replied status
export async function PUT(req: Request, { params }: Params) {
  const { id } = await params;
  const body: Partial<ContactEntry> = await req.json();
  const contacts = await readContacts();
  const idx = contacts.findIndex(c => c.id === id);
  if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  // Only allow updating read/replied fields
  if (typeof body.read === 'boolean') contacts[idx].read = body.read;
  if (typeof body.replied === 'boolean') contacts[idx].replied = body.replied;

  await writeContacts(contacts);
  return NextResponse.json(contacts[idx]);
}

// DELETE /api/contact/[id]
export async function DELETE(_req: Request, { params }: Params) {
  const { id } = await params;
  const contacts = await readContacts();
  const filtered = contacts.filter(c => c.id !== id);
  if (filtered.length === contacts.length)
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  await writeContacts(filtered);
  return NextResponse.json({ success: true });
}
