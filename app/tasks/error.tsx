
"use client";

import { useEffect } from "react";

export default function TasksError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Tasks page error:", error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 p-6">

      <div className="rounded-xl bg-white p-8 text-center shadow-sm">

        <h1 className="mb-4 text-2xl font-bold text-red-600">
          Something went wrong!
        </h1>

        <p className="mb-6 text-gray-600">
          Unable to load tasks. Please try again.
        </p>

        <button
          onClick={() => reset()}
          className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
        >
          Try Again
        </button>

      </div>

    </main>
  );
}
