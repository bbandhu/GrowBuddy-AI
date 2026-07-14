import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-br from-sky-100 via-cyan-50 to-emerald-100 px-6 py-10 text-slate-950">
      <section className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center gap-10">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">
            GrowBuddy AI
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            A gentle daily planner for confident young learners.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
            We are starting with the simplest useful loop: parents create tasks,
            children see today&apos;s plan, and one AI coach helps choose the
            next small step.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/parent"
              className="rounded-full bg-emerald-700 px-6 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-800"
            >
              Open Parent Dashboard
            </Link>
            <Link
              href="/child"
              className="rounded-full bg-white px-6 py-3 text-center text-sm font-semibold text-emerald-800 shadow-sm ring-1 ring-emerald-200 transition hover:bg-emerald-50"
            >
              Open Child Dashboard
            </Link>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="text-lg font-semibold">1. Plan</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Turn homework, reading, and routines into a clear daily list.
            </p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="text-lg font-semibold">2. Coach</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Help the child pick one manageable next action without overwhelm.
            </p>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5">
            <h2 className="text-lg font-semibold">3. Reflect</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Show progress to the child and give parents a simple review.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
