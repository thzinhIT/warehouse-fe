"use client";
import getColumsImportOrder from "@/components/common/manage-warehouse/stock-in/import-order-columns";
import { ModalImportBulk } from "@/components/common/manage-warehouse/stock-in/modal-import-bulk";
import { ModalImportOnline } from "@/components/common/manage-warehouse/stock-in/modal-import-online";
import { ModalUpdateImportOrder } from "@/components/common/manage-warehouse/stock-in/modal-update-order-import";
import TableToolbarImport from "@/components/common/manage-warehouse/stock-in/tool-bar";
import { DataTable } from "@/components/common/table/data-table";
import SidebarHeader from "@/components/layout/nav/sidebar-header";
import { Button } from "@/components/ui/button";
import { useStockIn } from "@/hooks/manage-warehouse/use-stock-in";
import { CirclePlus, FilePlus } from "lucide-react";
import { useMemo, useState } from "react";

const StockInClient = () => {
  const [open, setOpen] = useState(false);
  const {
    data,
    itemImportOrder,
    handleOnClickDetail,
    isOpenDetail,
    setIsOpenDetail,
    mutate,
    openOnline,
    setOpenOnline,
    isPendingCreateImportOrder,
    searchImport,
  } = useStockIn();
  const columns = useMemo(
    () => getColumsImportOrder({ handleOnClickDetail }),
    [handleOnClickDetail]
  );

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
      <div className="px-2">
        <TableToolbarImport searchImport={searchImport} />
      </div>
      <div className=" flex-1 min-h-0">
        <DataTable columns={columns} data={data ?? []} />{" "}
      </div>
      {open && <ModalImportBulk open={open} setOpen={setOpen} />}
      {openOnline && (
        <ModalImportOnline
          open={openOnline}
          setOpen={setOpenOnline}
          mutate={mutate}
          isPending={isPendingCreateImportOrder}
        />
      )}
      {isOpenDetail && (
        <ModalUpdateImportOrder
          open={isOpenDetail}
          setOpen={setIsOpenDetail}
          isUpdate={false}
          data={itemImportOrder}
        />
      )}
    </div>
  );
};

export default StockInClient;
