"use client";

import * as React from "react";
import { CalendarIcon, Search } from "lucide-react";
import { format, parse, isValid } from "date-fns";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { isValidDateRange } from "@/lib/regex/format-date-time";
import toast from "react-hot-toast";
export type TImportRequestSearch = {
  importCode?: string;
  skuCode?: string;
  startDate?: string;
  endDate?: string;
};

export default function TableToolbarImport({
  searchImport,
}: {
  readonly searchImport: (body: TImportRequestSearch) => void;
}) {
  const [startDate, setStartDate] = React.useState<Date>(new Date());
  const [endDate, setEndDate] = React.useState<Date>(new Date());
  const [startDateInput, setStartDateInput] = React.useState(
    format(new Date(), "dd/MM/yyyy")
  );
  const searchRef = React.useRef<TImportRequestSearch>({});
  const [endDateInput, setEndDateInput] = React.useState(
    format(new Date(), "dd/MM/yyyy")
  );

  const formatDateInput = (value: string) => {
    // Chỉ giữ lại số
    const numbers = value.replace(/\D/g, "");

    // Tự động thêm dấu /
    if (numbers.length <= 2) {
      return numbers;
    } else if (numbers.length <= 4) {
      return numbers.slice(0, 2) + "/" + numbers.slice(2);
    } else {
      return (
        numbers.slice(0, 2) +
        "/" +
        numbers.slice(2, 4) +
        "/" +
        numbers.slice(4, 8)
      );
    }
  };

  const handleStartDateInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    const formatted = formatDateInput(value);
    setStartDateInput(formatted);

    if (formatted.length === 10) {
      try {
        const parsedDate = parse(formatted, "dd/MM/yyyy", new Date());
        if (isValid(parsedDate)) {
          setStartDate(parsedDate);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleEndDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const formatted = formatDateInput(value);
    setEndDateInput(formatted);

    if (formatted.length === 10) {
      try {
        const parsedDate = parse(formatted, "dd/MM/yyyy", new Date());
        if (isValid(parsedDate)) {
          setEndDate(parsedDate);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleStartDateSelect = (date: Date | undefined) => {
    if (date) {
      setStartDate(date);
      searchRef.current.startDate = format(date, "dd/MM/yyyy");
      setStartDateInput(format(date, "dd/MM/yyyy"));
    }
  };

  const handleEndDateSelect = (date: Date | undefined) => {
    if (date) {
      setEndDate(date);
      searchRef.current.endDate = format(date, "dd/MM/yyyy");
      setEndDateInput(format(date, "dd/MM/yyyy"));
    }
  };

  const handleSearch = () => {
    if (!searchRef?.current?.endDate)
      searchRef.current.endDate = format(new Date(), "yyyy-MM-dd");
    if (!searchRef?.current?.startDate)
      searchRef.current.startDate = format(new Date(), "yyyy-MM-dd");
    searchRef.current.startDate = format(
      searchRef.current.startDate,
      "yyyy-MM-dd"
    );
    searchRef.current.endDate = format(searchRef.current.endDate, "yyyy-MM-dd");
    if (
      !isValidDateRange(searchRef.current.startDate, searchRef.current.endDate)
    ) {
      toast.error("Ngày bắt đầu , ngày kết thúc không hợp lệ");

      return;
    }
    if (!searchRef.current.importCode && !searchRef.current.skuCode) return;

    searchImport(searchRef.current);
  };

  return (
    <div className="flex gap-2 items-center mt-5 ">
      <div className="grid grid-cols-12 gap-2 w-full ">
        <div className="relative min-w-0 col-span-3 lg:max-w-xs">
          <Input
            id="search-code"
            placeholder="Nhập mã đơn nhập..."
            onChange={(e) => (searchRef.current.importCode = e.target.value)}
            className="w-full pt-3 "
          />
          <label
            htmlFor="search-code"
            className="absolute left-3 -top-2 bg-background px-2 text-xs font-medium text-muted-foreground "
          >
            Mã đơn nhập
          </label>
        </div>
        <div className="relative min-w-0 col-span-3 lg:max-w-xs">
          <Input
            id="search-codeSku"
            placeholder="Nhập mã SKU..."
            onChange={(e) => (searchRef.current.skuCode = e.target.value)}
            className="w-full pt-3 "
          />
          <label
            htmlFor="search-code"
            className="absolute left-3 -top-2 bg-background px-2 text-xs font-medium text-muted-foreground "
          >
            Mã SKU
          </label>
        </div>

        <div className="col-span-5 flex  justify-around">
          <div className="relative min-w-0  lg:max-w-xs">
            <div className="relative">
              <Input
                placeholder="dd/mm/yyyy"
                value={startDateInput}
                onChange={handleStartDateInputChange}
                onKeyDown={(e) => {
                  if (
                    !/[\d/]/.test(e.key) &&
                    ![
                      "Backspace",
                      "Delete",
                      "ArrowLeft",
                      "ArrowRight",
                      "Tab",
                    ].includes(e.key)
                  ) {
                    e.preventDefault();
                  }
                }}
                className="pr-10 pt-3"
              />
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  >
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={handleStartDateSelect}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <label className="absolute left-3 -top-2 bg-background px-2 text-xs font-medium text-muted-foreground">
              Ngày bắt đầu
            </label>
          </div>
          <div className="relative min-w-0  lg:max-w-xs">
            <div className="relative">
              <Input
                placeholder="dd/mm/yyyy"
                value={endDateInput}
                onChange={handleEndDateInputChange}
                onKeyDown={(e) => {
                  if (
                    !/[\d/]/.test(e.key) &&
                    ![
                      "Backspace",
                      "Delete",
                      "ArrowLeft",
                      "ArrowRight",
                      "Tab",
                    ].includes(e.key)
                  ) {
                    e.preventDefault();
                  }
                }}
                className="pr-10 pt-3"
              />
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  >
                    <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={handleEndDateSelect}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <label className="absolute left-3 -top-2 bg-background px-2 text-xs font-medium text-muted-foreground">
              Ngày kết thúc
            </label>
          </div>
        </div>

        <Button
          onClick={handleSearch}
          className="flex items-center gap-1 col-span-1 px-4 cursor-pointer"
        >
          <Search className="h-4 w-4" />
          <span className="text-sm"> Tìm</span>
        </Button>
      </div>
    </div>
  );
}
