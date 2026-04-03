import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/article-card";
import { categories, getArticlesByCategory, getCategoryBySlug } from "@/lib/content";

export async function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return {};
  }

  return {
    title: `${category.title} | CredWise AI`,
    description: category.description,
  };
}

export default async function CategoryHubPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const categoryEntry = category;
  const categoryArticles = getArticlesByCategory(categoryEntry.slug);

  return (
    <main className="page-shell pb-20 pt-8">
      <section className="glass rounded-[34px] p-7 shadow-card md:p-10">
        <span className="eyebrow">{categoryEntry.shortTitle}</span>
        <div className="mt-5 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight text-ink md:text-5xl">{categoryEntry.heroTitle}</h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">{categoryEntry.heroSummary}</p>
            <p className="mt-4 text-sm uppercase tracking-[0.16em] text-slate-500">{categoryEntry.audience}</p>
          </div>
          <div className="rounded-[28px] bg-white/80 p-5">
            <div className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Premium unlocks</div>
            <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
              {categoryEntry.premiumBullets.map((item) => (
                <div key={item}>{item}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-[320px_1fr]">
        <aside className="glass rounded-[30px] p-6 shadow-card">
          <div className="eyebrow">Included topics</div>
          <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
            {categoryEntry.featureBullets.map((item) => (
              <div key={item}>{item}</div>
            ))}
          </div>
        </aside>
        <div className="glass rounded-[30px] p-6 shadow-card">
          <div className="eyebrow">Articles</div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {categoryArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
