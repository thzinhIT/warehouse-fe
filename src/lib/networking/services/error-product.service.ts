import { api } from "../axious";
import ApiEndPoint from "../api";
import {
  ErrorProductSearchFilters,
  ErrorProductApiResponse,
  ErrorProductDetailApiResponse,
} from "@/lib/types/error-product.types";

/**
 * Service class for Error Product/SKU API operations
 */
export class ErrorProductService {
  /**
   * Get all error SKUs/Products with optional filtering and pagination
   */
  static async getAllErrorSkus(
    filters?: ErrorProductSearchFilters,
    page: number = 1,
    limit: number = 20
  ): Promise<ErrorProductApiResponse> {
    try {
      const params = new URLSearchParams();

      if (page) params.append("page", page.toString());
      if (limit) params.append("limit", limit.toString());

      // Add filter parameters if provided
      if (filters?.skuCode) params.append("skuCode", filters.skuCode);
      if (filters?.size) params.append("size", filters.size);
      if (filters?.color) params.append("color", filters.color);
      if (filters?.type) params.append("type", filters.type);
      if (filters?.status) params.append("status", filters.status);
      if (filters?.errorReason)
        params.append("errorReason", filters.errorReason);

      const queryString = params.toString();
      const url = queryString
        ? `${ApiEndPoint.GET_ALL_ERROR_SKUS}?${queryString}`
        : ApiEndPoint.GET_ALL_ERROR_SKUS;

      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.error("Error fetching error SKUs:", error);
      throw error;
    }
  }

  /**
   * Get a single error SKU/Product by ID
   */
  static async getErrorSkuById(
    id: number
  ): Promise<ErrorProductDetailApiResponse> {
    try {
      const response = await api.get(
        `${ApiEndPoint.GET_ERROR_SKU_BY_ID}/${id}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching error SKU by ID:", error);
      throw error;
    }
  }

  /**
   * Search error SKUs with advanced filtering
   */
  static async searchErrorSkus(
    searchTerm: string,
    filters?: ErrorProductSearchFilters
  ): Promise<ErrorProductApiResponse> {
    try {
      // Prepare request body to match backend SearchErrorSkuRequest
      interface SearchRequest {
        skuCode?: string;
        size?: string;
        color?: string;
        type?: string;
        minUnitVolume?: number;
        maxUnitVolume?: number;
        status?: string;
        errorReason?: string;
      }

      const requestBody: SearchRequest = {};

      // Add fields only if they have values
      // Only use searchTerm for skuCode if no explicit skuCode filter is provided
      if (filters?.skuCode) {
        requestBody.skuCode = filters.skuCode;
      } else if (searchTerm) {
        requestBody.skuCode = searchTerm;
      }

      if (filters?.size) {
        requestBody.size = filters.size;
      }
      if (filters?.color) {
        requestBody.color = filters.color;
      }
      if (filters?.type) {
        requestBody.type = filters.type;
      }
      if (filters?.status) {
        requestBody.status = filters.status;
      }
      if (filters?.errorReason) {
        requestBody.errorReason = filters.errorReason;
      }
      if (filters?.minVolume) {
        requestBody.minUnitVolume = parseFloat(filters.minVolume);
      }
      if (filters?.maxVolume) {
        requestBody.maxUnitVolume = parseFloat(filters.maxVolume);
      }

      const response = await api.post(
        `${ApiEndPoint.SEARCH_ERROR_SKUS}`,
        requestBody
      );

      console.log("API Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error searching error SKUs:", error);
      throw error;
    }
  }
}
