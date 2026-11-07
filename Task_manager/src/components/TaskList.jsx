import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onToggle, onEdit, onDelete }) {
  if (tasks.length === 0)
    return <p className="p-4 text-gray-500">No tasks to show.</p>;
  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
