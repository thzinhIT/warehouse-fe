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
import { BrowserMultiFormatReader } from "@zxing/browser";
import { BarcodeFormat, DecodeHintType } from "@zxing/library";
import Image from "next/image";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

export type TBodyUpdateImportOrderTemporary = {
  id?: number;
  skuCode: string;
  quantity: number;
  source?: string;
  note?: string;
};

export function ModalBarcode({
  open,
  setOpen,
}: {
  open: boolean;

  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  //   const [status, setStaus] = useState<string | undefined>(data?.source);
  //   if (!data) return;

  //   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //     if (!isUpdate) return;
  //     e.preventDefault();
  //     const formData = new FormData(e.currentTarget);
  //     const dataSubmit = Object.fromEntries(formData.entries());

  //     if (!status) {
  //       return toast.error("Status is required");
  //     }
  //     const body = {
  //       id: data?.id,
  //       skuCode: dataSubmit.skuCode.toString(),
  //       quantity: Number(dataSubmit.quantity),
  //       source: status === EStatusOrder.FACTORY ? "factory" : "returnGoods",
  //       note: dataSubmit.note.toString(),
  //     };

  //     onUpdateTemporary?.(body);
  //   };

  const [source, setSource] = useState<string>();
  const [data, setData] = useState();
  const [step, setStep] = useState(1);
  const fileRef = useRef<HTMLInputElement>(null);
  const [result, setResult] = useState<string>("");
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      if (imgRef.current) {
        imgRef.current.src = reader.result as string;

        imgRef.current.onload = async () => {
          try {
            const hints = new Map();
            hints.set(DecodeHintType.POSSIBLE_FORMATS, [
              BarcodeFormat.QR_CODE,
              BarcodeFormat.CODE_128,
              BarcodeFormat.EAN_13,
              BarcodeFormat.EAN_8,
              BarcodeFormat.UPC_A,
              BarcodeFormat.UPC_E,
            ]);

            const codeReader = new BrowserMultiFormatReader(hints);

            const decodeResult = await codeReader.decodeFromImageElement(
              imgRef.current as HTMLImageElement
            );

            setResult(decodeResult.getText());
          } catch (err) {
            console.error(" Không đọc được mã:", err);
            setResult("Không nhận diện được mã");
          }
        };
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-1/2  max-h-[650px] px-3 ">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Thông tin phiếu chi tiết
          </DialogTitle>
          <DialogDescription className="hidden">
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form>
          <div className="overflow-auto max-h-[520px] px-1 ">
            <div className="space-y-4 py-1">
              <h1 className=" font-semibold">Thông tin đơn nhập </h1>
              <div className="grid gap-4 grid-cols-2">
                <div className="grid gap-2">
                  <div className="flex items-center gap-1">
                    <Label htmlFor="src">Nguồn nhập </Label>
                    <span className="text-red-500">*</span>
                  </div>
                  <Select onValueChange={setSource}>
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
                  />
                </div>
                <div className="grid gap-2 col-span-2 ">
                  <Label htmlFor="note">Ghi chú</Label>
                  <Input id="note" name="note" />
                </div>
              </div>
            </div>

            <div className="space-y-4 py-1">
              <h1 className=" font-semibold">Mã barcode</h1>
              <div className="flex items-start ">
                <div className="w-3/5 ">
                  <span>
                    Kết quả code: <span className="text-red-500">*</span>
                  </span>
                  <p className=" w-50 border-2 rounded-lg p-2">
                    {result || "chưa có code nè ..."}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button className="cursor-pointer"> Quét camera</Button>
                  <Button
                    type="button"
                    className="cursor-pointer"
                    onClick={() => fileRef?.current?.click()}
                  >
                    {" "}
                    Upload file
                  </Button>
                  <Input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileRef}
                    onChange={handleFileChange}
                  />
                  <img
                    ref={imgRef}
                    width={20}
                    height={20}
                    alt="ảnh code"
                    className="hidden"
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
              <Button type="submit">Continue</Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
