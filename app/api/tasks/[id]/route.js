import { getDb } from '@/lib/db';
import { ObjectId } from 'mongodb';

export async function DELETE(request, { params }) {
  try {
    const db = await getDb();
    const id = new ObjectId(params.id);
    
    const result = await db.collection('tasks').deleteOne({ _id: id });
    
    if (result.deletedCount === 0) {
      return Response.json({ error: 'Task not found' }, { status: 404 });
    }
    
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const db = await getDb();
    const id = new ObjectId(params.id);
    const body = await request.json();
    
    const result = await db.collection('tasks').updateOne(
      { _id: id },
      { $set: body }
    );
    
    if (result.matchedCount === 0) {
      return Response.json({ error: 'Task not found' }, { status: 404 });
    }
    
    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

