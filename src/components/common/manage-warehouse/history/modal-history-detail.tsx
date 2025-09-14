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
import StockInKeys from "@/lib/networking/client/manage-warehouse/endpoints";
import { getHistoryImportOrderById } from "@/lib/networking/client/manage-warehouse/service";
import { useQuery } from "@tanstack/react-query";

export function ModalHistoryDetail({
  open,
  setOpen,
  id,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
}) {
  const { data } = useQuery({
    queryKey: [StockInKeys.HISTORY_IMPORT_ORDER_BY_ID, id],
    queryFn: () => getHistoryImportOrderById(id),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {data && (
        <DialogContent className="w-1/2  max-h-[90vh] ">
          <DialogHeader>
            <DialogTitle className="text-center font-bold text-xl">
              Chi Tiết Đơn nhập kho
            </DialogTitle>
            <DialogDescription className="hidden">
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 overflow-hidden">
            {" "}
            <div className="space-y-4">
              <h1 className=" font-semibold">Thông tin đơn nhập </h1>
              <div className="grid gap-4 grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="name-1">Mã đơn nhập</Label>
                  <Input
                    id="id"
                    name="id"
                    className="cursor-not-allowed"
                    defaultValue={data?.id ?? "--"}
                    disabled={true}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="name-1">Ngày nhập kho</Label>
                  <Input
                    id="id"
                    name="id"
                    className="cursor-not-allowed"
                    defaultValue={data?.createdAt || "--"}
                    disabled={true}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="username-1">Nguồn nhập</Label>
                  <Input
                    id="day"
                    name="day"
                    className="cursor-not-allowed"
                    defaultValue={data?.source ?? "--"}
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
            <div className="space-y-4 flex-1 flex flex-col ">
              <div>
                <h1 className=" font-semibold">Danh sách sản phẩm</h1>
              </div>

              <div className="flex-1 overflow-y-auto max-h-[270px] min-h-0 scrollbar ">
                <Table className=" ">
                  <TableHeader className="sticky top-0 z-10">
                    <TableRow className="bg-slate-400 hover:bg-slate-400">
                      <TableCell className="w-1/2 border">SKU</TableCell>
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
                            {item?.quantity ?? "--"}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell className="text-center ">
                          Không có item nào hết á bà con ơi
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
}
