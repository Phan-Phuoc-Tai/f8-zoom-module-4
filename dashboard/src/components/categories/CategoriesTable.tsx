"use client";

import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import { CATEGORY_CACHE } from "@/caches/category.cache";
import { categoryService } from "@/services/category.service";
import ActionCategory from "./ActionCategory";
import { useSearchParams } from "next/navigation";
export default function CategoriesTable() {
  const searchParams = useSearchParams();
  //kết quả từ searchParams: ["page", "1"] chuyển đổi thành {page : "1"}
  const filters = Object.fromEntries(searchParams);
  const { data } = useQuery({
    queryKey: [...CATEGORY_CACHE.LIST, filters],
    queryFn: () => categoryService.getCategories(filters),
  });
  const categories = data?.data;

  return (
    <TableBody className="text-left">
      {categories?.map((category, index) => {
        //Vì danh mục phụ thuộc trả về số nên muốn convert sang chữ cho admin dễ quản lý
        const parent = categories.find(
          (data) => +data.id === category.parentId,
        );
        return (
          <TableRow key={category.id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{category.name}</TableCell>
            <TableCell>{parent?.name ?? "-"}</TableCell>
            <TableCell>
              {moment(category.updatedAt).format("YYYY/MM/DD HH:mm:ss")}
            </TableCell>
            <TableCell className="flex items-center gap-3 justify-center">
              <ActionCategory id={category.id} />
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
}
