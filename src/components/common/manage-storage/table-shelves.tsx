"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useShelves } from "@/hooks/manage-storage/use-shelves";
import { ChevronRight, Eye } from "lucide-react";
import React, { useState } from "react";
import { DialogDetailStorage } from "./modal/modal-detail-shelve-bin";
import { DialogDetailBox } from "./modal/modal-detail-box";
import { EmptyData } from "../empty-data";
import CustomPagination from "./custom-pagination";
import { useSearchParams } from "next/navigation";

const TableShelves = () => {
  const [idShelve, setIdShelve] = useState<number | undefined>();
  const [idBin, setIdBin] = useState<number>();
  const [isOpenModalDetail, setIsOpenModalDetail] = useState<boolean>(false);
  const [isOpenModalDetailBin, setIsOpenModalDetailBin] =
    useState<boolean>(false);
  const [isOpenModalDetailBox, setIsOpenModalDetailBox] =
    useState<boolean>(false);

  const [idDetail, setIdDetail] = useState<number>();
  const [idDetailBin, setIdDetailBin] = useState<number>();
  const [idDetailBox, setIdDetailBox] = useState<number>();

  const toggleShelf = (id: number) => {
    setIdShelve(idShelve === id ? undefined : id);
  };
  const toggleBin = (id: number) => {
    setIdBin(idBin === id ? undefined : id);
  };
  const searchParams = useSearchParams();
  const page = Number(searchParams?.get("page") ?? "0");

  const {
    data,
    dataBinById,
    dataBoxById,
    isPending,
    isOpenBinId,
    setIsOpenBinId,
    isOpenShelveId,
    setIsOpenShelveId,
  } = useShelves({ id: idShelve, idBin });
  const ITEMS_PER_PAGE = 15;
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const spliceData = data?.slice(startIndex, endIndex) ?? [];
  return (
    <>
      <div className="border flex-1 overflow-auto scrollbar bg-background rounded-lg w-full">
        {" "}
        <Table className=" scrollbar h-auto border-separate border-spacing-0 overflow-auto ">
          <TableHeader className="    ">
            <TableRow className="h-full ">
              <TableHead className="last:border-r-0 h-8 border-b border-r border-gray-300 bg-background  sticky top-0 z-50 ">
                #
              </TableHead>
              <TableHead className="last:border-r-0 h-8 border-b border-r border-gray-300 bg-background  sticky top-0 z-50">
                Mã quản lý
              </TableHead>
              <TableHead className="last:border-r-0 h-8 border-b border-r border-gray-300  bg-background sticky top-0 z-50">
                Số lượng item chứa
              </TableHead>
              <TableHead className="last:border-r-0 h-8 border-b border-r border-gray-300 bg-background sticky top-0 z-50  text-center">
                Xem chi tiết
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="  flex-1 h-full w-full">
            {spliceData && spliceData?.length > 0 ? (
              spliceData?.map((item) => {
                return (
                  <React.Fragment key={`${item?.shelfCode}-${item?.id}`}>
                    <TableRow>
                      <TableCell className="border ">
                        <ChevronRight
                          className={`cursor-pointer transition-transform ${
                            idShelve === item.id ? "rotate-90" : ""
                          }`}
                          onClick={() => {
                            toggleShelf(item.id);
                            setIsOpenShelveId(true);
                          }}
                        />
                      </TableCell>
                      <TableCell className="border">
                        {item?.shelfCode ?? "--"}
                      </TableCell>
                      <TableCell className="border">
                        {item?.itemCount ?? "--"}
                      </TableCell>
                      <TableCell className="border ">
                        <div className="flex justify-center items-center">
                          <Eye
                            size={18}
                            onClick={() => {
                              setIdDetail(item?.id);
                              setIsOpenModalDetail(true);
                            }}
                            className="cursor-pointer"
                          />
                        </div>
                      </TableCell>
                    </TableRow>

                    {idShelve &&
                      isOpenShelveId &&
                      idShelve === item?.id &&
                      (dataBinById && dataBinById?.length > 0 ? (
                        dataBinById.map((bin) => {
                          return (
                            <React.Fragment key={bin?.binCode}>
                              <TableRow className="bg-gray-100">
                                <TableCell className="border">
                                  <div className="flex justify-center">
                                    <ChevronRight
                                      className={`cursor-pointer transition-transform ${
                                        idBin === bin.id ? "rotate-90" : ""
                                      }`}
                                      onClick={() => {
                                        toggleBin(bin.id);
                                        setIsOpenBinId(true);
                                      }}
                                    />
                                  </div>
                                </TableCell>
                                <TableCell className="border">
                                  {bin?.binCode ?? "--"}
                                </TableCell>
                                <TableCell className="border">
                                  {bin?.itemCount ?? "--"}
                                </TableCell>
                                <TableCell className="border">
                                  <div className="flex justify-center items-center">
                                    <Eye
                                      size={18}
                                      onClick={() => {
                                        setIdDetailBin(bin?.id);
                                        setIsOpenModalDetailBin(true);
                                      }}
                                      className="cursor-pointer"
                                    />
                                  </div>
                                </TableCell>
                              </TableRow>

                              {idBin &&
                                isOpenBinId &&
                                idBin === bin?.id &&
                                (dataBoxById && dataBoxById?.length > 0 ? (
                                  dataBoxById.map((box, index) => {
                                    return (
                                      <TableRow
                                        key={box?.boxCode}
                                        className="bg-gray-200"
                                      >
                                        <TableCell className="border text-end">
                                          {index + 1}
                                        </TableCell>
                                        <TableCell className="border">
                                          {box?.boxCode ?? "--"}
                                        </TableCell>
                                        <TableCell className="border">
                                          {box?.itemCount ?? "--"}
                                        </TableCell>
                                        <TableCell className="border">
                                          <div className="flex justify-center items-center">
                                            <Eye
                                              size={18}
                                              className="cursor-pointer"
                                              onClick={() => {
                                                setIdDetailBox(box?.id);
                                                setIsOpenModalDetailBox(true);
                                              }}
                                            />
                                          </div>
                                        </TableCell>
                                      </TableRow>
                                    );
                                  })
                                ) : (
                                  <TableRow>
                                    <TableCell
                                      colSpan={4}
                                      className="text-center"
                                    >
                                      Hiện không thấy Box
                                    </TableCell>
                                  </TableRow>
                                ))}
                            </React.Fragment>
                          );
                        })
                      ) : (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center">
                            Hiện không thấy Bin
                          </TableCell>
                        </TableRow>
                      ))}
                  </React.Fragment>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="border">
                  <EmptyData />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <CustomPagination total={data?.length || 0} />

      {isOpenModalDetail && idDetail && (
        <DialogDetailStorage
          open={isOpenModalDetail}
          setOpen={setIsOpenModalDetail}
          id={idDetail}
        />
      )}

      {isOpenModalDetailBin && idDetailBin && (
        <DialogDetailStorage
          open={isOpenModalDetailBin}
          setOpen={setIsOpenModalDetailBin}
          id={idDetailBin}
          isShelve={false}
        />
      )}

      {isOpenModalDetailBox && idDetailBox && (
        <DialogDetailBox
          open={isOpenModalDetailBox}
          setOpen={setIsOpenModalDetailBox}
          id={idDetailBox}
        />
      )}
    </>
  );
};
export default TableShelves;
