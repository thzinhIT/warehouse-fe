import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
import { Camera, Scan, Upload } from "lucide-react";
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
  const [source, setSource] = useState<string>();

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
              <div className="min-h-screen bg-gradient-to-br  dark:from-slate-900 dark:to-slate-800">
                <div className="container mx-auto px-4 py-8">
                  <div className="max-w-2xl mx-auto">
                    <Card className="p-8 shadow-xl border-0  dark:bg-slate-800/80 backdrop-blur-sm">
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Mã barcode
                          </h2>
                          <div className="flex items-center gap-3">
                            <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                              <Camera className="w-4 h-4" />
                              Quét camera
                            </Button>
                            <Button
                              type="button"
                              variant="outline"
                              className="flex items-center gap-2 border-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50 dark:border-blue-700 dark:hover:border-blue-600 dark:hover:bg-blue-900/20 px-4 py-2 rounded-lg transition-colors bg-transparent"
                              onClick={() => fileRef?.current?.click()}
                            >
                              <Upload className="w-4 h-4" />
                              Upload file
                            </Button>
                            <Input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              ref={fileRef}
                              onChange={handleFileChange}
                            />
                            <Image
                              ref={imgRef}
                              src="/placeholder.svg"
                              alt="ảnh code"
                              className="hidden"
                              width={20}
                              height={20}
                            />
                          </div>
                        </div>

                        <div className="flex items-start">
                          <div className="w-full">
                            <div className="mb-3">
                              <span className="text-gray-700 dark:text-gray-300 font-medium">
                                Kết quả code:{" "}
                                <span className="text-red-500">*</span>
                              </span>
                            </div>
                            <div className="relative">
                              <div className="w-full min-h-[120px] border-2 border-dashed border-gray-200 dark:border-gray-600 rounded-xl p-6 bg-gray-50/50 dark:bg-slate-700/50 flex items-center justify-center transition-all duration-200">
                                {result ? (
                                  <div className="text-center">
                                    <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full mb-3">
                                      <Scan className="w-6 h-6 text-green-600 dark:text-green-400" />
                                    </div>
                                    <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-gray-600 shadow-sm">
                                      <code className="text-lg font-mono font-semibold text-gray-900 dark:text-white break-all">
                                        {result}
                                      </code>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="text-center">
                                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full mb-3">
                                      <Scan className="w-6 h-6 text-gray-400" />
                                    </div>
                                    <p className="text-gray-500 dark:text-gray-400 font-medium">
                                      chưa có code nè ...
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
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
