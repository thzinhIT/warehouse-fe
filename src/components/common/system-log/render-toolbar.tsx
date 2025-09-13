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

import toast from "react-hot-toast";
type TLogSearch = {
  date: string;
};
export default function TableToolbarLog({
  searchLog,
}: {
  readonly searchLog: (date: string) => void;
}) {
  const [startDate, setStartDate] = React.useState<Date>(new Date());

  const [startDateInput, setStartDateInput] = React.useState(
    format(new Date(), "dd/MM/yyyy")
  );
  const searchRef = React.useRef<TLogSearch>({
    date: format(new Date(), "dd/MM/yyyy"),
  });

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
  const handleStartDateSelect = (date: Date | undefined) => {
    if (date) {
      searchRef.current.date = format(date, "dd/MM/yyyy");
      setStartDateInput(format(date, "dd/MM/yyyy"));
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

  const handleSearch = () => {
    if (!searchRef.current.date) {
      toast.error("Vui lòng xem lại ngày cần tìm");
      return;
    }
    searchLog(format(searchRef.current.date, "yyyy-MM-dd"));
  };

  return (
    <div className="flex gap-2 items-center mt-5 ">
      <div className="grid grid-cols-12 gap-2 w-full px-2 ">
        <div className="col-span-2 flex  ">
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
