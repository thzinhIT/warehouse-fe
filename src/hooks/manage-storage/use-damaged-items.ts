import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  DamagedItemsService,
  DamagedItem,
  TransferItemRequest,
} from "@/lib/networking/services/damaged-items.service";

// Query key
const DAMAGED_ITEMS_QUERY_KEY = ["damaged-items"];

// Hook to get all damaged items
export const useDamagedItems = (enabled: boolean = true) => {
  return useQuery({
    queryKey: DAMAGED_ITEMS_QUERY_KEY,
    queryFn: () => {
      return DamagedItemsService.getDamagedItems();
    },
    enabled: enabled, // Only run when enabled
    retry: 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook to mark item as damaged
export const useMarkDamagedItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (barcode: string) =>
      DamagedItemsService.markItemAsDamaged(barcode),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: DAMAGED_ITEMS_QUERY_KEY,
      });
    },
  });
};

// Hook to add damaged item
export const useAddDamagedItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (item: Omit<DamagedItem, "barcode"> & { barcode: string }) =>
      DamagedItemsService.addDamagedItem(item),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: DAMAGED_ITEMS_QUERY_KEY,
      });
    },
  });
};

// Hook to update damaged item note
export const useUpdateDamagedItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ barcode, note }: { barcode: string; note: string }) =>
      DamagedItemsService.updateDamagedItem(barcode, note),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: DAMAGED_ITEMS_QUERY_KEY,
      });
    },
  });
};

// Hook to transfer damaged items
export const useTransferDamagedItems = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (items: TransferItemRequest[]) =>
      DamagedItemsService.transferDamagedItems(items),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: DAMAGED_ITEMS_QUERY_KEY,
      });
    },
  });
};

// Hook to delete damaged item
export const useDeleteDamagedItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (barcode: string) =>
      DamagedItemsService.deleteDamagedItem(barcode),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: DAMAGED_ITEMS_QUERY_KEY,
      });
    },
  });
};
