import toast from "react-hot-toast";
import ApiEndPoint from "../../api";
import { api } from "../../axious";

export type TResponseAllShelves = {
  code: number;
  message?: string;
  data: TDataAllShelves[];
};

export type TDataAllShelves = {
  id: number;
  shelfCode: number;
  itemCount?: number;
};

export type TResponseBin = {
  code: number;
  message?: string;
  data: TDataBin[];
};

export type TDataBin = {
  id: number;
  binCode: number;
  itemCount?: number;
};

export type TResponseBox = {
  code: number;
  message?: string;
  data: TDataBox[];
};

export type TDataBox = {
  id: number;
  boxCode: number;
  itemCount?: number;
};

export type TDetailShelves = {
  id: number;
  shelfCode: string;
  itemCount: number;
  utilizationRate: number;
};

export type TResponseGetDetailShelve = {
  code: number;
  message: string;
  data: TDetailShelves;
};

export type TDetailBin = {
  id: number;
  binCode: string;
  itemCount: number;
  utilizationRate: number;
};

export type TResponseGetDetailBin = {
  code: number;
  message: string;
  data: TDetailBin;
};

export type TDetailBox = {
  boxCode: string;
  itemCount: number;
  utilizationRate: number;
  skuName: number;
  skuItemCount: number;
};

export type TResponseGetDetailBox = {
  code: number;
  message: string;
  data: TDetailBox;
};

export type TShelfResponse = {
  code: number;
  message: string;
  data: {
    id: number;
    shelfCode: string;
    binCount: number;
    binCodes: string[];
  };
};
export async function GetAllShelves() {
  try {
    const res = await api.get<TResponseAllShelves>(
      `${ApiEndPoint.GET_ALL_SHELVES}`
    );

    if (res?.data?.code === 200) return res?.data?.data;
    return Promise.reject(new Error("errors get shelves"));
  } catch (error) {
    console.log(error);
    return Promise.reject(new Error("errors get shelves"));
  }
}

export async function GetBinById(idShelve?: number) {
  try {
    if (!idShelve) {
      toast.error("Don't have ID shelves");
      return null;
    }
    const res = await api.get<TResponseBin>(
      `${ApiEndPoint.GET_BIN}/${idShelve}/bins`
    );

    if (res?.data?.code === 200) return res?.data?.data;
    return Promise.reject(new Error("errors get bin by ID"));
  } catch (error) {
    console.log(error);
    return Promise.reject(new Error("errors get bin by ID"));
  }
}

export async function GetBoxById(idBin?: number) {
  try {
    if (!idBin) {
      toast.error("Don't have ID Bin");
      return Promise.reject(new Error("errors get box by ID"));
    }
    const res = await api.get<TResponseBox>(
      `${ApiEndPoint.GET_BOX}/${idBin}/boxes`
    );

    if (res?.data?.code === 200) return res?.data?.data;
    return Promise.reject(new Error("errors get box by ID"));
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}

export async function GetDetailShelveById(id?: number) {
  try {
    if (!id) {
      toast.error("Don't have ID Shelve");
      return Promise.reject(new Error("errors get Shelve by ID"));
    }
    const res = await api.get<TResponseGetDetailShelve>(
      `${ApiEndPoint.GET_DETAIL_SHELVES}/${id}/detail`
    );

    if (res?.data?.code === 200) return res?.data?.data;
    return Promise.reject(new Error("errors get Shelve by ID"));
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}

export async function GetDetailBinById(id?: number) {
  try {
    if (!id) {
      toast.error("Don't have ID Bin");
      return Promise.reject(new Error("errors get bin by ID"));
    }
    const res = await api.get<TResponseGetDetailBin>(
      `${ApiEndPoint.GET_BIN}/${id}/detail`
    );

    if (res?.data?.code === 200) return res?.data?.data;
    return Promise.reject(new Error("errors get Bin by ID"));
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}

export async function GetDetailBoxById(id?: number) {
  try {
    if (!id) {
      toast.error("Don't have ID Box");
      return Promise.reject(new Error("errors get box by ID"));
    }
    const res = await api.get<TResponseGetDetailBox>(
      `${ApiEndPoint.GET_DETAIL_BOX}/${id}/detail`
    );

    if (res?.data?.code === 200) return res?.data?.data;
    return Promise.reject(new Error("errors get Box by ID"));
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}

export async function CreateShelve() {
  try {
    const res = await api.post<TShelfResponse>(`${ApiEndPoint.CREATE_SHELVES}`);
    if (res?.data?.code === 200) return res?.data?.data;
    return Promise.reject(new Error("errors create shelves"));
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
}
