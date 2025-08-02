import React from "react";
import ChartPieInteractive from "./chart-pie-interactive";
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
    <div className="overflow-hidden h-full p-6 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          📊 Warehouse Analytics Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Real-time insights into warehouse operations and inventory management
        </p>
      </div>

      {/* Main Layout - 3 Charts + Weather Widget in One Line */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Chart 1 - Monthly Warehouse Activity */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                {t("monthlyWarehouseActivity")}
              </h3>
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
            {t("monthlyWarehouseActivityDesc")}
          </p>
          
          <div className="h-64 mb-6">
            <ChartPieInteractive data={sampleData1} title="" description="" />
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Last week</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">1,890</p>
              <p className="text-sm text-red-500 flex items-center mt-1">
                <span className="mr-1">↓</span> 18%
              </p>
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">This week</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">1,276</p>
              <p className="text-sm text-red-500 flex items-center mt-1">
                <span className="mr-1">↓</span> 8%
              </p>
            </div>
          </div>
        </div>
        
        {/* Chart 2 - Inventory Distribution */}
        <div className="bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-900/20 dark:to-green-900/20 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                {t("inventoryDistribution")}
              </h3>
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
            {t("inventoryDistributionDesc")}
          </p>
          
          <div className="h-64 mb-6">
            <ChartPieInteractive data={sampleData2} title="" description="" />
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">In Stock</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">2,340</p>
              <p className="text-sm text-green-500 flex items-center mt-1">
                <span className="mr-1">↑</span> 12%
              </p>
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Low Stock</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">189</p>
              <p className="text-sm text-yellow-500 flex items-center mt-1">
                <span className="mr-1">→</span> 3%
              </p>
            </div>
          </div>
        </div>
        
        {/* Chart 3 - Order Processing */}
        <div className="bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-900/20 dark:to-violet-900/20 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                {t("orderProcessing")}
              </h3>
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
            {t("orderProcessingDesc")}
          </p>
          
          <div className="h-64 mb-6">
            <ChartPieInteractive data={sampleData3} title="" description="" />
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Completed</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">567</p>
              <p className="text-sm text-green-500 flex items-center mt-1">
                <span className="mr-1">↑</span> 24%
              </p>
            </div>
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-3">
              <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Pending</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">143</p>
              <p className="text-sm text-blue-500 flex items-center mt-1">
                <span className="mr-1">↑</span> 5%
              </p>
            </div>
          </div>
        </div>
        
        {/* 4th Column - Weather Widget (Smaller) */}
        <div className="transform scale-90 origin-top">
          <WeatherWidget />
        </div>
      </div>
    </div>
  );
};

export default DashboardClient;
