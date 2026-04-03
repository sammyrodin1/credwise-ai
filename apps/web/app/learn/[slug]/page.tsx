import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import { PremiumLock } from "@/components/premium-lock";
import { canAccessTier, getViewerSession } from "@/lib/access";
import { articles, getArticleBySlug } from "@/lib/content";
import { articleSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site-config";

export async function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {};
  }

  return {
    title: `${article.title} | CredWise AI`,
    description: article.description,
  };
}

export default async function LearnDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  const viewer = await getViewerSession();

  if (!article) {
    notFound();
  }

  const articleEntry = article;

  const hasAccess = canAccessTier(viewer.accessTier, articleEntry.accessTier);
  const visibleSections = hasAccess ? articleEntry.sections : articleEntry.sections.slice(0, 1);
  const breadcrumbItems = [
    { name: "Home", url: siteConfig.url },
    { name: "Learn", url: `${siteConfig.url}/learn` },
    { name: articleEntry.title, url: `${siteConfig.url}/learn/${articleEntry.slug}` },
  ];
  const schemaArticle = {
    slug: articleEntry.slug,
    title: articleEntry.title,
    summary: articleEntry.description,
    category: articleEntry.categorySlug,
    updatedAt: articleEntry.updatedAt,
    access: articleEntry.accessTier,
    faq: articleEntry.faqs,
  };

  return (
    <main className="page-shell pb-20 pt-8">
      <Script
        id={`article-schema-${article.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema(schemaArticle)) }}
      />
      <Script
        id={`faq-schema-${article.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(schemaArticle)) }}
      />
      <Script
        id={`breadcrumb-schema-${article.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema(breadcrumbItems)) }}
      />

      <article className="glass rounded-[34px] p-7 shadow-card md:p-10">
        <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.18em] text-slate-500">
          <span>{articleEntry.categorySlug}</span>
          <span>{articleEntry.accessTier}</span>
          <span>{articleEntry.readTime}</span>
          <span>Updated {articleEntry.updatedAt}</span>
        </div>
        <h1 className="mt-5 max-w-3xl text-4xl font-semibold tracking-tight text-ink">{articleEntry.title}</h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">{articleEntry.intro}</p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-8">
            {visibleSections.map((section) => (
              <section key={section.title} className="rounded-[28px] bg-white/80 p-6">
                <h2 className="text-2xl font-semibold text-ink">{section.title}</h2>
                <div className="mt-4 space-y-4">
                  {section.body.map((paragraph) => (
                    <p key={paragraph} className="text-sm leading-8 text-slate-700">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}

            {!hasAccess && articleEntry.accessTier !== "free" ? (
              <PremiumLock
                requiredTier={articleEntry.accessTier}
                description="This article includes a locked planning section, subscriber checklists, audio, and premium educational next steps."
              />
            ) : null}

            <section className="rounded-[28px] bg-white/80 p-6">
              <h2 className="text-2xl font-semibold text-ink">Frequently asked questions</h2>
              <div className="mt-5 space-y-4">
                {articleEntry.faqs.map((item) => (
                  <div key={item.question} className="rounded-[20px] border border-slate-100 p-4">
                    <h3 className="text-lg font-semibold text-ink">{item.question}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{item.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-4">
            <div className="rounded-[28px] bg-white/80 p-5">
              <div className="eyebrow">Checklist</div>
              <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
                {articleEntry.checklist.map((item) => (
                  <div key={item}>{item}</div>
                ))}
              </div>
            </div>
            <div className="rounded-[28px] bg-white/80 p-5">
              <div className="eyebrow">Next steps</div>
              <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
                {articleEntry.nextSteps.map((item) => (
                  <div key={item}>{item}</div>
                ))}
              </div>
            </div>
            <div className="rounded-[28px] bg-white/80 p-5">
              <div className="eyebrow">Glossary links</div>
              <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
                {articleEntry.glossaryTerms.map((item) => (
                  <div key={item}>{item}</div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </article>
    </main>
  );
}
