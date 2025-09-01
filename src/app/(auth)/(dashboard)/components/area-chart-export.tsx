"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { format } from "date-fns";
import { TDataExportChart } from "@/lib/networking/client/dashboard/service";
import EmptyDataChart from "./empty-data-chart";

export const description = "An interactive area chart";

const chartConfig = {
  manualQuantity: {
    label: "Bán lẻ",
    color: "var(--chart-2)",
  },
  haravanQuantity: {
    label: " Điện tử ",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export function ChartAreaExport({
  data,
}: {
  readonly data: TDataExportChart[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex gap-2 ">
          <span className="w-1  bg-green-500 rounded-b-md  rounded-t-md"></span>{" "}
          <span> Tổng quang xuất kho</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {1 > 2 ? (
          <ChartContainer
            config={chartConfig}
            className="max-h-[150px] min-h-[150px] w-full "
          >
            <AreaChart data={data}>
              <defs>
                <linearGradient
                  id="fillmanualQuantity"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="var(--color-manualQuantity)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-manualQuantity)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient
                  id="fillharavanQuantity"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="var(--color-haravanQuantity)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-haravanQuantity)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                hide
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    indicator="dot"
                    labelFormatter={(value) => format(value, "dd/MM/yyy")}
                  />
                }
              />
              <Area
                dataKey="haravanQuantity"
                type="natural"
                fill="url(#fillharavanQuantity)"
                stroke="var(--color-haravanQuantity)"
                stackId="a"
              />
              <Area
                dataKey="manualQuantity"
                type="natural"
                fill="url(#fillmanualQuantity)"
                stroke="var(--color-manualQuantity)"
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        ) : (
          <EmptyDataChart size={150} />
        )}
      </CardContent>
    </Card>
  );
}
