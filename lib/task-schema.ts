
import { z } from "zod";

export const taskSchema = z.object({
  // Task Title Validation
  title: z
    .string()
    .trim()
    .min(3, "Task title must contain at least 3 characters")
    .max(100, "Task title cannot exceed 100 characters"),

  // Description Validation
  description: z
    .string()
    .trim()
    .min(10, "Description must contain at least 10 characters")
    .max(500, "Description cannot exceed 500 characters"),

  // Priority Validation
  priority: z.enum(
    ["Low", "Medium", "High"],
    {
      error: "Please select a task priority",
    }
  ),

  // Status Validation
  status: z.enum(
    ["Pending", "In Progress", "Completed"],
    {
      error: "Please select a task status",
    }
  ),

  // Due Date Validation
  dueDate: z
    .string()
    .min(1, "Please select a due date")
    .refine(
      (date) => {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
          return false;
        }

        const parsedDate = new Date(`${date}T00:00:00.000Z`);

        return (
          !Number.isNaN(parsedDate.getTime()) &&
          parsedDate.toISOString().slice(0, 10) === date
        );
      },
      "Please select a valid due date"
    ),
});

export type TaskFormData = z.infer<typeof taskSchema>;
