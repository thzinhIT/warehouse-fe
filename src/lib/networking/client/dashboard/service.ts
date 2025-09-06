import toast from "react-hot-toast";
import ApiEndPoint from "../../api";
import { api } from "../../axious";

export type TBodyImportChart = {
  warehouseId: 1;
  startDate: string;
  endDate: string;
};
export type TDataImportChart = {
  importDate: string;
  totalItems: number;
  totalOrders: number;
};
export type TDataExportChart = {
  date: string;
  manualQuantity: number;
  haravanQuantity: number;
};

type TImportChartImportResponse = {
  code: number;
  message: string;
  data: TDataImportChart[];
};
type TChartExportResponse = {
  code: number;
  message: string;
  data: TDataExportChart[];
};

export interface TDataChartStorage {
  shelfName: string;
  totalCapacity: number;
  usedCapacity: number;
  usedPercentage: number;
}

export interface TChartStorageResponse {
  code: number;
  message: string;
  data: TDataChartStorage[];
}
export type TDataChartError = {
  date: string;
  damaged: number;
  returned: number;
};

export type TChartErrorResponse = {
  code: number;
  message: string;
  data: TDataChartError[];
};

export type TDonutChartData = {
  totalCapacity: number;
  usedCapacity: number;
  usedPercentage: number;
  freePercentage: number;
};

type TDonutChartResponse = {
  code: number;
  message: string;
  data: TDonutChartData;
};

export async function DataChartImport(body: TBodyImportChart) {
  try {
    const res = await api.post<TImportChartImportResponse>(
      `${ApiEndPoint.CHART_IMPORT}`,
      body
    );
    if (res?.data?.code === 200) return res?.data?.data;
    return Promise.reject(new Error("errors get import chart"));
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}

export async function DataChartExport(body: TBodyImportChart) {
  try {
    const res = await api.post<TChartExportResponse>(
      `${ApiEndPoint.CHART_EXPORT}`,
      body
    );
    if (res?.data?.code === 200) return res?.data?.data;
    return Promise.reject(new Error("errors get export chart"));
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}

export async function DataChartStorage() {
  try {
    const res = await api.post<TChartStorageResponse>(
      `${ApiEndPoint.STORAGE_CHART}`,
      { warehouseId: 1 }
    );
    if (res?.data?.code === 200) return res?.data?.data;
    return Promise.reject(new Error("errors get storage chart"));
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}

export async function DataChartError(body: TBodyImportChart) {
  try {
    const res = await api.post<TChartErrorResponse>(
      `${ApiEndPoint.ERROR_CHART}`,
      body
    );
    if (res?.data?.code === 200) return res?.data?.data;
    return Promise.reject(new Error("errors get error chart"));
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}
export async function DataChartDonutStorage() {
  try {
    const res = await api.post<TDonutChartResponse>(
      `${ApiEndPoint.STORAGE_DONUT}`,
      {
        warehouseId: 1,
      }
    );
    if (res?.data?.code === 200) return res?.data?.data;
    return Promise.reject(new Error("errors get storage chart"));
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}
