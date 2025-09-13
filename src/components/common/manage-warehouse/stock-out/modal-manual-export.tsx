import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Minus, Plus, ChevronRight, ChevronLeft } from "lucide-react";
import { useState, useEffect } from "react";
import {
  useMoveToQueue,
  useMoveBackFromQueue,
  useExportWithRoute,
} from "@/hooks/manage-warehouse/use-manual-export";

export type TManualExportItem = {
  id: string;
  skuCode: string;
  productName: string;
  availableQuantity: number;
  selectedQuantity: number;
  isSelected: boolean;
};

export function ModalManualExport({
  open,
  setOpen,
  data,
  isLoading,
  onExport,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data?: TManualExportItem[];
  isLoading?: boolean;
  onExport?: (selectedItems: TManualExportItem[]) => void;
}) {
  const [leftItems, setLeftItems] = useState<TManualExportItem[]>(data || []);
  const [rightItems, setRightItems] = useState<TManualExportItem[]>([]);
  const [leftSearch, setLeftSearch] = useState("");
  const [rightSearch, setRightSearch] = useState("");
  const [selectedLeftItems, setSelectedLeftItems] = useState<string[]>([]);
  const [selectedRightItems, setSelectedRightItems] = useState<string[]>([]);

  // Use the move mutations
  const moveToQueueMutation = useMoveToQueue();
  const moveBackFromQueueMutation = useMoveBackFromQueue();
  const exportWithRouteMutation = useExportWithRoute();

  // Update left items when data changes
  useEffect(() => {
    if (data) {
      setLeftItems(
        data.map((item) => ({
          ...item,
          selectedQuantity: 0,
          isSelected: false,
        }))
      );
    }
  }, [data]);

  // Filter items based on search
  const filteredLeftItems = leftItems.filter(
    (item) =>
      item.skuCode.toLowerCase().includes(leftSearch.toLowerCase()) ||
      item.productName.toLowerCase().includes(leftSearch.toLowerCase())
  );

  const filteredRightItems = rightItems.filter(
    (item) =>
      item.skuCode.toLowerCase().includes(rightSearch.toLowerCase()) ||
      item.productName.toLowerCase().includes(rightSearch.toLowerCase())
  );

  // Update quantity for left table with validation
  const updateLeftQuantity = (id: string, change: number) => {
    setLeftItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(
            0,
            Math.min(item.availableQuantity, item.selectedQuantity + change)
          );
          return {
            ...item,
            selectedQuantity: newQuantity,
            isSelected: newQuantity > 0,
          };
        }
        return item;
      })
    );
  };

  // Set quantity directly for left table with validation
  const setLeftQuantityDirect = (id: string, value: string) => {
    const numValue = parseInt(value) || 0;
    setLeftItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          // If typed value exceeds available quantity, set to max available
          const newQuantity = Math.max(
            0,
            Math.min(item.availableQuantity, numValue)
          );
          return {
            ...item,
            selectedQuantity: newQuantity,
            isSelected: newQuantity > 0,
          };
        }
        return item;
      })
    );
  };

  // Update quantity for right table with validation
  const updateRightQuantity = (id: string, change: number) => {
    setRightItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(
            1,
            Math.min(item.availableQuantity, item.selectedQuantity + change)
          );
          return { ...item, selectedQuantity: newQuantity };
        }
        return item;
      })
    );
  };

  // Set quantity directly for right table with validation
  const setRightQuantityDirect = (id: string, value: string) => {
    const numValue = parseInt(value) || 1;
    setRightItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          // If typed value exceeds available quantity, set to max available
          const newQuantity = Math.max(
            1,
            Math.min(item.availableQuantity, numValue)
          );
          return { ...item, selectedQuantity: newQuantity };
        }
        return item;
      })
    );
  };

  // Move selected items from left to right
  const moveToRight = async () => {
    const itemsToMove = leftItems.filter(
      (item) => selectedLeftItems.includes(item.id) && item.selectedQuantity > 0
    );

    if (itemsToMove.length === 0) return;

    // Prepare API request
    const apiRequest = {
      items: itemsToMove.map((item) => ({
        sku: item.skuCode,
        quantity: item.selectedQuantity,
      })),
    };

    try {
      // Call the API to move items to queue
      await moveToQueueMutation.mutateAsync(apiRequest);

      // Update UI - move items to right table
      setRightItems((prev) => {
        const newItems = [...prev];
        itemsToMove.forEach((item) => {
          const existingIndex = newItems.findIndex(
            (existing) => existing.id === item.id
          );
          if (existingIndex >= 0) {
            newItems[existingIndex].selectedQuantity =
              (newItems[existingIndex].selectedQuantity || 0) +
              item.selectedQuantity;
          } else {
            newItems.push({ ...item, isSelected: true });
          }
        });
        return newItems;
      });

      // Reset selected quantities in left table for moved items
      setLeftItems((prev) =>
        prev.map((item) =>
          selectedLeftItems.includes(item.id)
            ? { ...item, selectedQuantity: 0, isSelected: false }
            : item
        )
      );

      setSelectedLeftItems([]);
    } catch (error) {
      // Error handling is done in the mutation
      console.error("Failed to move items to queue:", error);
    }
  };

  // Move selected items from right to left
  const moveToLeft = async () => {
    const itemsToMoveBack = rightItems.filter((item) =>
      selectedRightItems.includes(item.id)
    );

    if (itemsToMoveBack.length === 0) return;

    // Prepare API request
    const apiRequest = {
      items: itemsToMoveBack.map((item) => ({
        sku: item.skuCode,
        quantity: item.selectedQuantity,
      })),
    };

    try {
      // Call the API to move items back from queue
      await moveBackFromQueueMutation.mutateAsync(apiRequest);

      // Update UI - remove items from right table
      setRightItems((prev) =>
        prev.filter((item) => !selectedRightItems.includes(item.id))
      );

      setSelectedRightItems([]);
    } catch (error) {
      // Error handling is done in the mutation
      console.error("Failed to move items back from queue:", error);
    }
  };

  // Handle checkbox selection for left table
  const handleLeftSelection = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedLeftItems((prev) => [...prev, id]);
    } else {
      setSelectedLeftItems((prev) => prev.filter((itemId) => itemId !== id));
    }
  };

  // Handle checkbox selection for right table
  const handleRightSelection = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedRightItems((prev) => [...prev, id]);
    } else {
      setSelectedRightItems((prev) => prev.filter((itemId) => itemId !== id));
    }
  };

  // Handle export
  const handleExport = async () => {
    const itemsToExport = rightItems.filter(
      (item) => item.selectedQuantity > 0
    );

    if (itemsToExport.length === 0) return;

    // Prepare API request
    const apiRequest = {
      items: itemsToExport.map((item) => ({
        sku: item.skuCode,
        quantity: item.selectedQuantity,
      })),
    };

    try {
      // Call the export with route API
      await exportWithRouteMutation.mutateAsync(apiRequest);

      // Close modal and reset state after successful export
      handleCancel();

      if (onExport) {
        onExport(itemsToExport);
      }
    } catch (error) {
      // Error handling is done in the mutation
      console.error("Failed to export items:", error);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    setLeftItems(
      data?.map((item) => ({
        ...item,
        selectedQuantity: 0,
        isSelected: false,
      })) || []
    );
    setRightItems([]);
    setSelectedLeftItems([]);
    setSelectedRightItems([]);
    setLeftSearch("");
    setRightSearch("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTitle className="hidden"></DialogTitle>

      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <div className="flex gap-4 h-[70vh]">
          {/* Left Table - Available Items */}
          <div className="flex-1 flex flex-col">
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Phiếu xuất kho</h3>
              <Input
                placeholder="Search"
                value={leftSearch}
                onChange={(e) => setLeftSearch(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="flex-1 border rounded-lg overflow-hidden">
              {/* Table Header */}
              <div className="bg-gray-50 border-b">
                <div className="flex items-center px-3 py-2">
                  <div className="w-8"></div> {/* Checkbox space */}
                  <div className="flex-1 font-medium text-sm">Mã SKU</div>
                  <div className="w-32 font-medium text-sm text-center">
                    Số lượng
                  </div>
                </div>
              </div>

              {/* Table Body */}
              <div className="overflow-y-auto flex-1">
                {isLoading ? (
                  <div className="flex items-center justify-center h-32">
                    <div className="text-lg">Đang tải dữ liệu...</div>
                  </div>
                ) : filteredLeftItems.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    {leftSearch
                      ? "Không tìm thấy sản phẩm"
                      : "Không có sản phẩm"}
                  </div>
                ) : (
                  filteredLeftItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center px-3 py-2 border-b hover:bg-gray-50"
                    >
                      <Checkbox
                        checked={selectedLeftItems.includes(item.id)}
                        onCheckedChange={(checked) =>
                          handleLeftSelection(item.id, !!checked)
                        }
                        className="mr-3"
                      />
                      <div className="flex-1">
                        <div className="text-sm font-medium">
                          {item.skuCode}
                        </div>
                        <div className="text-xs text-gray-500">
                          {item.productName}
                        </div>
                      </div>
                      <div className="w-40 flex items-center justify-center gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateLeftQuantity(item.id, -1)}
                          disabled={item.selectedQuantity <= 0}
                          className="w-8 h-8 p-0"
                        >
                          <Minus size={14} />
                        </Button>
                        <Input
                          type="number"
                          value={item.selectedQuantity.toString()}
                          onChange={(e) =>
                            setLeftQuantityDirect(item.id, e.target.value)
                          }
                          className="w-20 h-8 text-center text-sm"
                          min={0}
                          max={item.availableQuantity}
                          placeholder="0"
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateLeftQuantity(item.id, 1)}
                          disabled={
                            item.selectedQuantity >= item.availableQuantity
                          }
                          className="w-8 h-8 p-0 bg-blue-500 text-white hover:bg-blue-600"
                        >
                          <Plus size={14} />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col justify-center gap-4">
            <Button
              onClick={moveToRight}
              disabled={
                selectedLeftItems.length === 0 ||
                selectedLeftItems.every(
                  (id) =>
                    leftItems.find((item) => item.id === id)
                      ?.selectedQuantity === 0
                ) ||
                moveToQueueMutation.isPending
              }
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2"
            >
              {moveToQueueMutation.isPending ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <ChevronRight size={20} />
              )}
            </Button>
            <Button
              onClick={moveToLeft}
              disabled={
                selectedRightItems.length === 0 ||
                moveBackFromQueueMutation.isPending
              }
              variant="outline"
              className="px-3 py-2"
            >
              {moveBackFromQueueMutation.isPending ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
              ) : (
                <ChevronLeft size={20} />
              )}
            </Button>
          </div>

          {/* Right Table - Selected Items */}
          <div className="flex-1 flex flex-col">
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Chờ xuất</h3>
              <Input
                placeholder="Search"
                value={rightSearch}
                onChange={(e) => setRightSearch(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="flex-1 border rounded-lg overflow-hidden">
              {/* Table Header */}
              <div className="bg-gray-50 border-b">
                <div className="flex items-center px-3 py-2">
                  <div className="w-8"></div> {/* Checkbox space */}
                  <div className="flex-1 font-medium text-sm">Mã SKU</div>
                  <div className="w-32 font-medium text-sm text-center">
                    Số lượng
                  </div>
                </div>
              </div>

              {/* Table Body */}
              <div className="overflow-y-auto flex-1">
                {filteredRightItems.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    {rightSearch
                      ? "Không tìm thấy sản phẩm"
                      : "Chưa chọn sản phẩm nào"}
                  </div>
                ) : (
                  filteredRightItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center px-3 py-2 border-b hover:bg-gray-50"
                    >
                      <Checkbox
                        checked={selectedRightItems.includes(item.id)}
                        onCheckedChange={(checked) =>
                          handleRightSelection(item.id, !!checked)
                        }
                        className="mr-3"
                      />
                      <div className="flex-1">
                        <div className="text-sm font-medium">
                          {item.skuCode}
                        </div>
                        <div className="text-xs text-gray-500">
                          {item.productName}
                        </div>
                      </div>
                      <div className="w-40 flex items-center justify-center gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateRightQuantity(item.id, -1)}
                          disabled={item.selectedQuantity <= 1}
                          className="w-8 h-8 p-0"
                        >
                          <Minus size={14} />
                        </Button>
                        <Input
                          type="number"
                          value={item.selectedQuantity.toString()}
                          onChange={(e) =>
                            setRightQuantityDirect(item.id, e.target.value)
                          }
                          className="w-20 h-8 text-center text-sm"
                          min={1}
                          max={item.availableQuantity}
                          placeholder="1"
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateRightQuantity(item.id, 1)}
                          disabled={
                            item.selectedQuantity >= item.availableQuantity
                          }
                          className="w-8 h-8 p-0 bg-blue-500 text-white hover:bg-blue-600"
                        >
                          <Plus size={14} />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={handleCancel}>
            Hủy
          </Button>
          <Button
            className="bg-blue-500 hover:bg-blue-600 text-white"
            onClick={handleExport}
            disabled={
              rightItems.length === 0 || exportWithRouteMutation.isPending
            }
          >
            {exportWithRouteMutation.isPending
              ? "Đang xuất kho..."
              : `Xuất kho (${rightItems.length})`}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
