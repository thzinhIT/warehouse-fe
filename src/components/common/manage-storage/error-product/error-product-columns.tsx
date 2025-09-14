import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ErrorProduct } from "@/lib/types/error-product.types";

// Use ErrorProduct type from our types file
export type ErrorProductData = ErrorProduct;

type ErrorProductColumnsProps = {
  onView?: (product: ErrorProductData) => void;
};

export const getErrorProductColumns = (
  props: ErrorProductColumnsProps = {}
): ColumnDef<ErrorProductData>[] => {
  const { onView } = props;

  return [
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
      header: "Số thứ tự",
      cell: ({ row }) => (
        <div className="text-center font-medium">{row.index + 1}</div>
      ),
      size: 80,
    },
    {
      accessorKey: "skuCode",
      header: "Mã SKU",
      cell: ({ row }) => <div>{row.getValue("skuCode")}</div>,
      size: 120,
    },
    {
      accessorKey: "name",
      header: "Tên sản phẩm",
      cell: ({ row }) => (
        <div className="max-w-[200px] truncate">{row.getValue("name")}</div>
      ),
      size: 200,
    },
    {
      accessorKey: "size",
      header: "Kích cỡ",
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("size") || "--"}</div>
      ),
      size: 80,
    },
    {
      accessorKey: "color",
      header: "Màu sắc",
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("color") || "--"}</div>
      ),
      size: 100,
    },
    {
      accessorKey: "type",
      header: "Loại",
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("type") || "--"}</div>
      ),
      size: 100,
    },
    {
      accessorKey: "unitVolume",
      header: "Dung tích",
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("unitVolume") || "--"}</div>
      ),
      size: 100,
    },
    {
      accessorKey: "damagedCount",
      header: "Số lượng hỏng",
      cell: ({ row }) => (
        <div className="text-center">
          {row?.getValue("damagedCount") || "--"}
        </div>
      ),
      size: 120,
    },
    {
      id: "actions",
      header: "Xem chi tiết",
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onView?.(row.original)}
            className="h-8 w-8 p-0"
            title="Xem chi tiết"
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      ),
      enableSorting: false,
      size: 100,
    },
  ];
};
