"use client";
import { useState } from "react";
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
import { CirclePlus, FileSpreadsheet, RotateCcw, Search } from "lucide-react";
import getColumnsProduct from "@/components/common/manage-storage/product-columns";

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

type TProduct = {
  id: number;
  sku: string;
  skuCode: string;
  itemCount: number;
  name: string;
  size: string;
  color: string;
  type: string;
  unitVolume: number;
};

const ProductManagementPage = () => {
  const [searchFilters, setSearchFilters] = useState({
    sku: "",
    size: "",
    color: "",
    type: "",
    minVolume: "",
    maxVolume: "",
  });

  const [filteredData, setFilteredData] = useState(mockProducts);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    setIsSearching(true);
    // Simulate API call
    setTimeout(() => {
      const filtered = mockProducts.filter((product) => {
        return (
          (!searchFilters.sku || product.sku.includes(searchFilters.sku)) &&
          (!searchFilters.size || product.size === searchFilters.size) &&
          (!searchFilters.color ||
            product.color.includes(searchFilters.color)) &&
          (!searchFilters.type || product.type === searchFilters.type) &&
          (!searchFilters.minVolume ||
            product.unitVolume >= Number(searchFilters.minVolume)) &&
          (!searchFilters.maxVolume ||
            product.unitVolume <= Number(searchFilters.maxVolume))
        );
      });
      setFilteredData(filtered);
      setIsSearching(false);
    }, 1000);
  };

  const handleClearSearch = () => {
    setSearchFilters({
      sku: "",
      size: "",
      color: "",
      type: "",
      minVolume: "",
      maxVolume: "",
    });
    setFilteredData(mockProducts);
  };

  const handleRefresh = () => {
    setFilteredData(mockProducts);
  };

  const handleExportExcel = () => {};

  const handleAddProduct = () => {};

  const handleViewDetail = (product: TProduct) => {};

  const columns = getColumnsProduct({ handleViewDetail });

  return (
    <div className="h-full flex flex-col">
      <SidebarHeader title="Quản lý sản phẩm" />

      <div className="flex justify-between items-center px-2 mt-2">
        <h1 className="text-lg font-bold text-black">Danh sách sản phẩm</h1>
        <div className="flex gap-2">
          <Button
            className="cursor-pointer bg-green-600 hover:bg-green-700 flex items-center"
            onClick={handleExportExcel}
          >
            <FileSpreadsheet size={20} />
            <span>Xuất Excel</span>
          </Button>
          <Button
            className="cursor-pointer bg-blue-600 hover:bg-blue-700 flex items-center"
            onClick={handleAddProduct}
          >
            <CirclePlus size={20} />
            <span>Thêm sản phẩm</span>
          </Button>
        </div>
      </div>

      {/* Search Section */}
      <div className="px-2 mt-4">
        <div className="space-y-4">
          <h2 className="text-base font-semibold">Tìm kiếm sản phẩm</h2>
          <div className="grid gap-4 grid-cols-3">
            <div className="grid gap-2">
              <Label htmlFor="sku">Mã SKU</Label>
              <Input
                id="sku"
                value={searchFilters.sku}
                onChange={(e) =>
                  setSearchFilters({ ...searchFilters, sku: e.target.value })
                }
                placeholder="Nhập mã SKU"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="size">Kích cỡ</Label>
              <Select
                value={searchFilters.size}
                onValueChange={(value) =>
                  setSearchFilters({ ...searchFilters, size: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn kích cỡ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="S">S</SelectItem>
                  <SelectItem value="M">M</SelectItem>
                  <SelectItem value="L">L</SelectItem>
                  <SelectItem value="XL">XL</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="color">Màu sắc</Label>
              <Input
                id="color"
                value={searchFilters.color}
                onChange={(e) =>
                  setSearchFilters({ ...searchFilters, color: e.target.value })
                }
                placeholder="Nhập màu sắc"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Loại sản phẩm</Label>
              <Select
                value={searchFilters.type}
                onValueChange={(value) =>
                  setSearchFilters({ ...searchFilters, type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn loại" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Áo">Áo</SelectItem>
                  <SelectItem value="Quần">Quần</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="minVolume">Dung tích từ</Label>
              <Input
                id="minVolume"
                type="number"
                value={searchFilters.minVolume}
                onChange={(e) =>
                  setSearchFilters({
                    ...searchFilters,
                    minVolume: e.target.value,
                  })
                }
                placeholder="Dung tích tối thiểu"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="maxVolume">Dung tích đến</Label>
              <Input
                id="maxVolume"
                type="number"
                value={searchFilters.maxVolume}
                onChange={(e) =>
                  setSearchFilters({
                    ...searchFilters,
                    maxVolume: e.target.value,
                  })
                }
                placeholder="Dung tích tối đa"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSearch} disabled={isSearching}>
              <Search size={16} className="mr-2" />
              {isSearching ? "Đang tìm..." : "Tìm kiếm"}
            </Button>
            <Button variant="outline" onClick={handleClearSearch}>
              <RotateCcw size={16} className="mr-2" />
              Xóa bộ lọc
            </Button>
            <Button variant="outline" onClick={handleRefresh}>
              <RotateCcw size={16} className="mr-2" />
              Làm mới
            </Button>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="flex-1 px-2 mt-4">
        <DataTable columns={columns} data={filteredData} showToolbar={false} />
      </div>
    </div>
  );
};

export default ProductManagementPage;
