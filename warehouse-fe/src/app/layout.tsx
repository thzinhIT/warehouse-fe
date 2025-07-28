import type { Metadata } from "next";
import "../styles/globals.css"; // Fixed path - now pointing to src/styles/globals.css
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getLocale } from "next-intl/server";
import LanguageSwitcher from "@/components/common/language-switcher";

export const metadata: Metadata = {
  title: "Warehouse Management System",
  description: "Modern warehouse management with real-time weather integration",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          <div className="fixed top-4 right-4 z-50">
            <LanguageSwitcher />
          </div>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
