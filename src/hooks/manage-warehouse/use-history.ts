"use client";
import StockInKeys from "@/lib/networking/client/manage-warehouse/endpoints";
import { getAllHistoryImportOrder } from "@/lib/networking/client/manage-warehouse/service";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export function useHistory() {
  const [openModalDetail, setOpenModalDetail] = useState<boolean>(false);

  const [id, setId] = useState<number>();
  const { data, isPending } = useQuery({
    queryKey: [StockInKeys.GETALLHISTORYIMPORTORDER],
    queryFn: getAllHistoryImportOrder,
  });
  return {
    data,
    id,
    setId,
    isPending,
    openModalDetail,
    setOpenModalDetail,
  };
}
