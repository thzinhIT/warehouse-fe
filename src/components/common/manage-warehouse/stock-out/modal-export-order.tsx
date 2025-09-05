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

interface ModalExportOrderProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

interface ExportItem {
  stt: number;
  boxCanLay: string;
  sku: string;
  soLuongCanLay: number;
}

interface ExportOrderData {
  maDonXuat: string;
  ngayXuatKho: string;
  ghiChu: string;
  items: ExportItem[];
}

export function ModalExportOrder({ open, setOpen }: ModalExportOrderProps) {
  const [loading, setLoading] = useState(false);
  const [exportOrderData, setExportOrderData] =
    useState<ExportOrderData | null>(null);
  const [formData, setFormData] = useState({
    maDonXuat: "",
    ngayXuatKho: "",
    ghiChu: "",
  });

  // Fetch export order data when modal opens
  useEffect(() => {
    if (open) {
      fetchExportOrderData();
    }
  }, [open]);

  const fetchExportOrderData = async () => {
    setLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await api.get('/admin/export-orders/export/latest');
      // const data = response.data;

      // For now, just set loading to false
      console.log("Fetching data from /admin/export-orders/export/latest");

      // Mock delay to simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // This will be replaced with actual API response
      setExportOrderData(null);
    } catch (error) {
      console.error("Error fetching export order data:", error);
      // Handle error appropriately
    } finally {
      setLoading(false);
    }
  };

  // Update form data when export order data changes
  useEffect(() => {
    if (exportOrderData) {
      setFormData({
        maDonXuat: exportOrderData.maDonXuat,
        ngayXuatKho: exportOrderData.ngayXuatKho,
        ghiChu: exportOrderData.ghiChu,
      });
    }
  }, [exportOrderData]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleClose = () => {
    setFormData({
      maDonXuat: "",
      ngayXuatKho: "",
      ghiChu: "",
    });
    setExportOrderData(null);
    setOpen(false);
  };

  const handleConfirm = () => {
    // TODO: Call your API to update export order if needed
    console.log("Export Order Data:", {
      ...formData,
      items: exportOrderData?.items || [],
    });

    // Close modal after successful submission
    handleClose();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-[800px] max-h-[90vh] overflow-y-auto">
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
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-lg">Đang tải dữ liệu...</div>
            </div>
          ) : (
            <>
              {/* Export Order Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Thông tin đơn xuất
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  {/* Mã đơn xuất */}
                  <div className="space-y-2">
                    <Label htmlFor="maDonXuat" className="text-sm font-medium">
                      Mã đơn xuất
                    </Label>
                    <Input
                      id="maDonXuat"
                      placeholder="Read only text"
                      value={formData.maDonXuat}
                      onChange={(e) =>
                        handleInputChange("maDonXuat", e.target.value)
                      }
                      readOnly
                      className="bg-gray-50 text-gray-500"
                    />
                  </div>

                  {/* Ngày xuất kho */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="ngayXuatKho"
                      className="text-sm font-medium"
                    >
                      Ngày xuất kho
                    </Label>
                    <Input
                      id="ngayXuatKho"
                      placeholder="Read only text"
                      value={formData.ngayXuatKho}
                      onChange={(e) =>
                        handleInputChange("ngayXuatKho", e.target.value)
                      }
                      readOnly
                      className="bg-gray-50 text-gray-500"
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
                    placeholder="có thể sửa ghi chú"
                    value={formData.ghiChu}
                    onChange={(e) =>
                      handleInputChange("ghiChu", e.target.value)
                    }
                  />
                </div>
              </div>

              {/* Export Items Table */}
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Lộ trình lấy hàng
                </h3>

                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="text-center font-medium">
                          STT
                        </TableHead>
                        <TableHead className="text-center font-medium">
                          Box cần lấy
                        </TableHead>
                        <TableHead className="text-center font-medium">
                          SKU
                        </TableHead>
                        <TableHead className="text-center font-medium">
                          Số lượng cần lấy
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {exportOrderData?.items &&
                      exportOrderData.items.length > 0 ? (
                        exportOrderData.items.map((item, index) => (
                          <TableRow key={index}>
                            <TableCell className="text-center">
                              {item.stt}
                            </TableCell>
                            <TableCell className="text-center">
                              {item.boxCanLay}
                            </TableCell>
                            <TableCell className="text-center">
                              {item.sku}
                            </TableCell>
                            <TableCell className="text-center">
                              {item.soLuongCanLay}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={4}
                            className="text-center py-8 text-gray-500"
                          >
                            {loading ? "Đang tải..." : "Không có dữ liệu"}
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </>
          )}
        </div>

        <DialogFooter className="flex justify-end space-x-2 pt-4 border-t">
          <Button
            type="button"
            onClick={handleConfirm}
            disabled={loading}
            className="px-8 bg-blue-600 hover:bg-blue-700 text-white"
          >
            Đóng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

return (
  <Dialog open={open} onOpenChange={setOpen}>
    <DialogContent className="max-w-[800px] max-h-[90vh] overflow-y-auto">
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
                placeholder="Read only text"
                value={formData.maDonXuat}
                onChange={(e) => handleInputChange("maDonXuat", e.target.value)}
                readOnly
                className="bg-gray-50 text-gray-500"
              />
            </div>

            {/* Ngày xuất kho */}
            <div className="space-y-2">
              <Label htmlFor="ngayXuatKho" className="text-sm font-medium">
                Ngày xuất kho
              </Label>
              <Input
                id="ngayXuatKho"
                placeholder="Read only text"
                value={formData.ngayXuatKho}
                onChange={(e) =>
                  handleInputChange("ngayXuatKho", e.target.value)
                }
                readOnly
                className="bg-gray-50 text-gray-500"
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
              placeholder="có thể sửa ghi chú"
              value={formData.ghiChu}
              onChange={(e) => handleInputChange("ghiChu", e.target.value)}
            />
          </div>
        </div>

        {/* Export Items Table */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Lộ trình lấy hàng</h3>

          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="text-center font-medium">STT</TableHead>
                  <TableHead className="text-center font-medium">
                    Box cần lấy
                  </TableHead>
                  <TableHead className="text-center font-medium">SKU</TableHead>
                  <TableHead className="text-center font-medium">
                    Số lượng cần lấy
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {exportItems.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-center">{item.stt}</TableCell>
                    <TableCell className="text-center">
                      {item.boxCanLay}
                    </TableCell>
                    <TableCell className="text-center">{item.sku}</TableCell>
                    <TableCell className="text-center">
                      {item.soLuongCanLay}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      <DialogFooter className="flex justify-end space-x-2 pt-4 border-t">
        <Button
          type="button"
          onClick={handleConfirm}
          className="px-8 bg-blue-600 hover:bg-blue-700 text-white"
        >
          Đóng
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);
