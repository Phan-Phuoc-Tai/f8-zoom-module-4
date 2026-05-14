import { CATEGORY_CACHE } from "@/caches/category.cache";
import { CATEGORY_CONFIG } from "@/constants/category.constant";
import { categoryService } from "@/services/category.service";
import { CategoriesResponse } from "@/types/category.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

export const useDeleteCategory = () => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const filters = Object.fromEntries(params.entries());
  const queryClient = useQueryClient();
  const DELETE_CATEGORY = CATEGORY_CONFIG.MODAL.DELETE;
  const mutation = useMutation({
    mutationFn: (id: string) => {
      return categoryService.delete(id);
    },
    onSuccess: (deleteCategory) => {
      queryClient.setQueryData(
        CATEGORY_CACHE.LIST(filters),
        (oldList: CategoriesResponse) => {
          if (!oldList) {
            return [];
          }
          if (oldList.data.length === 1) {
            oldList.totalPage -= 1;
          }
          return oldList.data.filter(
            (category) => category.id !== deleteCategory.id,
          );
        },
      );
      //Làm mới danh sách danh mục
      queryClient.invalidateQueries({ queryKey: CATEGORY_CACHE.LIST_ALL });
      //Làm mới danh mục chi tiết
      queryClient.invalidateQueries({
        queryKey: CATEGORY_CACHE.ITEM(deleteCategory.id),
      });
    },
  });
  const mutateWithToast = (id: string, callback: () => void) => {
    return toast.promise(mutation.mutateAsync(id), {
      loading: DELETE_CATEGORY.LOADING,
      error: DELETE_CATEGORY.ERROR,
      success: () => {
        if (callback) {
          callback();
        }
        return DELETE_CATEGORY.SUCCESS;
      },
    });
  };
  return {
    ...mutation,
    mutateWithToast,
  };
};
