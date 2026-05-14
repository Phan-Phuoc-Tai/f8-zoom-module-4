"use client";

import {
  Table,
  TableHead,
  TableHeader,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import moment from "moment";
import ActionCategory from "./ActionCategory";
import { CATEGORY_CONFIG } from "@/constants/category.constant";
import PaginationCategory from "./PaginationCategory";
import { useCategories } from "@/hooks/categories/useCategories";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";

export default function CategoriesTable() {
  const TABLE = CATEGORY_CONFIG.TABLE;
  const STATUS = CATEGORY_CONFIG.STATUS;
  const { categories, totalPage, currentPage, isLoading } = useCategories();

  return (
    <div>
      <Table className="mt-6 bg-white rounded-lg overflow-hidden mb-3">
        <TableHeader className="bg-(--primary-color)">
          <TableRow>
            {TABLE.map((item) => (
              <TableHead
                key={item.FIELD}
                className={`${item.CLASS_NAME} text-white`}
              >
                {item.TEXT}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className="text-left">
          {isLoading
            ? Array.from({ length: 10 }).map((_, i) => (
                <TableRow key={i}>
                  {Array.from({ length: 5 }).map((_, j) => (
                    <TableCell key={j}>
                      <Skeleton className="h-6 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            : categories?.map((category, index) => {
                return (
                  <TableRow key={category.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{category.name}</TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          "bg-amber-100 text-amber-600 px-2 py-1 rounded-md",
                          category.status && "bg-green-100 text-green-700",
                        )}
                      >
                        {category.status ? STATUS.true : STATUS.false}
                      </span>
                    </TableCell>
                    <TableCell>
                      {moment(category.updatedAt).format("YYYY/MM/DD HH:mm:ss")}
                    </TableCell>
                    <TableCell className="flex items-center gap-3 justify-center">
                      <ActionCategory id={category.id!} />
                    </TableCell>
                  </TableRow>
                );
              })}
        </TableBody>
      </Table>
      {!isLoading && (
        <PaginationCategory totalPage={totalPage} currentPage={currentPage} />
      )}
    </div>
  );
}
