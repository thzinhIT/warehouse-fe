"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ProgressBar from "../../progress-bar";
import { useQuery } from "@tanstack/react-query";
import ShelveKeys from "@/lib/networking/client/manage-storage/endpoints";
import {
  GetDetailBoxById,
  GetDetailShelveById,
} from "@/lib/networking/client/manage-storage/service";
import { LoadingNormal } from "../../loading-page";
import { useEffect } from "react";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Tooltip,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";

export function DialogDetailBox({
  open,
  setOpen,
  id,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
}) {
  const { data, isPending } = useQuery({
    queryKey: [ShelveKeys.GET_DETAIL_BOX, id],
    queryFn: () => GetDetailBoxById(id),
    enabled: open && !!id,
  });
  useEffect(() => {
    console.log("dataaaaa", data);
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[500px]">
        <DialogHeader>
          <DialogTitle className="font-bold text-center">
            Chi tiết kệ hàng
          </DialogTitle>
          <DialogDescription className="hidden">
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        {isPending ? (
          <LoadingNormal />
        ) : (
          <div className="mt-2 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="font-semibold  whitespace-nowrap ">
                Mã thùng hàng
              </span>
              <Input
                className="px-1"
                disabled={true}
                defaultValue={data?.boxCode}
              />
            </div>
            <div className="flex items-center gap-3">
              <span className="font-semibold  whitespace-nowrap">
                Số lượng item chứa
              </span>
              <Input
                className="px-1"
                disabled={true}
                defaultValue={data?.itemCount}
              />
            </div>
            <div className="flex items-center gap-3">
              <span className="font-semibold w-1/3">Tỉ lệ chứa</span>

              <ProgressBar value={data?.utilizationRate ?? 0} />
            </div>
            <div className="flex items-center gap-3">
              <div className="flex gap-1 items-center">
                <span className="font-semibold  whitespace-nowrap">
                  Tên SKU
                </span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="size-3 text-gray-300" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Tên SKU chứa thùng hàng hiện tại</p>
                  </TooltipContent>
                </Tooltip>
              </div>

              <Input
                className="px-1"
                disabled={true}
                defaultValue={data?.skuName ?? "--"}
              />
            </div>
          </div>
        )}

        <DialogFooter>
          <DialogClose asChild>
            <Button className="bg-blue-400">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
