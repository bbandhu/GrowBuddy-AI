"use client";

import { useMemo, useState } from "react";
import { starterTasks } from "@/lib/tasks";

function getCoachMessage(doneCount: number, totalCount: number) {
  if (doneCount === 0) {
    return "Pick one task to begin. Tiny starts count — even two minutes is progress.";
  }

  if (doneCount === totalCount) {
    return "You finished today’s plan. Great work showing up and completing each step.";
  }

  const remainingCount = totalCount - doneCount;

  return `Nice momentum. ${remainingCount} ${remainingCount === 1 ? "task" : "tasks"} left — choose the easiest next one.`;
}

export function TodayTaskList() {
  const [completedTaskIds, setCompletedTaskIds] = useState<number[]>([]);

  const completedCount = completedTaskIds.length;
  const progressPercentage = Math.round(
    (completedCount / starterTasks.length) * 100,
  );

  const coachMessage = useMemo(
    () => getCoachMessage(completedCount, starterTasks.length),
    [completedCount],
  );

  function toggleTask(taskId: number) {
    setCompletedTaskIds((currentIds) =>
      currentIds.includes(taskId)
        ? currentIds.filter((id) => id !== taskId)
        : [...currentIds, taskId],
    );
  }

  return (
    <div className="mt-8 rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-black/5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Today’s tasks</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Tap “Mark done” when a task is finished. For now this is saved only
            in the browser while the page is open.
          </p>
        </div>

        <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">
          {completedCount} of {starterTasks.length} done
        </div>
      </div>

      <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-emerald-500 transition-all"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      <div className="mt-5 rounded-2xl bg-sky-50 p-4 text-sm leading-6 text-slate-700">
        <span className="font-semibold text-slate-950">Coach says:</span>{" "}
        {coachMessage}
      </div>

      <div className="mt-5 grid gap-3">
        {starterTasks.map((task) => {
          const isCompleted = completedTaskIds.includes(task.id);

          return (
            <div
              key={task.id}
              className={`flex flex-col gap-4 rounded-2xl p-4 transition sm:flex-row sm:items-center sm:justify-between ${
                isCompleted ? "bg-emerald-50" : "bg-sky-50"
              }`}
            >
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`font-medium ${
                      isCompleted
                        ? "text-slate-500 line-through"
                        : "text-slate-800"
                    }`}
                  >
                    {task.title}
                  </span>
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
                onClick={() => toggleTask(task.id)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isCompleted
                    ? "bg-white text-emerald-800 ring-1 ring-emerald-200 hover:bg-emerald-100"
                    : "bg-emerald-700 text-white hover:bg-emerald-800"
                }`}
              >
                {isCompleted ? "Undo" : "Mark done"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
