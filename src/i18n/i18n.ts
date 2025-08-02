import { cookies } from "next/headers";
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async () => {
  // Provide a static locale, fetch a user setting,
  const cookieStore = cookies();

  const preferredLanguage = (await cookieStore).get("preferredLanguage");

  const locale = preferredLanguage?.value ?? "vi";

  return {
    locale,
    messages: {
      ...(await import(`./${locale}.json`)).default,
      ...(await import(`./auth/${locale}.json`)).default,
    },
  };
});
