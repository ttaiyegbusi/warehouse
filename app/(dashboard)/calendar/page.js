"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, X, ExternalLink, Copy, Check } from "lucide-react";
import { CALENDAR_EVENTS } from "@/lib/mockData";

const DOWS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

/**
 * Build the visible 6-row grid for January 2026.
 * Returns an array of { day: number, inMonth: boolean }.
 */
function buildGrid() {
  // January 2026 — 1st falls on Thursday (day index 4)
  // Previous month tail: Dec 28, 29, 30, 31 then Jan 1..31, then Feb 1..
  const cells = [];

  // Leading: Sun(28) Mon(29) Tue(30) Wed(31) — December 2025
  const lead = [
    { day: 28, inMonth: false, prevMonth: true },
    { day: 29, inMonth: false, prevMonth: true },
    { day: 30, inMonth: false, prevMonth: true },
    { day: 31, inMonth: false, prevMonth: true },
  ];
  cells.push(...lead);

  // January: 31 days
  for (let d = 1; d <= 31; d++) {
    cells.push({ day: d, inMonth: true });
  }

  // Trailing: fill to 42 (6 rows × 7 cols)
  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++) {
    cells.push({ day: d, inMonth: false, nextMonth: true });
  }

  return cells;
}

function EventPopover({ event, day, onClose, anchor }) {
  const [copied, setCopied] = useState(false);
  const popRef = useRef(null);

  // Position the popover near the anchor
  const [pos, setPos] = useState({ left: 0, top: 0 });

  useEffect(() => {
    if (!anchor) return;
    const rect = anchor.getBoundingClientRect();
    // Position to the right & slightly below
    const popW = 360;
    let left = rect.right - 4;
    if (left + popW > window.innerWidth - 16) {
      left = rect.left - popW + rect.width + 4;
    }
    if (left < 16) left = 16;
    const top = rect.top + window.scrollY + 24;
    setPos({ left, top });
  }, [anchor]);

  const copyLink = (e) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(event.link).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      ref={popRef}
      className="fixed z-40 w-[360px] bg-white border border-neutral-200 shadow-xl fade-in"
      style={{ left: pos.left, top: pos.top }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-100">
        <div className="font-sans text-sm">{event.title}</div>
        <button
          onClick={onClose}
          className="text-neutral-400 hover:text-black smooth"
        >
          <X size={14} strokeWidth={1.5} />
        </button>
      </div>

      <div className="px-4 py-3">
        <div className="text-[10px] font-sans uppercase tracking-widest text-neutral-400 mb-2">
          Details
        </div>

        {Object.entries(event.details).map(([k, v]) => (
          <div
            key={k}
            className="flex items-center justify-between py-2 border-b border-neutral-100 last:border-b-0"
          >
            <div className="font-sans text-xs text-neutral-500">{k}</div>
            <div className="font-sans text-xs text-neutral-800">{v}</div>
          </div>
        ))}

        <div className="mt-3">
          <div className="font-sans text-xs text-neutral-500 mb-1.5">Meeting Link</div>
          <div className="flex items-center border border-neutral-200">
            <div className="flex-1 px-3 py-2 font-mono text-xs truncate">
              {event.link}
            </div>
            <a
              href={event.link}
              target="_blank"
              rel="noreferrer"
              className="w-9 h-9 border-l border-neutral-200 flex items-center justify-center text-neutral-500 hover:text-black hover:bg-neutral-50 smooth"
            >
              <ExternalLink size={12} strokeWidth={1.5} />
            </a>
            <button
              onClick={copyLink}
              className="w-9 h-9 border-l border-neutral-200 flex items-center justify-center text-neutral-500 hover:text-black hover:bg-neutral-50 smooth"
              title="Copy link"
            >
              {copied ? (
                <Check size={12} strokeWidth={2} className="text-emerald-600" />
              ) : (
                <Copy size={12} strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CalendarPage() {
  const cells = buildGrid();
  const [hoveredDay, setHoveredDay] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [view, setView] = useState("Month"); // Week | Month
  const closeTimer = useRef(null);

  // Schedule a close (used on mouseleave from cell). Cancelled if we enter popover.
  const scheduleClose = () => {
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      setHoveredDay(null);
      setAnchorEl(null);
    }, 180);
  };
  const cancelClose = () => clearTimeout(closeTimer.current);

  const openFor = (day, el) => {
    cancelClose();
    setHoveredDay(day);
    setAnchorEl(el);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-10 py-6 lg:py-8 w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <h1 className="font-sans text-3xl sm:text-4xl">January 2026</h1>
        <div className="flex items-center gap-3">
          <div className="flex items-center border border-neutral-200">
            <button className="w-8 h-8 flex items-center justify-center hover:bg-neutral-50 smooth">
              <ChevronLeft size={14} strokeWidth={1.5} />
            </button>
            <div className="px-4 py-1.5 font-sans text-sm border-x border-neutral-200">
              January
            </div>
            <button className="w-8 h-8 flex items-center justify-center hover:bg-neutral-50 smooth">
              <ChevronRight size={14} strokeWidth={1.5} />
            </button>
          </div>
          <div className="flex items-center border border-neutral-200">
            <button
              onClick={() => setView("Week")}
              className={`px-3 py-1.5 font-sans text-sm smooth ${
                view === "Week" ? "bg-black text-white" : "hover:bg-neutral-50"
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setView("Month")}
              className={`px-3 py-1.5 font-sans text-sm smooth ${
                view === "Month" ? "bg-black text-white" : "hover:bg-neutral-50"
              }`}
            >
              Month
            </button>
          </div>
        </div>
      </div>

      {/* Calendar — DOW labels + cells in one continuous grid with shared borders */}
      <div className="mt-6 border border-neutral-200">
        {/* Day-of-week header row */}
        <div className="grid grid-cols-7 border-b border-neutral-200">
          {DOWS.map((d) => (
            <div
              key={d}
              className="px-3 py-2 text-[10px] font-sans tracking-widest text-neutral-500 border-r border-neutral-200 last:border-r-0"
            >
              {d}
            </div>
          ))}
        </div>

        {/* Calendar cells */}
        <div className="grid grid-cols-7">
          {cells.map((c, i) => {
            const event = c.inMonth ? CALENDAR_EVENTS[c.day] : null;
            const hasEvent = Boolean(event);
            // Determine if this cell is in the last row (no bottom border)
            const isLastRow = i >= cells.length - 7;
            // Determine if this cell is in the last column (no right border)
            const isLastCol = (i + 1) % 7 === 0;

            return (
              <div
                key={i}
                className={`relative h-24 sm:h-28 lg:h-32 p-2 sm:p-3 ${
                  !isLastRow ? "border-b border-neutral-200" : ""
                } ${!isLastCol ? "border-r border-neutral-200" : ""} ${
                  !c.inMonth ? "bg-neutral-50/40" : ""
                } ${hasEvent ? "cursor-pointer" : ""}`}
                style={
                  hasEvent
                    ? {
                        backgroundImage:
                          "repeating-linear-gradient(135deg, #f3f3f3 0px, #f3f3f3 6px, #ffffff 6px, #ffffff 12px)",
                      }
                    : undefined
                }
                onMouseEnter={(e) => hasEvent && openFor(c.day, e.currentTarget)}
                onMouseLeave={() => hasEvent && scheduleClose()}
              >
                <div
                  className={`font-sans text-xs sm:text-sm ${
                    c.inMonth ? "text-neutral-800" : "text-neutral-400"
                  }`}
                >
                  {c.day}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Popover */}
      {hoveredDay !== null && anchorEl && CALENDAR_EVENTS[hoveredDay] && (
        <div
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
        >
          <EventPopover
            event={CALENDAR_EVENTS[hoveredDay]}
            day={hoveredDay}
            anchor={anchorEl}
            onClose={() => {
              setHoveredDay(null);
              setAnchorEl(null);
            }}
          />
        </div>
      )}
    </div>
  );
}
