"use client";

import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import type { CyclePhase } from "@/lib/cycle/constants";
import { getPhaseColor, getPhaseEmoji } from "@/lib/cycle/phases";

interface PhaseBadgeProps {
  phase: CyclePhase;
}

export function PhaseBadge({ phase }: PhaseBadgeProps) {
  const t = useTranslations("dashboard.phases");
  const color = getPhaseColor(phase);

  return (
    <Badge
      className="text-sm px-3 py-1"
      style={{ backgroundColor: `${color}20`, color, borderColor: color }}
    >
      {getPhaseEmoji(phase)} {t(phase)}
    </Badge>
  );
}
