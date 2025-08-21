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
import { TExportOrderFullDetail } from "@/lib/networking/client/manage-warehouse/service";
import { formatFullDate } from "@/lib/regex/format-date-time";
import { Loader2 } from "lucide-react";

export function ModalDetailExportOrder({
  open,
  setOpen,
  data,
  isLoading,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data?: TExportOrderFullDetail;
  isLoading?: boolean;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Chi tiết đơn xuất</DialogTitle>
          <DialogDescription>
            Thông tin chi tiết về đơn xuất kho
          </DialogDescription>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2">Đang tải dữ liệu...</span>
          </div>
        ) : data ? (
          <div className="grid gap-4 py-4">
            {/* Export Order Information */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-900 border-b pb-2">
                Thông tin đơn xuất
              </h4>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="exportCode">Mã đơn xuất</Label>
                  <Input
                    id="exportCode"
                    value={data.exportCode || ""}
                    readOnly
                    className="bg-gray-50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="source">Nguồn</Label>
                  <Input
                    id="source"
                    value={data.source || ""}
                    readOnly
                    className="bg-gray-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Trạng thái</Label>
                  <Input
                    id="status"
                    value={data.status || ""}
                    readOnly
                    className="bg-gray-50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="createdBy">Tạo bởi</Label>
                  <Input
                    id="createdBy"
                    value={data.createdBy || ""}
                    readOnly
                    className="bg-gray-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="createdAt">Ngày tạo</Label>
                  <Input
                    id="createdAt"
                    value={
                      data.createdAt
                        ? (() => {
                            try {
                              return (
                                formatFullDate(data.createdAt) ||
                                new Date(data.createdAt).toLocaleDateString(
                                  "vi-VN"
                                )
                              );
                            } catch {
                              return data.createdAt;
                            }
                          })()
                        : ""
                    }
                    readOnly
                    className="bg-gray-50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="note">Ghi chú</Label>
                <textarea
                  id="note"
                  value={data.note || "Không có ghi chú"}
                  readOnly
                  className="w-full p-2 border rounded-md bg-gray-50 resize-none"
                  rows={3}
                />
              </div>
            </div>

            {/* Export Order Details */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-900 border-b pb-2">
                Chi tiết sản phẩm ({data.details?.length || 0} sản phẩm)
              </h4>

              {data.details && data.details.length > 0 ? (
                <div className="space-y-4">
                  {data.details.map((detail, index) => (
                    <div
                      key={detail.id}
                      className="border rounded-lg p-4 bg-gray-50"
                    >
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div className="space-y-2">
                          <Label htmlFor={`skuCode-${index}`}>Mã SKU</Label>
                          <Input
                            id={`skuCode-${index}`}
                            value={detail.skuCode || ""}
                            readOnly
                            className="bg-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`skuName-${index}`}>
                            Tên sản phẩm
                          </Label>
                          <Input
                            id={`skuName-${index}`}
                            value={detail.skuName || ""}
                            readOnly
                            className="bg-white"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-3">
                        <div className="space-y-2">
                          <Label htmlFor={`size-${index}`}>Kích thước</Label>
                          <Input
                            id={`size-${index}`}
                            value={detail.size || ""}
                            readOnly
                            className="bg-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`color-${index}`}>Màu sắc</Label>
                          <Input
                            id={`color-${index}`}
                            value={detail.color || ""}
                            readOnly
                            className="bg-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`type-${index}`}>Loại</Label>
                          <Input
                            id={`type-${index}`}
                            value={detail.type || ""}
                            readOnly
                            className="bg-white"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`quantity-${index}`}>Số lượng</Label>
                          <Input
                            id={`quantity-${index}`}
                            value={detail.quantity?.toString() || "0"}
                            readOnly
                            className="bg-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`unitVolume-${index}`}>
                            Thể tích đơn vị
                          </Label>
                          <Input
                            id={`unitVolume-${index}`}
                            value={detail.unitVolume?.toString() || "0"}
                            readOnly
                            className="bg-white"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Không có chi tiết sản phẩm
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            Không có dữ liệu để hiển thị
          </div>
        )}

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Đóng</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
