"use client";
import StockInKeys from "@/lib/networking/client/manage-warehouse/endpoints";
import {
  getAllDetailImportOrder,
  ImportWarehouse,
  TDataImportOrderTemporary,
} from "@/lib/networking/client/manage-warehouse/service";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const useStockIn = () => {
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [itemImportOrder, setItemImportOrder] =
    useState<TDataImportOrderTemporary>();

  const { data, isPending } = useQuery({
    queryKey: [StockInKeys.GETALLDETAILIMPORTORDER],
    queryFn: getAllDetailImportOrder,
  });
  const handleOnClickDetail = (data: TDataImportOrderTemporary) => {
    setIsOpenDetail(true);
    setItemImportOrder(data);
  };

  return {
    data,
    isPending,
    isOpenDetail,
    itemImportOrder,
    setItemImportOrder,
    setIsOpenDetail,
    handleOnClickDetail,
  };
};
