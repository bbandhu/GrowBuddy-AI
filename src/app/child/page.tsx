import Link from "next/link";
import { TodayTaskList } from "./today-task-list";

export default function ChildDashboard() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-100 via-cyan-50 to-emerald-100 px-6 py-10 text-slate-950">
      <section className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="text-sm font-semibold text-emerald-800 hover:text-emerald-950"
        >
          ← Back home
        </Link>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="rounded-[2rem] bg-white p-8 shadow-sm ring-1 ring-black/5">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
              Child Dashboard
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Today’s plan, one small step at a time.
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-700">
              The child side should feel simple and encouraging. No clutter, no
              pressure — just the next clear thing to do.
            </p>
          </div>

          <aside className="rounded-[2rem] bg-emerald-800 p-8 text-white shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-100">
              Coach preview
            </p>
            <p className="mt-4 text-2xl font-semibold leading-9">
              “Let’s start with reading. Try just five pages first — tiny steps
              count.”
            </p>
          </aside>
        </div>

        <TodayTaskList />
      </section>
    </main>
  );
}
