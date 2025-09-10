import { api } from "../axious";
import ApiEndPoint from "../api";
import {
  Product,
  ProductSearchFilters,
  ProductApiResponse,
  ProductDetailApiResponse,
} from "../../types/product.types";

export class ProductService {
  /**
   * Get all SKUs/Products with optional filtering and pagination
   */
  static async getAllSkus(
    filters?: ProductSearchFilters,
    page: number = 1,
    limit: number = 20
  ): Promise<ProductApiResponse> {
    try {
      const params = new URLSearchParams();

      // Add pagination
      params.append("page", page.toString());
      params.append("limit", limit.toString());

      // Add filters if provided
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            params.append(key, value.toString());
          }
        });
      }

      const response = await api.get(
        `${ApiEndPoint.GET_ALL_SKUS}?${params.toString()}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching SKUs:", error);
      throw error;
    }
  }

  /**
   * Get a single SKU/Product by ID
   */
  static async getSkuById(id: number): Promise<ProductDetailApiResponse> {
    try {
      const response = await api.get(`/api/skus/getById/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching SKU by ID:", error);
      throw error;
    }
  }

  /**
   * Get a single SKU/Product by SKU Code (if you have this endpoint)
   */
  static async getSkuBySkuCode(
    skuCode: string
  ): Promise<ProductDetailApiResponse> {
    try {
      // Use the new endpoint that accepts skuCode
      const response = await api.get(
        `${ApiEndPoint.GET_SKU_BY_SKU_CODE}/${skuCode}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching SKU by SkuCode:", error);
      throw error;
    }
  }
  /**
   * Search SKUs with advanced filtering
   */
  static async searchSkus(
    searchTerm: string,
    filters?: ProductSearchFilters
  ): Promise<ProductApiResponse> {
    try {
      // Prepare request body to match backend SearchSkuRequest
      interface SearchRequest {
        skuCode?: string;
        size?: string;
        color?: string;
        type?: string;
        minUnitVolume?: number;
        maxUnitVolume?: number;
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
      if (filters?.minVolume) {
        requestBody.minUnitVolume = parseFloat(filters.minVolume);
      }
      if (filters?.maxVolume) {
        requestBody.maxUnitVolume = parseFloat(filters.maxVolume);
      }

      const response = await api.post(
        `${ApiEndPoint.SEARCH_SKUS}`,
        requestBody
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
