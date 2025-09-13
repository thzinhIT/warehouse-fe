import SidebarHeader from "@/components/layout/nav/sidebar-header";
import { Metadata } from "next";
import SettingUserClient from "./page-client";

export const metadata: Metadata = {
  title: "Cài đặt tài khoản",
};
const HistoryStockIn = () => {
  return (
    <div className="flex flex-col overflow-hidden">
      <SidebarHeader title="Cài đặt tài khoản" />
      <SettingUserClient />
    </div>
  );
};
export default HistoryStockIn;
