// Error Product/SKU related types
export interface ErrorProduct {
  id: number; // Required for detail view
  sku?: string; // Keep as optional for backward compatibility
  skuCode: string; // This is what the API returns
  itemCount: number;
  name: string;
  size: string;
  color: string;
  type: string;
  unitVolume: number;
  damagedCount: number; // Specific field for damaged quantity
  errorReason?: string; // Additional field for error products
  errorDate?: string; // When the error was detected
  status?: string; // Error product status (e.g., "pending", "resolved", "discarded")
}

// Detailed error product type for getById response
export interface ErrorProductDetail {
  id: number;
  skuCode: string;
  name: string;
  size: string;
  color: string;
  type: string;
  unitVolume: number;
  createdAt: string;
  damagedItemCount: number;
  storageLocation: string;
  damagedItems: DamagedItemResponse[];
}

export interface DamagedItemResponse {
  barcode: string;
  note: string;
  boxCode: string;
  transferredAt: string;
}

export interface ErrorProductSearchFilters {
  sku?: string; // Keep for backward compatibility
  skuCode?: string; // Add skuCode for the actual API
  size?: string;
  color?: string;
  type?: string;
  minVolume?: string;
  maxVolume?: string;
  status?: string;
  errorReason?: string;
  errorDate?: string;
}

// This matches the actual API response structure
export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export type ErrorProductApiResponse = ApiResponse<ErrorProduct[]>;
export type ErrorProductDetailApiResponse = ApiResponse<ErrorProductDetail>;
