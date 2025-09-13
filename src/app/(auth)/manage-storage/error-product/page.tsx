import ErrorProductManagementPageClient from "./page-client";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Quản lý sản phẩm lỗi",
};

const ErrorProductManagementPage = () => {
  return <ErrorProductManagementPageClient />;
};
export default ErrorProductManagementPage;
