import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import {
  TDataImportOrderTemporary,
  TImportBarcodeBody,
} from "@/lib/networking/client/manage-warehouse/service";
import { formatDDMMYY } from "@/lib/regex/format-date-time";
import { EStatusOrder } from "@/lib/types/enum/stock-in.enum";
import { BrowserMultiFormatReader } from "@zxing/browser";
import { BarcodeFormat, DecodeHintType } from "@zxing/library";
import { AlertCircle, Camera, CheckCircle, Upload } from "lucide-react";
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
  ImportBarcodeFn,
  isPending,
}: Readonly<{
  open: boolean;
  isPending: boolean;
  ImportBarcodeFn: (body: TImportBarcodeBody) => void;

  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>) {
  const [source, setSource] = useState<string>();
  const fileRef = useRef<HTMLInputElement>(null);
  const [result, setResult] = useState<string>("");
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [previewImage, setPreviewImage] = useState<string>("");

  const [fileName, setFileName] = useState<string>("");

  const inputRef = useRef({ note: "" });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const reader = new FileReader();
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setPreviewImage(imageUrl);
      };
    }

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!source) {
      toast.error("Vui lòng chọn nguồn nhập");
      return;
    }
    if (!result) {
      toast.error("Vui lòng quét mã barcode");
      return;
    }
    const body: TImportBarcodeBody = {
      scannedItems: [{ barcode: result }],
      source,
      note: inputRef.current.note,
    };

    try {
      ImportBarcodeFn(body);
      setOpen(false);
    } catch (error) {
      toast.error("Có lỗi xảy ra khi nhập barcode");
    }
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
        <form onSubmit={handleSubmit}>
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
                    value={formatDDMMYY(
                      new Date().toISOString().slice(0, 10).replace(/-/g, "/")
                    )}
                  />
                </div>
                <div className="grid gap-2 col-span-2 ">
                  <Label htmlFor="note">Ghi chú</Label>
                  <Input
                    id="note"
                    name="note"
                    onChange={(e) => (inputRef.current.note = e.target.value)}
                  />
                </div>
              </div>
            </div>

            <Card className="bg-background border-none shadow-none ">
              <CardHeader className=" px-0">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  Quét mã barcode
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 px-0">
                {/* Scanning Actions */}
                <div className="flex flex-wrap gap-3">
                  <Button
                    type="button"
                    className="flex items-center gap-2 bg-primary hover:bg-primary/90 cursor-not-allowed"
                    disabled={true}
                  >
                    <Camera className="w-4 h-4" />
                    Quét camera
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex items-center gap-2 border-2 hover:bg-accent/5 bg-background cursor-pointer"
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
                  <img
                    ref={imgRef}
                    src="/placeholder.svg"
                    alt="ảnh code"
                    className="hidden"
                    width={20}
                    height={20}
                  />
                </div>

                {previewImage && (
                  <Card className="bg-muted/30 border-dashed">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium flex items-center gap-2">
                        <Upload className="w-4 h-4" />
                        File Preview
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden border bg-background">
                          <img
                            src={previewImage || "/placeholder.svg"}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">
                            {fileName}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            File đã được tải lên thành công
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="space-y-3">
                  <Label className="text-sm font-medium flex items-center gap-1">
                    Kết quả quét <span className="text-destructive">*</span>
                  </Label>

                  {result ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-primary">
                        <CheckCircle className="w-4 h-4" />
                        <span>Mã barcode đã được quét thành công</span>
                      </div>
                      <Input
                        value={result}
                        placeholder="Nhập hoặc chỉnh sửa mã barcode"
                        className="font-mono text-lg bg-background border-2 border-primary/20 focus:border-primary"
                        disabled={true}
                      />
                    </div>
                  ) : (
                    <div className="min-h-[100px] border-2 border-dashed border-border rounded-xl p-6 bg-muted/30 flex items-center justify-center">
                      <div className="text-center space-y-3">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-muted rounded-full">
                          <AlertCircle className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <div className="space-y-1">
                          <p className="font-medium text-muted-foreground">
                            Chưa có mã barcode
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Vui lòng quét camera hoặc upload file để tiếp tục
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <DialogFooter className="pt-2">
            <div className="flex gap-2">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Đang xử lý..." : "Xác nhận"}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
