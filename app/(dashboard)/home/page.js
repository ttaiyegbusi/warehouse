"use client";

import { TXN_HISTORY } from "@/lib/mockData";
import { useUser } from "@/lib/UserContext";
import { useSkeletonLoad } from "@/lib/useSkeletonLoad";
import BalanceCard from "@/components/dashboard/BalanceCard";
import TxnRow from "@/components/dashboard/TxnRow";
import { HomeSkeleton } from "@/components/dashboard/PageSkeletons";

export default function HomePage() {
  const { setActiveTxn } = useUser();
  const loading = useSkeletonLoad();

  if (loading) return <HomeSkeleton />;

  return (
    <div className="px-4 sm:px-6 lg:px-10 py-6 lg:py-8 w-full">
      <div className="flex items-center gap-2 text-sm font-sans text-neutral-500">
        Current Balance <span className="text-neutral-300">ⓘ</span>
      </div>

      <div className="font-mono text-3xl sm:text-4xl mt-2">$40,902.78</div>

      <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <BalanceCard flag="🇳🇬" code="NGN" whole="₦220,000" decimal=".50" />
        <BalanceCard flag="🇨🇦" code="CAD" whole="$239,092" decimal=".29" />
        <BalanceCard flag="🇳🇬" code="EUR" whole="₦220,000" decimal=".50" />
        <BalanceCard flag="🇺🇸" code="USD" whole="£195,000" decimal=".75" />
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
        {TXN_HISTORY.map((t) => (
          <TxnRow key={t.id} txn={t} onClick={() => setActiveTxn(t)} />
        ))}
      </div>
    </div>
  );
}
