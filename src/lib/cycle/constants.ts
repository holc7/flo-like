export const CYCLE_COLORS = {
  period: "#E57373",
  predictedPeriod: "#F8BBD0",
  fertile: "#81C784",
  ovulation: "#4FC3F7",
  background: "#FFF8F9",
  primary: "#E8A0BF",
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
