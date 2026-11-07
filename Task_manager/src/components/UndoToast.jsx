export default function UndoToast({ title, onUndo }) {
  return (
    <div
      role="status"
      className="fixed inset-x-4 bottom-4 mx-auto flex max-w-md items-center justify-between gap-3 rounded bg-gray-900 px-4 py-3 text-white shadow-lg dark:bg-gray-100 dark:text-gray-900"
    >
      <span className="truncate">Deleted "{title}"</span>
      <button onClick={onUndo} className="font-semibold underline">
        Undo
      </button>
    </div>
  );
}
