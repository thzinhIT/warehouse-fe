import { useState, useCallback } from "react";
import { dashboardApi } from "../../lib/networking/client/dashboard/service";
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
  ChartDataPoint,
  BarChartDataPoint,
} from "../../lib/types/dashboard.types";

interface UseDashboardDataReturn {
  // Data states
  importChartData: ImportChartResponse[];
  exportChartData: ExportChartResponse[];
  summaryChartData: SummaryChartResponse[];
  skuTypeRatioData: SkuTypeRatioChartResponse[];
  optimizationIndexData: OptimizationIndexResponse[];
  storageStatusData: StorageStatusResponse | null;

  // Loading states
  isLoadingImportChart: boolean;
  isLoadingExportChart: boolean;
  isLoadingSummaryChart: boolean;
  isLoadingSkuTypeRatio: boolean;
  isLoadingOptimizationIndex: boolean;
  isLoadingStorageStatus: boolean;

  // Error states
  importChartError: string | null;
  exportChartError: string | null;
  summaryChartError: string | null;
  skuTypeRatioError: string | null;
  optimizationIndexError: string | null;
  storageStatusError: string | null;

  // Action functions
  fetchImportChart: (request: ImportChartRequest) => Promise<void>;
  fetchExportChart: (request: ExportChartRequest) => Promise<void>;
  fetchSummaryChart: (request: SummaryChartRequest) => Promise<void>;
  fetchSkuTypeRatio: () => Promise<void>;
  fetchOptimizationIndex: (request: OptimizationIndexRequest) => Promise<void>;
  fetchStorageStatus: (request: StorageStatusRequest) => Promise<void>;

  // Utility functions for chart formatting
  formatImportDataForPieChart: () => ChartDataPoint[];
  formatExportDataForPieChart: () => ChartDataPoint[];
  formatSkuTypeRatioForPieChart: () => ChartDataPoint[];
  formatSummaryDataForBarChart: () => BarChartDataPoint[];

  // PDF export
  exportWarehousePdf: (request: StorageStatusRequest) => Promise<void>;
}

