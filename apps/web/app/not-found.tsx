import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="page-shell pb-20 pt-8">
      <section className="glass rounded-[34px] p-8 shadow-card md:p-10">
        <span className="eyebrow">Not found</span>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-ink">This page is not available.</h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
          Try returning to the homepage or browse one of the learning hubs.
        </p>
        <div className="mt-6 flex gap-3">
          <Link href="/" className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white">
            Go home
          </Link>
          <Link href="/learn" className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink">
            Browse learning library
          </Link>
        </div>
      </section>
    </main>
  );
}
