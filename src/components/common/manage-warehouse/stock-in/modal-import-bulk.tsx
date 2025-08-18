import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { FileDown, FileUp, PenBox, Trash2 } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import useTemporary from "@/hooks/manage-warehouse/use-temporary";

import { AlertDialogDelete } from "./alert-dialog-delete";
import { ModalUpdateImportOrder } from "./modal-update-order-import";
import { TDataImportOrderTemporary } from "@/lib/networking/client/manage-warehouse/service";
import { cn } from "@/lib/utils";
import Loading from "../../loading";

export function ModalImportBulk({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [openAlter, setOpenAlert] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [itemUpdate, setItemUpdate] = useState<TDataImportOrderTemporary>();
  const [id, setId] = useState<number>();
  const [listIdImport, setListIdImport] = useState<number[]>([]);
  const [activeCheckbox, setActiveCheckbox] = useState(false);
  const {
    data,
    onUpload,
    isMutating,
    isPending,
    isOpenModalImport,
    isOpenModalDelete,
    isPendingDelete,
    setIsOpenModalDelete,
    downloadFile,
    onDeleteTemporary,
    onUpdateTemporary,
    onImportWarehouse,
    setIsOpenModalImport,
  } = useTemporary(setOpenModalUpdate);
  const handleOnChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onUpload(file);
  };

  const handleCheckedItem = (id: number) => {
    if (listIdImport?.includes(id)) {
      setListIdImport(listIdImport.filter((item) => item !== id));
    } else {
      setListIdImport([...listIdImport, id]);
    }
  };

  const handleCheckedAll = (isChecked: boolean) => {
    setActiveCheckbox(isChecked);
    if (!isChecked) {
      setListIdImport([]);
    } else {
      setListIdImport(data?.map((item) => item.id) ?? []);
    }
  };
  return (
    <React.Fragment>
      <Dialog open={open} onOpenChange={setOpen}>
        <form className="w-4/5 h-full">
          <DialogContent className="w-4/5 h-[500px] overflow-hidden  flex flex-col justify-between">
            <div>
              <DialogHeader>
                <DialogTitle>Nhập hàng loạt đơn hàng</DialogTitle>
                <DialogDescription className="hidden">
                  Make changes to your profile here. Click save when you&apos;re
                  done.
                </DialogDescription>
              </DialogHeader>
              <div>
                <div className="flex gap-3 justify-end ">
                  <div>
                    {" "}
                    <Button
                      className="flex items-center bg-blue-600 hover:bg-blue-600  cursor-pointer text-background ml-auto mb-3"
                      onClick={() => fileRef?.current?.click()}
                    >
                      {" "}
                      <FileUp size={20} /> <span>Tải file lên</span>
                    </Button>
                    <Input
                      className="hidden"
                      ref={fileRef}
                      type="file"
                      onChange={(e) => handleOnChangeFile(e)}
                      accept=".xlsx"
                    />
                  </div>

                  <div className="">
                    <Button
                      className="  flex items-center bg-slate-200 hover:bg-slate-200 cursor-pointer text-black ml-auto mb-3"
                      onClick={() => {
                        downloadFile();
                      }}
                    >
                      <FileDown size={20} />
                      <span>Tải file mẫu </span>
                    </Button>
                  </div>
                </div>

                <div className=" flex-1 py-2 overflow-y-auto min-h-0 max-h-[325px]  ">
                  <Table className="">
                    <TableCaption className="text-center text-gray-400 pt-2">
                      Danh sách phiếu nhập tạm.
                    </TableCaption>
                    <TableHeader>
                      <TableRow className="bg-gray-200">
                        <TableHead>
                          <Checkbox
                            className="cursor-pointer border-gray-400"
                            onCheckedChange={(checked) => {
                              handleCheckedAll(checked === true);
                            }}
                            checked={
                              (activeCheckbox && listIdImport?.length > 0) ||
                              listIdImport?.length === data?.length
                            }
                          />
                        </TableHead>
                        <TableHead>Số thứ tự</TableHead>
                        <TableHead>Mẫ SKU</TableHead>
                        <TableHead>Mã Import</TableHead>
                        <TableHead>Tên sản phẩm</TableHead>
                        <TableHead>Nguồn nhập</TableHead>
                        <TableHead>Ngày nhập</TableHead>
                        <TableHead className="text-center">Số lượng</TableHead>
                        <TableHead>Xóa</TableHead>
                        <TableHead className="text-right">Sửa</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data &&
                        data?.length > 0 &&
                        data.map((item, index) => (
                          <TableRow key={item?.id}>
                            <TableCell>
                              <Checkbox
                                className={cn(
                                  "cursor-pointer",
                                  !item?.importCode && "pointer-events-none"
                                )}
                                checked={listIdImport?.includes(item?.id)}
                                disabled={!item?.importCode}
                                onClick={() => handleCheckedItem(item?.id)}
                              />
                            </TableCell>
                            <TableCell className="font-medium text-center">
                              {index + 1}
                            </TableCell>
                            <TableCell>{item.skuCode}</TableCell>
                            <TableCell className="">
                              {item?.importCode ?? "--"}
                            </TableCell>
                            <TableCell className="">
                              {item?.skuName ?? "--"}
                            </TableCell>
                            <TableCell className="">
                              {item.source ?? "--"}
                            </TableCell>
                            <TableCell>{item.createdAt ?? "--"}</TableCell>
                            <TableCell className="text-center">
                              {item?.quantity ?? "--"}
                            </TableCell>
                            <TableCell>
                              <Trash2
                                className="text-red-400 size-5 hover:cursor-pointer"
                                onClick={() => {
                                  setIsOpenModalDelete(true);
                                  setId(item?.id);
                                  setItemUpdate(item);
                                  setListIdImport(
                                    listIdImport?.filter(
                                      (itemId) => itemId !== item.id
                                    )
                                  );
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              <PenBox
                                className="text-blue-400 size-5 hover:cursor-pointer ml-auto"
                                onClick={() => {
                                  setOpenModalUpdate(true);
                                  setItemUpdate(item);
                                }}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>

            <DialogFooter>
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center">
                  <span className="font-semibold ">Total:</span>
                  <span>
                    {data?.length}{" "}
                    <span className="text-sm text-gray-400">
                      {`(select ${listIdImport?.length ?? 0}/${data?.length})`}
                    </span>
                  </span>
                </div>
                <div className="flex gap-2 ">
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button
                    className="hover:cursor-pointer"
                    onClick={() => {
                      onImportWarehouse(listIdImport);
                    }}
                  >
                    {isPending && <Loading size={15} className="" />}
                    Import{" "}
                  </Button>
                </div>
              </div>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>

      {isOpenModalDelete && id && (
        <AlertDialogDelete
          open={isOpenModalDelete}
          setOpen={setIsOpenModalDelete}
          onDelete={onDeleteTemporary}
          id={id}
          isPending={isPendingDelete}
        />
      )}

      {openModalUpdate && (
        <ModalUpdateImportOrder
          open={openModalUpdate}
          setOpen={setOpenModalUpdate}
          data={itemUpdate ?? ({} as TDataImportOrderTemporary)}
          onUpdateTemporary={onUpdateTemporary}
        />
      )}
    </React.Fragment>
  );
}
