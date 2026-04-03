import Link from "next/link";
import type { ProblemBlock } from "@/lib/types";

export function ProblemCard({ block }: { block: ProblemBlock }) {
  return (
    <Link
      href={block.href}
      className="group glass flex h-full flex-col rounded-[30px] p-5 shadow-card transition duration-300 hover:-translate-y-1"
    >
      <span className="eyebrow mb-4 w-fit">{block.label}</span>
      <h3 className="text-xl font-semibold tracking-tight text-ink">{block.title}</h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{block.description}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {block.bullets.map((bullet) => (
          <span
            key={bullet}
            className="rounded-full bg-[rgba(31,77,61,0.08)] px-3 py-1 text-xs font-medium text-[var(--accent)]"
          >
            {bullet}
          </span>
        ))}
      </div>
      <span className="mt-auto pt-6 text-sm font-semibold text-ink">Open this path</span>
    </Link>
  );
}
