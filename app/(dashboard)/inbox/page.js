"use client";

import { useState } from "react";
import {
  Paperclip,
  X,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Quote,
  List as ListIcon,
  ListOrdered,
  Smile,
  Image as ImageIcon,
  FileText,
  Trash2,
  ChevronDown,
} from "lucide-react";
import { INBOX } from "@/lib/mockData";
import { useSkeletonLoad } from "@/lib/useSkeletonLoad";
import { InboxSkeleton } from "@/components/dashboard/PageSkeletons";

/* --- Full-width row (when not composing) --- */
function InboxRow({ msg }) {
  return (
    <div className="row-hover grid grid-cols-[24px_1fr_auto] sm:grid-cols-[24px_220px_1fr_120px_80px] gap-3 sm:gap-4 items-center py-3 px-2 border-b border-neutral-100">
      <input
        type="checkbox"
        className="accent-black"
        onChange={(e) => e.stopPropagation()}
      />
      <div className="font-sans text-sm truncate">{msg.from}</div>
      <div className="font-sans text-sm text-neutral-700 truncate hidden sm:block">
        {msg.subject}
      </div>
      <div className="hidden sm:flex items-center gap-2 justify-end">
        {msg.attach && (
          <span className="w-7 h-7 border border-neutral-200 flex items-center justify-center">
            <Paperclip size={12} strokeWidth={1.5} />
          </span>
        )}
        <span className="text-[11px] font-sans border border-neutral-200 px-2 py-1 bg-white">
          {msg.tag}
        </span>
      </div>
      <div className="font-mono text-xs text-neutral-400 text-right">8:03 AM</div>
    </div>
  );
}

/* --- Compact row (when compose pane is open) --- */
function CompactRow({ msg, active, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`grid grid-cols-[20px_1fr_auto] gap-3 items-center py-2.5 px-3 border-b border-neutral-100 cursor-pointer smooth ${
        active ? "bg-neutral-100" : "hover:bg-neutral-50"
      }`}
    >
      <input
        type="checkbox"
        className="accent-black"
        onClick={(e) => e.stopPropagation()}
        readOnly
      />
      <div className="min-w-0">
        <div className="font-sans text-sm truncate">{msg.from}</div>
        <div className="font-sans text-xs text-neutral-500 truncate mt-0.5">
          {msg.subject}
        </div>
      </div>
      <div className="font-mono text-[10px] text-neutral-400 shrink-0">8:03 AM</div>
    </div>
  );
}

