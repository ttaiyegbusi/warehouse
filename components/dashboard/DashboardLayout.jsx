"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import TransactionDrawer from "./TransactionDrawer";
import { useUser } from "@/lib/UserContext";

export default function DashboardLayout({ children }) {
  const { activeTxn, setActiveTxn } = useUser();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-white">
      <Sidebar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <TopBar onOpenMobileNav={() => setMobileOpen(true)} />
        <div className="flex-1 overflow-auto flex flex-col">{children}</div>
      </div>
      {activeTxn && (
        <TransactionDrawer txn={activeTxn} onClose={() => setActiveTxn(null)} />
      )}
    </div>
  );
}
