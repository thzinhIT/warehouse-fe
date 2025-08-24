"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useShelves } from "@/hooks/manage-storage/use-shelves";
import { TDataAllShelves } from "@/lib/networking/client/manage-storage/service";
import { ChevronRight, ChevronUp, Eye, Key } from "lucide-react";
import React, { useState } from "react";
import { DialogDetailStorage } from "./modal/modal-detail-shelve-bin";
import { DialogDetailBox } from "./modal/modal-detail-box";

const TableShelves = () => {
  const [idShelve, setIdShelve] = useState<number | undefined>();
  const [idBin, setIdBin] = useState<number>();
  const [idBox, setIdBox] = useState<number>();
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
  return (
    <>
      <Table className="border-collapse">
        <TableHeader className=" bg-gray-200  ">
          <TableRow className="h-full ">
            <TableCell className="border border-gray-300 ">#</TableCell>
            <TableCell className="border border-gray-300">Mã quản lý</TableCell>
            <TableCell className="border border-gray-300">
              Số lượng item chứa
            </TableCell>
            <TableCell className="border border-gray-300 text-center">
              Xem chi tiết
            </TableCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data &&
            data?.length > 0 &&
            data?.map((item) => {
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
            })}
        </TableBody>
      </Table>

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
