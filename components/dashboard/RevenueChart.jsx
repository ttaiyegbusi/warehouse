"use client";

import { useState } from "react";
import { REVENUE } from "@/lib/mockData";

export default function RevenueChart() {
  const [hoverIdx, setHoverIdx] = useState(null);
  const W = 920;
  const H = 320;
  const padL = 50, padR = 20, padT = 20, padB = 36;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;
  const step = innerW / REVENUE.length;
  const barW = 10;
  const gap = 4;

  const yTicks = [0, 1000, 2000, 3000, 4000, 5000];

  return (
    <div className="relative">
      <svg className="chart-svg" viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: "block" }}>
        {yTicks.map((t) => {
          const cap = 5000;
          const y = padT + innerH - (t / cap) * innerH;
          return (
            <g key={t}>
              <line x1={padL} x2={W - padR} y1={y} y2={y} stroke="#eaeaea" strokeDasharray="2 3" />
              <text x={padL - 8} y={y + 4} textAnchor="end" className="font-mono" fontSize="11" fill="#9a9a9a">
                {t}
              </text>
            </g>
          );
        })}

        {REVENUE.map((d, i) => {
          const cap = 5000;
          const cx = padL + step * i + step / 2;
          const lastH = (d.last / cap) * innerH;
          const curH  = (d.current / cap) * innerH;
          const yLast = padT + innerH - lastH;
          const yCur  = padT + innerH - curH;
          const xLast = cx - barW - gap / 2;
          const xCur  = cx + gap / 2;
          const active = hoverIdx === i;
          return (
            <g
              key={d.m}
              className={`bar-group ${active ? "active" : ""}`}
              onMouseEnter={() => setHoverIdx(i)}
              onMouseLeave={() => setHoverIdx(null)}
            >
              <rect x={cx - step / 2} y={padT} width={step} height={innerH} fill="transparent" />
              <rect x={xLast} y={yLast} width={barW} height={lastH} fill="#d4d4d4" />
              <rect x={xCur}  y={yCur}  width={barW} height={curH}  fill="#0a0a0a" />
              <text x={cx} y={H - 12} textAnchor="middle" className="font-mono" fontSize="11" fill="#737373">
                {d.m}
              </text>
            </g>
          );
        })}

        {hoverIdx !== null && (
          <line
            x1={padL + step * hoverIdx + step / 2}
            x2={padL + step * hoverIdx + step / 2}
            y1={padT}
            y2={padT + innerH}
            stroke="#0a0a0a"
            strokeDasharray="2 3"
            opacity="0.25"
          />
        )}
      </svg>

      {hoverIdx !== null && (() => {
        const d = REVENUE[hoverIdx];
        const left = ((padL + step * hoverIdx + step / 2) / W) * 100;
        return (
          <div
            className="absolute -translate-x-1/2 -translate-y-full pointer-events-none bg-white border border-neutral-300 px-3 py-2 shadow-lg"
            style={{ left: `${left}%`, top: 30 }}
          >
            <div className="font-sans text-[11px] text-neutral-500 uppercase tracking-wider">{d.m}</div>
            <div className="mt-1 flex items-center gap-2 font-mono text-xs">
              <span className="w-2 h-2 bg-black inline-block"></span>
              <span>Current</span>
              <span className="ml-auto pl-3">${d.current.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs mt-0.5">
              <span className="w-2 h-2 bg-neutral-300 inline-block"></span>
              <span>Last</span>
              <span className="ml-auto pl-3">${d.last.toLocaleString()}</span>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
