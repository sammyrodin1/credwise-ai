import { AdminTable } from "@/components/admin-table";
import { articles } from "@/lib/content";

export default function AdminContentPage() {
  return (
    <main className="page-shell pb-20 pt-8">
      <section className="glass rounded-[34px] p-7 shadow-card md:p-10">
        <span className="eyebrow">Admin content model</span>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-ink">Content operations</h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
          This is the first admin content view for managing educational articles, access tiers, and freshness updates.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          {[
            "Draft",
            "In review",
            "Published",
            "Needs refresh",
          ].map((status) => (
            <div key={status} className="rounded-[24px] bg-white/80 p-4 text-sm font-semibold text-ink">
              {status}
            </div>
          ))}
        </div>
        <div className="mt-8">
          <AdminTable items={articles} />
        </div>
      </section>
    </main>
  );
}
