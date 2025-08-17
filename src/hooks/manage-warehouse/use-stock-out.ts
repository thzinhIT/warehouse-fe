import StockOutKeys from "@/lib/networking/client/manage-warehouse/stock-out-endpoints";
import { getAllExportOrderDetails } from "@/lib/networking/client/manage-warehouse/service";
import { useQuery } from "@tanstack/react-query";

export const useStockOut = () => {
  const { data, isPending } = useQuery({
    queryKey: [StockOutKeys.GETALLEXPORTORDERDETAILS],
    queryFn: getAllExportOrderDetails,
  });

  return {
    data,
    isPending,
  };
};
