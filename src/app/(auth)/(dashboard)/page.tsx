import React from "react";
import DashboardClient from "./components/dashboard-client";
import { SidebarHeader, SidebarTrigger } from "@/components/ui/sidebar";

const Dashboard = () => {
  return (
    <div className="h-full">
      <SidebarTrigger />

      <DashboardClient />
    </div>
  );
};

export default Dashboard;
