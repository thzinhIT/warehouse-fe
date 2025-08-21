import { Checkbox } from "@/components/ui/checkbox";
import { TDataExportOrder } from "@/lib/networking/client/manage-warehouse/service";
import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";

const getColumnsExportOrderSearch = (): ColumnDef<TDataExportOrder>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "STT",
    header: "STT",
    cell: ({ row }) => <div className="capitalize">{row?.index + 1}</div>,
  },
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("id") ?? "--"}</div>
    ),
  },
  {
    accessorKey: "exportCode",
    header: "Mã đơn xuất",
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("exportCode") ?? "--"}</div>
    ),
  },
  {
    accessorKey: "destination",
    header: () => <div>Điểm đến</div>,
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("destination") ?? "--"}</div>
    ),
  },
  {
    accessorKey: "source",
    header: () => <div>Nguồn</div>,
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("source") ?? "--"}</div>
    ),
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center">Trạng thái</div>,
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const statusColors = {
        draft: "bg-yellow-100 text-yellow-800",
        confirmed: "bg-green-100 text-green-800",
        cancelled: "bg-red-100 text-red-800",
      };
      return (
        <div className="text-center">
          <span
            className={`px-2 py-1 rounded text-xs font-medium ${
              statusColors[status as keyof typeof statusColors] ||
              "bg-gray-100 text-gray-800"
            }`}
          >
            {status}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "createdBy",
    header: () => <div>Người tạo</div>,
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("createdBy") ?? "--"}</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="text-center">Ngày tạo</div>,
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as string;
      const formatDate = createdAt
        ? new Date(createdAt).toLocaleDateString("vi-VN")
        : "--";
      return <div className="text-center font-medium">{formatDate}</div>;
    },
  },
  {
    accessorKey: "note",
    header: () => <div>Ghi chú</div>,
    cell: ({ row }) => (
      <div className="max-w-32 truncate">{row.getValue("note") ?? "--"}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: () => {
      return (
        <div className="flex items-center justify-center">
          <Eye size={16} className="cursor-pointer hover:text-blue-600" />
        </div>
      );
    },
  },
];

export default getColumnsExportOrderSearch;
