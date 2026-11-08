import { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    onAdd(title, priority, dueDate);
    setTitle("");
    setPriority("Medium");
    setDueDate("");
    setError("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start"
    >
      <div className="flex-1">
        <label htmlFor="new-title" className="sr-only">
          Task title
        </label>
        <input
          id="new-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a task..."
          className="w-full rounded border p-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400"
        />
        {error && (
          <p className="mt-1 min-h-5 text-sm text-red-600 dark:text-red-400">
            {error}
          </p>
        )}
      </div>
      <label htmlFor="new-priority" className="sr-only">
        Priority
      </label>
      <select
        id="new-priority"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="rounded border p-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <label htmlFor="new-due" className="sr-only">
        Due date
      </label>
      <input
        id="new-due"
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="rounded border p-2 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:scheme-dark"
      />
      <button
        type="submit"
        className="w-full rounded border p-2 dark:border-gray-600 dark:bg-gray-800 dark:text-white sm:w-auto"
      >
        Add
      </button>
    </form>
  );
}
