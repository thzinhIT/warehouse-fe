import axios, { AxiosResponse } from "axios";
import toast from "react-hot-toast";
import { publicApi } from "../../axious";
import ApiEndPoint from "../../api";

export interface IAuthResponse {
  code: number;
  data: {
    token: string;
    refreshToken: string;
    authenticated: boolean;
  };
}

export interface ISendCodeEmail {
  code: number;
  message: string;
  error?: string;
}

export interface INewPassword {
  code: number;
  data?: boolean;
  error?: string;
}

type TPayLoadLogin = {
  userName?: string;
  passWord?: string;
};

export async function Login({ userName, passWord }: TPayLoadLogin) {
  try {
    if (!userName || !passWord) {
      toast.error("Login missing information");
      return Promise.reject(new Error("Login missing information"));
    }

    const body = {
      username: userName,
      password: passWord,
    };

    const res = await publicApi.post<IAuthResponse>(
      `${ApiEndPoint.LOGIN}`,
      body,
      { withCredentials: true }
    );

    if (res?.data?.code === 200) {
      return res.data;
    }

    toast.error("Error: Login error");
    return Promise.reject(new Error("Error: Login error"));
  } catch (e) {
    return Promise.reject(e);
  }
}
export async function SendCodeEmail({ email }: { email?: string }) {
  try {
    if (!email) {
      toast.error("Missing information");
      return Promise.reject(new Error("Login missing information"));
    }
    const res = await publicApi.post<ISendCodeEmail>(
      `${ApiEndPoint.SENDCODEEMAIL}`,
      email
    );
    if (res?.data?.code === 200) return res?.data;

    const errorMessage = res?.data?.error;
    toast.error(errorMessage ?? "Error: Reset passWord error ");
    return Promise.reject(new Error("Error: Login error"));
  } catch (e) {}
}

export async function NewPassword({
  email,
  code,
  newPassword,
}: {
  email?: string;
  code?: string;
  newPassword?: string;
}) {
  try {
    if (!email || !code || !newPassword) {
      toast.error("Missing information");
      return Promise.reject(new Error("New Password missing information"));
    }

    const body = {
      email: email,
      code: code,
      newPassword: newPassword,
    };
    const res = await publicApi.post<INewPassword>(
      `${ApiEndPoint.NEWPASSWORD}`,
      body
    );
    if (res?.data?.code === 200) return res?.data;

    const errorMessage = res?.data?.error;
    toast.error(errorMessage ?? "Error: Reset passWord error ");
    return Promise.reject(new Error("Error: Login error"));
  } catch (e) {}
}
