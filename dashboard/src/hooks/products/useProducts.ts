import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { productService } from "@/services/product.service";
import { PRODUCT_CACHE } from "@/caches/product.cache";

export const useProducts = (limit?: string) => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const filters = Object.fromEntries(params.entries());
  if (limit) {
    filters.limit = limit;
  }
  const query = useQuery({
    queryKey: PRODUCT_CACHE.LIST(filters),
    queryFn: () => productService.getProducts(filters),
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60 * 5,
  });
  return {
    products: query.data?.data ?? [],
    totalPage: query.data?.totalPage ?? 0,
    currentPage: query.data?.currentPage ?? 1,
    isLoading: query.isLoading,
    isError: query.isError,
    isFetching: query.isFetching,
    query,
  };
};
