"use client";
import { useAppContext } from "@/app/app-context";
import AuthKeys from "@/lib/networking/client/auth/endpoints";
import {
  IAuthResponse,
  Login,
  NewPassword,
  SendCodeEmail,
} from "@/lib/networking/client/auth/service";
import { GetUserInfor } from "@/lib/networking/client/user/service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export function useLogin() {
  const { setToken, setAccessToken } = useAppContext();
  const router = useRouter();

  const { mutate: login, isPending } = useMutation({
    mutationKey: [AuthKeys.LOGIN],
    mutationFn: Login,
    onSuccess: (data) => {
      if (!data) return;
      onLoginSuccess(data);
    },
  });

  const onLoginSuccess = (data: IAuthResponse) => {
    setToken(data?.data?.token);
    setAccessToken(data?.data?.refreshToken);
    document.cookie = `token=${data?.data?.token}; path=/; max-age=${
      60 * 60 * 24 * 7
    }; secure; samesite=strict`;
    localStorage.setItem("token", data?.data?.token || "");
    localStorage.setItem("refreshToken", data?.data?.refreshToken || "");
    toast.success("Đăng nhập thành công");
    router.push("/");
  };

  const { data: userInfo, isPending: isPendingUser } = useQuery({
    queryKey: ["userInfo"],
    queryFn: GetUserInfor,
  });

  return { login, isPending, isPendingUser, userInfo };
}

export function useForgotPassword() {
  const router = useRouter();
  const [step, setStep] = useState("email");

  const { mutate: sendCodeEmail, isPending } = useMutation({
    mutationKey: [AuthKeys.SENDCODEEMAIL],
    mutationFn: SendCodeEmail,
    onSuccess: () => {
      setStep("new-password");
    },
  });

  const { mutate: newPassword, isPending: isPendingNewPass } = useMutation({
    mutationKey: [AuthKeys.FORGOTPASSWORD],
    mutationFn: NewPassword,
    onSuccess: () => {
      toast.success("chúc mừng bạn đã thay đổi mật khẩu thành công");
      router.push("/login");
    },
  });
  return {
    sendCodeEmail,
    newPassword,
    isPending,
    isPendingNewPass,
    step,
    setStep,
  };
}
