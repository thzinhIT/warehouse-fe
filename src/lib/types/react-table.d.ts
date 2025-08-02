import "@tanstack/react-table";

declare module "@tanstack/react-table" {
  interface ColumnMeta {
    headerClassName?: string;
    cellClassName?: string;
    footerClassName?: string;
    colSpan?: number;
    rowSpan?: number;
  }
}
