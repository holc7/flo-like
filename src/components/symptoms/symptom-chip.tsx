"use client";

import { cn } from "@/lib/utils";

interface SymptomChipProps {
  label: string;
  selected: boolean;
  onToggle: () => void;
}

export function SymptomChip({ label, selected, onToggle }: SymptomChipProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
        selected
          ? "border-primary bg-primary/10 text-primary"
          : "border-border bg-card text-muted-foreground hover:border-primary/50"
      )}
    >
      {label}
    </button>
  );
}
