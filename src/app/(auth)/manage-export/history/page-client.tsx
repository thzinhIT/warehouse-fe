"use client";
import { ModalImportBulk } from "@/components/common/manage-warehouse/stock-in/modal-import-bulk";
import { ModalExportOrder } from "@/components/common/manage-warehouse/stock-out/modal-export-order";
import { ModalExportDetail } from "@/components/common/manage-warehouse/stock-out/modal-export-detail";
import { ExportHistorySearch } from "@/components/common/manage-warehouse/stock-out/export-history-search";
import { DataTable } from "@/components/common/table/data-table";
import SidebarHeader from "@/components/layout/nav/sidebar-header";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import getColumnsExportHistory from "@/components/common/manage-warehouse/stock-out/export-history-columns";
import { useExportHistorySearch } from "@/hooks/manage-warehouse/use-export-history-search";
import { TExportOrderBoard } from "@/lib/networking/client/manage-warehouse/service";
import { Outdent } from "lucide-react";

const ExportHistoryPageClient = () => {
  const [open, setOpen] = useState(false);
  const [openExportOrder, setOpenExportOrder] = useState(false);

  const { data, isPending, isSearching, handleSearch } =
    useExportHistorySearch();

  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [selectedExportId, setSelectedExportId] = useState<number>(0);

  const handleOnClickDetail = (item: TExportOrderBoard) => {
    setSelectedExportId(item.id);
    setIsOpenDetail(true);
  };

  return (
    <div className=" flex flex-col overflow-hidden">
      <SidebarHeader title="Lịch sử xuất kho" />

      <div className="flex justify-end items-center mt-2">
        <div className="flex gap-2 pr-2">
          <Button
            className="cursor-pointer flex items-center gap-2 text-white"
            style={{
              backgroundColor: "color-mix(in oklab, var(--ring) 50%, blue)",
              borderColor: "color-mix(in oklab, var(--ring) 50%, blue)",
            }}
            onClick={() => {
              setOpenExportOrder(true);
            }}
          >
            <Outdent size={20} />
            <span>Đơn đang xuất</span>
          </Button>
        </div>
      </div>

      <div>
        <ExportHistorySearch
          onSearch={handleSearch}
          isSearching={isSearching}
          isPending={isPending}
        />
      </div>

      <div className="flex-1 min-h-0">
        <DataTable
          columns={getColumnsExportHistory({ handleOnClickDetail })}
          data={(data as TExportOrderBoard[]) || []}
        />
      </div>
      {open && <ModalImportBulk open={open} setOpen={setOpen} />}

      {openExportOrder && (
        <ModalExportOrder open={openExportOrder} setOpen={setOpenExportOrder} />
      )}
      {isOpenDetail && (
        <ModalExportDetail
          open={isOpenDetail}
          setOpen={setIsOpenDetail}
          id={selectedExportId}
        />
      )}
    </div>
  );
};

export default ExportHistoryPageClient;
