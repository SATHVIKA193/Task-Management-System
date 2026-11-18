
"use client";

import { useActionState } from "react";
import { updateTask, type TaskActionState } from "@/app/actions";

type EditTaskFormProps = {
  task: {
    _id: string;
    title: string;
    description: string;
    priority: string;
    status: string;
    dueDate: string | null;
  };
};

const initialState: TaskActionState = {
  success: false,
  message: "",
};

export default function EditTaskForm({ task }: EditTaskFormProps) {
  const [state, formAction, pending] = useActionState(
    updateTask,
    initialState
  );

  return (
    <form
      action={formAction}
      className="space-y-5 rounded-xl border bg-white p-6 shadow-sm"
    >
      <input type="hidden" name="id" value={task._id} />

      <h2 className="text-2xl font-bold text-gray-800">
        Edit Task
      </h2>

      {/* Task Title */}
      <div>
        <label className="mb-2 block font-medium text-gray-700">
          Task Title *
        </label>

        <input
          name="title"
          type="text"
          defaultValue={task.title}
          placeholder="Enter task title"
          required
          minLength={3}
          maxLength={100}
          className="w-full rounded-lg border p-3 text-gray-900"
        />

        {state.errors?.title?.map((error) => (
          <p key={error} className="mt-1 text-sm text-red-600">
            {error}
          </p>
        ))}
      </div>

      {/* Description */}
      <div>
        <label className="mb-2 block font-medium text-gray-700">
          Description *
        </label>

        <textarea
          name="description"
          defaultValue={task.description}
          placeholder="Enter task description (minimum 10 characters)"
          required
          minLength={10}
          maxLength={500}
          rows={4}
          className="w-full rounded-lg border p-3 text-gray-900"
        />

        {state.errors?.description?.map((error) => (
          <p key={error} className="mt-1 text-sm text-red-600">
            {error}
          </p>
        ))}
      </div>

      {/* Priority */}
      <div>
        <label className="mb-2 block font-medium text-gray-700">
          Priority *
        </label>

        <select
          name="priority"
          defaultValue={task.priority}
          required
          className="w-full rounded-lg border p-3 text-gray-900"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        {state.errors?.priority?.map((error) => (
          <p key={error} className="mt-1 text-sm text-red-600">
            {error}
          </p>
        ))}
      </div>

      {/* Status */}
      <div>
        <label className="mb-2 block font-medium text-gray-700">
          Status *
        </label>

        <select
          name="status"
          defaultValue={task.status}
          required
          className="w-full rounded-lg border p-3 text-gray-900"
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        {state.errors?.status?.map((error) => (
          <p key={error} className="mt-1 text-sm text-red-600">
            {error}
          </p>
        ))}
      </div>

      {/* Due Date */}
      <div>
        <label className="mb-2 block font-medium text-gray-700">
          Due Date *
        </label>

        <input
          name="dueDate"
          type="date"
          defaultValue={task.dueDate ?? ""}
          required
          className="w-full rounded-lg border p-3 text-gray-900"
        />

        {state.errors?.dueDate?.map((error) => (
          <p key={error} className="mt-1 text-sm text-red-600">
            {error}
          </p>
        ))}
      </div>

      {/* Messages */}
      {state.message && (
        <p
          role="status"
          className={`rounded-lg p-3 ${
            state.success
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {state.message}
        </p>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {pending ? "Updating Task..." : "Update Task"}
      </button>
    </form>
  );
}
