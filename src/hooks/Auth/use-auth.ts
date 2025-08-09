"use client";
import { useAppContext } from "@/app/app-context";
import AuthKeys from "@/lib/networking/client/auth/endpoints";
import {
  IAuthResponse,
  Login,
  NewPassword,
  SendCodeEmail,
} from "@/lib/networking/client/auth/service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
    router.push("/");
  };
  return { login, isPending };
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
