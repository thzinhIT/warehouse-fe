import StockOutKeys from "@/lib/networking/client/manage-warehouse/stock-out-endpoints";
import {
  getAllExportOrderDetails,
  searchExportOrders,
  ExportOrderSearchRequest,
} from "@/lib/networking/client/manage-warehouse/service";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const useStockOutSearch = () => {
  const [searchFilters, setSearchFilters] = useState<ExportOrderSearchRequest>(
    {}
  );
  const [isSearching, setIsSearching] = useState(false);

  // Fetch all export order details when not searching
  const {
    data: allData,
    isPending: isLoadingAll,
    refetch: refetchAll,
  } = useQuery({
    queryKey: [StockOutKeys.GETALLEXPORTORDERDETAILS],
    queryFn: getAllExportOrderDetails,
    enabled: !isSearching,
  });

  // Search API call when searching
  const {
    data: searchData,
    isPending: isLoadingSearch,
    refetch: refetchSearch,
  } = useQuery({
    queryKey: [StockOutKeys.SEARCHEXPORTORDERS, searchFilters],
    queryFn: () => {
      return searchExportOrders(searchFilters);
    },
    enabled: isSearching,
  });

  const handleSearch = (filters: ExportOrderSearchRequest) => {
    setSearchFilters(filters);
    setIsSearching(true);
  };

  const handleClearSearch = () => {
    setSearchFilters({});
    setIsSearching(false);
  };

  const handleRefresh = () => {
    if (isSearching) {
      refetchSearch();
    } else {
      refetchAll();
    }
  };

  return {
    // Data - returns different types based on search state
    data: isSearching ? searchData : allData,

    // Loading states
    isPending: isSearching ? isLoadingSearch : isLoadingAll,

    // Search state
    isSearching,
    searchFilters,

    // Actions
    handleSearch,
    handleClearSearch,
    handleRefresh,
  };
};
