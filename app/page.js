'use client';
import { useState, useEffect } from 'react';
import TaskForm from '@/components/TaskForm';
import EditTaskModal from '@/components/EditTaskModal';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch tasks on mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/tasks');
      if (!res.ok) throw new Error('Failed to fetch tasks');
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to delete task');
      }
      
      fetchTasks();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleToggle = async (id, completed) => {
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !completed })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to update task');
      }
      
      fetchTasks();
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Task Manager</h1>
        
        <TaskForm onSuccess={fetchTasks} />

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {editingTask && (
          <EditTaskModal 
            task={editingTask} 
            onClose={() => setEditingTask(null)}
            onSuccess={fetchTasks}
          />
        )}

        <div className="space-y-4">
          {loading ? (
            <div className="text-center text-gray-500">Loading tasks...</div>
          ) : tasks.length === 0 ? (
            <div className="text-center text-gray-500">No tasks found. Create one above!</div>
          ) : (
            tasks.map((task) => (
              <div 
                key={task._id} 
                className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center transition-all hover:shadow-lg"
              >
                <div className="flex-1">
                  <h3 className={`text-lg ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                    {task.title}
                  </h3>
                  {task.description && (
                    <p className="text-gray-600 text-sm mt-1">
                      {task.description}
                    </p>
                  )}
                  {task.updatedAt && (
                    <p className="text-xs text-gray-400 mt-2">
                      Last updated: {new Date(task.updatedAt).toLocaleString()}
                    </p>
                  )}
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => setEditingTask(task)}
                    className="px-3 py-1 rounded bg-blue-100 text-blue-800 hover:bg-blue-200 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleToggle(task._id, task.completed)}
                    className={`px-3 py-1 rounded text-sm ${
                      task.completed 
                        ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' 
                        : 'bg-green-100 text-green-800 hover:bg-green-200'
                    }`}
                  >
                    {task.completed ? 'Undo' : 'Complete'}
                  </button>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="px-3 py-1 rounded bg-red-100 text-red-800 hover:bg-red-200 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}