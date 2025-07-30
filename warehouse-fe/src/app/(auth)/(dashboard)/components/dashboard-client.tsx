import React from "react";
import ChartPieInteractive from "../chart-pie-interactive";
import WeatherWidget from "@/components/widgets/weather-widget";
import { useTranslations } from "next-intl";

const DashboardClient = () => {
  const t = useTranslations("charts");
  
  // Sample data for the charts
  const sampleData1 = [
    { month: "january", desktop: 186, fill: "var(--color-january)" },
    { month: "february", desktop: 305, fill: "var(--color-february)" },
    { month: "march", desktop: 237, fill: "var(--color-march)" },
    { month: "april", desktop: 173, fill: "var(--color-april)" },
    { month: "may", desktop: 209, fill: "var(--color-may)" },
  ];

  const sampleData2 = [
    { month: "january", desktop: 120, fill: "var(--color-january)" },
    { month: "february", desktop: 280, fill: "var(--color-february)" },
    { month: "march", desktop: 190, fill: "var(--color-march)" },
    { month: "april", desktop: 220, fill: "var(--color-april)" },
    { month: "may", desktop: 160, fill: "var(--color-may)" },
  ];

  const sampleData3 = [
    { month: "january", desktop: 95, fill: "var(--color-january)" },
    { month: "february", desktop: 145, fill: "var(--color-february)" },
    { month: "march", desktop: 178, fill: "var(--color-march)" },
    { month: "april", desktop: 210, fill: "var(--color-april)" },
    { month: "may", desktop: 165, fill: "var(--color-may)" },
  ];

  return (
    <div className="overflow-hidden h-full p-4">
      <div className="grid grid-cols-12 gap-3">
        {/* Weather Widget */}
        <div className="col-span-4">
          <WeatherWidget />
        </div>
        
        {/* Charts */}
        <div className="col-span-4">
          <ChartPieInteractive
            data={sampleData1}
            title={t("monthlyWarehouseActivity")}
            description={t("monthlyWarehouseActivityDesc")}
          />
        </div>
        <div className="col-span-4">
          <ChartPieInteractive
            data={sampleData2}
            title={t("inventoryDistribution")}
            description={t("inventoryDistributionDesc")}
          />
        </div>
        
        {/* Third Chart - Full Width Bottom Row */}
        <div className="col-span-12">
          <ChartPieInteractive
            data={sampleData3}
            title={t("orderProcessing")}
            description={t("orderProcessingDesc")}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardClient;
