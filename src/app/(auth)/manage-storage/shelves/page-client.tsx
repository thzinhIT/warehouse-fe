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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  RiArrowLeftDoubleFill,
  RiArrowLeftSLine,
  RiArrowRightDoubleFill,
  RiArrowRightSLine,
} from "react-icons/ri";
import CustomPagination from "@/components/common/manage-storage/custom-pagination";

type TDataAddShelve = {
  id: number;
  shelfCode: string;
  binCount: number;
  binCodes: string[];
};

const AlertAddBin = ({
  open,
  setOpen,
  mutate,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mutate?: () => void;
}) => (
  <AlertDialog open={open} onOpenChange={setOpen}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Thêm kệ hàng</AlertDialogTitle>
        <AlertDialogDescription className="text-gray-500">
          Bạn có chắc chắn thêm kệ hàng không .Thêm rồi ko được hoàn tác
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={() => mutate?.()}>Add</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);

const ShelvesClient = () => {
  const [dataAddShelve, setDataAddShelve] = useState<TDataAddShelve>();
  const [openAlertAddBin, setOpenAlertAddBin] = useState<boolean>(false);
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
    <>
      {" "}
      <div className="pt-2 pl-4 pr-4 flex  flex-col overflow-hidden h-full ">
        <div className="flex gap-2 justify-end items-center">
          <Button
            className="flex items-center bg-blue-600 hover:bg-blue-500"
            onClick={() => setOpenAlertAddBin(true)}
            disabled={isPending}
          >
            {isPending ? <LoadingBtn /> : <PlusCircle></PlusCircle>}

            <span>Thêm kệ hàng</span>
          </Button>
        </div>
        <div className="flex size-full flex-1 flex-col gap-4 overflow-hidden mt-2">
          <TableShelves />
        </div>
      </div>
      <AlertAddBin
        open={openAlertAddBin}
        setOpen={setOpenAlertAddBin}
        mutate={mutate}
      />
    </>
  );
};

export default ShelvesClient;
