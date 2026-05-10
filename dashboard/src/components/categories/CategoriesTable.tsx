"use client";

import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import { CATEGORY_CACHE } from "@/caches/category.cache";
import { categoryService } from "@/services/category.service";

import { Edit, Trash2 } from "lucide-react";
export default function CategoriesTable() {
  const { data: categories } = useQuery({
    queryKey: CATEGORY_CACHE.LIST,
    queryFn: categoryService.findAll,
  });

  return (
    <TableBody className="text-left">
      {categories?.map((category) => {
        //Vì danh mục phụ thuộc trả về số nên muốn convert sang chữ cho admin dễ quản lý
        const parent = categories.find(
          (data) => +data.id === category.parentId,
        );
        return (
          <TableRow key={category.id}>
            <TableCell>{category.id}</TableCell>
            <TableCell>{category.name}</TableCell>
            <TableCell>{parent?.name ?? "-"}</TableCell>
            <TableCell>
              {moment(category.updatedAt).format("YYYY/MM/DD HH:mm:ss")}
            </TableCell>
            <TableCell className="flex items-center gap-3 justify-end ">
              <Edit className="w-5 h-5 cursor-pointer" />
              <Trash2 className="w-5 h-5 cursor-pointer text-red-400" />
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
}
