"use client";
import { FaFileArrowDown, FaFileArrowUp } from "react-icons/fa6";
import { ElegantCard } from "./card-report";
import { FaFileInvoice } from "react-icons/fa";
import { MdFactory } from "react-icons/md";
import { FaExchangeAlt } from "react-icons/fa";
import { MdError } from "react-icons/md";
import { IoWarning } from "react-icons/io5";

const ListCardReport = () => {
  return (
    <div className="grid grid-cols-3 gap-4 col-span-8 border-r-[3px] border-gray-400  pr-2">
      <div className="col-span-1">
        <ElegantCard
          title="Tổng đơn nhập"
          icon={<FaFileArrowDown className="text-amber-600" size={30} />}
        />
      </div>
      <div className="col-span-1">
        <ElegantCard
          title="Nhập vào nhà máy"
          icon={<MdFactory className="text-blue-600" size={30} />}
        />
      </div>
      <div className="col-span-1">
        <ElegantCard
          title="Hàng bị hoàn trả"
          icon={<FaExchangeAlt className="text-orange-600" size={30} />}
        />
      </div>
      <div className="col-span-1">
        <ElegantCard
          title="Tổng đơn xuất"
          icon={<FaFileArrowUp className="text-cyan-600" size={30} />}
        />
      </div>{" "}
      <div className="col-span-1">
        <ElegantCard
          title="Hàng bị lỗi"
          icon={<MdError className="text-red-600" size={30} />}
        />
      </div>
      <div className="col-span-1">
        <ElegantCard
          title="Hàng lỗi trả về"
          icon={<IoWarning className="text-yellow-500" size={30} />}
        />
      </div>
    </div>
  );
};

export default ListCardReport;
