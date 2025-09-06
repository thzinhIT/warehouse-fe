import { api } from "../axious";

// Export Info Response interface - matches backend ExportInfoResponse
export interface ExportInfoResponse {
  exportCode: string;
  exportDate: string; // LocalDateTime from backend, formatted as string
  note?: string;
  pickingRoutes: PickingRouteResponse[];
}

// Picking Route Response interface - matches backend PickingRouteResponse
export interface PickingRouteResponse {
  skuCode: string;
  boxCode: string;
  shelfCode?: string;
  quantityPicked: number;
  barcodes: string[];
}

export class ExportOrderService {
  private static readonly BASE_URL = "/admin/export-orders";

  // Get latest export information
  static async getLatestExport(): Promise<ExportInfoResponse | null> {
    try {
      console.log("🔍 Fetching latest export info");

      const response = await api.get<ExportInfoResponse>(
        `${this.BASE_URL}/export/latest`
      );

      console.log("✅ Latest export response:", response.data);
      return response.data;
    } catch (error: unknown) {
      console.error("❌ Get latest export error:", error);
      // Return null if no content (204) or other errors
      return null;
    }
  }

  // Update export note
  static async updateExportNote(exportCode: string, note: string): Promise<void> {
    try {
      console.log("🔄 Updating export note:", { exportCode, note });

      await api.put(
        `${this.BASE_URL}/export/update-note`,
        null,
        {
          params: {
            exportCode,
            note,
          },
        }
      );

      console.log("✅ Note updated successfully");
    } catch (error: unknown) {
      console.error("❌ Update note error:", error);
      throw error;
    }
  }
}
