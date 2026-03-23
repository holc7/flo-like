"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "@/lib/i18n/navigation";
import { createClient } from "@/lib/supabase/client";
import { logout } from "../../(auth)/actions";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Check, Download, Trash2, LogOut, ShieldCheck } from "lucide-react";

interface Consent {
  consent_type: string;
  granted_at: string | null;
  revoked_at: string | null;
}

interface Profile {
  display_name: string | null;
  date_of_birth: string | null;
  locale: string;
  avg_cycle_length: number;
  avg_period_length: number;
  notifications_enabled: boolean;
  period_reminder_days: number;
  fertile_reminder: boolean;
}

export default function SettingsPage() {
  const t = useTranslations("settings");
  const tp = useTranslations("privacy");
  const tc = useTranslations("common");
  const tAuth = useTranslations("auth");
  const locale = useLocale();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showRevokeDialog, setShowRevokeDialog] = useState<string | null>(null);
  const [consents, setConsents] = useState<Consent[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const [{ data }, { data: consentData }] = await Promise.all([
        supabase
          .from("profiles")
          .select("display_name, date_of_birth, locale, avg_cycle_length, avg_period_length, notifications_enabled, period_reminder_days, fertile_reminder")
          .eq("id", user.id)
          .single(),
        supabase
          .from("consents")
          .select("consent_type, granted_at, revoked_at")
          .eq("user_id", user.id),
      ]);

      if (data) setProfile(data);
      if (consentData) setConsents(consentData);
      setLoading(false);
    }
    fetchProfile();
  }, []);

  async function handleSave() {
    if (!profile) return;
    setSaving(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase.from("profiles").update({
      display_name: profile.display_name,
      date_of_birth: profile.date_of_birth,
      locale: profile.locale,
      avg_cycle_length: profile.avg_cycle_length,
      avg_period_length: profile.avg_period_length,
      notifications_enabled: profile.notifications_enabled,
      period_reminder_days: profile.period_reminder_days,
      fertile_reminder: profile.fertile_reminder,
    }).eq("id", user.id);

    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);

    // Switch locale if changed
    if (profile.locale !== locale) {
      router.replace("/settings", { locale: profile.locale as "sl" | "en" });
    }
  }

  async function handleExport() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const [profileRes, cyclesRes, logsRes] = await Promise.all([
      supabase.from("profiles").select("*").eq("id", user.id).single(),
      supabase.from("cycles").select("*").eq("user_id", user.id).order("start_date"),
      supabase.from("daily_logs").select("*").eq("user_id", user.id).order("log_date"),
    ]);

    const exportData = {
      exportDate: new Date().toISOString(),
      profile: profileRes.data,
      cycles: cyclesRes.data,
      dailyLogs: logsRes.data,
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `cikel-export-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function getConsent(type: string): Consent | undefined {
    return consents.find((c) => c.consent_type === type);
  }

  function isConsentActive(type: string): boolean {
    const c = getConsent(type);
    return !!c && !!c.granted_at && !c.revoked_at;
  }

  async function handleRevokeConsent(type: string) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await supabase
      .from("consents")
      .update({ revoked_at: new Date().toISOString() })
      .eq("user_id", user.id)
      .eq("consent_type", type);

    // Clear consent cookie so middleware re-checks
    document.cookie = "consent_granted=; path=/; max-age=0";

    setConsents((prev) =>
      prev.map((c) =>
        c.consent_type === type
          ? { ...c, revoked_at: new Date().toISOString() }
          : c
      )
    );
    setShowRevokeDialog(null);
  }

  async function handleDeleteAccount() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Delete profile (cascades to all related data)
    await supabase.from("profiles").delete().eq("id", user.id);
    await supabase.auth.signOut();
    router.push("/login");
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">{t("title")}</h2>

      {/* Profile section */}
      <Card>
        <CardContent className="space-y-4 pt-6">
          <h3 className="font-medium">{t("profile")}</h3>

          <div className="space-y-2">
            <Label>{t("displayName")}</Label>
            <Input
              value={profile.display_name || ""}
              onChange={(e) => setProfile({ ...profile, display_name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>{t("dateOfBirth")}</Label>
            <Input
              type="date"
              value={profile.date_of_birth || ""}
              onChange={(e) => setProfile({ ...profile, date_of_birth: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>{t("language")}</Label>
            <div className="flex gap-2">
              {(["sl", "en"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setProfile({ ...profile, locale: l })}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                    profile.locale === l
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {l === "sl" ? "Slovenščina" : "English"}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cycle settings */}
      <Card>
        <CardContent className="space-y-4 pt-6">
          <h3 className="font-medium">{t("cycleSettings")}</h3>

          <div className="space-y-2">
            <Label>{t("avgCycleLength")}</Label>
            <Input
              type="number"
              min={15}
              max={60}
              value={profile.avg_cycle_length}
              onChange={(e) =>
                setProfile({ ...profile, avg_cycle_length: Number(e.target.value) })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>{t("avgPeriodLength")}</Label>
            <Input
              type="number"
              min={1}
              max={15}
              value={profile.avg_period_length}
              onChange={(e) =>
                setProfile({ ...profile, avg_period_length: Number(e.target.value) })
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardContent className="space-y-4 pt-6">
          <h3 className="font-medium">{t("notifications")}</h3>

          <div className="flex items-center justify-between">
            <Label>{t("enableNotifications")}</Label>
            <Switch
              checked={profile.notifications_enabled}
              onCheckedChange={(v) =>
                setProfile({ ...profile, notifications_enabled: v })
              }
            />
          </div>

          {profile.notifications_enabled && (
            <>
              <div className="flex items-center justify-between">
                <Label>{t("periodReminder")}</Label>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min={0}
                    max={7}
                    value={profile.period_reminder_days}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        period_reminder_days: Number(e.target.value),
                      })
                    }
                    className="w-16 text-center"
                  />
                  <span className="text-xs text-muted-foreground">{t("daysBefore")}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Label>{t("fertileReminder")}</Label>
                <Switch
                  checked={profile.fertile_reminder}
                  onCheckedChange={(v) =>
                    setProfile({ ...profile, fertile_reminder: v })
                  }
                />
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Save button */}
      <Button onClick={handleSave} disabled={saving} className="w-full gap-2">
        {saved ? (
          <>
            <Check className="h-4 w-4" />
            {t("saved")}
          </>
        ) : (
          tc("save")
        )}
      </Button>

      <Separator />

      {/* Privacy & Consents */}
      <Card>
        <CardContent className="space-y-4 pt-6">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <h3 className="font-medium">{tp("title")}</h3>
          </div>

          {(["health_data_processing", "cycle_predictions"] as const).map((type) => {
            const active = isConsentActive(type);
            const consent = getConsent(type);
            const label =
              type === "health_data_processing"
                ? tp("healthDataConsent")
                : tp("cyclePredictionsConsent");

            return (
              <div key={type} className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>{label}</Label>
                  <p className="text-xs text-muted-foreground">
                    {active && consent?.granted_at
                      ? tp("grantedOn", {
                          date: new Date(consent.granted_at).toLocaleDateString(),
                        })
                      : tp("notGranted")}
                  </p>
                </div>
                {active && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowRevokeDialog(type)}
                  >
                    {tp("revoke")}
                  </Button>
                )}
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Revoke consent confirmation dialog */}
      <Dialog
        open={showRevokeDialog !== null}
        onOpenChange={(open) => !open && setShowRevokeDialog(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{tp("revokeConfirmTitle")}</DialogTitle>
            <DialogDescription>
              {tp("revokeConfirmDescription", {
                warning:
                  showRevokeDialog === "health_data_processing"
                    ? tp("revokeWarning")
                    : "",
              })}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowRevokeDialog(null)}>
              {tc("cancel")}
            </Button>
            <Button
              variant="destructive"
              onClick={() => showRevokeDialog && handleRevokeConsent(showRevokeDialog)}
            >
              {tp("revoke")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Separator />

      {/* Data section */}
      <Card>
        <CardContent className="space-y-4 pt-6">
          <h3 className="font-medium">{t("data")}</h3>

          <Button variant="outline" onClick={handleExport} className="w-full gap-2">
            <Download className="h-4 w-4" />
            {t("exportData")}
          </Button>

          <Button
            variant="destructive"
            onClick={() => setShowDeleteDialog(true)}
            className="w-full gap-2"
          >
            <Trash2 className="h-4 w-4" />
            {t("deleteAccount")}
          </Button>
        </CardContent>
      </Card>

      {/* Logout */}
      <form action={logout}>
        <Button variant="ghost" type="submit" className="w-full gap-2 text-muted-foreground">
          <LogOut className="h-4 w-4" />
          {tAuth("logout")}
        </Button>
      </form>

      {/* Delete confirmation dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("deleteAccount")}</DialogTitle>
            <DialogDescription>{t("deleteAccountConfirm")}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowDeleteDialog(false)}>
              {tc("cancel")}
            </Button>
            <Button variant="destructive" onClick={handleDeleteAccount}>
              {tc("delete")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
