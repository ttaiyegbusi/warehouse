"use client";

import { useState } from "react";
import { LayoutGrid, List, MoreVertical } from "lucide-react";
import { DOCS } from "@/lib/mockData";
import { useSkeletonLoad } from "@/lib/useSkeletonLoad";
import { DocsSkeleton } from "@/components/dashboard/PageSkeletons";

function DocCard({ doc }) {
  return (
    <div className="border border-neutral-200 bg-white hover:border-neutral-400 smooth cursor-pointer flex flex-col">
      <div className="flex items-start justify-between px-4 pt-3">
        <span
          className="font-sans text-[11px] tracking-wider text-neutral-700"
          style={{ borderLeft: "2px solid #000", paddingLeft: "8px" }}
        >
          {doc.type}
        </span>
        <button
          onClick={(e) => e.stopPropagation()}
          className="w-7 h-7 border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 smooth"
        >
          <MoreVertical size={12} strokeWidth={1.5} />
        </button>
      </div>
      <div className="flex-1 min-h-[120px] bg-neutral-50/40" />
      <div className="px-4 pb-4 pt-3">
        <div className="font-sans text-sm text-black truncate">{doc.title}</div>
        <div className="mt-1 font-mono text-[11px] text-neutral-400">
          {doc.size} <span className="mx-1">▪</span> Uploaded {doc.date}
        </div>
      </div>
    </div>
  );
}

function DocRow({ doc }) {
  return (
    <div className="row-hover grid grid-cols-[80px_1fr_120px_180px_40px] gap-4 items-center py-3 px-3 border-b border-neutral-100">
      <span
        className="font-sans text-[11px] tracking-wider text-neutral-700 inline-block"
        style={{ borderLeft: "2px solid #000", paddingLeft: "8px" }}
      >
        {doc.type}
      </span>
      <div className="font-sans text-sm truncate">{doc.title}</div>
      <div className="font-mono text-xs text-neutral-500">{doc.size}</div>
      <div className="font-mono text-xs text-neutral-400">Uploaded {doc.date}</div>
      <button
        onClick={(e) => e.stopPropagation()}
        className="w-7 h-7 border border-neutral-200 flex items-center justify-center hover:bg-neutral-50 smooth justify-self-end"
      >
        <MoreVertical size={12} strokeWidth={1.5} />
      </button>
    </div>
  );
}

export default function DocsPage() {
  const loading = useSkeletonLoad();
  const [view, setView] = useState("grid"); // 'grid' | 'list'

  if (loading) return <DocsSkeleton />;

  return (
    <div className="px-4 sm:px-6 lg:px-10 py-6 w-full">
      <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
        <div className="flex items-center gap-1">
          <button className="font-sans text-sm pb-2 -mb-3 border-b-2 border-black px-1">
            All <span className="font-mono text-neutral-500 ml-1">[ {DOCS.length} ]</span>
          </button>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setView("grid")}
            className={`w-8 h-8 border border-neutral-200 flex items-center justify-center smooth ${
              view === "grid" ? "bg-black text-white border-black" : "hover:bg-neutral-50"
            }`}
            title="Grid view"
          >
            <LayoutGrid size={14} strokeWidth={1.5} />
          </button>
          <button
            onClick={() => setView("list")}
            className={`w-8 h-8 border border-neutral-200 flex items-center justify-center smooth ${
              view === "list" ? "bg-black text-white border-black" : "hover:bg-neutral-50"
            }`}
            title="List view"
          >
            <List size={14} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {view === "grid" ? (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {DOCS.map((d) => (
            <DocCard key={d.id} doc={d} />
          ))}
        </div>
      ) : (
        <div className="mt-6">
          <div className="grid grid-cols-[80px_1fr_120px_180px_40px] gap-4 px-3 pb-2 border-b border-neutral-200">
            <div className="text-[10px] font-sans uppercase tracking-widest text-neutral-400">Type</div>
            <div className="text-[10px] font-sans uppercase tracking-widest text-neutral-400">Name</div>
            <div className="text-[10px] font-sans uppercase tracking-widest text-neutral-400">Size</div>
            <div className="text-[10px] font-sans uppercase tracking-widest text-neutral-400">Uploaded</div>
            <div></div>
          </div>
          {DOCS.map((d) => (
            <DocRow key={d.id} doc={d} />
          ))}
        </div>
      )}
    </div>
  );
}
