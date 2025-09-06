"use client";

import ChartDashboardKey from "@/lib/networking/client/dashboard/endpoint";
import {
  DataChartDonutStorage,
  DataChartError,
  DataChartExport,
  DataChartImport,
  DataChartStorage,
  TDataChartError,
  TDataChartStorage,
  TDataExportChart,
  TDataImportChart,
  TDonutChartData,
} from "@/lib/networking/client/dashboard/service";
import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { useMemo, useState } from "react";

const useChartDashboard = () => {
  const [importChart, setImportChart] = useState<TDataImportChart[]>();
  const [exportChart, setExportChart] = useState<TDataExportChart[]>();
  const [storageChart, setStorageChart] = useState<TDataChartStorage[]>();
  const [errorChart, setErrorChart] = useState<TDataChartError[]>();
  const [storageDonutChart, setStorageDonutChart] = useState<TDonutChartData>();
  const { mutate: importChartFn, isPending: importChartPending } = useMutation({
    mutationKey: [ChartDashboardKey.IMPORT_CHART],
    mutationFn: DataChartImport,
    onSuccess: (data) => {
      setImportChart(data);
    },
  });

  const { mutate: exportChartFn, isPending: exportChartPending } = useMutation({
    mutationKey: [ChartDashboardKey.EXPORT_CHART],
    mutationFn: DataChartExport,
    onSuccess: (data) => {
      setExportChart(data);
    },
  });

  const { mutate: storageChartFn, isPending: storagePending } = useMutation({
    mutationKey: [ChartDashboardKey.STORAGE_CHART],
    mutationFn: DataChartStorage,
    onSuccess: (data) => {
      setStorageChart(data);
    },
  });
  const { mutate: storageChartDonutFn, isPending: storageDonutPending } =
    useMutation({
      mutationKey: [ChartDashboardKey.STORAGE_DONUT_CHART],
      mutationFn: DataChartDonutStorage,
      onSuccess: (data) => {
        setStorageDonutChart(data);
      },
    });
  const { mutate: errorChartFn, isPending: errorChartPending } = useMutation({
    mutationKey: [ChartDashboardKey.ERROR_CHART],
    mutationFn: DataChartError,
    onSuccess: (data) => {
      setErrorChart(data);
    },
  });

  return {
    importChartFn,
    importChart,
    exportChartFn,
    exportChart,
    storageChart,
    storageChartFn,
    storageDonutChart,
    storageChartDonutFn,
    errorChart,
    errorChartFn,
    isPending:
      exportChartPending &&
      importChartPending &&
      storagePending &&
      storageDonutPending &&
      errorChartPending,
  };
};

export default useChartDashboard;
