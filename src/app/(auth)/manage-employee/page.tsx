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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Edit, Lock, Unlock, KeyRound } from "lucide-react";
import {
  useEmployees,
  useSearchEmployees,
  useLockOrUnlockEmployee,
  useResetEmployeePassword,
  useUpdateEmployee,
  useCreateEmployee,
} from "@/hooks/manage-employee/use-employees";
import {
  Employee,
  UserCreateRequest,
} from "@/lib/networking/services/employee.service";
import ModalEditEmployee from "@/components/common/manage-employee/modal-edit-employee";
import ModalConfirmLock from "@/components/common/manage-employee/modal-confirm-lock";
import ModalConfirmResetPassword from "@/components/common/manage-employee/modal-confirm-reset-password";
import ModalCreateEmployee from "@/components/common/manage-employee/modal-create-employee";
import ModalCreateSuccess from "@/components/common/manage-employee/modal-create-success";
import toast from "react-hot-toast";

export default function ManageEmployeePage() {
  const [searchEmployeeCode, setSearchEmployeeCode] = useState("");
  const [searchEmployeeName, setSearchEmployeeName] = useState("");
  const [selectedRole, setSelectedRole] = useState<"admin" | "staff" | "all">(
    "all"
  );
  const [selectedEmployees, setSelectedEmployees] = useState<number[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Modal state for editing employee
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );

  // Modal state for lock confirmation
  const [isLockModalOpen, setIsLockModalOpen] = useState(false);
  const [employeeToLock, setEmployeeToLock] = useState<Employee | null>(null);

  // Modal state for reset password confirmation
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] =
    useState(false);
  const [employeeToResetPassword, setEmployeeToResetPassword] =
    useState<Employee | null>(null);

  // Modal state for create employee
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCreateSuccessModalOpen, setIsCreateSuccessModalOpen] =
    useState(false);
  const [createdEmployee, setCreatedEmployee] = useState<Employee | null>(null);

  // API hooks
  const {
    data: employeesData,
    isLoading,
    isError,
    error,
    refetch,
  } = useEmployees();

  const searchMutation = useSearchEmployees();

  // Mutation hooks
  const lockOrUnlockMutation = useLockOrUnlockEmployee();
  const resetPasswordMutation = useResetEmployeePassword();
  const updateEmployeeMutation = useUpdateEmployee();
  const createEmployeeMutation = useCreateEmployee();

  // Initialize with all employees
  useEffect(() => {
    if (employeesData) {
      // Since backend returns Employee[] directly
      setEmployees(
        Array.isArray(employeesData) ? employeesData : employeesData.data || []
      );
    }
  }, [employeesData]);

  // Determine if we have search criteria
  const hasSearchCriteria = Boolean(
    searchEmployeeCode?.trim() ||
      searchEmployeeName?.trim() ||
      (selectedRole && selectedRole !== "all")
  );

  // Handle search/filter functionality
  const handleSearch = async () => {
    if (!hasSearchCriteria) {
      // If no search criteria, show all employees
      if (employeesData) {
        setEmployees(
          Array.isArray(employeesData)
            ? employeesData
            : employeesData.data || []
        );
      }
      return;
    }

    setIsSearching(true);
    try {
      const result = await searchMutation.mutateAsync({
        userCode: searchEmployeeCode.trim() || undefined,
        fullName: searchEmployeeName.trim() || undefined,
        role: selectedRole !== "all" ? selectedRole : undefined,
      });

      if (result) {
        // Since backend returns Employee[] directly
        setEmployees(Array.isArray(result) ? result : result.data || []);
      }
    } catch (error) {
      console.error("Search error:", error);
      toast.error("Search failed");
    } finally {
      setIsSearching(false);
    }
  };

  // Handle reset filters
  const handleReset = () => {
    setSearchEmployeeCode("");
    setSearchEmployeeName("");
    setSelectedRole("all");
    if (employeesData) {
      setEmployees(
        Array.isArray(employeesData) ? employeesData : employeesData.data || []
      );
    }
  };

  // Handle select all employees
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedEmployees(employees.map((emp) => emp.userId));
    } else {
      setSelectedEmployees([]);
    }
  };

  // Handle select individual employee
  const handleSelectEmployee = (employeeId: number, checked: boolean) => {
    if (checked) {
      setSelectedEmployees([...selectedEmployees, employeeId]);
    } else {
      setSelectedEmployees(selectedEmployees.filter((id) => id !== employeeId));
    }
  };

  // Handle add employee
  const handleAddEmployee = () => {
    setIsCreateModalOpen(true);
  };

  // Handle create employee confirmation
  const handleCreateEmployee = async (data: UserCreateRequest) => {
    try {
      const response = await createEmployeeMutation.mutateAsync(data);

      // Store created employee data for success modal
      setCreatedEmployee(response.data);

      // Close create modal and show success modal
      setIsCreateModalOpen(false);
      setIsCreateSuccessModalOpen(true);

      toast.success("Tạo nhân viên thành công!");

      // Refresh data
      if (isSearching || hasSearchCriteria) {
        handleSearch();
      } else {
        refetch();
      }
    } catch (error: unknown) {
      console.error("Create employee error:", error);
      toast.error("Có lỗi khi tạo nhân viên!");
    }
  };

  // Handle bulk action
  const handleBulkAction = () => {
    toast.success(`Export ${selectedEmployees.length} employees`);
  };

  // Handle edit employee
  const handleEditEmployee = (employeeId: number) => {
    const employee = employees.find((emp) => emp.userId === employeeId);
    if (employee) {
      setSelectedEmployee(employee);
      setIsEditModalOpen(true);
    } else {
      toast.error("Không tìm thấy nhân viên!");
    }
  };

  // Handle close edit modal
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedEmployee(null);
  };

  // Handle edit success
  const handleEditSuccess = () => {
    // Refresh data after successful edit
    if (isSearching || hasSearchCriteria) {
      // If we're in search mode, re-search to get updated data
      handleSearch();
    } else {
      // If we're showing all data, refetch
      refetch();
    }
  };

  // Handle toggle lock employee - show confirmation modal first
  const handleToggleLock = (employee: Employee) => {
    setEmployeeToLock(employee);
    setIsLockModalOpen(true);
  };

  // Handle confirmed lock/unlock action
  const handleConfirmLock = async () => {
    if (!employeeToLock) return;

    try {
      const newActiveStatus = !employeeToLock.isActive;

      await lockOrUnlockMutation.mutateAsync({
        userId: employeeToLock.userId,
        isActive: newActiveStatus,
      });

      const action = newActiveStatus ? "mở khóa" : "khóa";
      toast.success(
        `${
          action.charAt(0).toUpperCase() + action.slice(1)
        } tài khoản thành công!`
      );

      setIsLockModalOpen(false);
      setEmployeeToLock(null);

      // Refresh data
      if (isSearching || hasSearchCriteria) {
        // If we're in search mode, re-search to get updated data
        handleSearch();
      } else {
        // If we're showing all data, refetch
        refetch();
      }
    } catch (error: unknown) {
      console.error("Lock/unlock error:", error);
      toast.error("Có lỗi khi thay đổi trạng thái tài khoản!");
    }
  };

  // Handle reset password - show confirmation modal first
  const handleResetPassword = (employee: Employee) => {
    setEmployeeToResetPassword(employee);
    setIsResetPasswordModalOpen(true);
  };

  // Handle confirmed reset password action
  const handleConfirmResetPassword = async () => {
    if (!employeeToResetPassword) return;

    try {
      await resetPasswordMutation.mutateAsync(employeeToResetPassword.userId);
      toast.success(
        "Đặt lại mật khẩu thành công! (Mật khẩu mặc định: Nhom333@)"
      );

      setIsResetPasswordModalOpen(false);
      setEmployeeToResetPassword(null);

      // Refresh data
      if (isSearching || hasSearchCriteria) {
        // If we're in search mode, re-search to get updated data
        handleSearch();
      } else {
        // If we're showing all data, refetch
        refetch();
      }
    } catch (error: unknown) {
      console.error("Reset password error:", error);
      toast.error("Có lỗi khi đặt lại mật khẩu!");
    }
  };

  return (
    <div className="min-h-screen p-6 space-y-6 overflow-y-auto">
      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-semibold">Quản lý nhân viên</h1>
      </div>

      {/* Search/Filter Section */}
      <div className="bg-gray-50 p-4 rounded-lg space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Employee Code Search */}
          <div className="space-y-2">
            <Label htmlFor="employee-code">Mã Nhân Viên</Label>
            <Input
              id="employee-code"
              placeholder="Input text"
              value={searchEmployeeCode}
              onChange={(e) => setSearchEmployeeCode(e.target.value)}
            />
          </div>

          {/* Employee Name Search */}
          <div className="space-y-2">
            <Label htmlFor="employee-name">Tên nhân viên</Label>
            <Input
              id="employee-name"
              placeholder="Input text"
              value={searchEmployeeName}
              onChange={(e) => setSearchEmployeeName(e.target.value)}
            />
          </div>

          {/* Role Filter */}
          <div className="space-y-2">
            <Label htmlFor="role">Vai trò</Label>
            <Select
              value={selectedRole}
              onValueChange={(value) =>
                setSelectedRole(value as "admin" | "staff" | "all")
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Tất cả vai trò" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="staff">Staff</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button onClick={handleSearch}>Tìm kiếm</Button>
          <Button variant="outline" onClick={handleReset}>
            Làm mới
          </Button>
        </div>
      </div>

      {/* Table Actions */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Button onClick={handleAddEmployee}>Thêm nhân viên</Button>
          <Button
            variant="outline"
            onClick={handleBulkAction}
            disabled={selectedEmployees.length === 0}
          >
            Xuất danh sách
          </Button>
        </div>
      </div>

      {/* Employees Table */}
      <div className="border rounded-lg overflow-x-auto">
        <Table className="table-auto w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-12 border-r">
                <Checkbox
                  checked={
                    employees.length > 0 &&
                    selectedEmployees.length === employees.length
                  }
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead className="border-r w-16 text-center">STT</TableHead>
              <TableHead className="border-r w-24">Mã Nhân Viên</TableHead>
              <TableHead className="border-r w-40">Tên nhân viên</TableHead>
              <TableHead className="border-r w-52">Email</TableHead>
              <TableHead className="border-r w-24">Username</TableHead>
              <TableHead className="border-r w-20">Vai trò</TableHead>
              <TableHead className="border-r w-24">Ngày tạo</TableHead>
              <TableHead className="border-r w-20 text-center">
                Trạng thái
              </TableHead>
              <TableHead className="border-r w-16 text-center">Sửa</TableHead>
              <TableHead className="border-r w-16 text-center">Khóa</TableHead>
              <TableHead className="w-16 text-center">Reset</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading || isSearching ? (
              <TableRow>
                <TableCell colSpan={11} className="text-center py-8">
                  <div className="flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2" />
                    {isSearching ? "Đang tìm kiếm..." : "Đang tải dữ liệu..."}
                  </div>
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell
                  colSpan={11}
                  className="text-center py-8 text-red-500"
                >
                  Có lỗi khi {isSearching ? "tìm kiếm" : "tải"} dữ liệu:{" "}
                  {error?.message || "Unknown error"}
                  <Button
                    variant="outline"
                    size="sm"
                    className="ml-2"
                    onClick={() => refetch()}
                  >
                    Thử lại
                  </Button>
                </TableCell>
              </TableRow>
            ) : employees.length > 0 ? (
              employees.map((employee, index) => (
                <TableRow key={`employee-${employee.userCode}-${index}`}>
                  <TableCell className="border-r">
                    <Checkbox
                      checked={selectedEmployees.includes(employee.userId)}
                      onCheckedChange={(checked) =>
                        handleSelectEmployee(
                          employee.userId,
                          checked as boolean
                        )
                      }
                    />
                  </TableCell>
                  <TableCell className="border-r text-center">
                    {index + 1}
                  </TableCell>
                  <TableCell className="border-r text-sm">
                    {employee.userCode}
                  </TableCell>
                  <TableCell className="border-r text-sm">
                    {employee.fullName}
                  </TableCell>
                  <TableCell className="border-r text-sm">
                    {employee.email}
                  </TableCell>
                  <TableCell className="border-r text-sm">
                    {employee.username}
                  </TableCell>
                  <TableCell className="border-r text-sm">
                    {employee.role}
                  </TableCell>
                  <TableCell className="border-r text-sm">
                    {employee.createdAt}
                  </TableCell>
                  <TableCell className="border-r text-center">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        employee.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {employee.isActive ? "Hoạt động" : "Khóa"}
                    </span>
                  </TableCell>
                  <TableCell className="border-r text-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-black h-8 w-8 p-0"
                      onClick={() => handleEditEmployee(employee.userId)}
                      disabled={updateEmployeeMutation.isPending}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TableCell>
                  <TableCell className="border-r text-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`h-8 w-8 p-0 ${
                        employee.isActive
                          ? "text-green-600 hover:text-green-700"
                          : "text-red-600 hover:text-red-700"
                      }`}
                      onClick={() => handleToggleLock(employee)}
                      disabled={lockOrUnlockMutation.isPending}
                      title={
                        employee.isActive
                          ? "Khóa tài khoản"
                          : "Mở khóa tài khoản"
                      }
                    >
                      {employee.isActive ? (
                        <Unlock className="h-4 w-4" />
                      ) : (
                        <Lock className="h-4 w-4" />
                      )}
                    </Button>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-black h-8 w-8 p-0"
                      onClick={() => handleResetPassword(employee)}
                      disabled={resetPasswordMutation.isPending}
                    >
                      <KeyRound className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={11}
                  className="text-center py-8 text-gray-500"
                >
                  Không có nhân viên nào được tìm thấy
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Table Footer */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Hiển thị {employees.length} nhân viên
          {isSearching && hasSearchCriteria && (
            <span className="text-blue-600 ml-2">- Kết quả tìm kiếm</span>
          )}
        </div>
      </div>

      {/* Edit Employee Modal */}
      <ModalEditEmployee
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        employee={selectedEmployee}
        onSuccess={handleEditSuccess}
      />

      {/* Lock Confirmation Modal */}
      <ModalConfirmLock
        isOpen={isLockModalOpen}
        onClose={() => {
          setIsLockModalOpen(false);
          setEmployeeToLock(null);
        }}
        employee={employeeToLock}
        onConfirm={handleConfirmLock}
        isLoading={lockOrUnlockMutation.isPending}
      />

      {/* Reset Password Confirmation Modal */}
      <ModalConfirmResetPassword
        isOpen={isResetPasswordModalOpen}
        onClose={() => {
          setIsResetPasswordModalOpen(false);
          setEmployeeToResetPassword(null);
        }}
        employee={employeeToResetPassword}
        onConfirm={handleConfirmResetPassword}
        isLoading={resetPasswordMutation.isPending}
      />

      {/* Create Employee Modal */}
      <ModalCreateEmployee
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onConfirm={handleCreateEmployee}
        isLoading={createEmployeeMutation.isPending}
      />

      {/* Create Success Modal */}
      <ModalCreateSuccess
        isOpen={isCreateSuccessModalOpen}
        onClose={() => {
          setIsCreateSuccessModalOpen(false);
          setCreatedEmployee(null);
        }}
        createdUser={createdEmployee}
      />
    </div>
  );
}
