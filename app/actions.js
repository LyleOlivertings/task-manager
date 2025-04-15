// This file contains the action functions for creating, deleting, and toggling tasks.
// It uses MongoDB for data storage and includes validation for task creation.
'use server';      
import { getDb } from '@/lib/db';

export async function createTask(prevState, formData) {
  try {
    const title = formData.get('title').trim();
    const description = formData.get('description').trim();

    // Validation
    if (!title) {
      return { error: "Title is required" };
    }
    if (title.length > 100) {
      return { error: "Title must be less than 100 characters" };
    }
    if (description.length > 500) {
      return { error: "Description must be less than 500 characters" };
    }

    const db = await getDb();
    await db.collection('tasks').insertOne({
      title,
      description,
      completed: false,
      createdAt: new Date(),
    });

    return { success: "Task created successfully" };
  } catch (error) {
    console.error(error);
    return { error: "Failed to create task. Please try again." };
  }
}

export async function deleteTask(id) {
  try {
    const db = await getDb();
    await db.collection('tasks').deleteOne({ _id: id });
  } catch (error) {
    return { error: error.message };
  }
}

export async function toggleTask(id, completed) {
  try {
    const db = await getDb();
    await db.collection('tasks').updateOne(
      { _id: id },
      { $set: { completed: !completed } }
    );
  } catch (error) {
    return { error: error.message };
  }
}

export async function updateTask(id, formData) {
  try {
    const title = formData.get('title').trim();
    const description = formData.get('description').trim();

    // Reuse validation from createTask
    if (!title) return { error: "Title is required" };
    if (title.length > 100) return { error: "Title must be less than 100 characters" };
    if (description.length > 500) return { error: "Description must be less than 500 characters" };

    const db = await getDb();
    await db.collection('tasks').updateOne(
      { _id: id },
      { $set: { 
        title,
        description,
        updatedAt: new Date() 
      }}
    );

    return { success: "Task updated successfully" };
  } catch (error) {
    return { error: error.message || 'Failed to update task' };
  }
}

