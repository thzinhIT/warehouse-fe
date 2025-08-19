import { parse, format } from "date-fns";

export function formatDDMMYY(dateStr: string): string {
  const parsed = parse(dateStr, "yyyy/MM/dd", new Date());

  return format(parsed, "dd/MM/yyyy");
}
