import { formatRelativeTime } from '../utils/dateFormat.js';

export default function TaskItem({ task, onToggle, onDelete }) {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(task.id);
    }
  };

  return (
    <li className="flex items-start gap-3 p-3 rounded-lg hover:bg-neutral-800 transition-colors">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className="mt-1 accent-blue-500 cursor-pointer"
      />
      <div className="flex-1 min-w-0">
        <p
          className={`text-sm ${
            task.completed
              ? "text-neutral-500 line-through"
              : "text-white"
          }`}
        >
          {task.title}
        </p>
        <p className="text-xs text-neutral-500 mt-1">
          {formatRelativeTime(task.createdAt)}
        </p>
      </div>
      <button
        onClick={handleDelete}
        className="text-neutral-500 hover:text-red-400 transition-colors px-2"
        aria-label="Delete task"
      >
        ×
      </button>
    </li>
  );
}