/* --- Compose pane --- */
function ComposePane({ onClose }) {
  const [to, setTo] = useState([
    "opeoluwaade@gmail.com",
    "johnbakare@gmail.com",
    "ola@gmail.com",
    "yelebadamosi@gmail.com",
    "stel@yahoo.com",
    "jasontukor@gmail.com",
  ]);
  const [from, setFrom] = useState(["aiyegbusitope@gmail.com"]);
  const [subject, setSubject] = useState("Operation Weekend Madness 😅🌴");
  const [body, setBody] = useState(
    `Hey Guys

Hope you've been good! I've been counting down to the weekend like it's Christmas, and I just wanted to lock in our plans before either of us gets swallowed by "I'll rest this weekend" lies again.

So here's the game plan: let's meet around 2 PM on Saturday and hit Elegushi Beach. I'm thinking we bring some snacks, music, and maybe even a little football or card game to keep things fun. Afterwards, we can grab something to eat — maybe that new spot you mentioned last week.

Also, please remind me to actually wear sunscreen this time. Last time I went to the beach, I came back looking like roasted plantain. I'm not doing that again.

If you're in, let me know so I can plan my weekend around it. And if you have any better ideas, I'm totally down to switch things up — as long as it doesn't involve climbing a mountain or anything that requires running (I'm strictly in my chill era).

Can't wait to hang out, laugh, and pretend we're on vacation for a few hours. It's been way too long since we had one of our random adventures.

Talk soon,
Temitope 😎`
  );

  const Pill = ({ email, onRemove }) => (
    <span className="inline-flex items-center gap-1.5 border border-neutral-200 bg-neutral-50 px-2 py-1 text-xs font-sans">
      {email}
      <button
        onClick={onRemove}
        className="text-neutral-400 hover:text-black smooth"
      >
        <X size={10} strokeWidth={2} />
      </button>
    </span>
  );

  return (
    <div className="flex-1 flex flex-col bg-white min-w-0">
      {/* Header rows */}
      <div className="px-4 sm:px-6 py-3 border-b border-neutral-100">
        <div className="flex items-center gap-3 py-1">
          <div className="text-xs font-sans text-neutral-500 w-12 shrink-0">From:</div>
          <div className="flex flex-wrap gap-1.5 flex-1">
            {from.map((e) => (
              <Pill
                key={e}
                email={e}
                onRemove={() => setFrom(from.filter((x) => x !== e))}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 py-3 border-b border-neutral-100">
        <div className="flex items-start gap-3 py-1">
          <div className="text-xs font-sans text-neutral-500 w-12 shrink-0 mt-1.5">To:</div>
          <div className="flex flex-wrap gap-1.5 flex-1">
            {to.map((e) => (
              <Pill
                key={e}
                email={e}
                onRemove={() => setTo(to.filter((x) => x !== e))}
              />
            ))}
          </div>
          <div className="flex items-center gap-2 shrink-0 mt-1">
            <button className="text-xs font-sans text-neutral-500 hover:text-black smooth">
              Cc
            </button>
            <button className="text-xs font-sans text-neutral-500 hover:text-black smooth">
              Bcc
            </button>
            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-black smooth ml-1"
              title="Close compose"
            >
              <X size={14} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>

      {/* Subject */}
      <div className="px-4 sm:px-6 py-3 border-b border-neutral-100 flex items-center gap-3">
        <div className="text-xs font-sans text-neutral-500 w-12 shrink-0">Subject:</div>
        <input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="flex-1 bg-transparent outline-none font-sans text-sm"
        />
      </div>

      {/* Body */}
      <div className="flex-1 relative overflow-auto">
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full h-full px-4 sm:px-6 py-4 resize-none outline-none font-sans text-sm leading-relaxed text-neutral-800"
        />

        {/* Floating formatting toolbar */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-[58%] items-center gap-1 bg-white border border-neutral-200 shadow-md px-2 py-1.5 text-neutral-600">
          <button className="px-2 py-1 hover:bg-neutral-50 smooth flex items-center gap-1 font-sans text-xs">
            IBM Plex Sans <ChevronDown size={10} strokeWidth={1.5} />
          </button>
          <div className="w-px h-4 bg-neutral-200 mx-1" />
          <ToolBtn><Bold size={12} strokeWidth={2} /></ToolBtn>
          <ToolBtn><Italic size={12} strokeWidth={1.5} /></ToolBtn>
          <ToolBtn><Underline size={12} strokeWidth={1.5} /></ToolBtn>
          <ToolBtn><Strikethrough size={12} strokeWidth={1.5} /></ToolBtn>
          <div className="w-px h-4 bg-neutral-200 mx-1" />
          <ToolBtn><Quote size={12} strokeWidth={1.5} /></ToolBtn>
          <ToolBtn><ListOrdered size={12} strokeWidth={1.5} /></ToolBtn>
          <ToolBtn><ListIcon size={12} strokeWidth={1.5} /></ToolBtn>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 sm:px-6 py-3 border-t border-neutral-200 flex items-center gap-3 shrink-0">
        <input
          placeholder="Send a message…"
          className="flex-1 bg-transparent outline-none font-sans text-sm placeholder-neutral-400 min-w-0"
        />
        <div className="flex items-center gap-1 text-neutral-500">
          <ToolBtn><Smile size={14} strokeWidth={1.5} /></ToolBtn>
          <ToolBtn><FileText size={14} strokeWidth={1.5} /></ToolBtn>
          <ToolBtn><Paperclip size={14} strokeWidth={1.5} /></ToolBtn>
          <ToolBtn><ImageIcon size={14} strokeWidth={1.5} /></ToolBtn>
          <ToolBtn><Trash2 size={14} strokeWidth={1.5} /></ToolBtn>
        </div>
        <button className="bg-black text-white px-4 py-2 text-sm font-sans hover:bg-neutral-800 smooth flex items-center gap-1.5">
          Send <ChevronDown size={12} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}

function ToolBtn({ children }) {
  return (
    <button className="w-6 h-6 flex items-center justify-center hover:bg-neutral-100 smooth">
      {children}
    </button>
  );
}

/* --- Page --- */
export default function InboxPage() {
  const loading = useSkeletonLoad();
  const [composing, setComposing] = useState(false);
  const [selectedKey, setSelectedKey] = useState(null);

  if (loading) return <InboxSkeleton />;

  if (composing) {
    // Flatten messages with stable keys for selection highlighting
    return (
      <div className="flex flex-1 min-h-0">
        {/* Left: compact list */}
        <div className="w-full sm:w-[340px] md:w-[380px] shrink-0 border-r border-neutral-200 overflow-y-auto">
          <div className="px-3 py-3 sticky top-0 bg-white border-b border-neutral-100 flex items-center justify-between z-10">
            <div className="text-sm font-sans">Today</div>
            <button
              onClick={() => setComposing(true)}
              className="text-sm font-sans hover:text-black smooth"
            >
              Create New +
            </button>
          </div>
          {Object.entries(INBOX).flatMap(([group, items]) =>
            items.map((m, i) => {
              const key = `${group}-${i}`;
              return (
                <CompactRow
                  key={key}
                  msg={m}
                  active={selectedKey === key}
                  onClick={() => setSelectedKey(key)}
                />
              );
            })
          )}
        </div>

        {/* Right: compose */}
        <div className="hidden sm:flex flex-1 min-w-0 min-h-0">
          <ComposePane onClose={() => setComposing(false)} />
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-10 py-6 lg:py-8 w-full">
      <div className="flex justify-end">
        <button
          onClick={() => setComposing(true)}
          className="font-sans text-sm hover:text-black smooth"
        >
          Create New +
        </button>
      </div>
      {Object.entries(INBOX).map(([group, items]) => (
        <div key={group} className="mt-6">
          <div className="text-sm font-sans text-neutral-800 mb-2">{group}</div>
          <div>
            {items.map((m, i) => (
              <InboxRow key={i} msg={m} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
