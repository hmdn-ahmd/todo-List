export default function Footer({ completedCount, onClearCompleted }) {
  if (completedCount === 0) {
    return null;
  }

  return (
    <div className="pt-2 border-t border-neutral-800">
      <button
        onClick={onClearCompleted}
        className="text-xs text-neutral-500 hover:text-red-400 transition-colors"
      >
        Clear completed
      </button>
    </div>
  );
}
