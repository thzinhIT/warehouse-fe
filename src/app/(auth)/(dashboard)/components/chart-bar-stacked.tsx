"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { useTranslations } from "next-intl";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import Loading from "@/components/common/loading";
import { BarChartDataPoint } from "@/lib/types/dashboard.types";

export const description = "A stacked bar chart with a legend";

const defaultChartData = [
  { month: "January", imports: 186, exports: 80 },
  { month: "February", imports: 305, exports: 200 },
  { month: "March", imports: 237, exports: 120 },
  { month: "April", imports: 73, exports: 190 },
  { month: "May", imports: 209, exports: 130 },
  { month: "June", imports: 214, exports: 140 },
];

const chartConfig = {
  imports: {
    label: "Imports",
    color: "var(--chart-1)",
  },
  exports: {
    label: "Exports",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

interface ChartBarStackedProps {
  data?: BarChartDataPoint[];
  isLoading?: boolean;
  error?: string | null;
}

export function ChartBarStacked({ data, isLoading = false, error = null }: ChartBarStackedProps) {
  const t = useTranslations("dashboard.charts");
  
  const chartData = data && data.length > 0 ? data : defaultChartData;

  return (
    <Card className="h-auto">
      <CardHeader>
        <CardTitle>{t("summary-chart.title")}</CardTitle>
        <CardDescription>Import vs Export Summary</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Loading className="h-[400px]" />
        ) : error ? (
          <div className="flex justify-center items-center h-[400px]">
            <div className="text-center text-red-500">
              <p>Error loading chart data</p>
              <p className="text-sm text-muted-foreground">{error}</p>
            </div>
          </div>
        ) : (
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar
                dataKey="imports"
                stackId="a"
                fill="var(--color-imports)"
                radius={[0, 0, 4, 4]}
              />
              <Bar
                dataKey="exports"
                stackId="a"
                fill="var(--color-exports)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing import vs export data
        </div>
      </CardFooter>
    </Card>
  );
}
