"use client";

import { useState } from "react";
import {
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  Send,
  Download,
  CreditCard,
  Eye,
  EyeOff,
  ChevronRight,
  Check,
  Clock,
} from "lucide-react";
import { WALLET_CARDS, LINKED_ACCOUNTS, WALLET_ACTIVITY } from "@/lib/mockData";
import { useSkeletonLoad } from "@/lib/useSkeletonLoad";
import { WalletSkeleton } from "@/components/dashboard/PageSkeletons";

/* ----------------------------- Card visual ------------------------------ */
function PaymentCard({ card, active, onClick, masked }) {
  const isBlack    = card.color === "black";
  const isOutlined = card.color === "outlined";

  // Backgrounds for the 3 variants
  const bg =
    isBlack
      ? "bg-black text-white"
      : isOutlined
      ? "bg-white text-black border border-neutral-300"
      : "bg-neutral-100 text-black";

  return (
    <button
      onClick={onClick}
      className={`relative shrink-0 w-[300px] h-[180px] p-5 text-left smooth ${bg} ${
        active ? "ring-1 ring-offset-2 ring-black" : ""
      }`}
    >
      {/* subtle decorative arc — only on black card */}
      {isBlack && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-25"
          viewBox="0 0 300 180"
          preserveAspectRatio="none"
        >
          <circle cx="280" cy="20" r="140" stroke="white" strokeWidth="0.5" fill="none" />
          <circle cx="280" cy="20" r="100" stroke="white" strokeWidth="0.5" fill="none" />
          <circle cx="280" cy="20" r="60"  stroke="white" strokeWidth="0.5" fill="none" />
        </svg>
      )}

      <div className="relative flex items-start justify-between">
        <div className="font-sans text-[11px] uppercase tracking-widest opacity-70">
          {card.label}
        </div>
        <div className="font-sans text-xs">{card.brand}</div>
      </div>

      <div className="relative mt-10">
        <div className="font-mono text-lg tracking-widest">
          {masked ? "•••• •••• •••• " + card.last4 : "4829 1234 5678 " + card.last4}
        </div>
      </div>

      <div className="relative mt-6 flex items-end justify-between">
        <div>
          <div className="font-sans text-[10px] uppercase tracking-widest opacity-60">Holder</div>
          <div className="font-sans text-xs mt-0.5 truncate max-w-[180px]">{card.holder}</div>
        </div>
        <div className="text-right">
          <div className="font-sans text-[10px] uppercase tracking-widest opacity-60">Expires</div>
          <div className="font-mono text-xs mt-0.5">{card.expiry}</div>
        </div>
      </div>
    </button>
  );
}

/* --------------------------- Add-card placeholder ------------------------ */
function AddCard() {
  return (
    <button className="shrink-0 w-[300px] h-[180px] border border-dashed border-neutral-300 flex flex-col items-center justify-center gap-2 hover:border-black hover:bg-neutral-50 smooth">
      <div className="w-9 h-9 border border-neutral-300 flex items-center justify-center">
        <Plus size={16} strokeWidth={1.5} />
      </div>
      <div className="font-sans text-sm">Add new card</div>
      <div className="font-sans text-xs text-neutral-500">Connect a debit or credit card</div>
    </button>
  );
}

