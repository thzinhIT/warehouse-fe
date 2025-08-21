import { api } from "../../axious";
import ApiEndPoint from "../../api";
import toast from "react-hot-toast";

export type TDataImportOrder = {
  id: number;
  source: string;
  status: string;
  createdBy: string;
  createdAt: string;
  note: string;
};

export interface IGetImportOrder {
  code: number;
  data: TDataImportOrder[];
  error?: string;
}
export type TImportOrder = {
  importCode: string;
  skuCode: string;
  skuName: string;
  quantity: number;
  createdAt: string;
};

export type TAllDetailImportOrder = {
  code: number;
  data: TImportOrder[];
};

export async function getAllDetailImportOrder() {
  try {
    const res = await api.get<IGetImportOrder>(
      `${ApiEndPoint.ALLDETAILIMPORTORDER}`
    );
    if (res?.data?.code === 200) {
      return res.data?.data;
    }
    const errorMessage = res?.data?.error || "Error fetching import orders";
    toast.error(errorMessage);
    return Promise.reject(new Error(errorMessage));
  } catch (error) {
    // Error handling for the developer, no user-facing log
  }
}

export interface ExportOrderSearchRequest {
  source?: "manual" | "haravan" | null;
  status?: "draft" | "confirmed" | "cancelled" | null;
  createdBy?: string | null;
  startDate?: string | null; // format: YYYY-MM-DD
  endDate?: string | null; // format: YYYY-MM-DD
}

// Export Order Types - from /admin/export-orders/search
export type TDataExportOrder = {
  id: number;
  exportCode: string;
  destination: string;
  source: string;
  status: string;
  createdBy: string;
  createdAt: string; // LocalDateTime from backend
  note: string;
};

export interface IGetExportOrder {
  code: number;
  data: TDataExportOrder[];
  error?: string;
}

// Export Order Details Types - from /admin/export-orders/getAllExportOrderDetails
export type TAllExportOrderDetails = {
  id: number;
  exportCode: string;
  skuCode: string;
  productName: string;
  exportDate: string; // LocalDateTime from backend
  quantity: number;
};

export type TAllExportOrderDetailsResponse = {
  code: number;
  data: TAllExportOrderDetails[];
  error?: string;
};

// Export Order Service Functions
export async function getAllExportOrders() {
  try {
    const res = await api.get<IGetExportOrder>(`${ApiEndPoint.ALLEXPORTORDER}`);
    if (res?.data?.code === 200) {
      return res.data?.data;
    }
    const errorMessage = res?.data?.error || "Error fetching export orders";
    toast.error(errorMessage);
    return Promise.reject(new Error(errorMessage));
  } catch (error) {
    // Error handling for the developer, no user-facing log
  }
}

export async function getAllExportOrderDetails() {
  try {
    const res = await api.get<TAllExportOrderDetailsResponse>(
      `${ApiEndPoint.ALLEXPORTORDERDETAILS}`
    );
    if (res?.data?.code === 200) {
      return res.data?.data;
    }
    const errorMessage =
      res?.data?.error || "Error fetching export order details";
    toast.error(errorMessage);
    return Promise.reject(new Error(errorMessage));
  } catch (error) {
    // Error handling for the developer, no user-facing log
  }
}

export async function searchExportOrders(
  searchParams: ExportOrderSearchRequest
) {
  try {
    const res = await api.post<IGetExportOrder>(
      `${ApiEndPoint.SEARCHEXPORTORDERS}`,
      searchParams
    );

    if (res?.data?.code === 200) {
      return res.data?.data;
    }
    const errorMessage = res?.data?.error || "Error searching export orders";
    toast.error(errorMessage);
    return Promise.reject(new Error(errorMessage));
  } catch (error) {
    toast.error("Network error occurred while searching");
    return Promise.reject(error);
  }
}
