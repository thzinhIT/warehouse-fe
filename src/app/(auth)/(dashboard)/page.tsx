"use client";
import React, { useEffect } from "react";
import DashboardClient from "./components/dashboard-client";
import SidebarHeader from "@/components/layout/nav/sidebar-header";
import { useAppContext } from "@/app/app-context";
import { redirect } from "next/navigation";

const Dashboard = () => {
  return (
    <div className="h-full">
      <SidebarHeader />
      <DashboardClient />
    </div>
  );
};

export default Dashboard;
