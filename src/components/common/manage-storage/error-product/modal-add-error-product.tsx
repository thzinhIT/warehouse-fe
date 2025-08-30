import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import {
  useDamagedItems,
  useDeleteDamagedItem,
  useUpdateDamagedItem,
} from "@/hooks/manage-storage/use-damaged-items";
import toast from "react-hot-toast";

// Types for the add error product functionality
interface ErrorItem {
  id: string;
  itemCode: string;
  note: string;
}

export function ModalAddErrorProduct({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorItems, setErrorItems] = useState<ErrorItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<ErrorItem[]>([]);

  // Fetch damaged items from API only when modal is open
  const {
    data: damagedItemsResponse,
    isLoading: isLoadingDamagedItems,
    isError,
    error,
    refetch,
  } = useDamagedItems(open); // Only fetch when modal is open

  // Delete mutation
  const deleteMutation = useDeleteDamagedItem();

  // Update note mutation
  const updateNoteMutation = useUpdateDamagedItem();

  // Trigger API call when modal opens
  useEffect(() => {
    if (open) {
      refetch();
    }
  }, [open, refetch]);

  // Debug logging
  useEffect(() => {}, [
    damagedItemsResponse,
    isLoadingDamagedItems,
    isError,
    error,
  ]);

  // Convert API data to local format when data changes
  useEffect(() => {
    if (
      damagedItemsResponse?.data &&
      Array.isArray(damagedItemsResponse.data)
    ) {
      const convertedItems: ErrorItem[] = damagedItemsResponse.data.map(
        (item, index) => ({
          id: `${item.barcode}-${index}`, // Create unique ID
          itemCode: item.barcode, // barcode maps to mã item
          note: item.note || "", // note maps to ghi chú (fallback to empty string)
        })
      );
      setErrorItems(convertedItems);
      setFilteredItems(convertedItems);
    } else {
      // Set empty arrays if no data
      setErrorItems([]);
      setFilteredItems([]);
    }
  }, [damagedItemsResponse]);

  // Handle search functionality
  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredItems(errorItems);
      return;
    }

    const filtered = errorItems.filter((item) =>
      item.itemCode.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  // Handle add filtered item to display (if you want to add specific items)
  const handleAddItem = (item: ErrorItem) => {
    // This could be used to add specific items to a "selected" list
    toast.success(`Đã thêm item ${item.itemCode}`);
  };

  // Handle delete item (call API to delete)
  const handleDeleteItem = async (itemId: string) => {
    try {
      // Find the item to get its barcode
      const itemToDelete = filteredItems.find((item) => item.id === itemId);
      if (!itemToDelete) {
        toast.error("Không tìm thấy item để xóa");
        return;
      }

      console.log("🗑️ Deleting item:", itemToDelete.itemCode);

      // Call API to delete the item
      await deleteMutation.mutateAsync(itemToDelete.itemCode);

      toast.success(`Đã xóa item ${itemToDelete.itemCode} thành công`);

      // The data will be automatically refreshed due to React Query invalidation
      // But we can also remove it from local state immediately for better UX
      setFilteredItems((prev) => prev.filter((item) => item.id !== itemId));
      setErrorItems((prev) => prev.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error("❌ Delete error:", error);
      toast.error("Có lỗi khi xóa item");
    }
  };

  // Handle note change (local state update only)
  const handleNoteChange = (itemId: string, note: string) => {
    setFilteredItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, note } : item))
    );
    setErrorItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, note } : item))
    );
  };

  // Handle note blur (API call to update note)
  const handleNoteBlur = async (itemId: string, note: string) => {
    try {
      // Find the item to get its barcode
      const item = filteredItems.find((i) => i.id === itemId);
      if (!item) {
        console.error("Item not found for update:", itemId);
        return;
      }

      // Only update if note has changed and is not empty
      if (note.trim() !== "") {
        console.log(
          "📝 Updating note for item:",
          item.itemCode,
          "with note:",
          note
        );

        await updateNoteMutation.mutateAsync({
          barcode: item.itemCode,
          note: note.trim(),
        });

        toast.success(`Đã cập nhật ghi chú cho ${item.itemCode}`);
      }
    } catch (error) {
      console.error("❌ Update note error:", error);
      toast.error("Có lỗi khi cập nhật ghi chú");
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      // TODO: Replace with actual API call to create error products

      // Reset form and close modal
      setFilteredItems([]);
      setSearchTerm("");
      setOpen(false);

      toast.success("Thêm sản phẩm lỗi thành công!");
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Có lỗi xảy ra khi thêm sản phẩm lỗi");
    }
  };

  // Handle cancel/close
  const handleCancel = () => {
    setFilteredItems([]);
    setSearchTerm("");
    setOpen(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-full max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-center font-bold text-xl">
            Thêm sản phẩm lỗi
          </DialogTitle>
          <DialogDescription className="hidden">
            Add error product modal
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search Section */}
          <div className="space-y-2">
            <Label htmlFor="search-item">Mã Item lỗi</Label>
            <div className="flex gap-2">
              <Input
                id="search-item"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button
                onClick={handleSearch}
                disabled={isLoadingDamagedItems || !searchTerm.trim()}
                className="px-4"
              >
                {isLoadingDamagedItems ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  "Thêm"
                )}
              </Button>
            </div>
          </div>

          {/* Debug/Test Section */}

          {/* Table Section */}
          <div className="space-y-2">
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableCell className="border w-16 text-center"></TableCell>
                    <TableCell className="border font-medium">
                      Mã Item
                    </TableCell>
                    <TableCell className="border font-medium">
                      Ghi chú
                    </TableCell>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {isLoadingDamagedItems ? (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center py-8">
                        <div className="flex items-center justify-center">
                          <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2" />
                          Đang tải dữ liệu...
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="border text-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteItem(item.id)}
                            disabled={deleteMutation.isPending}
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 disabled:opacity-50"
                          >
                            {deleteMutation.isPending ? (
                              <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </Button>
                        </TableCell>
                        <TableCell className="border">
                          {item.itemCode}
                        </TableCell>
                        <TableCell className="border relative">
                          <Input
                            placeholder="Content"
                            value={item.note}
                            onChange={(e) =>
                              handleNoteChange(item.id, e.target.value)
                            }
                            onBlur={(e) =>
                              handleNoteBlur(item.id, e.target.value)
                            }
                            disabled={updateNoteMutation.isPending}
                            className={`border-none p-1 h-8 pr-8 ${
                              updateNoteMutation.isPending ? "opacity-50" : ""
                            }`}
                          />
                          {updateNoteMutation.isPending && (
                            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                              <div className="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={3}
                        className="text-center py-8 text-gray-500"
                      >
                        Chưa có item nào được thêm
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={handleCancel} className="flex-1">
            Hủy
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={filteredItems.length === 0}
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            Chuyển
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
