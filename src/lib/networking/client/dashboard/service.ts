import { api } from "../../axious";
import ApiEndPoint from "../../api";
import {
  ImportChartRequest,
  ImportChartResponse,
  ExportChartRequest,
  ExportChartResponse,
  SummaryChartRequest,
  SummaryChartResponse,
  SkuTypeRatioChartResponse,
  OptimizationIndexRequest,
  OptimizationIndexResponse,
  StorageStatusRequest,
  StorageStatusResponse,
} from "../../../types/dashboard.types";

export const dashboardApi = {
  // WMS-04: Import Chart
  getImportChart: async (
    request: ImportChartRequest
  ): Promise<ImportChartResponse[]> => {
    const response = await api.post(ApiEndPoint.IMPORT_CHART, request);
    return response.data.data; // ✅ unwrap ApiResponse
  },

  // WMS-05: Export Chart
  getExportChart: async (
    request: ExportChartRequest
  ): Promise<ExportChartResponse[]> => {
    const response = await api.post(ApiEndPoint.EXPORT_CHART, request);
    return response.data.data;
  },

  // WMS-06: Summary Chart
  getSummaryChart: async (
    request: SummaryChartRequest
  ): Promise<SummaryChartResponse[]> => {
    const response = await api.post(ApiEndPoint.SUMMARY_CHART, request);
    return response.data.data;
  },

  // WMS-07: SKU Type Ratio Chart
  getSkuTypeRatio: async (): Promise<SkuTypeRatioChartResponse[]> => {
    const response = await api.get(ApiEndPoint.SKU_TYPE_RATIO);
    return response.data.data;
  },

  // WMS-09: Optimization Index
  getOptimizationIndex: async (
    request: OptimizationIndexRequest
  ): Promise<OptimizationIndexResponse[]> => {
    const response = await api.post(ApiEndPoint.OPTIMIZATION_INDEX, request);
    return response.data.data;
  },

  // WMS-10: Storage Status
  getStorageStatus: async (
    request: StorageStatusRequest
  ): Promise<StorageStatusResponse> => {
    const response = await api.post(ApiEndPoint.STORAGE_STATUS, request);
    return response.data.data;
  },

  // WMS-12: Export warehouse report PDF
  exportWarehouseReportPdf: async (
    request: StorageStatusRequest
  ): Promise<Blob> => {
    const response = await api.post(
      ApiEndPoint.WAREHOUSE_SUMMARY_PDF,
      request,
      {
        responseType: "blob",
        headers: {
          Accept: "application/pdf",
        },
      }
    );
    return response.data; // this one is fine
  },
};
