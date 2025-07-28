import { DataTable } from "@/components/common/table/data-table";
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
import DashboardClient from "./components/dashboard-client";

const Dashboard = () => {
  return (
    <div className="overflow-hidden h-full">
      <SidebarHeader title="dashboard" />

      <div className="space-y-6 p-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Tổng quan hệ thống quản lý kho hàng
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Tổng sản phẩm
              </CardTitle>
              <MdInventory className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,847</div>
              <p className="text-xs text-muted-foreground">
                +12% so với tháng trước
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Nhập kho hôm nay
              </CardTitle>
              <MdTrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">
                +8% so với hôm qua
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Xuất kho hôm nay
              </CardTitle>
              <MdAssignment className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89</div>
              <p className="text-xs text-muted-foreground">
                -5% so với hôm qua
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Sản phẩm lỗi
              </CardTitle>
              <MdWarning className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">+2 so với hôm qua</p>
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
              <CardTitle>Hoạt động gần đây</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                Dữ liệu hoạt động sẽ hiển thị ở đây
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
