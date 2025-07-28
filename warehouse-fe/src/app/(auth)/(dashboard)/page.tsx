import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MdInventory,
  MdTrendingUp,
  MdWarning,
  MdAssignment,
} from "react-icons/md";
import ChartPieInteractive from "./components/chart-pie-interactive";
import WeatherWidget from "@/components/widgets/weather-widget";
import SidebarHeader from "@/components/layout/nav/sidebar-header";
import { useTranslations } from "next-intl";

const Dashboard = () => {
  const t = useTranslations("dashboard");

  return (
    <div className="overflow-hidden h-full">
      {/* Pass the translation key, not the translated text */}
      <SidebarHeader title="dashboard" />

      <div className="space-y-6 p-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">{t("title")}</h1>
          <p className="text-muted-foreground">{t("subtitle")}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t("totalProducts")}
              </CardTitle>
              <MdInventory className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,847</div>
              <p className="text-xs text-muted-foreground">
                +12% {t("comparedToLastMonth")}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t("todayInbound")}
              </CardTitle>
              <MdTrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">
                +8% {t("comparedToYesterday")}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t("todayOutbound")}
              </CardTitle>
              <MdAssignment className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89</div>
              <p className="text-xs text-muted-foreground">
                -5% {t("comparedToYesterday")}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {t("defectiveProducts")}
              </CardTitle>
              <MdWarning className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">
                +2 {t("comparedToYesterday")}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts, Weather, and Activity */}
        <div className="grid gap-6 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <ChartPieInteractive />
          </div>
          <div className="space-y-6">
            <WeatherWidget />
          </div>
          <Card>
            <CardHeader>
              <CardTitle>{t("recentActivity")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                {t("noActivityData")}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
