import React from "react";
import ChartPieInteractive from "./chart-pie-interactive";

const DashboardClient = () => {
  return (
    <div className="overflow-hidden h-full p-4">
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
    </div>
  );
};

export default DashboardClient;
