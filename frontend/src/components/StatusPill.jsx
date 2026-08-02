export function StatusPill({ label, tone = 'emerald' }) {
  const tones = {
    emerald: 'bg-emerald-50 text-emerald-800 ring-emerald-200',
    lagoon: 'bg-cyan-50 text-cyan-900 ring-cyan-200',
    amber: 'bg-amber-50 text-amber-900 ring-amber-200',
  };

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ${tones[tone] || tones.emerald}`}>
      {label}
    </span>
  );
}