"use client";

import { useTranslations } from "next-intl";
import { useCycleData } from "@/hooks/use-cycle-data";
import { CycleWheel } from "@/components/cycle/cycle-wheel";
import { PhaseBadge } from "@/components/cycle/phase-badge";
import { PeriodToggle } from "@/components/cycle/period-toggle";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@/lib/i18n/navigation";
import { PenSquare, Calendar, Droplets, Egg } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { format, differenceInDays } from "date-fns";
import { useState } from "react";

export default function DashboardPage() {
  const t = useTranslations("dashboard");
  const tc = useTranslations("common");
  const tNav = useTranslations("nav");
  const {
    currentCycle,
    cycleDay,
    phase,
    avgCycleLength,
    avgPeriodLength,
    predictions,
    isOnPeriod,
    loading,
    refetch,
  } = useCycleData();
  const [toggling, setToggling] = useState(false);

  async function handlePeriodToggle() {
    setToggling(true);
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const today = format(new Date(), "yyyy-MM-dd");

      if (isOnPeriod && currentCycle) {
        // End period: set end_date and period_length
        const periodLength = differenceInDays(new Date(), currentCycle.startDate) + 1;
        await supabase
          .from("cycles")
          .update({ end_date: today, period_length: periodLength })
          .eq("id", currentCycle.id);
      } else {
        // Start new period: close previous cycle and create new one
        if (currentCycle) {
          const cycleLength = differenceInDays(new Date(), currentCycle.startDate);
          await supabase
            .from("cycles")
            .update({ cycle_length: cycleLength })
            .eq("id", currentCycle.id);
        }

        await Promise.all([
          supabase.from("cycles").insert({
            user_id: user.id,
            start_date: today,
          }),
          supabase.from("daily_logs").upsert(
            {
              user_id: user.id,
              log_date: today,
              is_period_day: true,
              flow_intensity: 3,
            },
            { onConflict: "user_id,log_date" }
          ),
        ]);
      }

      await refetch();
    } finally {
      setToggling(false);
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="mx-auto h-[220px] w-[220px] rounded-full" />
        <Skeleton className="h-24 w-full rounded-xl" />
        <Skeleton className="h-12 w-full rounded-lg" />
      </div>
    );
  }

  const daysUntilPeriod = predictions
    ? differenceInDays(predictions.nextPeriodDate, new Date())
    : null;

  return (
    <div className="space-y-6">
      {/* Cycle Wheel */}
      {currentCycle ? (
        <CycleWheel
          cycleDay={cycleDay}
          cycleLength={avgCycleLength}
          periodLength={avgPeriodLength}
          phase={phase}
        />
      ) : (
        <div className="flex h-[220px] items-center justify-center">
          <p className="text-center text-sm text-muted-foreground">
            {t("noPredictions")}
          </p>
        </div>
      )}

      {/* Phase badge */}
      <div className="flex justify-center">
        <PhaseBadge phase={phase} />
      </div>

      {/* Predictions */}
      {predictions && (
        <div className="grid grid-cols-2 gap-3">
          <Card>
            <CardContent className="flex flex-col items-center p-4">
              <Droplets className="mb-1 h-5 w-5 text-period" />
              <p className="text-xs text-muted-foreground">{t("nextPeriod")}</p>
              <p className="font-semibold">
                {daysUntilPeriod !== null && daysUntilPeriod > 0
                  ? `${daysUntilPeriod} ${tc("days")}`
                  : t("periodToday")}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex flex-col items-center p-4">
              <Egg className="mb-1 h-5 w-5 text-ovulation" />
              <p className="text-xs text-muted-foreground">{t("ovulation")}</p>
              <p className="font-semibold">
                {format(predictions.ovulationDate, "d. M.")}
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Period toggle */}
      <PeriodToggle
        isOnPeriod={isOnPeriod}
        onToggle={handlePeriodToggle}
        disabled={toggling}
      />

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-3">
        <Link href="/log">
          <Button variant="outline" className="w-full gap-2">
            <PenSquare className="h-4 w-4" />
            {t("logToday")}
          </Button>
        </Link>
        <Link href="/calendar">
          <Button variant="outline" className="w-full gap-2">
            <Calendar className="h-4 w-4" />
            {tNav("calendar")}
          </Button>
        </Link>
      </div>
    </div>
  );
}
