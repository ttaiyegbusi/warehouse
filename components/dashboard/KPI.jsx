export default function KPI({ amount, label }) {
  return (
    <div className="border border-neutral-200 p-5 flex-1">
      <div className="font-mono text-2xl">{amount}</div>
      <div className="mt-3 text-xs font-sans text-neutral-700">
        {label} <span className="text-neutral-300">ⓘ</span>
      </div>
      <div className="mt-1 text-[11px] font-mono text-neutral-400">vs $30,847.12 last period</div>
    </div>
  );
}
