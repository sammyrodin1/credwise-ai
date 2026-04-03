import { DashboardShell } from "@/components/dashboard-shell";
import { PremiumLock } from "@/components/premium-lock";
import { articles } from "@/lib/content";
import { getViewerSession } from "@/lib/access";

export default async function DashboardLibraryPage() {
  const viewer = await getViewerSession();

  return (
    <DashboardShell viewer={viewer} title="Your library">
      {viewer.isAuthenticated ? (
        <div className="grid gap-4 md:grid-cols-2">
          {articles.map((article) => (
            <div key={article.slug} className="rounded-[24px] bg-white/80 p-5">
              <div className="text-xs uppercase tracking-[0.18em] text-slate-500">{article.accessTier}</div>
              <h2 className="mt-2 text-xl font-semibold text-ink">{article.title}</h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">{article.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <PremiumLock requiredTier="plus" />
      )}
    </DashboardShell>
  );
}
