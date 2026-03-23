"use client";

import { useState, useEffect, useMemo } from "react";
import { useTranslations } from "next-intl";
import { MonthView } from "@/components/calendar/month-view";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import {
  format,
  addMonths,
  subMonths,
  addDays,
  isWithinInterval,
  isSameDay,
} from "date-fns";
import { sl } from "date-fns/locale";
import { useLocale } from "next-intl";
import { calculatePredictions, calculateWeightedAverage } from "@/lib/cycle/predictions";
import { CYCLE_COLORS } from "@/lib/cycle/constants";

interface DayInfo {
  isPeriod: boolean;
  isPredictedPeriod: boolean;
  isFertile: boolean;
  isOvulation: boolean;
  hasLog: boolean;
}

export default function CalendarPage() {
  const t = useTranslations("calendar");
  const locale = useLocale();
  const [month, setMonth] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [dayData, setDayData] = useState<Map<string, DayInfo>>(new Map());

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const [{ data: profile }, { data: cycles }, { data: logs }] = await Promise.all([
        supabase
          .from("profiles")
          .select("avg_cycle_length, avg_period_length")
          .eq("id", user.id)
          .single(),
        supabase
          .from("cycles")
          .select("id, start_date, end_date, cycle_length, period_length, is_predicted")
          .eq("user_id", user.id)
          .order("start_date", { ascending: false })
          .limit(12),
        supabase
          .from("daily_logs")
          .select("log_date, is_period_day")
          .eq("user_id", user.id),
      ]);

      const map = new Map<string, DayInfo>();
      const logDates = new Set(logs?.map((l) => l.log_date) || []);
      const periodDates = new Set(
        logs?.filter((l) => l.is_period_day).map((l) => l.log_date) || []
      );

      // Mark period days from logs
      periodDates.forEach((d) => {
        map.set(d, {
          isPeriod: true,
          isPredictedPeriod: false,
          isFertile: false,
          isOvulation: false,
          hasLog: true,
        });
      });

      // Mark logged days
      logDates.forEach((d) => {
        if (!map.has(d)) {
          map.set(d, {
            isPeriod: false,
            isPredictedPeriod: false,
            isFertile: false,
            isOvulation: false,
            hasLog: true,
          });
        }
      });

      // Calculate predictions from current cycle
      if (cycles && cycles.length > 0) {
        const completedCycles = cycles.filter((c) => c.cycle_length);
        const avgCycleLength =
          completedCycles.length > 0
            ? calculateWeightedAverage(completedCycles.map((c) => c.cycle_length!))
            : profile?.avg_cycle_length || 28;
        const avgPeriodLength = profile?.avg_period_length || 5;

        const currentCycle = cycles[0];
        const startDate = new Date(currentCycle.start_date);
        const predictions = calculatePredictions(startDate, avgCycleLength);

        // Mark predicted period days
        for (let i = 0; i < avgPeriodLength; i++) {
          const d = format(addDays(predictions.nextPeriodDate, i), "yyyy-MM-dd");
          if (!map.has(d) || !map.get(d)!.isPeriod) {
            map.set(d, {
              ...map.get(d),
              isPeriod: false,
              isPredictedPeriod: true,
              isFertile: false,
              isOvulation: false,
              hasLog: map.get(d)?.hasLog || false,
            });
          }
        }

        // Mark fertile window
        const fertileStart = predictions.fertileStart;
        const fertileEnd = predictions.fertileEnd;
        let current = fertileStart;
        while (current <= fertileEnd) {
          const d = format(current, "yyyy-MM-dd");
          const existing = map.get(d);
          if (!existing?.isPeriod && !existing?.isPredictedPeriod) {
            map.set(d, {
              isPeriod: false,
              isPredictedPeriod: false,
              isFertile: true,
              isOvulation: isSameDay(current, predictions.ovulationDate),
              hasLog: existing?.hasLog || false,
            });
          }
          current = addDays(current, 1);
        }

        // Mark ovulation
        const ovD = format(predictions.ovulationDate, "yyyy-MM-dd");
        const ovExisting = map.get(ovD);
        if (!ovExisting?.isPeriod) {
          map.set(ovD, {
            ...ovExisting,
            isPeriod: false,
            isPredictedPeriod: false,
            isFertile: true,
            isOvulation: true,
            hasLog: ovExisting?.hasLog || false,
          });
        }
      }

      setDayData(map);
      setLoading(false);
    }

    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps -- data is not month-specific

  const monthLabel = format(month, "LLLL yyyy", {
    locale: locale === "sl" ? sl : undefined,
  });

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48 mx-auto" />
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Month navigation */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="icon" onClick={() => setMonth(subMonths(month, 1))}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-lg font-semibold capitalize">{monthLabel}</h2>
        <Button variant="ghost" size="icon" onClick={() => setMonth(addMonths(month, 1))}>
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      <Card>
        <CardContent className="pt-4">
          <MonthView month={month} dayData={dayData} />
        </CardContent>
      </Card>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 text-xs">
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full" style={{ backgroundColor: CYCLE_COLORS.period }} />
          {t("legend.period")}
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full" style={{ backgroundColor: CYCLE_COLORS.predictedPeriod }} />
          {t("legend.predicted")}
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full" style={{ backgroundColor: CYCLE_COLORS.fertile }} />
          {t("legend.fertile")}
        </div>
        <div className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full" style={{ backgroundColor: CYCLE_COLORS.ovulation }} />
          {t("legend.ovulation")}
        </div>
      </div>
    </div>
  );
}
