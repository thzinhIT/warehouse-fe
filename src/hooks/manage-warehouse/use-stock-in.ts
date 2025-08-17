"use client";
import StockInKeys from "@/lib/networking/client/manage-warehouse/endpoints";
import {
  getAllDetailImportOrder,
  ImportWarehouse,
} from "@/lib/networking/client/manage-warehouse/service";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const useStockIn = () => {
  const { data, isPending } = useQuery({
    queryKey: [StockInKeys.GETALLDETAILIMPORTORDER],
    queryFn: getAllDetailImportOrder,
  });

  return {
    data,
    isPending,
  };
};