export const useDashboardData = (): UseDashboardDataReturn => {
  // Data states
  const [importChartData, setImportChartData] = useState<ImportChartResponse[]>(
    []
  );
  const [exportChartData, setExportChartData] = useState<ExportChartResponse[]>(
    []
  );
  const [summaryChartData, setSummaryChartData] = useState<
    SummaryChartResponse[]
  >([]);
  const [skuTypeRatioData, setSkuTypeRatioData] = useState<
    SkuTypeRatioChartResponse[]
  >([]);
  const [optimizationIndexData, setOptimizationIndexData] = useState<
    OptimizationIndexResponse[]
  >([]);
  const [storageStatusData, setStorageStatusData] =
    useState<StorageStatusResponse | null>(null);

  // Loading states
  const [isLoadingImportChart, setIsLoadingImportChart] = useState(false);
  const [isLoadingExportChart, setIsLoadingExportChart] = useState(false);
  const [isLoadingSummaryChart, setIsLoadingSummaryChart] = useState(false);
  const [isLoadingSkuTypeRatio, setIsLoadingSkuTypeRatio] = useState(false);
  const [isLoadingOptimizationIndex, setIsLoadingOptimizationIndex] =
    useState(false);
  const [isLoadingStorageStatus, setIsLoadingStorageStatus] = useState(false);

  // Error states
  const [importChartError, setImportChartError] = useState<string | null>(null);
  const [exportChartError, setExportChartError] = useState<string | null>(null);
  const [summaryChartError, setSummaryChartError] = useState<string | null>(
    null
  );
  const [skuTypeRatioError, setSkuTypeRatioError] = useState<string | null>(
    null
  );
  const [optimizationIndexError, setOptimizationIndexError] = useState<
    string | null
  >(null);
  const [storageStatusError, setStorageStatusError] = useState<string | null>(
    null
  );

  // Fetch functions
  const fetchImportChart = useCallback(async (request: ImportChartRequest) => {
    setIsLoadingImportChart(true);
    setImportChartError(null);
    try {
      const data = await dashboardApi.getImportChart(request);
      setImportChartData(data);
    } catch (error) {
      setImportChartError(
        error instanceof Error
          ? error.message
          : "Failed to fetch import chart data"
      );
    } finally {
      setIsLoadingImportChart(false);
    }
  }, []);

  const fetchExportChart = useCallback(async (request: ExportChartRequest) => {
    setIsLoadingExportChart(true);
    setExportChartError(null);
    try {
      const data = await dashboardApi.getExportChart(request);
      setExportChartData(data);
    } catch (error) {
      setExportChartError(
        error instanceof Error
          ? error.message
          : "Failed to fetch export chart data"
      );
    } finally {
      setIsLoadingExportChart(false);
    }
  }, []);

  const fetchSummaryChart = useCallback(
    async (request: SummaryChartRequest) => {
      setIsLoadingSummaryChart(true);
      setSummaryChartError(null);
      try {
        const data = await dashboardApi.getSummaryChart(request);
        setSummaryChartData(data);
      } catch (error) {
        setSummaryChartError(
          error instanceof Error
            ? error.message
            : "Failed to fetch summary chart data"
        );
      } finally {
        setIsLoadingSummaryChart(false);
      }
    },
    []
  );

  const fetchSkuTypeRatio = useCallback(async () => {
    setIsLoadingSkuTypeRatio(true);
    setSkuTypeRatioError(null);
    try {
      const data = await dashboardApi.getSkuTypeRatio();
      setSkuTypeRatioData(data);
    } catch (error) {
      setSkuTypeRatioError(
        error instanceof Error
          ? error.message
          : "Failed to fetch SKU type ratio data"
      );
    } finally {
      setIsLoadingSkuTypeRatio(false);
    }
  }, []);

  const fetchOptimizationIndex = useCallback(
    async (request: OptimizationIndexRequest) => {
      setIsLoadingOptimizationIndex(true);
      setOptimizationIndexError(null);
      try {
        const data = await dashboardApi.getOptimizationIndex(request);
        setOptimizationIndexData(data);
      } catch (error) {
        setOptimizationIndexError(
          error instanceof Error
            ? error.message
            : "Failed to fetch optimization index data"
        );
      } finally {
        setIsLoadingOptimizationIndex(false);
      }
    },
    []
  );

  const fetchStorageStatus = useCallback(
    async (request: StorageStatusRequest) => {
      setIsLoadingStorageStatus(true);
      setStorageStatusError(null);
      try {
        const data = await dashboardApi.getStorageStatus(request);
        setStorageStatusData(data);
      } catch (error) {
        setStorageStatusError(
          error instanceof Error
            ? error.message
            : "Failed to fetch storage status data"
        );
      } finally {
        setIsLoadingStorageStatus(false);
      }
    },
    []
  );

  // PDF export function
  const exportWarehousePdf = useCallback(
    async (request: StorageStatusRequest) => {
      try {
        const blob = await dashboardApi.exportWarehouseReportPdf(request);

        // Create a download link
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `warehouse-summary-${
          new Date().toISOString().split("T")[0]
        }.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (error) {}
    },
    []
  );

  // Chart formatting functions
  const formatImportDataForPieChart = useCallback((): ChartDataPoint[] => {
    if (!importChartData || importChartData.length === 0) return [];

    return importChartData.map((item, index) => ({
      month: item.importDate,
      desktop: item.totalItems,
      fill: `hsl(${(index * 137.5) % 360}, 70%, 50%)`, // Generate colors dynamically
    }));
  }, [importChartData]);

  const formatExportDataForPieChart = useCallback((): ChartDataPoint[] => {
    if (!exportChartData || exportChartData.length === 0) return [];

    return exportChartData.map((item, index) => ({
      month: item.exportDate,
      desktop: item.totalItems,
      fill: `hsl(${(index * 137.5) % 360}, 70%, 50%)`,
    }));
  }, [exportChartData]);

  const formatSkuTypeRatioForPieChart = useCallback((): ChartDataPoint[] => {
    if (!skuTypeRatioData || skuTypeRatioData.length === 0) return [];

    return skuTypeRatioData.map((item, index) => ({
      month: item.skuName,
      desktop: item.totalQuantity,
      fill: `hsl(${(index * 137.5) % 360}, 70%, 50%)`,
    }));
  }, [skuTypeRatioData]);

  const formatSummaryDataForBarChart = useCallback((): BarChartDataPoint[] => {
    return summaryChartData.map((item) => ({
      month: item.date,
      imports: item.totalImports || 0,
      exports: item.totalExports || 0,
    }));
  }, [summaryChartData]);

  return {
    // Data
    importChartData,
    exportChartData,
    summaryChartData,
    skuTypeRatioData,
    optimizationIndexData,
    storageStatusData,

    // Loading states
    isLoadingImportChart,
    isLoadingExportChart,
    isLoadingSummaryChart,
    isLoadingSkuTypeRatio,
    isLoadingOptimizationIndex,
    isLoadingStorageStatus,

    // Error states
    importChartError,
    exportChartError,
    summaryChartError,
    skuTypeRatioError,
    optimizationIndexError,
    storageStatusError,

    // Actions
    fetchImportChart,
    fetchExportChart,
    fetchSummaryChart,
    fetchSkuTypeRatio,
    fetchOptimizationIndex,
    fetchStorageStatus,

    // Formatting utilities
    formatImportDataForPieChart,
    formatExportDataForPieChart,
    formatSkuTypeRatioForPieChart,
    formatSummaryDataForBarChart,

    // PDF export
    exportWarehousePdf,
  };
};
