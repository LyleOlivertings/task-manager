'use client';
import { useState } from 'react';
import { useFormState } from 'react-dom';
import { updateTask } from '@/app/actions';
import SubmitButton from '@/components/SubmitButton';

export default function EditTaskModal({ task, onClose }) {
  const [state, formAction] = useFormState(updateTask, { error: null, success: null });
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(onClose, 300); // Allow time for animation
  };

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="bg-white rounded-lg p-6 w-full max-w-md transform transition-all scale-95">
        <form action={(formData) => {
          formAction(task._id, formData);
          handleClose();
        }}>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Edit Task</h2>
              <button
                type="button"
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {state?.error && (
              <div className="p-3 bg-red-100 text-red-700 rounded-md">
                {state.error}
              </div>
            )}

            <input
              type="text"
              name="title"
              defaultValue={task.title}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Task title"
              required
            />

            <textarea
              name="description"
              defaultValue={task.description}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              rows="3"
              placeholder="Task description"
            />

            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
              >
                Cancel
              </button>
              <SubmitButton label="Save Changes" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}