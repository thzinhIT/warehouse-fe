"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import { Package, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
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
import { useTranslations } from "next-intl";
const dataDescription = [
  {
    title: "10K+",
    description: "Sản phẩm",
  },
  {
    title: "50+",
    description: "Kho hàng",
  },
  {
    title: "24/7",
    description: "Hoạt động",
  },
  {
    title: "99.9%",
    description: "Chính xác",
  },
];

export default function WarehouseLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const tAuth = useTranslations();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Lấy dữ liệu form
    const formData = new FormData(e.target as HTMLFormElement);
    const loginData = {
      email: formData.get("email"),
      password: formData.get("password"),
      remember: formData.get("remember"),
    };
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Login Form */}
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
              <div className="text-center space-y-2">
                <CardTitle className="text-2xl font-bold text-gray-900">
                  {tAuth("login.welcomeBack")}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Đăng nhập vào hệ thống quản lý kho hàng
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-2"
                >
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                      name="email"
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
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" name="remember" />
                    <Label htmlFor="remember" className="text-sm text-gray-600">
                      Ghi nhớ đăng nhập
                    </Label>
                  </div>
                  <a
                    href="/forgot-password"
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Quên mật khẩu?
                  </a>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Đang đăng nhập...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <span>Đăng nhập</span>
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    )}
                  </Button>
                </motion.div>
              </form>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-center"
              >
                <p className="text-sm text-gray-600">
                  Chưa có tài khoản?{" "}
                  <a
                    href="#"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Đăng ký ngay
                  </a>
                </p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Right side - Illustration */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{
            opacity: 1,
            x: 0,
            y: [0, -10, 0], // Animation lên xuống
          }}
          transition={{
            opacity: { duration: 0.6, ease: "easeOut", delay: 0.2 },
            x: { duration: 0.6, ease: "easeOut", delay: 0.2 },
            y: {
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 1,
            },
          }}
          className="hidden lg:block"
        >
          <div className="relative">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-blue-700/20 rounded-3xl transform rotate-3" />

            {/* Main illustration container */}
            <div className="relative bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-12 text-white overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12" />

              <div className="relative z-10 space-y-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
                  className="text-center"
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-6">
                    <Package className="h-10 w-10 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold mb-4">
                    Quản lý kho hàng hiệu quả
                  </h2>
                  <p className="text-blue-100 text-lg leading-relaxed">
                    Hệ thống quản lý kho hàng thông minh, theo dõi xuất nhập kho
                    và quản lý hàng tồn kho một cách chính xác.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="grid grid-cols-2 gap-4 text-center"
                >
                  {dataDescription.map((item, index) => (
                    <div
                      key={`item-${index}`}
                      className="bg-white/10 rounded-xl p-4 transition-transform transform hover:scale-105"
                    >
                      <div className="text-2xl font-bold">{item.title}</div>
                      <div className="text-blue-100 text-sm">
                        {item.description}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
