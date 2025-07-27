"use client";

import * as React from "react";
import { Label, Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";

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
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { BarChart3, TrendingUp } from "lucide-react";
import EmptyDataChart from "./empty-data-chart";

type TChartPieProps = {
  data?: { month?: string; desktop?: number; fill?: string }[];
  title?: string;
  description?: string;
};

// const data = [
//   { month: "january", desktop: 186, fill: "var(--color-january)" },
//   { month: "february", desktop: 305, fill: "var(--color-february)" },
//   { month: "march", desktop: 237, fill: "var(--color-march)" },
//   { month: "april", desktop: 173, fill: "var(--color-april)" },
//   { month: "may", desktop: 209, fill: "var(--color-may)" },
// ];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Desktop",
  },
  mobile: {
    label: "Mobile",
  },
  january: {
    label: "January",
    color: "oklch(0.7 0.15 0)",
  },
  february: {
    label: "February",
    color: "oklch(0.65 0.2 60)",
  },
  march: {
    label: "March",
    color: "oklch(0.6 0.18 120)",
  },
  april: {
    label: "April",
    color: "oklch(0.68 0.16 180)",
  },
  may: {
    label: "May",
    color: "oklch(0.72 0.14 240)",
  },
} satisfies ChartConfig;

export default function ChartPieInteractive({
  data,
  title,
  description,
}: TChartPieProps) {
  const id = "pie-interactive";
  const [activeMonth, setActiveMonth] = React.useState(data?.[0]?.month);

  const activeIndex = React.useMemo(
    () => data?.findIndex((item) => item.month === activeMonth),
    [activeMonth, data]
  );
  const months = React.useMemo(() => data?.map((item) => item.month), []);

  return (
    <Card data-chart={id} className="flex flex-col">
      <ChartStyle id={id} config={chartConfig} />
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div
          className={cn(
            data && data?.length > 0
              ? "grid gap-1"
              : "flex justify-between items-start"
          )}
        >
          <CardTitle>Pie Chart - Interactive</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </div>
        {data && data?.length > 0 && (
          <Select value={activeMonth} onValueChange={setActiveMonth}>
            <SelectTrigger
              className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent align="end" className="rounded-xl">
              {months &&
                months?.map((key) => {
                  const config = chartConfig[key as keyof typeof chartConfig];

                  if (!config) {
                    return null;
                  }

                  return (
                    <SelectItem
                      key={key}
                      value={key ?? ""}
                      className="rounded-lg [&_span]:flex"
                    >
                      <div className="flex items-center gap-2 text-xs">
                        <span
                          className="flex h-3 w-3 shrink-0 rounded-sm"
                          style={{
                            backgroundColor: `var(--color-${key})`,
                          }}
                        />
                        {config?.label}
                      </div>
                    </SelectItem>
                  );
                })}
            </SelectContent>
          </Select>
        )}
      </CardHeader>

      {data && data?.length > 0 ? (
        <CardContent className="flex flex-1 justify-center pb-0">
          <ChartContainer
            id={id}
            config={chartConfig}
            className="mx-auto aspect-square w-full max-w-[300px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={data}
                dataKey="desktop"
                nameKey="month"
                innerRadius={60}
                strokeWidth={5}
                activeIndex={activeIndex}
                activeShape={({
                  outerRadius = 0,
                  ...props
                }: PieSectorDataItem) => (
                  <g>
                    <Sector {...props} outerRadius={outerRadius + 10} />
                    <Sector
                      {...props}
                      outerRadius={outerRadius + 25}
                      innerRadius={outerRadius + 12}
                    />
                  </g>
                )}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {data?.[
                              activeIndex ?? 0
                            ]?.desktop?.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Visitors
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
      ) : (
        <EmptyDataChart />
      )}
    </Card>
  );
}
