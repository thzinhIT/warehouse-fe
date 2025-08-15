"use client";

import * as React from "react";
import { Label, Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";
import { useTranslations } from "next-intl";

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
import EmptyDataChart from "./empty-data-chart";
import Loading from "@/components/common/loading";

type TChartPieProps = {
  data?: { month?: string; desktop?: number; fill?: string }[];
  title?: string;
  description?: string;
  isLoading?: boolean;
  error?: string | null;
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
  isLoading = false,
  error = null,
}: TChartPieProps) {
  const t = useTranslations("dashboard.charts");
  const id = "pie-interactive";
  const [activeMonth, setActiveMonth] = React.useState(data?.[0]?.month);

  const activeIndex = React.useMemo(
    () => data?.findIndex((item) => item.month === activeMonth),
    [activeMonth, data]
  );
  const months = React.useMemo(() => data?.map((item) => item.month), [data]);

  // Function to get translated label for any data point
  const getTranslatedLabel = (key: string) => {
    // If the key looks like a date (YYYY-MM-DD), format it nicely
    if (key.match(/^\d{4}-\d{2}-\d{2}$/)) {
      return new Date(key).toLocaleDateString();
    }

    // If the key is already a readable string (like SKU names), return as is
    if (key.length > 10 || key.includes(" ")) {
      return key;
    }

    // Determine chart type based on the data content for predefined categories
    const chartType = data?.some((item) =>
      ["electronics", "clothing", "furniture", "books", "toys"].includes(
        item.month || ""
      )
    )
      ? "inventory-category"
      : data?.some((item) =>
          ["completed", "pending", "shipped", "returned", "cancelled"].includes(
            item.month || ""
          )
        )
      ? "order-status"
      : "warehouse-storage";

    try {
      // Only try to translate if it's a predefined key
      const predefinedKeys = [
        "electronics",
        "clothing",
        "furniture",
        "books",
        "toys",
        "completed",
        "pending",
        "shipped",
        "returned",
        "cancelled",
        "january",
        "february",
        "march",
        "april",
        "may",
      ];

      if (predefinedKeys.includes(key.toLowerCase())) {
        const translation = t(`${chartType}.${key}`);
        if (translation && translation !== `${chartType}.${key}`) {
          return translation;
        }
      }
    } catch {
      // Translation not found, continue to fallback
    }

    // Fallback to chartConfig or capitalize the key
    const config = chartConfig[key as keyof typeof chartConfig];
    return config?.label || key.charAt(0).toUpperCase() + key.slice(1);
  };

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
          <CardTitle>{title || t("pie-chart-interactive")}</CardTitle>
          <CardDescription>
            {description || "January - June 2024"}
          </CardDescription>
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
                        {getTranslatedLabel(key || "")}
                      </div>
                    </SelectItem>
                  );
                })}
            </SelectContent>
          </Select>
        )}
      </CardHeader>

      {isLoading ? (
        <CardContent className="flex flex-1 justify-center pb-0">
          <Loading className="h-[300px]" />
        </CardContent>
      ) : error ? (
        <CardContent className="flex flex-1 justify-center items-center pb-0">
          <div className="text-center text-red-500">
            <p>Error loading chart data</p>
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
        </CardContent>
      ) : data && data?.length > 0 ? (
        <CardContent className="flex flex-1 justify-center pb-0">
          <ChartContainer
            id={id}
            config={chartConfig}
            className="mx-auto aspect-square w-full max-w-[300px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={({ active, payload }) => {
                  if (active && payload && payload.length > 0) {
                    const data = payload[0];
                    const label = getTranslatedLabel(String(data.name || ""));
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              {label}
                            </span>
                            <span className="font-bold text-muted-foreground">
                              {data.value}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
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
                            {data?.[activeIndex ?? 0]?.month
                              ? getTranslatedLabel(
                                  data[activeIndex ?? 0].month || ""
                                )
                              : "Items"}
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
