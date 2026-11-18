
"use client";

import { useState } from "react";
import { deleteTask } from "@/app/actions";

type DeleteTaskButtonProps = {
  id: string;
};

export default function DeleteTaskButton({
  id,
}: DeleteTaskButtonProps) {
  const [pending, setPending] = useState(false);

  return (
    <form
      action={async (formData) => {
        if (!window.confirm("Are you sure you want to delete this task?")) {
          return;
        }

        setPending(true);

        try {
          await deleteTask(formData);
        } catch (error) {
          console.error("Delete task failed:", error);
          window.alert("Unable to delete task. Please try again.");
          setPending(false);
        }
      }}
    >
      <input type="hidden" name="id" value={id} />

      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50"
      >
        {pending ? "Deleting..." : "Delete"}
      </button>
    </form>
  );
}
