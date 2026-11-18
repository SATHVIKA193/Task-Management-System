
export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">

      <div className="rounded-xl bg-white p-8 text-center shadow-sm">

        <div className="mb-4 text-2xl font-bold text-blue-600">
          Loading Tasks...
        </div>

        <p className="text-gray-600">
          Please wait while we load your tasks.
        </p>

      </div>

    </main>
  );
}
