import Link from "next/link";
import { ParentTaskCreator } from "./parent-task-creator";

const parentSteps = [
  {
    title: "Create today’s tasks",
    description:
      "Parents will add homework, reading, chores, and healthy routine items here.",
  },
  {
    title: "Review progress",
    description:
      "This area will show what the child finished, skipped, or needs help with.",
  },
  {
    title: "Coach oversight",
    description:
      "Later, parents can review AI coach messages and adjust safety settings.",
  },
];

export default function ParentDashboard() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-100 via-cyan-50 to-emerald-100 px-6 py-10 text-slate-950">
      <section className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="text-sm font-semibold text-emerald-800 hover:text-emerald-950"
        >
          ← Back home
        </Link>

        <div className="mt-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
            Parent Dashboard
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Set the structure, then let GrowBuddy help your child follow it.
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-700">
            The parent side is where trusted adults create the plan, review
            progress, and keep the AI coach inside safe boundaries.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {parentSteps.map((step) => (
            <article
              key={step.title}
              className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5"
            >
              <h2 className="text-lg font-semibold">{step.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {step.description}
              </p>
            </article>
          ))}
        </div>

        <ParentTaskCreator />
      </section>
    </main>
  );
}
