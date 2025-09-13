"use client";

import SettingKeys from "@/lib/networking/client/setting/endpoint";
import {
  GetLogSystem,
  SearchLog,
  TLog,
} from "@/lib/networking/client/setting/service";
import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";

const useSetting = () => {
  const [dataFilter, setDataFilter] = React.useState<TLog[]>();
  const { data } = useQuery({
    queryKey: [SettingKeys.GET_LOG],
    queryFn: GetLogSystem,
    refetchOnWindowFocus: false,
  });

  const { mutate, isPending } = useMutation({
    mutationKey: [SettingKeys.SEARCH_LOG],
    mutationFn: SearchLog,
    onSuccess: (data) => {
      setDataFilter(data);
    },
  });

  return { data: dataFilter?.length ? dataFilter : data, mutate, isPending };
};

export default useSetting;
