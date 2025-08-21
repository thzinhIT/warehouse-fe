import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExportOrderSearchRequest } from "@/lib/networking/client/manage-warehouse/service";
import { Search, X, RotateCcw } from "lucide-react";
import { useState } from "react";

interface ExportOrderSearchProps {
  onSearch: (filters: ExportOrderSearchRequest) => void;
  onClear: () => void;
  onRefresh: () => void;
  isSearching: boolean;
  isPending: boolean;
}

export const ExportOrderSearch = ({
  onSearch,
  onClear,
  onRefresh,
  isSearching,
  isPending,
}: ExportOrderSearchProps) => {
  const [filters, setFilters] = useState<ExportOrderSearchRequest>({
    source: null,
    status: null,
    createdBy: null,
    startDate: null,
    endDate: null,
  });

  const handleFilterChange = (
    key: keyof ExportOrderSearchRequest,
    value: string | null
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value || null,
    }));
  };

  const handleSearch = () => {
    // Clean filters - remove empty values
    const cleanFilters = Object.entries(filters).reduce((acc, [key, value]) => {
      if (value && value.trim() !== "") {
        acc[key as keyof ExportOrderSearchRequest] = value.trim();
      }
      return acc;
    }, {} as ExportOrderSearchRequest);

    onSearch(cleanFilters);
  };

  const handleClear = () => {
    setFilters({
      source: null,
      status: null,
      createdBy: null,
      startDate: null,
      endDate: null,
    });
    onClear();
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Search size={20} />
          Tìm kiếm đơn xuất
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
          {/* Source Filter */}
          <div className="space-y-2">
            <Label htmlFor="source">Nguồn</Label>
            <Select
              value={filters.source || "all"}
              onValueChange={(value) =>
                handleFilterChange("source", value === "all" ? null : value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn nguồn" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="manual">Manual</SelectItem>
                <SelectItem value="haravan">Haravan</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Status Filter */}
          <div className="space-y-2">
            <Label htmlFor="status">Trạng thái</Label>
            <Select
              value={filters.status || "all"}
              onValueChange={(value) =>
                handleFilterChange("status", value === "all" ? null : value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Chọn trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Created By Filter */}
          <div className="space-y-2">
            <Label htmlFor="createdBy">Người tạo</Label>
            <Input
              id="createdBy"
              placeholder="Nhập tên người tạo..."
              value={filters.createdBy || ""}
              onChange={(e) => handleFilterChange("createdBy", e.target.value)}
            />
          </div>

          {/* Start Date Filter */}
          <div className="space-y-2">
            <Label htmlFor="startDate">Từ ngày</Label>
            <Input
              id="startDate"
              type="date"
              value={filters.startDate || ""}
              onChange={(e) => handleFilterChange("startDate", e.target.value)}
            />
          </div>

          {/* End Date Filter */}
          <div className="space-y-2">
            <Label htmlFor="endDate">Đến ngày</Label>
            <Input
              id="endDate"
              type="date"
              value={filters.endDate || ""}
              onChange={(e) => handleFilterChange("endDate", e.target.value)}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            onClick={handleSearch}
            disabled={isPending}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Search size={16} className="mr-2" />
            {isPending ? "Đang tìm..." : "Tìm kiếm"}
          </Button>

          <Button variant="outline" onClick={handleClear} disabled={isPending}>
            <X size={16} className="mr-2" />
            Xóa bộ lọc
          </Button>

          <Button variant="outline" onClick={onRefresh} disabled={isPending}>
            <RotateCcw size={16} className="mr-2" />
            Làm mới
          </Button>
        </div>

        {/* Search Status Indicator */}
        {isSearching && (
          <div className="mt-2 text-sm text-gray-600">
            <span className="font-medium">Đang hiển thị kết quả tìm kiếm</span>
            {Object.values(filters).some((value) => value) && (
              <span> - Có bộ lọc được áp dụng</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
