import { Checkbox } from "@/components/ui/checkbox";
import { TExportOrderBoard } from "@/lib/networking/client/manage-warehouse/service";
import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";

type propsCol = {
  handleOnClickDetail?: (data: TExportOrderBoard) => void;
};

const getColumnsExportHistory = ({
  handleOnClickDetail,
}: propsCol = {}): ColumnDef<TExportOrderBoard>[] => [
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
    accessorKey: "exportCode",
    header: "Mã đơn xuất",
    cell: ({ row }) => <div>{row.getValue("exportCode") ?? "--"}</div>,
  },
  {
    accessorKey: "skuCode",
    header: () => <div>Mã SKU</div>,
    cell: ({ row }) => <div>{row.getValue("skuCode") ?? "--"}</div>,
  },
  {
    accessorKey: "skuName",
    header: () => <div>Tên sản phẩm</div>,
    cell: ({ row }) => <div>{row.getValue("skuName") ?? "--"}</div>,
  },
  {
    accessorKey: "quantity",
    header: () => <div className="text-center">Số lượng</div>,
    cell: ({ row }) => {
      const quantity = parseFloat(row.getValue("quantity"));
      return <div className="text-center font-medium">{quantity}</div>;
    },
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
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className="flex items-center justify-center">
          <Eye
            size={16}
            className={`cursor-pointer hover:text-blue-600 ${
              !handleOnClickDetail ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => handleOnClickDetail?.(row.original)}
          />
        </div>
      );
    },
  },
];

export default getColumnsExportHistory;
