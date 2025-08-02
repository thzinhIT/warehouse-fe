import React from "react";
import SidebarHeader from "@/components/layout/nav/sidebar-header";
import DashboardClient from "./components/dashboard-client";

const Dashboard = () => {
  return (
    <div className="h-full">
      <SidebarHeader title="dashboard" />

      <DashboardClient />
    </div>
  );
};

export default Dashboard;
