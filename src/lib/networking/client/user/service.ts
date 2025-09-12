import toast from "react-hot-toast";
import ApiEndPoint from "../../api";
import { api } from "../../axious";
import { TUpdatePass } from "@/components/common/user-infor/update-pass";

export type TUser = {
  userId: number;
  userCode: string;
  username: string;
  email: string;
  fullName: string;
  role: string;
  isActive: boolean;
  createdAt: string;
};

export type TUserResponse = {
  code: number;
  message: string;
  data: TUser;
};

export type TBodyParams = {
  userId: number;
  email: string;
  fullName: string;
};

export type TUserData = {
  email: string;
  fullName: string;
};

export type TUserProfileResponse = {
  code: number;
  message: string;
  data: TUserData;
};
export async function GetUserInfor() {
  try {
    const res = await api.get<TUserResponse>(`${ApiEndPoint.USER}`);

    if (res?.data?.code === 200) {
      return res.data?.data;
    }
    const errorMessage = res?.data?.message || "Error get infor user";
    toast.error(errorMessage);

    return Promise.reject(new Error(errorMessage));
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function UpdatePass(body: TUpdatePass) {
  if (!body) {
    toast.error("nhập đủ thông tin giùm!!!!");
    return;
  }
  try {
    const res = await api.put<TUserResponse>(
      `${ApiEndPoint.UPDATE_PASS}`,
      body
    );

    if (res?.data?.code === 200) {
      return res.data?.data;
    }
    const errorMessage = res?.data?.message || "Error update pass";
    toast.error(errorMessage);

    return Promise.reject(new Error(errorMessage));
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function UpdateProfileUser({ body }: { body: TBodyParams }) {
  try {
    if (!body?.userId) {
      toast.error("Hiện không cập nhật được ");
      return Promise.reject("No userId provided");
    }
    const res = await api.put<TUserProfileResponse>(
      `${ApiEndPoint.UPDATE_USER_PROFILE}/${body.userId}/update-profile`,
      { email: body.email, fullName: body.fullName }
    );

    if (res?.data?.code === 200) {
      toast.success("Cập nhật thông tin thành công");
      return res.data?.data;
    }
    const errorMessage = res?.data?.message || "Error update profiler user";
    toast.error(errorMessage);

    return Promise.reject(new Error(errorMessage));
  } catch (error) {
    return Promise.reject(error);
  }
}
