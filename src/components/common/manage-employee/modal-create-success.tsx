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

interface ModalCreateSuccessProps {
  isOpen: boolean;
  onClose: () => void;
  createdUser: Employee | null;
}

export default function ModalCreateSuccess({
  isOpen,
  onClose,
  createdUser,
}: ModalCreateSuccessProps) {
  if (!createdUser) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-900">
            Tài khoản nhân viên đã được tạo thành công.
          </DialogTitle>
        </DialogHeader>

        <div className="py-4 space-y-2">
          <p className="text-sm text-gray-700">
            <span className="font-medium">- Username:</span>{" "}
            {createdUser.username}
          </p>
          <p className="text-sm text-gray-700">
            <span className="font-medium">- Mật khẩu mặc định:</span> Nhom333@
          </p>
          <p className="text-sm text-gray-600 mt-4">
            <span className="font-medium">* Lưu ý:</span> Nhân viên cần đổi mật
            khẩu ngay sau khi đăng nhập lần đầu để đảm bảo an toàn.
          </p>
        </div>

        <DialogFooter>
          <Button
            type="button"
            onClick={onClose}
            className="px-6 bg-blue-600 hover:bg-blue-700 text-white"
          >
            Đóng
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
