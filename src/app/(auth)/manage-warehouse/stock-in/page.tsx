import { Metadata } from "next";
import StockInClient from "./page-client";
export const metadata: Metadata = {
  title: "Nhập kho",
};
const StockIn = () => {
  return <StockInClient />;
};

export default StockIn;
