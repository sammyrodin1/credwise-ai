import Link from "next/link";
import { ArticleCard } from "@/components/article-card";
import { categories, articles } from "@/lib/content";

const featuredCategorySlugs = ["credit-basics", "debt-help", "home-housing", "new-to-america"];

export default function HomePage() {
  const featuredCategories = categories.filter((category) => featuredCategorySlugs.includes(category.slug));
  const featuredArticles = articles.slice(0, 3);

  return (
    <main className="pb-20 pt-6">
      <section className="page-shell">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="glass rounded-[34px] p-7 shadow-card md:p-10">
            <span className="eyebrow">Educational only • Mobile-first • U.S. focused</span>
            <h1 className="mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-ink md:text-6xl">
              Learn money systems. Plan with clarity.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
              CredWise AI helps people understand credit, debt, housing, student loans, and everyday banking through
              educational guides, premium tools, and subscriber audio lessons.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/learn"
                className="rounded-full bg-ink px-5 py-3 text-center text-sm font-semibold text-white"
              >
                Start Learning Free
              </Link>
              <Link
                href="/pricing"
                className="rounded-full border border-[var(--line)] bg-white px-5 py-3 text-center text-sm font-semibold text-ink"
              >
                Unlock Premium
              </Link>
            </div>
            <div className="mt-10 grid gap-3 text-sm text-slate-600 md:grid-cols-3">
              <div className="rounded-3xl bg-white/80 p-4">
                <div className="font-semibold text-ink">Structured learning</div>
                <p className="mt-2">Category hubs, FAQ blocks, glossaries, and guided next steps.</p>
              </div>
              <div className="rounded-3xl bg-white/80 p-4">
                <div className="font-semibold text-ink">Premium subscriber layer</div>
                <p className="mt-2">Audio, worksheets, and locked educational planning resources.</p>
              </div>
              <div className="rounded-3xl bg-white/80 p-4">
                <div className="font-semibold text-ink">Trust-first positioning</div>
                <p className="mt-2">Freshness dates, legal-safe language, and neutral explanations.</p>
              </div>
            </div>
          </div>
          <aside className="glass rounded-[34px] p-6 shadow-card md:p-8">
            <div className="eyebrow">Problem blocks</div>
            <div className="mt-5 space-y-4">
              {featuredCategories.map((category) => (
                <Link key={category.slug} href={`/learn/category/${category.slug}`} className="block rounded-3xl bg-white/80 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-ink text-xs font-bold text-white">
                      {category.icon}
                    </div>
                    <div className="font-semibold text-ink">{category.heroTitle}</div>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{category.description}</p>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="page-shell mt-8">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <span className="eyebrow">Category hubs</span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink">Browse by real-life need</h2>
          </div>
          <Link href="/learn" className="text-sm font-semibold text-ink">
            Open library
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <Link key={category.slug} href={`/learn/category/${category.slug}`} className="glass rounded-[30px] p-6 shadow-card">
              <div className="eyebrow">{category.shortTitle}</div>
              <h3 className="mt-4 text-2xl font-semibold text-ink">{category.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{category.description}</p>
              <p className="mt-4 text-xs uppercase tracking-[0.16em] text-slate-500">{category.audience}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="page-shell mt-8 grid gap-4 lg:grid-cols-[1fr_0.95fr]">
        <div className="glass rounded-[34px] p-7 shadow-card md:p-8">
          <span className="eyebrow">Featured guides</span>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {featuredArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
        <div className="glass rounded-[34px] p-7 shadow-card md:p-8">
          <span className="eyebrow">Subscriber value</span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-ink">What paying members unlock</h2>
          <div className="mt-5 space-y-4">
            {[
              "Premium next-step sections inside key articles",
              "Audio library for on-the-go learning",
              "Worksheets, checklists, and planners",
              "Subscriber dashboard with saved learning paths",
            ].map((item) => (
              <div key={item} className="rounded-[24px] bg-white/80 p-4 text-sm leading-7 text-slate-700">
                {item}
              </div>
            ))}
          </div>
          <Link href="/pricing" className="mt-6 inline-flex rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white">
            Compare plans
          </Link>
        </div>
      </section>
    </main>
  );
}
