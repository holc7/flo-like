// Cikel — cycle phase colors reference CSS custom properties (see globals.css)
// so they automatically adapt to the active brand + dark mode.

export const CYCLE_COLORS = {
  period: "var(--flow)",
  predictedPeriod: "var(--flow-soft)",
  fertile: "var(--fertile)",
  ovulation: "var(--ovulation)",
  background: "var(--bg)",
  primary: "var(--accent)",
} as const;

export const DEFAULT_CYCLE_LENGTH = 28;
export const DEFAULT_PERIOD_LENGTH = 5;
export const LUTEAL_PHASE_LENGTH = 14;
export const FERTILE_WINDOW_BEFORE_OVULATION = 5;
export const FERTILE_WINDOW_AFTER_OVULATION = 1;

export const PHYSICAL_SYMPTOMS = [
  "cramps",
  "headache",
  "bloating",
  "breast_tenderness",
  "backache",
  "nausea",
  "fatigue",
  "acne",
  "dizziness",
  "hot_flashes",
] as const;

export const EMOTIONAL_SYMPTOMS = [
  "anxious",
  "irritable",
  "sad",
  "happy",
  "sensitive",
  "mood_swings",
  "calm",
  "stressed",
  "confident",
  "emotional",
] as const;

export type CyclePhase = "menstrual" | "follicular" | "ovulation" | "luteal";
export type CervicalMucusType =
  | "dry"
  | "sticky"
  | "creamy"
  | "watery"
  | "egg_white";

export type BrandVariant = "gozd" | "glina" | "sliva";
