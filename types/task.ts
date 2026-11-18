
export type TaskPriority = "Low" | "Medium" | "High";

export type TaskStatus =
  | "Pending"
  | "In Progress"
  | "Completed";

export interface Task {
  _id?: string;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string | null;
  createdAt: Date;
  updatedAt: Date;
}
