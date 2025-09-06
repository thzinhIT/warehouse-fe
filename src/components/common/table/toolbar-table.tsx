"use client";

import * as React from "react";
import { CalendarIcon, Search } from "lucide-react";
import { format, parse, isValid } from "date-fns";
import { GrSearchAdvanced } from "react-icons/gr";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function TableToolbar() {
  const [searchCode, setSearchCode] = React.useState("");
  const [startDate, setStartDate] = React.useState<Date>(new Date());
  const [endDate, setEndDate] = React.useState<Date>(new Date());
  const [startDateInput, setStartDateInput] = React.useState(
    format(new Date(), "dd/MM/yyyy")
  );
  const [endDateInput, setEndDateInput] = React.useState(
    format(new Date(), "dd/MM/yyyy")
  );
  const [filter1, setFilter1] = React.useState("");
  const [filter2, setFilter2] = React.useState("");

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
      }
    }
  };

  const handleStartDateSelect = (date: Date | undefined) => {
    if (date) {
      setStartDate(date);
      setStartDateInput(format(date, "dd/MM/yyyy"));
    }
  };

  const handleEndDateSelect = (date: Date | undefined) => {
    if (date) {
      setEndDate(date);
      setEndDateInput(format(date, "dd/MM/yyyy"));
    }
  };

  const handleSearch = () => {};

  const handleAdvancedFilter = () => {};

  const handleReset = () => {
    setSearchCode("");
    const today = new Date();
    setStartDate(today);
    setEndDate(today);
    setStartDateInput(format(today, "dd/MM/yyyy"));
    setEndDateInput(format(today, "dd/MM/yyyy"));
    setFilter1("");
    setFilter2("");
  };

  return (
    <div className="flex gap-2 items-center mt-5 ">
      <div className="grid grid-cols-12 gap-2  ">
        <div className="relative min-w-0 col-span-3 lg:max-w-xs">
          <Input
            id="search-code"
            placeholder="Nhập mã cần tìm..."
            value={searchCode}
            onChange={(e) => setSearchCode(e.target.value)}
            className="w-full pt-3 "
          />
          <label
            htmlFor="search-code"
            className="absolute left-3 -top-2 bg-background px-2 text-xs font-medium text-muted-foreground "
          >
            Mã tìm kiếm
          </label>
        </div>
        <div className="relative min-w-0 col-span-2 lg:max-w-xs">
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
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <label className="absolute left-3 -top-2 bg-background px-2 text-xs font-medium text-muted-foreground">
            Ngày bắt đầu
          </label>
        </div>
        <div className="relative min-w-0 col-span-2 lg:max-w-xs">
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
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <label className="absolute left-3 -top-2 bg-background px-2 text-xs font-medium text-muted-foreground">
            Ngày kết thúc
          </label>
        </div>
        <div className="relative min-w-0 col-span-2 lg:max-w-xs">
          <Select value={filter1} onValueChange={setFilter1}>
            <SelectTrigger className="pt-3 w-full">
              <SelectValue placeholder="Chọn trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Hoạt động</SelectItem>
              <SelectItem value="inactive">Không hoạt động</SelectItem>
              <SelectItem value="pending">Chờ xử lý</SelectItem>
              <SelectItem value="completed">Hoàn thành</SelectItem>
            </SelectContent>
          </Select>
          <label className="absolute left-3 -top-2 bg-background px-2 text-xs font-medium text-muted-foreground">
            Trạng thái
          </label>
        </div>

        {/* Bộ lọc 2 */}
        <div className="relative min-w-0 col-span-2 lg:max-w-xs">
          <Select value={filter2} onValueChange={setFilter2}>
            <SelectTrigger className="pt-3 w-full">
              <SelectValue placeholder="Chọn loại" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="type1">Loại 1</SelectItem>
              <SelectItem value="type2">Loại 2</SelectItem>
              <SelectItem value="type3">Loại 3</SelectItem>
              <SelectItem value="type4">Loại 4</SelectItem>
            </SelectContent>
          </Select>
          <label className="absolute left-3 -top-2 bg-background px-2 text-xs font-medium text-muted-foreground">
            Loại
          </label>
        </div>
        <Button
          onClick={handleSearch}
          className="flex items-center gap-1 col-span-1 px-4 cursor-pointer"
        >
          <Search className="h-4 w-4" />
          <span className="text-sm"> Tìm</span>
        </Button>
      </div>
      <div>
        <Button className="bg-background hover:bg-gray-100 border border-gray-300 flex items-center cursor-pointer">
          <GrSearchAdvanced className="text-gray-800" />
          <span className="text-gray-600">Nâng cao</span>
        </Button>
      </div>
    </div>
  );
}
