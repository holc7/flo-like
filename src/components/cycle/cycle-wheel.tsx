"use client";

import { getPhaseColor } from "@/lib/cycle/phases";
import type { CyclePhase } from "@/lib/cycle/constants";

interface CycleWheelProps {
  cycleDay: number;
  cycleLength: number;
  periodLength: number;
  phase: CyclePhase;
}

export function CycleWheel({
  cycleDay,
  cycleLength,
  periodLength,
  phase,
}: CycleWheelProps) {
  const size = 260;
  const strokeWidth = 2;
  const radius = (size - strokeWidth) / 2 - 8;
  const center = size / 2;

  const ovulationDay = cycleLength - 14;
  const fertileStartDay = ovulationDay - 5;
  const fertileEndDay = ovulationDay + 1;

  const dayAngle = ((cycleDay - 1) / cycleLength) * 360 - 90;
  const dayRad = (dayAngle * Math.PI) / 180;
  const dayX = center + radius * Math.cos(dayRad);
  const dayY = center + radius * Math.sin(dayRad);

  function describeArc(startDay: number, endDay: number, r: number): string {
    const startAngle = ((startDay - 1) / cycleLength) * 360 - 90;
    const endAngle = ((endDay - 1) / cycleLength) * 360 - 90;
    const start = (startAngle * Math.PI) / 180;
    const end = (endAngle * Math.PI) / 180;
    const x1 = center + r * Math.cos(start);
    const y1 = center + r * Math.sin(start);
    const x2 = center + r * Math.cos(end);
    const y2 = center + r * Math.sin(end);
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`;
  }

  return (
    <div className="flex items-center justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Base thin ring */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="var(--border)"
          strokeWidth={strokeWidth}
        />

        {/* Period arc (thicker, warm flow tone) */}
        <path
          d={describeArc(1, periodLength + 1, radius)}
          fill="none"
          stroke="var(--flow)"
          strokeWidth={8}
          strokeLinecap="round"
        />

        {/* Fertile window arc */}
        <path
          d={describeArc(fertileStartDay, fertileEndDay + 1, radius)}
          fill="none"
          stroke="var(--fertile)"
          strokeWidth={8}
          strokeLinecap="round"
          opacity="0.85"
        />

        {/* Ovulation dot */}
        {(() => {
          const a = (((ovulationDay - 1) / cycleLength) * 360 - 90) * (Math.PI / 180);
          return (
            <circle
              cx={center + radius * Math.cos(a)}
              cy={center + radius * Math.sin(a)}
              r={5}
              fill="var(--ovulation)"
            />
          );
        })()}

        {/* Current day marker */}
        <circle cx={dayX} cy={dayY} r={10} fill={getPhaseColor(phase)} />
        <circle cx={dayX} cy={dayY} r={4} fill="var(--surface)" />

        {/* Center numerals — Fraunces display */}
        <text
          x={center}
          y={center + 4}
          textAnchor="middle"
          fill="var(--ink)"
          style={{ fontFamily: "var(--font-serif)", fontWeight: 500, fontSize: 56, letterSpacing: "-0.03em" }}
        >
          {cycleDay}
        </text>
        <text
          x={center}
          y={center + 30}
          textAnchor="middle"
          fill="var(--ink-muted)"
          style={{ fontFamily: "var(--font-sans)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase" }}
        >
          dan cikla
        </text>
      </svg>
    </div>
  );
}
