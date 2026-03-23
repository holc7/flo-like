"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Droplets } from "lucide-react";

interface PeriodToggleProps {
  isOnPeriod: boolean;
  onToggle: () => void;
  disabled?: boolean;
}

export function PeriodToggle({ isOnPeriod, onToggle, disabled }: PeriodToggleProps) {
  const t = useTranslations("dashboard");

  return (
    <Button
      onClick={onToggle}
      disabled={disabled}
      variant={isOnPeriod ? "destructive" : "default"}
      className="w-full gap-2"
      size="lg"
    >
      <Droplets className="h-5 w-5" />
      {isOnPeriod ? t("endPeriod") : t("startPeriod")}
    </Button>
  );
}
