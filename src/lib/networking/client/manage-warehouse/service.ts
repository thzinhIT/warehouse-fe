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
  data: TDataImportOrderTemporary[];
  error?: string;
}

export type THistoryImportById = {
  code: number;
  message?: string;
  data: TDataHistoryImportById;
  error?: string;
};
export type TDataHistoryImportById = {
  id: number;
  source?: string;
  status?: string;
  note?: string;
  createdAt?: string;
  createdBy?: string;
  importCode?: string;
  details: TDetailDataImportOrder[];
};
export type TDetailDataImportOrder = {
  id: string;
  skuCode?: string;
  skuName?: string;
  quantity?: number;
  unitVolume?: number;
  type?: string;
  color?: string;
  size?: string;
};

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

export type TResponseFileUpload = {
  code: number;
  message: string;
  data: string;
};

export type TDataImportOrderTemporary = {
  id: number;
  userId: number;
  skuCode: string;
  skuName?: string;
  quantity: number;
  source?: string;
  note?: string;
  createdAt: string;
  unitVolume?: number;
  type?: string;
  color?: string;
  size?: string;
  importCode?: string;
};

export type TResponseImportOrderTemporary = {
  code: number;
  message: string;
  data: TDataImportOrderTemporary[];
};

export type TBodyUpdateImportOrderTemporary = {
  id?: number;
  skuCode: string;
  quantity: number;
  source?: string;
  note?: string;
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
    return Promise.reject(error);
  }
}

