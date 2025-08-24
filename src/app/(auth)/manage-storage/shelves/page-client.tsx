"use client";
import TableShelves from "@/components/common/manage-storage/table-shelves";
import { Button } from "@/components/ui/button";
import { useShelves } from "@/hooks/manage-storage/use-shelves";
import { PlusCircle } from "lucide-react";

const ShelvesClient = () => {
  return (
    <div className="pt-2 pl-4 pr-2 flex  flex-col overflow-auto h-full ">
      <div className="flex gap-2 justify-end items-center">
        <Button className="flex items-center bg-blue-600 hover:bg-blue-500">
          <PlusCircle></PlusCircle>
          <span>Thêm kệ hàng</span>
        </Button>
        <Button className="flex items-center bg-blue-600 hover:bg-blue-500">
          <PlusCircle></PlusCircle>
          <span>Thêm thùng</span>
        </Button>
      </div>
      <div className=" mt-2 flex-1  pb-2 ">
        <TableShelves />
      </div>
    </div>
  );
};

export default ShelvesClient;
