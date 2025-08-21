"use client";

import React, { useEffect } from "react";
import ChartPieInteractive from "./chart-pie-interactive";
import { ChartBarStacked } from "./chart-bar-stacked";
import WeatherWidget from "@/components/widgets/weather-widget";
import { useTranslations } from "next-intl";
import { useDashboardData } from "@/hooks/dashboard/useDashboardData";
import SensorDataWidget from "./sensor-widget";
const DashboardClient = () => {
  const t = useTranslations("dashboard.charts");

  const {
    // Data formatting functions
    formatImportDataForPieChart,
    formatExportDataForPieChart,
    formatSkuTypeRatioForPieChart,
    formatSummaryDataForBarChart,

    // Loading states
    isLoadingImportChart,
    isLoadingExportChart,
    isLoadingSkuTypeRatio,
    isLoadingSummaryChart,

    // Error states
    importChartError,
    exportChartError,
    skuTypeRatioError,
    summaryChartError,

    // Fetch functions
    fetchImportChart,
    fetchExportChart,
    fetchSkuTypeRatio,
    fetchSummaryChart,

    // Raw data
    storageStatusData,
    fetchStorageStatus,
  } = useDashboardData();

  // Initialize data on component mount
  useEffect(() => {
    const initializeData = async () => {
      // Set a broader date range to ensure we get some data
      const endDate = new Date().toISOString().split("T")[0]; // Today
      const startDate = new Date(2024, 0, 1).toISOString().split("T")[0]; // January 1, 2024

      try {
        // Fetch all dashboard data - try without warehouse ID first
        await Promise.all([
          fetchImportChart({ startDate, endDate }), // No warehouse ID
          fetchExportChart({ startDate, endDate }), // No warehouse ID
          fetchSkuTypeRatio(),
          fetchSummaryChart({ startDate, endDate, type: "daily" }),
          fetchStorageStatus({}), // No warehouse ID
        ]);
      } catch (error) {}
    };

    initializeData();
  }, [
    fetchImportChart,
    fetchExportChart,
    fetchSkuTypeRatio,
    fetchSummaryChart,
    fetchStorageStatus,
  ]);

  // Get formatted data for charts
  const importData = formatImportDataForPieChart();
  const exportData = formatExportDataForPieChart();
  const skuTypeRatioData = formatSkuTypeRatioForPieChart();
  const summaryData = formatSummaryDataForBarChart();



  // Fallback data if no API data is available
  const fallbackWarehouseData = [
    { month: "january", desktop: 186, fill: "hsl(0, 70%, 50%)" },
    { month: "february", desktop: 305, fill: "hsl(72, 70%, 50%)" },
    { month: "march", desktop: 237, fill: "hsl(144, 70%, 50%)" },
    { month: "april", desktop: 173, fill: "hsl(216, 70%, 50%)" },
    { month: "may", desktop: 209, fill: "hsl(288, 70%, 50%)" },
  ];

  return (
    <div className="h-full p-4 overflow-auto">
      {/* Top row with 3 pie charts and weather/sensor widgets */}
      <div className="grid grid-cols-12 gap-3 mb-5">
        <div className="col-span-3">
          <ChartPieInteractive
            data={importData.length > 0 ? importData : fallbackWarehouseData}
            title={t("import-chart.title")}
            description={t("import-chart.description")}
            isLoading={isLoadingImportChart}
            error={importChartError}
          />
        </div>
        <div className="col-span-3">
          <ChartPieInteractive
            data={exportData.length > 0 ? exportData : fallbackWarehouseData}
            title={t("export-chart.title")}
            description={t("export-chart.description")}
            isLoading={isLoadingExportChart}
            error={exportChartError}
          />
        </div>
        <div className="col-span-3">
          <ChartPieInteractive
            data={
              skuTypeRatioData.length > 0
                ? skuTypeRatioData
                : fallbackWarehouseData
            }
            title={t("sku-type-ratio.title")}
            description={t("sku-type-ratio.description")}
            isLoading={isLoadingSkuTypeRatio}
            error={skuTypeRatioError}
          />
        </div>
        <div className="col-span-3 space-y-3">
          <WeatherWidget compact className="h-fit" />
          <SensorDataWidget />
        </div>
      </div>

      {/* Bottom row with bar chart full width */}
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-12">
          <ChartBarStacked
            data={summaryData.length > 0 ? summaryData : undefined}
            isLoading={isLoadingSummaryChart}
            error={summaryChartError}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardClient;
