import { CATEGORY_CACHE } from "@/caches/category.cache";
import { Category } from "@/types/category.type";
import { useQueryClient } from "@tanstack/react-query";

export const useCategories = (): Category[] | undefined => {
  const queryClient = useQueryClient();
  return queryClient.getQueryData(CATEGORY_CACHE.LIST);
};
