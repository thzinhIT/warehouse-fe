"use client";
import { FaFileArrowDown, FaFileArrowUp } from "react-icons/fa6";
import { ElegantCard } from "./card-report";
import { FaFileInvoice } from "react-icons/fa";
import { MdFactory } from "react-icons/md";
import { FaExchangeAlt } from "react-icons/fa";
import { MdError } from "react-icons/md";
import { IoWarning } from "react-icons/io5";
import { useMemo } from "react";
import { DataKpi } from "@/lib/networking/client/dashboard/service";

const ListCardReport = ({
  data,
  isPending,
}: {
  isPending: boolean;
  data?: DataKpi;
}) => {
  const cards = useMemo(
    () => [
      {
        title: "Tổng đơn nhập",
        icon: <FaFileArrowDown className="text-amber-600" size={30} />,
        value: data?.importKpis?.totalImportOrders ?? 0,
      },
      {
        title: "Nhập vào nhà máy",
        icon: <MdFactory className="text-blue-600" size={30} />,
        value: data?.importKpis?.itemsFromFactory ?? 0,
      },
      {
        title: "Hàng bị hoàn trả",
        icon: <FaExchangeAlt className="text-orange-600" size={30} />,
        value: data?.importKpis?.itemsFromReturn ?? 0,
      },
      {
        title: "Tổng đơn xuất",
        icon: <FaFileArrowUp className="text-cyan-600" size={30} />,
        value: data?.exportKpis?.totalConfirmedOrders ?? 0,
      },
      {
        title: "Hàng bị lỗi",
        icon: <MdError className="text-red-600" size={30} />,
        value: data?.qualityKpis?.totalDamaged ?? 0,
      },
      {
        title: "Hàng lỗi trả về",
        icon: <IoWarning className="text-yellow-500" size={30} />,
        value: data?.qualityKpis?.totalReturned ?? 0,
      },
    ],
    [data]
  );

  return (
    <div className="grid grid-cols-3 gap-4 col-span-8 border-r-[3px] border-gray-400  pr-2">
      {cards.map((card, index) => (
        <div key={`${index}-${card.title}`} className="col-span-1">
          <ElegantCard
            title={card.title}
            icon={card.icon}
            value={card.value}
            isPending={isPending}
          />
        </div>
      ))}
    </div>
  );
};

export default ListCardReport;
