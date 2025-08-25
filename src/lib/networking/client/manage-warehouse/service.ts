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
    console.log("Error fetching history import orders byID:", error);
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
    console.log("Error fetching history import orders:", error);
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
    console.log("Error uploading file:", error);
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
    console.log("Error Get data temporary:", error);
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
    console.log("Error delete data temporary:", error);
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
    console.log("Error Update data temporary:", error);
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
    console.log("Error import data temporary:", error);
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
    console.log("Error download template:", error);
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
    console.log("Error fetching export orders:", error);
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
  } catch (error) {
    console.log("Error fetching export order details:", error);
    return Promise.reject(error);
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
      console.log("🌐 API Success - returning data:", res.data?.data);
      return res.data?.data;
    }
    const errorMessage = res?.data?.error || "Error searching export orders";
    toast.error(errorMessage);
    return Promise.reject(new Error(errorMessage));
  } catch (error) {
    console.log("🌐 API Exception - Error searching export orders:", error);
    toast.error("Network error occurred while searching");
    return Promise.reject(error);
  }
}

// --- END: EXPORT ORDER TYPES & FUNCTIONS ---
