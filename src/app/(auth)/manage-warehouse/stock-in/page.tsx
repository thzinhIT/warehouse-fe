"use client";
import { ModalImportBulk } from "@/components/common/stock-in/modal-import-bulk";
import { ModalImportOnline } from "@/components/common/stock-in/modal-import-online";
import { DataTable } from "@/components/common/table/data-table";
import SidebarHeader from "@/components/layout/nav/sidebar-header";
import { Button } from "@/components/ui/button";
import { CirclePlus, FilePlus } from "lucide-react";
import { useState } from "react";

const StockIn = () => {
  const [open, setOpen] = useState(false);
  const [openOnline, setOpenOnline] = useState(false);
  return (
    <div className="flex flex-col h-full">
      <SidebarHeader title="Nhập kho" />

      <div className="flex justify-between items-center px-2 mt-2 ">
        <h1 className=" text-lg font-bold text-black">Dữ liệu nhập kho</h1>
        <div className="flex gap-2">
          <Button
            className="cursor-pointer bg-blue-600 hover:bg-blue-700 flex items-center"
            onClick={() => {
              setOpen(true);
            }}
          >
            {" "}
            <FilePlus size={20} />
            <span>Nhập hàng loạt</span>
          </Button>
          <Button
            className="cursor-pointer bg-blue-600 hover:bg-blue-700 flex items-center"
            onClick={() => {
              setOpenOnline(true);
            }}
          >
            <CirclePlus size={20} />

            <span> Thêm trực tiếp</span>
          </Button>
        </div>
      </div>
      <div className=" flex-1 min-h-0">
        <DataTable />
      </div>

      <ModalImportBulk open={open} setOpen={setOpen} />
      <ModalImportOnline open={openOnline} setOpen={setOpenOnline} />
    </div>
  );
};

export default StockIn;
