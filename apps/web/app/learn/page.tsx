import Link from "next/link";
import { ArticleCard } from "@/components/article-card";
import { categories, articles } from "@/lib/content";

export default function LearnIndexPage() {
  return (
    <main className="page-shell pb-20 pt-8">
      <section className="glass rounded-[34px] p-7 shadow-card md:p-10">
        <span className="eyebrow">Knowledge library</span>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-ink">Browse the education library</h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
          The library is organized into category hubs, schema-ready article pages, and subscriber-only educational resources.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <Link key={category.slug} href={`/learn/category/${category.slug}`} className="rounded-[28px] bg-white/80 p-5">
              <div className="eyebrow">{category.shortTitle}</div>
              <h2 className="mt-3 text-xl font-semibold text-ink">{category.title}</h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">{category.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-6 glass rounded-[34px] p-7 shadow-card md:p-10">
        <span className="eyebrow">Latest guides</span>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>
    </main>
  );
}
