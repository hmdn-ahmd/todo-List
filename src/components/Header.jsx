export default function Header({ pendingCount }) {
  return (
    <div className="flex items-center gap-3">
      <h1 className="text-xl font-semibold text-white">Todo</h1>
      <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-medium">
        {pendingCount}
      </span>
    </div>
  );
}
