export default function FilterTabs({ value, onChange }) {
  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'pending', label: 'Pending' },
    { id: 'completed', label: 'Completed' }
  ];

  return (
    <div className="flex gap-6 text-sm border-b border-neutral-800 pb-2">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`transition-colors ${
            value === tab.id
              ? 'text-blue-400 border-b-2 border-blue-400 pb-1'
              : 'text-neutral-400 hover:text-white'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
