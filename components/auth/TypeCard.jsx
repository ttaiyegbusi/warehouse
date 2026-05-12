import { Check, Zap } from "lucide-react";

export default function TypeCard({ active, onClick, icon, title, badge, desc }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left border p-5 smooth ${
        active ? "border-black" : "border-neutral-200 hover:border-neutral-400"
      }`}
    >
      <div className="flex justify-between items-start">
        <div className="text-neutral-700">{icon}</div>
        <div
          className={`w-5 h-5 rounded-full flex items-center justify-center smooth ${
            active ? "bg-black text-white" : "bg-neutral-200 text-neutral-200"
          }`}
        >
          <Check size={12} strokeWidth={3} />
        </div>
      </div>
      <div className="mt-8 flex items-center gap-2">
        <span className="font-sans text-base font-medium">{title}</span>
        {badge && (
          <span className="inline-flex items-center gap-1 bg-emerald-500 text-white text-[10px] font-sans px-1.5 py-0.5">
            <Zap size={10} strokeWidth={2.5} /> {badge}
          </span>
        )}
      </div>
      <div className="text-sm text-neutral-500 mt-2 font-sans">{desc}</div>
    </button>
  );
}
