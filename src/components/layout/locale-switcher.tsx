"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/lib/i18n/navigation";
import { useTransition } from "react";
import { cn } from "@/lib/utils";

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function switchLocale(newLocale: "sl" | "en") {
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  }

  return (
    <div className={cn("flex gap-1 rounded-full bg-muted p-0.5", isPending && "opacity-50")}>
      <button
        onClick={() => switchLocale("sl")}
        className={cn(
          "rounded-full px-2.5 py-1 text-xs font-medium transition-colors",
          locale === "sl"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        SL
      </button>
      <button
        onClick={() => switchLocale("en")}
        className={cn(
          "rounded-full px-2.5 py-1 text-xs font-medium transition-colors",
          locale === "en"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        EN
      </button>
    </div>
  );
}
