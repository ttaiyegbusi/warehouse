"use client";

import { useEffect, useState } from "react";
import { TXN_HISTORY } from "@/lib/mockData";
import { useUser } from "@/lib/UserContext";
import BalanceCard from "@/components/dashboard/BalanceCard";
import TxnRow from "@/components/dashboard/TxnRow";
import Skel from "@/components/dashboard/Skel";

export default function HomePage() {
  const { setActiveTxn } = useUser();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const key = "warehouse-home-loaded";
    // Only show skeleton on the first home visit per session
    if (typeof window !== "undefined" && sessionStorage.getItem(key)) {
      setLoaded(true);
      return;
    }
    const t = setTimeout(() => {
      setLoaded(true);
      if (typeof window !== "undefined") sessionStorage.setItem(key, "1");
    }, 1500);
    return () => clearTimeout(t);
  }, []);

  const loading = !loaded;

  return (
    <div className="px-10 py-8 max-w-6xl">
      <div className="flex items-center gap-2 text-sm font-sans text-neutral-500">
        Current Balance <span className="text-neutral-300">ⓘ</span>
      </div>

      {loading ? (
        <Skel w={280} h={42} className="mt-3" />
      ) : (
        <div className="font-mono text-4xl mt-2">$40,902.78</div>
      )}

      <div className="mt-8 grid grid-cols-4 gap-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="border border-neutral-200 p-5">
                <Skel w={28} h={20} />
                <Skel w={50} h={12} className="mt-4" />
                <Skel w={140} h={26} className="mt-3" />
              </div>
            ))
          : (
            <>
              <BalanceCard flag="🇳🇬" code="NGN" whole="₦220,000" decimal=".50" />
              <BalanceCard flag="🇨🇦" code="CAD" whole="$239,092" decimal=".29" />
              <BalanceCard flag="🇳🇬" code="EUR" whole="₦220,000" decimal=".50" />
              <BalanceCard flag="🇺🇸" code="USD" whole="£195,000" decimal=".75" />
            </>
          )}
      </div>

      <div className="mt-12 flex items-center justify-between">
        <div className="text-xs font-sans text-neutral-400 tracking-widest uppercase">
          Transaction History
        </div>
        <button className="text-xs font-sans text-neutral-400 tracking-widest uppercase hover:text-black smooth">
          See All ›
        </button>
      </div>

      <div className="mt-4">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center px-2 py-4 border-b border-neutral-100">
                <Skel w={18} h={18} className="rounded-full" />
                <div className="flex-1 ml-4">
                  <Skel w={120} h={12} />
                  <Skel w={220} h={10} className="mt-2" />
                </div>
              </div>
            ))
          : TXN_HISTORY.map((t) => (
              <TxnRow key={t.id} txn={t} onClick={() => setActiveTxn(t)} />
            ))}
      </div>
    </div>
  );
}
