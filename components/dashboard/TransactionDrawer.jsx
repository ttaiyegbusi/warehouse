"use client";

import { useEffect, useState } from "react";
import { X, RotateCw, Share2 } from "lucide-react";

function DetailRow({ label, value, mono }) {
  return (
    <div className="py-4 border-b border-neutral-200">
      <div className="text-[10px] tracking-widest uppercase text-neutral-400 font-sans">{label}</div>
      <div className={`mt-2 text-sm ${mono ? "font-mono" : "font-sans"}`}>{value}</div>
    </div>
  );
}

export default function TransactionDrawer({ txn, onClose }) {
  const [closing, setClosing] = useState(false);

  const handleClose = () => {
    setClosing(true);
    setTimeout(onClose, 250);
  };

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && handleClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex">
      <div
        className={`flex-1 bg-black/10 ${closing ? "" : "fade-in"}`}
        onClick={handleClose}
        style={closing ? { opacity: 0, transition: "opacity 250ms ease" } : {}}
      />
      <div
        className={`w-[420px] bg-white border-l border-neutral-200 flex flex-col ${
          closing ? "drawer-exit" : "drawer-enter"
        }`}
      >
        <div className="flex items-center justify-between px-6 h-14 border-b border-neutral-200">
          <div className="font-sans">Transaction Details</div>
          <button onClick={handleClose} className="text-neutral-500 hover:text-black smooth">
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>

        <div className="px-6 py-6 flex-1 overflow-auto">
          <div className="font-mono text-3xl">-$2,700.34</div>

          <div className="mt-6 text-[10px] tracking-widest uppercase text-neutral-400 font-sans border-b border-neutral-200 pb-2">
            Details
          </div>

          <DetailRow label="Payment Method" value="Money Transfer" />
          <DetailRow label="Transaction ID" value={txn.id} mono />
          <DetailRow label="Date & Time" value="Sep 28, 2023 at 18:23" />
          <DetailRow label="Fee" value="$0.48" mono />
          <DetailRow
            label="Bank Description"
            value={
              <>
                APEXLLC_V84G2H16D <span className="mx-1">•</span> REF #84664
              </>
            }
            mono
          />
        </div>

        <div className="px-6 py-4 border-t border-neutral-200 flex gap-3">
          <button className="flex-1 border border-neutral-300 py-2.5 font-sans text-sm flex items-center justify-center gap-2 hover:bg-neutral-50 smooth">
            <RotateCw size={14} strokeWidth={1.5} /> Repeat
          </button>
          <button className="flex-1 border border-neutral-300 py-2.5 font-sans text-sm flex items-center justify-center gap-2 hover:bg-neutral-50 smooth">
            <Share2 size={14} strokeWidth={1.5} /> Share
          </button>
        </div>
      </div>
    </div>
  );
}
