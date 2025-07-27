import { DataTable } from "@/components/common/table/data-table";
import React from "react";
import ChartPieInteractive from "./components/chart-pie-interactive";
import SidebarHeader from "@/components/layout/nav/sidebar-header";
import DashboardClient from "./components/dashboard-client";

const Dashboard = () => {
  return (
    <div className="overflow-hidden h-full">
      <SidebarHeader title="dashboard" />

      <DashboardClient />
    </div>
  );
};

export default Dashboard;
