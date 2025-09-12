"use client";

import UserKeys from "@/lib/networking/client/user/endpoint";
import { UpdateProfileUser } from "@/lib/networking/client/user/service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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

  return {
    updateProfileFn,
    updateProfilePending,
  };
};

export default useUserInfor;
