import Link from "next/link";
import type { ViewerSession } from "@/lib/access";

const dashboardLinks = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/library", label: "Library" },
  { href: "/dashboard/downloads", label: "Downloads" },
];

export function DashboardShell({
  viewer,
  title,
  children,
}: Readonly<{
  viewer: ViewerSession;
  title: string;
  children: React.ReactNode;
}>) {
  return (
    <main className="page-shell pb-20 pt-8">
      <div className="grid gap-4 lg:grid-cols-[260px_1fr]">
        <aside className="glass rounded-[30px] p-5 shadow-card">
          <div className="rounded-[24px] bg-white/80 p-4">
            <div className="text-sm font-semibold text-ink">{viewer.email ?? "Guest viewer"}</div>
            <p className="mt-2 text-sm leading-6 text-slate-600">Tier: {viewer.accessTier}</p>
          </div>
          <nav className="mt-4 space-y-2">
            {dashboardLinks.map((item) => (
              <Link key={item.href} href={item.href} className="block rounded-[18px] px-4 py-3 text-sm text-slate-700 hover:bg-white/80">
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        <section className="glass rounded-[30px] p-6 shadow-card md:p-8">
          <h1 className="text-3xl font-semibold tracking-tight text-ink">{title}</h1>
          <div className="mt-6">{children}</div>
        </section>
      </div>
    </main>
  );
}
