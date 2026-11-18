
"use server";

import { getDb } from "@/lib/mongodb";
import { taskSchema } from "@/lib/task-schema";
import { revalidatePath } from "next/cache";

export type FormState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export async function createTask(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  try {
    // 1. Get form values
    const rawData = {
      title: formData.get("title"),
      description: formData.get("description"),
      priority: formData.get("priority"),
      status: formData.get("status"),
      dueDate: formData.get("dueDate") || "",
    };

    // 2. Validate using Zod
    const result = taskSchema.safeParse(rawData);

    if (!result.success) {
      return {
        success: false,
        message: "Please correct the form errors.",
        errors: result.error.flatten().fieldErrors,
      };
    }

    // 3. Connect to MongoDB
    const db = await getDb();

    // 4. Prepare task data
    const task = {
      ...result.data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // 5. Insert task into MongoDB
    await db.collection("tasks").insertOne(task);

    // 6. Refresh tasks page
    revalidatePath("/tasks");

    // 7. Return success message
    return {
      success: true,
      message: "Task created successfully!",
    };

  } catch (error) {
    console.error("Create task error:", error);

    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}
