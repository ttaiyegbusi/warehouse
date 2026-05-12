"use client";

import { Home, ArrowLeftRight, Wallet, Mail, FileText, Settings, PanelLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const items = [
  { key: "/home",         label: "Home",         icon: Home },
  { key: "/transactions", label: "Transactions", icon: ArrowLeftRight },
  { key: "/wallet",       label: "Wallet",       icon: Wallet },
  { key: "/inbox",        label: "Inbox",        icon: Mail },
  { key: "/docs",         label: "Docs",         icon: FileText },
  { key: "/settings",     label: "Settings",     icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`shrink-0 bg-neutral-50 border-r border-neutral-200 flex flex-col smooth ${
        collapsed ? "w-16" : "w-56"
      }`}
    >
      <div className="h-14 flex items-center justify-between px-3 border-b border-neutral-200">
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="w-8 h-8 bg-black flex items-center justify-center shrink-0">
            <span className="text-white font-sans font-bold text-base leading-none">W</span>
          </div>
          {!collapsed && (
            <span className="font-sans text-base whitespace-nowrap">Warehouse</span>
          )}
        </div>
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="text-neutral-500 hover:text-black smooth p-1"
          title={collapsed ? "Expand" : "Collapse"}
        >
          <PanelLeft size={16} strokeWidth={1.5} />
        </button>
      </div>
      <nav className="flex-1 py-2 flex flex-col">
        {items.map((it) => {
          const Icon = it.icon;
          const active = pathname === it.key;
          return (
            <button
              key={it.key}
              onClick={() => router.push(it.key)}
              title={collapsed ? it.label : undefined}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm smooth text-left ${
                active ? "bg-white text-black" : "text-neutral-700 hover:bg-neutral-100"
              } ${collapsed ? "justify-center" : ""}`}
              style={{ borderLeft: active ? "2px solid #000" : "2px solid transparent" }}
            >
              <Icon size={18} strokeWidth={1.5} />
              {!collapsed && <span className="font-sans">{it.label}</span>}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
