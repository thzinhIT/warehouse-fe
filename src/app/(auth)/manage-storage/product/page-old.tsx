"use client";
import { DataTable } from "@/components/common/table/data-table";
import SidebarHeader from "@/components/layout/nav/sidebar-header";
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
import { Search, RotateCcw, Plus, FileDown, RefreshCw } from "lucide-react";
import { useState } from "react";
import { getProductColumns } from "@/components/common/manage-storage/product/product-columns";

// Mock data for demonstration
const mockProducts = [
  {
    id: 1,
    sku: "80",
    skuCode: "80",
    itemCount: 7,
    name: "Sản phẩm A",
    size: "M",
    color: "Đỏ",
    type: "Áo",
    unitVolume: 150,
  },
  {
    id: 2,
    sku: "66",
    skuCode: "66", 
    itemCount: 6,
    name: "Sản phẩm B",
    size: "L",
    color: "Xanh",
    type: "Quần",
    unitVolume: 200,
  },
  {
    id: 3,
    sku: "78",
    skuCode: "78",
    itemCount: 35,
    name: "Sản phẩm C",
    size: "S",
    color: "Vàng",
    type: "Áo",
    unitVolume: 100,
  },
  {
    id: 4,
    sku: "27",
    skuCode: "27",
    itemCount: 24,
    name: "Sản phẩm D", 
    size: "XL",
    color: "Đen",
    type: "Quần",
    unitVolume: 250,
  },
  {
    id: 5,
    sku: "72",
    skuCode: "72",
    itemCount: 73,
    name: "Sản phẩm E",
    size: "M",
    color: "Trắng",
    type: "Áo",
    unitVolume: 180,
  },
  {
    id: 6,
    sku: "46",
    skuCode: "46",
    itemCount: 56,
    name: "Sản phẩm F",
    size: "L",
    color: "Xanh",
    type: "Quần",
    unitVolume: 220,
  },
  {
    id: 7,
    sku: "95",
    skuCode: "95",
    itemCount: 8,
    name: "Sản phẩm G",
    size: "S",
    color: "Hồng",
    type: "Áo",
    unitVolume: 120,
  },
];

