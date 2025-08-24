import SidebarHeader from "@/components/layout/nav/sidebar-header";
import { Metadata } from "next";
import ShelvesClient from "./page-client";

export const metadata: Metadata = {
  title: "Quản lý kệ hàng",
};

const Shelves = () => {
  return (
    <>
      <SidebarHeader title="Quản lý kệ hàng " />
      <ShelvesClient />
    </>
  );
};
export default Shelves;
