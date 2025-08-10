"use client";
import React, { useEffect } from "react";
import DashboardClient from "./components/dashboard-client";
import SidebarHeader from "@/components/layout/nav/sidebar-header";
import { useAppContext } from "@/app/app-context";
import { redirect } from "next/navigation";

const Dashboard = () => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    const accessToken = localStorage.getItem("refreshToken");
    if (!token && !accessToken) {
      redirect("/login");
    }
  });

  return (
    <div className="h-full">
      <SidebarHeader />
      <DashboardClient />
    </div>
  );
};

export default Dashboard;