/* -------------------------------- Page ----------------------------------- */
export default function WalletPage() {
  const loading = useSkeletonLoad();
  const [activeId, setActiveId] = useState(WALLET_CARDS[0].id);
  const [masked, setMasked]     = useState(true);

  const active = WALLET_CARDS.find((c) => c.id === activeId);

  if (loading) return <WalletSkeleton />;

  return (
    <div className="px-4 sm:px-6 lg:px-10 py-6 lg:py-8 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm font-sans text-neutral-500">
            Wallet Balance <span className="text-neutral-300">ⓘ</span>
          </div>
          <div className="font-mono text-3xl sm:text-4xl mt-2">{active.balance}</div>
          <div className="font-sans text-xs text-neutral-500 mt-1">
            {active.label} card <span className="mx-1">•</span>{" "}
            <span className="font-mono">•••• {active.last4}</span>
          </div>
        </div>
        <button
          onClick={() => setMasked((m) => !m)}
          className="flex items-center gap-2 px-3 py-2 border border-neutral-200 hover:bg-neutral-50 smooth font-sans text-sm"
        >
          {masked ? <EyeOff size={14} strokeWidth={1.5} /> : <Eye size={14} strokeWidth={1.5} />}
          {masked ? "Show" : "Hide"} card numbers
        </button>
      </div>

      {/* Quick actions */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
        <ActionTile icon={<ArrowDownLeft size={16} strokeWidth={1.5} />} label="Add funds" />
        <ActionTile icon={<Send         size={16} strokeWidth={1.5} />} label="Send" />
        <ActionTile icon={<Download     size={16} strokeWidth={1.5} />} label="Request" />
        <ActionTile icon={<CreditCard   size={16} strokeWidth={1.5} />} label="Top-up card" />
      </div>

      {/* My Cards */}
      <div className="mt-12 flex items-center justify-between">
        <div className="text-xs font-sans text-neutral-400 tracking-widest uppercase">My Cards</div>
        <div className="text-xs font-mono text-neutral-400">{WALLET_CARDS.length} cards</div>
      </div>

      <div className="mt-4 flex gap-4 overflow-x-auto pb-2 -mx-2 px-2">
        {WALLET_CARDS.map((c) => (
          <PaymentCard
            key={c.id}
            card={c}
            active={c.id === activeId}
            onClick={() => setActiveId(c.id)}
            masked={masked}
          />
        ))}
        <AddCard />
      </div>

      {/* Two-column section: Linked accounts + Recent activity */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
        {/* Linked accounts */}
        <div>
          <div className="flex items-center justify-between">
            <div className="text-xs font-sans text-neutral-400 tracking-widest uppercase">
              Linked Accounts
            </div>
            <button className="text-xs font-sans text-neutral-700 hover:text-black smooth flex items-center gap-1">
              <Plus size={12} strokeWidth={1.5} /> Link new
            </button>
          </div>

          <div className="mt-4 border border-neutral-200">
            {LINKED_ACCOUNTS.map((a, i) => (
              <div
                key={a.id}
                className={`row-hover flex items-center px-4 py-3 ${
                  i !== LINKED_ACCOUNTS.length - 1 ? "border-b border-neutral-100" : ""
                }`}
              >
                <div className="w-9 h-9 border border-neutral-200 flex items-center justify-center mr-3">
                  <span className="font-sans text-[10px] tracking-wider">
                    {a.name.slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-sans text-sm">{a.name}</div>
                  <div className="font-mono text-[11px] text-neutral-500 mt-0.5">
                    {a.acct} <span className="mx-1">•</span> {a.type}
                  </div>
                </div>
                <div
                  className={`text-[10px] font-sans uppercase tracking-widest flex items-center gap-1 px-2 py-1 ${
                    a.status === "Active"
                      ? "text-emerald-700 bg-emerald-50"
                      : "text-neutral-500 bg-neutral-50"
                  }`}
                >
                  {a.status === "Active" ? (
                    <Check size={10} strokeWidth={2.5} />
                  ) : (
                    <Clock size={10} strokeWidth={2} />
                  )}
                  {a.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div>
          <div className="flex items-center justify-between">
            <div className="text-xs font-sans text-neutral-400 tracking-widest uppercase">
              Recent Activity
            </div>
            <button className="text-xs font-sans text-neutral-400 tracking-widest uppercase hover:text-black smooth">
              See all ›
            </button>
          </div>

          <div className="mt-4">
            {WALLET_ACTIVITY.map((a) => (
              <div
                key={a.id}
                className="row-hover flex items-center px-2 py-3 border-b border-neutral-100"
              >
                <div className="w-9 h-9 border border-neutral-200 flex items-center justify-center mr-3 text-neutral-500">
                  {a.kind === "in" ? (
                    <ArrowDownLeft size={14} strokeWidth={1.5} />
                  ) : (
                    <ArrowUpRight size={14} strokeWidth={1.5} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-sans text-sm">{a.label}</div>
                  <div className="font-sans text-[11px] text-neutral-400 mt-0.5">{a.date}</div>
                </div>
                <div
                  className={`font-mono text-sm ${
                    a.kind === "in" ? "text-emerald-700" : "text-neutral-800"
                  }`}
                >
                  {a.amount}
                </div>
                <ChevronRight
                  size={14}
                  strokeWidth={1.25}
                  className="text-neutral-300 ml-2"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- Subcomponents ----------------------------- */
function ActionTile({ icon, label }) {
  return (
    <button className="border border-neutral-200 px-4 py-4 flex items-center gap-3 hover:bg-neutral-50 smooth text-left">
      <div className="w-8 h-8 border border-neutral-200 flex items-center justify-center text-neutral-700">
        {icon}
      </div>
      <div className="font-sans text-sm">{label}</div>
    </button>
  );
}
