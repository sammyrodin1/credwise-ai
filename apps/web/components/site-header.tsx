import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function SiteHeader() {
  return (
    <header className="page-shell sticky top-3 z-20 pt-3">
      <div className="glass flex items-center justify-between rounded-[28px] px-4 py-3 shadow-card md:px-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-ink text-sm font-bold text-white">
            CW
          </div>
          <div>
            <div className="text-sm font-semibold tracking-wide text-ink">{siteConfig.name}</div>
            <div className="text-xs text-slate-500">Financial Literacy OS</div>
          </div>
        </Link>
        <nav className="hidden items-center gap-5 text-sm text-slate-700 md:flex">
          {siteConfig.nav.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-ink">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Link href="/dashboard" className="text-sm font-semibold text-slate-600">
            Dashboard
          </Link>
          <Link
            href="/pricing"
            className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
          >
            View Plans
          </Link>
        </div>
      </div>
    </header>
  );
}
