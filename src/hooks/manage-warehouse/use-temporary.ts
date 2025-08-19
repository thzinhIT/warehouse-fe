"use client";
import StockInKeys from "@/lib/networking/client/manage-warehouse/endpoints";
import {
  DeleteTemporaryById,
  DownloadTemplateImportOrder,
  getTemporaryImportOrder,
  ImportWarehouse,
  TBodyUpdateImportOrderTemporary,
  TDataImportOrderTemporary,
  TResponseImportOrderTemporary,
  UpdateTemporaryById,
  uploadFileExcel,
} from "@/lib/networking/client/manage-warehouse/service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { flattenBy } from "@tanstack/react-table";
import { useState } from "react";
import toast from "react-hot-toast";

const useTemporary = (
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const [isOpenModalImport, setIsOpenModalImport] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const queryClient = useQueryClient();
  const {
    data,
    isPending: isPendingTemporary,
    refetch,
  } = useQuery({
    queryKey: [StockInKeys.TEMPITEMSTEMPORARY],
    queryFn: getTemporaryImportOrder,
    refetchOnWindowFocus: false,
  });

  const { mutate: onUpload, isPending: isMutating } = useMutation({
    mutationKey: [StockInKeys.UPLOADFILEEXCEL],
    mutationFn: uploadFileExcel,
    onSuccess: () => {
      refetch();
    },
  });
  const { mutate: onDeleteTemporary, isPending: isPendingDelete } = useMutation(
    {
      mutationKey: [StockInKeys.DELETETEMPORARY],
      mutationFn: DeleteTemporaryById,
      onSuccess: () => {
        refetch();
        setIsOpenModalDelete(false);
      },
    }
  );
  const { mutate: onUpdateTemporary } = useMutation({
    mutationKey: [StockInKeys.UPDATETEMPORARY],
    mutationFn: (body: TBodyUpdateImportOrderTemporary) =>
      UpdateTemporaryById(body),
    onSuccess: () => {
      refetch();
      setOpen?.(false);
    },
    onError: (error) => {
      console.error("Mutation error:", error);
      toast.error(error.message || "Có lỗi xảy ra khi update!");
    },
  });
  const { mutate: onImportWarehouse, isPending } = useMutation({
    mutationKey: [StockInKeys.IMPORTWAREHOUSE],
    mutationFn: ImportWarehouse,
    onSuccess: () => {
      setIsOpenModalImport(false);
      refetch();
      queryClient.invalidateQueries({
        queryKey: [StockInKeys.GETALLDETAILIMPORTORDER],
      });
    },
  });
  const { mutate: downloadFile, isPending: PendingDownload } = useMutation({
    mutationFn: DownloadTemplateImportOrder,
  });

  return {
    data,
    isOpenModalImport,
    isOpenModalDelete,
    isMutating,
    isPendingDelete,
    isPending,
    PendingDownload,
    setIsOpenModalImport,
    setIsOpenModalDelete,
    onUpload,
    onDeleteTemporary,
    onUpdateTemporary,
    onImportWarehouse,
    downloadFile,
  };
};
export default useTemporary;
