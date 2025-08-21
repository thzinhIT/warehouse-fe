"use client";
import StockOutKeys from "@/lib/networking/client/manage-warehouse/stock-out-endpoints";
import {
  getExportOrderBoard,
  getExportOrderDetailById,
  TExportOrderBoard,
} from "@/lib/networking/client/manage-warehouse/service";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const useExportHistory = () => {
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [selectedDetailId, setSelectedDetailId] = useState<number | null>(null);
  const [itemExportOrder, setItemExportOrder] = useState<TExportOrderBoard>();

  const { data, isPending } = useQuery({
    queryKey: [StockOutKeys.GETEXPORTORDERBOARDDETAILS],
    queryFn: getExportOrderBoard,
  });

  const { data: detailData, isPending: isDetailPending } = useQuery({
    queryKey: [StockOutKeys.GETEXPORTORDERDETAILBYID, selectedDetailId],
    queryFn: () => getExportOrderDetailById(selectedDetailId!),
    enabled: !!selectedDetailId,
  });

  const handleOnClickDetail = (data: TExportOrderBoard) => {
    setIsOpenDetail(true);
    setItemExportOrder(data);
    setSelectedDetailId(data.id);
  };

  const handleCloseDetail = () => {
    setIsOpenDetail(false);
    setItemExportOrder(undefined);
    setSelectedDetailId(null);
  };

  return {
    data,
    isPending,
    isOpenDetail,
    itemExportOrder,
    detailData,
    isDetailPending,
    setItemExportOrder,
    setIsOpenDetail,
    handleOnClickDetail,
    handleCloseDetail,
  };
};
