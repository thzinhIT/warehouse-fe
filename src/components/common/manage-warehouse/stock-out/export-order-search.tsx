import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, RefreshCw, X } from "lucide-react";
import { useState } from "react";

type SearchParams = {
  exportCode?: string;
  skuCode?: string;
  productName?: string;
  exportDate?: string;
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
    setSearchParams(prev => ({
      ...prev,
      [key]: value || undefined
    }));
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-lg">Tìm kiếm đơn xuất</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="export-code-search">Mã đơn xuất</Label>
            <Input
              id="export-code-search"
              placeholder="Nhập mã đơn xuất"
              value={searchParams.exportCode || ''}
              onChange={(e) => handleInputChange('exportCode', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="sku-code-search">Mã SKU</Label>
            <Input
              id="sku-code-search"
              placeholder="Nhập mã SKU"
              value={searchParams.skuCode || ''}
              onChange={(e) => handleInputChange('skuCode', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="product-name-search">Tên sản phẩm</Label>
            <Input
              id="product-name-search"
              placeholder="Nhập tên sản phẩm"
              value={searchParams.productName || ''}
              onChange={(e) => handleInputChange('productName', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="export-date-search">Ngày xuất</Label>
            <Input
              id="export-date-search"
              type="date"
              value={searchParams.exportDate || ''}
              onChange={(e) => handleInputChange('exportDate', e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button 
            onClick={handleSearch} 
            disabled={isPending}
            className="flex items-center gap-2"
          >
            <Search size={16} />
            {isPending ? 'Đang tìm...' : 'Tìm kiếm'}
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleClear}
            disabled={isPending}
            className="flex items-center gap-2"
          >
            <X size={16} />
            Xóa bộ lọc
          </Button>
          
          <Button 
            variant="outline" 
            onClick={onRefresh}
            disabled={isPending}
            className="flex items-center gap-2"
          >
            <RefreshCw size={16} />
            Làm mới
          </Button>
        </div>
        
        {isSearching && (
          <div className="text-sm text-muted-foreground">
            Hiển thị kết quả tìm kiếm. Nhấn &quot;Xóa bộ lọc&quot; để xem tất cả dữ liệu.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
