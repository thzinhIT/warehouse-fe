"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import EmptyDataChart from "./empty-data-chart";
import { TDataChartStorage } from "@/lib/networking/client/dashboard/service";
import { LoadingNormal } from "@/components/common/loading-page";

export const description = "A stacked bar chart with a legend";
const chartConfig = {
  usedCapacity: {
    label: "used",
    color: "var(--chart-1)",
  },
  remaining: {
    label: "remaining",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function ChartBarMultiple({
  data,
  isPending,
}: {
  readonly data: TDataChartStorage[];
  readonly isPending: boolean;
}) {
  const newData = data?.map((item) => ({
    ...item,
    remaining: item.totalCapacity - item.usedCapacity,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lưu trữ & tồn kho</CardTitle>
      </CardHeader>
      <CardContent>
        {isPending && (
          <div className="max-h-[250px] min-h-[250px]">
            <LoadingNormal />
          </div>
        )}

        {data && !!data?.length && !isPending ? (
          <ChartContainer
            config={chartConfig}
            className=" mx-auto  w-full max-h-[250px] min-h-[250px]"
          >
            <BarChart accessibilityLayer data={newData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="shelfName"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 4)}
              />
              <YAxis domain={[0, "auto"]} />
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar
                dataKey="usedCapacity"
                stackId="a"
                fill="var(--color-usedCapacity)"
                radius={[0, 0, 4, 4]}
              />
              <Bar
                dataKey="remaining"
                stackId="a"
                fill="var(--color-remaining)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        ) : (
          <EmptyDataChart size={250} />
        )}
      </CardContent>
    </Card>
  );
}
