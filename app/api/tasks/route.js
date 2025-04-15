import { getDb } from '@/lib/db';
import { ObjectId } from 'mongodb';

export async function GET() {
  try {
    const db = await getDb();
    const tasks = await db.collection('tasks').find().toArray();
    return Response.json(tasks);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const db = await getDb();
    const body = await request.json();
    
    // Validation
    if (!body.title?.trim()) {
      return Response.json({ error: "Title is required" }, { status: 400 });
    }

    const result = await db.collection('tasks').insertOne({
      title: body.title.trim(),
      description: body.description?.trim() || '',
      completed: false,
      createdAt: new Date(),
    });

    return Response.json(result, { status: 201 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}