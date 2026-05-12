"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
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
  ArrowRight,
} from "lucide-react";
import { SEARCH_DATA } from "@/lib/mockData";

const ALL_FILTERS = ["Contact", "Documents", "Links", "Teams"];

function fileIcon(ext) {
  if ([".png", ".jpg", ".jpeg"].includes(ext)) return <ImageIcon size={12} strokeWidth={1.5} />;
  if (ext === ".mp3" || ext === ".wav")        return <Music size={12} strokeWidth={1.5} />;
  if (ext === ".xls" || ext === ".csv")        return <FileSpreadsheet size={12} strokeWidth={1.5} />;
  if (ext === ".pdf" || ext === ".doc")        return <FileText size={12} strokeWidth={1.5} />;
  return <File size={12} strokeWidth={1.5} />;
}

export default function SearchModal({ open, onClose }) {
  const [query, setQuery]       = useState("");
  const [filters, setFilters]   = useState(["Contact", "Documents", "Links", "Teams"]);
  const inputRef                = useRef(null);
  const router                  = useRouter();

  // Focus input on open
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 30);
    } else {
      setQuery("");
      setFilters(["Contact", "Documents", "Links", "Teams"]);
    }
  }, [open]);

  // Escape closes
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Cmd/Ctrl+K opens (global, even when closed — handled in TopBar)

  const q = query.trim().toLowerCase();
  const match = (s) => !q || s.toLowerCase().includes(q);

  const results = useMemo(() => {
    const showContacts  = filters.includes("Contact");
    const showDocs      = filters.includes("Documents");
    const showLinks     = filters.includes("Links");
    const showTeams     = filters.includes("Teams");
    return {
      contacts:  showContacts  ? SEARCH_DATA.contacts.filter((c) => match(c.name) || match(c.email) || match(c.role)) : [],
      documents: showDocs      ? SEARCH_DATA.documents.filter((d) => match(d.title) || match(d.context))               : [],
      links:     showLinks     ? SEARCH_DATA.links.filter((l) => match(l.url) || match(l.label))                       : [],
      teams:     showTeams     ? SEARCH_DATA.teams.filter((t) => match(t.name))                                        : [],
    };
  }, [filters, q]);

  if (!open) return null;

  const removeFilter = (f) => setFilters(filters.filter((x) => x !== f));

  const close = () => onClose();

  const onPickContact  = ()      => { close(); router.push("/inbox"); };
  const onPickDocument = ()      => { close(); router.push("/docs"); };
  const onPickLink     = (url)   => { window.open(url, "_blank", "noopener,noreferrer"); close(); };
  const onPickTeam     = ()      => { close(); router.push("/inbox"); };
  const onOpenSearchPage = ()    => { close(); router.push(`/search${q ? `?q=${encodeURIComponent(q)}` : ""}`); };

  const totalResults =
    results.contacts.length +
    results.documents.length +
    results.links.length +
    results.teams.length;

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center pt-[12vh] px-4 fade-in">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px]" onClick={close} />

      {/* Modal */}
      <div className="relative w-full max-w-[640px] bg-white border border-neutral-200 shadow-2xl flex flex-col max-h-[76vh]">
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-neutral-100">
          <Search size={14} strokeWidth={1.5} className="text-neutral-400 shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Find anything…"
            className="flex-1 min-w-0 outline-none font-sans text-sm placeholder-neutral-400"
          />
          <kbd className="hidden sm:inline-block font-mono text-[10px] text-neutral-400 border border-neutral-200 px-1.5 py-0.5">
            ESC
          </kbd>
        </div>

        {/* Filter pills */}
        {filters.length > 0 && (
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-neutral-100 flex-wrap">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => removeFilter(f)}
                className="inline-flex items-center gap-1.5 border border-neutral-200 bg-neutral-50 px-2 py-1 text-xs font-sans hover:bg-neutral-100 smooth"
              >
                {f}
                <X size={10} strokeWidth={2} className="text-neutral-400" />
              </button>
            ))}
            {/* Re-add removed filters */}
            {ALL_FILTERS.filter((f) => !filters.includes(f)).map((f) => (
              <button
                key={f}
                onClick={() => setFilters([...filters, f])}
                className="inline-flex items-center gap-1 border border-dashed border-neutral-300 text-neutral-500 px-2 py-1 text-xs font-sans hover:border-neutral-500 hover:text-black smooth"
              >
                + {f}
              </button>
            ))}
          </div>
        )}

        {/* Results — scrollable */}
        <div className="flex-1 overflow-y-auto">
          {totalResults === 0 ? (
            <div className="px-4 py-10 text-center text-sm font-sans text-neutral-500">
              No matches for "{query}"
            </div>
          ) : (
            <div className="py-1">
              {/* Contacts */}
              {results.contacts.length > 0 && (
                <Group label="Contact" count={results.contacts.length}>
                  {results.contacts.map((c) => (
                    <Row key={c.id} onClick={onPickContact}>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-medium shrink-0 ${c.color}`}>
                        {c.initial}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-sans text-sm truncate">{c.name}</div>
                        <div className="font-sans text-[11px] text-neutral-500 truncate">
                          {c.email} <span className="mx-1">•</span> {c.role}
                        </div>
                      </div>
                    </Row>
                  ))}
                </Group>
              )}

              {/* Documents */}
              {results.documents.length > 0 && (
                <Group label="Documents" count={results.documents.length}>
                  {results.documents.map((d) => (
                    <Row key={d.id} onClick={onPickDocument}>
                      <div className="w-6 h-6 border border-neutral-200 flex items-center justify-center shrink-0 text-neutral-500">
                        {fileIcon(d.ext)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-sans text-sm truncate">
                          {d.title}<span className="text-neutral-400">{d.ext}</span>
                        </div>
                        <div className="font-sans text-[11px] text-neutral-500 truncate">
                          {d.context} <span className="mx-1">•</span> {d.edited}
                        </div>
                      </div>
                    </Row>
                  ))}
                </Group>
              )}

              {/* Links */}
              {results.links.length > 0 && (
                <Group label="Links" count={results.links.length}>
                  {results.links.map((l) => (
                    <Row key={l.id} onClick={() => onPickLink(l.url)}>
                      <div className="w-6 h-6 border border-neutral-200 flex items-center justify-center shrink-0 text-neutral-500">
                        <Link2 size={12} strokeWidth={1.5} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-mono text-xs truncate">{l.url}</div>
                        <div className="font-sans text-[11px] text-neutral-500 truncate">{l.label}</div>
                      </div>
                    </Row>
                  ))}
                </Group>
              )}

              {/* Teams */}
              {results.teams.length > 0 && (
                <Group label="Teams" count={results.teams.length}>
                  {results.teams.map((t) => (
                    <Row key={t.id} onClick={onPickTeam}>
                      <div className="w-6 h-6 border border-neutral-200 flex items-center justify-center shrink-0 text-neutral-500">
                        <Users size={12} strokeWidth={1.5} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-sans text-sm truncate">{t.name}</div>
                        <div className="font-sans text-[11px] text-neutral-500 truncate">
                          {t.members} members
                        </div>
                      </div>
                    </Row>
                  ))}
                </Group>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <button
          onClick={onOpenSearchPage}
          className="border-t border-neutral-100 px-4 py-3 flex items-center justify-between hover:bg-neutral-50 smooth"
        >
          <div className="font-sans text-sm text-neutral-700">Open Search Page</div>
          <ArrowRight size={14} strokeWidth={1.5} className="text-neutral-400" />
        </button>
      </div>
    </div>
  );
}

function Group({ label, count, children }) {
  return (
    <div className="px-2 pt-3 pb-1">
      <div className="px-2 pb-1.5 text-[11px] font-sans text-neutral-500">
        {label} <span className="text-neutral-400">[ {count} ]</span>
      </div>
      <div>{children}</div>
    </div>
  );
}

function Row({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-3 py-2 hover:bg-neutral-100 smooth text-left"
    >
      {children}
    </button>
  );
}
