
"use client";

import { useActionState } from "react";
import {
  createTask,
  type FormState,
} from "@/lib/task-actions";

const initialState: FormState = {
  success: false,
  message: "",
};

export default function TaskForm() {
  const [state, formAction, pending] = useActionState(
    createTask,
    initialState
  );

  return (
    <form
      action={formAction}
      className="space-y-5 rounded-xl border bg-white p-6 shadow-sm"
    >
      <h2 className="text-2xl font-bold text-gray-800">
        Create New Task
      </h2>

      {/* Task Title */}
      <div>
        <label className="mb-2 block font-medium text-gray-700">
          Task Title
        </label>

        <input
          type="text"
          name="title"
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
    defaultValue=""
    required
    className="w-full rounded-lg border p-3 text-gray-900"
  >
    <option value="" disabled>
      Select Priority (Suggested: Medium)
    </option>

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
    defaultValue=""
    required
    className="w-full rounded-lg border p-3 text-gray-900"
  >
    <option value="" disabled>
      Select Status (Suggested: Pending)
    </option>

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
    type="date"
    name="dueDate"
    required
    className="w-full rounded-lg border p-3 text-gray-900"
  />

  {state.errors?.dueDate?.map((error) => (
    <p key={error} className="mt-1 text-sm text-red-600">
      {error}
    </p>
  ))}
</div>


      {/* Success and Error Messages */}
      {state.message && (
        <p
          className={`rounded-lg p-3 text-sm ${
            state.success
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
          role="status"
        >
          {state.message}
        </p>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {pending ? "Creating Task..." : "Create Task"}
      </button>
    </form>
  );
}
