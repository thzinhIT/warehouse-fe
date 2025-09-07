"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Employee } from "@/lib/networking/services/employee.service";

interface ModalConfirmResetPasswordProps {
  isOpen: boolean;
  onClose: () => void;
  employee: Employee | null;
  onConfirm: () => void;
  isLoading?: boolean;
}

export default function ModalConfirmResetPassword({
  isOpen,
  onClose,
  employee,
  onConfirm,
  isLoading = false,
}: ModalConfirmResetPasswordProps) {
  if (!employee) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-900">
            Bạn có chắc chắn muốn ĐẶT LẠI mật khẩu cho tài khoản này?
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <p className="text-sm text-gray-600 mb-4">Sau khi đặt lại:</p>
          <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
            <li>Mật khẩu cũ sẽ không còn hiệu lực.</li>
            <li>Hệ thống sẽ đặt lại mật khẩu mặc định cho tài khoản.</li>
          </ul>
        </div>

        <DialogFooter className="flex justify-end space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="px-6"
          >
            Hủy
          </Button>
          <Button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className="px-6 bg-orange-600 hover:bg-orange-700 text-white"
          >
            {isLoading ? "Đang xử lý..." : "Xác nhận"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
