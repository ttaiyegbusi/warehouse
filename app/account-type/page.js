"use client";

import { useRouter } from "next/navigation";
import { User, Users } from "lucide-react";
import AuthShell from "@/components/auth/AuthShell";
import GhostCard from "@/components/auth/GhostCard";
import TypeCard from "@/components/auth/TypeCard";
import { useUser } from "@/lib/UserContext";

export default function AccountTypePage() {
  const router = useRouter();
  const { user, accountType, setAccountType } = useUser();

  const initials =
    ((user.firstName?.[0] || "") + (user.lastName?.[0] || "")).toUpperCase() || "TA";
  const isBusiness = accountType === "business";

  const card = (
    <GhostCard>
      <div
        className="w-12 h-12 flex items-center justify-center mb-6 smooth"
        style={{ background: isBusiness ? "#0f0f0f" : "#f5f5f5" }}
      >
        {isBusiness ? (
          <Users size={22} strokeWidth={1.5} className="text-white" />
        ) : (
          <span className="font-sans font-medium">{initials}</span>
        )}
      </div>
      <div className="font-sans text-lg">
        {isBusiness
          ? "Warehouse Inc."
          : `${user.firstName || "Temitope"} ${user.lastName || "Aiyegbusi"}`.trim()}
      </div>
      <div className="font-sans text-sm text-neutral-500 mt-1">
        {user.email || "temitope.aiyegbusi@automaze.io"}
      </div>
      {isBusiness && (
        <div className="mt-4 inline-block text-[10px] font-sans tracking-widest bg-neutral-100 px-2 py-1 uppercase">
          Business Account
        </div>
      )}
    </GhostCard>
  );

  return (
    <AuthShell rightCard={card}>
      <h1 className="font-sans text-3xl tracking-tight">Account type</h1>
      <p className="text-neutral-500 mt-3 max-w-sm font-sans text-sm leading-relaxed">
        Select the appropriate account type so we can configure your access and optimize your experience.
      </p>

      <div className="mt-10 space-y-4 max-w-md">
        <TypeCard
          active={accountType === "individual"}
          onClick={() => setAccountType("individual")}
          icon={<User size={26} strokeWidth={1.25} />}
          title="Individual"
          badge="BEST"
          desc="Ideal for individual users managing their own account."
        />
        <TypeCard
          active={accountType === "business"}
          onClick={() => setAccountType("business")}
          icon={<Users size={26} strokeWidth={1.25} />}
          title="Business"
          desc="For companies and teams managing business operations."
        />

        <button
          onClick={() => router.push("/home")}
          className="w-full bg-black text-white py-3 text-sm font-sans smooth hover:bg-neutral-800 mt-4"
        >
          Continue
        </button>
      </div>
    </AuthShell>
  );
}
