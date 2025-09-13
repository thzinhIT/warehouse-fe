import ProductManagementPageClient from "./page-client";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Quản lý sản phẩm",
};
const ProductManagementPage = () => {
  return <ProductManagementPageClient />;
};
export default ProductManagementPage;
