import { describe, expect, it } from "vitest";
import {
  countActive,
  filterTasks,
  getVisibleTasks,
  isOverdue,
  searchTasks,
  sortTasks,
} from "./taskUtils";

const tasks = [
  {
    id: 1,
    title: "Set up project repo",
    priority: "High",
    dueDate: "2026-01-10",
    completed: true,
  },
  {
    id: 2,
    title: "Design login screen",
    priority: "Medium",
    dueDate: "2027-03-12",
    completed: false,
  },
  {
    id: 3,
    title: "Write API docs",
    priority: "Low",
    dueDate: "2027-04-20",
    completed: false,
  },
  {
    id: 4,
    title: "Fix checkout bug",
    priority: "High",
    dueDate: "2026-01-15",
    completed: false,
  },
  {
    id: 5,
    title: "Plan team outing",
    priority: "Low",
    dueDate: null,
    completed: true,
  },
];

const titles = (list) => list.map((task) => task.title);

describe("filterTasks", () => {
  it('returns all tasks for "all"', () => {
    expect(filterTasks(tasks, "all")).toHaveLength(5);
  });

  it('returns only incomplete tasks for "active"', () => {
    expect(filterTasks(tasks, "active").map((task) => task.id)).toEqual([
      2, 3, 4,
    ]);
  });

  it('returns only completed tasks for "completed"', () => {
    expect(filterTasks(tasks, "completed").map((task) => task.id)).toEqual([
      1, 5,
    ]);
  });
});

describe("searchTasks", () => {
  it("is case-insensitive", () => {
    expect(titles(searchTasks(tasks, "API"))).toEqual(["Write API docs"]);
    expect(titles(searchTasks(tasks, "api"))).toEqual(["Write API docs"]);
  });

  it("ignores surrounding spaces and returns all for an empty query", () => {
    expect(searchTasks(tasks, "   ")).toHaveLength(5);
  });

  it("returns an empty list when nothing matches", () => {
    expect(searchTasks(tasks, "zzz")).toEqual([]);
  });
});

describe("sortTasks", () => {
  it("sorts by due date, soonest first, no date last", () => {
    expect(titles(sortTasks(tasks, "dueDate"))).toEqual([
      "Set up project repo",
      "Fix checkout bug",
      "Design login screen",
      "Write API docs",
      "Plan team outing",
    ]);
  });

  it("sorts by priority, High first", () => {
    const result = sortTasks(tasks, "priority").map((task) => task.priority);
    expect(result).toEqual(["High", "High", "Medium", "Low", "Low"]);
  });

  it("does not mutate the original array", () => {
    const before = titles(tasks);
    sortTasks(tasks, "dueDate");
    expect(titles(tasks)).toEqual(before);
  });
});

describe("getVisibleTasks", () => {
  it("combines filter, search and sort", () => {
    const result = getVisibleTasks(tasks, {
      filter: "active",
      query: "e",
      sortBy: "dueDate",
    });
    expect(titles(result)).toEqual([
      "Fix checkout bug",
      "Design login screen",
      "Write API docs",
    ]);
  });
});
describe("countActive", () => {
  it("counts incomplete tasks", () => {
    expect(countActive(tasks)).toBe(3);
  });
});

describe("isOverdue", () => {
  const today = "2026-06-01";

  it("is true for an incomplete task past its due date", () => {
    expect(isOverdue(tasks[3], today)).toBe(true);
  });

  it("is false for a completed task, even if past due", () => {
    expect(isOverdue(tasks[0], today)).toBe(false);
  });

  it("is false for a future date or no date", () => {
    expect(isOverdue(tasks[1], today)).toBe(false);
    expect(isOverdue(tasks[4], today)).toBe(false);
  });
});
