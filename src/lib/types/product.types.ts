// Product/SKU related types
export interface Product {
  skuId: number;
  id?: number;
  sku?: string;
  skuCode: string;
  itemCount: number;
  name: string;
  size: string;
  color: string;
  type: string;
  unitVolume: number;
}

// Detailed product type for getById response - matches your backend response
export interface ProductDetail {
  id: number;
  skuCode: string;
  name: string;
  size: string;
  color: string;
  type: string;
  unitVolume: number;
  totalItemCount: number;
  boxes: BoxItemResponse[];
}

export interface BoxItemResponse {
  boxCode: string;
  itemCount: number;
}

export interface ProductSearchFilters {
  sku?: string; // Keep for backward compatibility
  skuCode?: string; // Add skuCode for the actual API
  size?: string;
  color?: string;
  type?: string;
  minVolume?: string;
  maxVolume?: string;
  status?: string;
  categoryId?: number;
  brandId?: number;
}

// This matches the actual API response structure
export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

// For list responses, data is directly an array
export type ProductApiResponse = ApiResponse<Product[]>;
export type SingleProductApiResponse = ApiResponse<Product>;
export type ProductDetailApiResponse = ApiResponse<ProductDetail>;
