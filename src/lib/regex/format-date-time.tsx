import { parse, parseISO, format, isValid } from "date-fns";

export function formatDDMMYY(dateStr: string): string {
  const parsed = parse(dateStr, "yyyy/MM/dd", new Date());

  return format(parsed, "dd/MM/yyyy");
}

export function formatFullDate(dateStr?: string): string {
  if (!dateStr) return "";

  const parsed = parseISO(dateStr);

  if (!isValid(parsed)) return "";

  return format(parsed, "dd/MM/yyyy");
}
