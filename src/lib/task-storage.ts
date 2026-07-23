import { starterTasks, Task, taskCategories } from "./tasks";

const TASKS_STORAGE_KEY = "growbuddy.tasks.v1";
const COMPLETED_TASKS_STORAGE_KEY = "growbuddy.completedTaskIds.v1";
const TASKS_CHANGED_EVENT = "growbuddy:tasks-changed";
const COMPLETED_TASKS_CHANGED_EVENT = "growbuddy:completed-tasks-changed";

let cachedTasks = starterTasks;
let cachedTasksStorageValue: string | null = null;
let cachedCompletedTaskIds: number[] = [];
let cachedCompletedTaskIdsStorageValue: string | null = null;

function isTask(value: unknown): value is Task {
  if (!value || typeof value !== "object") {
    return false;
  }

  const task = value as Partial<Task>;

  return (
    typeof task.id === "number" &&
    typeof task.title === "string" &&
    typeof task.minutes === "number" &&
    taskCategories.includes(task.category as Task["category"])
  );
}

function canUseBrowserStorage() {
  return typeof window !== "undefined" && Boolean(window.localStorage);
}

export function loadTasks(): Task[] {
  if (!canUseBrowserStorage()) {
    return starterTasks;
  }

  const storedValue = window.localStorage.getItem(TASKS_STORAGE_KEY);

  if (storedValue === cachedTasksStorageValue) {
    return cachedTasks;
  }

  cachedTasksStorageValue = storedValue;

  if (!storedValue) {
    cachedTasks = starterTasks;
    return cachedTasks;
  }

  try {
    const parsedValue = JSON.parse(storedValue);

    if (Array.isArray(parsedValue) && parsedValue.every(isTask)) {
      cachedTasks = parsedValue;
      return cachedTasks;
    }
  } catch {
    // If local storage is corrupted, fall back to starter data.
  }

  cachedTasks = starterTasks;
  return cachedTasks;
}

export function saveTasks(tasks: Task[]) {
  if (!canUseBrowserStorage()) {
    return;
  }

  cachedTasks = tasks;
  cachedTasksStorageValue = JSON.stringify(tasks);
  window.localStorage.setItem(TASKS_STORAGE_KEY, cachedTasksStorageValue);
  window.dispatchEvent(new Event(TASKS_CHANGED_EVENT));
}

export function subscribeToTasks(onStoreChange: () => void) {
  if (!canUseBrowserStorage()) {
    return () => {};
  }

  window.addEventListener("storage", onStoreChange);
  window.addEventListener(TASKS_CHANGED_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(TASKS_CHANGED_EVENT, onStoreChange);
  };
}

export function loadCompletedTaskIds(): number[] {
  if (!canUseBrowserStorage()) {
    return [];
  }

  const storedValue = window.localStorage.getItem(COMPLETED_TASKS_STORAGE_KEY);

  if (storedValue === cachedCompletedTaskIdsStorageValue) {
    return cachedCompletedTaskIds;
  }

  cachedCompletedTaskIdsStorageValue = storedValue;

  if (!storedValue) {
    cachedCompletedTaskIds = [];
    return cachedCompletedTaskIds;
  }

  try {
    const parsedValue = JSON.parse(storedValue);

    if (
      Array.isArray(parsedValue) &&
      parsedValue.every((taskId) => typeof taskId === "number")
    ) {
      cachedCompletedTaskIds = parsedValue;
      return cachedCompletedTaskIds;
    }
  } catch {
    // If local storage is corrupted, fall back to no completed tasks.
  }

  cachedCompletedTaskIds = [];
  return cachedCompletedTaskIds;
}

export function saveCompletedTaskIds(taskIds: number[]) {
  if (!canUseBrowserStorage()) {
    return;
  }

  cachedCompletedTaskIds = taskIds;
  cachedCompletedTaskIdsStorageValue = JSON.stringify(taskIds);
  window.localStorage.setItem(
    COMPLETED_TASKS_STORAGE_KEY,
    cachedCompletedTaskIdsStorageValue,
  );
  window.dispatchEvent(new Event(COMPLETED_TASKS_CHANGED_EVENT));
}

export function subscribeToCompletedTaskIds(onStoreChange: () => void) {
  if (!canUseBrowserStorage()) {
    return () => {};
  }

  window.addEventListener("storage", onStoreChange);
  window.addEventListener(COMPLETED_TASKS_CHANGED_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(COMPLETED_TASKS_CHANGED_EVENT, onStoreChange);
  };
}
