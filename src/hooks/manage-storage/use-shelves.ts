"use client";
import ShelveKeys from "@/lib/networking/client/manage-storage/endpoints";
import {
  GetAllShelves,
  GetBinById,
  GetBoxById,
} from "@/lib/networking/client/manage-storage/service";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export function useShelves({
  id,
  idBin,
  idDetail,
}: {
  id?: number;
  idBin?: number;
  idDetail?: number;
}) {
  const [isOpenBinId, setIsOpenBinId] = useState<boolean>(false);
  const [isOpenShelveId, setIsOpenShelveId] = useState<boolean>(false);
  const [isOpenDetailShelve, setIsOpenDetailShelve] = useState<boolean>(false);

  const { data } = useQuery({
    queryKey: [ShelveKeys.GET_ALL_SHELVES],
    queryFn: GetAllShelves,
  });

  const { data: dataBinById, isPending } = useQuery({
    queryKey: [ShelveKeys.GET_BIN_BY_ID, id],
    queryFn: () => GetBinById(id),
    enabled: !!id && isOpenShelveId,
  });

  const { data: dataBoxById, isPending: isPendingBox } = useQuery({
    queryKey: [ShelveKeys.GET_BOX_BY_ID, idBin],
    queryFn: () => GetBoxById(idBin),
    enabled: !!idBin && isOpenBinId,
  });

  const { data: detailShelve, isPending: isPendingDetailShelve } = useQuery({
    queryKey: [ShelveKeys.GET_DETAIL_SHELVES, idBin],
    queryFn: () => GetBoxById(idBin),
    enabled: isOpenDetailShelve && !!idDetail,
  });

  return {
    data,
    dataBoxById,
    isOpenBinId,
    setIsOpenBinId,
    dataBinById,
    isPending,
    isOpenShelveId,
    setIsOpenShelveId,
    isOpenDetailShelve,
    setIsOpenDetailShelve,
    detailShelve,
    isPendingDetailShelve,
  };
}
