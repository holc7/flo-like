"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/lib/i18n/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ShieldCheck } from "lucide-react";

export default function ConsentPage() {
  const t = useTranslations("consent");
  const [healthData, setHealthData] = useState(false);
  const [cyclePredictions, setCyclePredictions] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  async function handleSubmit() {
    if (!healthData || !cyclePredictions) {
      setError(t("bothRequired"));
      return;
    }

    setSubmitting(true);
    setError(null);

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { error: insertError } = await supabase.from("consents").upsert(
      [
        {
          user_id: user.id,
          consent_type: "health_data_processing",
          granted_at: new Date().toISOString(),
          revoked_at: null,
        },
        {
          user_id: user.id,
          consent_type: "cycle_predictions",
          granted_at: new Date().toISOString(),
          revoked_at: null,
        },
      ],
      { onConflict: "user_id,consent_type" }
    );

    if (insertError) {
      setError(insertError.message);
      setSubmitting(false);
      return;
    }

    // Set consent cookie so middleware skips DB check
    document.cookie = "consent_granted=true; path=/; max-age=2592000; samesite=lax";

    router.push("/onboarding");
  }

  return (
    <Card>
      <CardContent className="space-y-5 pt-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <ShieldCheck className="h-8 w-8 text-primary" />
          <h2 className="text-xl font-semibold">{t("title")}</h2>
          <p className="text-sm text-muted-foreground">{t("subtitle")}</p>
        </div>

        {error && (
          <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={healthData}
              onChange={(e) => setHealthData(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-border accent-primary"
            />
            <div className="space-y-1">
              <Label className="cursor-pointer font-medium leading-snug">
                {t("healthDataLabel")}
              </Label>
              <p className="text-xs text-muted-foreground">
                {t("healthDataDescription")}
              </p>
            </div>
          </label>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={cyclePredictions}
              onChange={(e) => setCyclePredictions(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-border accent-primary"
            />
            <div className="space-y-1">
              <Label className="cursor-pointer font-medium leading-snug">
                {t("cyclePredictionsLabel")}
              </Label>
              <p className="text-xs text-muted-foreground">
                {t("cyclePredictionsDescription")}
              </p>
            </div>
          </label>
        </div>

        <p className="text-xs text-muted-foreground">{t("requiredNotice")}</p>

        <Button
          onClick={handleSubmit}
          disabled={submitting || !healthData || !cyclePredictions}
          className="w-full"
        >
          {submitting ? "..." : t("submit")}
        </Button>
      </CardContent>
    </Card>
  );
}
