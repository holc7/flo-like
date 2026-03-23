"use client";

import { cn } from "@/lib/utils";

interface LevelPickerProps {
  value: number | null;
  onChange: (value: number) => void;
  min: number;
  max: number;
  labels: Record<string, string>;
  color?: string;
}

export function LevelPicker({
  value,
  onChange,
  min,
  max,
  labels,
  color = "primary",
}: LevelPickerProps) {
  const levels = Array.from({ length: max - min + 1 }, (_, i) => min + i);

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        {levels.map((level) => (
          <button
            key={level}
            type="button"
            onClick={() => onChange(level)}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full border text-sm font-medium transition-colors",
              value === level
                ? `border-${color} bg-${color}/10 text-${color}`
                : "border-border text-muted-foreground hover:border-primary/50"
            )}
            style={
              value === level
                ? { borderColor: "var(--color-primary)", backgroundColor: "rgba(232, 160, 191, 0.1)", color: "var(--color-primary)" }
                : undefined
            }
          >
            {level}
          </button>
        ))}
      </div>
      {value !== null && (
        <p className="text-xs text-muted-foreground">{labels[String(value)]}</p>
      )}
    </div>
  );
}
