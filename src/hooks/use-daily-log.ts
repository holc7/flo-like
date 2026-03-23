"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { format } from "date-fns";
import type { DailyLogInput } from "@/lib/validators";

interface DailyLog {
  id: string;
  logDate: string;
  isPeriodDay: boolean;
  flowIntensity: number | null;
  mood: number | null;
  energyLevel: number | null;
  painLevel: number | null;
  sleepQuality: number | null;
  physicalSymptoms: string[];
  emotionalSymptoms: string[];
  exercise: boolean;
  intimacy: boolean;
  cervicalMucus: string | null;
  notes: string | null;
}

export function useDailyLog(date: Date) {
  const [log, setLog] = useState<DailyLog | null>(null);
  const [loading, setLoading] = useState(true);

  const dateStr = format(date, "yyyy-MM-dd");

  const fetchLog = useCallback(async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from("daily_logs")
      .select("*")
      .eq("user_id", user.id)
      .eq("log_date", dateStr)
      .single();

    if (data) {
      setLog({
        id: data.id,
        logDate: data.log_date,
        isPeriodDay: data.is_period_day,
        flowIntensity: data.flow_intensity,
        mood: data.mood,
        energyLevel: data.energy_level,
        painLevel: data.pain_level,
        sleepQuality: data.sleep_quality,
        physicalSymptoms: data.physical_symptoms || [],
        emotionalSymptoms: data.emotional_symptoms || [],
        exercise: data.exercise || false,
        intimacy: data.intimacy || false,
        cervicalMucus: data.cervical_mucus,
        notes: data.notes,
      });
    } else {
      setLog(null);
    }
    setLoading(false);
  }, [dateStr]);

  useEffect(() => {
    fetchLog();
  }, [fetchLog]);

  async function saveLog(input: DailyLogInput) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const payload = {
      user_id: user.id,
      log_date: input.logDate,
      is_period_day: input.isPeriodDay,
      flow_intensity: input.isPeriodDay ? input.flowIntensity : null,
      mood: input.mood,
      energy_level: input.energyLevel,
      pain_level: input.painLevel,
      sleep_quality: input.sleepQuality,
      physical_symptoms: input.physicalSymptoms,
      emotional_symptoms: input.emotionalSymptoms,
      exercise: input.exercise,
      intimacy: input.intimacy,
      cervical_mucus: input.cervicalMucus,
      notes: input.notes,
    };

    if (log?.id) {
      await supabase.from("daily_logs").update(payload).eq("id", log.id);
    } else {
      await supabase.from("daily_logs").upsert(payload, {
        onConflict: "user_id,log_date",
      });
    }

    await fetchLog();
  }

  return { log, loading, saveLog, refetch: fetchLog };
}
