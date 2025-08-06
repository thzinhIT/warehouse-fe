"use client";
import { useAppContext } from "@/app/app-context";
import AuthKeys from "@/lib/networking/client/auth/endpoints";
import { IAuthResponse, Login } from "@/lib/networking/client/auth/service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useLogin() {
  const { setToken } = useAppContext();
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
    router.push("/");
  };
  return { login, isPending };
}