export async function getAllHistoryImportOrder() {
  try {
    const res = await api.get<IGetImportOrder>(
      `${ApiEndPoint.ALLHISTORYIMPORTORDER}`
    );
    if (res?.data?.code === 200) {
      return res.data?.data;
    }
    const errorMessage =
      res?.data?.error || "Error fetching history import orders by ID";
    toast.error(errorMessage);
    return Promise.reject(new Error(errorMessage));
  } catch (error) {
    return Promise.reject(error);
  }
}
export async function getHistoryImportOrderById(id: number) {
  try {
    const res = await api.get<THistoryImportById>(
      `${ApiEndPoint.HISTORY_IMPORT_ORDER_BY_ID}/${id}/fullDetail`
    );
    if (res?.data?.code === 200) {
      return res.data?.data;
    }
    const errorMessage =
      res?.data?.error || "Error fetching history import orders";
    toast.error(errorMessage);
    return Promise.reject(new Error(errorMessage));
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function uploadFileExcel(file: File) {
  try {
    if (!file) {
      return toast.error("Please select a file to upload");
    }
    const formData = new FormData();
    formData.append("file", file);
    const res = await api.post<TResponseFileUpload>(
      `${ApiEndPoint.UPLOADFILEEXCEL}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (res?.data?.code === 200) {
      return toast.success("File uploaded successfully");
    }
    const errorMessage = res?.data?.message || "Error uploading file";
    toast.error(errorMessage);
    return Promise.reject(new Error(errorMessage));
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function getTemporaryImportOrder() {
  try {
    const res = await api.get<TResponseImportOrderTemporary>(
      `${ApiEndPoint.TEMPITEMSTEMPORARY}`
    );
    if (res?.data?.code === 200) {
      return res.data?.data;
    }
    const errorMessage = res?.data?.message || "Error Get data temporary";
    toast.error(errorMessage);
    return Promise.reject(new Error(errorMessage));
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function DeleteTemporaryById(id: number) {
  try {
    if (!id) {
      return toast.error("Please provide an ID to delete");
    }
    const res = await api.delete<TResponseFileUpload>(
      `${ApiEndPoint.DELETETEMPORARY}/${id}`
    );
    if (res?.data?.code === 200) {
      toast.success("Delete data successfully");
      return res.data?.data;
    }
    const errorMessage = res?.data?.message || "Error delete data temporary";
    toast.error(errorMessage);
    return Promise.reject(new Error(errorMessage));
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function UpdateTemporaryById(
  body: TBodyUpdateImportOrderTemporary
) {
  try {
    if (!body.id) {
      return toast.error("Please provide an ID to update");
    }
    const res = await api.put<TResponseFileUpload>(
      `${ApiEndPoint.UPDATETEMPORARY}`,
      body
    );
    if (res?.data?.code === 200) {
      toast.success("Update data successfully");
      return res.data?.data;
    }
    const errorMessage = res?.data?.message || "Error Update data temporary:";
    return Promise.reject(new Error(errorMessage));
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function ImportWarehouse(id: number[]) {
  try {
    if (id?.length === 0) {
      return toast.error("Please provide an ID to import ware house");
    }
    const body = { tempIds: id };
    const res = await api.post<TResponseFileUpload>(
      `${ApiEndPoint.IMPORTWAREHOUSE}`,
      body
    );
    if (res?.data?.code === 200) {
      toast.success("Import data successfully");
      return res.data?.data;
    }
    const errorMessage = res?.data?.message || "Error import data temporary:";
    return Promise.reject(new Error(errorMessage));
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function DownloadTemplateImportOrder() {
  try {
    const res = await api.get(`${ApiEndPoint.DOWNLOADTEMPLATEIMPORTORDER}`, {
      responseType: "blob",
    });
    const blob = new Blob([res.data]);
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    const contentDisposition = res.headers["content-disposition"];
    let fileName = "downloaded_file";
    if (contentDisposition) {
      const match = contentDisposition.match(/filename="?(.+)"?/);
      if (match?.[1]) {
        fileName = match[1];
      }
    }
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    return Promise.reject(error);
  }
}

export interface ExportOrderSearchRequest {
  source?: "manual" | "haravan" | null;
  status?: "draft" | "confirmed" | "cancelled" | null;
  createdBy?: string | null;
  startDate?: string | null;
  endDate?: string | null;
}

export type TDataExportOrder = {
  id: number;
  exportCode: string;
  destination: string;
  source: string;
  status: string;
  createdBy: string;
  createdAt: string;
  note: string;
};

export interface IGetExportOrder {
  code: number;
  data: TDataExportOrder[];
  error?: string;
}

export type TAllExportOrderDetails = {
  id: number;
  exportCode: string;
  skuCode: string;
  productName: string;
  exportDate: string;
  quantity: number;
};

export type TAllExportOrderDetailsResponse = {
  code: number;
  data: TAllExportOrderDetails[];
  error?: string;
};

export type TExportOrderBoard = {
  id: number;
  exportCode: string;
  skuCode: string;
  skuName: string;
  createdAt: string;
  quantity: number;
};

export type TExportOrderBoardResponse = {
  code: number;
  data: TExportOrderBoard[];
  message?: string;
  error?: string;
};

// Export Order Full Detail Types
export type TExportOrderFullDetailItem = {
  id: number;
  skuCode: string;
  skuName: string;
  size: string;
  color: string;
  type: string;
  unitVolume: number;
  quantity: number;
};

export type TExportOrderFullDetail = {
  id: number;
  exportCode: string;
  source: string;
  status: string;
  createdBy: string;
  createdAt: string;
  note: string;
  details: TExportOrderFullDetailItem[];
};

export type TExportOrderFullDetailResponse = {
  code: number;
  data: TExportOrderFullDetail;
  message?: string;
  error?: string;
};

// Export Order Detail by DetailId Types (for individual item details in stock-out)
export type TExportOrderDetailFull = {
  id: number;
  exportCode: string;
  source: string;
  status: string;
  createdBy: string;
  createdAt: string;
  note: string;
  details: TExportOrderDetailItem[];
};

export type TExportOrderDetailItem = {
  id: number;
  skuCode: string;
  skuName: string;
  size: string;
  color: string;
  type: string;
  unitVolume: number;
  quantity: number;
};

export type TExportOrderDetailFullResponse = {
  code: number;
  data: TExportOrderDetailFull;
  message?: string;
  error?: string;
};

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
    return Promise.reject(error);
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
  } catch (error) {}
}

export async function getExportOrderDetailById(detailId: number) {
  try {
    const res = await api.get<TExportOrderFullDetailResponse>(
      `${ApiEndPoint.EXPORTORDERDETAILBYID}/${detailId}/full`
    );
    if (res?.data?.code === 200) {
      return res.data?.data;
    }
    const errorMessage =
      res?.data?.error || "Error fetching export order detail";
    toast.error(errorMessage);
    return Promise.reject(new Error(errorMessage));
  } catch (error) {}
}

export async function getExportOrderBoard() {
  try {
    const res = await api.get<TExportOrderBoardResponse>(
      `${ApiEndPoint.EXPORTORDERBOARDDETAILS}`
    );
    if (res?.data?.code === 200) {
      return res.data?.data;
    }
    const errorMessage =
      res?.data?.error || "Error fetching export order board details";
    toast.error(errorMessage);
    return Promise.reject(new Error(errorMessage));
    return Promise.reject(error);
  } catch (error) {}
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

// Search Export Orders Full - for stock-out page
export type TSearchExportOrderRequest = {
  exportCode?: string;
  skuCode?: string;
  startDate?: string; // Format: "yyyy-MM-dd"
  endDate?: string; // Format: "yyyy-MM-dd"
};

export type TSearchExportOrderResponse = {
  code: number;
  data: TAllExportOrderDetails[];
  message?: string;
  error?: string;
};

export async function searchExportOrdersFull(
  searchParams: TSearchExportOrderRequest
) {
  try {
    const res = await api.post<TSearchExportOrderResponse>(
      `${ApiEndPoint.SEARCHEXPORTORDERSFULL}`,
      searchParams
    );
    if (res?.data?.code === 200) {
      return res.data?.data;
    }
    const errorMessage =
      res?.data?.error || "Error searching export orders full";
    toast.error(errorMessage);
    return Promise.reject(new Error(errorMessage));
  } catch (error: any) {
    if (error.response) {
      toast.error(
        `API Error: ${error.response.status} - ${
          error.response.data?.message || "Unknown error"
        }`
      );
    } else if (error.request) {
      toast.error("No response from server. Please check your connection.");
    } else {
      toast.error("Request setup error: " + error.message);
    }
    return Promise.reject(error);
  }
}

// Search Export Orders Board - for stock-out history page
export type TSearchExportOrder2Request = {
  exportCode?: string;
  source?: "manual" | "haravan" | null;
  startDate?: string; // Format: "yyyy-MM-dd"
  endDate?: string; // Format: "yyyy-MM-dd"
};

export type TSearchExportOrderBoardResponse = {
  code: number;
  data: TExportOrderBoard[];
  message?: string;
  error?: string;
};

export async function searchExportOrdersBoard(
  searchParams: TSearchExportOrder2Request
) {
  try {
    const res = await api.post<TSearchExportOrderBoardResponse>(
      `${ApiEndPoint.SEARCHEXPORTORDERSBOARD}`,
      searchParams
    );
    if (res?.data?.code === 200) {
      return res.data?.data;
    }
    const errorMessage =
      res?.data?.error || "Error searching export orders board";
    toast.error(errorMessage);
    return Promise.reject(new Error(errorMessage));
  } catch (error: any) {
    if (error.response) {
      toast.error(
        `API Error: ${error.response.status} - ${
          error.response.data?.message || "Unknown error"
        }`
      );
    } else if (error.request) {
      toast.error("No response from server. Please check your connection.");
    } else {
      toast.error("Request setup error: " + error.message);
    }
    return Promise.reject(error);
  }
}

// Get Export Order Full Details by ID
export async function getExportOrderFullById(orderId: number) {
  try {
    const res = await api.get<TExportOrderFullDetailResponse>(
      `${ApiEndPoint.EXPORTORDERFULLBYID}/${orderId}/full`
    );
    if (res?.data?.code === 200) {
      return res.data?.data;
    }
    const errorMessage =
      res?.data?.error || "Error getting export order details";
    toast.error(errorMessage);
    return Promise.reject(new Error(errorMessage));
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast.error("Request error: " + error.message);
    } else {
      toast.error("Unknown error occurred while getting export order details");
    }
    return Promise.reject(error);
  }
}

// Get Export Order Detail by DetailId (for individual item details)
export async function getExportOrderDetailByDetailId(detailId: number) {
  try {
    const res = await api.get<TExportOrderDetailFullResponse>(
      `${ApiEndPoint.EXPORTORDERDETAILFULLBYID}/${detailId}/full`
    );
    if (res?.data?.code === 200) {
      return res.data?.data;
    }
    const errorMessage =
      res?.data?.error || "Error getting export order detail";
    toast.error(errorMessage);
    return Promise.reject(new Error(errorMessage));
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast.error("Request error: " + error.message);
    } else {
      toast.error("Unknown error occurred while getting export order detail");
    }
    return Promise.reject(error);
  }
}

// --- START: MANUAL EXPORT TYPES & FUNCTIONS ---

export type TSkuStatusItem = {
  skuCode: string;
  availableQty: number;
  queuedQty: number;
};

export type TMoveToQueueRequest = {
  items: {
    sku: string;
    quantity: number;
  }[];
};

export async function moveItemsToQueue(request: TMoveToQueueRequest) {
  try {
    const res = await api.post<string>(`${ApiEndPoint.MOVETOQUEUE}`, request);

    if (res?.status === 200) {
      toast.success("Chuyển item thành công!");
      return res.data;
    }

    const errorMessage = "Error moving items to queue";
    toast.error(errorMessage);
    return Promise.reject(new Error(errorMessage));
  } catch (error: any) {
    if (error.response) {
      toast.error(
        `API Error: ${error.response.status} - ${
          error.response.data?.message || "Unknown error"
        }`
      );
    } else if (error.request) {
      toast.error("No response from server. Please check your connection.");
    } else {
      toast.error("Request setup error: " + error.message);
    }

    return Promise.reject(error);
  }
}

export async function moveItemsBackFromQueue(request: TMoveToQueueRequest) {
  try {
    const res = await api.post<string>(
      `${ApiEndPoint.MOVEBACKFROMQUEUE}`,
      request
    );

    if (res?.status === 200) {
      toast.success("Chuyển item từ queued về available thành công!");
      return res.data;
    }

    const errorMessage = "Error moving items back from queue";
    toast.error(errorMessage);
    return Promise.reject(new Error(errorMessage));
  } catch (error: any) {
    if (error.response) {
      toast.error(
        `API Error: ${error.response.status} - ${
          error.response.data?.message || "Unknown error"
        }`
      );
    } else if (error.request) {
      toast.error("No response from server. Please check your connection.");
    } else {
      toast.error("Request setup error: " + error.message);
    }

    return Promise.reject(error);
  }
}

export async function exportWithRoute(request: TMoveToQueueRequest) {
  try {
    const res = await api.post(`${ApiEndPoint.EXPORTWITHROUTE}`, request, {
      responseType: "blob",
    });

    if (res?.status === 200) {
      const blob = new Blob([res.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `exported_items_with_route_${new Date().getTime()}.xlsx`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("Xuất kho thành công! File đã được tải xuống.");
      return res.data;
    }

    const errorMessage = "Error exporting items with route";
    toast.error(errorMessage);
    return Promise.reject(new Error(errorMessage));
  } catch (error: any) {
    if (error.response) {
      toast.error(
        `API Error: ${error.response.status} - ${
          error.response.data?.message || "Unknown error"
        }`
      );
    } else if (error.request) {
      toast.error("No response from server. Please check your connection.");
    } else {
      toast.error("Request setup error: " + error.message);
    }

    return Promise.reject(error);
  }
}

export async function getSkuStatusForExport() {
  try {
    const res = await api.get<TSkuStatusItem[]>(
      `${ApiEndPoint.SKUSTATUSEXPORT}`
    );

    if (res?.data) {
      return res.data;
    }

    const errorMessage = "No data received from SKU status API";
    toast.error(errorMessage);
    return Promise.reject(new Error(errorMessage));
  } catch (error: any) {
    if (error.response) {
      toast.error(
        `API Error: ${error.response.status} - ${
          error.response.data?.message || "Unknown error"
        }`
      );
    } else if (error.request) {
      toast.error("No response from server. Please check your connection.");
    } else {
      toast.error("Request setup error: " + error.message);
    }

    return Promise.reject(error);
  }
}

// --- END: MANUAL EXPORT TYPES & FUNCTIONS ---
// --- END: EXPORT ORDER TYPES & FUNCTIONS ---
