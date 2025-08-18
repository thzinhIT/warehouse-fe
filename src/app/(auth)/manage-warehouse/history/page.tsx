import SidebarHeader from "@/components/layout/nav/sidebar-header";
import { Metadata } from "next";
import HistoryStockInClient from "./page-client";

export const metadata: Metadata = {
  title: "Lịch sử nhập kho",
};
const HistoryStockIn = () => {
  return (
    <div className="flex flex-col overflow-hidden">
      <SidebarHeader title="Lịch sử nhập kho" />
      <HistoryStockInClient />
    </div>
  );
};
export default HistoryStockIn;
