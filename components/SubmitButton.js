'use client';
import { useFormStatus } from 'react-dom';
import LoadingSpinner from './LoadingSpinner';

export default function SubmitButton({ label = 'Add Task' }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? (
        <div className="flex items-center justify-center gap-2">
          <LoadingSpinner />
          <span>Saving...</span>
        </div>
      ) : (
        label
      )}
    </button>
  );
}