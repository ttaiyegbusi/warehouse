"use client";

import { Paperclip } from "lucide-react";
import { INBOX } from "@/lib/mockData";

function InboxRow({ msg }) {
  return (
    <div className="row-hover grid grid-cols-[24px_220px_1fr_120px_80px] gap-4 items-center py-3 px-2 border-b border-neutral-100">
      <input
        type="checkbox"
        className="accent-black"
        onChange={(e) => e.stopPropagation()}
      />
      <div className="font-sans text-sm truncate">{msg.from}</div>
      <div className="font-sans text-sm text-neutral-700 truncate">{msg.subject}</div>
      <div className="flex items-center gap-2 justify-end">
        {msg.attach && (
          <span className="w-7 h-7 border border-neutral-200 flex items-center justify-center">
            <Paperclip size={12} strokeWidth={1.5} />
          </span>
        )}
        <span className="text-[11px] font-sans border border-neutral-200 px-2 py-1 bg-white">
          {msg.tag}
        </span>
      </div>
      <div className="font-mono text-xs text-neutral-400 text-right">8:03 AM</div>
    </div>
  );
}

export default function InboxPage() {
  return (
    <div className="px-10 py-8 max-w-6xl">
      <div className="flex justify-end">
        <button className="font-sans text-sm">Create New +</button>
      </div>
      {Object.entries(INBOX).map(([group, items]) => (
        <div key={group} className="mt-6">
          <div className="text-sm font-sans text-neutral-800 mb-2">{group}</div>
          <div>
            {items.map((m, i) => (
              <InboxRow key={i} msg={m} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
