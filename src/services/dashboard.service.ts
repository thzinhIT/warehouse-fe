// Dashboard service that provides utility functions for dashboard operations
import {
  ImportChartRequest,
  ExportChartRequest,
  SummaryChartRequest,
  OptimizationIndexRequest,
  StorageStatusRequest,
} from "../lib/types/dashboard.types";

export const dashboardService = {
  getLastNDaysDateRange: (days: number) => {
    const endDate = new Date().toISOString().split("T")[0];
    const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];
    return { startDate, endDate };
  },

  getCurrentMonthDateRange: () => {
    const now = new Date();
    const startDate = new Date(now.getFullYear(), now.getMonth(), 1)
      .toISOString()
      .split("T")[0];
    const endDate = now.toISOString().split("T")[0];
    return { startDate, endDate };
  },

  getLastMonthDateRange: () => {
    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const startDate = lastMonth.toISOString().split("T")[0];
    const endDate = new Date(now.getFullYear(), now.getMonth(), 0)
      .toISOString()
      .split("T")[0];
    return { startDate, endDate };
  },

  // Create default request objects
  createImportChartRequest: (
    dateRange?: { startDate: string; endDate: string },
    warehouseId?: number
  ): ImportChartRequest => {
    const range = dateRange || dashboardService.getLastNDaysDateRange(30);
    return {
      startDate: range.startDate,
      endDate: range.endDate,
      warehouseId,
    };
  },

  createExportChartRequest: (
    dateRange?: { startDate: string; endDate: string },
    warehouseId?: number
  ): ExportChartRequest => {
    const range = dateRange || dashboardService.getLastNDaysDateRange(30);
    return {
      startDate: range.startDate,
      endDate: range.endDate,
      warehouseId,
    };
  },

  createSummaryChartRequest: (
    dateRange?: { startDate: string; endDate: string },
    type: "daily" | "monthly" = "daily"
  ): SummaryChartRequest => {
    const range = dateRange || dashboardService.getLastNDaysDateRange(30);
    return {
      startDate: range.startDate,
      endDate: range.endDate,
      type,
    };
  },

  createOptimizationIndexRequest: (
    dateRange?: { startDate: string; endDate: string },
    warehouseId?: number
  ): OptimizationIndexRequest => {
    const range = dateRange || dashboardService.getLastNDaysDateRange(30);
    return {
      startDate: range.startDate,
      endDate: range.endDate,
      warehouseId,
    };
  },

  createStorageStatusRequest: (warehouseId?: number): StorageStatusRequest => {
    return {
      warehouseId,
    };
  },
};
