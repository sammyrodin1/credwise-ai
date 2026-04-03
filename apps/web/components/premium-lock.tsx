import Link from "next/link";

export function PremiumLock({
  requiredTier,
  title = "Subscriber content",
  description,
}: {
  requiredTier: "plus" | "premium";
  title?: string;
  description?: string;
}) {
  return (
    <div className="rounded-[28px] border border-[var(--line)] bg-[var(--warm)] p-6">
      <div className="eyebrow">{requiredTier === "premium" ? "Premium" : "Plus"}</div>
      <h3 className="mt-4 text-2xl font-semibold text-ink">{title}</h3>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-700">
        {description ??
          "Unlock the full guide, audio version, downloadable worksheet, and guided next-step tools with a subscriber plan."}
      </p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <Link href="/pricing" className="rounded-full bg-ink px-5 py-3 text-center text-sm font-semibold text-white">
          View subscriber plans
        </Link>
        <Link
          href="/dashboard"
          className="rounded-full border border-[var(--line)] bg-white px-5 py-3 text-center text-sm font-semibold text-ink"
        >
          Go to dashboard
        </Link>
      </div>
      <p className="mt-4 text-xs leading-6 text-slate-500">
        The platform provides educational content only and does not offer individualized financial advice or guaranteed outcomes.
      </p>
    </div>
  );
}
