"use client";
import getColumnsHistoryImportOrder from "@/components/common/manage-warehouse/history/history-stock-in-col";
import { ModalHistoryDetail } from "@/components/common/manage-warehouse/history/modal-history-detail";
import TableToolbarImportHistory from "@/components/common/manage-warehouse/history/tool-bar";
import { DataTable } from "@/components/common/table/data-table";
import { Button } from "@/components/ui/button";
import { useHistory } from "@/hooks/manage-warehouse/use-history";
import React, { useMemo } from "react";
import { RiFileExcel2Line } from "react-icons/ri";

const HistoryStockInClient = () => {
  const {
    data,
    isPending,
    openModalDetail,
    setOpenModalDetail,
    id,
    setId,
    mutate: searchHistory,
    downloadReportExcel,
  } = useHistory();
  const columns = useMemo(
    () => getColumnsHistoryImportOrder({ setOpenModalDetail, setId }),
    [setOpenModalDetail, setId]
  );
  return (
    <React.Fragment>
      <div className=" flex justify-end px-2 pt-2">
        <Button
          className="bg-gray-200 hover:bg-gray-300 cursor-pointer"
          onClick={() => downloadReportExcel()}
        >
          {" "}
          <RiFileExcel2Line className="text-green-600" size={20} />
          <span className="text-black">Xuất Excel</span>
        </Button>
      </div>
      <div className="p-2 w-full">
        <TableToolbarImportHistory searchHistory={searchHistory} />
      </div>
      <div className=" flex-1 min-h-0">
        <DataTable columns={columns} data={data ?? []} />
      </div>
      {id && openModalDetail && (
        <ModalHistoryDetail
          open={openModalDetail}
          setOpen={setOpenModalDetail}
          id={id}
        />
      )}
    </React.Fragment>
  );
};
export default HistoryStockInClient;
