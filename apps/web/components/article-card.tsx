import Link from "next/link";
import type { Article } from "@/lib/content";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link href={`/learn/${article.slug}`} className="rounded-[28px] bg-white/80 p-5 transition hover:-translate-y-1">
      <div className="flex items-center justify-between gap-3 text-xs uppercase tracking-[0.18em] text-slate-500">
        <span>{article.accessTier}</span>
        <span>{article.readTime}</span>
      </div>
      <h3 className="mt-3 text-xl font-semibold text-ink">{article.title}</h3>
      <p className="mt-2 text-sm leading-7 text-slate-600">{article.description}</p>
      <p className="mt-4 text-xs text-slate-500">Updated {article.updatedAt}</p>
    </Link>
  );
}
