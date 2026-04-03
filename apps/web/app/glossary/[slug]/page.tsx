import { notFound } from "next/navigation";

const glossaryTerms = [
  {
    slug: "credit-utilization",
    term: "Credit Utilization",
    definition: "The percentage of revolving credit you are currently using compared with your total available limit.",
    example: "If you have a $1,000 limit and a $200 balance, your utilization is 20%.",
  },
];

export default async function GlossaryTermPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const term = glossaryTerms.find((item) => item.slug === slug);

  if (!term) {
    notFound();
  }

  const glossaryTerm = term;

  return (
    <main className="page-shell pb-16 pt-8">
      <section className="glass prose-lite rounded-[34px] p-7 shadow-card md:p-10">
        <div className="eyebrow">Glossary</div>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-ink">{glossaryTerm.term}</h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">{glossaryTerm.definition}</p>
        <h2 className="mt-10 text-2xl font-semibold">Plain-language example</h2>
        <p>{glossaryTerm.example}</p>
      </section>
    </main>
  );
}
