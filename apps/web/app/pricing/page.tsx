import { pricingPlans } from "@/content/site-content";
import Link from "next/link";

export default function PricingPage() {
  return (
    <main className="page-shell pb-16 pt-8">
      <section className="glass rounded-[34px] p-7 shadow-card md:p-10">
        <span className="eyebrow">Direct-to-consumer revenue</span>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-ink md:text-5xl">Simple pricing built for trust.</h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
          Free education for discovery, low-friction subscriptions for deeper learning, and optional digital products for
          targeted needs like debt organization or housing preparation.
        </p>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <article
              key={plan.name}
              className={`rounded-[30px] p-6 ${plan.featured ? "bg-ink text-white" : "bg-white/80 text-ink"}`}
            >
              <div className="text-sm font-semibold uppercase tracking-[0.18em] opacity-70">{plan.name}</div>
              <div className="mt-3 text-4xl font-semibold">{plan.price}</div>
              <p className={`mt-3 text-sm leading-7 ${plan.featured ? "text-white/80" : "text-slate-600"}`}>
                {plan.description}
              </p>
              <div className="mt-5 space-y-3 text-sm">
                {plan.features.map((feature) => (
                  <div key={feature}>{feature}</div>
                ))}
              </div>
              <button
                type="button"
                className={`mt-6 w-full rounded-full px-4 py-3 text-sm font-semibold ${
                  plan.featured ? "bg-white text-ink" : "bg-ink text-white"
                }`}
              >
                {plan.cta}
              </button>
            </article>
          ))}
        </div>
        <div className="mt-8 rounded-[28px] bg-white/80 p-6">
          <h2 className="text-xl font-semibold text-ink">Demo access toggles</h2>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600">
            Until Supabase auth and Stripe checkout are fully wired, these demo links let you preview free, plus, and premium states.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/api/demo/session?tier=free&redirect=/pricing" className="rounded-full bg-ink px-4 py-3 text-sm font-semibold text-white">
              Use free mode
            </Link>
            <Link href="/api/demo/session?tier=plus&redirect=/dashboard" className="rounded-full bg-white px-4 py-3 text-sm font-semibold text-ink">
              Preview plus
            </Link>
            <Link href="/api/demo/session?tier=premium&redirect=/dashboard" className="rounded-full bg-white px-4 py-3 text-sm font-semibold text-ink">
              Preview premium
            </Link>
            <Link href="/api/demo/session?tier=premium&admin=true&redirect=/admin/content" className="rounded-full bg-white px-4 py-3 text-sm font-semibold text-ink">
              Preview admin
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
