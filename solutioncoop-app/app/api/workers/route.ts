import { NextResponse } from 'next/server';
import { getWorkers, saveWorkers, WorkerItem } from '@/lib/workers';

export async function GET() {
  const workers = getWorkers();
  return NextResponse.json(workers);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const workers = getWorkers();
    
    const newWorker: WorkerItem = {
      id: Date.now().toString(),
      name: data.name,
      company: data.company,
      img: data.img || '',
      nationality: data.nationality || 'vn',
    };
    
    workers.push(newWorker);
    saveWorkers(workers);
    
    return NextResponse.json(newWorker, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create' }, { status: 500 });
  }
}
