const PRIORITY_ORDER = { High: 0, Medium: 1, Low: 2 };

export function getTodayString() {
  return new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD
}

export function isOverdue(task, today = getTodayString()) {
  return !task.completed && Boolean(task.dueDate) && task.dueDate < today;
}

export function countActive(tasks) {
  return tasks.filter((task) => !task.completed).length;
}

export function filterTasks(tasks, filter) {
  if (filter === "active") return tasks.filter((task) => !task.completed);
  if (filter === "completed") return tasks.filter((task) => task.completed);
  return tasks;
}

export function searchTasks(tasks, query) {
  const text = query.trim().toLowerCase();
  if (!text) return tasks;
  return tasks.filter((task) => task.title.toLowerCase().includes(text));
}

export function sortTasks(tasks, sortBy) {
  const copy = [...tasks];
  if (sortBy === "dueDate") {
    return copy.sort((a, b) => {
      if (!a.dueDate && !b.dueDate) return 0;
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return a.dueDate.localeCompare(b.dueDate);
    });
  }
  if (sortBy === "priority") {
    return copy.sort(
      (a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority],
    );
  }
  return copy;
}

export function getVisibleTasks(tasks, { filter, query, sortBy }) {
  return sortTasks(searchTasks(filterTasks(tasks, filter), query), sortBy);
}
