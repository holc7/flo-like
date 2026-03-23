import type { CyclePhase } from "./constants";
import { CYCLE_COLORS } from "./constants";

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
