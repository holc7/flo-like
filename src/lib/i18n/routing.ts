import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["sl", "en", "hr"],
  defaultLocale: "sl",
  localePrefix: "as-needed",
});
