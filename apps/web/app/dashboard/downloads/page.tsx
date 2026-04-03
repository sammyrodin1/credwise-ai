import { DashboardShell } from "@/components/dashboard-shell";
import { PremiumLock } from "@/components/premium-lock";
import { getViewerSession } from "@/lib/access";

const downloads = [
  "Debt organization worksheet",
  "Housing prep checklist",
  "Newcomer setup guide",
];

export default async function DashboardDownloadsPage() {
  const viewer = await getViewerSession();

  return (
    <DashboardShell viewer={viewer} title="Downloads">
      {viewer.accessTier === "premium" ? (
        <div className="space-y-4">
          {downloads.map((item) => (
            <div key={item} className="rounded-[24px] bg-white/80 p-5 text-sm leading-7 text-slate-700">
              {item}
            </div>
          ))}
        </div>
      ) : (
        <PremiumLock requiredTier="premium" title="Premium downloads are locked" />
      )}
    </DashboardShell>
  );
}
