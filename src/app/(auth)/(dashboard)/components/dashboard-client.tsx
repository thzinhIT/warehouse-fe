"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ElegantCard } from "./card-report";
import { FaFileInvoice } from "react-icons/fa";
import { FaFileArrowDown } from "react-icons/fa6";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartAreaImport } from "./area-chart-import";
import useChartDashboard from "@/hooks/dashboard/useDashboardData";
import { format, subDays } from "date-fns";
import { ChartAreaExport } from "./area-chart-export";
import { TBodyImportChart } from "@/lib/networking/client/dashboard/service";
import { ChartBarMultiple } from "./bar-chart-storage";
import { ChartLineMultiple } from "./line-chart-error";
import { ChartPieLabel } from "./pie-chart-percent";
import IoTDashboard from "./iot-dashboard";
import ListCardReport from "./list-card-report";

const DashboardClient = () => {
  const [startDate, setStartDate] = useState<string>(
    format(new Date(), "yyyy-MM-dd")
  );

  const endDate = useMemo(() => format(new Date(), "yyyy-MM-dd"), []);
  const body: TBodyImportChart = useMemo(
    () => ({ warehouseId: 1, startDate, endDate }),
    [startDate, endDate]
  );
  const {
    importChart,
    importChartFn,
    exportChart,
    exportChartFn,
    storageChart,
    storageChartFn,
    storageDonutChart,
    storageChartDonutFn,
    errorChart,
    errorChartFn,
    isPending,
  } = useChartDashboard();

  const handleChangeTab = (value: string) => {
    switch (value) {
      case "today":
        setStartDate(format(new Date(), "yyyy-MM-dd"));
        break;
      case "lastWeek":
        setStartDate(format(subDays(new Date(), 7), "yyyy-MM-dd"));

        break;
      case "lastMouth":
        setStartDate(format(subDays(new Date(), 30), "yyyy-MM-dd"));

        break;

      default:
        break;
    }
  };

  useEffect(() => {
    importChartFn(body);
    exportChartFn(body);
    storageChartFn();
    storageChartDonutFn();
    errorChartFn(body);
  }, [
    body,
    importChartFn,
    exportChartFn,
    storageChartFn,
    errorChartFn,
    storageChartDonutFn,
  ]);


  return (
    <div className="px-2 overflow-auto h-full">
      <h3 className="font-medium text-lg px-2">Báo cáo tổng kết </h3>
      <Tabs
        defaultValue="today"
        className="w-[500px] mb-3"
        onValueChange={handleChangeTab}
      >
        <TabsList>
          <TabsTrigger value="today">Hôm nay</TabsTrigger>
          <TabsTrigger value="lastWeek">7 ngày</TabsTrigger>
          <TabsTrigger value="lastMouth">30 ngày</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-12 mb-3">
        <ListCardReport />
        <div className="col-span-4">
          <IoTDashboard />
        </div>
      </div>

      {/* chart nè vinh */}

      <div className="flex flex-col gap-2 pb-2">
        <div className=" grid  grid-cols-3 gap-3  ">
          <div className="col-span-2">
            <ChartBarMultiple data={storageChart ?? []} isPending={isPending} />
          </div>
          <div className="col-span-1">
            <ChartPieLabel data={storageDonutChart} isPending={isPending} />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div className="col-span-1">
            <ChartAreaImport data={importChart ?? []} isPending={isPending} />
          </div>
          <div className="col-span-1">
            <ChartAreaExport data={exportChart ?? []} isPending={isPending} />
          </div>
          <div className="col-span-1">
            <ChartLineMultiple data={errorChart ?? []} isPending={isPending} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardClient;
