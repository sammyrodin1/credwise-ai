import Link from "next/link";
import { DashboardShell } from "@/components/dashboard-shell";
import { PremiumLock } from "@/components/premium-lock";
import { getViewerSession } from "@/lib/access";

export default async function DashboardPage() {
  const viewer = await getViewerSession();

  return (
    <DashboardShell viewer={viewer} title="Subscriber dashboard">
      {viewer.isAuthenticated ? (
        <div className="space-y-4">
          <div className="rounded-[24px] bg-white/80 p-5">
            <h2 className="text-xl font-semibold text-ink">Your learning system</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              This dashboard is ready for saved articles, learning paths, audio progress, and Stripe-backed subscription status.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              "Continue your debt planning path",
              "Open premium downloads",
              "Listen to your audio queue",
              "Review recently updated guides",
            ].map((item) => (
              <div key={item} className="rounded-[24px] bg-white/80 p-5 text-sm leading-7 text-slate-700">
                {item}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          <PremiumLock requiredTier="plus" title="Sign in to access your library" />
          <Link href="/pricing" className="inline-flex rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white">
            See plans
          </Link>
        </div>
      )}
    </DashboardShell>
  );
}
