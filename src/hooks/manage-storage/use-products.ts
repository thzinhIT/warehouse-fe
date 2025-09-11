import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ProductService } from "@/lib/networking/services/product.service";
import {
  Product,
  ProductSearchFilters,
  ProductDetail,
} from "@/lib/types/product.types";
import toast from "react-hot-toast";

// Query keys
export const productQueryKeys = {
  all: ["products"] as const,
  lists: () => [...productQueryKeys.all, "list"] as const,
  list: (filters?: ProductSearchFilters, page?: number, limit?: number) =>
    [...productQueryKeys.lists(), { filters, page, limit }] as const,
  details: () => [...productQueryKeys.all, "detail"] as const,
  detail: (id: number) => [...productQueryKeys.details(), id] as const,
};

/**
 * Hook to fetch all products/SKUs with optional filtering and pagination
 */
export const useProducts = (
  filters?: ProductSearchFilters,
  page: number = 1,
  limit: number = 20
) => {
  return useQuery({
    queryKey: productQueryKeys.list(filters, page, limit),
    queryFn: () => ProductService.getAllSkus(filters, page, limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

/**
 * Hook to fetch a single product/SKU by ID
 */
export const useProduct = (id: number) => {
  return useQuery({
    queryKey: productQueryKeys.detail(id),
    queryFn: () => ProductService.getSkuById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook to fetch a single product/SKU by SKU Code
 */
// export const useProductBySkuCode = (skuCode: string | null) => {
//   return useQuery({
//     queryKey: [...productQueryKeys.details(), "bySkuCode", skuCode],
//     queryFn: () => ProductService.getSkuBySkuCode(skuCode!),
//     enabled: !!skuCode,
//     staleTime: 5 * 60 * 1000, // 5 minutes
//   });
// };

/**
 * Hook to search products/SKUs using mutation for better control
 */
export const useProductSearchMutation = () => {
  return useMutation({
    mutationFn: ({
      searchTerm,
      filters,
    }: {
      searchTerm: string;
      filters?: ProductSearchFilters;
    }) => ProductService.searchSkus(searchTerm, filters),
    onError: (error: Error) => {
      console.error("Search product error:", error);
      toast.error(error?.message || "Có lỗi xảy ra khi tìm kiếm sản phẩm");
    },
  });
};
