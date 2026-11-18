
import { ObjectId } from "mongodb";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getDb } from "@/lib/mongodb";
import DeleteTaskButton from "@/components/DeleteTaskButton";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function TaskDetailsPage({
  params,
}: Props) {
  const { id } = await params;

  if (!ObjectId.isValid(id)) {
    notFound();
  }

  const db = await getDb();

  const task = await db.collection("tasks").findOne({
    _id: new ObjectId(id),
  });

  if (!task) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-3xl space-y-6">

        <Link
          href="/tasks"
          className="text-blue-600 hover:underline"
        >
          ← Back to Tasks
        </Link>

        <section className="rounded-xl bg-white p-6 shadow-sm">

          <h1 className="mb-4 text-3xl font-bold text-gray-900">
            {task.title}
          </h1>

          <p className="mb-6 text-gray-600">
            {task.description || "No description available"}
          </p>

          <div className="space-y-3">

            <p>
              <strong>Priority:</strong> {task.priority}
            </p>

            <p>
              <strong>Status:</strong> {task.status}
            </p>

            <p>
              <strong>Due Date:</strong>{" "}
              {task.dueDate || "Not specified"}
            </p>

            <p>
              <strong>Created:</strong>{" "}
              {task.createdAt?.toLocaleDateString("en-IN") || "Unknown"}
            </p>

            <p>
              <strong>Last Updated:</strong>{" "}
              {task.updatedAt?.toLocaleDateString("en-IN") || "Unknown"}
            </p>

          </div>

          <div className="mt-6 flex flex-wrap gap-3">

            <Link
              href={`/tasks/${id}/edit`}
              className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
            >
              Edit Task
            </Link>

            <DeleteTaskButton id={id} />

          </div>

        </section>

      </div>
    </main>
  );
}
