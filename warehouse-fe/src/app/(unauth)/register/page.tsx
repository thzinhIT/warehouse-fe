"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Package,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  User,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import RightPanel from "../components/right-panel";
const stats = [
  { number: "5K+", label: "Nhân viên" },
  { number: "99%", label: "Hài lòng" },
  { number: "2 phút", label: "Đăng ký" },
  { number: "Miễn phí", label: "Tạo tài khoản" },
];
const promotion = {
  title: "🎯 Ưu đãi nhân viên mới",
  description: "Khóa đào tạo miễn phí và hỗ trợ 24/7 trong tháng đầu làm việc.",
};
export default function WarehouseRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Console log khi đăng ký
    console.log("🏭 Đăng ký tài khoản kho hàng được submit!");

    // Lấy dữ liệu form
    const formData = new FormData(e.target as HTMLFormElement);
    const registerData = {
      username: formData.get("username"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
      terms: formData.get("terms"),
    };

    console.log("📝 Warehouse Register Data:", registerData);

    // Simulate register process
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    console.log("✅ Đăng ký tài khoản kho hàng thành công!");
  };

  return (
    <div className=" bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4  ">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center ">
        {/* Left side - Register Form */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md mx-auto   "
        >
          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm overflow-y-auto   ">
            <CardHeader className="space-y-4 pb-8">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="flex items-center justify-center"
              >
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-3 rounded-full">
                  <Package className="h-8 w-8 text-white" />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center space-y-2"
              >
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Tạo tài khoản mới
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Đăng ký để truy cập hệ thống quản lý kho hàng
                </CardDescription>
              </motion.div>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Username */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-2"
                >
                  <Label
                    htmlFor="username"
                    className="text-sm font-medium text-gray-700"
                  >
                    Tên người dùng
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="username"
                      type="text"
                      placeholder="warehouse_staff01"
                      className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                      name="username"
                    />
                  </div>
                </motion.div>

                {/* Email */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-2"
                >
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email công ty
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="staff@warehouse.com"
                      className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                      name="email"
                    />
                  </div>
                </motion.div>

                {/* Số điện thoại */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 }}
                  className="space-y-2"
                >
                  <Label
                    htmlFor="phone"
                    className="text-sm font-medium text-gray-700"
                  >
                    Số điện thoại
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="0123456789"
                      className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                      name="phone"
                    />
                  </div>
                </motion.div>

                {/* Mật khẩu */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="space-y-2"
                >
                  <Label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-700"
                  >
                    Mật khẩu
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10 pr-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                      name="password"
                    />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </motion.button>
                  </div>
                </motion.div>

                {/* Xác nhận mật khẩu */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.65 }}
                  className="space-y-2"
                >
                  <Label
                    htmlFor="confirmPassword"
                    className="text-sm font-medium text-gray-700"
                  >
                    Xác nhận mật khẩu
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10 pr-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                      name="confirmPassword"
                    />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </motion.button>
                  </div>
                </motion.div>

                {/* Điều khoản */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 }}
                  className="flex items-start space-x-2"
                >
                  <Checkbox id="terms" name="terms" className="mt-1" />
                  <Label
                    htmlFor="terms"
                    className="text-sm text-gray-600 leading-relaxed flex "
                  >
                    <div></div>
                    <div>
                      Tôi đồng ý với{" "}
                      <span className="text-blue-600 hover:text-blue-700 font-medium">
                        Điều khoản sử dụng
                      </span>{" "}
                      và{" "}
                      <span className="text-blue-600 hover:text-blue-700 font-medium">
                        Chính sách bảo mật
                      </span>{" "}
                      của hệ thống kho hàng
                    </div>
                  </Label>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.75 }}
                >
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Đang tạo tài khoản...</span>
                      </div>
                    ) : (
                      <motion.div
                        whileHover={{ x: 5 }}
                        className="flex items-center space-x-2"
                      >
                        <span>Tạo tài khoản</span>
                        <ArrowRight className="h-4 w-4" />
                      </motion.div>
                    )}
                  </Button>
                </motion.div>
              </form>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-center"
              >
                <p className="text-sm text-gray-600">
                  Đã có tài khoản?{" "}
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Đăng nhập ngay
                  </a>
                </p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
        {/* Right side - Illustration với animation floating */}
        <RightPanel
          title="Tham gia đội ngũ quản lý kho"
          description="Hàng nghìn nhân viên đã tin tưởng sử dụng hệ thống quản lý kho hàng hiện đại của chúng tôi. Bạn sẽ là người tiếp theo?"
          stats={stats}
          promotion={promotion}
        />
      </div>
    </div>
  );
}
