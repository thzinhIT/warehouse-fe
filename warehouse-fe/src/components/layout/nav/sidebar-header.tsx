"use client";

import { useTranslations } from "next-intl";

interface SidebarHeaderProps {
  title: string;
}

export default function SidebarHeader({ title }: SidebarHeaderProps) {
  const t = useTranslations("dashboard"); // Changed from "navigation" to "dashboard"

  return (
    <div className="border-b bg-white p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{t(title)}</h1>
        <p className="text-muted-foreground">{t("subtitle")}</p>
      </div>
    </div>
  );
}
