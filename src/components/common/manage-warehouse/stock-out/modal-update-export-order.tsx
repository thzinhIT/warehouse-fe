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
import { getExportOrderDetailByDetailId } from "@/lib/networking/client/manage-warehouse/service";
import { useQuery } from "@tanstack/react-query";

export function ModalUpdateExportOrder({
  open,
  setOpen,
  title,
  detailId,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  detailId: number;
}) {
  const { data, isLoading } = useQuery({
    queryKey: [StockOutKeys.GETEXPORTORDERDETAILFULLYDETAILID, detailId],
    queryFn: () => getExportOrderDetailByDetailId(detailId),
    enabled: !!detailId && open,
    refetchOnWindowFocus: false,
  });

  if (!data && !isLoading) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-2/3 max-w-5xl max-h-[85vh] px-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">
            {title ?? "Chi tiết đơn xuất kho"}
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            Thông tin chi tiết về đơn xuất kho và danh sách sản phẩm
          </DialogDescription>
        </DialogHeader>

        <div className="overflow-auto max-h-[calc(85vh-180px)] px-1">
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <div className="text-center">Đang tải...</div>
            </div>
          ) : data ? (
            <div className="space-y-6">
              {/* Export Order Information Section */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
                  Thông tin đơn xuất
                </h2>
                <div className="grid gap-4 grid-cols-3">
                  <div className="grid gap-2">
                    <Label
                      htmlFor="export-code"
                      className="text-sm font-medium text-gray-700"
                    >
                      Mã đơn xuất
                    </Label>
                    <Input
                      id="export-code"
                      value={data?.exportCode ?? "--"}
                      className="bg-gray-50 border-gray-300"
                      disabled={true}
                      readOnly
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label
                      htmlFor="source"
                      className="text-sm font-medium text-gray-700"
                    >
                      Nguồn xuất
                    </Label>
                    <Input
                      id="source"
                      value={data?.source ?? "--"}
                      className="bg-gray-50 border-gray-300"
                      disabled={true}
                      readOnly
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label
                      htmlFor="status"
                      className="text-sm font-medium text-gray-700"
                    >
                      Trạng thái
                    </Label>
                    <Input
                      id="status"
                      value={data?.status ?? "--"}
                      className="bg-gray-50 border-gray-300"
                      disabled={true}
                      readOnly
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label
                      htmlFor="created-by"
                      className="text-sm font-medium text-gray-700"
                    >
                      Người tạo
                    </Label>
                    <Input
                      id="created-by"
                      value={data?.createdBy ?? "--"}
                      className="bg-gray-50 border-gray-300"
                      disabled={true}
                      readOnly
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label
                      htmlFor="created-at"
                      className="text-sm font-medium text-gray-700"
                    >
                      Ngày tạo
                    </Label>
                    <Input
                      id="created-at"
                      value={data?.createdAt ?? "--"}
                      className="bg-gray-50 border-gray-300"
                      disabled={true}
                      readOnly
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label
                      htmlFor="note"
                      className="text-sm font-medium text-gray-700"
                    >
                      Ghi chú
                    </Label>
                    <Input
                      id="note"
                      value={data?.note ?? "--"}
                      className="bg-gray-50 border-gray-300"
                      disabled={true}
                      readOnly
                    />
                  </div>
                </div>
              </div>

              {/* Product Details Table Section */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
                  Danh sách sản phẩm
                </h2>
                <div className="border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-100">
                        <TableCell className="font-semibold text-center border-r">
                          STT
                        </TableCell>
                        <TableCell className="font-semibold border-r">
                          Mã SKU
                        </TableCell>
                        <TableCell className="font-semibold border-r">
                          Tên sản phẩm
                        </TableCell>
                        <TableCell className="font-semibold text-center border-r">
                          Số lượng
                        </TableCell>
                        <TableCell className="font-semibold text-center border-r">
                          Size
                        </TableCell>
                        <TableCell className="font-semibold text-center border-r">
                          Màu
                        </TableCell>
                        <TableCell className="font-semibold text-center border-r">
                          Loại
                        </TableCell>
                        <TableCell className="font-semibold text-center">
                          Dung tích
                        </TableCell>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data?.details && data.details.length > 0 ? (
                        data.details.map((item, index) => (
                          <TableRow key={item.id} className="hover:bg-gray-50">
                            <TableCell className="text-center border-r font-medium">
                              {index + 1}
                            </TableCell>
                            <TableCell className="border-r font-mono">
                              {item.skuCode || "--"}
                            </TableCell>
                            <TableCell className="border-r">
                              {item.skuName || "--"}
                            </TableCell>
                            <TableCell className="text-center border-r font-semibold">
                              {item.quantity || 0}
                            </TableCell>
                            <TableCell className="text-center border-r">
                              {item.size || "--"}
                            </TableCell>
                            <TableCell className="text-center border-r">
                              {item.color || "--"}
                            </TableCell>
                            <TableCell className="text-center border-r">
                              {item.type || "--"}
                            </TableCell>
                            <TableCell className="text-center">
                              {item.unitVolume || "--"}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={8}
                            className="text-center py-8 text-gray-500"
                          >
                            Không có sản phẩm nào trong đơn xuất này
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
                {data?.details && data.details.length > 0 && (
                  <div className="text-right text-sm text-gray-600 bg-gray-50 px-4 py-2 rounded">
                    Tổng số sản phẩm:{" "}
                    <span className="font-semibold">{data.details.length}</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center h-40">
              <div className="text-center text-gray-500">Không có dữ liệu</div>
            </div>
          )}
        </div>

        <DialogFooter className="pt-4 border-t">
          <DialogClose asChild>
            <Button variant="outline" className="px-8">
              Đóng
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
