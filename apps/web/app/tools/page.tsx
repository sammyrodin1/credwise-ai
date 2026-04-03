const tools = [
  "Utilization estimator",
  "Starter budget planner",
  "Debt organization worksheet",
  "Housing prep checklist",
  "First-year-in-America roadmap",
];

export default function ToolsPage() {
  return (
    <main className="page-shell pb-16 pt-8">
      <section className="glass rounded-[34px] p-7 shadow-card md:p-10">
        <span className="eyebrow">Planning Studio</span>
        <h1 className="mt-5 text-4xl font-semibold tracking-tight text-ink">Educational tools and planners</h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
          This route should become the premium tools hub, with calculators clearly framed as scenario-planning and
          educational aids rather than personalized recommendations.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {tools.map((tool) => (
            <div key={tool} className="rounded-[28px] bg-white/80 p-5 text-sm leading-7 text-slate-700">
              {tool}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
