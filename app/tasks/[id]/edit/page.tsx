
import { ObjectId } from "mongodb";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getDb } from "@/lib/mongodb";
import EditTaskForm from "@/components/EditTaskForm";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditTaskPage({ params }: Props) {
  const { id } = await params;

  // Validate MongoDB ID
  if (!ObjectId.isValid(id)) {
    notFound();
  }

  // Connect to MongoDB
  const db = await getDb();

  // Find the selected task
  const task = await db.collection("tasks").findOne({
    _id: new ObjectId(id),
  });

  // If task does not exist
  if (!task) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-3xl space-y-6">

        <Link
          href={`/tasks/${id}`}
          className="text-blue-600 hover:underline"
        >
          ← Back to Task Details
        </Link>

        <EditTaskForm
          task={{
            _id: task._id.toString(),
            title: task.title,
            description: task.description ?? "",
            priority: task.priority,
            status: task.status,
            dueDate: task.dueDate ?? null,
          }}
        />

      </div>
    </main>
  );
}
