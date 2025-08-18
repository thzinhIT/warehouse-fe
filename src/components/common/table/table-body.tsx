"use client";

import { ColumnDef, flexRender, Table } from "@tanstack/react-table";

import {
  Table as UiTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { EmptyData } from "../empty-data";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  isSticky?: boolean;
  className?: string;
  table: Table<TData>;
}

export function DataTableBody<TData, TValue>({
  columns,
  isSticky = true,
  className,
  table,
}: DataTableProps<TData, TValue>) {
  return (
    <UiTable
      className={cn(
        "scrollbar h-auto border-separate border-spacing-0 overflow-auto",
        className
      )}
    >
      <TableHeader>
        {table?.getHeaderGroups()?.map((headerGroup, index) => (
          <TableRow
            key={`headerGroup-${headerGroup.id}-${index}`}
            className={"dark:border-b-default-600 "}
          >
            {headerGroup.headers.map((header, index) => {
              return (
                <TableHead
                  key={`header-${header.id}-${index}`}
                  className={cn(
                    "last:border-r-0, h-8 border-b border-r bg-background px-2",
                    header?.column?.columnDef?.meta?.headerClassName,
                    isSticky ? "sticky top-0 z-20" : ""
                  )}
                  colSpan={header?.column?.columnDef?.meta?.colSpan}
                  rowSpan={header?.column?.columnDef?.meta?.rowSpan}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
              className=" border-0 bg-background last:border-b-0 even:bg-muted hover:bg-primary/10 data-[state=selected]:bg-primary/15"
            >
              {row.getVisibleCells().map((cell, index) => (
                <TableCell
                  key={`cell-${cell.id}-${index}`}
                  className={cn(
                    "text-nowrap border-b border-r p-0 px-2 py-1 last:border-r-0",
                    cell?.column?.columnDef?.meta?.cellClassName
                  )}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns?.length} className="h-24 text-center">
              <EmptyData />
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </UiTable>
  );
}
