"use client";
import getColumnsHistoryImportOrder from "@/components/common/manage-warehouse/history/history-stock-in-col";
import { ModalHistoryDetail } from "@/components/common/manage-warehouse/history/modal-history-detail";
import { DataTable } from "@/components/common/table/data-table";
import { Button } from "@/components/ui/button";
import { useHistory } from "@/hooks/manage-warehouse/use-history";
import React, { useMemo } from "react";

const HistoryStockInClient = () => {
  const columns = useMemo(() => getColumnsHistoryImportOrder(), []);
  const { data, isPending } = useHistory();
  return (
    <React.Fragment>
      <div className=" flex justify-end px-2 pt-2">
        <Button>Xuất Excel</Button>
      </div>
      <div className=" flex-1 min-h-0">
        <DataTable columns={columns} data={data ?? []} />
      </div>

      {/* <ModalHistoryDetail open={true} /> */}
    </React.Fragment>
  );
};
export default HistoryStockInClient;