const ProductManagementPage = () => {
  const [searchFilters, setSearchFilters] = useState({
    sku: "",
    size: "",
    color: "",
    type: "",
    unitVolume: [100, 300],
  });
  
  const [filteredData, setFilteredData] = useState(mockProducts);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      let filtered = mockProducts;
      
      if (searchFilters.sku) {
        filtered = filtered.filter(product => 
          product.sku.toLowerCase().includes(searchFilters.sku.toLowerCase()) ||
          product.name.toLowerCase().includes(searchFilters.sku.toLowerCase())
        );
      }
      
      if (searchFilters.size && searchFilters.size !== "all") {
        filtered = filtered.filter(product => product.size === searchFilters.size);
      }
      
      if (searchFilters.color && searchFilters.color !== "all") {
        filtered = filtered.filter(product => product.color === searchFilters.color);
      }
      
      if (searchFilters.type && searchFilters.type !== "all") {
        filtered = filtered.filter(product => product.type === searchFilters.type);
      }
      
      // Filter by unit volume range
      filtered = filtered.filter(product => 
        product.unitVolume >= searchFilters.unitVolume[0] && 
        product.unitVolume <= searchFilters.unitVolume[1]
      );
      
      setFilteredData(filtered);
      setIsSearching(false);
    }, 500);
  };

  const handleClearSearch = () => {
    setSearchFilters({
      sku: "",
      size: "",
      color: "",
      type: "",
      unitVolume: [100, 300],
    });
    setFilteredData(mockProducts);
  };

  const handleRefresh = () => {
    setFilteredData(mockProducts);
  };

  const handleExportExcel = () => {
    // TODO: Implement Excel export
  };

  const handleAddProduct = () => {
    // TODO: Implement add product modal
  };

  const columns = getProductColumns();

  return (
    <div className="h-full flex flex-col">
      <SidebarHeader title="Quản lý sản phẩm" />
      
      <div className="flex-1 p-4 space-y-6">
        {/* Search Filters Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Bộ lọc tìm kiếm</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="sku" className="text-sm font-medium">
                  Mã SKU
                </Label>
                <Input
                  id="sku"
                  placeholder="Nhập mã SKU..."
                  value={searchFilters.sku}
                  onChange={(e) => 
                    setSearchFilters(prev => ({ ...prev, sku: e.target.value }))
                  }
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="size" className="text-sm font-medium">
                  Size
                </Label>
                <Select
                  value={searchFilters.size}
                  onValueChange={(value) => 
                    setSearchFilters(prev => ({ ...prev, size: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="S">S</SelectItem>
                    <SelectItem value="M">M</SelectItem>
                    <SelectItem value="L">L</SelectItem>
                    <SelectItem value="XL">XL</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="color" className="text-sm font-medium">
                  Color
                </Label>
                <Select
                  value={searchFilters.color}
                  onValueChange={(value) => 
                    setSearchFilters(prev => ({ ...prev, color: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn màu" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="Đỏ">Đỏ</SelectItem>
                    <SelectItem value="Xanh">Xanh</SelectItem>
                    <SelectItem value="Vàng">Vàng</SelectItem>
                    <SelectItem value="Đen">Đen</SelectItem>
                    <SelectItem value="Trắng">Trắng</SelectItem>
                    <SelectItem value="Hồng">Hồng</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="type" className="text-sm font-medium">
                  Type
                </Label>
                <Select
                  value={searchFilters.type}
                  onValueChange={(value) => 
                    setSearchFilters(prev => ({ ...prev, type: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn loại" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="Áo">Áo</SelectItem>
                    <SelectItem value="Quần">Quần</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Unit Volume Range */}
            <div className="grid gap-3 col-span-full">
              <Label className="text-sm font-medium">
                Unit volume: {searchFilters.unitVolume[0]} - {searchFilters.unitVolume[1]}
              </Label>
              <div className="flex gap-4 items-center px-2">
                <div className="flex flex-col gap-1">
                  <Label className="text-xs text-gray-500">Min</Label>
                  <Input
                    type="number"
                    min={50}
                    max={500}
                    value={searchFilters.unitVolume[0]}
                    onChange={(e) => {
                      const newValue = Number(e.target.value);
                      setSearchFilters(prev => ({ 
                        ...prev, 
                        unitVolume: [newValue, prev.unitVolume[1]]
                      }));
                    }}
                    className="w-24"
                  />
                </div>
                <span className="text-gray-400">đến</span>
                <div className="flex flex-col gap-1">
                  <Label className="text-xs text-gray-500">Max</Label>
                  <Input
                    type="number"
                    min={50}
                    max={500}
                    value={searchFilters.unitVolume[1]}
                    onChange={(e) => {
                      const newValue = Number(e.target.value);
                      setSearchFilters(prev => ({ 
                        ...prev, 
                        unitVolume: [prev.unitVolume[0], newValue]
                      }));
                    }}
                    className="w-24"
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-4">
              <Button 
                onClick={handleSearch}
                disabled={isSearching}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isSearching ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Search className="w-4 h-4 mr-2" />
                )}
                Tìm kiếm
              </Button>
              <Button 
                variant="outline" 
                onClick={handleClearSearch}
                className="border-gray-300"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Làm mới
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Table Actions and Data */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg font-semibold">
                Danh sách sản phẩm ({filteredData.length})
              </CardTitle>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={handleExportExcel}
                  className="border-gray-300"
                >
                  <FileDown className="w-4 h-4 mr-2" />
                  Xuất danh sách
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleRefresh}
                  className="border-gray-300"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Làm mới
                </Button>
                <Button 
                  onClick={handleAddProduct}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Thêm mới
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <DataTable 
              columns={columns} 
              data={filteredData}
              showToolbar={false}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductManagementPage;
