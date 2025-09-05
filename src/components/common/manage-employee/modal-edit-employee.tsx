"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Employee } from "@/lib/networking/services/employee.service";
import {
  useUpdateEmployee,
  useGetEmployee,
} from "@/hooks/manage-employee/use-employees";
import toast from "react-hot-toast";

interface ModalEditEmployeeProps {
  isOpen: boolean;
  onClose: () => void;
  employee: Employee | null;
  onSuccess?: () => void;
}

export default function ModalEditEmployee({
  isOpen,
  onClose,
  employee,
  onSuccess,
}: ModalEditEmployeeProps) {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    fullName: "",
    role: "staff" as "admin" | "staff",
  });

  // Fetch fresh user data when modal opens
  const { data: freshUserData, isLoading: isLoadingUser } = useGetEmployee(
    employee?.userId || 0,
    isOpen && !!employee?.userId
  );

  const updateEmployeeMutation = useUpdateEmployee();

  // Use fresh data from API if available, otherwise fall back to prop data
  const currentEmployee = freshUserData?.data || employee;

  // Update form data when employee data changes
  useEffect(() => {
    if (currentEmployee) {
      setFormData({
        email: currentEmployee.email || "",
        username: currentEmployee.username || "",
        fullName: currentEmployee.fullName || "",
        role: currentEmployee.role || "staff",
      });
    } else {
      setFormData({
        email: "",
        username: "",
        fullName: "",
        role: "staff",
      });
    }
  }, [currentEmployee]);

  // Handle form submission
  const handleSubmit = async () => {
    if (!currentEmployee) return;

    try {
      await updateEmployeeMutation.mutateAsync({
        userId: currentEmployee.userId,
        employee: {
          email: formData.email,
          username: formData.username,
          fullName: formData.fullName,
          role: formData.role,
        },
      });

      toast.success("Cập nhật thông tin nhân viên thành công!");
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error("Update employee error:", error);
      toast.error("Có lỗi khi cập nhật thông tin nhân viên!");
    }
  };

  // Handle input changes
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle cancel
  const handleCancel = () => {
    if (currentEmployee) {
      setFormData({
        email: currentEmployee.email || "",
        username: currentEmployee.username || "",
        fullName: currentEmployee.fullName || "",
        role: currentEmployee.role || "staff",
      });
    }
    onClose();
  };

  if (!employee) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-900">
            Chỉnh sửa thông tin nhân viên
          </DialogTitle>
        </DialogHeader>

        {isLoadingUser ? (
          <div className="flex justify-center py-8">
            <div className="text-sm text-gray-500">Đang tải thông tin...</div>
          </div>
        ) : (
          <div className="grid gap-3 py-3">
            {/* Employee Code - Read Only */}
            <div className="space-y-1">
              <Label htmlFor="userCode" className="text-sm font-medium">
                Mã nhân viên
              </Label>
              <Input
                id="userCode"
                value={currentEmployee?.userCode || ""}
                readOnly
                className="bg-gray-50 text-gray-500 cursor-not-allowed"
              />
            </div>

            {/* Employee Name - Now Editable */}
            <div className="space-y-1">
              <Label htmlFor="fullName" className="text-sm font-medium">
                Tên nhân viên
              </Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                placeholder="Nhập tên nhân viên"
              />
            </div>

            {/* Email - Editable */}
            <div className="space-y-1">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Nhập email"
              />
            </div>

            {/* Username - Editable */}
            <div className="space-y-1">
              <Label htmlFor="username" className="text-sm font-medium">
                User name
              </Label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
                placeholder="Nhập username"
              />
            </div>

            {/* Role - Dropdown */}
            <div className="space-y-1">
              <Label htmlFor="role" className="text-sm font-medium">
                Vai trò
              </Label>
              <Select
                value={formData.role}
                onValueChange={(value: "admin" | "staff") =>
                  handleInputChange("role", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn vai trò" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="staff">Staff</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Created Date - Read Only */}
            <div className="space-y-1">
              <Label htmlFor="createdAt" className="text-sm font-medium">
                Ngày tạo
              </Label>
              <Input
                id="createdAt"
                value={currentEmployee?.createdAt || ""}
                readOnly
                className="bg-gray-50 text-gray-500 cursor-not-allowed"
              />
            </div>
          </div>
        )}

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            disabled={updateEmployeeMutation.isPending || isLoadingUser}
          >
            Hủy
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={updateEmployeeMutation.isPending || isLoadingUser}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {updateEmployeeMutation.isPending ? "Đang lưu..." : "Xác nhận"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
