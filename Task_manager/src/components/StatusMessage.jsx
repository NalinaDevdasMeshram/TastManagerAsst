export default function StatusMessage({ status, onRetry }) {
  if (status === "loading") {
    return (
      <p role="status" className="p-6 text-center text-gray-500">
        Loading tasks..
      </p>
    );
  }
  return (
    <div role="alert" className="p-6 text-center">
      <p className="mb-3 text-red-600">Could not load tasks.</p>
      <button
        onClick={onRetry}
        className="rounded bg-blue-600 px-4 py-2 text-white"
      >
        Retry
      </button>
    </div>
  );
}
