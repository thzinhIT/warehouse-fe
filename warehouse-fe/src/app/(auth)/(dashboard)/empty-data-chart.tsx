"use client";

import React from "react";
import { CardContent } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

const EmptyDataChart = () => {
  return (
    <CardContent className="flex flex-1 items-center justify-center pb-0">
      <div className="flex flex-col items-center gap-2 text-center">
        <BarChart3 className="h-8 w-8 text-muted-foreground" />
        <div className="text-sm text-muted-foreground">
          No data available
        </div>
      </div>
    </CardContent>
  );
};

export default EmptyDataChart;
