"use client";
import React from "react";
import DashboardClient from "./components/dashboard-client";
import SidebarHeader from "@/components/layout/nav/sidebar-header";

const Dashboard = () => {
  return (
    <div className="h-full flex flex-col  ">
      <SidebarHeader title="Bảng điều khiển" />
      <div className="overflow-auto flex-1">
        <DashboardClient />
      </div>
    </div>
  );
};

export default Dashboard;
