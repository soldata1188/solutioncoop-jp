// app/api/leads/route.ts — Lead Magnet form submissions
import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import type { LeadEntry } from '@/lib/types';

const LEADS_FILE = path.join(process.cwd(), 'data', 'leads.json');

async function readLeads(): Promise<LeadEntry[]> {
  try {
    return JSON.parse(await fs.readFile(LEADS_FILE, 'utf-8'));
  } catch {
    return [];
  }
}
async function writeLeads(data: LeadEntry[]) {
  await fs.writeFile(LEADS_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// GET — admin: list all leads
export async function GET() {
  const leads = await readLeads();
  return NextResponse.json(leads.sort((a, b) => b.date.localeCompare(a.date)));
}

// POST — public: submit lead magnet form
export async function POST(req: Request) {
  const body = await req.json();
  const { name, company, email, resource } = body;

  // Basic validation
  if (!name?.trim() || !email?.trim()) {
    return NextResponse.json({ error: '必須項目が未入力です' }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'メールアドレスが正しくありません' }, { status: 400 });
  }

  const leads = await readLeads();
  const newLead: LeadEntry = {
    id: `lead-${Date.now()}`,
    name: name.trim(),
    company: company?.trim() ?? '',
    email: email.trim(),
    resource: resource ?? 'ikusei-shuro-guide',
    date: new Date().toISOString(),
  };

  leads.unshift(newLead);
  await writeLeads(leads);

  return NextResponse.json({ ok: true, id: newLead.id }, { status: 201 });
}
