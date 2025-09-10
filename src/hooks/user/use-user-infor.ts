"use client";

import { TUpdatePass } from "@/components/common/user-infor/update-pass";
import UserKeys from "@/lib/networking/client/user/endpoint";
import { GetUserInfor, UpdatePass } from "@/lib/networking/client/user/service";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useUserInfor = () => {
  const { data, isPending } = useQuery({
    queryKey: [UserKeys.USER_INFOR],
    queryFn: GetUserInfor,
  });

  return {
    data,
    isPending,
  };
};

export default useUserInfor;
