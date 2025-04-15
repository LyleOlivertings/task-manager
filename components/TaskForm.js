'use client';
import { useState } from 'react';
import SubmitButton from '@/components/SubmitButton';

export default function TaskForm({ onSuccess }) {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    const formData = {
      title: e.target.title.value.trim(),
      description: e.target.description.value.trim()
    };

    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to create task');
      }

      setSuccess('Task created successfully!');
      e.target.reset();
      onSuccess?.();
    } catch (err) {
      setError(err.message);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow-md">
      <div className="space-y-4">
        {/* Error/Success Messages */}
        {error && (
          <div className="p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
        {success && (
          <div className="p-3 bg-green-100 text-green-700 rounded-md">
            {success}
          </div>
        )}

        {/* Title Input */}
        <input
          type="text"
          name="title"
          placeholder="Task title"
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          maxLength={100}
        />

        {/* Description Textarea */}
        <textarea
          name="description"
          placeholder="Task description (optional)"
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows="3"
          maxLength={500}
        />

        <SubmitButton />
      </div>
    </form>
  );
}