import Link from "next/link";
import { disclosures } from "@/content/site-content";

export function Footer() {
  return (
    <footer className="page-shell pb-10 pt-14">
      <div className="glass rounded-[32px] p-6 shadow-card md:p-8">
        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className="text-xl font-semibold text-ink">Professional, cautious, and educational by design.</h2>
            <div className="mt-4 space-y-3 text-sm leading-7 text-slate-600">
              {disclosures.map((disclosure) => (
                <p key={disclosure}>{disclosure}</p>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm text-slate-600">
            <Link href="/disclosures">Disclosures</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/editorial-policy">Editorial Policy</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/admin">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
