"use client";

import { useTranslations } from "next-intl";

interface SidebarHeaderProps {
  title: string;
}

export default function SidebarHeader({ title }: SidebarHeaderProps) {
  const t = useTranslations("navigation");

  // Map the title to the correct translation key
  const getTitleKey = (title: string) => {
    // Handle both original keys and lowercase versions
    const titleMap: { [key: string]: string } = {
      dashboard: "dashboard",
      "trang chủ": "dashboard",
      inventory: "inventory",
      "kho hàng": "inventory",
      orders: "orders",
      "đơn hàng": "orders",
      reports: "reports",
      "báo cáo": "reports",
      settings: "settings",
      "cài đặt": "settings",
    };

    return titleMap[title] || "dashboard"; // default to dashboard
  };

  const titleKey = getTitleKey(title);
  const translatedTitle = t(titleKey);

  return (
    <div className="border-b border-sidebar-border p-4">
      <h2 className="text-lg font-semibold capitalize text-sidebar-foreground">
        {translatedTitle}
      </h2>
    </div>
  );
}
