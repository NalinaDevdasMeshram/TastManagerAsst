export default function Toolbar({
  query,
  onQueryChange,
  sortBy,
  onSortChange,
}) {
  return (
    <div className="my-3 flex flex-col gap-2 sm:flex-row">
      <label htmlFor="search" className="sr-only">
        Search tasks
      </label>
      <input
        id="search"
        type="search"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="Search by title..."
        className="flex-1 rounded border p-2"
      />
      <label htmlFor="sort" className="sr-only">
        Sort tasks
      </label>
      <select
        id="sort"
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="rounded border p-2"
      >
        <option value="none">No sorting</option>
        <option value="dueDate">Sort by due date</option>
        <option value="priority">Sort by priority</option>
      </select>
    </div>
  );
}
