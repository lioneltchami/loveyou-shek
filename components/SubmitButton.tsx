"use client";

import { useFormStatus } from 'react-dom';

interface SubmitButtonProps {
  label: string;
  submittingLabel: string;
}

/**
 * Submit Button with React 19 useFormStatus
 * Automatically shows pending state during form submission
 */
export default function SubmitButton({ label, submittingLabel }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-[#8b7355] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#6f5a43] transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-[#8b7355]/50"
      aria-label={pending ? submittingLabel : label}
    >
      {pending ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          {submittingLabel}
        </span>
      ) : (
        label
      )}
    </button>
  );
}
