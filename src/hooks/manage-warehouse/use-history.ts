"use client";
import StockInKeys from "@/lib/networking/client/manage-warehouse/endpoints";
import {
  DownloadReportExcel,
  getAllHistoryImportOrder,
  SearchImportHistory,
  TDataImportOrderTemporary,
} from "@/lib/networking/client/manage-warehouse/service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

export function useHistory() {
  const [openModalDetail, setOpenModalDetail] = useState<boolean>(false);
  const [dataFilter, setDataFilter] = useState<TDataImportOrderTemporary[]>();

  const [id, setId] = useState<number>();
  const { data, isPending } = useQuery({
    queryKey: [StockInKeys.GETALLHISTORYIMPORTORDER],
    queryFn: getAllHistoryImportOrder,
  });

  const { mutate, isPending: searchPending } = useMutation({
    mutationKey: [StockInKeys.SEARCH_IMPORT_HISTORY],
    mutationFn: SearchImportHistory,
    onSuccess: (data) => {
      setDataFilter(data);
    },
  });
  const { mutate: downloadReportExcel } = useMutation({
    mutationKey: [StockInKeys.DOWNLOAD_REPORT_EXCEL],
    mutationFn: DownloadReportExcel,
  });
  return {
    data: dataFilter || data,
    id,
    setId,
    isPending,
    openModalDetail,
    setOpenModalDetail,
    mutate,
    downloadReportExcel,
    searchPending,
  };
}
