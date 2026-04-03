import type { Article } from "@/lib/content";

export function AdminTable({ items }: { items: Article[] }) {
  return (
    <div className="overflow-hidden rounded-[24px] border border-[var(--line)] bg-white/90">
      <table className="min-w-full border-collapse text-left text-sm">
        <thead className="bg-slate-50 text-slate-500">
          <tr>
            <th className="px-4 py-3 font-medium">Title</th>
            <th className="px-4 py-3 font-medium">Category</th>
            <th className="px-4 py-3 font-medium">Tier</th>
            <th className="px-4 py-3 font-medium">Updated</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.slug} className="border-t border-slate-100">
              <td className="px-4 py-4 font-medium text-ink">{item.title}</td>
              <td className="px-4 py-4 text-slate-600">{item.categorySlug}</td>
              <td className="px-4 py-4 text-slate-600">{item.accessTier}</td>
              <td className="px-4 py-4 text-slate-600">{item.updatedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
