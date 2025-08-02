import React from "react";
import ChartPieInteractive from "./chart-pie-interactive";
import { ChartBarStacked } from "./chart-bar-stacked";

const DashboardClient = () => {
  return (
    <div className=" h-full p-4 overflow-auto">
      <div className="grid grid-cols-12 gap-3 ">
        <div className="col-span-4">
          <ChartPieInteractive
            data={[]}
            title="thành vinh làm chart"
            description="từ năm ngoái"
          />
        </div>
        <div className="col-span-4">
          <ChartPieInteractive />
        </div>
        <div className="col-span-4">
          <ChartPieInteractive />
        </div>
      </div>
      <div className="mt-5">
        {" "}
        <ChartBarStacked />
      </div>
    </div>
  );
};

export default DashboardClient;
