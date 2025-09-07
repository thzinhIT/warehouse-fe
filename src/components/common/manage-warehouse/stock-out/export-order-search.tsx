import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

type SearchParams = {
  exportCode?: string;
  skuCode?: string;
  startDate?: string;
  endDate?: string;
};

type ExportOrderSearchProps = {
  onSearch: (params: SearchParams) => void;
  onClear: () => void;
  onRefresh: () => void;
  isSearching: boolean;
  isPending: boolean;
};

export function ExportOrderSearch({
  onSearch,
  onClear,
  onRefresh,
  isSearching,
  isPending,
}: ExportOrderSearchProps) {
  const [searchParams, setSearchParams] = useState<SearchParams>({});

  const handleSearch = () => {
    onSearch(searchParams);
  };

  const handleClear = () => {
    setSearchParams({});
    onClear();
  };

  const handleInputChange = (key: keyof SearchParams, value: string) => {
    setSearchParams((prev) => ({
      ...prev,
      [key]: value || undefined,
    }));
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-lg">Tìm kiếm đơn xuất</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="export-code-search">Mã đơn xuất</Label>
            <Input
              id="export-code-search"
              placeholder="Input text"
              value={searchParams.exportCode || ""}
              onChange={(e) => handleInputChange("exportCode", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sku-code-search">Mã SKU</Label>
            <Input
              id="sku-code-search"
              placeholder="Input text"
              value={searchParams.skuCode || ""}
              onChange={(e) => handleInputChange("skuCode", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="export-date-search">Ngày xuất kho</Label>
            <Input
              id="export-date-search"
              type="date"
              value={searchParams.startDate || ""}
              onChange={(e) => handleInputChange("startDate", e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleSearch}
            disabled={isPending}
            className="bg-[#8B5CF6] hover:bg-[#7C3AED] text-white px-6"
          >
            {isPending ? "Đang tìm..." : "Tìm kiếm"}
          </Button>

          <Button
            variant="outline"
            onClick={handleClear}
            disabled={isPending}
            className="px-6"
          >
            Làm mới
          </Button>
        </div>

        {isSearching && (
          <div className="text-sm text-muted-foreground">
            Hiển thị kết quả tìm kiếm. Nhấn &quot;Làm mới&quot; để xem tất cả dữ
            liệu.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
