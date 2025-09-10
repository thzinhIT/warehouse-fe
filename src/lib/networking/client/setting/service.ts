import toast from "react-hot-toast";
import { api } from "../../axious";
import ApiEndPoint from "../../api";

export type TLog = {
  userName: string;
  action: string;
  targetTable: string;
  timestamp: string;
};

export type TLogsResponse = { code: number; message: string; data: TLog[] };

export async function GetLogSystem() {
  try {
    const res = await api.post<TLogsResponse>(`${ApiEndPoint.GET_LOG}`, {
      params: { warehouseId: 1 },
    });

    if (res?.data?.code === 200) {
      return res.data?.data;
    }
    const errorMessage = res?.data?.message || "Error get system-log user";
    toast.error(errorMessage);

    return Promise.reject(new Error(errorMessage));
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function SearchLog(date: string) {
  try {
    const res = await api.post<TLogsResponse>(`${ApiEndPoint.SEARCH_LOG}`, {
      warehouseId: 1,
      date,
    });

    if (res?.data?.code === 200) {
      return res.data?.data;
    }
    const errorMessage = res?.data?.message || "Error get system-log user";
    toast.error(errorMessage);

    return Promise.reject(new Error(errorMessage));
  } catch (error) {
    return Promise.reject(error);
  }
}
