export default function BalanceCard({ flag, code, whole, decimal }) {
  return (
    <div className="border border-neutral-200 p-5 flex-1 min-w-0">
      <div className="w-7 h-5 mb-4 text-xl leading-none">{flag}</div>
      <div className="text-xs text-neutral-500 font-sans tracking-wide">{code}</div>
      <div className="mt-2 font-mono text-2xl">
        <span className="text-black">{whole}</span>
        <span className="text-neutral-300">{decimal}</span>
      </div>
    </div>
  );
}
