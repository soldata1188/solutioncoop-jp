import { NextResponse } from 'next/server';
import { getWorkers, saveWorkers } from '@/lib/workers';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await request.json();
    const workers = getWorkers();
    const index = workers.findIndex(w => w.id === id);
    
    if (index !== -1) {
      workers[index] = { ...workers[index], ...data };
      saveWorkers(workers);
      return NextResponse.json(workers[index]);
    }
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    let workers = getWorkers();
    workers = workers.filter(w => w.id !== id);
    saveWorkers(workers);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
