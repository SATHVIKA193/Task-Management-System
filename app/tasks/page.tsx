
import Link from "next/link";

import { getDb } from "@/lib/mongodb";
import TaskForm from "@/components/TaskForm";
import DeleteTaskButton from "@/components/DeleteTaskButton";

export const dynamic = "force-dynamic";

export default async function TasksPage() {
  const db = await getDb();

  const tasks = await db
    .collection("tasks")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-5xl space-y-8">

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">

          <h1 className="text-3xl font-bold text-gray-900">
            Task Management System
          </h1>

          <Link
            href="/"
            className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
          >
            Home
          </Link>

        </div>

        {/* Task Form */}
        <section>
          <h2 className="mb-4 text-2xl font-bold text-gray-800">
            Create New Task
          </h2>

          {/* Import your existing Create Task form */}
          <TaskForm />
        </section>

        {/* Task List */}
        <section className="rounded-xl bg-white p-6 shadow-sm">

          <h2 className="mb-5 text-2xl font-bold text-gray-800">
            All Tasks ({tasks.length})
          </h2>

          {tasks.length === 0 ? (
            <p className="text-gray-500">
              No tasks available.
            </p>
          ) : (
            <div className="space-y-4">

              {tasks.map((task) => {
                const id = task._id.toString();

                return (
                  <div
                    key={id}
                    className="rounded-lg border p-5"
                  >

                    <h3 className="text-xl font-semibold text-gray-900">
                      {task.title}
                    </h3>

                    <p className="mt-2 text-gray-600">
                      {task.description || "No description"}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-3 text-sm">

                      <span className="rounded bg-blue-100 px-3 py-1 text-blue-700">
                        Priority: {task.priority}
                      </span>

                      <span className="rounded bg-green-100 px-3 py-1 text-green-700">
                        Status: {task.status}
                      </span>

                    </div>

                    <p className="mt-3 text-sm text-gray-500">
                      Due Date: {task.dueDate || "Not specified"}
                    </p>

                    {/* Actions */}
                    <div className="mt-5 flex flex-wrap gap-3">

                      <Link
                        href={`/tasks/${id}`}
                        className="rounded-lg bg-gray-700 px-4 py-2 text-white hover:bg-gray-800"
                      >
                        View
                      </Link>

                      <Link
                        href={`/tasks/${id}/edit`}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                      >
                        Edit
                      </Link>

                      <DeleteTaskButton id={id} />

                    </div>

                  </div>
                );
              })}

            </div>
          )}

        </section>

      </div>
    </main>
  );
}
