"use client";

import { Search, Bell } from "lucide-react";
import { useUser } from "@/lib/UserContext";

export default function TopBar() {
  const { user } = useUser();
  const displayName = user.firstName
    ? `${user.firstName} ${user.lastName || ""}`.trim().slice(0, 14) + "…"
    : "Temitope Ai…";

  return (
    <div className="h-14 border-b border-neutral-200 flex items-center px-6 bg-white">
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <Search size={16} strokeWidth={1.5} className="text-neutral-400" />
        <input
          placeholder="Find anything…"
          className="bg-transparent outline-none text-sm flex-1 font-sans placeholder-neutral-400"
        />
      </div>
      <div className="flex items-center gap-3">
        <button className="w-9 h-9 border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 smooth">
          <Bell size={15} strokeWidth={1.5} />
        </button>
        <div className="px-3 py-1.5 border border-neutral-300 text-sm font-sans">
          {displayName}
        </div>
      </div>
    </div>
  );
}
