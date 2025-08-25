import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "../styles/globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { cn } from "@/lib/utils";
import Providers from "./provider";
import { redirect } from "next/navigation";
import AuthGuard from "./auth-guard";
import { cookies } from "next/headers";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "NiNO",
  icons: {
    icon: "/favicon.ico",
  },
};
const timeZone = "Asia/Ho_Chi_Minh";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className="scroll-smooth antialiased"
    >
      <body
        suppressHydrationWarning
        className={cn(
          "bg-body flex h-dvh flex-col overflow-hidden font-sans",
          inter.className
        )}
      >
        <NextIntlClientProvider timeZone={timeZone} messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
