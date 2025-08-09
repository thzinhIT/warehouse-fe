import React from "react";
import DashboardClient from "./components/dashboard-client";
import SidebarHeader from "@/components/layout/nav/sidebar-header";

const Dashboard = () => {
  return (
    <div className="h-full">
      <SidebarHeader />

      <DashboardClient />
    </div>
  );
};

export default Dashboard;
