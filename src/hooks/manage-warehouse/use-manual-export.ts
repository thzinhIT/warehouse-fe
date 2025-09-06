import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getSkuStatusForExport,
  moveItemsToQueue,
  moveItemsBackFromQueue,
  exportWithRoute,
  TSkuStatusItem,
} from "@/lib/networking/client/manage-warehouse/service";

export const ManualExportKeys = {
  all: ["manual-export"] as const,
  skuStatus: () => [...ManualExportKeys.all, "sku-status"] as const,
};

export function useSkuStatusForExport() {
  return useQuery({
    queryKey: ManualExportKeys.skuStatus(),
    queryFn: getSkuStatusForExport,
    retry: 1,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useMoveToQueue() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: moveItemsToQueue,
    onSuccess: () => {
      // Refresh the SKU status data after successful move
      queryClient.invalidateQueries({ queryKey: ManualExportKeys.skuStatus() });
    },
  });
}

export function useMoveBackFromQueue() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: moveItemsBackFromQueue,
    onSuccess: () => {
      // Refresh the SKU status data after successful move back
      queryClient.invalidateQueries({ queryKey: ManualExportKeys.skuStatus() });
    },
  });
}

export function useExportWithRoute() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: exportWithRoute,
    onSuccess: () => {
      // Refresh the SKU status data after successful export
      queryClient.invalidateQueries({ queryKey: ManualExportKeys.skuStatus() });
    },
  });
}

// Transform API data to modal format
export function transformSkuStatusToModalData(skuStatusData: TSkuStatusItem[]) {
  return skuStatusData.map((item, index) => ({
    id: `${item.skuCode}-${index}`, // Create unique ID
    skuCode: item.skuCode,
    productName: item.skuCode, // Using skuCode as productName since API doesn't provide it
    availableQuantity: item.availableQty,
    selectedQuantity: 0,
    isSelected: false,
  }));
}
