
"use server";

import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { getDb } from "@/lib/mongodb";
import { taskSchema } from "@/lib/task-schema";

export type TaskActionState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

// UPDATE TASK
export async function updateTask(
  prevState: TaskActionState,
  formData: FormData
): Promise<TaskActionState> {
  try {
    const id = formData.get("id");

    if (
      typeof id !== "string" ||
      !ObjectId.isValid(id)
    ) {
      return {
        success: false,
        message: "Invalid task ID",
      };
    }

    const rawData = {
      title: formData.get("title"),
      description: formData.get("description"),
      priority: formData.get("priority"),
      status: formData.get("status"),
      dueDate: formData.get("dueDate") || "",
    };

    const result = taskSchema.safeParse(rawData);

    if (!result.success) {
      return {
        success: false,
        message: "Please correct the form errors.",
        errors: result.error.flatten().fieldErrors,
      };
    }

    const db = await getDb();

    const updateResult = await db.collection("tasks").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...result.data,
          dueDate: result.data.dueDate || null,
          updatedAt: new Date(),
        },
      }
    );

    if (updateResult.matchedCount === 0) {
      return {
        success: false,
        message: "Task not found.",
      };
    }

    revalidatePath("/tasks");
    revalidatePath(`/tasks/${id}`);
    revalidatePath(`/tasks/${id}/edit`);

    return {
      success: true,
      message: "Task updated successfully!",
    };
  } catch (error) {
    console.error("Update task error:", error);

    return {
      success: false,
      message: "Failed to update task. Please try again.",
    };
  }
}

// DELETE TASK
export async function deleteTask(
  formData: FormData
): Promise<void> {
  const id = formData.get("id");

  if (
    typeof id !== "string" ||
    !ObjectId.isValid(id)
  ) {
    throw new Error("Invalid task ID");
  }

  try {
    const db = await getDb();

    const result = await db.collection("tasks").deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      throw new Error("Task not found");
    }

    revalidatePath("/tasks");
  } catch (error) {
    console.error("Delete task error:", error);
    throw new Error("Failed to delete task");
  }

  redirect("/tasks");
}
