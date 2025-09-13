"use client";
import { ModalImportBulk } from "@/components/common/manage-warehouse/stock-in/modal-import-bulk";
import { ModalImportOnline } from "@/components/common/manage-warehouse/stock-in/modal-import-online";
import { ModalUpdateExportOrder } from "@/components/common/manage-warehouse/stock-out/modal-update-export-order";
import { ExportOrderSearch } from "@/components/common/manage-warehouse/stock-out/export-order-search";
import {
  ModalManualExport,
  TManualExportItem,
} from "@/components/common/manage-warehouse/stock-out/modal-manual-export";
import { DataTable } from "@/components/common/table/data-table";
import SidebarHeader from "@/components/layout/nav/sidebar-header";
import { Button } from "@/components/ui/button";
import { Hand } from "lucide-react";
import { useState } from "react";
import getColumnsExportOrder from "@/components/common/manage-warehouse/stock-out/export-order-columns";
import {
  useSkuStatusForExport,
  transformSkuStatusToModalData,
} from "@/hooks/manage-warehouse/use-manual-export";
import { useStockOutFullSearch } from "@/hooks/manage-warehouse/use-stock-out-full-search";
import { TAllExportOrderDetails } from "@/lib/networking/client/manage-warehouse/service";

const StockOutPageClient = () => {
  const [open, setOpen] = useState(false);
  const [openOnline, setOpenOnline] = useState(false);
  const [openManualExport, setOpenManualExport] = useState(false);

  const { data, isPending, isSearching, handleSearch } =
    useStockOutFullSearch();

  // Modal state for export order details
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [selectedDetailId, setSelectedDetailId] = useState<number>(0);

  const handleOnClickDetail = (item: TAllExportOrderDetails) => {
    setSelectedDetailId(item.id);
    setIsOpenDetail(true);
  };

  // Use API hook for manual export data
  const { data: skuStatusData, isLoading: isSkuStatusLoading } =
    useSkuStatusForExport();

  // Transform API data for modal
  const manualExportData = skuStatusData
    ? transformSkuStatusToModalData(skuStatusData)
    : [];

  // Handlers for the 4 export buttons
  const handleExportingOrders = () => {
    // API call for "Đơn đang xuất"
    // TODO: Call your API here
  };

  const handleExportToExcel = () => {
    // API call for "Xuất Excel"
    // TODO: Call your API here
  };

  const handleExportByOrder = () => {
    // API call for "Xuất theo đơn"
    // TODO: Call your API here
  };

  const handleManualExport = () => {
    // Open the manual export modal    console.log("Xuất thủ công clicked");
    setOpenManualExport(true);
  };

  const handleManualExportConfirm = (selectedItems: TManualExportItem[]) => {
    // TODO: Call your API to process the manual export
    setOpenManualExport(false);
  };

  return (
    <>
      <div className="flex flex-col overflow-hidden">
        <SidebarHeader title="Xuất kho" />

        <div className="flex justify-end items-center pt-2">
          <div className="flex gap-2 pr-2">
            <Button
              className="cursor-pointer flex items-center gap-2  text-white"
              style={{
                backgroundColor: "color-mix(in oklab, var(--ring) 50%, blue)",
                borderColor: "color-mix(in oklab, var(--ring) 50%, blue)",
              }}
              onClick={handleManualExport}
            >
              <Hand size={18} />
              <span>Xuất thủ công</span>
            </Button>
          </div>
        </div>

        <div>
          <ExportOrderSearch
            onSearch={handleSearch}
            isSearching={isSearching}
            isPending={isPending}
          />
        </div>

        <div className="flex-1 min-h-0 ">
          <DataTable
            columns={getColumnsExportOrder({ handleOnClickDetail })}
            data={data || []}
          />
        </div>
      </div>
      {open && <ModalImportBulk open={open} setOpen={setOpen} />}
      {openOnline && (
        <ModalImportOnline open={openOnline} setOpen={setOpenOnline} />
      )}
      {isOpenDetail && (
        <ModalUpdateExportOrder
          open={isOpenDetail}
          setOpen={setIsOpenDetail}
          detailId={selectedDetailId}
          title="Chi tiết sản phẩm xuất kho"
        />
      )}
      {openManualExport && (
        <ModalManualExport
          open={openManualExport}
          setOpen={setOpenManualExport}
          data={manualExportData}
          isLoading={isSkuStatusLoading}
          onExport={handleManualExportConfirm}
        />
      )}
    </>
  );
};

export default StockOutPageClient;
