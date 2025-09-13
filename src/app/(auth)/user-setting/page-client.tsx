"use client";
import { AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useLogin } from "@/hooks/Auth/use-auth";
import useUserInfor from "@/hooks/user/use-user-infor";
import { TBodyParams } from "@/lib/networking/client/user/service";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { formatDate } from "date-fns";
import { Eye, EyeOff, Lock, Save, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const SettingUserClient = () => {
  const { userInfo, isPendingUser } = useLogin();

  const {
    updateProfileFn,
    updateProfilePending,
    updatePass,
    updatePassPending,
  } = useUserInfor();

  const ref = useRef({
    email: "",
    fullName: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSaveProfile = () => {
    const body: TBodyParams = {
      userId: userInfo!.userId,
      email: (ref.current.email || userInfo?.email) ?? "test@gmail.com",
      fullName: ref.current.fullName,
    };
    updateProfileFn({ body });
  };

  const handlePasswordChange = (
    field: keyof typeof passwordData,
    value: string
  ) => {
    setPasswordData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Mật khẩu mới và xác nhận mật khẩu không khớp");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error("Mật khẩu mới phải có ít nhất 6 ký tự");
      return;
    }

    updatePass({
      newPassword: passwordData.newPassword,
      oldPassword: passwordData.currentPassword,
    });

    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  useEffect(() => {
    if (typeof window !== "undefined" && userInfo) {
      console.log("Setting userInfo in localStorage:", userInfo);
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    }
  }, [userInfo]);

  return (
    <div className="w-full mx-auto p-2 space-y-8 overflow-auto">
      <div className="text-center space-y-2">
        <p className="text-muted-foreground font-semibold text-xl">
          Quản lý thông tin cá nhân và bảo mật tài khoản của bạn
        </p>
      </div>

      <div className="bg-card rounded-lg  p-3 space-y-8">
        <div className="flex flex-col items-center space-y-2">
          <div className="relative">
            <Avatar className="w-10 h-10  border-4 border-background shadow-lg">
              <AvatarImage
                src={"/logo-warehouse.jpg"}
                alt="Avatar"
                className="rounded-full w-40 h-40"
              />
              <AvatarFallback className="text-2xl font-semibold">
                CN
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground ">
              JPG, PNG hoặc GIF. Tối đa 5MB.
            </p>
          </div>
        </div>

        <Separator />

        {isPendingUser ? (
          <div className="space-y-6">
            <Skeleton className="h-6 w-40" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-4 w-36" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
            </div>

            <div className="flex justify-end">
              <Skeleton className="h-10 w-32 rounded-md" />
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div>
                <User size={27} />
              </div>
              <h2 className="text-xl font-semibold">Thông tin cá nhân</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="userId">ID người dùng</Label>
                <Input
                  id="userId"
                  value={userInfo?.userCode ?? "--"}
                  disabled
                  className="bg-muted cursor-not-allowed"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="username">Tên đăng nhập</Label>
                <Input
                  id="username"
                  value={userInfo?.username ?? "--"}
                  disabled
                  className="bg-muted cursor-not-allowed"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={userInfo?.email ?? "test@gamail.com"}
                  onChange={(e) => {
                    ref.current.email = e.target.value;
                  }}
                  placeholder="Nhập địa chỉ email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fullName">Họ và tên</Label>
                <Input
                  id="fullName"
                  defaultValue={userInfo?.fullName ?? "--"}
                  onChange={(e) => {
                    ref.current.fullName = e.target.value;
                  }}
                  placeholder="Nhập họ và tên đầy đủ"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Vai trò</Label>
                <Input
                  id="role"
                  value={userInfo?.role ?? "--"}
                  disabled
                  className="bg-muted cursor-not-allowed"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="createdAt">Ngày tạo tài khoản</Label>
                <Input
                  id="createdAt"
                  value={
                    userInfo?.createdAt
                      ? formatDate(userInfo.createdAt, "dd/MM/yyyy")
                      : "--"
                  }
                  disabled
                  className="bg-muted cursor-not-allowed"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                onClick={handleSaveProfile}
                disabled={updateProfilePending}
                className="gap-2 px-8"
              >
                <Save className="w-4 h-4" />
                {updateProfilePending ? "Đang cập nhâtj..." : "Cập nhật"}
              </Button>
            </div>
          </div>
        )}

        <Separator />

        <div className="space-y-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Đổi mật khẩu
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Mật khẩu hiện tại</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  value={passwordData.currentPassword}
                  type={showPasswords.current ? "text" : "password"}
                  onChange={(e) =>
                    handlePasswordChange("currentPassword", e.target.value)
                  }
                  placeholder="Nhập mật khẩu hiện tại..."
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() =>
                    setShowPasswords((prev) => ({
                      ...prev,
                      current: !prev.current,
                    }))
                  }
                >
                  {showPasswords.current ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">Mật khẩu mới</Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showPasswords.new ? "text" : "password"}
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    handlePasswordChange("newPassword", e.target.value)
                  }
                  placeholder="Nhập mật khẩu mới..."
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() =>
                    setShowPasswords((prev) => ({ ...prev, new: !prev.new }))
                  }
                >
                  {showPasswords.new ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showPasswords.confirm ? "text" : "password"}
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    handlePasswordChange("confirmPassword", e.target.value)
                  }
                  placeholder="Nhập lại mật khẩu mới..."
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() =>
                    setShowPasswords((prev) => ({
                      ...prev,
                      confirm: !prev.confirm,
                    }))
                  }
                >
                  {showPasswords.confirm ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              onClick={handleChangePassword}
              disabled={
                updatePassPending ||
                !passwordData.currentPassword ||
                !passwordData.newPassword ||
                !passwordData.confirmPassword
              }
              className="gap-2 px-8"
            >
              <Lock className="w-4 h-4" />
              {updatePassPending ? "Đang cập nhật..." : "Đổi mật khẩu"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingUserClient;
