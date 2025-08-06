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
      body
    );
    if (res?.data?.code === 200) return res?.data;
    toast.error("Error: Login error ");
    return Promise.reject(new Error("Error: Login error"));
  } catch (e) {
    console.log(e);
  }
}
