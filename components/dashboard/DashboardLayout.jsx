"use client";

import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import TransactionDrawer from "./TransactionDrawer";
import { useUser } from "@/lib/UserContext";

export default function DashboardLayout({ children }) {
  const { activeTxn, setActiveTxn } = useUser();

  return (
    <div className="min-h-screen flex bg-white">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
      {activeTxn && (
        <TransactionDrawer txn={activeTxn} onClose={() => setActiveTxn(null)} />
      )}
    </div>
  );
}
