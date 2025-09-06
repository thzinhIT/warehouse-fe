import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/types/product.types";

// Use Product type from our types file
export type ProductData = Product;

type ProductColumnsProps = {
  onView?: (product: ProductData) => void;
};

export const getProductColumns = (
  props: ProductColumnsProps = {}
): ColumnDef<ProductData>[] => {
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
      size: 100,
    },
    {
      accessorKey: "itemCount",
      header: "Số lượng item",
      cell: ({ row }) => <div>{row.getValue("itemCount")}</div>,
      size: 120,
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("name")}</div>
      ),
      size: 200,
    },
    {
      accessorKey: "size",
      header: "Size",
      cell: ({ row }) => <div>{row.getValue("size")}</div>,
      size: 80,
    },
    {
      accessorKey: "color",
      header: "Color",
      cell: ({ row }) => <div>{row.getValue("color")}</div>,
      size: 100,
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => <div>{row.getValue("type")}</div>,
      size: 100,
    },
    {
      accessorKey: "unitVolume",
      header: "Unit volume",
      cell: ({ row }) => (
        <div className="text-center font-medium">
          {row.getValue("unitVolume")}
        </div>
      ),
      size: 120,
    },
    {
      id: "actions",
      header: "Xem chi tiết",
      cell: ({ row }) => (
        <div className="flex items-center justify-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onView?.(row.original)}
            className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      ),
      size: 150,
    },
  ];
};
