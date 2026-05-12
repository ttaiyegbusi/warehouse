"use client";

import { TXN_HISTORY } from "@/lib/mockData";
import { useUser } from "@/lib/UserContext";
import KPI from "@/components/dashboard/KPI";
import TxnRow from "@/components/dashboard/TxnRow";
import RevenueChart from "@/components/dashboard/RevenueChart";

export default function TransactionsPage() {
  const { setActiveTxn } = useUser();

  return (
    <div className="px-4 sm:px-6 lg:px-10 py-6 lg:py-8 w-full">
      <div className="text-sm font-sans text-neutral-500">Overview</div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <KPI amount="$4,759.67" label="Paid" />
        <KPI amount="$2,943.01" label="Unpaid" />
        <KPI amount="$4,000" label="Paid" />
        <KPI amount="$4,000" label="Paid" />
      </div>

      <div className="mt-8 lg:mt-10">
        <div className="inline-block border border-neutral-300 px-3 py-1.5 font-sans text-sm">
          Revenue ▾
        </div>
        <div className="font-mono text-3xl sm:text-4xl mt-4">$40,902.78</div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-1 gap-2">
          <div className="text-xs font-mono text-neutral-500">
            vs $30,847.12 last period <span className="text-neutral-300">ⓘ</span>
          </div>
          <div className="flex items-center gap-5 text-xs font-sans text-neutral-600">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-black inline-block" />Current period
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-neutral-300 inline-block" />last period
            </span>
          </div>
        </div>

        <div className="mt-6 overflow-x-auto">
          <div className="min-w-[600px]">
            <RevenueChart />
          </div>
        </div>
      </div>

      <div className="mt-10 lg:mt-12 flex items-center justify-between">
        <div className="text-xs font-sans text-neutral-400 tracking-widest uppercase">
          Transaction History
        </div>
        <button className="text-xs font-sans text-neutral-400 tracking-widest uppercase hover:text-black smooth">
          See All ›
        </button>
      </div>

      <div className="mt-4">
        {TXN_HISTORY.slice(0, 6).map((t) => (
          <TxnRow key={t.id} txn={t} onClick={() => setActiveTxn(t)} />
        ))}
      </div>
    </div>
  );
}
