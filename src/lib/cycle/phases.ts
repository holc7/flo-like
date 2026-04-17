import type { CyclePhase } from "./constants";
import { CYCLE_COLORS } from "./constants";

/** Returns a CSS custom property reference — works across brand variants & dark mode. */
export function getPhaseColor(phase: CyclePhase): string {
  switch (phase) {
    case "menstrual":
      return CYCLE_COLORS.period;
    case "follicular":
      return CYCLE_COLORS.primary;
    case "ovulation":
      return CYCLE_COLORS.ovulation;
    case "luteal":
      return CYCLE_COLORS.fertile;
  }
}

/** No emoji — Cikel uses a warm, editorial tone. Short label instead. */
export function getPhaseShortLabel(phase: CyclePhase, locale: "sl" | "en" | "hr" = "sl"): string {
  const labels = {
    sl: { menstrual: "Menstrualna", follicular: "Folikularna", ovulation: "Ovulacija", luteal: "Lutealna" },
    en: { menstrual: "Menstrual",   follicular: "Follicular",  ovulation: "Ovulation", luteal: "Luteal"   },
    hr: { menstrual: "Menstrualna", follicular: "Folikularna", ovulation: "Ovulacija", luteal: "Lutealna" },
  } as const;
  return labels[locale][phase];
}

/** @deprecated Use getPhaseShortLabel — emoji removed from Cikel design system */
export function getPhaseEmoji(phase: CyclePhase): string {
  switch (phase) {
    case "menstrual":
      return "🩸";
    case "follicular":
      return "🌱";
    case "ovulation":
      return "🥚";
    case "luteal":
      return "🌙";
  }
}
