"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import {
  calculatePredictions,
  calculateWeightedAverage,
  getCycleDay,
  getCurrentPhase,
} from "@/lib/cycle/predictions";
import type { CyclePhase } from "@/lib/cycle/constants";
import { DEFAULT_CYCLE_LENGTH, DEFAULT_PERIOD_LENGTH } from "@/lib/cycle/constants";

interface CycleData {
  currentCycle: {
    id: string;
    startDate: Date;
    endDate: Date | null;
    periodLength: number | null;
  } | null;
  cycleDay: number;
  phase: CyclePhase;
  avgCycleLength: number;
  avgPeriodLength: number;
  predictions: {
    nextPeriodDate: Date;
    ovulationDate: Date;
    fertileStart: Date;
    fertileEnd: Date;
  } | null;
  isOnPeriod: boolean;
  loading: boolean;
}

export function useCycleData() {
  const [data, setData] = useState<CycleData>({
    currentCycle: null,
    cycleDay: 1,
    phase: "follicular",
    avgCycleLength: DEFAULT_CYCLE_LENGTH,
    avgPeriodLength: DEFAULT_PERIOD_LENGTH,
    predictions: null,
    isOnPeriod: false,
    loading: true,
  });

  const fetchData = useCallback(async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Fetch profile and cycles in parallel
    const [{ data: profile }, { data: cycles }] = await Promise.all([
      supabase
        .from("profiles")
        .select("avg_cycle_length, avg_period_length, last_period_start")
        .eq("id", user.id)
        .single(),
      supabase
        .from("cycles")
        .select("id, start_date, end_date, cycle_length, period_length, is_predicted")
        .eq("user_id", user.id)
        .eq("is_predicted", false)
        .order("start_date", { ascending: false })
        .limit(12),
    ]);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const avgCycleLength = profile?.avg_cycle_length || DEFAULT_CYCLE_LENGTH;
    const avgPeriodLength = profile?.avg_period_length || DEFAULT_PERIOD_LENGTH;

    // Compute weighted average from actual cycle data
    const completedCycles = cycles?.filter((c) => c.cycle_length) || [];
    const effectiveCycleLength =
      completedCycles.length > 0
        ? calculateWeightedAverage(completedCycles.map((c) => c.cycle_length!))
        : avgCycleLength;

    const currentCycle = cycles?.[0] || null;

    if (currentCycle) {
      const startDate = new Date(currentCycle.start_date);
      const cycleDay = getCycleDay(startDate, today);
      const phase = getCurrentPhase(cycleDay, effectiveCycleLength, avgPeriodLength);
      const predictions = calculatePredictions(startDate, effectiveCycleLength);

      // Check if currently on period — if no end_date and no period_length recorded, period is still active
      const isOnPeriod = currentCycle.end_date === null && currentCycle.period_length === null;

      setData({
        currentCycle: {
          id: currentCycle.id,
          startDate,
          endDate: currentCycle.end_date ? new Date(currentCycle.end_date) : null,
          periodLength: currentCycle.period_length,
        },
        cycleDay,
        phase,
        avgCycleLength: effectiveCycleLength,
        avgPeriodLength,
        predictions,
        isOnPeriod,
        loading: false,
      });
    } else {
      setData({
        currentCycle: null,
        cycleDay: 1,
        phase: "follicular",
        avgCycleLength: effectiveCycleLength,
        avgPeriodLength,
        predictions: null,
        isOnPeriod: false,
        loading: false,
      });
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { ...data, refetch: fetchData };
}
