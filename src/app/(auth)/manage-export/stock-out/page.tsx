import { Metadata } from "next";
import StockOutPageClient from "./page-client";
export const metadata: Metadata = {
  title: "Xuất kho",
};

const StockOutPage = () => {
  return <StockOutPageClient />;
};

export default StockOutPage;
