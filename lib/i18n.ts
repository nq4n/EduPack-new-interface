export type Locale = "en" | "ar"

export const locales: Locale[] = ["en", "ar"]

export const defaultLocale: Locale = "en"

export function getDirection(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr"
}

export function getLocaleLabel(locale: Locale): string {
  return locale === "en" ? "English" : "العربية"
}
