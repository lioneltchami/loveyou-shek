'use client';

/**
 * Global Error Boundary Component
 *
 * Catches errors in the root layout and other global errors.
 * This is a fallback for errors that aren't caught by regular error.tsx files.
 */

import { useEffect } from 'react';
import Link from 'next/link';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global error boundary caught:', error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#f5f3f0] to-white px-4">
          <div className="max-w-md w-full text-center">
            <div className="mb-6">
              <svg
                className="w-24 h-24 mx-auto text-[#8b7355]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Application Error
            </h1>

            <p className="text-gray-600 mb-8">
              A critical error occurred. Please try refreshing the page.
            </p>

            <div className="space-y-3">
              <button
                onClick={reset}
                className="w-full bg-[#8b7355] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#6f5a43] transition-colors duration-300"
              >
                Try again
              </button>

              <Link
                href="/"
                className="block w-full bg-white text-[#8b7355] py-3 px-6 rounded-lg font-medium border-2 border-[#8b7355] hover:bg-[#f5f3f0] transition-colors duration-300"
              >
                Go to homepage
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
