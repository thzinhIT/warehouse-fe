import StockOutKeys from "@/lib/networking/client/manage-warehouse/stock-out-endpoints";
import {
  searchExportOrders,
  ExportOrderSearchRequest,
} from "@/lib/networking/client/manage-warehouse/service";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const useExportOrderSearch = () => {
  const [searchFilters, setSearchFilters] = useState<ExportOrderSearchRequest>(
    {}
  );
  const [isSearchActive, setIsSearchActive] = useState(false);

  // Search query for export orders (not details)
  const {
    data: searchResults,
    isPending: isSearching,
    refetch,
    error,
  } = useQuery({
    queryKey: [StockOutKeys.SEARCHEXPORTORDERS, searchFilters],
    queryFn: () => searchExportOrders(searchFilters),
    enabled:
      isSearchActive &&
      Object.values(searchFilters).some(
        (value) => value !== null && value !== undefined && value !== ""
      ),
  });

  const handleSearch = (filters: ExportOrderSearchRequest) => {
    setSearchFilters(filters);
    setIsSearchActive(true);
  };

  const handleClearSearch = () => {
    setSearchFilters({});
    setIsSearchActive(false);
  };

  const handleRefresh = () => {
    if (isSearchActive) {
      refetch();
    }
  };

  return {
    // Data
    data: searchResults,

    // Loading states
    isPending: isSearching,

    // Search state
    isSearchActive,
    searchFilters,
    error,

    // Actions
    handleSearch,
    handleClearSearch,
    handleRefresh,
  };
};
