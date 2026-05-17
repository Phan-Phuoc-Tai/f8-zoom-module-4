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

import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";
import { PRODUCT_CONFIG } from "@/constants/product.constant";
import { useProducts } from "@/hooks/products/useProducts";
import Image from "next/image";
import ActionProduct from "./ActionProduct";

export default function ProductsTable() {
  const TABLE = PRODUCT_CONFIG.TABLE;
  const STATUS = PRODUCT_CONFIG.STATUS;
  const { products, totalPage, currentPage, isLoading } = useProducts();

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
                  {Array.from({ length: 7 }).map((_, j) => (
                    <TableCell key={j}>
                      <Skeleton className="h-6 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            : products?.map((product, index) => {
                return (
                  <TableRow key={product.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Image
                        src={product.thumbnail}
                        alt={product.name}
                        width={150}
                        height={60}
                        loading="eager"
                        className="w-40 h-15 object-contain"
                      />
                    </TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>
                      <p>Giá gốc: {product.price.toLocaleString()}</p>
                      <p>Giá KM: {product.salePrice.toLocaleString()}</p>
                    </TableCell>
                    <TableCell>{product.category?.name}</TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          "bg-amber-100 text-amber-600 px-2 py-1 rounded-md",
                          product.status && "bg-green-100 text-green-700",
                        )}
                      >
                        {product.status ? STATUS.true : STATUS.false}
                      </span>
                    </TableCell>
                    <TableCell>
                      {moment(product.updatedAt).format("YYYY/MM/DD HH:mm:ss")}
                    </TableCell>
                    <TableCell>
                      <ActionProduct id={product.id!} />
                    </TableCell>
                  </TableRow>
                );
              })}
        </TableBody>
      </Table>
      {/* {!isLoading && (
        <PaginationCategory totalPage={totalPage} currentPage={currentPage} />
      )} */}
    </div>
  );
}
