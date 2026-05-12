"use client";

import { useEffect, useRef, useState } from "react";
import { Search, Bell, Menu } from "lucide-react";
import { useUser } from "@/lib/UserContext";
import NotificationsPopover from "./NotificationsPopover";
import SearchModal from "./SearchModal";

export default function TopBar({ onOpenMobileNav }) {
  const { user } = useUser();
  const [notifOpen, setNotifOpen]   = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const bellRef = useRef(null);

  // Cmd/Ctrl+K to open search globally
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const displayName = user.firstName
    ? `${user.firstName} ${user.lastName || ""}`.trim().slice(0, 14) + "…"
    : "Temitope Ai…";

  return (
    <>
      <div className="relative h-14 border-b border-neutral-200 flex items-center px-4 sm:px-6 bg-white shrink-0">
        {/* Mobile hamburger */}
        <button
          onClick={onOpenMobileNav}
          className="md:hidden w-9 h-9 -ml-2 mr-1 flex items-center justify-center text-neutral-700 hover:bg-neutral-50 smooth shrink-0"
          aria-label="Open menu"
        >
          <Menu size={18} strokeWidth={1.5} />
        </button>

        {/* Search — pinned far left */}
        <button
          onClick={() => setSearchOpen(true)}
          className="flex items-center gap-3 text-left h-9 shrink-0"
        >
          <Search size={16} strokeWidth={1.5} className="text-neutral-400 shrink-0" />
          <span className="text-sm font-sans text-neutral-400 whitespace-nowrap">
            Find anything…
          </span>
          <kbd className="hidden sm:inline-block font-mono text-[10px] text-neutral-400 border border-neutral-200 px-1.5 py-0.5">
            ⌘K
          </kbd>
        </button>

        {/* Elastic spacer pushes the right cluster to the edge */}
        <div className="flex-1" />

        {/* Right cluster — pinned far right */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            ref={bellRef}
            onClick={() => setNotifOpen((o) => !o)}
            className={`w-9 h-9 border border-neutral-200 flex items-center justify-center smooth ${
              notifOpen ? "bg-neutral-100" : "hover:bg-neutral-50"
            }`}
            aria-label="Notifications"
          >
            <Bell size={15} strokeWidth={1.5} />
          </button>
          <div className="px-3 py-1.5 border border-neutral-300 text-sm font-sans whitespace-nowrap">
            {displayName}
          </div>
        </div>

        <NotificationsPopover
          open={notifOpen}
          onClose={() => setNotifOpen(false)}
          anchorRef={bellRef}
        />
      </div>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
