"use client";

import UserKeys from "@/lib/networking/client/user/endpoint";
import {
  UpdatePass,
  UpdateProfileUser,
} from "@/lib/networking/client/user/service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useUserInfor = () => {
  const queryClient = useQueryClient();

  const { mutate: updateProfileFn, isPending: updateProfilePending } =
    useMutation({
      mutationKey: [UserKeys.UPDATE_USER_PROFILE],
      mutationFn: UpdateProfileUser,
      onSuccess: (data) => {
        if (!data) return;
        queryClient.invalidateQueries({ queryKey: ["userInfo"] });
      },
    });
  const { mutate: updatePass, isPending: updatePassPending } = useMutation({
    mutationKey: [UserKeys.UPDATE_PASS],
    mutationFn: UpdatePass,
    onSuccess: () => {
      toast.success("Thay đổi mật khẩu thành công");
    },
  });

  return {
    updateProfileFn,
    updateProfilePending,
    updatePassPending,
    updatePass,
  };
};

export default useUserInfor;
