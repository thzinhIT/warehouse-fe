// Request Types (based on your backend DTOs)
export interface ImportChartRequest {
  warehouseId?: number;
  startDate: string; // yyyy-MM-dd
  endDate: string;   // yyyy-MM-dd
}

export interface ExportChartRequest {
  warehouseId?: number;
  startDate: string; // yyyy-MM-dd
  endDate: string;   // yyyy-MM-dd
}

export interface SummaryChartRequest {
  startDate: string;  // yyyy-MM-dd
  endDate: string;    // yyyy-MM-dd
  type: "daily" | "monthly";
}

export interface OptimizationIndexRequest {
  startDate: string;
  endDate: string;
  warehouseId?: number; // null if want to get stats for all warehouses
}

export interface StorageStatusRequest {
  warehouseId?: number;
  // Add other fields as needed based on your backend
}

// Response Types (based on your backend DTOs)
export interface ImportChartResponse {
  importDate: string;    // yyyy-MM-dd
  totalItems: number;    // Total quantity imported in the day
  totalOrders: number;   // Total import orders in the day
}

export interface ExportChartResponse {
  exportDate: string;
  totalItems: number;
  totalOrders: number;
}

export interface SummaryChartResponse {
  date: string;
  totalImports?: number;
  totalExports?: number;
  // Add more fields as needed based on your backend implementation
  importOrders?: number;
  exportOrders?: number;
}

export interface SkuTypeRatioChartResponse {
  skuName: string;
  totalQuantity: number;
}

export interface OptimizationIndexResponse {
  date: string;
  totalImportOrders: number;
  totalImportItems: number;
  totalExportOrders: number;
  totalExportItems: number;
  optimizationRate: number; // Optimization ratio
}

export interface StorageStatusResponse {
  totalCapacity: number;
  usedCapacity: number;
  availableCapacity: number;
  utilizationRate: number;
  // Add more fields as needed
}

// Chart data types for frontend components
export interface ChartDataPoint {
  month?: string;
  desktop?: number;
  fill?: string;
  date?: string;
  value?: number;
  name?: string;
}

export interface BarChartDataPoint {
  month: string;
  imports: number;
  exports: number;
}
