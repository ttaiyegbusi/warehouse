"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import AuthShell from "@/components/auth/AuthShell";
import GhostCard from "@/components/auth/GhostCard";
import Field from "@/components/auth/Field";
import { useUser } from "@/lib/UserContext";

export default function CreateAccountPage() {
  const router = useRouter();
  const { user, setUser } = useUser();
  const [showPwd, setShowPwd] = useState(false);

  const initials =
    ((user.firstName?.[0] || "") + (user.lastName?.[0] || "")).toUpperCase() || "TA";
  const fullName =
    `${user.firstName || ""} ${user.lastName || ""}`.trim() || "Your Name";
  const email = user.email || "your.email@domain.com";

  const card = (
    <GhostCard>
      <div className="w-12 h-12 bg-neutral-100 flex items-center justify-center mb-6">
        <span className="font-sans font-medium">{initials}</span>
      </div>
      <div
        className={`font-sans text-lg ${
          user.firstName || user.lastName ? "text-black" : "text-neutral-300"
        }`}
      >
        {fullName}
      </div>
      <div
        className={`font-sans text-sm mt-1 ${
          user.email ? "text-neutral-500" : "text-neutral-300"
        }`}
      >
        {email}
      </div>
      <div className="mt-6 space-y-1 text-sm font-sans text-neutral-300">
        <div>45, Aitetoro Street,</div>
        <div>Aguda Surulere,</div>
      </div>
    </GhostCard>
  );

  return (
    <AuthShell rightCard={card}>
      <h1 className="font-sans text-3xl tracking-tight">Create Account</h1>
      <p className="text-neutral-500 mt-3 max-w-sm font-sans text-sm leading-relaxed">
        Sign up to access your dashboard, manage your details, and get the most out of our platform.
      </p>

      <div className="mt-10 space-y-5 max-w-md">
        <Field label="First Name">
          <input
            value={user.firstName || ""}
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
            className="w-full border border-neutral-300 px-3 py-2.5 text-sm font-sans outline-none focus:border-black smooth"
          />
        </Field>
        <Field label="Last Name">
          <input
            value={user.lastName || ""}
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
            className="w-full border border-neutral-300 px-3 py-2.5 text-sm font-sans outline-none focus:border-black smooth"
          />
        </Field>
        <Field label="Email Address">
          <input
            type="email"
            value={user.email || ""}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="w-full border border-neutral-300 px-3 py-2.5 text-sm font-sans outline-none focus:border-black smooth"
          />
        </Field>
        <Field label="Password">
          <div className="relative">
            <input
              type={showPwd ? "text" : "password"}
              value={user.password || ""}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="w-full border border-neutral-300 px-3 py-2.5 text-sm font-sans outline-none focus:border-black smooth pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPwd((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500"
            >
              {showPwd ? (
                <Eye size={16} strokeWidth={1.5} />
              ) : (
                <EyeOff size={16} strokeWidth={1.5} />
              )}
            </button>
          </div>
        </Field>

        <button
          onClick={() => router.push("/account-type")}
          className="w-full bg-black text-white py-3 text-sm font-sans smooth hover:bg-neutral-800"
        >
          Continue
        </button>
      </div>
    </AuthShell>
  );
}
