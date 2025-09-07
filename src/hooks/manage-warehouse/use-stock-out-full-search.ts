import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  getAllExportOrderDetails,
  searchExportOrdersFull,
  TSearchExportOrderRequest,
} from "@/lib/networking/client/manage-warehouse/service";
import StockOutKeys from "@/lib/networking/client/manage-warehouse/stock-out-endpoints";

export const useStockOutFullSearch = () => {
  const [searchFilters, setSearchFilters] = useState<TSearchExportOrderRequest>(
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
    queryKey: ["SEARCHEXPORTORDERSFULL", searchFilters],
    queryFn: () => {
      return searchExportOrdersFull(searchFilters);
    },
    enabled:
      isSearching &&
      Object.keys(searchFilters).some(
        (key) => searchFilters[key as keyof TSearchExportOrderRequest]
      ),
  });

  const handleSearch = (filters: TSearchExportOrderRequest) => {
    // Only enable search if there are actual filter values
    const hasFilters = Object.values(filters).some(
      (value) => value && value.trim() !== ""
    );

    if (hasFilters) {
      setSearchFilters(filters);
      setIsSearching(true);
    } else {
      // If no filters, show all data
      handleClearSearch();
    }
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

  // Return the appropriate data based on search state
  const data = isSearching ? searchData : allData;
  const isPending = isSearching ? isLoadingSearch : isLoadingAll;

  return {
    data,
    isPending,
    isSearching,
    searchFilters,
    handleSearch,
    handleClearSearch,
    handleRefresh,
  };
};
