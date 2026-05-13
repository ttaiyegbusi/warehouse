"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Smile,
  Gift,
  UserCog,
  ShieldCheck,
  Headphones,
  LogOut,
  Check,
} from "lucide-react";
import { useUser } from "@/lib/UserContext";

const ITEMS = [
  { key: "status",   icon: Smile,        label: "Set Status",              hint: "Available" },
  { key: "referral", icon: Gift,         label: "Referrals & Earnings",    hint: "$240 earned" },
  { key: "account",  icon: UserCog,      label: "Account & Billing",       hint: "Personal · Tier 2" },
  { key: "security", icon: ShieldCheck,  label: "Security & Verification", hint: "2FA on" },
  { key: "support",  icon: Headphones,   label: "Support",                 hint: null },
];

export default function ProfileMenu({ open, onClose, anchorRef }) {
  const popRef = useRef(null);
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e) => {
      if (popRef.current?.contains(e.target)) return;
      if (anchorRef?.current?.contains(e.target)) return;
      onClose();
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open, onClose, anchorRef]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const fullName =
    `${user.firstName || "Temitope"} ${user.lastName || "Aiyegbusi"}`.trim();
  const email = user.email || "aiyegbusitope@gmail.com";

  const signOut = () => {
    onClose();
    router.push("/");
  };

  return (
    <div
      ref={popRef}
      className="fade-in absolute right-4 sm:right-6 top-[52px] z-50 w-[300px] bg-white border border-neutral-200 shadow-xl"
    >
      {/* Header — finance signal */}
      <div className="px-4 pt-4 pb-3 border-b border-neutral-100">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 bg-black flex items-center justify-center shrink-0">
            <span className="text-white font-sans font-bold text-base leading-none">W</span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-sans text-sm truncate">{fullName}</div>
            <div className="font-sans text-xs text-neutral-500 truncate">{email}</div>

            {/* Verification badge */}
            <div className="mt-2 inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-[10px] font-sans uppercase tracking-widest px-2 py-0.5">
              <Check size={10} strokeWidth={2.5} />
              Tier 2 Verified
            </div>
          </div>
        </div>

        {/* Balance preview */}
        <div className="mt-3 flex items-baseline justify-between border-t border-neutral-100 pt-3">
          <div className="font-sans text-[10px] uppercase tracking-widest text-neutral-400">
            Current Balance
          </div>
          <div className="font-mono text-sm">
            $40,902.78
            <span className="font-sans text-[10px] text-neutral-400 ml-1.5">
              · 4 currencies
            </span>
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="py-1">
        {ITEMS.map((it) => {
          const Icon = it.icon;
          return (
            <button
              key={it.key}
              onClick={onClose}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-neutral-50 smooth"
            >
              <Icon size={14} strokeWidth={1.5} className="text-neutral-500 shrink-0" />
              <span className="font-sans text-sm flex-1">{it.label}</span>
              {it.hint && (
                <span className="font-sans text-[10px] text-neutral-400">
                  {it.hint}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Sign out */}
      <div className="border-t border-neutral-100">
        <button
          onClick={signOut}
          className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-neutral-50 smooth"
        >
          <LogOut size={14} strokeWidth={1.5} className="text-neutral-500 shrink-0" />
          <span className="font-sans text-sm">Sign Out</span>
        </button>
      </div>
    </div>
  );
}
