"use client";

import React, { use, useEffect, useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { DataTableBody } from "./table-body";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { DataTablePagination } from "./pagination-table";
import TableToolbar from "./toolbar-table";

const PageSchema = "1";
const SizeSchema = "20";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageCount?: number;
  total?: number;
  page?: number;
  size?: number;
  className?: string;
  showToolbar?: boolean; // Add this prop to control toolbar visibility
}

export function DataTable<TData, TValue>({
  className,
  data,
  columns,
  showToolbar = false, // Default to false so it won't show unless explicitly requested
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const searchParams = useSearchParams();
  const [pageNumber, setPageNumber] = useState<string>(
    searchParams.get("page") || PageSchema
  );
  const [isFirstLoad, setIsFirstLoad] = React.useState<boolean>(true);

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: Number(pageNumber) - 1,
    pageSize: Number(SizeSchema),
  });

  useEffect(() => {
    if (pagination.pageIndex > 0) {
      setIsFirstLoad(false);
    }
  }, [pagination.pageIndex]);

  useEffect(() => {
    if (!isFirstLoad) {
      setPageNumber((pagination.pageIndex + 1).toString());
    }
  }, [pagination.pageIndex, setPageNumber, isFirstLoad]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    state: {
      sorting,
      columnFilters,
      pagination,
      columnVisibility,
    },
    // manualPagination: true,
  });

  return (
    <div
      className={cn(
        "flex size-full flex-1 flex-col gap-4 overflow-hidden p-2",
        className
      )}
    >
      {showToolbar && <TableToolbar />}
      <div className="scrollbar h-full overflow-auto rounded-lg border bg-background">
        <DataTableBody columns={columns} table={table} />
      </div>
      <div className="flex items-center justify-end space-x-2 py-2">
        <DataTablePagination
          table={table}
          total={data?.length}
          showPageIndex={true}
        />
      </div>
    </div>
  );
}
