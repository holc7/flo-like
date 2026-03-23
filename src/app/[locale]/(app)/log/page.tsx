"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useDailyLog } from "@/hooks/use-daily-log";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { SymptomChip } from "@/components/symptoms/symptom-chip";
import { LevelPicker } from "@/components/symptoms/level-picker";
import { PHYSICAL_SYMPTOMS, EMOTIONAL_SYMPTOMS } from "@/lib/cycle/constants";
import { format } from "date-fns";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";

export default function LogPage() {
  const t = useTranslations("log");
  const tc = useTranslations("common");
  const [date, setDate] = useState(new Date());
  const { log, loading, saveLog } = useDailyLog(date);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [isPeriodDay, setIsPeriodDay] = useState(false);
  const [flowIntensity, setFlowIntensity] = useState<number | null>(null);
  const [mood, setMood] = useState<number | null>(null);
  const [energy, setEnergy] = useState<number | null>(null);
  const [pain, setPain] = useState<number | null>(null);
  const [sleep, setSleep] = useState<number | null>(null);
  const [physicalSymptoms, setPhysicalSymptoms] = useState<string[]>([]);
  const [emotionalSymptoms, setEmotionalSymptoms] = useState<string[]>([]);
  const [exercise, setExercise] = useState(false);
  const [intimacy, setIntimacy] = useState(false);
  const [cervicalMucus, setCervicalMucus] = useState<string | null>(null);
  const [notes, setNotes] = useState("");

  // Sync state when log data loads
  useEffect(() => {
    if (log) {
      setIsPeriodDay(log.isPeriodDay);
      setFlowIntensity(log.flowIntensity);
      setMood(log.mood);
      setEnergy(log.energyLevel);
      setPain(log.painLevel);
      setSleep(log.sleepQuality);
      setPhysicalSymptoms(log.physicalSymptoms);
      setEmotionalSymptoms(log.emotionalSymptoms);
      setExercise(log.exercise);
      setIntimacy(log.intimacy);
      setCervicalMucus(log.cervicalMucus);
      setNotes(log.notes || "");
    }
  }, [log]);

  function toggleSymptom(
    symptom: string,
    current: string[],
    setter: (v: string[]) => void
  ) {
    setter(
      current.includes(symptom)
        ? current.filter((s) => s !== symptom)
        : [...current, symptom]
    );
  }

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    await saveLog({
      logDate: format(date, "yyyy-MM-dd"),
      isPeriodDay,
      flowIntensity,
      mood,
      energyLevel: energy,
      painLevel: pain,
      sleepQuality: sleep,
      physicalSymptoms,
      emotionalSymptoms,
      exercise,
      intimacy,
      cervicalMucus: cervicalMucus as "dry" | "sticky" | "creamy" | "watery" | "egg_white" | null,
      notes: notes || null,
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const prevDay = () => {
    const d = new Date(date);
    d.setDate(d.getDate() - 1);
    setDate(d);
  };

  const nextDay = () => {
    const d = new Date(date);
    d.setDate(d.getDate() + 1);
    if (d <= new Date()) setDate(d);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48 mx-auto" />
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    );
  }

  const mucusTypes = ["dry", "sticky", "creamy", "watery", "egg_white"] as const;

  return (
    <div className="space-y-4">
      {/* Date picker */}
      <div className="flex items-center justify-center gap-4">
        <Button variant="ghost" size="icon" onClick={prevDay}>
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-lg font-semibold">
          {format(date, "d. M. yyyy")}
        </h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={nextDay}
          disabled={format(date, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd")}
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      <Card>
        <CardContent className="space-y-5 pt-6">
          {/* Period toggle */}
          <div className="flex items-center justify-between">
            <Label className="text-base font-medium">{t("periodDay")}</Label>
            <Switch checked={isPeriodDay} onCheckedChange={setIsPeriodDay} />
          </div>

          {isPeriodDay && (
            <div>
              <Label className="text-sm">{t("flow")}</Label>
              <LevelPicker
                value={flowIntensity}
                onChange={setFlowIntensity}
                min={1}
                max={5}
                labels={Object.fromEntries(
                  [1, 2, 3, 4, 5].map((i) => [String(i), t(`flowLevels.${i}` as Parameters<typeof t>[0])])
                )}
              />
            </div>
          )}

          <Separator />

          {/* Mood */}
          <div>
            <Label className="text-sm">{t("mood")}</Label>
            <LevelPicker
              value={mood}
              onChange={setMood}
              min={1}
              max={5}
              labels={Object.fromEntries(
                [1, 2, 3, 4, 5].map((i) => [String(i), t(`moodLevels.${i}` as Parameters<typeof t>[0])])
              )}
            />
          </div>

          {/* Energy */}
          <div>
            <Label className="text-sm">{t("energy")}</Label>
            <LevelPicker
              value={energy}
              onChange={setEnergy}
              min={1}
              max={5}
              labels={Object.fromEntries(
                [1, 2, 3, 4, 5].map((i) => [String(i), t(`moodLevels.${i}` as Parameters<typeof t>[0])])
              )}
            />
          </div>

          {/* Pain */}
          <div>
            <Label className="text-sm">{t("pain")}</Label>
            <LevelPicker
              value={pain}
              onChange={setPain}
              min={0}
              max={5}
              labels={Object.fromEntries(
                [0, 1, 2, 3, 4, 5].map((i) => [String(i), t(`painLevels.${i}` as Parameters<typeof t>[0])])
              )}
            />
          </div>

          {/* Sleep */}
          <div>
            <Label className="text-sm">{t("sleep")}</Label>
            <LevelPicker
              value={sleep}
              onChange={setSleep}
              min={1}
              max={5}
              labels={Object.fromEntries(
                [1, 2, 3, 4, 5].map((i) => [String(i), t(`sleepLevels.${i}` as Parameters<typeof t>[0])])
              )}
            />
          </div>

          <Separator />

          {/* Physical symptoms */}
          <div>
            <Label className="text-sm mb-2 block">{t("physicalSymptoms")}</Label>
            <div className="flex flex-wrap gap-2">
              {PHYSICAL_SYMPTOMS.map((s) => (
                <SymptomChip
                  key={s}
                  label={t(`physicalSymptomsOptions.${s}` as Parameters<typeof t>[0])}
                  selected={physicalSymptoms.includes(s)}
                  onToggle={() => toggleSymptom(s, physicalSymptoms, setPhysicalSymptoms)}
                />
              ))}
            </div>
          </div>

          {/* Emotional symptoms */}
          <div>
            <Label className="text-sm mb-2 block">{t("emotionalSymptoms")}</Label>
            <div className="flex flex-wrap gap-2">
              {EMOTIONAL_SYMPTOMS.map((s) => (
                <SymptomChip
                  key={s}
                  label={t(`emotionalSymptomsOptions.${s}` as Parameters<typeof t>[0])}
                  selected={emotionalSymptoms.includes(s)}
                  onToggle={() => toggleSymptom(s, emotionalSymptoms, setEmotionalSymptoms)}
                />
              ))}
            </div>
          </div>

          <Separator />

          {/* Cervical mucus */}
          <div>
            <Label className="text-sm mb-2 block">{t("cervicalMucus")}</Label>
            <div className="flex flex-wrap gap-2">
              {mucusTypes.map((type) => (
                <SymptomChip
                  key={type}
                  label={t(`mucusTypes.${type}` as Parameters<typeof t>[0])}
                  selected={cervicalMucus === type}
                  onToggle={() => setCervicalMucus(cervicalMucus === type ? null : type)}
                />
              ))}
            </div>
          </div>

          {/* Toggles */}
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <Switch checked={exercise} onCheckedChange={setExercise} />
              <Label className="text-sm">{t("exercise")}</Label>
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={intimacy} onCheckedChange={setIntimacy} />
              <Label className="text-sm">{t("intimacy")}</Label>
            </div>
          </div>

          {/* Notes */}
          <div>
            <Label className="text-sm">{t("notes")}</Label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={t("notesPlaceholder")}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Save button */}
      <Button onClick={handleSave} disabled={saving} className="w-full gap-2">
        {saved ? (
          <>
            <Check className="h-4 w-4" />
            {t("saved")}
          </>
        ) : saving ? (
          "..."
        ) : (
          tc("save")
        )}
      </Button>
    </div>
  );
}
