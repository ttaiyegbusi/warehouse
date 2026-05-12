"use client";

import { Home, ArrowLeftRight, Wallet, Mail, FileText, Settings, PanelLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

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

  return (
    <aside className="w-56 shrink-0 bg-neutral-50 border-r border-neutral-200 flex flex-col">
      <div className="h-14 flex items-center px-4 border-b border-neutral-200">
        <PanelLeft size={18} strokeWidth={1.5} className="text-neutral-600" />
      </div>
      <nav className="flex-1 py-2 flex flex-col">
        {items.map((it) => {
          const Icon = it.icon;
          const active = pathname === it.key;
          return (
            <button
              key={it.key}
              onClick={() => router.push(it.key)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm smooth text-left ${
                active ? "bg-white text-black" : "text-neutral-700 hover:bg-neutral-100"
              }`}
              style={{ borderLeft: active ? "2px solid #000" : "2px solid transparent" }}
            >
              <Icon size={18} strokeWidth={1.5} />
              <span className="font-sans">{it.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
