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

interface ModalConfirmLockProps {
  isOpen: boolean;
  onClose: () => void;
  employee: Employee | null;
  onConfirm: () => void;
  isLoading?: boolean;
}

export default function ModalConfirmLock({
  isOpen,
  onClose,
  employee,
  onConfirm,
  isLoading = false,
}: ModalConfirmLockProps) {
  if (!employee) return null;

  const isCurrentlyActive = employee.isActive;
  const actionCapitalized = isCurrentlyActive ? "KHÓA" : "MỞ KHÓA";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-900">
            Bạn có chắc chắn muốn {actionCapitalized} tài khoản này không?
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          {isCurrentlyActive ? (
            <>
              <p className="text-sm text-gray-600 mb-4">
                Khi tài khoản bị khóa:
              </p>
              <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
                <li>
                  Người dùng sẽ không thể đăng nhập và sử dụng các dịch vụ.
                </li>
                <li>
                  Người dùng vẫn được giữ nguyên, nhưng trạng thái sẽ chuyển
                  sang không hoạt động.
                </li>
              </ul>
            </>
          ) : (
            <>
              <p className="text-sm text-gray-600 mb-4">Khi mở khóa:</p>
              <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
                <li>
                  Người dùng có thể đăng nhập và sử dụng lại tất cả các dịch vụ
                  như trước.
                </li>
              </ul>
            </>
          )}
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
            className={`px-6 ${
              isCurrentlyActive
                ? "bg-red-600 hover:bg-red-700"
                : "bg-green-600 hover:bg-green-700"
            } text-white`}
          >
            {isLoading ? "Đang xử lý..." : `Xác nhận`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
