"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Search,
  X,
  FileText,
  Image as ImageIcon,
  Music,
  FileSpreadsheet,
  File,
  Link2,
  Users,
} from "lucide-react";
import { SEARCH_DATA } from "@/lib/mockData";

const ALL_FILTERS = ["Contact", "Documents", "Links", "Teams"];

function fileIcon(ext) {
  if ([".png", ".jpg", ".jpeg"].includes(ext)) return <ImageIcon size={14} strokeWidth={1.5} />;
  if (ext === ".mp3" || ext === ".wav")        return <Music size={14} strokeWidth={1.5} />;
  if (ext === ".xls" || ext === ".csv")        return <FileSpreadsheet size={14} strokeWidth={1.5} />;
  if (ext === ".pdf" || ext === ".doc")        return <FileText size={14} strokeWidth={1.5} />;
  return <File size={14} strokeWidth={1.5} />;
}

function SearchPageInner() {
  const sp = useSearchParams();
  const router = useRouter();
  const initialQ = sp.get("q") || "";

  const [query, setQuery] = useState(initialQ);
  const [filters, setFilters] = useState([...ALL_FILTERS]);

  useEffect(() => {
    setQuery(initialQ);
  }, [initialQ]);

  const q = query.trim().toLowerCase();
  const match = (s) => !q || s.toLowerCase().includes(q);

  const results = useMemo(() => {
    return {
      contacts:  filters.includes("Contact")    ? SEARCH_DATA.contacts.filter((c) => match(c.name) || match(c.email) || match(c.role)) : [],
      documents: filters.includes("Documents")  ? SEARCH_DATA.documents.filter((d) => match(d.title) || match(d.context))               : [],
      links:     filters.includes("Links")      ? SEARCH_DATA.links.filter((l) => match(l.url) || match(l.label))                       : [],
      teams:     filters.includes("Teams")      ? SEARCH_DATA.teams.filter((t) => match(t.name))                                        : [],
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, q]);

  const total =
    results.contacts.length +
    results.documents.length +
    results.links.length +
    results.teams.length;

  return (
    <div className="px-4 sm:px-6 lg:px-10 py-6 lg:py-8 w-full">
      {/* Header */}
      <div className="text-sm font-sans text-neutral-500">Search</div>
      <h1 className="font-sans text-3xl sm:text-4xl mt-2">
        {query ? <>Results for "{query}"</> : "Search everything"}
      </h1>
      <div className="font-mono text-xs text-neutral-400 mt-1">
        {total} {total === 1 ? "result" : "results"}
      </div>

      {/* Search input */}
      <div className="mt-6 flex items-center gap-3 border border-neutral-200 px-3 py-2.5 max-w-2xl">
        <Search size={14} strokeWidth={1.5} className="text-neutral-400 shrink-0" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Find anything…"
          className="flex-1 min-w-0 outline-none font-sans text-sm placeholder-neutral-400"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="text-neutral-400 hover:text-black smooth"
          >
            <X size={12} strokeWidth={1.5} />
          </button>
        )}
      </div>

      {/* Filter chips */}
      <div className="mt-4 flex items-center gap-2 flex-wrap">
        {ALL_FILTERS.map((f) => {
          const active = filters.includes(f);
          return (
            <button
              key={f}
              onClick={() =>
                setFilters(active ? filters.filter((x) => x !== f) : [...filters, f])
              }
              className={`px-3 py-1 text-sm font-sans border smooth ${
                active
                  ? "bg-black text-white border-black"
                  : "border-neutral-200 hover:bg-neutral-50"
              }`}
            >
              {f}
            </button>
          );
        })}
      </div>

      {/* Results — full layout, not scrollable container */}
      <div className="mt-8 space-y-10">
        {total === 0 && (
          <div className="text-sm font-sans text-neutral-500">No matches found.</div>
        )}

        {results.contacts.length > 0 && (
          <Section label="Contact" count={results.contacts.length}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {results.contacts.map((c) => (
                <button
                  key={c.id}
                  onClick={() => router.push("/inbox")}
                  className="border border-neutral-200 px-4 py-3 flex items-center gap-3 hover:bg-neutral-50 smooth text-left"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-medium shrink-0 ${c.color}`}>
                    {c.initial}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-sans text-sm truncate">{c.name}</div>
                    <div className="font-sans text-xs text-neutral-500 truncate">
                      {c.email} <span className="mx-1">•</span> {c.role}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </Section>
        )}

        {results.documents.length > 0 && (
          <Section label="Documents" count={results.documents.length}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {results.documents.map((d) => (
                <button
                  key={d.id}
                  onClick={() => router.push("/docs")}
                  className="border border-neutral-200 px-4 py-3 flex items-center gap-3 hover:bg-neutral-50 smooth text-left"
                >
                  <div className="w-8 h-8 border border-neutral-200 flex items-center justify-center shrink-0 text-neutral-500">
                    {fileIcon(d.ext)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-sans text-sm truncate">
                      {d.title}<span className="text-neutral-400">{d.ext}</span>
                    </div>
                    <div className="font-sans text-xs text-neutral-500 truncate">
                      {d.context} <span className="mx-1">•</span> {d.edited}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </Section>
        )}

        {results.links.length > 0 && (
          <Section label="Links" count={results.links.length}>
            <div className="space-y-2">
              {results.links.map((l) => (
                <a
                  key={l.id}
                  href={l.url}
                  target="_blank"
                  rel="noreferrer"
                  className="border border-neutral-200 px-4 py-3 flex items-center gap-3 hover:bg-neutral-50 smooth text-left block"
                >
                  <div className="w-8 h-8 border border-neutral-200 flex items-center justify-center shrink-0 text-neutral-500">
                    <Link2 size={14} strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-mono text-xs truncate">{l.url}</div>
                    <div className="font-sans text-xs text-neutral-500 truncate">{l.label}</div>
                  </div>
                </a>
              ))}
            </div>
          </Section>
        )}

        {results.teams.length > 0 && (
          <Section label="Teams" count={results.teams.length}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {results.teams.map((t) => (
                <button
                  key={t.id}
                  onClick={() => router.push("/inbox")}
                  className="border border-neutral-200 px-4 py-4 flex items-center gap-3 hover:bg-neutral-50 smooth text-left"
                >
                  <div className="w-8 h-8 border border-neutral-200 flex items-center justify-center shrink-0 text-neutral-500">
                    <Users size={14} strokeWidth={1.5} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-sans text-sm truncate">{t.name}</div>
                    <div className="font-sans text-xs text-neutral-500 truncate">
                      {t.members} members
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </Section>
        )}
      </div>
    </div>
  );
}

function Section({ label, count, children }) {
  return (
    <div>
      <div className="text-xs font-sans text-neutral-400 tracking-widest uppercase mb-3">
        {label} <span className="font-mono text-neutral-500 ml-1">[ {count} ]</span>
      </div>
      {children}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={null}>
      <SearchPageInner />
    </Suspense>
  );
}
