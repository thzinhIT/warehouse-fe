import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  getExportOrderBoard,
  searchExportOrdersBoard,
  TSearchExportOrder2Request,
} from "@/lib/networking/client/manage-warehouse/service";

export const useExportHistorySearch = () => {
  const [searchFilters, setSearchFilters] =
    useState<TSearchExportOrder2Request>({});
  const [isSearching, setIsSearching] = useState(false);

  // Fetch all export order board data when not searching
  const {
    data: allData,
    isPending: isLoadingAll,
    refetch: refetchAll,
  } = useQuery({
    queryKey: ["EXPORTORDERBOARDDETAILS"],
    queryFn: getExportOrderBoard,
    enabled: !isSearching,
  });

  // Search API call when searching
  const {
    data: searchData,
    isPending: isLoadingSearch,
    refetch: refetchSearch,
  } = useQuery({
    queryKey: ["SEARCHEXPORTORDERSBOARD", searchFilters],
    queryFn: () => {
      return searchExportOrdersBoard(searchFilters);
    },
    enabled:
      isSearching &&
      Object.keys(searchFilters).some(
        (key) => searchFilters[key as keyof TSearchExportOrder2Request]
      ),
  });

  const handleSearch = (filters: TSearchExportOrder2Request) => {
    // Only enable search if there are actual filter values
    const hasFilters = Object.values(filters).some(
      (value) => value && value.toString().trim() !== ""
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
