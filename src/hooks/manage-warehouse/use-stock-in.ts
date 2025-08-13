import StockInKeys from "@/lib/networking/client/manage-warehouse/endpoints";
import { getAllDetailImportOrder } from "@/lib/networking/client/manage-warehouse/service";
import { useQuery } from "@tanstack/react-query";

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
