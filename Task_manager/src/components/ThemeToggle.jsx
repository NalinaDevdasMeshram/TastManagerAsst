export default function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === "dark";
  return (
    <button
      onClick={onToggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="rounded border px-3 py-1 text-sm dark:border-gray-600"
    >
      {isDark ? "Light" : "Dark"}
    </button>
  );
}
