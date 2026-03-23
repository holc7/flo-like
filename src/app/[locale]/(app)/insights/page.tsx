"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { createClient } from "@/lib/supabase/client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CYCLE_COLORS } from "@/lib/cycle/constants";

interface CycleInfo {
  label: string;
  cycleLength: number;
}

interface SymptomCount {
  name: string;
  count: number;
}

export default function InsightsPage() {
  const t = useTranslations("insights");
  const tLog = useTranslations("log");
  const tc = useTranslations("common");
  const [loading, setLoading] = useState(true);
  const [avgCycleLength, setAvgCycleLength] = useState(0);
  const [avgPeriodLength, setAvgPeriodLength] = useState(0);
  const [cycleLengths, setCycleLengths] = useState<CycleInfo[]>([]);
  const [symptomCounts, setSymptomCounts] = useState<SymptomCount[]>([]);

  useEffect(() => {
    async function fetchInsights() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Fetch cycles and symptom data in parallel
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

      const [{ data: cycles }, { data: logs }] = await Promise.all([
        supabase
          .from("cycles")
          .select("start_date, cycle_length, period_length")
          .eq("user_id", user.id)
          .eq("is_predicted", false)
          .not("cycle_length", "is", null)
          .order("start_date", { ascending: true })
          .limit(12),
        supabase
          .from("daily_logs")
          .select("physical_symptoms, emotional_symptoms")
          .eq("user_id", user.id)
          .gte("log_date", threeMonthsAgo.toISOString().split("T")[0]),
      ]);

      if (cycles && cycles.length > 0) {
        const lengths = cycles.map((c, i) => ({
          label: `#${i + 1}`,
          cycleLength: c.cycle_length!,
        }));
        setCycleLengths(lengths);

        const avgC = Math.round(
          cycles.reduce((sum, c) => sum + c.cycle_length!, 0) / cycles.length
        );
        setAvgCycleLength(avgC);

        const withPeriod = cycles.filter((c) => c.period_length);
        if (withPeriod.length > 0) {
          const avgP = Math.round(
            withPeriod.reduce((sum, c) => sum + c.period_length!, 0) / withPeriod.length
          );
          setAvgPeriodLength(avgP);
        }
      }

      if (logs) {
        const counts = new Map<string, number>();
        logs.forEach((log) => {
          [...(log.physical_symptoms || []), ...(log.emotional_symptoms || [])].forEach(
            (s: string) => {
              counts.set(s, (counts.get(s) || 0) + 1);
            }
          );
        });

        const sorted = Array.from(counts.entries())
          .sort((a, b) => b[1] - a[1])
          .slice(0, 8)
          .map(([name, count]) => ({ name, count }));

        setSymptomCounts(sorted);
      }

      setLoading(false);
    }

    fetchInsights();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-24 w-full rounded-xl" />
        <Skeleton className="h-48 w-full rounded-xl" />
      </div>
    );
  }

  if (cycleLengths.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-muted-foreground">{t("noData")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">{t("title")}</h2>

      {/* Averages */}
      <div className="grid grid-cols-2 gap-3">
        <Card>
          <CardContent className="flex flex-col items-center p-4">
            <p className="text-xs text-muted-foreground">{t("avgCycleLength")}</p>
            <p className="text-2xl font-bold text-primary">{avgCycleLength}</p>
            <p className="text-xs text-muted-foreground">
              {tc("days")}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center p-4">
            <p className="text-xs text-muted-foreground">{t("avgPeriodLength")}</p>
            <p className="text-2xl font-bold text-period">{avgPeriodLength}</p>
            <p className="text-xs text-muted-foreground">
              {tc("days")}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Cycle length chart */}
      <Card>
        <CardContent className="pt-4">
          <h3 className="mb-4 text-sm font-medium">{t("cycleLengthHistory")}</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={cycleLengths}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="label" tick={{ fontSize: 12 }} />
              <YAxis domain={["auto", "auto"]} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="cycleLength" fill={CYCLE_COLORS.primary} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Symptom trends */}
      {symptomCounts.length > 0 && (
        <Card>
          <CardContent className="pt-4">
            <h3 className="mb-4 text-sm font-medium">{t("symptomTrends")}</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={symptomCounts} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 12 }} />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fontSize: 11 }}
                  width={100}
                />
                <Tooltip />
                <Bar dataKey="count" fill={CYCLE_COLORS.fertile} radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
