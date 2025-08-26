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
  GetDetailBinById,
  GetDetailShelveById,
} from "@/lib/networking/client/manage-storage/service";
import { LoadingNormal } from "../../loading-page";
import { useEffect, useState } from "react";

export function DialogDetailStorage({
  open,
  setOpen,
  id,
  isShelve = true,
  title,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
  isShelve?: boolean;
  title?: string;
}) {
  const { data: detailShelve, isPending } = useQuery({
    queryKey: [ShelveKeys.GET_DETAIL_SHELVES, id],
    queryFn: () => GetDetailShelveById(id),
    enabled: open && !!id && isShelve,
  });

  const { data: detailBin, isPending: isPendingBin } = useQuery({
    queryKey: [ShelveKeys.GET_DETAIL_SHELVES, id],
    queryFn: () => GetDetailBinById(id),
    enabled: open && !!id && !isShelve,
  });

  const data = isShelve ? detailShelve : detailBin;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[500px]">
        <DialogHeader>
          <DialogTitle className="font-bold">
            {title || "Chi tiết kệ hàng"}
          </DialogTitle>
          <DialogDescription className="hidden">
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>

        {isPending || isPendingBin ? (
          <LoadingNormal />
        ) : (
          <div className="mt-2 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="font-semibold   whitespace-nowrap">
                {" "}
                {isShelve ? "Mã kệ hàng" : "Mã ô hàng"}
              </span>
              <Input
                className="px-0"
                disabled={true}
                defaultValue={
                  isShelve
                    ? detailShelve?.shelfCode ?? "--"
                    : detailBin?.binCode ?? "--"
                }
              />
            </div>
            <div className="flex items-center gap-3">
              <span className="font-semibold whitespace-nowrap">
                Số lượng item chứa
              </span>
              <Input
                className="px-0"
                disabled={true}
                defaultValue={data?.itemCount ?? "--"}
              />
            </div>
            <div className="flex items-center gap-3">
              <span className="font-semibold w-1/3">Tỉ lệ chứa</span>

              <ProgressBar value={data?.utilizationRate ?? 0} />
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
