import SidebarHeader from "@/components/layout/nav/sidebar-header";
import { Metadata } from "next";
import SystemLogClient from "./page-client";

export const metadata: Metadata = {
  title: "Nhật ký hệ thống",
};
const SystemLog = () => {
  return (
    <div className="flex flex-col h-full ">
      <SidebarHeader title="Nhật ký hệ thống" />

      <SystemLogClient />
    </div>
  );
};
export default SystemLog;
