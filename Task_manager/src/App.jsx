import { useState } from "react";
import useTasks from "./hooks/useTasks";
import { countActive, getVisibleTasks } from "./utils/taskUtils";
import StatusMessage from "./components/StatusMessage";
import TaskForm from "./components/TaskForm";
import FilterTabs from "./components/FilterTabs";
import Toolbar from "./components/Toolbar";
import TaskList from "./components/TaskList";

export default function App() {
  const { tasks, status, retry, addTask, toggleTask, editTask, deleteTask } =
    useTasks();
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("none");

  if (status !== "ready")
    return <StatusMessage status={status} onRetry={retry} />;

  const visibleTasks = getVisibleTasks(tasks, { filter, query, sortBy });
  const left = countActive(tasks);

  return (
    <main className="mx-auto max-w-2xl p-4">
      <h1 className="mb-4 text-2xl font-bold">Task Manager</h1>
      <TaskForm onAdd={addTask} />
      <div className="flex flex-wrap items-center justify-between gap-2">
        <FilterTabs filter={filter} onChange={setFilter} />
        <p>
          {left} {left === 1 ? "task" : "tasks"} left
        </p>
      </div>
      <Toolbar
        query={query}
        onQueryChange={setQuery}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
      <TaskList
        tasks={visibleTasks}
        onToggle={toggleTask}
        onEdit={editTask}
        onDelete={deleteTask}
      />
    </main>
  );
}
