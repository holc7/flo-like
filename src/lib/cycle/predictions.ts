import {
  LUTEAL_PHASE_LENGTH,
  FERTILE_WINDOW_BEFORE_OVULATION,
  FERTILE_WINDOW_AFTER_OVULATION,
  DEFAULT_CYCLE_LENGTH,
} from "./constants";
import { addDays } from "date-fns";

export interface CyclePredictions {
  nextPeriodDate: Date;
  ovulationDate: Date;
  fertileStart: Date;
  fertileEnd: Date;
}

/**
 * Calculate weighted moving average of cycle lengths.
 * Recent cycles are weighted more heavily.
 */
export function calculateWeightedAverage(cycleLengths: number[]): number {
  if (cycleLengths.length === 0) return DEFAULT_CYCLE_LENGTH;
  if (cycleLengths.length === 1) return cycleLengths[0];

  // Most recent cycles get higher weight
  const weights = cycleLengths.map((_, i) => i + 1);
  const totalWeight = weights.reduce((sum, w) => sum + w, 0);

  const weightedSum = cycleLengths.reduce(
    (sum, length, i) => sum + length * weights[i],
    0
  );

  return Math.round(weightedSum / totalWeight);
}

/**
 * Calculate predictions based on cycle start date and average cycle length.
 */
export function calculatePredictions(
  cycleStartDate: Date,
  avgCycleLength: number
): CyclePredictions {
  const nextPeriodDate = addDays(cycleStartDate, avgCycleLength);
  const ovulationDate = addDays(
    cycleStartDate,
    avgCycleLength - LUTEAL_PHASE_LENGTH
  );
  const fertileStart = addDays(
    ovulationDate,
    -FERTILE_WINDOW_BEFORE_OVULATION
  );
  const fertileEnd = addDays(ovulationDate, FERTILE_WINDOW_AFTER_OVULATION);

  return {
    nextPeriodDate,
    ovulationDate,
    fertileStart,
    fertileEnd,
  };
}

/**
 * Determine current cycle phase based on cycle day and predictions.
 */
export function getCurrentPhase(
  cycleDay: number,
  avgCycleLength: number,
  avgPeriodLength: number
): "menstrual" | "follicular" | "ovulation" | "luteal" {
  if (cycleDay <= avgPeriodLength) return "menstrual";

  const ovulationDay = avgCycleLength - LUTEAL_PHASE_LENGTH;

  if (cycleDay >= ovulationDay - 1 && cycleDay <= ovulationDay + 1)
    return "ovulation";
  if (cycleDay < ovulationDay - 1) return "follicular";
  return "luteal";
}

/**
 * Calculate the current cycle day from the start date.
 */
export function getCycleDay(cycleStartDate: Date, today: Date): number {
  const diffTime = today.getTime() - cycleStartDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays + 1; // Day 1 is the start date
}
