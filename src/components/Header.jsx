export default function Header({ pendingCount, sortOrder, onToggleSort }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-semibold text-white">Todo</h1>
        <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-medium">
          {pendingCount}
        </span>
      </div>
      <button
        onClick={onToggleSort}
        className="text-xs text-neutral-500 hover:text-white transition-colors"
      >
        {sortOrder === 'newest' ? 'Newest first ↓' : 'Oldest first ↑'}
      </button>
    </div>
  );
}
