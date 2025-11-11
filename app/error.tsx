'use client';

/**
 * Error Boundary Component
 *
 * Catches errors in the application and displays a user-friendly error page.
 * Provides a "Try again" button to recover from errors.
 *
 * This is a Next.js 13+ App Router error boundary.
 */

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console in development
    console.error('Error boundary caught:', error);

    // In production, you could send this to an error reporting service
    // Example: Sentry, LogRocket, etc.
    // if (process.env.NODE_ENV === 'production') {
    //   reportErrorToService(error);
    // }
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#f5f3f0] to-white px-4">
      <div className="max-w-md w-full text-center">
        {/* Error icon */}
        <div className="mb-6">
          <svg
            className="w-24 h-24 mx-auto text-[#8b7355]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            role="img"
            aria-label="Error icon"
          >
            <title>Error</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        {/* Error heading */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Something went wrong
        </h1>

        {/* Error description */}
        <p className="text-gray-600 mb-8">
          We encountered an unexpected error. This has been logged and we'll look into it.
        </p>

        {/* Error details (only in development) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
            <h2 className="text-sm font-semibold text-red-800 mb-2">
              Error Details (Development Only):
            </h2>
            <pre className="text-xs text-red-700 overflow-auto max-h-32">
              {error.message}
            </pre>
            {error.digest && (
              <p className="text-xs text-red-600 mt-2">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={reset}
            className="w-full bg-[#8b7355] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#6f5a43] transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-[#8b7355]/50"
          >
            Try again
          </button>

          <Link
            href="/"
            className="block w-full bg-white text-[#8b7355] py-3 px-6 rounded-lg font-medium border-2 border-[#8b7355] hover:bg-[#f5f3f0] transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-[#8b7355]/50"
          >
            Go to homepage
          </Link>
        </div>

        {/* Additional help text */}
        <p className="mt-8 text-sm text-gray-500">
          If this problem persists, please refresh the page or try again later.
        </p>
      </div>
    </div>
  );
}
