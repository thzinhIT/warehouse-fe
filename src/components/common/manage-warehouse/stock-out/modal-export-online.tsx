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

export function ModalExportOnline({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement export online logic
    console.log("Export online submitted");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form onSubmit={handleSubmit}>
        <DialogContent className="w-1/3">
          <DialogHeader>
            <DialogTitle>Xuất hàng trực tiếp</DialogTitle>
            <DialogDescription>
              Thêm thông tin đơn xuất mới. Nhấn lưu khi hoàn thành.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="export-code">Mã đơn xuất</Label>
              <Input 
                id="export-code" 
                name="exportCode" 
                placeholder="Nhập mã đơn xuất" 
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="sku-code">Mã SKU</Label>
              <Input 
                id="sku-code" 
                name="skuCode" 
                placeholder="Nhập mã SKU"
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="product-name">Tên sản phẩm</Label>
              <Input 
                id="product-name" 
                name="productName" 
                placeholder="Nhập tên sản phẩm"
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="quantity">Số lượng</Label>
              <Input 
                id="quantity" 
                name="quantity" 
                type="number"
                placeholder="Nhập số lượng"
                min="1"
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="export-date">Ngày xuất</Label>
              <Input 
                id="export-date" 
                name="exportDate" 
                type="date"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Hủy</Button>
            </DialogClose>
            <Button type="submit">Lưu thay đổi</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
