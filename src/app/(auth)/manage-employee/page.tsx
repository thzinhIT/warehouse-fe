import ManageEmployeePageClient from "./page-client";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Quản lý nhân viên",
};
export default function ManageEmployeePage() {
  return <ManageEmployeePageClient />;
}
