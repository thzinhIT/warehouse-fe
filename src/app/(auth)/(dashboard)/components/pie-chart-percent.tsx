"use client";

import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import EmptyDataChart from "./empty-data-chart";
import { TDonutChartData } from "@/lib/networking/client/dashboard/service";

export const description = "A donut chart";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  used: {
    label: "used",
    color: "var(--chart-1)",
  },
  remaining: {
    label: "remaining",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function ChartPieLabel({ data }: { readonly data?: TDonutChartData }) {
  const result = data
    ? [
        {
          name: "used",
          number: data?.usedCapacity / data?.totalCapacity || 0,
          fill: "var(--color-used)",
        },
        {
          name: "remaining",
          number:
            (data?.totalCapacity - data?.usedCapacity) / data?.totalCapacity ||
            0,
          fill: "var(--color-remaining)",
        },
      ]
    : [];

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Tỉ lệ chứa</CardTitle>
        <CardDescription className="hidden">
          January - June 2024
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {data ? (
          <ChartContainer
            config={chartConfig}
            className=" mx-auto aspect-square h-full max-h-[250px] min-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                startAngle={50}
                endAngle={410}
                data={result}
                dataKey="number"
                nameKey="name"
                innerRadius={40}
                label={({ percent }) => `${(percent * 100).toFixed(2)}%`}
                className="h-[80%]"
              />
              <ChartLegend content={<ChartLegendContent />} />
            </PieChart>
          </ChartContainer>
        ) : (
          <EmptyDataChart size={250} />
        )}
      </CardContent>
    </Card>
  );
}
