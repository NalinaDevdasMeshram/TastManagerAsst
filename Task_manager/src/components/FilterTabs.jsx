const TABS = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
];

export default function FilterTabs({ filter, onChange }) {
  return (
    <div className="flex gap-2">
      {TABS.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          aria-pressed={filter === tab.value}
          className={`rounded px-3 py-1 ${
            filter === tab.value ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
