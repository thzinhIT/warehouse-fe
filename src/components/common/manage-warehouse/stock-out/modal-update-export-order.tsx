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
import { TAllExportOrderDetails } from "@/lib/networking/client/manage-warehouse/service";

export type TBodyUpdateExportOrderDetails = {
  id?: number;
  skuCode: string;
  quantity: number;
};

export function ModalUpdateExportOrder({
  open,
  setOpen,
  isUpdate = true,
  title,
  data,
  onUpdateExportOrder,
}: {
  open: boolean;
  isUpdate?: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  data?: TAllExportOrderDetails;
  onUpdateExportOrder?: (body: TBodyUpdateExportOrderDetails) => void;
}) {
  if (!data) return;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!isUpdate) return;
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const dataSubmit = Object.fromEntries(formData.entries());

    const body = {
      id: data?.id,
      skuCode: dataSubmit.skuCode.toString(),
      quantity: Number(dataSubmit.quantity),
    };

    onUpdateExportOrder?.(body);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-1/2 max-h-[650px] px-3">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {title ?? "Thông tin phiếu xuất chi tiết"}
          </DialogTitle>
          <DialogDescription className="hidden">
            Chỉnh sửa thông tin đơn xuất. Nhấn lưu khi hoàn thành.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="overflow-auto max-h-[520px] px-1">
            <div className="space-y-4">
              <h1 className="font-semibold">Thông tin đơn xuất</h1>
              <div className="grid gap-4 grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="export-code">Mã đơn xuất</Label>
                  <Input
                    id="export-code"
                    name="exportCode"
                    defaultValue={data?.exportCode ?? "--"}
                    className="cursor-not-allowed"
                    disabled={true}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="export-date">Ngày xuất</Label>
                  <Input
                    id="export-date"
                    name="exportDate"
                    defaultValue={
                      data?.exportDate 
                        ? new Date(data.exportDate).toLocaleDateString("vi-VN")
                        : "--"
                    }
                    className="cursor-not-allowed"
                    disabled={true}
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <h2 className="font-semibold">Chi tiết sản phẩm</h2>
                <div className="grid gap-4 grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="sku-code">Mã SKU</Label>
                    <Input
                      id="sku-code"
                      name="skuCode"
                      defaultValue={data?.skuCode ?? ""}
                      disabled={!isUpdate}
                      className={!isUpdate ? "cursor-not-allowed" : ""}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="product-name">Tên sản phẩm</Label>
                    <Input
                      id="product-name"
                      name="productName"
                      defaultValue={data?.productName ?? ""}
                      className="cursor-not-allowed"
                      disabled={true}
                    />
                  </div>
                </div>
                
                <div className="grid gap-4 grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="quantity">Số lượng</Label>
                    <Input
                      id="quantity"
                      name="quantity"
                      type="number"
                      min="1"
                      defaultValue={data?.quantity ?? 0}
                      disabled={!isUpdate}
                      className={!isUpdate ? "cursor-not-allowed" : ""}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline">
                {isUpdate ? "Hủy" : "Đóng"}
              </Button>
            </DialogClose>
            {isUpdate && (
              <Button type="submit">
                Lưu thay đổi
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
