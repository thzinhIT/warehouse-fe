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
    console.log("Error fetching import orders:", error);
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
      res?.data?.error || "Error fetching history import orders";
    toast.error(errorMessage);
    return Promise.reject(new Error(errorMessage));
  } catch (error) {
    console.log("Error fetching history import orders:", error);
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
  }
}

export async function ImportWarehouse(id: number[]) {
  try {
    if (id?.length === 0) {
      return toast.error("Please provide an ID to import ware  house");
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
  }
}
