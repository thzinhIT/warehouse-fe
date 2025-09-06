"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { format } from "date-fns";
import { TDataImportChart } from "@/lib/networking/client/dashboard/service";
import EmptyDataChart from "./empty-data-chart";

export const description = "A simple area chart";

const chartConfig = {
  totalItems: {
    label: "Số lượng :",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function ChartAreaImport({
  data,
  isPending,
}: {
  readonly data: TDataImportChart[];
  readonly isPending: boolean;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex gap-2 ">
          <span className="w-1  bg-blue-500 rounded-b-md  rounded-t-md"></span>{" "}
          <span> Tổng quang nhập kho</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {data && !!data?.length ? (
          <ChartContainer
            config={chartConfig}
            className="max-h-[150px] min-h-[150px] w-full"
          >
            <AreaChart
              accessibilityLayer
              data={data}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="importDate"
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
                    indicator="line"
                    labelFormatter={(value) => format(value, "dd/MM/yyyy")}
                  />
                }
              />
              <Area
                dataKey="totalItems"
                type="natural"
                fill="var(--color-totalItems)"
                fillOpacity={0.4}
                stroke="var(--color-totalItems)"
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
