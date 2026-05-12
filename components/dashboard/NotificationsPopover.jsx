"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { NOTIFICATIONS } from "@/lib/mockData";

export default function NotificationsPopover({ open, onClose, anchorRef }) {
  const popRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const onDocClick = (e) => {
      if (popRef.current?.contains(e.target)) return;
      if (anchorRef?.current?.contains(e.target)) return; // bell handles its own toggle
      onClose();
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open, onClose, anchorRef]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={popRef}
      className="fade-in absolute right-2 sm:right-4 top-[52px] z-50 w-[92vw] sm:w-[380px] max-h-[70vh] bg-white border border-neutral-200 shadow-xl flex flex-col"
    >
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="font-sans text-base">Notifications</div>
        <button
          onClick={onClose}
          className="text-neutral-500 hover:text-black smooth"
          aria-label="Close notifications"
        >
          <X size={16} strokeWidth={1.5} />
        </button>
      </div>

      <div className="flex items-center gap-2 px-5 pt-3 pb-3 border-b border-neutral-200">
        <button className="px-3 py-1 text-sm font-sans border border-neutral-200 bg-neutral-100">
          All
        </button>
        <button className="px-3 py-1 text-sm font-sans border border-neutral-200 hover:bg-neutral-50 smooth">
          Unread <span className="text-neutral-500 ml-1">[ 100 ]</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4">
        {Object.entries(NOTIFICATIONS).map(([group, items]) => (
          <div key={group} className="mb-5 last:mb-0">
            <div className="text-xs font-sans text-neutral-500 mb-2">{group}</div>
            <div className="space-y-4">
              {items.map((n) => (
                <div key={n.id} className="flex gap-3">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-medium shrink-0 ${n.color}`}
                  >
                    {n.initial}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-2">
                      <div className="font-sans text-sm">{n.name}</div>
                      <div className="font-mono text-[10px] text-neutral-400 shrink-0">
                        {n.time}
                      </div>
                    </div>
                    <div className="font-sans text-xs text-neutral-500 mt-0.5">
                      {n.action} <span className="mx-1">•</span> {n.context}
                    </div>
                    <div className="font-sans text-xs text-neutral-700 mt-1.5 leading-snug">
                      {n.body}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
