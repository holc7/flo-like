"use client";

import { CYCLE_COLORS } from "@/lib/cycle/constants";
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
  const size = 220;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;

  // Calculate segments
  const periodAngle = (periodLength / cycleLength) * 360;
  const ovulationDay = cycleLength - 14;
  const fertileStartDay = ovulationDay - 5;
  const fertileEndDay = ovulationDay + 1;
  const fertileAngle = ((fertileEndDay - fertileStartDay) / cycleLength) * 360;
  const fertileStartAngle = (fertileStartDay / cycleLength) * 360;

  // Current day position
  const dayAngle = ((cycleDay - 1) / cycleLength) * 360 - 90;
  const dayRad = (dayAngle * Math.PI) / 180;
  const indicatorRadius = radius - 20;
  const dayX = center + indicatorRadius * Math.cos(dayRad);
  const dayY = center + indicatorRadius * Math.sin(dayRad);

  function describeArc(startAngle: number, endAngle: number): string {
    const start = ((startAngle - 90) * Math.PI) / 180;
    const end = ((endAngle - 90) * Math.PI) / 180;
    const x1 = center + radius * Math.cos(start);
    const y1 = center + radius * Math.sin(start);
    const x2 = center + radius * Math.cos(end);
    const y2 = center + radius * Math.sin(end);
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`;
  }

  const phaseColors: Record<CyclePhase, string> = {
    menstrual: CYCLE_COLORS.period,
    follicular: CYCLE_COLORS.primary,
    ovulation: CYCLE_COLORS.ovulation,
    luteal: CYCLE_COLORS.fertile,
  };

  return (
    <div className="flex items-center justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-muted"
        />

        {/* Period segment */}
        <path
          d={describeArc(0, periodAngle)}
          fill="none"
          stroke={CYCLE_COLORS.period}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Fertile window segment */}
        <path
          d={describeArc(fertileStartAngle, fertileStartAngle + fertileAngle)}
          fill="none"
          stroke={CYCLE_COLORS.fertile}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Ovulation dot */}
        {(() => {
          const ovAngle = ((ovulationDay / cycleLength) * 360 - 90) * (Math.PI / 180);
          return (
            <circle
              cx={center + radius * Math.cos(ovAngle)}
              cy={center + radius * Math.sin(ovAngle)}
              r={strokeWidth / 2 + 2}
              fill={CYCLE_COLORS.ovulation}
            />
          );
        })()}

        {/* Day indicator */}
        <circle
          cx={dayX}
          cy={dayY}
          r={8}
          fill={phaseColors[phase]}
          stroke="white"
          strokeWidth={3}
        />

        {/* Center text */}
        <text
          x={center}
          y={center - 8}
          textAnchor="middle"
          className="fill-foreground text-3xl font-bold"
          fontSize="32"
          fontWeight="bold"
        >
          {cycleDay}
        </text>
        <text
          x={center}
          y={center + 16}
          textAnchor="middle"
          className="fill-muted-foreground text-xs"
          fontSize="12"
        >
          / {cycleLength}
        </text>
      </svg>
    </div>
  );
}
