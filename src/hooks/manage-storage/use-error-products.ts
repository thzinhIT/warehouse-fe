import { useQuery, useMutation } from "@tanstack/react-query";
import { ErrorProductService } from "@/lib/networking/services/error-product.service";
import { ErrorProductSearchFilters } from "@/lib/types/error-product.types";
import toast from "react-hot-toast";

// Query keys
export const errorProductQueryKeys = {
  all: ["error-products"] as const,
  lists: () => [...errorProductQueryKeys.all, "list"] as const,
  list: (filters?: ErrorProductSearchFilters, page?: number, limit?: number) =>
    [...errorProductQueryKeys.lists(), { filters, page, limit }] as const,
  details: () => [...errorProductQueryKeys.all, "detail"] as const,
  detail: (id: number) => [...errorProductQueryKeys.details(), id] as const,
};

/**
 * Hook to fetch all error products/SKUs with optional filtering and pagination
 */
export const useErrorProducts = (
  filters?: ErrorProductSearchFilters,
  page: number = 1,
  limit: number = 20
) => {
  return useQuery({
    queryKey: errorProductQueryKeys.list(filters, page, limit),
    queryFn: () => ErrorProductService.getAllErrorSkus(filters, page, limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

/**
 * Hook to fetch a single error product/SKU by ID
 */
export const useErrorProduct = (id: number) => {
  return useQuery({
    queryKey: errorProductQueryKeys.detail(id),
    queryFn: () => ErrorProductService.getErrorSkuById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook to search error products/SKUs using mutation for better control
 */
export const useErrorProductSearchMutation = () => {
  return useMutation({
    mutationFn: ({
      searchTerm,
      filters,
    }: {
      searchTerm: string;
      filters?: ErrorProductSearchFilters;
    }) => ErrorProductService.searchErrorSkus(searchTerm, filters),
    onError: (error: Error) => {
      console.error("Search error product error:", error);
      toast.error(error?.message || "Có lỗi xảy ra khi tìm kiếm sản phẩm lỗi");
    },
  });
};
