"use client";
import { LoadingBtn } from "@/components/common/loading-page";
import TableShelves from "@/components/common/manage-storage/table-shelves";
import { Button } from "@/components/ui/button";
import { useShelves } from "@/hooks/manage-storage/use-shelves";
import ShelveKeys from "@/lib/networking/client/manage-storage/endpoints";
import { CreateShelve } from "@/lib/networking/client/manage-storage/service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

type TDataAddShelve = {
  id: number;
  shelfCode: string;
  binCount: number;
  binCodes: string[];
};

const ShelvesClient = () => {
  const [dataAddShelve, setDataAddShelve] = useState<TDataAddShelve>();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: CreateShelve,
    onSuccess: (data) => {
      toast.success("Thêm kệ hàng thành công");
      setDataAddShelve(data);
      queryClient.invalidateQueries({ queryKey: [ShelveKeys.GET_ALL_SHELVES] });
    },
  });
  return (
    <div className="pt-2 pl-4 pr-4 flex  flex-col overflow-hidden h-full ">
      <div className="flex gap-2 justify-end items-center">
        <Button className="flex items-center bg-blue-600 hover:bg-blue-500">
          <PlusCircle></PlusCircle>
          <span>Thêm kệ hàng</span>
        </Button>
        <Button
          className="flex items-center bg-blue-600 hover:bg-blue-500"
          onClick={() => mutate()}
          disabled={isPending}
        >
          {isPending ? <LoadingBtn /> : <PlusCircle></PlusCircle>}

          <span>Thêm thùng</span>
        </Button>
      </div>
      <div className="flex size-full flex-1 flex-col gap-4 overflow-hidden p-2">
        <div className="border flex-1 overflow-auto scrollbar bg-background rounded-lg ">
          <TableShelves />
        </div>

        <div>thành vinh phân trang nè</div>
      </div>
    </div>
  );
};

export default ShelvesClient;
