const lessons = [
  "Credit scores in 5 minutes",
  "How debt payoff methods work",
  "Mortgage basics for beginners",
  "Newcomer banking setup",
];

export default function AudioPage() {
  return (
    <main className="page-shell pb-16 pt-8">
      <section className="glass rounded-[34px] p-7 shadow-card md:p-10">
        <span className="eyebrow">Listen Library</span>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-ink">Short audio lessons for mobile-first users</h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
          Use this route for subscriber audio feeds, transcripts, and listen-instead-of-read experiences across the
          product library.
        </p>
        <div className="mt-8 space-y-4">
          {lessons.map((lesson) => (
            <div key={lesson} className="rounded-[28px] bg-white/80 p-5">
              <div className="text-lg font-semibold text-ink">{lesson}</div>
              <p className="mt-2 text-sm leading-7 text-slate-600">AudioObject schema, transcript, and premium gating belong here.</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
