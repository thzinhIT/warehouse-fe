"use client";

import { motion } from "framer-motion";
import { Package } from "lucide-react";

interface Stat {
  number: string;
  label: string;
}

interface WarehouseRightPanelProps {
  title: string;
  description: string;
  stats: Stat[];
  promotion?: {
    title: string;
    description: string;
  };
}

export default function RightPanel({
  title,
  description,
  stats,
  promotion,
}: Readonly<WarehouseRightPanelProps>) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{
        opacity: 1,
        x: 0,
        y: [0, -10, 0],
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
        <div className="relative bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-6 text-white overflow-hidden">
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
              <h2 className="text-3xl font-bold mb-4">{title}</h2>
              <p className="text-blue-100 text-lg leading-relaxed">
                {description}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="grid grid-cols-2 gap-4 text-center"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/10 rounded-xl p-4 cursor-pointer"
                >
                  <div className="text-2xl font-bold">{stat.number}</div>
                  <div className="text-blue-100 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {promotion && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white/10 rounded-xl p-6 text-center cursor-pointer"
              >
                <motion.h3
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                  className="font-semibold mb-2"
                >
                  {promotion?.title}
                </motion.h3>
                <p className="text-blue-100 text-sm">
                  {promotion?.description}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
