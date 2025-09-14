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
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useErrorProduct } from "@/hooks/manage-storage/use-error-products";
import { LoadingPage } from "@/components/common/loading-page";

export function ModalErrorProductDetail({
  open,
  setOpen,
  productId,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  productId: number | null;
}) {
  const { data, isLoading, isError, error } = useErrorProduct(productId!);

  if (isLoading) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-1/2">
          <DialogTitle className="hidden"></DialogTitle>
          <LoadingPage />
        </DialogContent>
      </Dialog>
    );
  }

  if (isError) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-1/2">
          <DialogHeader>
            <DialogTitle className="text-center font-bold text-xl text-red-500">
              Lỗi
            </DialogTitle>
          </DialogHeader>
          <div className="text-center">
            <p>Có lỗi xảy ra khi tải thông tin sản phẩm lỗi</p>
            <p className="text-gray-600">
              {error instanceof Error ? error.message : "Lỗi không xác định"}
            </p>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Đóng</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {data && (
        <DialogContent className="w-1/2 max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-center font-bold text-xl">
              Chi tiết sản phẩm lỗi
            </DialogTitle>
            <DialogDescription className="hidden">
              Error product details modal
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <h1 className="font-semibold">Thông tin sản phẩm</h1>
            <div className="grid gap-4 grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="sku-code">Mã SKU</Label>
                <Input
                  id="sku-code"
                  className="cursor-not-allowed"
                  defaultValue={data.data?.skuCode ?? "--"}
                  disabled={true}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="damaged-item-count">Số lượng item lỗi</Label>
                <Input
                  id="damaged-item-count"
                  className="cursor-not-allowed"
                  defaultValue={data.data?.damagedItemCount?.toString() ?? "--"}
                  disabled={true}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="name">Tên sản phẩm</Label>
                <Input
                  id="name"
                  className="cursor-not-allowed"
                  defaultValue={data.data?.name ?? "--"}
                  disabled={true}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="storage-location">Vị trí lưu trữ</Label>
                <Input
                  id="storage-location"
                  className="cursor-not-allowed"
                  defaultValue={data.data?.storageLocation ?? "--"}
                  disabled={true}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="size">Kích cỡ</Label>
                <Input
                  id="size"
                  className="cursor-not-allowed"
                  defaultValue={data.data?.size ?? "--"}
                  disabled={true}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="color">Màu sắc</Label>
                <Input
                  id="color"
                  className="cursor-not-allowed"
                  defaultValue={data.data?.color ?? "--"}
                  disabled={true}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="type">Loại</Label>
                <Input
                  id="type"
                  className="cursor-not-allowed"
                  defaultValue={data.data?.type ?? "--"}
                  disabled={true}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="unit-volume">Dung tích</Label>
                <Input
                  id="unit-volume"
                  className="cursor-not-allowed"
                  defaultValue={data.data?.unitVolume?.toString() ?? "--"}
                  disabled={true}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="created-at">Ngày thêm vào hàng lỗi</Label>
                <Input
                  id="created-at"
                  className="cursor-not-allowed"
                  defaultValue={data.data?.createdAt ?? "--"}
                  disabled={true}
                />
              </div>
            </div>
          </div>

          {/* Damaged Items section */}
          <div className="space-y-4">
            <h1 className="font-semibold">Danh sách Item lỗi</h1>
            <div>
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-400 hover:bg-slate-400">
                    <TableCell className="border">STT</TableCell>
                    <TableCell className="border">Item ID</TableCell>
                    <TableCell className="border">Lý do</TableCell>
                    <TableCell className="border">Box ID</TableCell>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {data.data?.damagedItems &&
                  data.data.damagedItems.length > 0 ? (
                    data.data.damagedItems.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="border text-center">
                          {index + 1}
                        </TableCell>
                        <TableCell className="border">
                          {item.barcode ?? "--"}
                        </TableCell>
                        <TableCell className="border">
                          {item.note ?? "--"}
                        </TableCell>
                        <TableCell className="border">
                          {item.boxCode ?? "--"}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center">
                        Không có item lỗi nào
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Đóng</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
}
