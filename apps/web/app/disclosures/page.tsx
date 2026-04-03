import { disclosures } from "@/content/site-content";

export default function DisclosuresPage() {
  return (
    <main className="page-shell pb-16 pt-8">
      <section className="glass prose-lite rounded-[34px] p-7 shadow-card md:p-10">
        <span className="eyebrow">Disclosures and notices</span>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-ink">Clear expectations for how the platform is positioned</h1>
        <div className="mt-6 space-y-4">
          {disclosures.map((disclosure) => (
            <p key={disclosure}>{disclosure}</p>
          ))}
        </div>
        <h2 className="mt-10 text-2xl font-semibold">Editorial standards</h2>
        <p>
          Content should show a published date, last reviewed date, source notes, and a neutral explanation of risks,
          limitations, and official-source verification steps where appropriate.
        </p>
        <h2 className="mt-10 text-2xl font-semibold">Affiliate disclosure placeholder</h2>
        <p>
          If affiliate links are added later, they should be clearly labeled and separated from editorial rankings,
          recommendations, or implied endorsements.
        </p>
      </section>
    </main>
  );
}
