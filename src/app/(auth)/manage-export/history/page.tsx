"use client";
import { ModalImportBulk } from "@/components/common/manage-warehouse/stock-in/modal-import-bulk";
import { ModalImportOnline } from "@/components/common/manage-warehouse/stock-in/modal-import-online";
import { ModalDetailExportOrder } from "@/components/common/manage-warehouse/stock-out/modal-detail-export-order";
import { DataTable } from "@/components/common/table/data-table";
import SidebarHeader from "@/components/layout/nav/sidebar-header";
import { Button } from "@/components/ui/button";
import { CirclePlus, FilePlus } from "lucide-react";
import { useState } from "react";
import getColumnsExportHistory from "@/components/common/manage-warehouse/stock-out/export-history-columns";
import { useExportHistory } from "@/hooks/manage-warehouse/use-export-history";
import { TExportOrderBoard } from "@/lib/networking/client/manage-warehouse/service";

const ExportHistoryPage = () => {
  const [open, setOpen] = useState(false);
  const [openOnline, setOpenOnline] = useState(false);

  const {
    data,
    isPending,
    isOpenDetail,
    detailData,
    isDetailPending,
    handleOnClickDetail,
    handleCloseDetail,
  } = useExportHistory();

  return (
    <div className="h-full flex flex-col">
      <SidebarHeader title="Lịch sử xuất kho" />

      <div className="flex justify-between items-center px-2 mt-2">
        <h1 className="text-lg font-bold text-black">Lịch sử xuất kho</h1>
        <div className="flex gap-2">
          <Button
            className="cursor-pointer bg-blue-600 hover:bg-blue-700 flex items-center"
            onClick={() => {
              setOpen(true);
            }}
          >
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
            <span>Thêm trực tiếp</span>
          </Button>
        </div>
      </div>

      <div className="flex-1 px-2 mt-4">
        {isPending ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-lg">Đang tải dữ liệu...</div>
          </div>
        ) : (
          <DataTable
            columns={getColumnsExportHistory({ handleOnClickDetail })}
            data={(data as TExportOrderBoard[]) || []}
          />
        )}
      </div>
      <ModalImportBulk open={open} setOpen={setOpen} />
      <ModalImportOnline open={openOnline} setOpen={setOpenOnline} />
      <ModalDetailExportOrder
        open={isOpenDetail}
        setOpen={handleCloseDetail}
        data={detailData}
        isLoading={isDetailPending}
      />
    </div>
  );
};

export default ExportHistoryPage;
