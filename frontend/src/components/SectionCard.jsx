export function SectionCard({ eyebrow, title, description, accent = 'from-lagoon-700 to-lagoon-500', children }) {
  return (
    <section className="overflow-hidden rounded-3xl border border-white/60 bg-white/75 shadow-glow backdrop-blur-xl">
      <div className={`h-1 w-full bg-gradient-to-r ${accent}`} />
      <div className="p-6 md:p-8">
        {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.28em] text-lagoon-800/70">{eyebrow}</p> : null}
        <h3 className="mt-2 text-2xl font-semibold text-slate-900">{title}</h3>
        <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
        <div className="mt-6">{children}</div>
      </div>
    </section>
  );
}