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
import { getErrorProductColumns } from "@/components/common/manage-storage/error-product/error-product-columns";
import {
  useErrorProducts,
  useErrorProductSearchMutation,
} from "@/hooks/manage-storage/use-error-products";
import {
  ErrorProductSearchFilters,
  ErrorProduct,
} from "@/lib/types/error-product.types";
import { LoadingPage } from "@/components/common/loading-page";
import toast from "react-hot-toast";
import { ModalErrorProductDetail } from "@/components/common/manage-storage/error-product/modal-error-product-detail";
import { ModalAddErrorProduct } from "@/components/common/manage-storage/error-product/modal-add-error-product";

const ErrorProductManagementPage = () => {
  const [searchFilters, setSearchFilters] = useState<ErrorProductSearchFilters>(
    {
      skuCode: "",
      size: "",
      color: "",
      type: "",
      minVolume: "",
      maxVolume: "",
    }
  );

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [searchResults, setSearchResults] = useState<ErrorProduct[]>([]);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Fetch all error products (default view)
  const {
    data: productsResponse,
    isLoading: isLoadingProducts,
    isError: isProductsError,
    error: productsError,
    refetch: refetchProducts,
  } = useErrorProducts({}, currentPage, pageSize);

  // Search mutation
  const searchMutation = useErrorProductSearchMutation();

  // Determine which data to use
  const products = isSearchMode ? searchResults : productsResponse?.data || [];
  const isLoading = isSearchMode ? searchMutation.isPending : isLoadingProducts;
  const isError = isSearchMode ? searchMutation.isError : isProductsError;
  const error = isSearchMode ? searchMutation.error : productsError;

  // For display purposes
  const totalItems = products.length;
  const totalPages = 1; // Since we don't have pagination info from API
  const isSearching = isSearchMode && searchMutation.isPending;

  // Check if we have any search criteria
  const hasSearchCriteria = () => {
    return Object.values(searchFilters).some(
      (value) => value && value.trim() !== ""
    );
  };

  const handleSearch = async () => {
    const hasFilters = hasSearchCriteria();

    if (!hasFilters) {
      toast.error("Vui lòng nhập ít nhất một tiêu chí tìm kiếm");
      return;
    }

    // Don't mix up the search term - let the service handle individual filters
    const searchTerm = searchFilters.skuCode || ""; // Only use skuCode for searchTerm

    setIsSearchMode(true);
    setCurrentPage(1);

    try {
      const result = await searchMutation.mutateAsync({
        searchTerm,
        filters: searchFilters,
      });

      setSearchResults(result.data || []);

      if (result.data && result.data.length > 0) {
        toast.success(`Tìm thấy ${result.data.length} sản phẩm lỗi`);
      } else {
        toast.success(
          "Không tìm thấy sản phẩm lỗi nào phù hợp với tiêu chí tìm kiếm"
        );
      }
    } catch (err: unknown) {
      console.error("Search error:", err);

      // Check if it's a collation error
      const errorResponse = err as {
        response?: { data?: { message?: string; code?: number } };
      };
      if (
        errorResponse?.response?.data?.message?.includes("collation") ||
        errorResponse?.response?.data?.code === 9999
      ) {
        toast.error(
          "Lỗi cấu hình database. Vui lòng liên hệ admin để sửa collation."
        );
      } else {
        toast.error("Có lỗi xảy ra khi tìm kiếm");
      }
    }
  };

  const handleClearSearch = () => {
    setSearchFilters({
      skuCode: "",
      size: "",
      color: "",
      type: "",
      minVolume: "",
      maxVolume: "",
    });
    setSearchResults([]);
    setIsSearchMode(false);
    setCurrentPage(1);
    refetchProducts(); // Reload all products
  };

  const handleRefresh = async () => {
    try {
      if (isSearchMode) {
        // Re-run the search
        await handleSearch();
      } else {
        await refetchProducts();
      }
      toast.success("Làm mới dữ liệu thành công!");
    } catch (err) {
      toast.error("Có lỗi xảy ra khi làm mới dữ liệu");
      console.error("Refresh error:", err);
    }
  };

  const handleExportExcel = () => {
    // TODO: Implement Excel export functionality
    toast.success("Chức năng xuất Excel sẽ được triển khai sớm!");
  };

  const handleAddProduct = () => {
    setIsAddModalOpen(true);
  };

  const handleViewDetail = (product: ErrorProduct) => {
    if (product.id) {
      setSelectedProductId(product.id);
      setIsDetailModalOpen(true);
    } else {
      toast.error("Không thể xem chi tiết: Không có ID sản phẩm");
    }
  };

  const columns = getErrorProductColumns({ onView: handleViewDetail });

  // Show loading spinner
  if (isLoading) {
    return <LoadingPage />;
  }

  // Show error message
  if (isError) {
    return (
      <div className="min-h-screen p-6 space-y-6 overflow-y-auto">
        <SidebarHeader title="Quản lý sản phẩm lỗi" />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-500 text-lg mb-4">
              Có lỗi xảy ra khi tải dữ liệu sản phẩm lỗi
            </p>
            <p className="text-gray-600 mb-4">
              {error instanceof Error ? error.message : "Lỗi không xác định"}
            </p>
            <Button onClick={handleRefresh}>
              <RotateCcw size={16} className="mr-2" />
              Thử lại
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  space-y-6 overflow-y-auto">
      <SidebarHeader title="Quản lý sản phẩm lỗi" />

      <div className="flex justify-between items-center mt-2 p-2">
        <div className="flex items-center gap-3">
          {isSearchMode && (
            <span className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded-full">
              Kết quả tìm kiếm
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            className="cursor-pointer bg-blue-600 hover:bg-blue-700 flex items-center"
            onClick={handleAddProduct}
          >
            <CirclePlus size={20} />
            <span>Thêm sản phẩm lỗi</span>
          </Button>
        </div>
      </div>

      {/* Search Section */}
      <div className="mt-4 p-2">
        <div className="space-y-4">
          {/* <h2 className="text-base font-semibold">Tìm kiếm sản phẩm lỗi</h2> */}
          <div className="space-y-4">
            {/* Row 1: Mã SKU, Kích cỡ, Màu sắc, Tìm kiếm */}
            <div className="grid gap-4 grid-cols-7">
              <div className="grid gap-2 col-span-2">
                <Label htmlFor="sku">Mã SKU</Label>
                <Input
                  id="sku"
                  value={searchFilters.skuCode}
                  onChange={(e) =>
                    setSearchFilters({
                      ...searchFilters,
                      skuCode: e.target.value,
                    })
                  }
                  placeholder="Nhập mã SKU"
                />
              </div>
              <div className="grid gap-2 col-span-2">
                <Label htmlFor="size">Kích cỡ</Label>
                <Select
                  value={searchFilters.size}
                  onValueChange={(value) =>
                    setSearchFilters({ ...searchFilters, size: value })
                  }
                >
                  <SelectTrigger className="w-full">
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
              <div className="grid gap-2 col-span-2">
                <Label htmlFor="color">Màu sắc</Label>
                <Input
                  id="color"
                  value={searchFilters.color}
                  onChange={(e) =>
                    setSearchFilters({
                      ...searchFilters,
                      color: e.target.value,
                    })
                  }
                  placeholder="Nhập màu sắc"
                />
              </div>
              <div className="grid gap-2 col-span-1">
                <Label>&nbsp;</Label>
                <Button
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="w-full text-white"
                  style={{
                    backgroundColor:
                      "color-mix(in oklab, var(--ring) 50%, blue)",
                    borderColor: "color-mix(in oklab, var(--ring) 50%, blue)",
                  }}
                >
                  <Search size={16} className="mr-2" />
                  {isSearching ? "Đang tìm..." : "Tìm kiếm"}
                </Button>
              </div>
            </div>

            {/* Row 2: Loại sản phẩm, Dung tích từ, Dung tích đến */}
            <div className="grid gap-4 grid-cols-7">
              <div className="grid gap-2 col-span-2">
                <Label htmlFor="type">Loại sản phẩm</Label>
                <Select
                  value={searchFilters.type}
                  onValueChange={(value) =>
                    setSearchFilters({ ...searchFilters, type: value })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Chọn loại" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Áo">Áo</SelectItem>
                    <SelectItem value="Quần">Quần</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2 col-span-2">
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
              <div className="grid gap-2 col-span-2">
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
              <div className="col-span-1">
                {/* Empty space to align with search button column */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="flex-1 mt-4">
        <DataTable columns={columns} data={products} showToolbar={false} />

        {/* Pagination info */}
        {products.length > 0 && (
          <div className="mt-4 text-sm text-gray-600 text-center">
            Hiển thị {products.length} sản phẩm lỗi trên trang {currentPage} /{" "}
            {totalPages}
            {totalItems > 0 && ` (Tổng cộng: ${totalItems} sản phẩm lỗi)`}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && products.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg mb-2">
              Không có sản phẩm lỗi nào
            </p>
            <p className="text-gray-400">
              Vui lòng thử lại với các tiêu chí tìm kiếm khác
            </p>
          </div>
        )}
      </div>

      {/* Error Product Detail Modal */}
      <ModalErrorProductDetail
        open={isDetailModalOpen}
        setOpen={setIsDetailModalOpen}
        productId={selectedProductId}
      />

      {/* Add Error Product Modal */}
      <ModalAddErrorProduct open={isAddModalOpen} setOpen={setIsAddModalOpen} />
    </div>
  );
};

export default ErrorProductManagementPage;
