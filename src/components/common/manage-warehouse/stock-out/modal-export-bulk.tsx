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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { FileDown, FileUp, PenBox, Trash2 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { TAllExportOrderDetails } from "@/lib/networking/client/manage-warehouse/service";
import Loading from "../../loading";

export function ModalExportBulk({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [listIdExport, setListIdExport] = useState<number[]>([]);
  const [activeCheckbox, setActiveCheckbox] = useState(false);

  // TODO: Add export-specific logic here
  const data: TAllExportOrderDetails[] = [];
  const isMutating = false;
  const isSuccess = false;

  const handleDeleteSelectedItem = () => {
    // TODO: Implement delete logic
  };

  const handleUpdateItem = (item: TAllExportOrderDetails) => {
    // TODO: Implement update logic
    console.log("Update item:", item);
  };

  const handleDeleteItem = (id: number) => {
    // TODO: Implement delete logic
    console.log("Delete item:", id);
  };

  const handleSubmitImportExcel = () => {
    // TODO: Implement export excel logic
  };

  const handleDownloadTemplate = () => {
    // TODO: Implement download template logic
  };

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
    }
  }, [isSuccess, setOpen]);

  useEffect(() => {
    if (listIdExport.length > 0) {
      setActiveCheckbox(true);
    } else {
      setActiveCheckbox(false);
    }
  }, [listIdExport]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="min-w-[90%] min-h-[90%]">
        <DialogHeader>
          <DialogTitle>Xuất hàng loạt</DialogTitle>
          <DialogDescription>
            Tải lên file Excel để thêm nhiều đơn xuất cùng một lúc
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex items-center gap-4 mb-4">
          <Button
            className="flex items-center gap-2"
            onClick={() => fileRef.current?.click()}
            disabled={isMutating}
          >
            <FileUp size={16} />
            Tải lên file
          </Button>
          
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={handleDownloadTemplate}
          >
            <FileDown size={16} />
            Tải xuống mẫu
          </Button>

          <Input
            ref={fileRef}
            type="file"
            accept=".xlsx,.xls"
            className="hidden"
            onChange={() => {}}
          />
        </div>

        {activeCheckbox && (
          <div className="mb-4">
            <Button
              variant="destructive"
              className="flex items-center gap-2"
              onClick={handleDeleteSelectedItem}
            >
              <Trash2 size={16} />
              Xóa đã chọn
            </Button>
          </div>
        )}

        <div className="flex-1 overflow-auto">
          {isMutating ? (
            <div className="flex justify-center items-center h-32">
              <Loading />
            </div>
          ) : (
            <Table>
              <TableCaption>Danh sách đơn xuất sẽ được thêm</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox
                      checked={listIdExport.length === data.length && data.length > 0}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setListIdExport(data.map((item) => item.id));
                        } else {
                          setListIdExport([]);
                        }
                      }}
                    />
                  </TableHead>
                  <TableHead>STT</TableHead>
                  <TableHead>Mã đơn xuất</TableHead>
                  <TableHead>Mã SKU</TableHead>
                  <TableHead>Tên sản phẩm</TableHead>
                  <TableHead>Số lượng</TableHead>
                  <TableHead>Ngày xuất</TableHead>
                  <TableHead>Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8">
                      Chưa có dữ liệu. Vui lòng tải lên file Excel.
                    </TableCell>
                  </TableRow>
                ) : (
                  data.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Checkbox
                          checked={listIdExport.includes(item.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setListIdExport([...listIdExport, item.id]);
                            } else {
                              setListIdExport(listIdExport.filter(id => id !== item.id));
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item.exportCode}</TableCell>
                      <TableCell>{item.skuCode}</TableCell>
                      <TableCell>{item.productName}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>
                        {item.exportDate ? new Date(item.exportDate).toLocaleDateString("vi-VN") : "--"}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <PenBox
                            size={16}
                            className="cursor-pointer hover:text-blue-600"
                            onClick={() => handleUpdateItem(item)}
                          />
                          <Trash2
                            size={16}
                            className="cursor-pointer hover:text-red-600"
                            onClick={() => handleDeleteItem(item.id)}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </div>

        <DialogFooter className="flex gap-2">
          <DialogClose asChild>
            <Button variant="outline">Hủy</Button>
          </DialogClose>
          <Button
            onClick={handleSubmitImportExcel}
            disabled={isMutating || data.length === 0}
          >
            {isMutating ? "Đang xử lý..." : "Xác nhận xuất"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
