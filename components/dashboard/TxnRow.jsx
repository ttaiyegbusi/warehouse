"use client";

import { ArrowDownToLine, Home as HomeIcon, ChevronRight } from "lucide-react";

export default function TxnRow({ txn, onClick }) {
  return (
    <div className="row-hover flex items-center px-2 py-4 border-b border-neutral-100" onClick={onClick}>
      <div className="w-10 flex items-center justify-center text-neutral-500">
        {txn.icon === "download" ? (
          <ArrowDownToLine size={18} strokeWidth={1.25} />
        ) : (
          <HomeIcon size={18} strokeWidth={1.25} />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-sans text-sm text-black">{txn.type}</div>
        <div className="font-sans text-xs text-neutral-400 mt-1">
          {txn.name} <span className="mx-1">•</span>{" "}
          <span className="font-mono">{txn.amount}</span>{" "}
          <span className="mx-1">•</span> {txn.date}
        </div>
      </div>
      <ChevronRight size={16} strokeWidth={1.25} className="text-neutral-300" />
    </div>
  );
}
