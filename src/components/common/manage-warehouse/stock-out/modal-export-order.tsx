"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { X } from "lucide-react";
import { useLatestExport, useUpdateExportNote } from "@/hooks/manage-warehouse/use-export-order";
import { PickingRouteResponse } from "@/lib/networking/services/export-order.service";

interface ModalExportOrderProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function ModalExportOrder({ open, setOpen }: ModalExportOrderProps) {
  const [formData, setFormData] = useState({
    maDonXuat: "",
    ngayXuatKho: "",
    ghiChu: "",
  });
  const [hasChangedNote, setHasChangedNote] = useState(false);

  // API calls
  const { data: exportInfo, isLoading, error, refetch } = useLatestExport();
  const updateNoteMutation = useUpdateExportNote();

  // Update form data when export info changes
  useEffect(() => {
    if (exportInfo && open) {
      setFormData({
        maDonXuat: exportInfo.exportCode || "",
        ngayXuatKho: exportInfo.exportDate || "",
        ghiChu: exportInfo.note || "",
      });
      setHasChangedNote(false);
    }
  }, [exportInfo, open]);

  // Refetch data when modal opens
  useEffect(() => {
    if (open && !isLoading && !exportInfo) {
      refetch();
    }
  }, [open, refetch, isLoading, exportInfo]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (field === "ghiChu") {
      setHasChangedNote(true);
    }
  };

  const handleClose = () => {
    setFormData({
      maDonXuat: "",
      ngayXuatKho: "",
      ghiChu: "",
    });
    setHasChangedNote(false);
    setOpen(false);
  };

  const handleConfirm = async () => {
    // Update note if changed
    if (hasChangedNote && formData.maDonXuat && formData.ghiChu !== (exportInfo?.note || "")) {
      try {
        await updateNoteMutation.mutateAsync({
          exportCode: formData.maDonXuat,
          note: formData.ghiChu,
        });
      } catch (error) {
        console.error("Error updating note:", error);
        return; // Don't close modal if update fails
      }
    }

    // Close modal after successful submission
    handleClose();
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Đang tải dữ liệu...</div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <div className="text-lg text-red-600">Lỗi khi tải dữ liệu</div>
          <Button 
            onClick={() => refetch()} 
            variant="outline"
            size="sm"
          >
            Thử lại
          </Button>
        </div>
      );
    }

    if (!exportInfo || !exportInfo.exportCode) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-500">Không có đơn đang xuất</div>
        </div>
      );
    }

    return (
      <>
        {/* Export Order Information */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Thông tin đơn xuất</h3>

          <div className="grid grid-cols-2 gap-4">
            {/* Mã đơn xuất */}
            <div className="space-y-2">
              <Label htmlFor="maDonXuat" className="text-sm font-medium">
                Mã đơn xuất
              </Label>
              <Input
                id="maDonXuat"
                placeholder="Mã đơn xuất"
                value={formData.maDonXuat}
                readOnly
                className="bg-gray-50 text-gray-700"
              />
            </div>

            {/* Ngày xuất kho */}
            <div className="space-y-2">
              <Label htmlFor="ngayXuatKho" className="text-sm font-medium">
                Ngày xuất kho
              </Label>
              <Input
                id="ngayXuatKho"
                placeholder="Ngày xuất kho"
                value={formData.ngayXuatKho}
                readOnly
                className="bg-gray-50 text-gray-700"
              />
            </div>
          </div>

          {/* Ghi chú */}
          <div className="space-y-2 mt-4">
            <Label htmlFor="ghiChu" className="text-sm font-medium">
              Ghi chú
            </Label>
            <Input
              id="ghiChu"
              placeholder="Nhập ghi chú (có thể chỉnh sửa)"
              value={formData.ghiChu}
              onChange={(e) => handleInputChange("ghiChu", e.target.value)}
              className={hasChangedNote ? "border-orange-500 focus:border-orange-600" : ""}
            />
            {hasChangedNote && (
              <p className="text-sm text-orange-600">Ghi chú đã được thay đổi</p>
            )}
          </div>
        </div>

        {/* Picking Routes Table */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Lộ trình lấy hàng</h3>

          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="text-center font-medium">STT</TableHead>
                  <TableHead className="text-center font-medium">SKU</TableHead>
                  <TableHead className="text-center font-medium">Box</TableHead>
                  <TableHead className="text-center font-medium">Shelf</TableHead>
                  <TableHead className="text-center font-medium">Số lượng cần lấy</TableHead>
                  <TableHead className="text-center font-medium">Barcodes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {exportInfo.pickingRoutes && exportInfo.pickingRoutes.length > 0 ? (
                  exportInfo.pickingRoutes.map((route: PickingRouteResponse, index: number) => (
                    <TableRow key={index}>
                      <TableCell className="text-center">{index + 1}</TableCell>
                      <TableCell className="text-center">{route.skuCode}</TableCell>
                      <TableCell className="text-center">{route.boxCode}</TableCell>
                      <TableCell className="text-center">{route.shelfCode || "-"}</TableCell>
                      <TableCell className="text-center">{route.quantityPicked}</TableCell>
                      <TableCell className="text-center">
                        {route.barcodes?.length > 0 ? route.barcodes.join(", ") : "-"}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      Không có lộ trình lấy hàng
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </>
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-[900px] max-h-[90vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-xl font-bold text-gray-900">
            Đơn đang xuất
          </DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="h-6 w-6 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {renderContent()}
        </div>

        <DialogFooter className="flex justify-end space-x-2 pt-4 border-t">
          <Button
            type="button"
            onClick={handleConfirm}
            disabled={isLoading || updateNoteMutation.isPending}
            className="px-8 bg-blue-600 hover:bg-blue-700 text-white"
          >
            {updateNoteMutation.isPending ? "Đang cập nhật..." : "Đóng"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

