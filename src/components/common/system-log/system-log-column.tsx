import { TLog } from "@/lib/networking/client/setting/service";
import { ColumnDef } from "@tanstack/react-table";

const getColumnsLog = (): ColumnDef<TLog>[] => [
  {
    accessorKey: "STT",
    header: "STT",
    cell: ({ row }) => <div className="capitalize">{row?.index + 1}</div>,
  },
  {
    accessorKey: "userName",
    header: "Người thực hiện",
    cell: ({ row }) => <div>{row.getValue("userName") ?? "--"}</div>,
  },
  {
    accessorKey: "targetTable",
    header: () => <div>Hành động</div>,
    cell: ({ row }) => <div>{row.getValue("targetTable") ?? "--"}</div>,
  },
  {
    accessorKey: "timestamp",
    header: () => <div>Thời gian</div>,
    cell: ({ row }) => {
      const date = new Date(row.getValue("timestamp"));

      const formatted =
        date.getHours().toString().padStart(2, "0") +
        ":" +
        date.getMinutes().toString().padStart(2, "0") +
        ":" +
        date.getSeconds().toString().padStart(2, "0") +
        " " +
        date.getDate().toString().padStart(2, "0") +
        "/" +
        (date.getMonth() + 1).toString().padStart(2, "0") +
        "/" +
        date.getFullYear() +
        " ";

      return (
        <div className="lowercase">
          {row.getValue("timestamp") ? formatted : "--"}
        </div>
      );
    },
  },
];

export default getColumnsLog;
