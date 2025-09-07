"use client";
import { useEffect, useState } from "react";

type ProgressBarProps = {
  value: number;
};

export default function ProgressBar({ value }: ProgressBarProps) {
  const [width, setWidth] = useState("0%");
  if (value < 1 && value > 0) value = 1;
  useEffect(() => {
    const percent = Math.min(Math.max(value, 0), 100);
    setTimeout(() => {
      setWidth(`${percent}%`);
    }, 100);
  }, [value]);

  const percentText = `${Math.round(value)}%`;

  return (
    <div className=" h-9 bg-gray-200 rounded-md overflow-hidden border border-gray-300 w-full shadow-xs">
      <div
        className="h-full bg-indigo-600 transition-all duration-1000 ease-out flex items-center justify-center text-white text-sm font-semibold"
        style={{ width }}
      >
        {percentText}
      </div>
    </div>
  );
}
