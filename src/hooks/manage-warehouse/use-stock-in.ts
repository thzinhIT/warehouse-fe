"use client";
import StockInKeys from "@/lib/networking/client/manage-warehouse/endpoints";
import {
  CreateImportOrder,
  getAllDetailImportOrder,
  ImportWarehouse,
  TDataImportOrderTemporary,
} from "@/lib/networking/client/manage-warehouse/service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const useStockIn = () => {
  const [isOpenDetail, setIsOpenDetail] = useState(false);
  const [itemImportOrder, setItemImportOrder] =
    useState<TDataImportOrderTemporary>();

  const [openOnline, setOpenOnline] = useState(false);

  const { data, isPending, refetch } = useQuery({
    queryKey: [StockInKeys.GETALLDETAILIMPORTORDER],
    queryFn: getAllDetailImportOrder,
  });
  const handleOnClickDetail = (data: TDataImportOrderTemporary) => {
    setIsOpenDetail(true);
    setItemImportOrder(data);
  };

  const { mutate, isPending: isPendingCreateImportOrder } = useMutation({
    mutationKey: [StockInKeys.CREATE_IMPORT_ORDER],
    mutationFn: CreateImportOrder,
    onSuccess: () => {
      refetch();
      setOpenOnline(false);
    },
  });

  return {
    data,
    isPending,
    isOpenDetail,
    itemImportOrder,
    isPendingCreateImportOrder,
    mutate,
    openOnline,
    setOpenOnline,
    setItemImportOrder,
    setIsOpenDetail,
    handleOnClickDetail,
  };
};
