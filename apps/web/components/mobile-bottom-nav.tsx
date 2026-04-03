"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const mobileNavItems = [
  { href: "/", label: "Home" },
  { href: "/learn", label: "Learn" },
  { href: "/tools", label: "Tools" },
  { href: "/dashboard", label: "Library" },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-3 left-1/2 z-30 w-[calc(100%-24px)] -translate-x-1/2 md:hidden">
      <div className="glass grid grid-cols-4 rounded-[24px] px-2 py-2 shadow-card">
        {mobileNavItems.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-[18px] px-3 py-3 text-center text-xs font-semibold ${
                active ? "bg-ink text-white" : "text-slate-600"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
