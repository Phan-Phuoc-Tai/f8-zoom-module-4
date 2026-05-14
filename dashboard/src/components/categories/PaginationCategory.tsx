"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { generatePagination } from "@/utils/generatePagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
type Props = {
  totalPage: number | undefined;
  currentPage: number | undefined;
};
export default function PaginationCategory({ totalPage, currentPage }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const allPages = generatePagination(currentPage!, totalPage!);
  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    router.replace(`${pathname}?${params.toString()}`);
  };
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            aria-disabled={currentPage! <= 1}
            className={
              currentPage! <= 1 ? "pointer-events-none opacity-50" : ""
            }
            onClick={() => createPageUrl(currentPage! - 1)}
          />
        </PaginationItem>
        {allPages.map((page, index) => {
          if (page === "ellipsis") {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={page}>
              <PaginationLink
                onClick={() => createPageUrl(page)}
                isActive={currentPage! === page}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <PaginationNext
            onClick={() => createPageUrl(currentPage! + 1)}
            aria-disabled={currentPage! >= totalPage!}
            className={
              currentPage! >= totalPage! ? "pointer-events-none opacity-50" : ""
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
