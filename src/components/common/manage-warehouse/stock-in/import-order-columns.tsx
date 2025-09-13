import { Checkbox } from "@/components/ui/checkbox";
import { TDataImportOrderTemporary } from "@/lib/networking/client/manage-warehouse/service";
import { formatDDMMYY } from "@/lib/regex/format-date-time";
import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";

type propsCol = {
  handleOnClickDetail: (data: TDataImportOrderTemporary) => void;
};

const getColumsImportOrder = ({
  handleOnClickDetail,
}: propsCol): ColumnDef<TDataImportOrderTemporary>[] => [
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
    header: "Mã đơn nhập",
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("id") ?? "--"}</div>
    ),
  },
  {
    accessorKey: "skuCode",
    header: () => <div>Mã SKU</div>,
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("skuCode") ?? "--"}</div>
    ),
  },
  {
    accessorKey: "skuName",
    header: () => <div>Tên sản phẩm</div>,
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("skuName") ?? "--"}</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: () => <div>Ngày nhập</div>,
    cell: ({ row }) => (
      <div className="lowercase">
        {formatDDMMYY(row.getValue("createdAt")) ?? "--"}
      </div>
    ),
  },

  {
    accessorKey: "quantity",
    header: () => <div>Số lượng</div>,
  },
  {
    id: "actionsDetail",
    header: () => <div className="text-center">Xem chi tiết</div>,

    cell: ({ row }) => {
      return (
        <div className="">
          <Eye
            size={20}
            className="cursor-pointer mx-auto"
            onClick={() => {
              handleOnClickDetail(row?.original);
            }}
          />
        </div>
      );
    },
  },
];

export default getColumsImportOrder;
