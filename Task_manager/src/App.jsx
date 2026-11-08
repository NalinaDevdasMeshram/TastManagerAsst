import { useState } from "react";
import useTasks from "./hooks/useTasks";
import { countActive, getVisibleTasks } from "./utils/taskUtils";
import StatusMessage from "./components/StatusMessage";
import TaskForm from "./components/TaskForm";
import FilterTabs from "./components/FilterTabs";
import Toolbar from "./components/Toolbar";
import TaskList from "./components/TaskList";
import useTheme from "./hooks/useTheme";
import ThemeToggle from "./components/ThemeToggle";
import useUndoDelete from "./hooks/useUndoDelete";
import UndoToast from "./components/UndoToast";

export default function App() {
  const { tasks, status, retry, addTask, toggleTask, editTask, deleteTask } =
    useTasks();
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("none");
  const { theme, toggleTheme } = useTheme();
  const { pendingId, pendingTitle, requestDelete, undo } =
    useUndoDelete(deleteTask);

  if (status !== "ready")
    return <StatusMessage status={status} onRetry={retry} />;

  const liveTasks = tasks.filter((task) => task.id !== pendingId);
  const visibleTasks = getVisibleTasks(liveTasks, { filter, query, sortBy });
  const left = countActive(liveTasks);

  return (
    <main className="mx-auto max-w-2xl p-4">
      <header className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Task Manager</h1>
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </header>
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
        onDelete={requestDelete}
      />
      {pendingId !== null && <UndoToast title={pendingTitle} onUndo={undo} />}
    </main>
  );
}
