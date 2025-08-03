import React from "react";
import ChartPieInteractive from "./chart-pie-interactive";
import { ChartBarStacked } from "./chart-bar-stacked";
import WeatherWidget from "@/components/widgets/weather-widget";
import { useTranslations } from "next-intl";

const DashboardClient = () => {
  const t = useTranslations("dashboard.charts");

  // Sample data for pie charts with translation-ready keys
  const warehouseData = [
    { month: "january", desktop: 186, fill: "var(--color-january)" },
    { month: "february", desktop: 305, fill: "var(--color-february)" },
    { month: "march", desktop: 237, fill: "var(--color-march)" },
    { month: "april", desktop: 173, fill: "var(--color-april)" },
    { month: "may", desktop: 209, fill: "var(--color-may)" },
  ];

  const inventoryData = [
    { month: "electronics", desktop: 450, fill: "var(--color-january)" },
    { month: "clothing", desktop: 320, fill: "var(--color-february)" },
    { month: "furniture", desktop: 280, fill: "var(--color-march)" },
    { month: "books", desktop: 150, fill: "var(--color-april)" },
    { month: "toys", desktop: 190, fill: "var(--color-may)" },
  ];

  const ordersData = [
    { month: "completed", desktop: 650, fill: "var(--color-january)" },
    { month: "pending", desktop: 120, fill: "var(--color-february)" },
    { month: "shipped", desktop: 340, fill: "var(--color-march)" },
    { month: "returned", desktop: 45, fill: "var(--color-april)" },
    { month: "cancelled", desktop: 25, fill: "var(--color-may)" },
  ];

  return (
    <div className=" h-full p-4 overflow-auto">
      {/* Top row with 3 pie charts and compact weather widget */}
      <div className="grid grid-cols-12 gap-3 mb-5">
        <div className="col-span-4">
          <ChartPieInteractive
            data={warehouseData}
            title={t("warehouse-storage.title")}
            description={t("warehouse-storage.description")}
          />
        </div>
        <div className="col-span-4">
          <ChartPieInteractive
            data={inventoryData}
            title={t("inventory-category.title")}
            description={t("inventory-category.description")}
          />
        </div>
        <div className="col-span-4">
          <ChartPieInteractive
            data={ordersData}
            title={t("order-status.title")}
            description={t("order-status.description")}
          />
        </div>
      </div>

      {/* Bottom row with bar chart and compact weather widget */}
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-9">
          <ChartBarStacked />
        </div>
        <div className="col-span-3">
          <WeatherWidget compact className="h-fit" />
        </div>
      </div>
    </div>
  );
};

export default DashboardClient;
