"use client";

import { useTranslations } from "next-intl";
import { LocaleSwitcher } from "./locale-switcher";

export function Header() {
  const t = useTranslations("common");

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-lg items-center justify-between px-4">
        <h1 className="text-lg font-bold text-primary">{t("appName")}</h1>
        <LocaleSwitcher />
      </div>
    </header>
  );
}
