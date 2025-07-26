"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import {
  RiArrowLeftDoubleFill,
  RiArrowLeftSLine,
  RiArrowRightDoubleFill,
  RiArrowRightSLine,
} from "react-icons/ri";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  total?: number;
  showPageSize?: boolean;
  showPageIndex?: boolean;
}

export function DataTablePagination<TData>({
  table,
  total,
  showPageIndex = true,
}: Readonly<DataTablePaginationProps<TData>>) {
  const pageCount = table.getPageCount();
  const pageIndex = table.getState().pagination.pageIndex + 1;
  const { pageSize } = table.getState().pagination;

  useEffect(() => {
    if (pageIndex > pageCount) {
      table.setPageIndex(0);
    }
    if (Number(pageSize) < 10) {
      table.setPageSize(10);
    }
  }, [pageIndex, pageCount, table, pageSize]);

  console.log("pageIndex", pageIndex);
  console.log("pageCount", pageCount);

  return (
    <div className="relative flex h-auto w-full flex-wrap items-center justify-end px-2 pb-2">
      <div className="flex flex-wrap items-center space-x-6 lg:space-x-8">
        {!!total && (
          <div className="absolute left-0 text-sm font-medium">
            {" "}
            Tổng {total} kết quả
          </div>
        )}

        {showPageIndex && (
          <div className="flex w-[100px] items-center text-sm font-medium">
            <p
              className={"line-clamp-1 overflow-hidden text-ellipsis break-all"}
            >
              Trang {table.getState().pagination.pageIndex + 1} /{" "}
              {table.getPageCount()}
            </p>
          </div>
        )}
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden size-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <RiArrowLeftDoubleFill className="size-4" />
          </Button>
          <Button
            variant="outline"
            className="size-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <RiArrowLeftSLine className="size-4" />
          </Button>
          <Button
            variant="outline"
            className="size-8 p-0"
            onClick={() => {
              console.log("aaa");
              table.nextPage();
            }}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <RiArrowRightSLine className="size-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden size-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <RiArrowRightDoubleFill className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
