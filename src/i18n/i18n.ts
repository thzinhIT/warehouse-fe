import { cookies } from "next/headers";
import { getRequestConfig } from "next-intl/server";

// Define supported locales
export const locales = ["en", "vi"] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async () => {
  // Get locale from cookie or use default
  const cookieStore = cookies();
  const preferredLanguage = (await cookieStore).get("preferredLanguage");

  // Validate and fallback to default locale
  const requestedLocale = preferredLanguage?.value;
  const locale = locales.includes(requestedLocale as Locale)
    ? (requestedLocale as Locale)
    : "vi";

  return {
    locale,
    messages: {
      ...(await import(`./${locale}.json`)).default,
      ...(await import(`./auth/${locale}.json`)).default,
    },
  };
});
