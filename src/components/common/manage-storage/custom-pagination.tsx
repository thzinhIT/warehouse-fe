"use client";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import {
  RiArrowLeftDoubleFill,
  RiArrowLeftSLine,
  RiArrowRightDoubleFill,
  RiArrowRightSLine,
} from "react-icons/ri";

const CustomPagination = ({ total }: { total: number }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const totalPage = Math.ceil(Number(total) / 15);

  const page = Number(searchParams?.get("page") ?? "1");
  const PageNext = () => {
    if (page <= totalPage) {
      const nextPage = page + 1;
      router.replace(`/manage-storage/shelves?page=${nextPage}`);
    }
  };
  const PagePrev = () => {
    if (page > 1) {
      const prevPage = page - 1;
      router.replace(`/manage-storage/shelves?page=${prevPage}`);
    }
  };
  const PageDoublePrev = () => {
    if (page !== 1) {
      router.replace(`/manage-storage/shelves?page=${1}`);
    }
  };
  const PageDoubleNext = () => {
    if (page !== totalPage) {
      router.replace(`/manage-storage/shelves?page=${totalPage}`);
    }
  };
  return (
    <div className="relative flex h-auto w-full flex-wrap items-center justify-end px-2 pb-2">
      <div className="flex flex-wrap items-center space-x-6 lg:space-x-8">
        {!!total && (
          <div className="absolute left-0 text-sm font-medium">
            {" "}
            Tổng {total} kết quả
          </div>
        )}

        {!!total && (
          <div className="flex w-[100px] items-center text-sm font-medium">
            <p
              className={"line-clamp-1 overflow-hidden text-ellipsis break-all"}
            >
              Trang {page}/{totalPage}
            </p>
          </div>
        )}
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden size-8 p-0 lg:flex"
            onClick={PageDoublePrev}
            disabled={page === 1}
          >
            <span className="sr-only">Go to first page</span>
            <RiArrowLeftDoubleFill className="size-4" />
          </Button>
          <Button
            variant="outline"
            className="size-8 p-0"
            onClick={PagePrev}
            disabled={page === 1}
          >
            <span className="sr-only">Go to previous page</span>
            <RiArrowLeftSLine className="size-4" />
          </Button>
          <Button
            variant="outline"
            className="size-8 p-0"
            onClick={PageNext}
            disabled={page === totalPage}
          >
            <span className="sr-only">Go to next page</span>
            <RiArrowRightSLine className="size-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden size-8 p-0 lg:flex"
            onClick={PageDoubleNext}
            disabled={page === totalPage}
          >
            <span className="sr-only">Go to last page</span>
            <RiArrowRightDoubleFill className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
export default CustomPagination;
