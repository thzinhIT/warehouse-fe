"use client";
import { ModalImportBulk } from "@/components/common/manage-warehouse/stock-in/modal-import-bulk";
import { ModalImportOnline } from "@/components/common/manage-warehouse/stock-in/modal-import-online";
import { DataTable } from "@/components/common/table/data-table";
import SidebarHeader from "@/components/layout/nav/sidebar-header";
import { Button } from "@/components/ui/button";
import { CirclePlus, FilePlus } from "lucide-react";
import { useState } from "react";
import getColumnsExportOrder from "@/components/common/manage-warehouse/stock-out/export-order-columns";
import getColumnsExportOrderSearch from "@/components/common/manage-warehouse/stock-out/export-order-search-columns";
import { useMemo } from "react";
import { useStockOutSearch } from "@/hooks/manage-warehouse/use-stock-out-search";
import { ExportOrderSearch } from "@/components/common/manage-warehouse/stock-out/export-order-search";

const StockOutPage = () => {
  const [open, setOpen] = useState(false);
  const [openOnline, setOpenOnline] = useState(false);

  const {
    data,
    isPending,
    isSearching,
    handleSearch,
    handleClearSearch,
    handleRefresh,
  } = useStockOutSearch();

  // Use different columns based on search state
  const columns = useMemo(() => {
    return isSearching ? getColumnsExportOrderSearch() : getColumnsExportOrder();
  }, [isSearching]);

  return (
    <div className="flex flex-col h-full">
      <SidebarHeader title="Xuất kho" />

      <div className="flex justify-between items-center px-2 mt-2 ">
        <h1 className=" text-lg font-bold text-black">
          {isSearching ? "Kết quả tìm kiếm đơn xuất" : "Dữ liệu xuất kho"}
          {isSearching && (
            <span className="text-blue-600 font-normal text-sm ml-2">
              (Đơn xuất khớp với bộ lọc)
            </span>
          )}
        </h1>
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

      {/* Search Component */}
      <div className="px-2">
        <ExportOrderSearch
          onSearch={handleSearch}
          onClear={handleClearSearch}
          onRefresh={handleRefresh}
          isSearching={isSearching}
          isPending={isPending}
        />
      </div>

      <div className=" flex-1 min-h-0">
        <DataTable columns={columns} data={data ?? []} />
      </div>
      <ModalImportBulk open={open} setOpen={setOpen} />
      <ModalImportOnline open={openOnline} setOpen={setOpenOnline} />
    </div>
  );
};

export default StockOutPage;
