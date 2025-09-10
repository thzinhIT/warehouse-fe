"use client";

import TableToolbarLog from "@/components/common/system-log/render-toolbar";
import getColumnsLog from "@/components/common/system-log/system-log-column";
import { DataTable } from "@/components/common/table/data-table";
import useSetting from "@/hooks/setting/use-setting";
import { useMemo } from "react";

const SystemLogClient = () => {
  const { data, mutate, isPending } = useSetting();
  const columns = useMemo(() => {
    return getColumnsLog();
  }, []);

  console.log("data", data);
  return (
    <>
      {" "}
      <div className=""></div>
      <div>
        <TableToolbarLog searchLog={mutate} />
      </div>
      <div className="flex-1 min-h-0">
        <DataTable data={data ?? []} columns={columns} />
      </div>
    </>
  );
};
export default SystemLogClient;
