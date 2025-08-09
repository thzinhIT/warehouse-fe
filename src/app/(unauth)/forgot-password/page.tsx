"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Package,
  Mail,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Clock,
  CodeSquare,
  Lock,
  EyeOff,
  Eye,
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
import RightPanel from "../components/right-panel";
import { useForgotPassword } from "@/hooks/Auth/use-auth";

const mockStats = [
  { number: "256-bit", label: "Mã hóa SSL" },
  { number: "2FA", label: "Xác thực 2 lớp" },
  { number: "24/7", label: "Giám sát" },
  { number: "99.9%", label: "Uptime" },
];

const promotion = {
  title: "🔐 Bảo mật tuyệt đối",
  description:
    "Mọi thông tin được mã hóa và bảo vệ theo tiêu chuẩn quốc tế ISO 27001",
};

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    sendCodeEmail,
    isPending,
    step,
    setStep,
    isPendingNewPass,
    newPassword,
  } = useForgotPassword();

  const handleSubmitCodeEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    sendCodeEmail({ email });
  };

  const handleSubmitResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    newPassword({
      email,
      newPassword: formData.get("password")?.toString(),
      code,
    });
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md mx-auto"
        >
          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="space-y-4 pb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="flex items-center justify-center"
              >
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-3 rounded-full">
                  <Package className="h-8 w-8 text-white" />
                </div>
              </motion.div>
              {step === "email" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-center space-y-2"
                >
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    Quên mật khẩu?
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Nhập email của bạn để nhận liên kết đặt lại mật khẩu
                  </CardDescription>
                </motion.div>
              )}

              {/* Step 2: Email Sent */}
              {step === "sent" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-center space-y-2"
                >
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    Kiểm tra email
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Chúng tôi đã gửi liên kết đặt lại mật khẩu đến email của bạn
                  </CardDescription>
                </motion.div>
              )}
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Email Form */}
              {step === "email" && (
                <form onSubmit={handleSubmitCodeEmail} className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-2"
                  >
                    <Label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-700"
                    >
                      Email đăng nhập
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@warehouse.com"
                        className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-4"
                  >
                    <Button
                      type="submit"
                      disabled={isPending || !email.trim()}
                      className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      {isPending ? (
                        <div className="flex items-center space-x-2">
                          <div className=" w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin pointer-events-none hover:cursor-not-allowed" />
                          <span>Đang gửi...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2 hover:cursor-pointer">
                          <span>Gửi liên kết reset</span>
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      )}
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      className="w-full h-12 border-gray-200 hover:bg-gray-50 bg-transparent"
                      onClick={() => (window.location.href = "/login")}
                    >
                      <div className="flex items-center space-x-2">
                        <ArrowLeft className="h-4 w-4" />
                        <span>Quay lại đăng nhập</span>
                      </div>
                    </Button>
                  </motion.div>
                </form>
              )}

              {/* Email Sent Confirmation */}
              {step === "sent" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-6"
                >
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <div className="bg-green-100 p-2 rounded-full">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-green-800">
                          Email đã được gửi!
                        </h4>
                        <p className="text-sm text-green-600 mt-1">
                          Kiểm tra hộp thư của bạn tại: <strong>{email}</strong>
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div className="text-sm text-blue-700">
                        <p className="font-medium mb-1">Lưu ý quan trọng:</p>
                        <ul className="space-y-1 text-xs">
                          <li>• Code sẽ hết hạn sau 5 phút</li>
                          <li>• Kiểm tra cả thư mục spam/junk</li>
                          <li>• Chỉ sử dụng code mới nhất nếu gửi nhiều lần</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button
                      type="button"
                      variant="outline"
                      className=" text-background w-full h-12 border-gray-200 hover:bg-gray-50 hover:cursor-pointer  bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 "
                      onClick={() => setStep("reset-password")}
                    >
                      <div className="flex items-center space-x-2">
                        <span>Đổi mật khẩu mới</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Reset password */}
              {step === "new-password" && (
                <form
                  onSubmit={handleSubmitResetPassword}
                  className="space-y-4"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-2"
                  >
                    <Label
                      htmlFor="code"
                      className="text-sm font-medium text-gray-700"
                    >
                      Code nhận trong email
                    </Label>
                    <div className="relative">
                      <CodeSquare className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="code"
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={code}
                        onChange={(e) => {
                          const numbersOnly = e.target.value.replace(
                            /[^0-9]/g,
                            ""
                          );
                          setCode(numbersOnly);
                        }}
                        placeholder="012345"
                        className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
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
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-4"
                  >
                    <Button
                      type="submit"
                      disabled={isPendingNewPass}
                      className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      {isPendingNewPass ? (
                        <div className="flex items-center space-x-2">
                          <div className=" w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin cursor-not-allowed" />
                          <span>Loading...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2 ">
                          <span>Tạo mật khẩu mới</span>
                        </div>
                      )}
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      className="w-full h-12 border-gray-200 hover:bg-gray-50 bg-transparent"
                      onClick={() => (window.location.href = "/login")}
                    >
                      <div className="flex items-center space-x-2">
                        <ArrowLeft className="h-4 w-4" />
                        <span>Quay lại đăng nhập</span>
                      </div>
                    </Button>
                  </motion.div>
                </form>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Right side - Illustration với animation floating */}
        <RightPanel
          title="Bảo mật là ưu tiên hàng đầu"
          description="Hệ thống bảo mật nhiều lớp đảm bảo thông tin tài khoản và dữ liệu kho hàng của bạn luôn được bảo vệ tối đa."
          stats={mockStats}
          promotion={promotion}
        />
      </div>
    </div>
  );
}
