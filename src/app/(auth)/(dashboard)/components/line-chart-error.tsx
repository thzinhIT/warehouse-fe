"use client";

import { CartesianGrid, Line, LineChart, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import EmptyDataChart from "./empty-data-chart";
import { TDataChartError } from "@/lib/networking/client/dashboard/service";

export const description = "A multiple line chart";

const chartConfig = {
  damaged: {
    label: "damaged",
    color: "var(--chart-4)",
  },
  returned: {
    label: "returned",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

export function ChartLineMultiple({
  data,
  isPending,
}: {
  readonly data: TDataChartError[];
  readonly isPending: boolean;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex gap-2 ">
          <span className="w-1  bg-purple-600 rounded-b-md  rounded-t-md"></span>{" "}
          <span> Chất lượng & hàng lỗi</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {data && !!data?.length ? (
          <ChartContainer
            config={chartConfig}
            className="max-h-[150px] min-h-[150px] w-full"
          >
            <LineChart
              accessibilityLayer
              data={data}
              margin={{
                left: -40,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />

              <YAxis domain={[0, "auto"]} padding={{ top: 20, bottom: 20 }} />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Line
                dataKey="damaged"
                type="monotone"
                stroke="var(--color-damaged)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                dataKey="returned"
                type="monotone"
                stroke="var(--color-returned)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        ) : (
          <EmptyDataChart size={150} />
        )}
      </CardContent>
    </Card>
  );
}
