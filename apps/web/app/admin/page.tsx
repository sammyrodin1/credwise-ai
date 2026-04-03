import Link from "next/link";

const adminCards = [
  "Content queue with review status and freshness flags",
  "Audio upload manager with transcript support",
  "Category and tag editor for topic clusters",
  "Premium gating controls for sections, audio, and downloads",
  "Version history with change notes",
];

export default function AdminPage() {
  return (
    <main className="page-shell pb-16 pt-8">
      <section className="glass rounded-[34px] p-7 shadow-card md:p-10">
        <span className="eyebrow">Admin scaffold</span>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-ink">Editorial operations dashboard</h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
          This starter route shows the intended admin surface for content operations. In production, protect it with
          role-based auth and wire these modules to Supabase tables and storage.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {adminCards.map((card) => (
            <div key={card} className="rounded-[28px] bg-white/80 p-5 text-sm leading-7 text-slate-700">
              {card}
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Link href="/admin/content" className="inline-flex rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white">
            Open content admin
          </Link>
        </div>
      </section>
    </main>
  );
}
