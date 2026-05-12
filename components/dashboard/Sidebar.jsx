"use client";

import {
  Home,
  ArrowLeftRight,
  Wallet,
  Mail,
  Calendar as CalendarIcon,
  FileText,
  Settings,
  PanelLeft,
  X,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

// Order requested: Home → Transactions → Wallet → Inbox → Calendar → Docs → Settings
const items = [
  { key: "/home",         label: "Home",         icon: Home },
  { key: "/transactions", label: "Transactions", icon: ArrowLeftRight },
  { key: "/wallet",       label: "Wallet",       icon: Wallet },
  { key: "/inbox",        label: "Inbox",        icon: Mail },
  { key: "/calendar",     label: "Calendar",     icon: CalendarIcon },
  { key: "/docs",         label: "Docs",         icon: FileText },
  { key: "/settings",     label: "Settings",     icon: Settings },
];

export default function Sidebar({
  mobileOpen,
  setMobileOpen,
  collapsed,
  setCollapsed,
}) {
  const pathname = usePathname();
  const router = useRouter();

  const go = (k) => {
    router.push(k);
    setMobileOpen(false);
  };

  // Shared inner nav
  const NavList = ({ showLabels }) => (
    <nav className="flex-1 py-2 flex flex-col">
      {items.map((it) => {
        const Icon = it.icon;
        const active = pathname === it.key;
        return (
          <button
            key={it.key}
            onClick={() => go(it.key)}
            title={!showLabels ? it.label : undefined}
            className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm smooth text-left ${
              active ? "bg-white text-black" : "text-neutral-700 hover:bg-neutral-100"
            } ${!showLabels ? "justify-center" : ""}`}
            style={{ borderLeft: active ? "2px solid #000" : "2px solid transparent" }}
          >
            <Icon size={18} strokeWidth={1.5} />
            {showLabels && <span className="font-sans">{it.label}</span>}
          </button>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Mobile drawer (shown < md). Hamburger lives in TopBar. */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 md:hidden fade-in"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <aside
        className={`fixed md:hidden inset-y-0 left-0 z-50 w-64 bg-neutral-50 border-r border-neutral-200 flex flex-col transform smooth ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-14 flex items-center justify-between px-3 border-b border-neutral-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black flex items-center justify-center">
              <span className="text-white font-sans font-bold text-base leading-none">W</span>
            </div>
            <span className="font-sans text-base">Warehouse</span>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="text-neutral-500 hover:text-black smooth p-1"
          >
            <X size={16} strokeWidth={1.5} />
          </button>
        </div>
        <NavList showLabels />
      </aside>

      {/* Desktop sidebar (shown >= md). Collapsible. */}
      <aside
        className={`hidden md:flex shrink-0 bg-neutral-50 border-r border-neutral-200 flex-col smooth ${
          collapsed ? "w-16" : "w-56"
        }`}
      >
        <div className={`h-14 flex items-center border-b border-neutral-200 ${
          collapsed ? "justify-center px-2" : "justify-between px-3"
        }`}>
          {!collapsed && (
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="w-8 h-8 bg-black flex items-center justify-center shrink-0">
                <span className="text-white font-sans font-bold text-base leading-none">W</span>
              </div>
              <span className="font-sans text-base whitespace-nowrap">Warehouse</span>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-neutral-500 hover:text-black smooth p-1"
            title={collapsed ? "Expand" : "Collapse"}
          >
            <PanelLeft size={16} strokeWidth={1.5} />
          </button>
        </div>
        <NavList showLabels={!collapsed} />
      </aside>
    </>
  );
}
