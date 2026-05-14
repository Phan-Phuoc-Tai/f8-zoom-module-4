import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { categoryService } from "@/services/category.service";
import { CATEGORY_CACHE } from "@/caches/category.cache";

export const useCategories = (limit?: string) => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const filters = Object.fromEntries(params.entries());
  if (limit) {
    filters.limit = limit;
  }
  const query = useQuery({
    queryKey: CATEGORY_CACHE.LIST(filters),
    queryFn: () => categoryService.getCategories(filters),
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60 * 5,
  });
  return {
    categories: query.data?.data ?? [],
    totalPage: query.data?.totalPage ?? 0,
    currentPage: query.data?.currentPage ?? 1,
    isLoading: query.isLoading,
    isError: query.isError,
    isFetching: query.isFetching,
    query,
  };
};
