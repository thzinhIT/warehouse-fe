import StockOutKeys from "@/lib/networking/client/manage-warehouse/stock-out-endpoints";
import { 
  getAllExportOrderDetails,
  searchExportOrders,
  ExportOrderSearchRequest,
  TAllExportOrderDetails,
  TDataExportOrder
} from "@/lib/networking/client/manage-warehouse/service";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const useStockOutSearch = () => {
  const [searchFilters, setSearchFilters] = useState<ExportOrderSearchRequest>({});
  const [isSearching, setIsSearching] = useState(false);

  // Fetch all export order details when not searching
  const { 
    data: allData, 
    isPending: isLoadingAll,
    refetch: refetchAll 
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
    error: searchError
  } = useQuery({
    queryKey: [StockOutKeys.SEARCHEXPORTORDERS, searchFilters],
    queryFn: () => {
      console.log("Making API call with filters:", searchFilters);
      return searchExportOrders(searchFilters);
    },
    enabled: isSearching,
  });

  const handleSearch = (filters: ExportOrderSearchRequest) => {
    console.log("🔍 useStockOutSearch - handleSearch called with:", filters);
    setSearchFilters(filters);
    setIsSearching(true);
    console.log("🔍 Search state changed - isSearching: true");
  };

  const handleClearSearch = () => {
    console.log("🔍 useStockOutSearch - handleClearSearch called");
    setSearchFilters({});
    setIsSearching(false);
    console.log("🔍 Search state changed - isSearching: false");
  };

  const handleRefresh = () => {
    console.log("🔍 useStockOutSearch - handleRefresh called, isSearching:", isSearching);
    if (isSearching) {
      refetchSearch();
    } else {
      refetchAll();
    }
  };

  return {
    // Data - returns different types based on search state
    data: isSearching ? (searchData as TDataExportOrder[]) : (allData as TAllExportOrderDetails[]),
    
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
