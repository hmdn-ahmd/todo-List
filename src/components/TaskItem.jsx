import { useState, useRef, useEffect } from 'react';
import { formatRelativeTime } from '../utils/dateFormat.js';

export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.title);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleStartEdit = () => {
    setIsEditing(true);
    setEditValue(task.title);
  };

  const handleSave = () => {
    const trimmed = editValue.trim();
    if (trimmed && trimmed !== task.title) {
      onEdit(task.id, trimmed);
    } else {
      setEditValue(task.title);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(task.title);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };
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
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className="w-full text-sm bg-neutral-800 text-white rounded px-2 py-1 outline-none focus:ring-2 focus:ring-blue-500"
          />
        ) : (
          <p
            onClick={handleStartEdit}
            className={`text-sm cursor-pointer ${
              task.completed
                ? "text-neutral-500 line-through"
                : "text-white"
            }`}
          >
            {task.title}
          </p>
        )}
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
