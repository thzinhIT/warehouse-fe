import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { TDataImportOrderTemporary } from "@/lib/networking/client/manage-warehouse/service";
import { formatDDMMYY } from "@/lib/regex/format-date-time";
import { EStatusOrder } from "@/lib/types/enum/stock-in.enum";
import { useState } from "react";
import toast from "react-hot-toast";

export type TBodyUpdateImportOrderTemporary = {
  id?: number;
  skuCode: string;
  quantity: number;
  source?: string;
  note?: string;
};

export function ModalUpdateImportOrder({
  open,
  setOpen,
  isUpdate = true,
  title,
  data,
  onUpdateTemporary,
}: {
  open: boolean;
  isUpdate?: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  data?: TDataImportOrderTemporary;
  onUpdateTemporary?: (body: TBodyUpdateImportOrderTemporary) => void;
}) {
  const [status, setStaus] = useState<string | undefined>(data?.source);
  if (!data) return;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!isUpdate) return;
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const dataSubmit = Object.fromEntries(formData.entries());

    if (!status) {
      return toast.error("Status is required");
    }
    const body = {
      id: data?.id,
      skuCode: dataSubmit.skuCode.toString(),
      quantity: Number(dataSubmit.quantity),
      source: status === EStatusOrder.FACTORY ? "factory" : "returnGoods",
      note: dataSubmit.note.toString(),
    };

    onUpdateTemporary?.(body);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-1/2  max-h-[650px] px-3 ">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {title ?? "Thông tin phiếu chi tiết"}
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
                  <Label htmlFor="name-1">Mã đơn nhập</Label>
                  <Input
                    id="id"
                    name="id"
                    defaultValue={data?.importCode ?? "--"}
                    className="cursor-not-allowed"
                    disabled={true}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="username-1">Ngày nhập kho</Label>
                  <Input
                    id="day"
                    name="day"
                    defaultValue={formatDDMMYY(data?.createdAt) ?? "--"}
                    className="cursor-not-allowed"
                    disabled={true}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center gap-1">
                    <Label htmlFor="src">Nguồn nhập </Label>
                    {isUpdate && <span className="text-red-500">*</span>}
                  </div>

                  <Select
                    defaultValue={data?.source}
                    onValueChange={setStaus}
                    value={status}
                    disabled={!isUpdate}
                  >
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
                  <Label htmlFor="note">Ghi chú</Label>
                  <Input
                    id="note"
                    name="note"
                    defaultValue={data?.note ?? "--"}
                    disabled={!isUpdate}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4 mt-4">
              <h1 className=" font-semibold">Thông tin Sản phẩm </h1>
              <div className="grid gap-4 grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="name-1">Mã SKU</Label>
                  <Input
                    id="skuCode"
                    name="skuCode"
                    defaultValue={data?.skuCode ?? "--"}
                    disabled={!isUpdate}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="quantity">Số lượng</Label>
                  <Input
                    id="quantity"
                    name="quantity"
                    defaultValue={data?.quantity ?? "--"}
                    type="number"
                    min={0}
                    disabled={!isUpdate}
                  />
                </div>
                <div className="grid gap-2 col-span-2">
                  <Label htmlFor="skuName">Tên sản phẩm</Label>
                  <Input
                    id="skuName"
                    name="skuName"
                    defaultValue={data?.skuName ?? "--"}
                    disabled={true}
                    className="cursor-not-allowed"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="size">Kích cỡ</Label>
                  <Input
                    id="size"
                    name="size"
                    defaultValue={data?.size ?? "--"}
                    className="cursor-not-allowed"
                    disabled={true}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="color">Màu sắc</Label>
                  <Input
                    id="color"
                    name="color"
                    defaultValue={data?.color ?? "--"}
                    className="cursor-not-allowed"
                    disabled={true}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="type">Loại</Label>
                  <Input
                    id="type"
                    name="type"
                    defaultValue={data?.type ?? "--"}
                    className="cursor-not-allowed"
                    disabled={true}
                  />
                </div>

                <div className="grid gap-2 ">
                  <Label htmlFor="unit-volume">Dung tích</Label>
                  <Input
                    id="unit-volume"
                    name="unit-volume"
                    defaultValue={data?.unitVolume ?? "--"}
                    className="cursor-not-allowed"
                    disabled={true}
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
              <Button type="submit" className={`${!isUpdate && "hidden"}`}>
                Update
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
