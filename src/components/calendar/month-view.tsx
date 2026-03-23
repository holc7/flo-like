"use client";

import { useMemo } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  format,
  isWithinInterval,
} from "date-fns";
import { sl } from "date-fns/locale";
import { useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import { CYCLE_COLORS } from "@/lib/cycle/constants";

interface DayInfo {
  isPeriod: boolean;
  isPredictedPeriod: boolean;
  isFertile: boolean;
  isOvulation: boolean;
  hasLog: boolean;
}

interface MonthViewProps {
  month: Date;
  dayData: Map<string, DayInfo>;
  selectedDate?: Date;
  onSelectDate?: (date: Date) => void;
}

const weekDaysSl = ["Po", "To", "Sr", "Če", "Pe", "So", "Ne"];
const weekDaysEn = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

export function MonthView({ month, dayData, selectedDate, onSelectDate }: MonthViewProps) {
  const locale = useLocale();
  const weekDays = locale === "sl" ? weekDaysSl : weekDaysEn;

  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(month), { weekStartsOn: 1 });
    const end = endOfWeek(endOfMonth(month), { weekStartsOn: 1 });
    return eachDayOfInterval({ start, end });
  }, [month]);

  function getDayStyle(date: Date): React.CSSProperties {
    const key = format(date, "yyyy-MM-dd");
    const info = dayData.get(key);
    if (!info) return {};

    if (info.isOvulation) return { backgroundColor: CYCLE_COLORS.ovulation, color: "#fff" };
    if (info.isPeriod) return { backgroundColor: CYCLE_COLORS.period, color: "#fff" };
    if (info.isPredictedPeriod) return { backgroundColor: CYCLE_COLORS.predictedPeriod };
    if (info.isFertile) return { backgroundColor: CYCLE_COLORS.fertile, color: "#fff" };
    return {};
  }

  return (
    <div>
      {/* Week day headers */}
      <div className="grid grid-cols-7 mb-1">
        {weekDays.map((day) => (
          <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => {
          const isCurrentMonth = isSameMonth(day, month);
          const isToday = isSameDay(day, new Date());
          const isSelected = selectedDate && isSameDay(day, selectedDate);
          const key = format(day, "yyyy-MM-dd");
          const info = dayData.get(key);

          return (
            <button
              key={key}
              onClick={() => onSelectDate?.(day)}
              className={cn(
                "relative flex h-10 w-full items-center justify-center rounded-lg text-sm transition-colors",
                !isCurrentMonth && "opacity-30",
                isToday && "ring-2 ring-primary ring-offset-1",
                isSelected && "ring-2 ring-foreground ring-offset-1"
              )}
              style={isCurrentMonth ? getDayStyle(day) : undefined}
            >
              {format(day, "d")}
              {info?.hasLog && (
                <span className="absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-foreground/50" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
