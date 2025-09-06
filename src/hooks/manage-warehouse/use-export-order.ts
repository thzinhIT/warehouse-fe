import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ExportOrderService } from "@/lib/networking/services/export-order.service";
//import { toast } from "sonner";

// Query keys for export orders
export const EXPORT_ORDER_QUERY_KEYS = {
  all: ["export-orders"] as const,
  latest: ["export-orders", "latest"] as const,
} as const;

// Hook to get latest export information
export const useLatestExport = () => {
  return useQuery({
    queryKey: EXPORT_ORDER_QUERY_KEYS.latest,
    queryFn: () => ExportOrderService.getLatestExport(),
    retry: 1,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook to update export note
export const useUpdateExportNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ exportCode, note }: { exportCode: string; note: string }) =>
      ExportOrderService.updateExportNote(exportCode, note),
    onSuccess: () => {
      //toast.success("Cập nhật ghi chú thành công");
      // Invalidate and refetch latest export data
      queryClient.invalidateQueries({
        queryKey: EXPORT_ORDER_QUERY_KEYS.latest,
      });
    },
    onError: (error: unknown) => {
    },
  });
};
