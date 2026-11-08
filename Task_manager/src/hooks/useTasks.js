import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "tasks";

function readStoredTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export default function useTasks() {
  const [storedTasks] = useState(readStoredTasks);
  const [tasks, setTasks] = useState(storedTasks ?? []);
  const [status, setStatus] = useState(storedTasks ? "ready" : "loading"); // loading | ready | error

  const fetchTasks = useCallback(async () => {
    try {
      const response = await fetch("/tasks.json");
      if (!response.ok) throw new Error("Failed to load tasks");
      setTasks(await response.json());
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    if (!storedTasks);
  }, [storedTasks, fetchTasks]);

  useEffect(() => {
    if (status === "ready") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }
  }, [tasks, status]);

  const retry = () => {
    setStatus("loading");
    fetchTasks();
  };

  const addTask = (title, priority, dueDate) => {
    const task = {
      id: Date.now(),
      title: title.trim(),
      priority,
      dueDate: dueDate || null,
      completed: false,
    };
    setTasks((current) => [...current, task]);
  };

  const toggleTask = (id) =>
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );

  const editTask = (id, title) =>
    setTasks((current) =>
      current.map((task) => (task.id === id ? { ...task, title } : task)),
    );

  const deleteTask = (id) =>
    setTasks((current) => current.filter((task) => task.id !== id));

  return { tasks, status, retry, addTask, toggleTask, editTask, deleteTask };
}
