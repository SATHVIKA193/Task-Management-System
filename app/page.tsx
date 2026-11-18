
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100">

      <h1 className="mb-4 text-4xl font-bold text-gray-900">
        Task Management System
      </h1>

      <p className="mb-6 text-gray-600">
        Manage your daily tasks efficiently.
      </p>

      <Link
        href="/tasks"
        className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
      >
        Manage Tasks
      </Link>

    </main>
  );
}
