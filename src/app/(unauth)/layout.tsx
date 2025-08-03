import { LanguageSwitcher } from "@/components/common/language-switcher";
import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: Readonly<AuthLayoutProps>) {
  return (
    <main className={"w-full flex flex-col overflow-y-auto"}>
      <div className="absolute top-4 right-4 z-10">
        <LanguageSwitcher />
      </div>
      <div className="flex-1">{children}</div>
    </main>
  );
}
