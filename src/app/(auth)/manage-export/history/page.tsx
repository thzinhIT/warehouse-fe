import { Metadata } from "next";
import ExportHistoryPageClient from "./page-client";
export const metadata: Metadata = {
  title: "Lịch sử xuất kho",
};
const ExportHistoryPage = () => {
  return <ExportHistoryPageClient />;
};

export default ExportHistoryPage;
