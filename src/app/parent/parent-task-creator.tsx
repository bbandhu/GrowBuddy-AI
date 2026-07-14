"use client";

import { FormEvent, useMemo, useState } from "react";
import { starterTasks, taskCategories, Task, TaskCategory } from "@/lib/tasks";

export function ParentTaskCreator() {
  const [tasks, setTasks] = useState<Task[]>(starterTasks);
  const [title, setTitle] = useState("");
  const [minutes, setMinutes] = useState("15");
  const [category, setCategory] = useState<TaskCategory>("Homework");

  const totalMinutes = useMemo(
    () => tasks.reduce((sum, task) => sum + task.minutes, 0),
    [tasks],
  );

  function addTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const cleanTitle = title.trim();
    const parsedMinutes = Number(minutes);

    if (!cleanTitle || Number.isNaN(parsedMinutes) || parsedMinutes <= 0) {
      return;
    }

    setTasks((currentTasks) => [
      ...currentTasks,
      {
        id: Date.now(),
        title: cleanTitle,
        minutes: parsedMinutes,
        category,
      },
    ]);

    setTitle("");
    setMinutes("15");
    setCategory("Homework");
  }

  function removeTask(taskId: number) {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId),
    );
  }

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <form
        onSubmit={addTask}
        className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
          Task creator
        </p>
        <h2 className="mt-3 text-2xl font-semibold">
          Add a task to today’s plan
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          This is local for now. The goal is to shape the parent workflow before
          we connect it to a database.
        </p>

        <label className="mt-6 block text-sm font-semibold text-slate-700">
          Task name
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Example: Practice spelling words"
            className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base font-normal outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
          />
        </label>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-semibold text-slate-700">
            Category
            <select
              value={category}
              onChange={(event) =>
                setCategory(event.target.value as TaskCategory)
              }
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base font-normal outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
            >
              {taskCategories.map((taskCategory) => (
                <option key={taskCategory}>{taskCategory}</option>
              ))}
            </select>
          </label>

          <label className="block text-sm font-semibold text-slate-700">
            Estimated minutes
            <input
              value={minutes}
              onChange={(event) => setMinutes(event.target.value)}
              type="number"
              min="1"
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base font-normal outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
            />
          </label>
        </div>

        <button
          type="submit"
          className="mt-6 w-full rounded-full bg-emerald-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800"
        >
          Add task
        </button>
      </form>

      <section className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Today’s preview
            </p>
            <h2 className="mt-3 text-2xl font-semibold">Planned tasks</h2>
          </div>

          <div className="rounded-2xl bg-sky-50 px-4 py-3 text-sm font-semibold text-slate-700">
            {tasks.length} tasks · {totalMinutes} min
          </div>
        </div>

        <div className="mt-5 grid gap-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex flex-col gap-4 rounded-2xl bg-sky-50 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium text-slate-800">{task.title}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-500 ring-1 ring-sky-100">
                    {task.category}
                  </span>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-500 ring-1 ring-sky-100">
                    {task.minutes} min
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => removeTask(task.id)}
                className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-600 ring-1 ring-slate-200 transition hover:bg-slate-50 hover:text-slate-950"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
