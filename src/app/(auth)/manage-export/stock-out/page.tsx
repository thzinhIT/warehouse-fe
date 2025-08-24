"use client";
import { ModalImportBulk } from "@/components/common/manage-warehouse/stock-in/modal-import-bulk";
import { ModalImportOnline } from "@/components/common/manage-warehouse/stock-in/modal-import-online";
import { ModalDetailExportOrder } from "@/components/common/manage-warehouse/stock-out/modal-detail-export-order";
import {
  ModalManualExport,
  TManualExportItem,
} from "@/components/common/manage-warehouse/stock-out/modal-manual-export";
import { DataTable } from "@/components/common/table/data-table";
import SidebarHeader from "@/components/layout/nav/sidebar-header";
import { Button } from "@/components/ui/button";
import {
  CirclePlus,
  FilePlus,
  FileSpreadsheet,
  Package,
  Truck,
  Hand,
} from "lucide-react";
import { useState } from "react";
import getColumnsExportOrder from "@/components/common/manage-warehouse/stock-out/export-order-columns";
import { useStockOut } from "@/hooks/manage-warehouse/use-stock-out";
import {
  useSkuStatusForExport,
  transformSkuStatusToModalData,
} from "@/hooks/manage-warehouse/use-manual-export";
import { TAllExportOrderDetails } from "@/lib/networking/client/manage-warehouse/service";

const StockOutPage = () => {
  const [open, setOpen] = useState(false);
  const [openOnline, setOpenOnline] = useState(false);
  const [openManualExport, setOpenManualExport] = useState(false);

  const {
    data,
    isPending,
    isOpenDetail,
    detailData,
    isDetailPending,
    handleOnClickDetail,
    handleCloseDetail,
  } = useStockOut();

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
    console.log("Đơn đang xuất clicked");
    // TODO: Call your API here
  };

  const handleExportToExcel = () => {
    // API call for "Xuất Excel"
    console.log("Xuất Excel clicked");
    // TODO: Call your API here
  };

  const handleExportByOrder = () => {
    // API call for "Xuất theo đơn"
    console.log("Xuất theo đơn clicked");
    // TODO: Call your API here
  };

  const handleManualExport = () => {
    // Open the manual export modal
    console.log("Xuất thủ công clicked");
    setOpenManualExport(true);
  };

  const handleManualExportConfirm = (selectedItems: TManualExportItem[]) => {
    console.log("Selected items for export:", selectedItems);
    // TODO: Call your API to process the manual export
    setOpenManualExport(false);
  };

  return (
    <div className="h-full flex flex-col">
      <SidebarHeader title="Xuất kho" />

      <div className="flex justify-between items-center px-2 mt-2">
        <h1 className="text-lg font-bold text-black">Dữ liệu xuất kho</h1>
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

      {/* 4 Export Action Buttons */}
      <div className="px-2 mt-4 mb-4">
        <div className="flex gap-3 justify-start">
          <Button
            className="cursor-pointer bg-orange-500 hover:bg-orange-600 flex items-center gap-2 text-white"
            onClick={handleExportingOrders}
          >
            <Truck size={18} />
            <span>Đơn đang xuất</span>
          </Button>
          <Button
            className="cursor-pointer bg-green-600 hover:bg-green-700 flex items-center gap-2 text-white"
            onClick={handleExportToExcel}
          >
            <FileSpreadsheet size={18} />
            <span>Xuất Excel</span>
          </Button>
          <Button
            className="cursor-pointer bg-purple-600 hover:bg-purple-700 flex items-center gap-2 text-white"
            onClick={handleExportByOrder}
          >
            <Package size={18} />
            <span>Xuất theo đơn</span>
          </Button>
          <Button
            className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 flex items-center gap-2 text-white"
            onClick={handleManualExport}
          >
            <Hand size={18} />
            <span>Xuất thủ công</span>
          </Button>
        </div>
      </div>

      <div className="flex-1 px-2">
        {isPending ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-lg">Đang tải dữ liệu...</div>
          </div>
        ) : (
          <DataTable
            columns={getColumnsExportOrder({ handleOnClickDetail })}
            data={(data as TAllExportOrderDetails[]) || []}
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
      <ModalManualExport
        open={openManualExport}
        setOpen={setOpenManualExport}
        data={manualExportData}
        isLoading={isSkuStatusLoading}
        onExport={handleManualExportConfirm}
      />
    </div>
  );
};

export default StockOutPage;
