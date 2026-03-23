"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/lib/i18n/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TOTAL_STEPS = 5;

export default function OnboardingPage() {
  const t = useTranslations("onboarding");
  const tc = useTranslations("common");
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [displayName, setDisplayName] = useState("");
  const [avgCycleLength, setAvgCycleLength] = useState(28);
  const [avgPeriodLength, setAvgPeriodLength] = useState(5);
  const [lastPeriodStart, setLastPeriodStart] = useState("");
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [periodReminderDays, setPeriodReminderDays] = useState(2);
  const [fertileReminder, setFertileReminder] = useState(false);

  async function handleComplete() {
    setIsSubmitting(true);
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      await supabase.from("profiles").update({
        display_name: displayName,
        avg_cycle_length: avgCycleLength,
        avg_period_length: avgPeriodLength,
        last_period_start: lastPeriodStart || null,
        notifications_enabled: notificationsEnabled,
        period_reminder_days: periodReminderDays,
        fertile_reminder: fertileReminder,
        onboarding_completed: true,
      }).eq("id", user.id);

      // Create initial cycle if last period start is set
      if (lastPeriodStart) {
        await supabase.from("cycles").insert({
          user_id: user.id,
          start_date: lastPeriodStart,
          period_length: avgPeriodLength,
        });
      }

      // Set cookie for middleware
      document.cookie = "onboarding_completed=true;path=/;max-age=31536000";

      router.push("/dashboard");
    } catch {
      // Error handled silently
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-primary">{t("title")}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{t("subtitle")}</p>
      </div>

      <div className="w-full max-w-sm">
        <Progress value={(step / TOTAL_STEPS) * 100} className="mb-6" />

        <Card>
          <CardContent className="space-y-4 pt-6">
            {/* Step 1: Name */}
            {step === 1 && (
              <div className="space-y-3">
                <h2 className="text-lg font-semibold">{t("step1Title")}</h2>
                <Input
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder={t("step1Placeholder")}
                />
              </div>
            )}

            {/* Step 2: Cycle length */}
            {step === 2 && (
              <div className="space-y-3">
                <h2 className="text-lg font-semibold">{t("step2Title")}</h2>
                <p className="text-sm text-muted-foreground">{t("step2Description")}</p>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setAvgCycleLength(Math.max(15, avgCycleLength - 1))}
                  >
                    -
                  </Button>
                  <span className="text-3xl font-bold text-primary w-16 text-center">
                    {avgCycleLength}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setAvgCycleLength(Math.min(60, avgCycleLength + 1))}
                  >
                    +
                  </Button>
                  <span className="text-sm text-muted-foreground">{tc("days")}</span>
                </div>
              </div>
            )}

            {/* Step 3: Period length */}
            {step === 3 && (
              <div className="space-y-3">
                <h2 className="text-lg font-semibold">{t("step3Title")}</h2>
                <p className="text-sm text-muted-foreground">{t("step3Description")}</p>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setAvgPeriodLength(Math.max(1, avgPeriodLength - 1))}
                  >
                    -
                  </Button>
                  <span className="text-3xl font-bold text-primary w-16 text-center">
                    {avgPeriodLength}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setAvgPeriodLength(Math.min(15, avgPeriodLength + 1))}
                  >
                    +
                  </Button>
                  <span className="text-sm text-muted-foreground">{tc("days")}</span>
                </div>
              </div>
            )}

            {/* Step 4: Last period start */}
            {step === 4 && (
              <div className="space-y-3">
                <h2 className="text-lg font-semibold">{t("step4Title")}</h2>
                <p className="text-sm text-muted-foreground">{t("step4Description")}</p>
                <Input
                  type="date"
                  value={lastPeriodStart}
                  onChange={(e) => setLastPeriodStart(e.target.value)}
                  max={new Date().toISOString().split("T")[0]}
                />
              </div>
            )}

            {/* Step 5: Notifications */}
            {step === 5 && (
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">{t("step5Title")}</h2>
                <p className="text-sm text-muted-foreground">{t("step5Description")}</p>

                <div className="flex items-center justify-between">
                  <Label>{t("enableNotifications")}</Label>
                  <Switch
                    checked={notificationsEnabled}
                    onCheckedChange={setNotificationsEnabled}
                  />
                </div>

                {notificationsEnabled && (
                  <>
                    <div className="flex items-center justify-between">
                      <Label>{t("periodReminder")}</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          min={0}
                          max={7}
                          value={periodReminderDays}
                          onChange={(e) => setPeriodReminderDays(Number(e.target.value))}
                          className="w-16 text-center"
                        />
                        <span className="text-xs text-muted-foreground">{t("daysBefore")}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>{t("fertileReminder")}</Label>
                      <Switch
                        checked={fertileReminder}
                        onCheckedChange={setFertileReminder}
                      />
                    </div>
                  </>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation buttons */}
        <div className="mt-4 flex justify-between">
          {step > 1 ? (
            <Button variant="ghost" onClick={() => setStep(step - 1)}>
              <ChevronLeft className="mr-1 h-4 w-4" />
              {tc("back")}
            </Button>
          ) : (
            <div />
          )}

          {step < TOTAL_STEPS ? (
            <Button onClick={() => setStep(step + 1)}>
              {tc("next")}
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          ) : (
            <Button onClick={handleComplete} disabled={isSubmitting}>
              {isSubmitting ? "..." : t("complete")}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
