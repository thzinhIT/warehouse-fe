import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

type SearchParams = {
  exportCode?: string;
  skuCode?: string;
  startDate?: string;
  endDate?: string;
};

type ExportOrderSearchProps = {
  onSearch: (params: SearchParams) => void;
  isSearching: boolean;
  isPending: boolean;
};

export function ExportOrderSearch({
  onSearch,
  isSearching,
  isPending,
}: ExportOrderSearchProps) {
  const [searchParams, setSearchParams] = useState<SearchParams>({});

  const handleSearch = () => {
    onSearch(searchParams);
  };

  const handleInputChange = (key: keyof SearchParams, value: string) => {
    setSearchParams((prev) => ({
      ...prev,
      [key]: value || undefined,
    }));
  };

  return (
    <div className="p-4 rounded-lg mb-4">
      <h3 className="text-lg font-semibold mb-4">Tìm kiếm đơn xuất</h3>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
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

          <div className="space-y-2">
            <Button
              onClick={handleSearch}
              disabled={isPending}
              className="w-full text-white px-6"
              style={{
                backgroundColor: "color-mix(in oklab, var(--ring) 50%, blue)",
                borderColor: "color-mix(in oklab, var(--ring) 50%, blue)",
              }}
            >
              {isPending ? "Đang tìm..." : "Tìm kiếm"}
            </Button>
          </div>
        </div>

        {isSearching && (
          <div className="text-sm text-muted-foreground">
            Hiển thị kết quả tìm kiếm.
          </div>
        )}
      </div>
    </div>
  );
}
