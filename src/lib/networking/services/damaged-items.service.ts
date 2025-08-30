import { api } from "../axious";

// Types for damaged items
export interface DamagedItem {
  barcode: string;
  note: string;
}

export interface DamagedItemsResponse {
  code: number;
  message: string;
  data: DamagedItem[];
}

export class DamagedItemsService {
  private static readonly BASE_URL = "/api/damaged-items";

  // Get all damaged items
  static async getDamagedItems(): Promise<DamagedItemsResponse> {
    try {
      const response = await api.get<DamagedItemsResponse>(this.BASE_URL);

      // Your backend returns code: 200 for success, which is valid
      if (
        response.data &&
        (response.data.code === 200 || response.data.code === 0)
      ) {
        return response.data;
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error: any) {
      // If endpoint doesn't exist, return mock data for testing
      if (error.response?.status === 404) {
        const mockResponse: DamagedItemsResponse = {
          code: 200,
          message: "Mock data",
          data: [
            { barcode: "ITEM001", note: "Damaged packaging" },
            { barcode: "ITEM002", note: "Scratched surface" },
            { barcode: "ITEM003", note: "Missing components" },
          ],
        };
        return mockResponse;
      }

      throw error;
    }
  }

  // Add damaged item (if needed for future)
  static async addDamagedItem(
    item: Omit<DamagedItem, "barcode"> & { barcode: string }
  ): Promise<DamagedItemsResponse> {
    const response = await api.post<DamagedItemsResponse>(this.BASE_URL, item);
    return response.data;
  }

  // Update damaged item note
  static async updateDamagedItem(
    barcode: string,
    note: string
  ): Promise<DamagedItemsResponse> {
    console.log("📝 Updating note for barcode:", barcode, "with note:", note);
    try {
      const response = await api.put<DamagedItemsResponse>(
        `${
          this.BASE_URL
        }/update-note?barcode=${barcode}&note=${encodeURIComponent(note)}`
      );
      console.log("✅ Update note response:", response.data);
      return response.data;
    } catch (error: unknown) {
      console.error("❌ Update note error:", error);
      throw error;
    }
  }

  // Delete damaged item
  static async deleteDamagedItem(
    barcode: string
  ): Promise<DamagedItemsResponse> {
    console.log("🗑️ Deleting damaged item with barcode:", barcode);
    try {
      const response = await api.delete<DamagedItemsResponse>(
        `${this.BASE_URL}/delete?barcode=${barcode}`
      );
      console.log("✅ Delete response:", response.data);
      return response.data;
    } catch (error: any) {
      console.error("❌ Delete error:", error);
      throw error;
    }
  }
}
