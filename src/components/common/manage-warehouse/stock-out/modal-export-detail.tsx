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
import StockOutKeys from "@/lib/networking/client/manage-warehouse/stock-out-endpoints";
import { getExportOrderFullById } from "@/lib/networking/client/manage-warehouse/service";
import { useQuery } from "@tanstack/react-query";

export function ModalExportDetail({
  open,
  setOpen,
  id,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
}) {
  const { data } = useQuery({
    queryKey: [StockOutKeys.EXPORT_ORDER_FULL_BY_ID, id],
    queryFn: () => getExportOrderFullById(id),
    enabled: !!id && open,
    refetchOnWindowFocus: false,
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {data && (
        <DialogContent className="w-1/2">
          <DialogHeader>
            <DialogTitle className="text-center font-bold text-xl">
              Chi Tiết Đơn xuất kho
            </DialogTitle>
            <DialogDescription className="hidden">
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <h1 className=" font-semibold">Thông tin đơn xuất </h1>
            <div className="grid gap-4 grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="export-code">Mã đơn xuất</Label>
                <Input
                  id="export-code"
                  name="export-code"
                  className="cursor-not-allowed"
                  defaultValue={data?.exportCode ?? "--"}
                  disabled={true}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="created-at">Ngày xuất kho</Label>
                <Input
                  id="created-at"
                  name="created-at"
                  className="cursor-not-allowed"
                  defaultValue={data?.createdAt || "--"}
                  disabled={true}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="source">Nguồn xuất</Label>
                <Input
                  id="source"
                  name="source"
                  className="cursor-not-allowed"
                  defaultValue={data?.source ?? "--"}
                  disabled={true}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Trạng thái</Label>
                <Input
                  id="status"
                  name="status"
                  className="cursor-not-allowed"
                  defaultValue={data?.status ?? "--"}
                  disabled={true}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="created-by">Người tạo</Label>
                <Input
                  id="created-by"
                  name="created-by"
                  className="cursor-not-allowed"
                  defaultValue={data?.createdBy ?? "--"}
                  disabled={true}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="note">Ghi chú</Label>
                <Input
                  id="note"
                  name="note"
                  defaultValue={data?.note ?? "--"}
                  disabled={true}
                />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h1 className=" font-semibold">Danh sách sản phẩm</h1>
            <div>
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-400 hover:bg-slate-400">
                    <TableCell className="border">SKU</TableCell>
                    <TableCell className="border">Tên sản phẩm</TableCell>
                    <TableCell className="border">Size</TableCell>
                    <TableCell className="border">Màu</TableCell>
                    <TableCell className="border">Loại</TableCell>
                    <TableCell className="border">Số lượng</TableCell>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {data && data?.details?.length > 0 ? (
                    data?.details?.map((item) => (
                      <TableRow key={item?.id}>
                        <TableCell className="border">
                          {item?.skuCode ?? "--"}
                        </TableCell>
                        <TableCell className="border">
                          {item?.skuName ?? "--"}
                        </TableCell>
                        <TableCell className="border">
                          {item?.size ?? "--"}
                        </TableCell>
                        <TableCell className="border">
                          {item?.color ?? "--"}
                        </TableCell>
                        <TableCell className="border">
                          {item?.type ?? "--"}
                        </TableCell>
                        <TableCell className="border">
                          {item?.quantity ?? "--"}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center">
                        Không có sản phẩm nào
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
