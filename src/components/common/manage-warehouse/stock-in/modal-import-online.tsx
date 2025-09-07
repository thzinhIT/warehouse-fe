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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDDMMYY } from "@/lib/regex/format-date-time";
import { EStatusOrder } from "@/lib/types/enum/stock-in.enum";
import { format } from "date-fns";
import { useState } from "react";
import toast from "react-hot-toast";
import { LoadingBtn } from "../../loading-page";
import { TPayloadCreateImportOrder } from "@/lib/networking/client/manage-warehouse/service";

export function ModalImportOnline({
  open,
  setOpen,
  mutate,
  isPending,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mutate?: (body: TPayloadCreateImportOrder) => void;
  isPending?: boolean;
}) {
  const [source, setSource] = useState<string>();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const dataSubmit = Object.fromEntries(formData.entries());

    if (source && dataSubmit?.skuCode) {
      const body = {
        source: source,
        note: dataSubmit?.note ?? "",
        details: [
          {
            skuCode: dataSubmit?.skuCode,
            quantity: Number(dataSubmit?.quantity),
          },
        ],
      };

      mutate?.(body as TPayloadCreateImportOrder);
      return;
    }
    toast.error("Bị lỗi khi tạo đơn");
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-1/2  max-h-[650px] px-3 ">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Phiếu nhập trực tiếp
          </DialogTitle>
          <DialogDescription className="hidden">
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="overflow-auto max-h-[520px] px-1 ">
            <div className="space-y-4">
              <h1 className=" font-semibold">Thông tin đơn nhập </h1>
              <div className="grid gap-4 grid-cols-2">
                <div className="grid gap-2">
                  <div className="flex items-center gap-1">
                    <Label htmlFor="src">Nguồn nhập </Label>
                    {<span className="text-red-500">*</span>}
                  </div>

                  <Select onValueChange={setSource} required>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Status</SelectLabel>
                        <SelectItem value={EStatusOrder.FACTORY}>
                          Factory
                        </SelectItem>
                        <SelectItem value={EStatusOrder.RETURNGOODS}>
                          Return Goods
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="username-1">Ngày nhập kho</Label>
                  <Input
                    id="day"
                    name="day"
                    className="cursor-not-allowed"
                    disabled={true}
                    value={format(new Date(), "dd/MM/yyyy")}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="note">Ghi chú</Label>
                  <Input
                    id="note"
                    name="note"
                    // defaultValue={data?.note ?? "--"}
                    // disabled={!isUpdate}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4 mt-4 py-2">
              <h1 className=" font-semibold">Thông tin Sản phẩm </h1>
              <div className="grid gap-4 grid-cols-2">
                <div className="grid gap-2">
                  <div className="flex gap-1 items-center">
                    {" "}
                    <Label htmlFor="name-1">Mã SKU</Label>
                    {<span className="text-red-500">*</span>}
                  </div>

                  <Input id="skuCode" name="skuCode" required />
                </div>
                <div className="grid gap-2">
                  <div className="flex gap-1 items-center">
                    <Label htmlFor="quantity">Số lượng</Label>
                    {<span className="text-red-500">*</span>}
                  </div>

                  <Input
                    id="quantity"
                    name="quantity"
                    type="number"
                    defaultValue={1}
                    min={1}
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="pt-2">
            <div className="flex gap-2">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={isPending}>
                {isPending && <LoadingBtn />} Import
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
