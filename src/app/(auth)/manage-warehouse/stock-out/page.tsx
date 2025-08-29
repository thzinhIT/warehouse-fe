"use client";
import getColumnsExportOrder from "@/components/common/manage-warehouse/stock-out/export-order-columns";
import { ModalExportBulk } from "@/components/common/manage-warehouse/stock-out/modal-export-bulk";
import { ModalExportOnline } from "@/components/common/manage-warehouse/stock-out/modal-export-online";
import { ModalUpdateExportOrder } from "@/components/common/manage-warehouse/stock-out/modal-update-export-order";
import { DataTable } from "@/components/common/table/data-table";
import SidebarHeader from "@/components/layout/nav/sidebar-header";
import { Button } from "@/components/ui/button";
import { useStockOut } from "@/hooks/manage-warehouse/use-stock-out";
import { CirclePlus, FilePlus } from "lucide-react";
import { useMemo, useState } from "react";

const StockOut = () => {
  const [open, setOpen] = useState(false);
  const [openOnline, setOpenOnline] = useState(false);
  const {
    data,
    itemExportOrder,
    handleOnClickDetail,
    isOpenDetail,
    setIsOpenDetail,
  } = useStockOut();

  const columns = useMemo(
    () => getColumnsExportOrder({ handleOnClickDetail }),
    [handleOnClickDetail]
  );

  return (
    <div className="flex flex-col h-full">
      <SidebarHeader title="Xuất kho" />
      <div className="flex justify-between items-center px-2 mt-2 ">
        <h1 className=" text-lg font-bold text-black">Dữ liệu xuất kho</h1>
        <div className="flex gap-2">
          <Button
            className="cursor-pointer bg-blue-600 hover:bg-blue-700 flex items-center"
            onClick={() => {
              setOpen(true);
            }}
          >
            {" "}
            <FilePlus size={20} />
            <span>Xuất hàng loạt</span>
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
        <DataTable columns={columns} data={data ?? []} />
      </div>
      {open && <ModalExportBulk open={open} setOpen={setOpen} />}
      <ModalExportOnline open={openOnline} setOpen={setOpenOnline} />
      {isOpenDetail && (
        <ModalUpdateExportOrder
          open={isOpenDetail}
          setOpen={setIsOpenDetail}
          isUpdate={false}
          data={itemExportOrder}
        />
      )}
    </div>
  );
};

export default StockOut;
