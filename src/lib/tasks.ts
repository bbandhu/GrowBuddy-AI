export type TaskCategory = "Reading" | "Homework" | "Routine" | "Chore";

export type Task = {
  id: number;
  title: string;
  minutes: number;
  category: TaskCategory;
};

export const taskCategories: TaskCategory[] = [
  "Reading",
  "Homework",
  "Routine",
  "Chore",
];

export const starterTasks: Task[] = [
  {
    id: 1,
    title: "Read for 20 minutes",
    minutes: 20,
    category: "Reading",
  },
  {
    id: 2,
    title: "Finish math worksheet",
    minutes: 25,
    category: "Homework",
  },
  {
    id: 3,
    title: "Pack backpack for tomorrow",
    minutes: 10,
    category: "Routine",
  },
];
