import { useState } from "react";
import { isOverdue } from "../utils/taskUtils";

const BADGE_STYLES = {
  High: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200",
  Medium:
    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200",
  Low: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200",
};

export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(task.title);
  const [error, setError] = useState("");

  const startEdit = () => {
    setDraft(task.title);
    setError("");
    setIsEditing(true);
  };

  const save = () => {
    if (!draft.trim()) {
      setError("Title cannot be blank");
      return;
    }
    onEdit(task.id, draft.trim());
    setIsEditing(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") save();
    if (event.key === "Escape") setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm(`Delete "${task.title}"?`)) onDelete(task);
  };

  return (
    <li className="flex flex-wrap items-center gap-3 border-b py-3">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        aria-label={`Mark "${task.title}" as completed`}
        className="h-5 w-5"
      />

      <div className="min-w-0 flex-1">
        {isEditing ? (
          <>
            <input
              autoFocus
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={handleKeyDown}
              aria-label="Edit task title"
              className="w-full rounded border p-1"
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
          </>
        ) : (
          <button
            onClick={startEdit}
            className={`text-left ${task.completed ? "text-gray-400 line-through" : ""}`}
          >
            {task.title}
          </button>
        )}
        <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-gray-500">
          <span
            className={`rounded px-2 py-0.5 ${BADGE_STYLES[task.priority]}`}
          >
            {task.priority}
          </span>
          <span>{task.dueDate ?? "No due date"}</span>
          {isOverdue(task) && (
            <span className="font-semibold text-red-600">Overdue</span>
          )}
        </div>
      </div>

      <button onClick={handleDelete} className="text-sm text-red-600">
        Delete
      </button>
    </li>
  );
}
